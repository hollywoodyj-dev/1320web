# NOVA｜1320 TW v2 S2-50 RC1 交接（內部）

**Package ID**：`1320-zhTW-s2-50-review-2026-11-16-rc1`

## 本批交付

- S2-01～S2-50 逐碼台灣繁體短版**獨立敘事**候選：50／50。
- JSON 完整記錄：`S2_50_CODES_ZH_TW_EDITORIAL_CANDIDATE.json`。
- 內部原文錨點：`S2_50_SOURCE_ANCHORS_INTERNAL.jsonl`。50 筆 × 每筆 10 個原始欄位。
- 編輯台帳：`S2_50_EDITORIAL_TRACKER.csv`。
- QA：`S2_50_QA_SUMMARY.md`、`S2_50_QA_MACHINE_RESULTS.json`。
- 連讀資料：`S2_50_CONTINUOUS_READING_NOTES.md`。
- 可讀稿：`S2_50_台繁獨立短篇逐碼審閱候選_RC1.md` 及 TXT。

## 模組命名

模組名稱為 **S2 靈魂鏡像**；**S2-27** 的個別原型名稱是 **靈魂震盪鏡像**，不能把此名稱當成模組通用名稱。

## 數量、來源、映射

- 來源 50/50；10 個原始欄位/碼，完整保留原文（不在顧客端渲染）。
- 來源：`1320_S2_Soul_Mirror_Content_Database_v2_EN.md` (v2.0; 2026-06-13)。
- 來源檔案 SHA-256：`8fa43b3f70f9a0b7d7daa5232767ed5cb02de9cb31aa74901941a8e860c95680`。
- 依原始來源已記錄的映射 `S2 = month + day`，有效生日可達 S2-02～S2-43；**S2-01、S2-44～S2-50 只是來源保留**。
- **顧客介面禁止出現公式、數值推導、內部映射、source_text_internal 或原始欄位。**

## 必備的關係安全邊界

**如果關係裡存在威脅、操控或傷害，保護自身安全比尋找任何『靈魂意義』更重要。**

此句在候選 JSON 每筆的 `content_zh_tw_candidate.required_relationship_safety_boundary` 中完整存放，未來須由報告渲染模板強制顯示或經同等驗收的固定句，不能由模型改寫或省略。

不得以「關係鏡像」取代對人身安全、真實操控、暴力或專業求助的判斷；不得推斷他人動機、宣稱注定伴侶、責怪受傷者。

## 審核狀態與硬閘門

- 50／50 `PENDING_REVIEW`。
- `reviewer=null`、`approved_at=null`。
- `customer_publishable=false`。
- `internal_preview_candidate=true` 僅表示可在 **受保護的編輯／QA 環境**被授權測試；不等於可公開。
- **不得自動產生 APPROVED、審核者身分或時間戳**。
- 若 Customer 生成依賴任何 PENDING 單碼或 PENDING cross-code claim，維持 `BLOCKED_NO_APPROVED_SOURCE`。
- 即使未來有單碼 APPROVED，跨碼仍需要獨立 claim approval。
- v1.0 鎖定不改、正式站／價格／結帳不改、Customer Release HOLD。

## 四組校準碼

- 1980-05-22 → S2-27
- 1982-02-03 → S2-05
- 2008-12-08 → S2-20
- 2013-06-12 → S2-18

各項連讀意義、跨碼不可混同點、未成年人限制，詳見 `S2_50_CONTINUOUS_READING_NOTES.md`。

## 簽核與後續

本批沒有任何正式 `APPROVED`，也沒有 `approved_content_snapshot`。下批仍依固定順序處理 **S0-20 → S4-20**；本批並不代表兩者已完成。

此交接是**可編輯、可追溯的候選庫**，不是 S2 正式核准或 Full/Preview 顧客上線授權。
