> ⚠️ SUPERSEDED / DO NOT USE. 这是旧版 Data Pack 副本，其中的 `S3 = 月×日`、`S2 = 月＋日`、S3 区间表与可达性结论**已被撤回**，不是正式算法。仅为审计留存。权威版本：`docs/data/SoulSync_Kingdom_1320_Data_Pack_for_Claude_v0.2.3.md`。（此横幅为交接整理时添加，其余内容为原文。）

---

# SoulSync Kingdom × 1320 SoulCode
## 1320 数据交接包｜For Claude v0.2.3

日期：2026-10-18（Australia/Sydney）  
产品创作：信伊咲  
整理：玄微  
目标对象：Claude / Claude Code  
状态：Claude 内部接入交接；包含 Nova 正式计算入口、已核实算式与 Visual UI Handoff 图腾；不可公开上线

---

## 0. Claude 必须先遵守

1. 生产环境中，S1、S3、S2、S0 的唯一权威计算来源是 Nova 1320 私有服务；Claude 不得在前端或离线原型里重写一套“看起来相同”的算法。
2. 现有正式资料已明确提供 S3 与 S2 的算式；S1 与 S0 的本地算术实现没有进入本交接资料，必须由 Nova 返回，不得反向猜测。
3. 不得根据单个测试生日、编号范围或现有签名自行推导 S1 / S0。
4. 不得把 `DEMO` 卡片、四境场景选择或图腾占位当作官方固定蓝图。
5. 玩家在场景中的选择只写入当次探索记录，永远不能重算固定蓝图。
6. 正式接入时，`Adapter1320.compute()` 必须调用后端 Nova 代理；服务失败必须明确报错，不得静默回退为演示结果。
7. v0.2.2 是冻结基线，不得修改。v0.2.3 是非冻结开发分支。

---

## 1. 已确认的 1320 基础结构

`1320` 的结构顺序固定为：

| 数字 | 模块 | 英文概念 | 当前场景名 | 场景功能 |
| --- | --- | --- | --- | --- |
| 1 | S1 | Origin | 原型之林 | 通过原创意象进行当下映照 |
| 3 | S3 | Vibration | 振动之海 | 觉察此刻节奏，不测量真实频率 |
| 2 | S2 | Mirror | 镜像之岸 | 探索自己这一侧看见的关系 |
| 0 | S0 | Void | 空性之门 | 进入留白，不强迫解释或回答 |

结构顺序是 `S1 → S3 → S2 → S0`，但玩家在地图上的访问顺序自由。

1320 在原型中的用途：

- 梦境里接住的四颗光最终固定排列为 1320；点击顺序不改变结果。
- 门上输入 1320 是故事仪式，不是安全密码或认证凭据。
- 四境地图以 1、3、2、0 连接为基础蓝图星线。
- 出生日期只应交给官方算法生成固定蓝图；当前演示算法不代表官方计算。

核心原则：

- Reflection, Not Prediction：只做映照，不做预测。
- 没有正确答案、灵魂等级、频率高低或疗愈完成度。
- 选择、拒绝、跳过、留白都有效。
- 不从玩家选择诊断人格、创伤、关系真相或灵性层级。
- 数字、梦境、频率均作为象征性游戏叙事，不宣称可验证的超自然效力。

---

## 2. 固定蓝图与今日探索记录必须分离

### 2.1 固定蓝图

固定蓝图的唯一允许来源：

```text
出生日期 + 1320 官方算法 + 正式内容版本
```

固定蓝图不可被以下内容改写：

- 门前的回答；
- 四境访问顺序；
- 玩家选择的意象、节奏、关系主题或留白动作；
- 玩家自由文字；
- 是否公开星愿；
- 是否购买 Full Report。

### 2.2 今日探索记录

今日探索记录只描述玩家这次做了什么，包括：

- `module`
- `sceneVersion`
- `choice`
- `playerWords`
- `completed`

参考数据结构：

