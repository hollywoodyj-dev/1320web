# 1320｜台灣版網站 UI 品牌對齊規格 RC2

**版本：** `1320-brand-aligned-tw-ui-2026-11-26-rc2`  
**核心原則：** 台灣版是英文版 `1320soulcode.com` 的**同一品牌、多語體驗**。不是另外一個米白／青綠主題品牌。  
**定位：** 英文站品牌資訊 → 繁體中文語意與易讀性 → 受控網站實作。  
**狀態：** 內部視覺與互動樣板，**未授權正式部署**。

## 一、檢視過的英文官網頁面

- 首頁：https://www.1320soulcode.com/
- 原始官方 Logo：https://www.1320soulcode.com/1320-logo.jpeg
- About：https://www.1320soulcode.com/about-1320
- Blueprint：https://www.1320soulcode.com/blueprint
- Your Code：https://www.1320soulcode.com/your-code
- Full Report：https://www.1320soulcode.com/full-report
- Sample Report：https://www.1320soulcode.com/full-report-v2
- FAQ：https://www.1320soulcode.com/faq
- Disclaimer：https://www.1320soulcode.com/disclaimer

**可確認的品牌事實：**
1. 原有品牌全稱 **1320 SOUL ORIGIN CODE SYSTEM**，具有深夜藍、金色幾何星圖標誌（可直接查驗官方 Logo 圖像）。
2. 首頁中心語言為 **Meet Your Soul Blueprint**、**Not your fate. Not your label. Your mirror.**
3. 頁面順序包含：品牌介紹、生日入口、四大基礎鏡像 S1→S3→S2→S0、RECOGNIZE→REFLECT→INTEGRATE→EMBODY、Full S0–S9、FAQ／隱私與界線。
4. 英文版強調 **Reflection over prediction**、**Agency over authority**。
5. Full Report 頁呈現基礎四碼與 S4～S9 完整層次、7-Day Practice、Reflection Journal，以及 Web／Mobile／PDF。
6. 英文站現有報價／付款等商業功能，不代表台灣版可以直接照搬或上線；本交接依既有產品管理鎖定。

**本次無法直接確認：** 英文正式站的原始 CSS tokens、font 文件與完整各 breakpoint 的像素尺寸。`index.html` 的 HEX 色值是**依官方 Logo 視覺提出的對齊建議值**，不是聲稱從英文站正式 CSS 抽出的精確值。NOVA 應在原始工程專案核對後，用正式品牌 tokens 覆蓋。

## 二、與台灣版 RC1 的差異

| 面向 | 上一版 RC1 | 本次品牌對齊 RC2 |
|---|---|---|
| 品牌主色 | 紙色、青綠為主 | 深夜藍主底＋金色主要點綴，亮色用於長篇閱讀 |
| 標誌 | 自製抽象符號 | 使用英語官網 **1320 官方 logo** 的 URL；正式須改用品牌倉庫核准資產 |
| 視覺意象 | 一般東方寧靜、圓形裝飾 | 金色星圖、圓形幾何與 1-3-2-0 的品牌識別 |
| 標題與定位 | 獨立台灣版訴求 | `1320 Soul Blueprint / Reflective Intelligence` 品牌語意延續 |
| 內容流程 | 自行排列網站功能 | 對齊英文首頁的品牌 → 基礎四鏡 → 四階路徑 → Full → 生日／預覽 |
| 繁體中文 | 台灣閱讀友善 | 同時保留英文層次小字、英文品牌名與四鏡順序 |
| 個人報告內容 | 內嵌六份未核准 RC3 稿（公開部署不安全） | 只含三組 **示範 Code ID 與短句**；**不內嵌完整私人報告母稿** |
| 商業功能 | 設計佔位 | 保留設計入口，付款／售價／帳戶不可在內部樣板假裝已經上線 |

## 三、核心頁面結構

1. **Header / Brand**：1320 原始標誌、名稱、主導覽、語言入口、生日 CTA。
2. **Hero**：`遇見你的生命藍圖`、保留英文 `Meet Your Soul Blueprint`，強調象徵性鏡子而非命定說法。
3. **What is 1320**：清楚界定為 reflective intelligence，非診斷、非預測。
4. **Four Foundation Mirrors**：S1／S3／S2／S0，4 張一致的 Code 卡。
5. **From Recognition to Integration**：RECOGNIZE、REFLECT、INTEGRATE、EMBODY。
6. **Free Sample vs Full**：基礎四碼、S4～S9 六個進階層次；顧客完整報告仍為 17 章。
7. **Birthday & Preview**：示範生日切換、日期輸入、Free／Full 分頁示範。
8. **FAQ & trust**：回答命運預測、免費版差異、出生資訊與發布範圍。
9. **Footer**：英文原站、隱私與免責連結，後續需補上合適的 zh-TW 政策頁。

## 四、建議色彩與字體（非原始站精確檔）

