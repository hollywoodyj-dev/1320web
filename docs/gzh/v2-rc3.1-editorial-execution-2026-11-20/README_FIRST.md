# READ FIRST｜1320 NOVA RC3.1 中文潤色執行交接包

**用途：** 可直接轉交 NOVA 的執行指令與審核參考。內部文件，不得對顧客公開。

**此次唯一核心：結構完全不變，只做文字潤色。**

## 文件閱讀次序

1. `MESSAGE_TO_NOVA.md`：交接時可直接轉貼的簡短指令。
2. `NOVA_EDITORIAL_EXECUTION_REQUIREMENTS_RC3_1.md`：完整執行要求（唯一正式編輯指令）。
3. `RC3_STYLE_REFERENCE_SAMPLE_1980.md`：用戶已明確喜歡的 RC3 文字風格示例（品質參考，不是發布核准）。
4. `STRUCTURE_REFERENCE_REPORT_BLUEPRINT_RC1.md`：Sample 四碼、Full 17 章的原有結構。
5. `STRUCTURE_REFERENCE_FULL_1980_RC1.md`、`STRUCTURE_REFERENCE_FULL_1982_RC1.md`：Full 原版章節／資料排列參考。
6. `258_CODE_POLISH_TRACKER.csv`：258 個碼的來源錨點及審閱閘門；含 11 個不可達內部封存碼。
7. `QA_ACCEPTANCE_CHECKLIST.md`、`RELEASE_GATE_AND_CHANGE_CONTROL.json`：逐批機器與真人分離驗收，以及 HOLD 規則。
8. `MANIFEST_SHA256.csv`：檔案完整性驗證。

## 本包未做的工作

本包是「要求書與執行規範」，**不是** NOVA 已接收、已完成 258 碼潤色，亦不是系統已部署。
NOVA 的實際執行結果須由 NOVA 另行產出、真人審閱、正式簽核。

## 不變的狀態

新候選：PENDING_REVIEW / reviewer=null / approved_at=null /
customer_publishable=false / customer_release_state=HOLD。
正式核准仍 0/258；先前 241/258 只是舊候選的人類初步正向閱讀結果。