```ts
type FoundationModule = 's1' | 's3' | 's2' | 's0';

interface ExplorationRecord {
  module: FoundationModule;
  sceneVersion: string;
  choice: string | null;
  playerWords: string;
  completed: boolean;
}
```

固定蓝图与今日记录可以并列展示，但不得混算。

---

## 3. 正式计算方法与接口契约

### 3.1 生产计算入口｜四项都由 Nova 一次返回

Claude 的正式实现方法不是在浏览器计算四个编号，而是：

```text
Birth Date (YYYY-MM-DD)
→ Backend
→ Nova 1320 private resolve service
→ Canonical Blueprint
→ S1 → S3 → S2 → S0
```

参考请求：

```http
POST /api/v1/blueprints/resolve
Content-Type: application/json

{
  "birth_date": "1980-05-22",
  "consent": {
    "blueprint_generation": true,
    "personalized_expression": true
  }
}
```

已验证的 canonical fixture：

```text
birth_date: 1980-05-22
source: nova_1320
signature: S1-18 / S3-03 / S2-27 / S0-07
foundation_order: S1 → S3 → S2 → S0
```

Claude 必须校验：

- `connected === true`
- `source === 'nova_1320'`
- `foundation_order` 严格等于 `['S1','S3','S2','S0']`
- 四个编号均存在且格式合法
- 内容与算法版本兼容

任何失败都应进入 `unconnected`、`validation_failed` 或 `temporarily_unavailable`，不能本地猜一个结果。

### 3.2 已核实的分段计算资料

| 模块 | Canonical 范围 | 已核实计算规则 | Claude 本地实现权限 |
| --- | --- | --- | --- |
| S1 · Soul Origin | `S1-01`–`S1-44` | 本交接资料未包含正式算术公式 | 禁止推导；只读取 Nova 返回值 |
| S3 · Soul Vibration | `S3-01`–`S3-12` | `raw = birthMonth × birthDay`，再按区间映射 | 可用于后端测试/校验；生产仍以 Nova 为准 |
| S2 · Soul Mirror | `S2-01`–`S2-50` | `number = birthMonth + birthDay`，格式化为两位编号 | 可用于后端测试/校验；生产仍以 Nova 为准 |
| S0 · Void Gate | `S0-00`–`S0-19` | 本交接资料未包含正式算术公式 | 禁止推导；只读取 Nova 返回值 |

S3 区间表：

| 编号 | raw 区间 | 名称 |
| --- | ---: | --- |
| S3-01 | 0–40 | Seed｜种子 |
| S3-02 | 41–80 | Spark｜火花 |
| S3-03 | 81–120 | Explorer｜探索者 |
| S3-04 | 121–160 | Awakener｜觉醒者 |
| S3-05 | 161–200 | Integrator｜整合者 |
| S3-06 | 201–250 | Alchemist｜炼金者 |
| S3-07 | 251–300 | Visionary｜远见者 |
| S3-08 | 301–350 | Healer｜疗愈者 |
| S3-09 | 351–400 | Mentor｜导师 |
| S3-10 | 401–450 | Master｜精通者 |
| S3-11 | 451–500 | Ascendant｜扬升者 |
| S3-12 | 501+ | Source-Channel｜源头通道 |

完整性备注：有效公历月份与日期使 S3 raw 实际范围为 `1–372`，因此当前公式无法产生 S3-10、S3-11、S3-12；它们仍属于 canonical registry，但状态应视为 `CANONICAL_UNREACHABLE`，除非 Founder 正式修改公式或提供 override。

S2 计算示例：

```text
1980-05-22
birthMonth + birthDay = 5 + 22 = 27
→ S2-27
```

有效日期使 S2 当前公式的可达范围为 `2–43`。超出范围的 canonical 条目不能由 Claude 强行产生。

### 3.3 代码边界

唯一替换点：

```js
Adapter1320.compute(birthDate)
```

当前期望返回结构：