| Token | RC2 建議值 | 用途 |
|---|---|---|
| `--navy` | `#061326` | Header、Hero、主品牌深色 |
| `--navy-deep` | `#040c19` | 極深背景、Footer |
| `--navy-soft` | `#0b2138` | 藍色層次 |
| `--gold` | `#cfa968` | 品牌金線、Code 索引、裝飾 |
| `--gold-light` | `#f0d59e` | 可讀金色 CTA、深底標題 |
| `--paper` | `#f7f5ef` | 繁體中文長篇閱讀的明亮背景 |
| `--ink` | `#182a39` | 內容文字與標題 |
| `--text` | `#344556` | 長篇次級文字 |

字體策略：**英文品牌識別沿用英文站正式字體**；中文字體可選 `Noto Sans TC / PingFang TC`，章節主標題在核准後採 `Noto Serif TC / Source Han Serif TC`，以繁體中文閱讀清晰為主。正式字體與權利／載入策略須由 NOVA 依原站資源確認。

## 五、功能上的誠實與安全

- 本 HTML **只有 UI demo**，沒有付款、登入、電子郵件、生日儲存或正式報告產生。
- 三組示範生日：1980-05-22、1982-02-03、1983-03-08，四碼 ID 已依既有內部母稿核對。
- 其他成人生日若輸入，**只驗證日期格式**，不自行宣稱運算出正式個人 Code。
- HTML 使用 `https://www.1320soulcode.com/1320-logo.jpeg` 顯示官網現有標誌；離線開啟會用文字與線圈的退化視覺。正式站須由同品牌設計系統或 CDN 提供**核准版本的 Logo 素材**。
- 未核准候選報告不得以 JavaScript 常數、隱藏 DIV、JSON bundle、前端 route 或其他方式塞入公開 HTML。
- 付款與方案名稱、公開內容權限、帳號訪問及 PDF 下載都須經實際服務串接與批准；本版不會宣稱已連線。
- 手機選單、三組示範切換、Free／Full 章節示例切換、有效日期與未接入提示皆可操作。

## 六、台灣與亞洲在地化的正確範圍

**應調整：** 用繁體中文自然表達、手機版明確的生日輸入與按鈕、長篇報告的正文行距、繁中標點、清楚的資料用途及同意文字、無需額外靈性認同的使用說明。後續若要有香港／新加坡／日本站，應有地區／語言文案配置，而非混用字型與付款條款。

**不應改掉：** 1320 的 Logo、品牌英文名稱、既有 Code 序列、四鏡排序、報告 17 章、象徵鏡子與自主性定位。不要在地化成卜卦、命盤、算命、命定人格等未經授權的定位。

## 七、給 NOVA 的實際執行序列

**Phase 0｜品牌來源對齊**
- 從英文站原始程式取得正式 Logo、字體、色彩、間距、圖像素材與版權使用條件。
- 與此次 RC2 UI 建立設計 diff；如設計 tokens 不同，以英文版核准 tokens 為準。
- 不修改原始英文網站與任何已發布資源。

**Phase 1｜TW UI 與元件**
- 按 `index.html` 實作 Header／Hero／四鏡／四階路徑／報告展示／生日入口／信任資訊。
- 保留繁體中文手機友善排版、鍵盤操作、文字對比與清楚的焦點狀態。
- 使用相同品牌 Logo 與一致的 button／card／heading 規範。

**Phase 2｜真正的系統接入**
- 生日計算向正式已驗證後台請求；避免前端複製另一套可漂移公式。
- Sample／Full 正文只讀經批准、符合權限的版本。
- TW 的價格、付款、會員、PDF、email、政策與條款由相應負責人批准後獨立接線。
- 登入、訂單與內容權限均由伺服器驗證，不可只靠前端隱藏。

**Phase 3｜QA**
- 跨 320、360、390、430、768、1024、1365 px 無橫向溢出。
- 鍵盤焦點、螢幕閱讀器、手機選單、日期有效性與回饋、Free／Full 切換。
- 正式 Logo 裁切清晰、SVG／PNG 合適，亮／暗背景規則一致。
- TW 正式文案與英版品牌語意對照；不錯譯成命運預測。
- 權限、安全、隱私與授權流程遵照既有 gate。

**Phase 4｜審閱與發布**
- NOVA 應交付視覺比對、HTML 元件清單、來源資產、QA、尚未解決的設計／法務項。
- 人類產品負責人明確批准前，**不得部署正式站**。

## 八、不可越界的發布狀態

`PENDING_REVIEW`｜`reviewer=null`｜`approved_at=null`｜`customer_publishable=false`｜`customer_release_state=HOLD`

v1 正式站／英文站／售價／結帳／公式／帳戶權限全部保持原狀。

**最終方向：** 讓台灣讀者看見網站時，就能認出這是與英文版相同的 1320 品牌；真正需要本地化的，是語言清楚度與閱讀體驗，而非品牌身分。
