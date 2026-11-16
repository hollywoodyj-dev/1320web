# 1320 TW v2｜NOVA 第一批 S3 全量交接（2026-11-16）

**package_id**：`1320-zhTW-s3-12-review-2026-11-16-rc1`  
**模組**：S3／靈魂振動／12 筆  
**來源資料庫**：`1320_S3_Soul_Vibration_Content_Database_v2_EN.json`（v2.0）  
**來源檔 SHA-256**：`45db7ba264113bd9467042b5f103b04836b370a86f9613a2d38a92a735d31a07`  
**映射規則 SHA-256**：`db00f33add54ecae4a39fd0c2b06040459efe180f8cdd72e4f4a7e2285b7826d`

## 本批已交付

1. `S3_12_台繁獨立短篇逐碼審閱候選_RC1.md` — 12 個候選名稱、四個摘要欄位及逐碼獨立短篇
2. `S3_12_CODES_ZH_TW_EDITORIAL_CANDIDATE.json` — NOVA 可匯入的候選內容，完整來源錨點與發布閘門
3. `S3_12_SOURCE_ANCHORS_INTERNAL.jsonl` — 每碼原始 **20 個欄位**與逐欄 SHA-256（含公式範圍等內部欄位，嚴禁顧客渲染）
4. `S3_12_EDITORIAL_TRACKER.csv` — 審核台帳；真人狀態與時間欄位空白
5. `S3_12_QA_SUMMARY.md` — 一致性、字段與可達性檢查
6. `S3_12_CONTINUOUS_READING_NOTES.md` — 三組校準生日與連讀驗收注意事項

## 優先審閱項目

- **S3-01**：種子不等於幼化、未成熟或靈魂等級
- **S3-04**：覺醒不等於優越或有資格判斷他人
- **S3-05～06**：創傷／痛苦不是已知讀者經歷，不得要求受苦以求成長
- **S3-08**：療癒不是臨床資格或醫療能力
- **S3-09**：導師不是心靈權威或專業職銜
- **S3-10～12**：來源保留不可達編碼，不能因資料存在而強行給顧客
- **全部 12 碼**：單一報告不得顯示靈魂排名、成熟度或比較表

## 顧客發布 Gate（必須遵守）

**本批所有內容**：
- `editorial_status = "PENDING_REVIEW"`
- `reviewer = null`
- `approved_at = null`
- `customer_publishable = false`
- `internal_preview_candidate = true`
- 不產生 `approved_content_snapshot`
- 不授權對外顧客使用

受保護 Preview 僅可在明確測試／編輯模式使用候選稿，顯示未核准標記，不能透過公開路由或付費下載洩漏。

正式顧客 Sample 需要 S1、S3、S2、S0 全部涉及的 Code 及四碼整合經正式核准；Full 另需 S4～S9 及相應跨碼主張。缺少任一核准來源仍須 `BLOCKED_NO_APPROVED_SOURCE`。

## 版本與流程

S1 RC2 的 44 篇改寫稿**不因 S3 交付而獲准**。S1 審核獨立進行。  
下一批優先順序：**S2（50）→ S0（20）→ S4（20）**。  
v1.0 鎖定；v2.0 限受保護 Preview；正式站、價格、結帳及顧客發布 HOLD 均不變。

**這是可審閱候選內容的交付，不是正式核准或 NOVA 動態生成已通過的證明。**