```ts
interface BlueprintResult {
  provenance: 'official' | 'demo';
  algorithmVersion: string | null;
  contentVersion: string;
  foundation: {
    s1: FoundationResult;
    s3: FoundationResult;
    s2: FoundationResult;
    s0: FoundationResult;
  };
}

interface FoundationResult {
  code: string | null;
  name: string;
  shortMeaning: string;
  totemId?: string | null;
}
```

官方接入时必须满足：

- `provenance: 'official'`
- 提供真实 `algorithmVersion`
- 提供真实 `contentVersion`
- 每境提供官方 `code`、`name`、`shortMeaning`
- 如图腾由官方编号映射，提供稳定的 `totemId`
- 服务错误时展示错误状态，不得生成演示结果冒充官方结果

仍未进入本交接包、不得由 Claude 补写：

```text
S1_LOCAL_ARITHMETIC_FORMULA = NOT_DISTRIBUTED
S0_LOCAL_ARITHMETIC_FORMULA = NOT_DISTRIBUTED
OFFICIAL_PER_CODE_CARD_CONTENT = PARTIAL / SEPARATE_REGISTRIES
OFFICIAL_PER_CODE_TOTEM_MAPPING = NOT_PROVIDED
OFFICIAL_ALGORITHM_VERSION = NOVA_RESPONSE_REQUIRED
OFFICIAL_CONTENT_VERSION = NOVA_RESPONSE_REQUIRED
```

---

## 4. 旧 DEMO 算法｜只能用于离线原型，禁止交给正式计算链

以下逻辑只是为了让 Phase A 单机原型产生稳定演示内容，不是 1320 原始算法：

```js
const ORDER = ['s1', 's3', 's2', 's0'];

const Adapter1320 = {
  status: 'DEMO',
  compute(b) {
    const foundation = {};
    ORDER.forEach((id, i) => {
      const pool = DEMO.cards[id];
      const n = (b.y * 13 + b.m * 7 + b.d * 3 + i * 5) % pool.length;
      foundation[id] = {
        code: null,
        name: pool[n][0],
        shortMeaning: pool[n][1]
      };
    });
    return {
      provenance: 'demo',
      algorithmVersion: null,
      contentVersion: 'demo-0.2',
      foundation
    };
  }
};
```

所有显示结果必须持续标注：

> 示例数据，非 1320 原始算法

---

## 5. 当前 DEMO 卡片数据｜非官方内容

```json
{
  "s1": [
    ["灯火", "把注意放在脚下这一小圈。"],
    ["旅人", "愿意在途中停下来看看。"],
    ["匠人", "喜欢把一件事慢慢做好。"],
    ["守望", "习惯站在远处照看。"]
  ],
  "s3": [
    ["潮汐", "来来回回，是节奏本身。"],
    ["回声", "说出去的话会以另一种声音回来。"],
    ["微风", "轻，但没有停过。"],
    ["晨光", "不急，一点点亮起来。"]
  ],
  "s2": [
    ["水岸", "与他人隔着一段刚好的距离。"],
    ["并肩", "一起走，也各自看路。"],
    ["回望", "偶尔转头，看看来时的路。"],
    ["邀请", "先把门留着。"]
  ],
  "s0": [
    ["留白", "不填满，也是一种完整。"],
    ["静室", "一个只属于自己的安静角落。"],
    ["空杯", "先空着，才有位置。"],
    ["天窗", "头顶有一块不被遮住的天。"]
  ]
}
```

演示生日：

```json
{"y":1990,"m":6,"d":15}
```

---

## 6. 四境场景数据边界

### S1 Origin｜原型之林

- 当前六个原创意象：灯、种子、河、山、门、火。
- 它们是场景互动素材，不是官方 S1 原型卡。
- 玩家可以认同、部分认同、不认同、改名或暂时说不清。
- 自定义名称属于“我的说法”，不能替换官方名称。

### S3 Vibration｜振动之海

