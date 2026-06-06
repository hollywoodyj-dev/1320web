export type CombinationCodes = {
  s1Code: string;
  s3Code: string;
  s2Code: string;
  s0Code: string;
};

export function buildCombinationSignature(codes: CombinationCodes): string {
  return `${codes.s1Code}|${codes.s3Code}|${codes.s2Code}|${codes.s0Code}`;
}
