/**
 * T18 plan verifier — Life Path convention divergence over 1900-01-01..2099-12-31.
 * Research question: how much does the displayed number change when conventions differ?
 * Does not name a correct method. Does not measure numerology validity.
 *
 * Convention A: reduce month, day, year separately (keep 11/22/33), then combine.
 * Convention B: sum every birth-date digit; keep 11/22/33 only on the final reduction.
 *
 * Run: node scripts/verify-lifepath-divergence.mjs
 */
const MASTERS = new Set([11, 22, 33]);

function sumDigits(n) {
  let s = 0;
  const str = String(Math.abs(n));
  for (let i = 0; i < str.length; i += 1) s += Number(str[i]);
  return s;
}

function reduceKeepMasters(n) {
  let current = n;
  while (current > 9 && !MASTERS.has(current)) current = sumDigits(current);
  return current;
}

function rootOf(n) {
  if (n === 11) return 2;
  if (n === 22) return 4;
  if (n === 33) return 6;
  return n;
}

function isValidYmd(year, month, day) {
  const d = new Date(Date.UTC(year, month - 1, day));
  return d.getUTCFullYear() === year && d.getUTCMonth() === month - 1 && d.getUTCDate() === day;
}

function conventionA(year, month, day) {
  return reduceKeepMasters(
    reduceKeepMasters(month) + reduceKeepMasters(day) + reduceKeepMasters(year),
  );
}

function conventionB(year, month, day) {
  const digits = `${year}${String(month).padStart(2, "0")}${String(day).padStart(2, "0")}`;
  let sum = 0;
  for (let i = 0; i < digits.length; i += 1) sum += Number(digits[i]);
  return reduceKeepMasters(sum);
}

function pairKey(a, b) {
  return a < b ? `${a}<->${b}` : `${b}<->${a}`;
}

function main() {
  let total = 0;
  let same = 0;
  let different = 0;
  let rootEquivalent = 0;
  let materialRoot = 0;
  let aSurfaces = 0;
  let bSurfaces = 0;
  let bothMasterDifferent = 0;
  const pairCounts = { "2<->11": 0, "4<->22": 0, "6<->33": 0 };
  const pairExamples = {};
  const onlyA = { 11: 0, 22: 0, 33: 0 };
  const onlyB = { 11: 0, 22: 0, 33: 0 };

  for (let year = 1900; year <= 2099; year += 1) {
    for (let month = 1; month <= 12; month += 1) {
      for (let day = 1; day <= 31; day += 1) {
        if (!isValidYmd(year, month, day)) continue;
        total += 1;
        const a = conventionA(year, month, day);
        const b = conventionB(year, month, day);
        if (a === b) {
          same += 1;
          continue;
        }
        different += 1;
        if (rootOf(a) === rootOf(b)) rootEquivalent += 1;
        else materialRoot += 1;

        const key = pairKey(a, b);
        if (key in pairCounts) {
          pairCounts[key] += 1;
          if (!pairExamples[key]) {
            pairExamples[key] = {
              date: `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
              A: a,
              B: b,
            };
          }
        }

        const aMaster = MASTERS.has(a);
        const bMaster = MASTERS.has(b);
        if (aMaster && !bMaster) {
          aSurfaces += 1;
          onlyA[a] += 1;
        } else if (bMaster && !aMaster) {
          bSurfaces += 1;
          onlyB[b] += 1;
        } else if (aMaster && bMaster && a !== b) {
          bothMasterDifferent += 1;
        }
      }
    }
  }

  const divergence = (different / total) * 100;
  const oneIn = total / different;

  const report = {
    total_valid_dates: total,
    same_result: same,
    different_result: different,
    divergence_pct: Number(divergence.toFixed(4)),
    one_in: Number(oneIn.toFixed(2)),
    root_equivalent_disagreement: rootEquivalent,
    materially_different_roots: materialRoot,
    pair_counts: pairCounts,
    pair_examples: pairExamples,
    a_surfaces_master_b_reduces: aSurfaces,
    b_surfaces_master_a_reduces: bSurfaces,
    both_master_but_different: bothMasterDifferent,
    master_only_A: onlyA,
    master_only_B: onlyB,
  };

  console.log(JSON.stringify(report, null, 2));

  const expected = {
    total: 73049,
    same: 62675,
    different: 10374,
    rootEquivalent: 10374,
    materialRoot: 0,
    pair211: 4186,
    pair422: 4069,
    pair633: 2119,
    aSurf: 3457,
    bSurf: 6917,
    onlyA11: 1919,
    onlyB11: 2267,
    onlyA22: 1375,
    onlyB22: 2694,
    onlyA33: 163,
    onlyB33: 1956,
  };

  const checks = [
    ["total", total, expected.total],
    ["same", same, expected.same],
    ["different", different, expected.different],
    ["rootEquivalent", rootEquivalent, expected.rootEquivalent],
    ["materialRoot", materialRoot, expected.materialRoot],
    ["2<->11", pairCounts["2<->11"], expected.pair211],
    ["4<->22", pairCounts["4<->22"], expected.pair422],
    ["6<->33", pairCounts["6<->33"], expected.pair633],
    ["A surfaces", aSurfaces, expected.aSurf],
    ["B surfaces", bSurfaces, expected.bSurf],
    ["11 only A", onlyA[11], expected.onlyA11],
    ["11 only B", onlyB[11], expected.onlyB11],
    ["22 only A", onlyA[22], expected.onlyA22],
    ["22 only B", onlyB[22], expected.onlyB22],
    ["33 only A", onlyA[33], expected.onlyA33],
    ["33 only B", onlyB[33], expected.onlyB33],
  ];

  const failed = checks.filter(([, got, want]) => got !== want);
  if (failed.length) {
    console.error("MISMATCH vs Haze/玄微 target:");
    for (const [name, got, want] of failed) console.error(`  ${name}: got ${got} want ${want}`);
    process.exit(1);
  }
  console.error("PASS: matches Haze/玄微 target counts. Plan verifier only — not a published finding.");
}

main();
