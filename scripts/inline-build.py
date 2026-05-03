#!/usr/bin/env python3
"""
Inline CSS/JS/assets into dist/index.html for Forgejo Pages.

CRITICAL: Forgejo raw API serves ALL files as text/plain with X-Content-Type-Options: nosniff.
External .css/.js/.png/.json files are blocked by browsers.
Everything must be inlined into index.html.
"""
import os
import re
import glob
import json
import base64
import mimetypes

dist_dir = os.path.join(os.path.dirname(__file__), '..', 'dist')
index_path = os.path.join(dist_dir, 'index.html')

with open(index_path, 'r') as f:
    html = f.read()

# ------------------------------------------------------------------
# 1. Inline CSS
# ------------------------------------------------------------------
for link_match in re.finditer(r'<link[^>]*href="\.?/assets/([^"]+\.css)"[^>]*>', html):
    css_path = os.path.join(dist_dir, 'assets', link_match.group(1))
    with open(css_path, 'r') as f:
        css = f.read()
    html = html.replace(link_match.group(0), f'<style>{css}</style>')

# ------------------------------------------------------------------
# 2. Inline JS — PRESERVE type="module" (Vite builds ES modules)
# ------------------------------------------------------------------
for script_match in re.finditer(r'<script([^>]*)src="\.?/assets/([^"]+\.js)"([^>]*)></script>', html):
    js_path = os.path.join(dist_dir, 'assets', script_match.group(2))
    with open(js_path, 'r') as f:
        js = f.read()
    attrs = script_match.group(1) + script_match.group(3)
    if 'type="module"' in attrs:
        html = html.replace(script_match.group(0), f'<script type="module">{js}</script>')
    else:
        html = html.replace(script_match.group(0), f'<script>{js}</script>')

# ------------------------------------------------------------------
# 3. Inline registerSW.js (if present as external file)
# ------------------------------------------------------------------
sw_match = re.search(r'<script[^>]*src="(\.?/registerSW\.js)"[^>]*></script>', html)
if sw_match:
    sw_path = os.path.join(dist_dir, 'registerSW.js')
    if os.path.exists(sw_path):
        with open(sw_path, 'r') as f:
            sw_js = f.read()
        html = html.replace(sw_match.group(0), f'<script>{sw_js}</script>')
        os.remove(sw_path)
        print('Inlined registerSW.js')

# ------------------------------------------------------------------
# 4. Inline images referenced by manifest (PNG/SVG/etc → base64)
# ------------------------------------------------------------------
manifest_path = os.path.join(dist_dir, 'manifest.webmanifest')
if os.path.exists(manifest_path):
    with open(manifest_path, 'r') as f:
        manifest = json.load(f)

    # Convert each icon to base64 data URI
    for icon in manifest.get('icons', []):
        icon_src = icon.get('src', '')
        # Strip leading ./ if present
        if icon_src.startswith('./'):
            icon_src = icon_src[2:]
        icon_path = os.path.join(dist_dir, icon_src)
        if os.path.exists(icon_path):
            mime, _ = mimetypes.guess_type(icon_path)
            if mime is None:
                mime = 'application/octet-stream'
            with open(icon_path, 'rb') as f:
                b64 = base64.b64encode(f.read()).decode('ascii')
            icon['src'] = f'data:{mime};base64,{b64}'
            print(f'Inlined icon: {icon_src} → base64 ({len(b64)} chars)')
        else:
            print(f'Warning: icon file not found: {icon_path}')

    # Inline the manifest itself as a data URI
    manifest_json = json.dumps(manifest, separators=(',', ':'))
    manifest_b64 = base64.b64encode(manifest_json.encode('utf-8')).decode('ascii')
    manifest_data_uri = f'data:application/manifest+json;base64,{manifest_b64}'

    # Replace manifest link
    manifest_link_match = re.search(r'<link[^>]*rel="manifest"[^>]*href="[^"]*"[^>]*>', html)
    if manifest_link_match:
        html = html.replace(manifest_link_match.group(0),
                            f'<link rel="manifest" href="{manifest_data_uri}">')
        print('Inlined manifest.webmanifest as data URI')

    # Remove external manifest file
    os.remove(manifest_path)
    print('Removed manifest.webmanifest')

# ------------------------------------------------------------------
# 5. Remove service-worker registration (SW + workbox can't load as text/plain)
# ------------------------------------------------------------------
sw_reg_pattern = r'<script>if\(\'serviceWorker\' in navigator\)[^<]*navigator\.serviceWorker\.register\([^)]+\)[^<]*</script>'
sw_reg_match = re.search(sw_reg_pattern, html)
if sw_reg_match:
    html = html.replace(sw_reg_match.group(0), '')
    print('Removed service-worker registration (external SW blocked by text/plain)')

# Also remove any standalone SW registration that might differ slightly
sw_reg_pattern2 = r'<script>[^<]*serviceWorker[^<]*register\([^)]+\)[^<]*</script>'
for m in re.finditer(sw_reg_pattern2, html):
    html = html.replace(m.group(0), '')
    print('Removed service-worker registration script')

# ------------------------------------------------------------------
# 6. Inline any other images referenced directly in HTML (favicons, etc.)
# ------------------------------------------------------------------
for img_match in re.finditer(r'<link[^>]*rel="(?:icon|shortcut icon|apple-touch-icon)"[^>]*href="(\.?/[^"]+\.(?:png|svg|ico|jpg|jpeg|webp|gif))"[^>]*>', html):
    img_src = img_match.group(1)
    if img_src.startswith('./'):
        img_src = img_src[2:]
    img_path = os.path.join(dist_dir, img_src)
    if os.path.exists(img_path):
        mime, _ = mimetypes.guess_type(img_path)
        if mime is None:
            mime = 'image/png'
        with open(img_path, 'rb') as f:
            b64 = base64.b64encode(f.read()).decode('ascii')
        data_uri = f'data:{mime};base64,{b64}'
        new_link = img_match.group(0).replace(img_match.group(1), data_uri)
        html = html.replace(img_match.group(0), new_link)
        print(f'Inlined favicon: {img_src} → base64')

with open(index_path, 'w') as f:
    f.write(html)

print('Inlined CSS, JS, images, and manifest into dist/index.html')

# ------------------------------------------------------------------
# 7. Clean up now-useless external files
# ------------------------------------------------------------------
# Remove assets directory
assets_dir = os.path.join(dist_dir, 'assets')
if os.path.exists(assets_dir):
    for f in glob.glob(os.path.join(assets_dir, '*')):
        os.remove(f)
    os.rmdir(assets_dir)
    print('Removed assets/ directory')

# Remove service worker files (they can't be loaded externally)
for sw_file in glob.glob(os.path.join(dist_dir, 'sw.js')) + \
               glob.glob(os.path.join(dist_dir, 'workbox-*.js')) + \
               glob.glob(os.path.join(dist_dir, 'workbox-*.js.map')):
    if os.path.exists(sw_file):
        os.remove(sw_file)
        print(f'Removed {os.path.basename(sw_file)} (blocked by text/plain)')

# Remove inlined icons (now embedded in manifest)
for icon_file in glob.glob(os.path.join(dist_dir, 'icon-*.png')) + \
                 glob.glob(os.path.join(dist_dir, 'icon-*.svg')) + \
                 glob.glob(os.path.join(dist_dir, 'favicon.*')):
    if os.path.exists(icon_file):
        os.remove(icon_file)
        print(f'Removed {os.path.basename(icon_file)} (inlined into manifest)')

print('\n✅ dist/ is ready for Forgejo Pages deployment (single index.html)')
