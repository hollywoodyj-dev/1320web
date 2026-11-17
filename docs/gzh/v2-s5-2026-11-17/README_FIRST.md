# README FIRST｜1320 S5-44 台繁 RC1（INTERNAL）

**包 ID：** `1320-zhTW-s5-44-review-2026-11-17-rc1`

**用途：** 給 1320 內容負責人與 NOVA 的 S5 全量編輯候選。不是正式顧客版本或已核准快照。

## 閱讀順序

1. `S5_44_台繁獨立短篇逐碼審閱候選_RC1.md`：所有 44 碼的真人閱讀稿。
2. `S5_44_SOURCE_AND_SAFETY_NOTES.md`：原始七欄與風險核對。
3. `S5_44_CONTINUOUS_READING_NOTES.md`：四個校準生日的連讀背景。
4. `S5_44_EDITORIAL_TRACKER_RC1.csv`：真人審閱欄位，空白未填。
5. `S5_44_CODES_ZH_TW_EDITORIAL_CANDIDATE.json`：供 NOVA 內部匯入的完整 JSON，含僅 INTERNAL 來源全文。
6. `S5_44_SOURCE_FIELD_ANCHORS_INTERNAL.json`：完整原始七欄及指紋。
7. `S5_44_PROTECTED_PREVIEW_PROJECTION.json`：不含來源原文的受保護 Preview 投影，仍不可顧客發布。
8. `S5_44_QA_SUMMARY.md`：自動結構檢查結果（不是內容核准）。
9. `NOVA_S5_44_HANDOFF.md`：接入邊界與版本說明。
10. `S5_44_CALIBRATION_FIXTURES_INTERNAL.json`：四個生日的 S5 公式測試。

**下一模組順序：** S6（44）→ S7（7）→ S8（8）→ S9（9）；本包只交付 S5。

## HARD HOLD

- 44／44 `PENDING_REVIEW`；正式核准 0。
- `reviewer`、`approved_at`、`approval_id` 全部 null。
- `customer_publishable=false`；顧客端發布 HOLD。
- 不更動 v1.0、正式站、價格、結帳與映射公式。
- `source_text_internal` 永遠不得輸出到顧客端。
