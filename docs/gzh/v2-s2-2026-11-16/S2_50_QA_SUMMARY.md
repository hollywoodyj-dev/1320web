# S2-50 RC1｜QA 結果摘要（內部）

**包 ID**：`1320-zhTW-s2-50-review-2026-11-16-rc1`

## 全量結構檢查

- **結果**：PASS（20 項機器檢查，失敗 0 項）。
- **候選數**：50／50。
- **敘事差異**：50 個獨立文本，皆為兩段敘事；最短 134 字元，最長 175 字元（含段落空白）。
- **原始來源**：每筆 10 欄，合計 500 個來源欄位；保留原文、逐欄 SHA-256 和逐碼 SHA-256。
- **原始來源檔案指紋**：`8fa43b3f70f9a0b7d7daa5232767ed5cb02de9cb31aa74901941a8e860c95680`。
- **現行可達性**：42（S2-02～S2-43），不可達 8（S2-01、S2-44～S2-50）。
- **校準**：1980-05-22→S2-27；1982-02-03→S2-05；2008-12-08→S2-20；2013-06-12→S2-18。
- **候選標記**：50／50 `PENDING_REVIEW`，`reviewer=null`，`approved_at=null`，`customer_publishable=false`。
- **關係安全句**：50／50 完整保留，原文如下：

> 如果關係裡存在威脅、操控或傷害，保護自身安全比尋找任何『靈魂意義』更重要。

## 尚未通過／不可自動聲稱通過

- **語義忠實度的獨立真人覆核**：未完成。
- **全部 50 個原型正式中文名稱鎖定**：未完成。
- **文學敘事品質與同類原型差異的真人連讀**：未完成。
- **正式 Approved 內容快照**：未建立。
- **Preview UI、資料導流、Customer 發布門檻實機測試**：未完成。
- **S0／S4 其他模組**：未包含在此批。

機器檢查通過不是內容核准，也不代表 NOVA 已進行動態輸出驗收。顧客發布繼續 **HOLD**。

## 已執行機器檢查

- **PASS**：S2 source code count 50 unique
- **PASS**：Candidate 50 unique codes
- **PASS**：Candidate codes exactly S2-01..S2-50
- **PASS**：50 distinct narratives
- **PASS**：50 distinct traditional Chinese names
- **PASS**：All narrative items have 2 nonempty paragraphs
- **PASS**：All records preserve 10 source field hashes
- **PASS**：All 50 source raw records preserve 10 source field texts
- **PASS**：Exact source file fingerprint
- **PASS**：Anchors hash check
- **PASS**：All 50 record fingerprints map to raw source
- **PASS**：No approved records / null reviewers & approval dates
- **PASS**：All customer_publishable=false
- **PASS**：Required exact relationship safety sentence 50/50
- **PASS**：Only 02-43 reachable, total 42
- **PASS**：Four calibrated birthdays S2 mapping
- **PASS**：Candidate JSON saved matches in-memory
- **PASS**：CSV has 50 complete tracking rows
- **PASS**：CSV reviewer/approval/human decision blank
- **PASS**：All four calibration codes exist
