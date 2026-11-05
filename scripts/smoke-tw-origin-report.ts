import { buildTwOriginReport } from "../lib/gzh/tw-origin-report";
import { isTwOriginReportEnabled } from "../lib/gzh/tw-origin-report-access";

function assert(condition: unknown, label: string) {
  if (!condition) {
    console.error(`FAIL ${label}`);
    process.exitCode = 1;
    throw new Error(label);
  }
  console.log(`PASS ${label}`);
}

const report = buildTwOriginReport(1980, 5, 22);
assert(report.codes.join(" / ") === "S1-18 / S3-03 / S2-27 / S0-07 / S4-14 / S5-04 / S6-28 / S7-00 / S8-00 / S9-07", "fixture codes");
assert(report.sections.length === 10, "ten sections");
assert(report.sections.every((section) => section.name.length > 0 && section.fields.every((field) => field.text.length > 0)), "every section has a name and five fields");
assert(report.sections[0]?.moduleName === "靈魂本源", "uses the origin module name");
assert(report.sections[3]?.moduleName === "空性之門", "s0 keeps the origin module name");
assert(report.sections[9]?.moduleName === "回源之門", "s9 keeps the origin module name");
assert(report.days[4]?.module === "S5", "day 5 points at the whole s5 module");
assert(isTwOriginReportEnabled("www.1320soulcode.com") === false, "production host closed");
assert(isTwOriginReportEnabled("localhost:3024") === true, "local review open");
console.log(report.sections.map((section) => `${section.code} ${section.name}`).join(" | "));
console.log("PASS tw origin report");
