#!/usr/bin/env python3
"""Offline smoke test (Playwright/chromium). Usage: python3 tools/smoke_test.py <clean.html> <selftest.html>
Checks: clean file has no selftest hook; no console errors; no network beyond file://; no storage writes;
no missing i18n keys; no horizontal overflow at 4 viewports; reduced-motion loads; public payload has exactly 6 keys."""
import sys, pathlib, json
from playwright.sync_api import sync_playwright
clean, selft = [pathlib.Path(p).resolve() for p in sys.argv[1:3]]
txt = clean.read_text(encoding='utf-8')
fails = []
def chk(c, m):
    print(('PASS ' if c else 'FAIL ') + m); (not c) and fails.append(m)
chk('__ssk' not in txt and "#selftest'" not in txt, 'clean file has no selftest hook')
chk(txt.count('<!DOCTYPE html>') + txt.count('<!doctype html>') == 1, 'single html document')
import re
code = re.sub(r'<!--.*?-->|/\*.*?\*/', '', txt, flags=re.S)
chk(not any(k in code for k in ('fetch(','XMLHttpRequest','localStorage','sessionStorage','document.cookie')), 'no fetch/XHR/storage/cookie in source')
with sync_playwright() as p:
    br = p.chromium.launch()
    for (w, h, rm) in [(360,740,False),(390,844,False),(430,932,False),(1280,800,False),(390,844,True)]:
        ctx = br.new_context(viewport={'width':w,'height':h}, reduced_motion='reduce' if rm else 'no-preference')
        pg = ctx.new_page(); errs=[]; reqs=[]
        pg.on('console', lambda m: errs.append(m.text) if m.type=='error' else None)
        pg.on('pageerror', lambda e: errs.append(str(e)))
        pg.on('request', lambda r: reqs.append(r.url) if not r.url.startswith(('file:','data:','blob:')) else None)
        pg.goto(clean.as_uri()); pg.wait_for_timeout(600)
        tag = f'{w}x{h}{" reduced-motion" if rm else ""}'
        chk(not errs, f'{tag}: no console/page errors {errs[:2]}')
        chk(not reqs, f'{tag}: no network requests {reqs[:2]}')
        chk(pg.evaluate('document.documentElement.scrollWidth<=innerWidth+1'), f'{tag}: no horizontal overflow')
        chk(not pg.evaluate("document.documentElement.dataset.missingKeys||''"), f'{tag}: no missing i18n keys')
        chk(pg.evaluate('localStorage.length+sessionStorage.length')==0 and pg.evaluate('document.cookie')=='', f'{tag}: storage/cookie empty')
        ctx.close()
    ctx = br.new_context(viewport={'width':390,'height':844}); pg = ctx.new_page()
    pg.goto(selft.as_uri()+'#selftest'); pg.wait_for_timeout(400)
    ok = pg.evaluate('!!window.__ssk')
    chk(ok, 'selftest copy exposes window.__ssk')
    if ok:
        keys = pg.evaluate("""()=>{const s=window.__ssk.getState();s.alias=s.alias||'x';s.bottle={exp:'a',ins:'',wish:'',snip:'bad',cw:false,cwText:''};
          const P=window.__ssk.buildPublicStarPayload(s);return [Object.keys(P).sort(),P.blueprintSnippet]}""")
        chk(keys[0]==sorted(['alias','experience','insight','wish','blueprintSnippet','contentWarning']), f'public payload exactly 6 keys {keys[0]}')
        chk(keys[1] is None, 'invalid snippet -> null')
    br.close()
print('\nRESULT:', 'ALL PASS' if not fails else f'{len(fails)} FAIL'); sys.exit(1 if fails else 0)
