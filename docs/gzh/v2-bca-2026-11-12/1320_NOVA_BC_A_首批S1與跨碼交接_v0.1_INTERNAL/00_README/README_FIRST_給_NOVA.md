# 1320 TW｜B＋C＋A　NOVA 首批內容與跨碼規則交接

**交付日期：2026-11-12｜候選版 rc1｜INTERNAL CONFIDENTIAL｜CUSTOMER RELEASE HOLD**

## 這次真正交付了什麼

- S1 44 碼：逐碼新寫之台灣繁體**短版敘事候選**，每碼含不同核心、力量、張力、整合方向、短版閱讀敘事；狀態全部 `PENDING_REVIEW`。不是 44 篇已簽核的長篇顧客章節。
- S1 44 碼完整原始欄位：另放 `01_source_register/S1_44_ORIGINAL_SOURCE_FIELDS_INTERNAL.json`，含舊有英文、高風險措辭與來源校驗碼，**永不得以原樣公開**。
- 258 碼來源清單：標出 S0–S9 原始模組與必備欄位，**不代表 S0–S9 皆已翻譯或核准**。
- 跨碼：1980-05-22 六條、1982-02-03 五條＝共 11 條可查來源的候選整合主張（全 PENDING），沿用既有 schema。
- 顧客白名單與命名規約：明確允許內部編輯測試、阻止未核准顧客發佈。
- 完整性 QA：請看 `05_QA/QA_RESULT.md`；注意 PASS 僅代表資料結構／來源引用完整，**不代表人工內容核准**。

## 逐目錄說明

`00_README`：交接說明及回覆文。

`01_source_register`：全 258 碼來源模組清單、S1 完整原文對照。包含可能不適合顧客的內部素材。

`02_S1_review`：44 碼中文候選 JSON、Markdown、編輯 CSV 和候選 Schema。

`03_claims`：11 條候選跨碼 JSONL、原文錨點側錄、原有 v1.0 Schema。

`04_release_contract`：B+C+A Preview/Customer RELEASE gate，命名及安全規則。

`05_QA`：自動結構測試與範圍統計。

## 重要限制

- **258 正式核准仍為 0，S1 正式核准為 0。**
- `anchors[].approval_id="PENDING_NO_APPROVAL"` 是不具任何授權意義的占位符。務必列入發佈拒絕條件。
- S1-04/S1-39 名稱同為「穩定者」；S1-11/S1-26 名稱同為「遠見者」，原型內涵不同，必須按完整 Code 辨識。
- S1-06 台繁名稱候選改為「癒合者」，原來源仍為「愈合者」，未經審核不得鎖定。
- 2026-11-12 首批 S1 短版內容僅可作編輯參照，未達完整付費版長篇敘事品質。正式內容由人類審核者批准後，NOVA 才能引用核准快照。

## NOVA 三問三答

1. **第一批何時？先哪模組？** 本包立即交 S1 44 筆台繁短版候選及原文對照。後續優先 S3 → S2 → S0 → S4–S9；未宣稱已完成其餘模組。
2. **交接格式？** source register JSON／content JSON+Markdown+CSV／claim JSONL+Schema+evidence／release contract JSON／QA。
3. **未滿 258 可測？** 是，**內部授權 Preview** 可以；任何未核准原型或跨碼主張不得進正式收費交付。與所有人的年齡、隱私和安全檢核仍須一致執行。
