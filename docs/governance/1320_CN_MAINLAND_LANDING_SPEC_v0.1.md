# 1320_CN_MAINLAND_LANDING_SPEC_v0.1

**Document Type:** Mainland China Product Landing & Governance Specification  
**Project:** 1320  
**Version:** v0.1  
**Status:** Founder Direction / Implementation Baseline  
**Primary Owners:** Founder · Holly · Nova  
**Scope:** Mainland China public product architecture, language governance, technical direction, compliance gates, commercialization and rollout  

**Relationship to Existing Specs:** Supersedes `1320_CN_LOCALE_SPEC` as the governing China-market document. Locale specification remains a subordinate implementation spec.

**Addendum A (Holly proposal · 2026-09-28 · pending Founder):** Global Chinese track (Hong Kong · Taiwan · SEA) — see **§36**. Not part of Mainland LOCK until Accepted.

---

## 01｜Executive Decision

1320 China is **not** a translated version of the English website.

It is a **Mainland-ready product expression** of the same underlying 1320 system.

The governing model is:

```
一个境内合规底座
两个国内核心入口
三层语言治理
四阶段推进。
```

**Operationally:**

以境内可落地架构为底座，以微信小程序 + 备案 H5 为主要入口，以「1320｜生命映照」为公开产品名，以固定规则 + 审校模板生成结果，以最小收集和本地优先为数据原则，以 CN Semantic Gate 为内容闸门，先免费后付费，先合规后增长。

1320 China must **not** present itself as:

算命 · 占卜 · 改命 / 改运 · 命运预测 · 心理诊断 · 心理治疗 · 灵魂等级判定 · 前世读取 · 阿卡西读取 · 通灵服务

**Core philosophy remains:**

```
Reflection, not prediction.
Mirror, not identity.
```

**Chinese expression:**

```
看见，而不是断定。
映照，而不是定义。
```

---

## 02｜Brand Architecture

### 2.1 Master Brand

**1320**

### 2.2 Mainland Public Product Name

**1320｜生命映照**

This is the primary Mainland-facing product identity.

### 2.3 Brand Subtitle

一生，学习看见、理解并爱自己。

### 2.4 Emotional Brand Line

1320，一生爱你。

**Important:** “一生爱你” is **not** the literal translation of 1320 Soul Code and is **not** the primary product name.

It functions as:

- Chinese emotional mnemonic  
- brand-story line  
- campaign-level emotional language  
- secondary communication asset  

It should **not** replace **1320｜生命映照** as the main public product name.

### 2.5 Brand Hierarchy

```
1320｜生命映照
↓
本源 · 表达 · 映照 · 归心
↓
看见模式
↓
理解自己
↓
保留选择
↓
持续整合
```

### 2.6 Brand Slogan

```
看见，而不是断定。
映照，而不是定义。
```

---

## 03｜Public Product Category

The Mainland public product category is:

**自我觉察 / 反思工具 / 象征性生命映照**

1320 is **not** publicly positioned as:

- metaphysical prediction  
- fortune-telling  
- destiny interpretation  
- psychological diagnosis  
- psychological treatment  

**Standard product definition:**

> 1320 生命映照是一套用于自我觉察与反思的象征性框架。它不会预测未来，也不会定义你是谁。

This statement is part of the **product architecture**, not merely disclaimer language.

---

## 04｜Core 1320 Architecture

The underlying system remains unchanged:

**S1 → S3 → S2 → S0**

| Code | Public CN Label |
|------|-----------------|
| S1 | 本源 |
| S3 | 表达 |
| S2 | 映照 |
| S0 | 归心 |

These are **observation dimensions**. They are **not**: 灵魂等级 · 修行等级 · 觉醒等级 · 命运阶段 · spiritual hierarchy.

**Public expression:** 本源 · 表达 · 映照 · 归心

---

## 05｜Role of “生命溯源”

“生命溯源” is **not** the master product name.