- 滑杆只改变当下画面速度、光纹与可选声音。
- 四个描述区间：缓慢的潮、柔和的呼吸、明亮的跳动、急切的闪烁。
- 这些是当下节奏描述，不是 S3 固定等级或真实频率测量。

### S2 Mirror｜镜像之岸

- 当前关系主题：家人、朋友、亲密的人、同事或同伴、过去的自己、暂时不选。
- 只反映玩家这一侧看见的关系，不宣称对方真相。
- 不做关系匹配、诊断或命定判断。

### S0 Void｜空性之门

- 三次呼吸约 24 秒，可跳过。
- 可留白、放下一个词、带着它离开或暂不回答。
- 不宣称清除创伤、业力或完成疗愈。

---

## 7. Visual UI Handoff 四境图腾｜当前游戏视觉资产

以下四枚是 Visual UI Handoff 已给出的四境视觉图腾，一境一枚，可直接交给 Claude 接入 v0.2.3。它们是 SoulSync Kingdom 的当前游戏视觉资产，用于表现“完成场景后显影”；不是 1320 每个具体编号的官方图腾映射。不得把一枚 S1 嫩芽复制解释为全部 `S1-01`–`S1-44` 的正式图腾。

| 模块 | 当前占位语义 | 视觉结构 |
| --- | --- | --- |
| S1 | 起源 / 生长 | 嫩芽、两片叶子、一粒种子 |
| S3 | 振动 / 扩散 | 三重弧线与水平基线 |
| S2 | 镜像 / 关系 | 两个相交的环与垂直镜面轴 |
| S0 | 空性 / 留白 | 内部空心环与外部空间环 |

当前 120×120 SVG path 数据：

```js
const TOTEM_SHAPE = {
  s1: '<g class="gl"><path class="th" d="M60 86V58"/><path class="th tf" d="M60 68C44 68 33 58 33 43C48 43 60 51 60 68Z"/><path class="th tf" d="M60 58C75 58 87 47 87 31C72 31 60 40 60 58Z"/><circle class="th fine" cx="60" cy="101" r="3"/></g>',
  s3: '<g class="gl"><path class="th" d="M26 78a34 34 0 0 1 68 0"/><path class="th" d="M39 78a21 21 0 0 1 42 0"/><circle class="th fine" cx="60" cy="78" r="3"/></g><path class="ax" d="M22 90H98"/>',
  s2: '<g class="gl"><circle class="th" cx="46" cy="60" r="22"/><circle class="th" cx="74" cy="60" r="22"/></g><path class="ax" d="M60 22V98"/>',
  s0: '<g class="gl"><circle class="th" cx="60" cy="60" r="25"/></g><circle class="ax" cx="60" cy="60" r="40"/>'
};
```

状态规则：

- 未完成：虚线、低亮度、“沉睡轮廓”。
- 首次完成：金色实线、圆形光晕、一次显影动画。
- 已完成：保持显影，不循环闪烁。
- `prefers-reduced-motion: reduce`：取消显影动画，直接显示完成态。
- 灯亮度和图腾显影只表示走过几境，不表示等级、频率或疗愈程度。

如未来收到 1320 按具体编号映射的正式图腾表，应以独立 `totemId → asset` registry 接入；届时替换图形资源，但保留本节状态与无障碍规则。

---

## 8. 星愿瓶与公开数据规则

### 8.1 封存条件

以下三项至少填写一项：

- `experience`
- `insight`
- `wish`

以下内容单独存在时不能通过：

- 只选择 `blueprintSnippet`
- 只填写 `contentWarning`
- 两者同时有，但三项正文都为空

用户文案：

> 经历、领悟和留给读者的话，至少填写一项；其他项目可以不填。出生日期、固定蓝图、门前的回答和场景里的私人文字，都不会被自动带进来。

### 8.2 公开 payload 白名单

公开对象只能有六个键：

