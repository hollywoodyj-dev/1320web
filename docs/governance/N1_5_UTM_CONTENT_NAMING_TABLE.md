# N1.5 · `utm_content` 命名表（冻结）

**Status:** **FROZEN** · 2026-09-23 · Holly / 玄微 BA01 成品齐  
**Rule:** 表冻结后 **不得改名**。新增创意只追加新编码，不改既有行。  
**Single-variable discipline:** 同一批次内只允许一个维度变化（本表已记录每行变了什么）。

---

## Campaign constants（BA01）

```
utm_source   = pinterest
utm_medium   = organic
utm_campaign = beneath_adaptation
```

**默认落地（Phase 1A Pinterest）：** `/free-soul-blueprint`  
（勿混入 Google Search 首轮 Guide 路径，除非另开编码批次。）

---

## `utm_content` 表（BA01）

| `utm_content` | Hook（唯一变化或注明） | Visual | 相对 Day0 发布 |
|---------------|------------------------|--------|----------------|
| `ba01_p01` | What sits beneath the ways you learned to fit in? | Visual A | **Day 0** |
| `ba01_p02` | Beneath adaptation, some patterns still feel foundational. | Visual A（同 p01） | **Day 2–3** |
| `ba01_p03` | same as p01（hook 同 `ba01_p01`） | Visual B | **Day 7** |

**本批单变量约束（已定案）：**

- p01 → p02：只改 **hook**（Visual A 不变）  
- p01 → p03：只改 **Visual**（hook 同 p01）  
- **禁止**同批混测多个变量；禁止改名 `ba01_p0N`

---

## 发布序

```
Day0   → publish p01  (ba01_p01)
Day2–3 → publish p02  (ba01_p02)
Day7   → publish p03  (ba01_p03)
```

---

## T0 时钟起算（与 `T0_PINTEREST_DISTRIBUTION_BASELINE.md` 对齐）

**T0 clock start** = **p01 已上线** 且 Admin / DB 见到至少一条  
`first_touch_content = ba01_p01`  
（`utm_source=pinterest` · `utm_campaign=beneath_adaptation`）。

那时再写入 `PINTEREST_T0_CLOCK_START`（SG 日历日）。  
批准日 2026-09-17 **不是**时钟日。

---

## 完整 Pin 目标 URL（复制用）

```
https://www.1320soulcode.com/free-soul-blueprint?utm_source=pinterest&utm_medium=organic&utm_campaign=beneath_adaptation&utm_content=ba01_p01

https://www.1320soulcode.com/free-soul-blueprint?utm_source=pinterest&utm_medium=organic&utm_campaign=beneath_adaptation&utm_content=ba01_p02

https://www.1320soulcode.com/free-soul-blueprint?utm_source=pinterest&utm_medium=organic&utm_campaign=beneath_adaptation&utm_content=ba01_p03
```

Code lock: `lib/funnel/ba01-utm-naming.ts`

---

## Google Search（首轮 · 未冻结命名，仅占位提醒）

首轮付费仍用独立 campaign（如 `lifepath_intent_test` + `lp_ad_0N`）。  
**不得**把 `ba01_p0N` 用于 Google；**不得**把 Google `lp_ad_*` 混入 BA01。

---

## 追加创意时

1. 新行：`ba01_p04` … 或新批次 `ba02_*`  
2. 写明 **本行只变了哪一个维度**  
3. **不改**既有 `ba01_p01`–`p03` 编码或含义  
