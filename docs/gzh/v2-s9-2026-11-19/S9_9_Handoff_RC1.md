# NOVA｜S9-9 RC1 技術交接

**Package ID：** `1320-zhTW-s9-9-definition-narrative-2026-11-19-rc1`  
**批次範圍：** `S9-00`～`S9-08`（9／9）  
**來源：** `1320_S9_Return_to_Source_Content_Database_v1_EN.md`，SHA-256 `4b3673688832fa909f6733073eada0c392ee202c295dc74e08c4b1e1d56b832c`  
**計算：** `S9 = (S1 + S0 + S7 + S8) mod 9`（0 有效）

## 匯入順序

1. 解壓完整 ZIP 至 **INTERNAL** 區域。
2. 使用 `S9_9_CODES_ZH_TW_EDITORIAL_CANDIDATE.json` 匯入內容候選；原始來源欄位僅限內部資料與追溯。
3. 校對 `S9_9_SOURCE_ANCHORS_INTERNAL.csv`、`S9_9_EDITORIAL_TRACKER_RC1.csv` 與 `S9_9_QA_SUMMARY.md`。
4. 若需要預覽，僅使用 `S9_9_PROTECTED_PREVIEW_NO_SOURCE.json`，並要求身分驗證；資料仍不可對外發行。
5. 僅在真人獨立簽核、版本核對及正式授權後，才由發布流程另外處理；本包不存在自動 APPROVED 或公開開關。

## 強制發布閘門
- 9／9 `editorial_status=PENDING_REVIEW`
- 9／9 `reviewer=null`、`approved_at=null`
- 9／9 `customer_publishable=false`
- `official_approved_count=0`；`customer_release=HOLD`
- 任何 `source_text_internal`／`source_field_anchors`／`source_anchor`／`source_name_original` 不得出現在顧客頁面或無權限 Preview

## 不得改動
- v1.0、正式站、價格、結帳、既有公式不變
- 禁止自行將不可達碼映射為可達或強行顯示；本模組依既有餘數規則可達 S9-00～08
- 不推定真實人生經歷；不得用單一校準生日的故事覆蓋其他生日
- S9-05「臣服」與 S9-06「寬恕」不得作為服從、原諒加害者、放棄安全措施的暗示

## 版本關係
此 S9 RC1 為獨立新批次；已入庫 S0～S8 的審閱與核准狀態不受影響。文稿完成、結構驗證及真人閱讀通過，均不自動等於正式核准。