**Approved use cases:**

- S1 本源的二级概念  
- editorial series  
- brand-story language  
- article / podcast / content column  

**Example:** 生命溯源 — 我们如何成为今天的自己  

Primary product identity remains: **1320｜生命映照**

---

## 06｜Free Experience Architecture

Mainland public free journey:

```
首页
→ 免费生命映照
→ 选择公历出生日期
→ 生成
→ 结果
→ 保存 / 反思 / 分享
```

Internal route names may remain technically stable (e.g. `/free-soul-blueprint`).  
Public UI displays: **免费生命映照**

**Do not publicly use:** 测算你的灵魂蓝图 · 解锁你的灵魂密码 · 查看你的命运 · 测测你是什么命  

**Preferred CTA:** 开启你的免费生命映照  

---

## 07｜Birth-Date Governance

Birth date is a **system input**. It must not be presented as a carrier of destiny truth.

**Approved framing:**

> 1320 使用出生日期作为系统中的固定起点，通过既定规则生成一组象征性的生命映照。

**Where further explanation is needed:**

> 出生日期在这里不是预测命运的工具，而是进入这一反思框架的输入条件。

**Conceptual model:**

```
出生日期 → 固定规则 → 象征性映照 → 个人反思
```

**Not:** 出生日期 → 命运真相  

**CN-0** should use Gregorian date only: year · month · day.

**Do not collect for the core product:** birth time · birthplace · 八字 · 命盘 · 星盘  

---

## 08｜Generation Architecture

CN-0 result generation is locked to:

**deterministic rules + reviewed templates**

Do **not** use open-ended LLM output directly to public users.

**Reasons:** semantic consistency · governance control · content stability · reviewability · easier compliance assessment  

**Nova may implement:** deterministic calculation · governed content mapping · approved template assembly · locale resolution · semantic-state flags  

Any future generative AI layer requires a **separate approval gate**.

---

## 09｜Mainland Entry Architecture

**Preferred Mainland architecture:**

| Role | Channel |
|------|---------|
| Primary Entry | 微信小程序 |
| Secondary Entry | 备案 H5 / 官网 |
| Supporting Channel | 微信公众号 / 服务号 |

Standalone App is **not** a Phase-1 priority.

The global `/zh/` route may remain as Simplified Chinese localization.

**However:**

```
Global /zh/  ≠  Mainland Public Launch
```

These are separate product milestones.

---

## 10｜Mainland Mini Program Principle

Mini Program category selection must reflect the **real** product.

Do not select an inaccurate category merely to avoid platform review.

**Principle:** 根据实际功能和公开内容选择真实适用类目，并在开发锁定前完成平台类目预审。

The objective is not to relabel a metaphysical service.  
The objective is for 1320 itself to genuinely function as a **reflection / self-awareness** product.

---

## 11｜CN Language Voice

Chinese public voice should feel: **安静、清楚、温和、克制、有空间。**

It may be slightly warmer than the English source.

It must **not** become: more mystical · more deterministic · more therapeutic · more authoritative · more destiny-oriented  

**Preferred sentence patterns:**

- 你可能会注意到……  
- 这可以作为一个反思的起点。  
- 你可以把它与你真实的生活经验放在一起看。  
- 有些部分也许会产生共鸣，有些未必。  
- 你始终保留理解、质疑和选择的权利。  

---

## 12｜Three-Layer CN Language Governance

All Mainland public copy must pass three layers.

### Layer 1｜Meaning Parity

Chinese must not strengthen the governed source.

No movement from: possibility → certainty · pattern → causation · reflection → identity · symbol → fact · interpretation → prediction  

### Layer 2｜Mainland Public Semantics

Review for: 命理化 · 玄学确定性 · 封建迷信式表达 · 财富/婚姻预测 · spiritual hierarchy · therapeutic claims · diagnosis language · metaphysical claims presented as fact  

### Layer 3｜1320 Brand Voice

Passing compliance is not sufficient.

