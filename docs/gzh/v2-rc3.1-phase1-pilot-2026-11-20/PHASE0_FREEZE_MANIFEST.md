# Phase 0｜RC3.1 Freeze Manifest

**指令 ID：** `1320-zhTW-editorial-polish-structure-locked-2026-11-20-rc3.1`  
**日期：** 2026-11-20  
**狀態：** FREEZE 完成；正式核准仍 0／258；顧客 HOLD

## 已讀入來源版本

| 來源 | 用途 | 備註 |
|---|---|---|
| `NOVA_EDITORIAL_EXECUTION_REQUIREMENTS_RC3_1.md` | 唯一正式編輯指令 | 結構鎖定、只潤語言 |
| `RC3_STYLE_REFERENCE_SAMPLE_1980.md` | 語言風格黃金樣本 | SHA-256 `a06d2435ce493efe127b0b9289afa301ab880eb75f3f55e61f4ea47caf61b848`（已核對） |
| `STRUCTURE_REFERENCE_REPORT_BLUEPRINT_RC1.md` | Sample／Full 結構 | 四碼 Sample＋17 章 Full |
| `STRUCTURE_REFERENCE_FULL_1980_RC1.md`／`…1982…` | Full 基線 | 與 Blueprint 归档一致 |
| `258_CODE_POLISH_TRACKER.csv` | 258 碼來源錨點 | 11 碼公式不可達封存 |
| `RELEASE_GATE_AND_CHANGE_CONTROL.json` | 閘門 | PENDING／HOLD／v1·價格·結帳·公式 LOCK |
| 既有庫 `v2-report-blueprint-2026-11-19/` | RC1 報告示範基線 | 回退點 |
| 既有 S0～S9 `*-editorial-candidate.json` | 258 碼候選基線 | 不因本輪自動 APPROVED |

## 不可變更項目清單

1. Sample 閱讀順序：S1 → S3 → S2 → S0 → 四碼整合 → 反思 → 收束  
2. Full 17 章章序與章數  
3. 每碼七段完整解讀欄位／功能  
4. S5／S6 來源七欄追溯  
5. S2／S4 固定安全句原文  
6. Code 編號、原型名稱、映射公式、S3 振動對照表、zero rules  
7. 資料庫 schema／部署介面（僅可提供稽核欄位 mapping）  
8. 正式 v1.0、正式站、價格、結帳、Email 發送  
9. 正式核准流程：不得自填 `APPROVED`／`reviewer`／`approved_at`  
10. 不可達碼 S2-01、S2-44～50、S3-10～12：不得改公式使其可達

## 回退版本

- Sample／Full RC1：`docs/gzh/v2-report-blueprint-2026-11-19/`  
- 本目錄 `BASELINE_*_RC1.md` 複本  
- 1980 Sample RC3 風格鎖定：`SAMPLE_19800522_RC3_STYLE_LOCKED.md`（**不重做覆寫**）

## Phase 1 預計輸出檔名

| 檔案 | 說明 |
|---|---|
| `SAMPLE_19800522_RC3_STYLE_LOCKED.md` | 1980 Sample RC3 原樣鎖定（風格參照，非重寫） |
| `SAMPLE_19820203_RC3.1.md`／`.txt` | 1982 Sample 潤稿 |
| `FULL_19800522_17_CHAPTERS_RC3.1.md`／`FULL_19800522_RC3.1.txt` | 1980 Full 潤稿 |
| `FULL_19820203_17_CHAPTERS_RC3.1.md`／`FULL_19820203_RC3.1.txt` | 1982 Full 潤稿 |
| `DIFF_SAMPLE_19820203_RC1_to_RC3.1.md` | Sample 前後對照 |
| `DIFF_FULL_19800522_RC1_to_RC3.1.md` | Full 1980 前後對照 |
| `DIFF_FULL_19820203_RC1_to_RC3.1.md` | Full 1982 前後對照 |
| `PHASE1_QA_AND_HUMAN_READING_QUEUE.md` | 機器 QA＋真人審閱佇列 |

## 第一批需真人審閱項目

1. 1980 Sample RC3 是否維持為風格基準（微修僅在有明確對照時）  
2. 1982 Sample RC3.1：心覺／種子／投射／情緒是否各自清楚、非 1980 套模  
3. 1980／1982 Full 章 07、14 跨碼整合是否提供新增理解  
4. 各碼七段是否仍可回答「是什麼／價值／課題」  
5. S2／S4 安全句是否原字保留；S6 無財務承諾  
6. 語言自然度是否達 RC3 水準（人工判定，機器不可代）
