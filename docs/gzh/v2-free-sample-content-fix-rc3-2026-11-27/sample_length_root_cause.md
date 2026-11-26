# Sample 內容過短｜根因（2026-11-27）

## 真正原因（兩層疊加）

1. **`/tw/result` 本來就是短版「簡短映照」**  
   生日表單送出後走 `get1320ContentV1(..., { reportTier: "free" })`，只渲染各碼的 `freeEssence` 短句。  
   UI 卻標成 `FREE SAMPLE · 免費四碼映照`，易被誤認為完整 RC3 Free Sample Report。  
   **不是** CSS `line-clamp` 把長文藏起來；正文層就沒有長文。

2. **`/tw-v2-report?product=sample` 誤用 Full 敘事的章節切片**  
   `buildTwV2Report(..., "SAMPLE")` 過去從 Full fixture 取出 `01–07` 章再過濾延伸列，結構是「完整報告的前半」，**不是** RC3 Free Sample 金樣（每碼七段、兩則假設案例、七章獨立樣稿）。  
   量測：1980 SAMPLE 可見約 4.3k 字元，金樣約 7.1k，且缺少「這個原型是什麼？」等完整小節標題。

## 非原因（已排除）

- 前端 `preview_excerpt` API 截斷：TW Preview 報告頁讀本地 JSON／MD 入庫，不是遠端 excerpt API。
- CSS 行數截斷隱藏章節正文：`tw-v2-report` 無 `line-clamp`；`gzh-tw-v1.css` 的 `overflow:hidden` 用於 hero／殼層，非報告段落。
- 臨時 AI fallback 冒充：無此路徑；缺敘事時為 `BLOCKED_NO_APPROVED_SOURCE`。

## 修復

- 將 1980／1982／1983 三份 `GOLD_STANDARD_FREE_SAMPLE_*_RC3.md` 原樣 ingest 為 `data/1320-tw-v2/free-sample-*.json`。
- SAMPLE 產品改讀專用 Free Sample 敘事；不再切片 Full。
- `/tw/result` 改標「簡短映照」，並引導至完整 Free Sample Preview。
- 正式核准／顧客發布仍 HOLD。
