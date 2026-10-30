#!/usr/bin/env python3
"""Extract inline SVG / CSS tokens / keyframes / audio source from the single-file game.
Usage: python3 -I tools/extract_inline_assets.py src/current/soulsync-kingdom-1320-v0.2.3-visual-dev.html assets/inline-extracted
Read-only on the source; writes only into the output dir (created if missing)."""
import re, sys, pathlib
src = pathlib.Path(sys.argv[1]).read_text(encoding='utf-8')
out = pathlib.Path(sys.argv[2]); out.mkdir(parents=True, exist_ok=True)
def w(n, s): (out/n).write_text(s, encoding='utf-8'); print('wrote', out/n)

root = re.search(r':root\{.*?\}', src, re.S).group(0)
w('design-tokens.css', '/* extracted from :root of the game file */\n' + root + '\n')
kf = re.findall(r'@keyframes [\w-]+\{.*?\}\}?(?=\n|@|\.|#)', src)
w('keyframes.css', '\n'.join(re.findall(r'@keyframes [^\n]+', src)) + '\n')
tcss = '\n'.join(l for l in src.splitlines() if re.match(r'\.(tt|tm)[ .{]', l))
w('totem-state.css', tcss + '\n')

shapes = dict(re.findall(r"\b(s[0-3]):'(.*?)'(?:,|\n|\})", re.search(r'const TOTEM_SHAPE=\{.*?\n\};', src, re.S).group(0)))
style = ('<style>.th{fill:none;stroke:%s;stroke-width:%s;stroke-linecap:round;stroke-linejoin:round%s}'
         '.th.tf{%s}.th.fine{stroke-width:%s}.ax{fill:none;stroke:%s;stroke-width:%s;%s}</style>')
variants = {
 'revealed': style % ('#f0c97a','8','','fill:#f0c97a;stroke-width:3','3.5','#c99a45','1.4','opacity:.8'),
 'sleeping': style % ('#a9b4dc','2.6',';stroke-dasharray:3 5;opacity:.7','','2.6','#a9b4dc','1.4','stroke-dasharray:2 4;opacity:.5'),
}
for k, sh in shapes.items():
    for v, st in variants.items():
        bg = '<rect width="120" height="120" fill="#070d24"/>'
        w(f'placeholder-totem-{k}-{v}.svg',
          f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">{st}{bg}{sh}</svg>\n')

for name in ('BOTTLE_SVG', 'BOTTLE_MINI'):
    m = re.search(r'const %s=`(<svg.*?</svg>)`;' % name, src, re.S)
    if m: w(name.lower().replace('_', '-') + '.svg', m.group(1).replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ', 1) + '\n')
m = re.search(r'const far=.*?`(<span.*?</span>)`', src, re.S)
if m: w('far-walker-figure-snippet.html.txt', m.group(1) + '\n')
m = re.search(r'(function walker\(.*?\n\}\n)', src, re.S) or re.search(r'(const walker=.*?\n\}\n)', src, re.S)
if m: w('walker-lamp-source.js.txt', m.group(1))
m = re.search(r'(function sfx\(kind\).*?\n\}\nfunction tone.*?\n\}\n)', src, re.S)
if m: w('audio-webaudio-source.js.txt', m.group(1))
