# 1320 跨碼關係主張｜首批候選庫

- `INTEGRATION_CLAIMS_1980_1982_PENDING.jsonl` 內含 11 條**具原文錨點的編輯候選關係**，不是經審核的正式規則。
- 1980-05-22：6 條；1982-02-03：5 條。
- 關係類型：`REINFORCEMENT`（呼應）、`TENSION`（張力）、`BRIDGE`（橋接）、`GROUNDING`（落地）。
- 使用既有 `1320_INTEGRATION_CLAIM_SCHEMA_1.0.0-rc1.json`。
- `anchors[].approval_id = PENDING_NO_APPROVAL` 僅為**符合現有 schema 的無效占位符**，絕非核准憑證。任何 approval_id 等於此值者一律 `customer_publishable=false`。
- `CLAIM_SOURCE_EVIDENCE_INTERNAL.json` 保留來源欄位原文、模組版本與校驗碼，**必須留在內部服務端**。
- 章節標示為編輯的適用範圍候選：第 02／07／14 章。第 07 章僅可使用 S1/S3/S2/S0 的組合；不得把 S4–S9 跨碼主張放進第 07 章。
- 動態生成不得無視組合差異：未覆蓋的任意生日組合，應停止正式敘事輸出；可在 Preview 產生明確標記的候選稿等待編輯審核。
- 正式上線前，需建立經核准的可重用跨碼「規則集合」，目前 11 條均是 fixture-specific CANDIDATE，尚不足以支持任意生日。
