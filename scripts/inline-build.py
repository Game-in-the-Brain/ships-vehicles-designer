#!/usr/bin/env python3
"""
Inline CSS/JS assets into dist/index.html for Forgejo Pages.

CRITICAL: Forgejo raw API serves ALL files as text/plain.
External .css/.js files are blocked by browsers (nosniff).
Everything must be inlined into index.html.
"""
import os
import re
import glob

dist_dir = os.path.join(os.path.dirname(__file__), '..', 'dist')
index_path = os.path.join(dist_dir, 'index.html')

with open(index_path, 'r') as f:
    html = f.read()

# Inline CSS
for link_match in re.finditer(r'<link[^>]*href="\.?/assets/([^"]+\.css)"[^>]*>', html):
    css_path = os.path.join(dist_dir, 'assets', link_match.group(1))
    with open(css_path, 'r') as f:
        css = f.read()
    html = html.replace(link_match.group(0), f'<style>{css}</style>')

# Inline JS — PRESERVE type="module" (Vite builds ES modules)
for script_match in re.finditer(r'<script([^>]*)src="\.?/assets/([^"]+\.js)"([^>]*)></script>', html):
    js_path = os.path.join(dist_dir, 'assets', script_match.group(2))
    with open(js_path, 'r') as f:
        js = f.read()
    # Reconstruct with type="module" if present in original
    attrs = script_match.group(1) + script_match.group(3)
    if 'type="module"' in attrs:
        html = html.replace(script_match.group(0), f'<script type="module">{js}</script>')
    else:
        html = html.replace(script_match.group(0), f'<script>{js}</script>')

# Inline registerSW.js too (it's also served as text/plain externally)
sw_match = re.search(r'<script[^>]*src="(\.?/registerSW\.js)"[^>]*></script>', html)
if sw_match:
    sw_path = os.path.join(dist_dir, 'registerSW.js')
    if os.path.exists(sw_path):
        with open(sw_path, 'r') as f:
            sw_js = f.read()
        html = html.replace(sw_match.group(0), f'<script>{sw_js}</script>')
        os.remove(sw_path)
        print('Inlined registerSW.js')

with open(index_path, 'w') as f:
    f.write(html)

print('Inlined CSS and JS into dist/index.html')

# Clean up old assets
assets_dir = os.path.join(dist_dir, 'assets')
if os.path.exists(assets_dir):
    for f in glob.glob(os.path.join(assets_dir, '*')):
        os.remove(f)
    os.rmdir(assets_dir)
    print('Removed assets/ directory')