The final language must still preserve: user authority · openness · reflection · spaciousness · non-determinism  

---

## 13｜CN Public Red Lines

The public product must not present itself through:

算命 · 占卜 · 改命 · 改运 · 命运预测 · 财运预测 · 婚姻预测 · 姻缘和合 · 灵魂等级 · 觉醒等级 · 灵魂使命判定 · 前世判断 · 阿卡西读取 · 通灵 · 高维信息下载 · 八字 · 紫微斗数 · 星座运势 · 生肖运程 · 风水 · 开运 · 招财 · 能量疗愈  

Reject deterministic statements including: 你注定…… · 你的出生日期决定…… · 你的灵魂使命就是…… · 这揭示了真正的你…… · 这是你这一生必须完成的……  

The objective is not keyword avoidance alone. The product must not **look, sound or behave** like a fortune-telling product.

---

## 14｜Standard Boundary Language

**Core**

> 1320 生命映照是一套用于自我觉察与反思的象征性框架。它不会预测未来，也不会定义你是谁。你可以把结果与你真实的生活经验放在一起观察，并保留自己的理解与选择。

**Short**

> 这是一面帮助你观察自己的镜子，而不是关于你的定论。

**Result Page**

> 你看到的是一种反思视角，而不是关于你身份、人生或未来的固定结论。

**Professional Boundary**

> 本产品不构成医疗、心理、法律、投资、婚姻等专业建议。如你正处于危机中，请寻求当地专业帮助。

---

## 15｜Existing zh-CN Content Governance

Existing zh-CN content fields are: **implementation candidates**  

They are **not:** approved public copy  

Before release, all CN S0–S9 strings must pass semantic review covering: destiny drift · identity drift · spiritual hierarchy · wealth/fortune language · therapeutic language · stronger certainty than English · metaphysical statements as fact · mixed-language fallback · 命理词 · 玄学黑话 · absolute claims · diagnostic language · treatment claims · wealth/marriage prediction · ranking/score/hierarchy language  

**If a string fails:** Nova must **not** independently reinterpret or rewrite its semantic meaning. It returns to semantic review.

---

## 16｜Data Architecture

1320 China follows:

- minimum collection  
- local-first processing  
- Mainland-isolated storage where storage is needed  
- no default return of Mainland user personal data into the global product stack  

**For the Free experience:** calculate locally where technically practical · avoid account creation unless needed · avoid unnecessary identifiers · collect only what the experience requires  

**Do not collect by default:** birth time · birthplace · precise location · religious belief · medical diagnosis · psychological diagnosis · financial data · identification documents  

If future cross-border processing becomes necessary: open a separate **China Data Export Review**.  

“No cross-border transfer” is a **preferred architecture decision**, not an assumption that every possible transfer is automatically prohibited.

---

## 17｜Compliance Workstream

Before Mainland Public Launch, create a dedicated compliance workstream covering, as applicable:

Mainland operating entity · ICP filing · Mini Program / App filing · platform-category review · privacy policy · personal-information handling · third-party SDK disclosure · minor protection · complaint / reporting mechanism · cybersecurity grading / applicable MLPS obligations · applicable public-security filing · payment · advertising / commercial claims · data-export review if cross-border processing is introduced  

Do **not** pre-assume that every possible licence · AI filing · algorithm filing · security assessment automatically applies.  

Applicability must be determined from **actual deployed functionality and business model**.

---

## 18｜AI / Algorithm Governance

CN-0 uses: **fixed rules + reviewed templates**  

Therefore it should **not** automatically be labelled as a generative-AI service.

If future versions add: generative AI · recommendation systems · personalised AI dialogue · public AI-generated interpretation  

then a separate **AI / Algorithm Compliance Assessment** must be completed before implementation.

---

## 19｜Homepage Direction

**Primary title:** 1320｜生命映照  

**Brand line:** 看见，而不是断定。映照，而不是定义。  

