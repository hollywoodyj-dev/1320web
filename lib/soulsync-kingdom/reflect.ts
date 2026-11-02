import OpenAI from "openai";
import { BlueprintExperienceApiError } from "@/lib/blueprint-experience-api/errors";
import { getOpenAiClientOptions, getOpenAiModel, isOpenAiConfigured } from "@/lib/wisewave/openai-config";

const BODY_KEYS = new Set(["locale", "purpose", "choices"]);
const CHOICE_KEYS = new Set(["module", "choice", "relation"]);
const MODULES = ["s1", "s3", "s2", "s0"] as const;

const CHOICES: Record<(typeof MODULES)[number], ReadonlySet<string>> = {
  s1: new Set(["part", "some", "no", "rename", "unsure"]),
  s3: new Set(["stay", "observe"]),
  s2: new Set(["say", "need", "dist", "look", "none"]),
  s0: new Set(["blank", "word", "carry", "wait", "back"]),
};

const RELATIONS = new Set<string>(["family", "friend", "close", "peer", "past", "none"]);

const CHOICE_LABEL: Record<string, string> = {
  "s1:part": "本源：这像我此刻的一部分",
  "s1:some": "本源：只有某些时候像",
  "s1:no": "本源：我不认同这个描述",
  "s1:rename": "本源：我想给它另一个名字",
  "s1:unsure": "本源：暂时说不清",
  "s3:stay": "节奏：在这里停一会儿",
  "s3:observe": "节奏：只观察，不改变",
  "s2:say": "关系：我想表达一句话",
  "s2:need": "关系：我想先听见自己的需要",
  "s2:dist": "关系：我想设下一段距离",
  "s2:look": "关系：我只想看看倒影",
  "s2:none": "关系：现在不进入这段关系",
  "s0:blank": "留白：留一片空白",
  "s0:word": "留白：把一个词暂时放下",
  "s0:carry": "留白：带着它离开",
  "s0:wait": "留白：不急着回答",
  "s0:back": "留白：返回地图",
};

const RELATION_LABEL: Record<string, string> = {
  family: "家人",
  friend: "朋友",
  close: "亲密的人",
  peer: "同事或同伴",
  past: "过去的自己",
  none: "暂时不选关系",
};

const DATE_PATTERN = /\d{4}-\d{2}-\d{2}/;

export type KingdomChoice = {
  module: (typeof MODULES)[number];
  choice: string;
  relation?: string;
};

