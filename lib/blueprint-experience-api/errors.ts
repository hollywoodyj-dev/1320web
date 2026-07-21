import type { BlueprintExperienceErrorCode } from "@/lib/blueprint-experience-api/types";

const ERROR_COPY: Record<
  BlueprintExperienceErrorCode,
  { message: string; safe_message_zh: string; retryable: boolean; status: number }
> = {
  INVALID_REQUEST: {
    message: "The request is invalid.",
    safe_message_zh: "请求无效，请检查后再试。",
    retryable: false,
    status: 400,
  },
  INVALID_BIRTH_DATE: {
    message: "The supplied birth date is invalid.",
    safe_message_zh: "出生日期无效，请检查后再试。",
    retryable: false,
    status: 400,
  },
  CONSENT_REQUIRED: {
    message: "Required consent is missing.",
    safe_message_zh: "需要先完成必要的同意确认。",
    retryable: false,
    status: 400,
  },
  UNSUPPORTED_LOCALE: {
    message: "The requested locale is not supported.",
    safe_message_zh: "暂不支持该语言设置。",
    retryable: false,
    status: 400,
  },
  UNSUPPORTED_PURPOSE: {
    message: "The requested purpose is not supported.",
    safe_message_zh: "暂不支持该用途。",
    retryable: false,
    status: 400,
  },
  UNAUTHORIZED: {
    message: "Missing or invalid API key.",
    safe_message_zh: "未授权，请检查接口密钥。",
    retryable: false,
    status: 401,
  },
  FORBIDDEN_CLIENT: {
    message: "This client is not permitted.",
    safe_message_zh: "当前客户端未被授权。",
    retryable: false,
    status: 403,
  },
  BLUEPRINT_NOT_FOUND: {
    message: "Blueprint was not found.",
    safe_message_zh: "未找到对应的蓝图。",
    retryable: false,
    status: 404,
  },
  VERSION_CONFLICT: {
    message: "The requested profile version is unavailable.",
    safe_message_zh: "请求的资料版本不可用。",
    retryable: false,
    status: 409,
  },
  IDEMPOTENCY_CONFLICT: {
    message: "Idempotency key was reused with a different request body.",
    safe_message_zh: "幂等键与请求内容不一致。",
    retryable: false,
    status: 409,
  },
  RATE_LIMITED: {
    message: "Too many requests.",
    safe_message_zh: "请求过于频繁，请稍后再试。",
    retryable: true,
    status: 429,
  },
  INTERNAL_ERROR: {
    message: "An unexpected error occurred.",
    safe_message_zh: "服务暂时出现问题，请稍后再试。",
    retryable: true,
    status: 500,
  },
  BLUEPRINT_SERVICE_UNAVAILABLE: {
    message: "Blueprint service is temporarily unavailable.",
    safe_message_zh: "蓝图服务暂时不可用。",
    retryable: true,
    status: 503,
  },
  PROFILE_SERVICE_UNAVAILABLE: {
    message: "Experience profile service is temporarily unavailable.",
    safe_message_zh: "体验资料服务暂时不可用。",
    retryable: true,
    status: 503,
  },
};

export class BlueprintExperienceApiError extends Error {
  readonly code: BlueprintExperienceErrorCode;
  readonly status: number;
  readonly retryable: boolean;
  readonly safe_message_zh: string;

  constructor(code: BlueprintExperienceErrorCode, messageOverride?: string) {
    const meta = ERROR_COPY[code];
    super(messageOverride ?? meta.message);
    this.name = "BlueprintExperienceApiError";
    this.code = code;
    this.status = meta.status;
    this.retryable = meta.retryable;
    this.safe_message_zh = meta.safe_message_zh;
  }
}

export function errorStatus(code: BlueprintExperienceErrorCode): number {
  return ERROR_COPY[code].status;
}

export function toErrorBody(requestId: string, error: BlueprintExperienceApiError) {
  return {
    request_id: requestId,
    error: {
      code: error.code,
      message: error.message,
      safe_message_zh: error.safe_message_zh,
      retryable: error.retryable,
    },
  };
}
