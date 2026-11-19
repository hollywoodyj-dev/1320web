# NOVA｜S8「靈魂貢獻」8 碼 RC1 交接

**package_id**：`1320-zhTW-s8-8-definition-narrative-2026-11-18-rc1`  
**locale**：`zh-TW`｜**module**：`S8`｜**records**：8  
**editorial_status**：`PENDING_REVIEW`（8／8）｜**approved_count**：0  
**customer_publishable**：`false`｜**customer_release**：`HOLD`

## 匯入順序與硬規則

1. **只入庫為待真人審閱的獨立候選**；不得覆蓋 S0～S7 的既有版本，不得因真人先前「基本通過」把任何記錄改為 `APPROVED`。
2. 將 `S8_8_CODES_ZH_TW_EDITORIAL_CANDIDATE.json` 存放於受限 **INTERNAL-only** 資料層。每筆 `source_text_internal`、七項 `source_field_anchors`、原始名稱與所有來源 SHA-256 **不得出現在 customer API、browser bundle、公開頁、正式報告或靜態資產**。
3. 若需內部受保護 Preview，僅使用 `S8_8_PROTECTED_PREVIEW_PROJECTION.json`，且必須有登入／權限控管、不可公開路由與禁止下載原始來源。**該 Preview 投影也不是可上線素材。**
4. S8 公式為 **`(S5 + S6 + S7) mod 8`**，餘數 0 保留為 S8-00，不得改成 S8-08，不得更動 birthday mapping，不得為測試強制顧客取碼。
5. 8 筆皆須維持 `editorial_status=PENDING_REVIEW`、`reviewer=null`、`approved_at=null`、`approval_id=null`、`customer_publishable=false`。**AI 製作、QA 通過和使用者閱讀回饋均不等同正式核准。** 正式簽核需指定真人進入獨立審批程序並記錄版本與簽核軌跡。
6. 「定義先行」是本 RC1 新編輯標準：每碼先解釋其象徵定義和在 S8 中的作用，再給兩個**假設**情境、力量與張力、領悟、反思問題。不得把任何例子寫成真實個人經歷。
7. S8-06 不得聲稱治療能力；S8-07 不得聲稱拯救集體或神聖權威；S8 任何 Code 都不構成專業資格、財富／成功保證或心理診斷。
8. 正式站 v1.0、價格、結帳、所有公式及 customer release HOLD 均不變。S8 入庫不得自動觸發支付、發信或部署。

## 檔案清單

| File | 用途 |
|---|---|
| `S8_8_NARRATIVE_REVIEW_RC1.md` | 8 碼真人閱讀稿 |
| `S8_8_NARRATIVE_REVIEW_RC1.txt` | 便於閱讀／轉寄的文字稿 |
| `S8_8_CODES_ZH_TW_EDITORIAL_CANDIDATE.json` | INTERNAL 正式候選資料及完整來源錨點 |
| `S8_8_PROTECTED_PREVIEW_PROJECTION.json` | 不含內部來源原文的受保護 Preview 投影 |
| `S8_8_SOURCE_ANCHORS_INTERNAL.csv` | 56 個主題來源欄位錨點 |
| `S8_8_EDITORIAL_TRACKER_RC1.csv` | 逐碼審閱台帳（全部未核准） |
| `S8_8_QA_SUMMARY.md` | 實際執行的程式化驗收 |
| `S8_8_SOURCE_AND_SAFETY_NOTES.md` | 原文差異、文字及倫理風險 |
| `S8_8_CONTINUOUS_READING_NOTES.md` | 四個校準生日與跨碼閱讀提示 |
| `SOURCE_S8_DATABASE_V1_EN_INTERNAL.md` | 原始來源快照，僅內部 |
| `MANIFEST_SHA256.csv` | 文件檔案指紋（不包含 manifest 自身） |
| `README_FIRST.md` | 批次概覽與操作順序 |

## 重要校準資料

| 生日 | 公式輸入（S5 + S6 + S7） | S8 |
|---|---|---|
| 1980-05-22 | 04 + 28 + 00 = 32 → 0 | **S8-00 臨在貢獻者** |
| 1982-02-03 | 26 + 26 + 01 = 53 → 5 | **S8-05 轉化貢獻者** |
| 2008-12-08 | 33 + 14 + 00 = 47 → 7 | **S8-07 整體願景貢獻者** |
| 2013-06-12 | 26 + 23 + 02 = 51 → 3 | **S8-03 洞察貢獻者** |

後兩個日期只可作未成年者的內部 QA。不能把案例用作出生者的真實履歷或人格事實。

## NOVA 應回報的驗收

- 8 個 Code 無重複、順序 S8-00～S8-07、0 有效；56 個主題來源錨點、8 個 Safety Note SHA 皆存在且可以重算。
- Narrative 中每碼具有定義、作用、力量／張力、至少兩個假設生活例子、領悟、兩個反思問題。
- Tracker 所有審閱者及核准時間空白；JSON 全筆仍是 `PENDING_REVIEW`／不可發布。
- INTERNAL JSON 與 Preview 投影經過欄位隔離測試；Preview 不得有 `source_text_internal`、來源指紋、內部 raw source。
- 四組生日依公式吻合，舊模組版本／狀態不變。