**CTA:** 开启你的免费生命映照  

**Supporting statement:** 这是一套用于自我觉察与反思的象征性框架。它不会预测未来，也不会定义你是谁。  

---

## 20｜Input Page

**Title:** 选择你的公历出生日期  

**Supporting copy:**

> 1320 使用出生日期作为系统中的固定起点，通过既定规则生成一组象征性的生命映照。出生日期在这里不是预测命运的工具，而是进入这一反思框架的输入条件。

**CTA:** 生成我的生命映照  

**Do not use:** 测算 · 解锁命运 · 查看命运 · 开运  

---

## 21｜Generating Page

**Approved:** 正在生成你的生命映照……  

**Do not use** anxiety or suspense mechanics such as: 命运即将揭晓 · countdown · urgency · fear · false scarcity  

---

## 22｜Result Page

**Suggested structure:**

- 说明出生日期只是固定起点  
- 说明结果属于象征性映照  
- 呈现可能注意到的模式  
- 提供与真实生活经验对照的问题  
- 明确用户保留理解、质疑与选择权  

**Boundary:** 你看到的是一种反思视角，而不是关于你身份、人生或未来的固定结论。  

**Do not display:** score · rank · destiny verdict · soul rank · awakening rank · wealth prediction · marriage prediction · fate chart  

---

## 23｜Sharing

Sharing must remain **voluntary**.

Do **not** create: fortune-chart-style cards · fate ranking · social comparison · spiritual scoring · coercive referral loops  

**Approved share objects:** one reflection question · one short reflection line · brand statement · “1320｜生命映照”  

No forced virality · No misleading share incentive  

---

## 24｜Commerce Decision

| Item | Decision |
|------|----------|
| Chinese Free Experience | **PROCEED** |
| Chinese Paid Full Report | **HOLD** |

Paid launch requires: content parity · CN semantic review · Mainland public-language review · payment · refund policy · invoice capability · customer support · commercial-claim review · applicable licensing review  

If only the English report is available during an early pilot:

> 完整报告目前提供英文版本。

Do not imply Chinese paid content exists before approval.

---

## 25｜Future Paid Product Categories

Potential later products: 深度生命映照报告 · 引导式反思练习 · membership reflection tools · educational content · integration support  

They must **not** promise: 改运 · 招财 · 姻缘结果 · guaranteed healing · guaranteed transformation · guaranteed success  

---

## 26｜SEO Governance

Do **not** directly translate the English Life Path / numerology / destiny-style search strategy into Mainland SEO.

**CN-0** only implements localization hygiene: title · meta description · canonical · hreflang · OG · alt text · indexation  

Chinese SEO strategy is a **separate research stream**.

Potential research directions (candidates, not automatic approval): 自我觉察 · 认识自己 · 反思工具 · 关系模式 · 内在观察 · 个人成长  

---

## 27｜Content Distribution

Possible channels: 微信 · 小红书 · 抖音 · B站  

**Distribution rules:** no misleading spiritual claims · no fortune-telling hooks · no induced sharing · no forced referral loops · no platform-link circumvention · paid promotion / KOL content must follow applicable disclosure requirements  

---

## 28｜Rollout Architecture

### Phase 0｜Naming & Compliance Pre-Review

Before Mainland development is locked: trademark search · domain strategy · Mini Program naming · platform-category pre-review · operating-entity plan · legal review · advertising-language review  

### CN-0A｜Simplified Chinese Experience

Global-site localization layer.

**Nova may proceed with:** `/zh/` routing · language switcher · zh-CN content resolution · Chinese navigation / footer · Chinese Free journey · Chinese result shell · canonical / hreflang · translation-completeness checking · deterministic result assembly · semantic-status flags  

This is **not** a Mainland public-marketing launch.

### Mainland Readiness Gate

Before Mainland promotion, review: terminology · public product category · legal copy · privacy · data architecture · cross-border implications · deployment · platform category · support · payment · commercial claims · moderation · complaints / reporting · operational readiness  

