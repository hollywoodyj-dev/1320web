/**
 * T18 / T30 cross-check — Master Number directionality split.
 * Queued. Not a publication artifact. Do not publish these counts
 * until the reproducible research product is complete (T30).
 *
 * Run: node scripts/verify-master-split.mjs
 */
const M = new Set([11, 22, 33]);
const ds = (n) => {
  let s = 0;
  while (n > 0) {
    s += n % 10;
    n = Math.floor(n / 10);
  }
  return s;
};
const rp = (n) => {
  while (n > 9 && !M.has(n)) n = ds(n);
  return n;
};
const A = (y, m, d) => rp(rp(m) + rp(d) + rp(y));
const B = (y, m, d) => rp(ds(y) + ds(m) + ds(d));
const leap = (y) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
const di = (y, m) => [31, leap(y) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m - 1];
let aOnly = 0;
let bOnly = 0;
let both = 0;
let diff = 0;
const per = { 11: { a: 0, b: 0 }, 22: { a: 0, b: 0 }, 33: { a: 0, b: 0 } };
for (let y = 1900; y <= 2099; y++) {
  for (let m = 1; m <= 12; m++) {
    for (let d = 1; d <= di(y, m); d++) {
      const a = A(y, m, d);
      const b = B(y, m, d);
      if (a === b) continue;
      diff++;
      const am = M.has(a);
      const bm = M.has(b);
      if (am && !bm) {
        aOnly++;
        per[a].a++;
      } else if (bm && !am) {
        bOnly++;
        per[b].b++;
      } else if (am && bm) both++;
    }
  }
}
console.log("disagreements       ", diff);
console.log("A-only Master       ", aOnly);
console.log("B-only Master       ", bOnly);
console.log("both Master         ", both);
console.log("aOnly+bOnly         ", aOnly + bOnly);
console.log("B/A ratio           ", (bOnly / aOnly).toFixed(3));
for (const k of [11, 22, 33]) {
  console.log(`  ${k}: A=${per[k].a}  B=${per[k].b}  ratio=${(per[k].b / per[k].a).toFixed(2)}`);
}
