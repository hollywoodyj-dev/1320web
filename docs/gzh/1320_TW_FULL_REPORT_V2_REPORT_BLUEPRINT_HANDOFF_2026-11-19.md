# 1320 台灣完整報告 v2.0｜Sample＋Full Report Blueprint RC1 交接（2026-11-19）

來源：`C:\Users\holly\Downloads\1320_Sample_Full_Report_Blueprint_RC1`  
归档：`docs/gzh/v2-report-blueprint-2026-11-19/`  
包 ID：`1320-report-blueprint-2026-11-19-rc1`

## 狀態

| 項目 | 結果 |
|---|---|
| Sample 示範 | 1980／1982 各 1＝2／2 |
| Full 17 章示範 | 1980／1982 各 17／17 |
| 十碼來源對應 | 兩份均 10／10（共 20 筆 demo 候選） |
| editorial_status | 全 `PENDING_REVIEW` |
| 正式核准 | 報告模板 0；258 碼仍 0／258 |
| customer_publishable | false |
| 顧客發布 | HOLD |

## 產品結構（Preview 提案，非正式站）

- **Sample：** S1 → S3 → S2 → S0 → 四碼整合（完整閱讀體驗，不在最有感處斷開催升級）
- **Full：** 17 章；計算順序仍為官方 `S1,S2,S3,S0,S4…S9`；閱讀順序可為 S1→S3→S2→S0
- **版本差異紀錄：** 早期 Master Architecture Free／Full／Advanced ≠ 本專案 Sample 四碼＋Full 十碼 17 章；**不暗改舊資料庫或公式**

## Runtime（已剝離內部來源）

- `data/1320-tw-v2/report-blueprint-data-contract-rc1.json`
- `data/1320-tw-v2/report-blueprint-demo-candidates-rc1.json`（20 筆）
- `data/1320-tw-v2/report-blueprint-protected-preview-rc1.json`（2 份投影）
- `lib/gzh/tw-v2-report-blueprint-rc1.ts`

`SOURCE_TRACE_INTERNAL.json` 僅留归档，不進 runtime。

## 明確不覆寫

- 既有 `1980-05-22.json`／`1982-02-03.json` StoredNarrative fixture **不變**
- S0～S9 258 候選庫 **不變**／核准仍 0
- v1.0、正式站、價格、結帳、映射公式 **不變**

## 安全

- S2／S4 鎖定安全句原文保留於示範全文與資料契約
- 2008／2013 僅映射 QA，不生成顧客報告
- 跨碼橋接與章 14 同樣是未簽核內容

## 下一步（分開）

1. 真人閱讀完整 Sample／Full 體驗  
2. 逐碼定義層深化／簽核  
3. 報告橋接文真人批准  
4. 產品負責人鎖定 Sample／Full 產品層級後，才可談顧客規格
