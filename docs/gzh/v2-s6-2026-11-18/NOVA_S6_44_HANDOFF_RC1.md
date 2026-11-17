# NOVA｜S6「價值與接收」44 碼 RC1 交接說明

**package_id**：`1320-zhTW-s6-44-review-2026-11-18-rc1`  
**locale**：`zh-TW`｜**module**：`S6`｜**record_count**：`44`  
**editorial_status**：`PENDING_REVIEW`｜**official_approved_count**：`0`｜**customer_release**：`HOLD`

## 請依順序入庫

1. 先確認接收批次為 `S6-44 RC1`，不得覆蓋 S1／S2／S3／S0／S4／S5 既有候選內容或變更版本狀態。S5 人工閱讀回饋不會讓 S6 自動核准。
2. 只將 `S6_44_CODES_ZH_TW_EDITORIAL_CANDIDATE.json` 儲存於受限 INTERNAL 資料層。其 `source_field_anchors`（7 欄／碼）、`legacy_source_anchors_internal`（4 欄／碼）、`source_text_internal` 與 SHA-256 不得進顧客 API、browser bundle、靜態頁或正式報告。
3. 若需內部受保護 Preview，使用 `S6_44_PROTECTED_PREVIEW_PROJECTION.json` 的白名單內容；加上權限檢查，仍保留 `customer_publishable=false`，禁止公開存取。
4. S6 既有計算公式 **`(S1 + S3 + S0) mod 44`；餘數 0 → S6-44**；不變更其他模組公式，不為測試硬給不可達碼。
5. 全筆 `PENDING_REVIEW`、`reviewer=null`、`approved_at=null`、`approval_id=null`、`customer_publishable=false`。真人正式審閱須在獨立程序中由真實指定審閱者填入簽核資訊，AI 不代填。
6. 來源中 Money Archetypes 只作 provenance。顧客敘事不可承諾收入、成功、財富或投資結果；不得把象徵解讀當成真實心理診斷、職涯規劃或金融建議。
7. S6 RC1 是 **44 篇獨立短篇候選**，不是 Full 17 章完整核准，也不等於跨碼整合、支付或 customer release 已通過。
8. 正式站 v1.0、價格、結帳、映射與 `customer release HOLD` 全數不變。

## 校準生日（只供 INTERNAL）

| Birth date | S1 | S3 | S0 | S6 | 中文候選名稱 |
|---|---|---|---|---|---|
| 1980-05-22 | S1-18 | S3-03 | S0-07 | **S6-28** | 深度轉化者 |
| 1982-02-03 | S1-20 | S3-01 | S0-05 | **S6-26** | 策略行動者 |
| 2008-12-08 | S1-10 | S3-03 | S0-01 | **S6-14** | 結構流動者 |
| 2013-06-12 | S1-06 | S3-02 | S0-15 | **S6-23** | 可靠貢獻者 |

最後兩組未成年日期僅可內部測試，不得用作對外個人化報告。

## NOVA 須執行的驗收

- JSON 檔可解析；恰好 `S6-01`～`S6-44` 44 筆，無重複 Code。
- 每筆 7 個正式來源錨點、4 個 legacy 錨點，與本批 source SHA-256 一致。
- 每筆具原型獨立短篇、生命反思問題、狀態及發布閘門。
- 審閱 CSV 44 筆均未填入 reviewer、approved_at；不存在被自動變成 APPROVED 的資料。
- Preview 投影不得含任何 `source_text_internal`、來源 SHA、來源內部備註。
- 完成四組生日連讀測試；**不得自動觸發 Checkout、Pricing、公開 API 或 Live Deployment**。

> 此包的自動 QA 只確認結構、來源與交接閘門；不代表真人閱讀或正式核准。
