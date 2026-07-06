import OpenAI from "openai";
import type { WisewaveTurnRow } from "@/lib/db/types";
import { buildWisewaveSystemPrompt } from "@/lib/wisewave/build-wisewave-system-prompt";
import { getOpenAiClientOptions, getOpenAiModel } from "@/lib/wisewave/openai-config";
import type { ExpressionState } from "@/lib/platform-domain";
import type { WisewaveIntent } from "@/lib/wisewave/types";

type GenerateLlmResponseInput = {
  userMessage: string;
  clientName: string;
  codes: { s1: string; s3: string; s2: string; s0: string };
  blueprintCodesReferenced: string[];
  expressionState: ExpressionState;
  intent: WisewaveIntent;
  growthEdge: string;
  synthesis: string;
  lifeContext: string;
  memorySnippet: string | null;
  priorTurns: WisewaveTurnRow[];
};

export async function generateWisewaveLlmResponse(input: GenerateLlmResponseInput): Promise<string> {
  const client = new OpenAI(getOpenAiClientOptions());
  const system = buildWisewaveSystemPrompt(input);

  const history = input.priorTurns
    .filter((turn) => turn.role === "user" || turn.role === "wisewave")
    .slice(-8)
    .map((turn) => ({
      role: turn.role === "wisewave" ? ("assistant" as const) : ("user" as const),
      content: turn.content,
    }));

  const completion = await client.chat.completions.create({
    model: getOpenAiModel(),
    temperature: 0.65,
    max_tokens: 600,
    messages: [{ role: "system", content: system }, ...history, { role: "user", content: input.userMessage }],
  });

  const content = completion.choices[0]?.message?.content?.trim();
  if (!content) {
    throw new Error("OpenAI returned an empty Wisewave response.");
  }

  return content;
}
