# NOVA｜Sample + Full Report RC1 交接說明（內部）

**版本：** `1320-report-blueprint-2026-11-19-rc1`  
**狀態：** 全部 `PENDING_REVIEW`；`reviewer=null`；`approved_at=null`；`customer_publishable=false`  
**動作限制：** 內部入庫或受保護 Preview，可顯示給有權限的編輯審閱者。**不得當成正式顧客報告。**

## 交付內容

- `REPORT_BLUEPRINT_RC1.md`：Sample 完整體驗 + Full 17 章產品結構與每碼敘事標準。
- `SAMPLE_19800522_RC1.md`、`SAMPLE_19820203_RC1.md`：兩組不同生日的 Sample 完整連讀示範。
- `FULL_19800522_17_CHAPTERS_RC1.md`、`FULL_19820203_17_CHAPTERS_RC1.md`：兩份完整 17 章閱讀示範。
- `REPORT_DEMO_CANDIDATES_INTERNAL.json`：20 個已選 Code 的可編輯候選敘事與來源指紋。
- `SOURCE_TRACE_INTERNAL.json`：**嚴格內部**原始資料來源區段及 SHA-256。
- `PROTECTED_PREVIEW_PROJECTION_RC1.json`：去除來源原文的編輯 Preview 投影（仍非可發布資料）。
- `NOVA_REPORT_DATA_CONTRACT_RC1.json`：章節、公式與發布閘門規格。
- `QA_SUMMARY_RC1.md`、`MANIFEST_SHA256.csv`：結構與封包核驗。

## 重要：現有版本的界線

本批設計只示範「v2 保護 Preview」，不覆蓋舊版 `1320_Master_System_Architecture_v2.md` 的產品分層，也不改動 v1 正式站。早期架構列 Free S0–S4、Full S0–S7、Advanced S0–S9；目前專案 v2 目標採 Sample 四碼、Full 十碼 17 章。必須由產品負責人再正式確認產品版本的優先順序，方能觸發外部用戶實施。

S1 RC3.2、S3 RC2 等版本不得因示範被自動視為 APPROVED；S2、S0、S4、S5、S6、S7、S8、S9 也不因「真人基本通過」升級為正式出版版。**目前正式批准仍 0／258**。

## 讀取與匯入規則

1. **先依官方公式計算 Code**，不要先依章節順序計算。S3 依官方振動對照表。
2. 將 Code 綁定**明確鎖定的來源版本**；原始資料中的每一條都可由 `SOURCE_TRACE_INTERNAL.json` 查 SHA-256。
3. 報告模組必須先使用已審核的中文原型定義，之後才允許加入受控的生活假設案例與跨碼橋接。
4. **交叉整合不等於將同一句摘要重複四次或十次**。四碼整合應有 S1→S3、S2→S0 的實際連結，十碼整合應區分 S0–S4／S5–S7／S8–S9 的功能。
5. S5／S6 的原始七項主題欄位須保留追溯（本示範可讀版附七欄對照）；不可把「靈魂使命」當職涯指令，或把 S6 寫成賺錢預言。
6. **安全句必須原字保留：**
   - S2：如果關係裡存在威脅、操控或傷害，保護自身安全比尋找任何『靈魂意義』更重要。
   - S4：涉及人身安全、健康、法律或財務風險的事項，仍應遵守必要的專業標準。
7. `source_text_internal` 及真人審閱私人註記永遠不進一般 Preview 或顧客報告，匯入測試需顯式檢查。
8. S2-01／S2-44～50、S3-10～12 仍保留在源庫，不為了測試強行映射。2008、2013 出生資料只做內部 QA。
9. 報告的跨碼橋接與章 14 文字同樣是**未簽核內容**，不能因基礎碼被基本閱讀通過就自動批准。
10. 在批准與營運允許前，拒絕將 Preview 投影寫入正式報告端點或結帳／價格／Email 發送管線。

## 完成狀態

**已完成：** 兩份 Sample 四碼連讀、兩份 Full 17 章實讀示範、十碼來源追溯、資料契約與編輯驗收。  
**未完成：** 258 碼的所有「定義先行」加長版全量、真人逐碼正式簽核、報告橋接文真人批准、視覺設計定稿、跨平台生產部署及法律審核。

不應以本包宣稱整個產品已可向顧客發布。