**This Gate must be explicitly passed.**

### CN-1｜Mainland Free Public Experience

**Target:** Mainland-compliant H5 / website · WeChat Mini Program · WeChat service / support entry · Chinese support · complaint / reporting flow · content moderation · Free 生命映照  

**Primary objective:** 验证用户能否正确理解 1320，并完成一次有意义的自我反思。  

### CN-2｜Paid Product

Only after CN-1 evidence and readiness approval: Chinese Full Report · payments · invoices · refunds · customer support · commercial claim governance · applicable business-model compliance  

### CN-3｜Growth

Only after product category trust is established: “生命溯源” content series · articles · video · podcast · creator collaboration · independent Chinese SEO · paid acquisition where appropriate  

**Operating principle:** 先建立类别，再建立流量。  

---

## 29｜Governance Roles

| Role | Responsibility |
|------|----------------|
| **Founder** | Final authority on semantic meaning · category definition · public positioning · brand governance |
| **Holly** | Programme coordination · readiness tracking · gate status · cross-functional follow-up |
| **Nova** | Technical implementation · locale architecture · deterministic engine · content-state enforcement · routing · deployment. Nova does **not** independently redefine semantic meaning. |
| **CN Semantic Reviewer** | Mainland-language review · red/yellow/green · semantic parity · public-language suitability |
| **Mainland Legal / Compliance Counsel** | Entity · privacy · data · deployment · platform · commercial · licensing · advertising (as applicable) |
| **Customer Support** | Complaints · refunds · account/data requests · product feedback |

---

## 30｜Gate System

All Mainland-facing copy receives one of three states:

| State | Meaning |
|-------|---------|
| **GREEN** | Approved for public use |
| **YELLOW** | Requires semantic or compliance review |
| **RED** | Must not be published |

No unreviewed public Chinese S0–S9 content should bypass this gate.

---

## 31｜Success Metrics

Do **not** make paid conversion the primary CN-1 metric.

**Primary measures:** completion rate · meaningful-reflection completion · save rate · voluntary share rate · return rate · user comprehension · semantic-review pass rate · complaint rate · content-policy incidents · misunderstanding / misclassification feedback  

**Once paid:** refund rate · payment completion · support burden · commercial-claim incidents  

**Proposed North Star:** 完成一次有意义的自我反思，并愿意保存下来。  

---

## 32｜Final Mainland Architecture

```
1320｜生命映照
↓
微信小程序 + Mainland H5
↓
固定规则 + 审校模板
↓
最小收集 + 本地优先
↓
境内独立数据架构优先
↓
CN Semantic Gate
↓
Free first
↓
Paid after readiness
↓
Growth after category trust
```

---

## 33｜Founder Operating Principles

China-market decisions should follow:

```
先合规，后增长。
先建立类别，再建立流量。
先让用户正确理解，再考虑规模化转化。
```

The objective is not to remove the depth of 1320.  
The objective is to translate that depth into a public product that preserves: reflection · user authority · freedom of interpretation · non-determinism · self-awareness  

**The core transformation is:**

**not:** 超自然权威告诉用户他是谁。  

**but:** 一个结构化的镜子，帮助用户更清楚地观察自己。  

---

## 34｜Implementation Authorization

**Nova is authorized to proceed with CN-0A:**

locale scaffolding · `/zh/` · switcher · Chinese UI chrome · deterministic Free journey · result shell · content resolution · completeness checks · semantic-state controls · canonical / hreflang  

**Nova is not yet authorized to release:**

Mainland public marketing · Chinese paid Full Report · generative-AI result generation · cross-border China-user data flow · Mainland paid campaigns · unreviewed S0–S9 Chinese copy  

These remain behind explicit approval gates.

---

## 35｜Document Hierarchy

This document is the governing China-market specification:

**1320_CN_MAINLAND_LANDING_SPEC_v0.1**

