#!/usr/bin/env python3
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

# Inline JS
for script_match in re.finditer(r'<script[^>]*src="\.?/assets/([^"]+\.js)"[^>]*></script>', html):
    js_path = os.path.join(dist_dir, 'assets', script_match.group(1))
    with open(js_path, 'r') as f:
        js = f.read()
    html = html.replace(script_match.group(0), f'<script>{js}</script>')

with open(index_path, 'w') as f:
    f.write(html)

print('Inlined CSS and JS into dist/index.html')

# Clean up old assets
for f in glob.glob(os.path.join(dist_dir, 'assets', '*')):
    os.remove(f)
os.rmdir(os.path.join(dist_dir, 'assets'))
print('Removed assets/ directory')
