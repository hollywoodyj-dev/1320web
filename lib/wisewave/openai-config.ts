/** OpenAI provider config for Wisewave response generation. */

const DEFAULT_MODEL = "gpt-4o-mini";

export function isOpenAiConfigured(): boolean {
  return Boolean(process.env.OPENAI_API_KEY?.trim());
}

export function getOpenAiModel(): string {
  return process.env.OPENAI_MODEL?.trim() || DEFAULT_MODEL;
}

export function getOpenAiClientOptions(): { apiKey: string } {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured.");
  }
  return { apiKey };
}
