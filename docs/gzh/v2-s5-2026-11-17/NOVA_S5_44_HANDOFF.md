# NOVA｜S5-44 RC1 交接說明

**package_id**: `1320-zhTW-s5-44-review-2026-11-17-rc1`
**locale**: `zh-TW`｜**module**: `S5`｜**record_count**: `44`
**editorial_status**: `PENDING_REVIEW`｜**approved_count**: `0`｜**customer_release**: `HOLD`

## 匯入規則

1. 本包與先前 S1／S3／S2／S0／S4 候選版本並存，不覆蓋任何既有 APPROVED 記錄；目前為 0。
2. 將 `S5_44_CODES_ZH_TW_EDITORIAL_CANDIDATE.json` 僅存內部資料層。若讀寫受保護 Preview，使用只含顧客閱讀候選欄位的 `S5_44_PROTECTED_PREVIEW_PROJECTION.json`，並以內部白名單保護。
3. **不得**將來源全文、`source_text_internal`、來源指紋、原文欄位或來源 QA 備註暴露在公開 API、瀏覽器或正式報告中。受保護 Preview 的候選欄位也不允許直接對顧客發布。
4. 請依原公式 `(S1 + S2 + S3) mod 44`，餘數 0 顯示 S5-44；NOVA 不補寫、不推演新原型內容。
5. `editorial_status` 只能由指定的人類審閱程序更新；`reviewer` 和 `approved_at` 必須是實際人類簽核資訊，不能由匯入腳本自動填入。
6. 真人短篇核准不等於 Full 17 章、七日引導、跨碼主張、支付或 customer release 核准；正式發布需另行批准。
7. 原始 7 個主題來源欄位中的 **How Your Patterns Become Mission** 是 S5 特定性的主要依據；`Mature Expression`、`Wisewave Reflection` 存在跨碼重複，不可單獨用於生成個人化文章。

## 版本與技術安全

- `S5 RC1` 與先前來源層既存候選彼此區分；本包不取代原始 S5 v4。
- 顧客發布閘門 `customer_publishable=false`；未核准來源 → fail closed。
- 純 JSON／MD／CSV；不需要變更產品計算公式、Checkout、Pricing 或 live deployment。

## 校準出生日期（僅內部）

| Birthday | S1 | S3 | S2 | S5 |
|---|---|---|---|---|
| 1980-05-22 | S1-18 | S3-03 | S2-27 | S5-04 結構使命 |
| 1982-02-03 | S1-20 | S3-01 | S2-05 | S5-26 可能性使命 |
| 2008-12-08 | S1-10 | S3-03 | S2-20 | S5-33 慈悲領導使命 |
| 2013-06-12 | S1-06 | S3-02 | S2-18 | S5-26 可能性使命 |

2008 與 2013 年測試生日目前未滿 18 歲，僅作內部校準。

## 技術結構自動驗證

- `27/27` checks PASS。
- 來源錨點 308／308，原文 Safe Language Note 44／44。
- 44 筆無空白正文，44 筆顧客發布權限均為 false。
- 本結果不是真人內容合格聲明。