export type KingdomReflectOutput = {
  status: number;
  body: Record<string, unknown>;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function fail(requestId: string, code: "INVALID_REQUEST" | "BLUEPRINT_SERVICE_UNAVAILABLE"): KingdomReflectOutput {
  const error = new BlueprintExperienceApiError(code);
  return {
    status: error.status,
    body: {
      request_id: requestId,
      error: {
        code: error.code,
        message: error.message,
        safe_message_zh: error.safe_message_zh,
        retryable: error.retryable,
      },
    },
  };
}

export function parseKingdomChoices(body: unknown): KingdomChoice[] {
  if (!isRecord(body)) throw new BlueprintExperienceApiError("INVALID_REQUEST");
  if (Object.keys(body).some((key) => !BODY_KEYS.has(key))) {
    throw new BlueprintExperienceApiError("INVALID_REQUEST");
  }
  if (body.locale !== "zh-CN" || body.purpose !== "soulsync_kingdom") {
    throw new BlueprintExperienceApiError("INVALID_REQUEST");
  }
  if (!Array.isArray(body.choices) || body.choices.length < 1 || body.choices.length > 4) {
    throw new BlueprintExperienceApiError("INVALID_REQUEST");
  }

  const seen = new Set<string>();
  const choices: KingdomChoice[] = [];
  for (const item of body.choices) {
    if (!isRecord(item)) throw new BlueprintExperienceApiError("INVALID_REQUEST");
    if (Object.keys(item).some((key) => !CHOICE_KEYS.has(key))) {
      throw new BlueprintExperienceApiError("INVALID_REQUEST");
    }
    const moduleName = item.module;
    const choice = item.choice;
    if (typeof moduleName !== "string" || typeof choice !== "string") {
      throw new BlueprintExperienceApiError("INVALID_REQUEST");
    }
    if (!MODULES.includes(moduleName as (typeof MODULES)[number])) {
      throw new BlueprintExperienceApiError("INVALID_REQUEST");
    }
    if (seen.has(moduleName)) throw new BlueprintExperienceApiError("INVALID_REQUEST");
    seen.add(moduleName);
    const allowed = CHOICES[moduleName as keyof typeof CHOICES];
    if (!allowed.has(choice)) throw new BlueprintExperienceApiError("INVALID_REQUEST");
    if (DATE_PATTERN.test(choice)) throw new BlueprintExperienceApiError("INVALID_REQUEST");

    const parsed: KingdomChoice = {
      module: moduleName as KingdomChoice["module"],
      choice,
    };
    if ("relation" in item) {
      if (moduleName !== "s2" || typeof item.relation !== "string" || !RELATIONS.has(item.relation)) {
        throw new BlueprintExperienceApiError("INVALID_REQUEST");
      }
      parsed.relation = item.relation;
    }
    choices.push(parsed);
  }
  return choices;
}

function summaryOf(choices: KingdomChoice[]): string {
  return choices
    .map((item) => {
      const label = CHOICE_LABEL[`${item.module}:${item.choice}`] ?? item.choice;
      return item.relation ? `${label}（${RELATION_LABEL[item.relation] ?? item.relation}）` : label;
    })
    .join("；");
}

function oneSentence(text: string): string {
  const compact = text.replace(/\s+/g, "").trim();
  const sentence = (compact.split(/(?<=[。！？])/)[0] ?? compact).slice(0, 80).trim();
  if (!sentence || DATE_PATTERN.test(sentence)) {
    console.info("[soulsync-kingdom] reflect model", { reason: "empty" });
    throw new BlueprintExperienceApiError("BLUEPRINT_SERVICE_UNAVAILABLE");
  }
  if (/出生|振动|療癒|疗愈|预测|人格|你将会|你会变成/.test(sentence)) {
    console.info("[soulsync-kingdom] reflect model", { reason: "rejected" });
    throw new BlueprintExperienceApiError("BLUEPRINT_SERVICE_UNAVAILABLE");
  }
  return sentence;
}

async function completeWithModel(summary: string): Promise<string> {
  if (!isOpenAiConfigured()) {
    console.info("[soulsync-kingdom] reflect model", { reason: "unconfigured" });
    throw new BlueprintExperienceApiError("BLUEPRINT_SERVICE_UNAVAILABLE");
  }
  const client = new OpenAI(getOpenAiClientOptions());
  const model = getOpenAiModel();
  const isGpt5Family = /^gpt-5/i.test(model);
  let text = "";
  try {
    const completion = await client.chat.completions.create({
      model,
      ...(isGpt5Family ? { max_completion_tokens: 600 } : { temperature: 0.4, max_tokens: 600 }),
      messages: [
        {
          role: "system",
          content: "只写一句简体中文，描述玩家刚才点过的选项。不评价这个人，不写等级，不写未来，不承诺改变。不写日期、编号或姓名。",
        },
        { role: "user", content: summary },
      ],
    });
    text = completion.choices[0]?.message?.content?.trim() ?? "";
    if (!text) {
      console.info("[soulsync-kingdom] reflect model", {
        reason: "empty",
        finish: completion.choices[0]?.finish_reason ?? "none",
      });
    }
  } catch (error) {
    if (error instanceof BlueprintExperienceApiError) throw error;
    const status = typeof error === "object" && error && "status" in error ? Number((error as { status?: unknown }).status) : null;
    const code = typeof error === "object" && error && "code" in error ? (error as { code?: unknown }).code : null;
    console.info("[soulsync-kingdom] reflect model", {
      reason: "model_error",
      status: Number.isFinite(status) ? status : null,
      code: typeof code === "string" ? code : null,
    });
    throw new BlueprintExperienceApiError("BLUEPRINT_SERVICE_UNAVAILABLE");
  }
  if (!text) throw new BlueprintExperienceApiError("BLUEPRINT_SERVICE_UNAVAILABLE");
  return oneSentence(text);
}

export async function reflectSoulSyncKingdom(
  body: unknown,
  options?: {
    requestId?: string;
    complete?: (summary: string) => Promise<string>;
  },
): Promise<KingdomReflectOutput> {
  const requestId = options?.requestId ?? "req_kingdom_reflect";
  try {
    const choices = parseKingdomChoices(body);
    const summary = summaryOf(choices);
    const complete = options?.complete ?? completeWithModel;
    const text = oneSentence(await complete(summary));
    return {
      status: 200,
      body: {
        request_id: requestId,
        text,
        governance: {
          symbolic_only: true,
          non_predictive: true,
          non_diagnostic: true,
          user_agency_required: true,
        },
      },
    };
  } catch (error) {
    if (error instanceof BlueprintExperienceApiError && error.code === "INVALID_REQUEST") {
      return fail(requestId, "INVALID_REQUEST");
    }
    return fail(requestId, "BLUEPRINT_SERVICE_UNAVAILABLE");
  }
}
