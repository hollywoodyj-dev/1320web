# 1320 台灣完整報告 v2.0｜B＋C＋A 首批 S1 交接（2026-11-12）

來源：Wisewave 回覆 NOVA 的開發決議 + 交接包  
路徑：`docs/gzh/v2-bca-2026-11-12/`（下載原包備份）

## 決議

- **B＋C＋A** 確認：建正式內容庫、同步受保護 Preview、未核准封鎖顧客交付。
- 交付可審閱內容 ≠ 正式核准內容。
- 正式核准仍為 **0／258**。
- `reviewer` 與 `approved_at` 必須由實際內容審核產生，不可由 Wisewave 或 NOVA 自動填寫。
- `approval_id = PENDING_NO_APPROVAL` 只是占位，不是核准憑證。

## 本批內容

| 項目 | 狀態 |
|---|---|
| S1 44 碼台繁短版敘事候選 | `PENDING_REVIEW`；非長篇已完成顧客章節 |
| 跨碼主張 11 條（1980×6、1982×5） | 全 `PENDING_REVIEW` |
| 正式核准快照 | 不建立 |
| 顧客發布 | HOLD |

後續模組順序：S3 → S2 → S0 → S4–S9。S5–S9 保留原始七項必備欄位。

## Preview 接入原則

- 可在受保護內部環境做動態／結構測試。
- 未核准原型或跨碼主張不得流入正式顧客交付。
- 1980／1982 仍是校準案例，不證明任意生日可付費交付。
- v1.0、正式站、價格、結帳不變。

## Runtime 檔案（worktree）

- `data/1320-tw-v2/s1-44-editorial-candidate.json`（已去掉來源原文，只留欄位名與短版候選）
- `data/1320-tw-v2/1980-05-22.claims.json` / `1982-02-03.claims.json`（本批 11 條）
- `data/1320-tw-v2/release-gate-2026-11-12.json`
- `data/1320-tw-v2/approved-content-status.json`（S1 candidates=44，approved=0）
