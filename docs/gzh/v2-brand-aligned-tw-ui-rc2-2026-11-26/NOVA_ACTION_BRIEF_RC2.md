# 給 NOVA｜1320 台灣版網站 RC2 品牌對齊指令

請使用本交接包中的 `index.html` 和 `NOVA_BRAND_ALIGNMENT_SPEC_RC2.md` 作為台灣版新的 UI 實作**參考候選**。

**唯一主軸：讓繁體中文版看起來就是英文 `1320soulcode.com` 的同一個品牌。**
這意味著：
1. 使用原始 1320 Logo／英文品牌名稱，以及深夜藍＋金色幾何語彙。
2. 對齊英文版的頁面節奏：Meet Soul Blueprint → What is 1320 → Four Foundation Mirrors → Recognition/Reflection/Integration/Embodiment → Free/Full → Your Code → FAQ。
3. 中文只調整語氣與閱讀友善性；Code、Sample 四碼順序、Full 17 章和「象徵鏡子、非命運、尊重自主」定位不變。
4. 此 HTML 提供 **三組已核對生日的前端示例**，任意其他生日不會假稱已產出 Code。正式版要接後台驗證計算。
5. 不內嵌完整未核准 RC3 報告文案；不實作假的購買成功、登入或付費解鎖。
6. 目前 `index.html` 的 CSS HEX 僅是根據英文官方 Logo 推導的**設計近似值**；請從英版正式原始專案提取核准 tokens、字體與組件後再最後鎖定。
7. 所有新中文版內容仍待真人審閱；正式網站與英文版、價格、結帳、帳戶權限、映射公式均保持原狀。

**交付 NOVA 的檔案：** `index.html`（可操作原型）、四張桌面／手機視覺截圖、`NOVA_BRAND_ALIGNMENT_SPEC_RC2.md`、`QA_BROWSER_RC2.md`、`MANIFEST_SHA256.csv`。

**NOVA 應回報：**
- 官方英版現有 Design Tokens 的取得方式／版本。
- 本次 RC2 視覺與英版的實際差異清單。
- 已採用或待確認的標誌、字體、按鈕、顏色。
- TW 文案本地化及內容／API 與權限接線方案。
- 桌面／手機／可用性／安全與發布 gate 的 QA。
- 受保護的 Preview 連結、供真人審閱的版本，**不是正式部署證明**。

狀態：`PENDING_REVIEW / reviewer=null / approved_at=null / customer_publishable=false / HOLD`。
