import type { Locale } from "@/lib/types/1320-content";
import type { SynthesisLayerInput } from "@/lib/types/integrated-soul-blueprint";

export type IntegrationPractice = {
  number: string;
  title: string;
  body: string;
};

export function generateIntegrationPractices(
  input: SynthesisLayerInput,
  locale: Locale,
): IntegrationPractice[] {
  if (locale === "zh") {
    return [
      {
        number: "01",
        title: "观察镜像",
        body: `当关系触发你时，问自己：我是在给予以连接，还是在给予以换取价值？（${input.s2.chineseTitle}）`,
      },
      {
        number: "02",
        title: "价值回到内在",
        body: `每天一次，命名一个你本就拥有的品质，而不需要外在认可。（${input.s0.chineseTitle}）`,
      },
      {
        number: "03",
        title: "让光自然流露",
        body: `选择一个场景，停止表演自信，只是如实在场。（${input.s1.chineseTitle} · ${input.s3.chineseTitle}）`,
      },
    ];
  }

  if (
    input.s1.code === "S1-24" &&
    input.s3.code === "S3-04" &&
    input.s2.code === "S2-23" &&
    input.s0.code === "S0-09"
  ) {
    return [
      {
        number: "01",
        title: "Observe the Mirror",
        body: "When a relationship triggers you, ask: am I giving to connect, or giving to earn worth?",
      },
      {
        number: "02",
        title: "Return Worth Inward",
        body: "Once daily, name one quality you carry without needing recognition.",
      },
      {
        number: "03",
        title: "Let Your Light Be Natural",
        body: "Choose one place where you can stop performing confidence and simply be present.",
      },
    ];
  }

  return [
    {
      number: "01",
      title: "Observe the Mirror",
      body: `When a relationship triggers you, ask what ${input.s2.englishTitle.replace(/^The /, "")} is showing you about ${input.s0.englishTitle.toLowerCase()}.`,
    },
    {
      number: "02",
      title: "Return Worth Inward",
      body: `Once daily, name one quality of ${input.s1.englishTitle.replace(/^The /, "")} you already carry — without proving it.`,
    },
    {
      number: "03",
      title: "Express With Grounding",
      body: `Notice one moment where ${input.s3.englishTitle.toLowerCase()} energy becomes force. Pause and choose grounded presence instead.`,
    },
  ];
}