Subordinate documents may include:

- 1320_CN_LOCALE_SPEC  
- 1320_CN_SEMANTIC_GOVERNANCE  
- 1320_CN_CONTENT_REVIEW_MATRIX  
- 1320_CN_DATA_ARCHITECTURE  
- 1320_CN_MINIPROGRAM_SPEC  
- 1320_CN_MAINLAND_READINESS_CHECKLIST  
- 1320_CN_COMMERCIAL_READINESS_SPEC  

Where conflict exists: **this Mainland Landing Spec governs** unless a later Founder-approved document explicitly supersedes it.

---

## Founder Decision

1320 China is not an English site translated into Chinese.

It is: **a governed Mainland product expression of the same underlying 1320 system.**

| Element | Copy |
|---------|------|
| Public identity | **1320｜生命映照** |
| Emotional memory | 1320，一生爱你。 |
| Core principle | 看见，而不是断定。映照，而不是定义。 |

---

## 36｜Addendum A — Global Chinese markets first (Holly proposal · pending Founder)

**Status:** Recommendation from Holly / Nova — **not** Founder LOCK until Accepted / Rejected / Modified.

### Intent

Before (or in parallel with) heavy Mainland infrastructure (ICP · Mini Program category · Mainland-isolated data · WeChat-first), prioritize Chinese-language demand in markets that can run on the **current global product stack**:

| Market | Rationale |
|--------|-----------|
| **Hong Kong** | Chinese audience · global payment / ads stack workable |
| **Taiwan** | Chinese audience · same |
| **Southeast Asia Chinese** | Large Chinese-speaking diaspora · Google / Stripe / current hosting path |

### What stays the same as EN (this proposal)

- **Payment:** same as live EN (e.g. Stripe / current checkout) — no Mainland payment licence gate for this track  
- **AI / generation:** same operational posture as current EN product (no assumption of Mainland generative-AI filing for this track)  
- **Distribution:** **Google Ads allowed** on this track (subject to existing EN claim/C-4 governance + Chinese public-language gates for copy)  
- **Hosting / data:** may remain on **global** stack (not Mainland-isolated by default)

### What still applies from this Spec

Even on the Global Chinese track:

- Brand / category / red lines / boundary language (§02–14) still govern public Chinese copy  
- Existing zh strings remain **candidates** until CN Semantic Review marks GREEN (§15)  
- Product must not look like fortune-telling  
- Free-first ethos preferred; paid Chinese report still needs content + language review if offered  

### What this track is NOT

| Not this | Reason |
|----------|--------|
| Mainland Public Launch (CN-1) | Different compliance & entry architecture (§09–17) |
| WeChat Mini Program requirement | Optional later; not blocking for HK/TW/SEA web |
| Auto-translated EN Life Path SEO into Chinese Ads | Still forbidden as strategy; Ads creative still needs language review |

### Suggested sequencing (if Founder accepts)

```
1  CN-0A /zh/ scaffolding (already authorized · §34)
2  Global Chinese soft launch (HK / TW / SEA) — Free + optional EN/CN paid clarity
   · Google Ads OK under claim governance
   · Same payment / AI as EN
3  Mainland Readiness Gate work continues in parallel (entity · ICP · Mini Program)
4  CN-1 Mainland Free only after Gate PASS
```

### Founder decision needed

- [ ] **Accept** Addendum A as parallel track  
- [ ] **Reject** — Mainland-only sequencing  
- [ ] **Modify** — e.g. TW/HK only first; or no Google Ads until X  

Until marked Accepted, Nova will **not** treat Google Ads Chinese campaigns or Global Chinese paid as authorized beyond CN-0A scaffolding.

---

**Document control:** v0.1 · Founder Direction / Implementation Baseline · 2026-09-28 · §36 Addendum A Holly proposal 2026-09-28 · Repo path: `docs/governance/1320_CN_MAINLAND_LANDING_SPEC_v0.1.md`