```ts
interface PublicStarPayload {
  alias: string;
  experience: string;
  insight: string;
  wish: string;
  blueprintSnippet: null | {
    module: 's1' | 's3' | 's2' | 's0';
    publicName: string;
  };
  contentWarning: string | null;
}
```

构建规则：

```js
function buildPublicStarPayload(st) {
  const b = st.bottle;
  const snip = ORDER.includes(b.snip)
    ? { module: b.snip, publicName: t('scene.' + b.snip + '.name') }
    : null;

  return {
    alias: st.alias,
    experience: clip(b.exp, 200),
    insight: clip(b.ins, 200),
    wish: clip(b.wish, 120),
    blueprintSnippet: snip,
    contentWarning: b.cw
      ? (clip(b.cwText, 30) || t('btl.cwDefault'))
      : null
  };
}
```

绝不公开：

- 出生日期；
- 固定蓝图完整内容；
- 门前回答；
- 场景私人文字；
- 整个游戏状态；
- 未经白名单的字段。

额外规则：

- 更换公开代号后，原公开同意立即失效，需重新勾选。
- 非法 `blueprintSnippet` 值必须输出 `null`。
- 当前发布只是本机预览，不连接服务器，不宣称他人可见。
- 真实多人版必须经过服务端认证、字段白名单、`pending` 状态、人工审核、举报与撤回。

---

## 9. 当前版本和文件纪律

```text
v0.2.2 = 冻结基线，不改
v0.2.3 = 非冻结开发分支
```

Claude 修改前必须：

1. 确认目标是 v0.2.3，而不是 v0.2.2。
2. 不覆盖冻结基线。
3. 保持干净开发版没有 `#selftest` 测试入口。
4. 测试入口只能存在于独立 selftest 副本。
5. 每次实质改动后重新计算 SHA-256；旧哈希不再适用。
6. 不发起网络请求，不写 `localStorage`、`sessionStorage` 或 cookie。

当前产品状态：

```text
OFFLINE_PROTOTYPE = TRUE
OFFICIAL_ALGORITHM_CONNECTED = FALSE
ACCOUNT_CONNECTED = FALSE
PAYMENT_CONNECTED = FALSE
MULTIPLAYER_STAR_WALL_CONNECTED = FALSE
MODERATION_CONNECTED = FALSE
PUBLIC_LAUNCH_ALLOWED = FALSE
```

---

## 10. Claude 的完成检查

交付前逐项确认：

- [ ] 1320 仍固定对应 S1、S3、S2、S0。
- [ ] 玩家可以自由选择四境访问顺序。
- [ ] 场景选择没有改写固定蓝图。
- [ ] 演示结果持续标明“示例数据，非 1320 原始算法”。
- [ ] 图腾持续标明“示例占位，非官方图腾”。
- [ ] 星愿瓶三项正文至少一项非空。
- [ ] snippet-only 与 content-warning-only 均被阻止。
- [ ] 公开 payload 恰好六个白名单键。
- [ ] 出生日期和私人文字没有进入公开 payload。
- [ ] 更换代号撤销公开同意。
- [ ] 没有网络请求和浏览器永久存储。
- [ ] 减少动效模式完整可用。
- [ ] 390×844、430×932、1280×800 流程通过。
- [ ] 真机与 iPhone 安全区测试在 Preview 前完成。
- [ ] 未经批准，不创建 Preview，不公开上线。

---

## 11. 给 Claude 的执行口令

```text
读取本文件后，把“已确认结构”“演示数据”和“官方缺口”视为三个不同层级。
只在 v0.2.3 开发分支工作，不修改 v0.2.2 冻结基线。
当前阶段保持离线单文件原型；不要发明官方 1320 算法、编号、卡牌释义或图腾。
如任务涉及官方数据而本文件标为 NOT_PROVIDED，请停止该部分并列出所需输入。
完成修改后执行静态检查、交互回归、减少动效测试、视口测试和 SHA-256 核对；真机与 iPhone 安全区仍作为 Preview 前人工必测项。
```
