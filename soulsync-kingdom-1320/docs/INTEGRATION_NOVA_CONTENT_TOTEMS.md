# 接入说明：Nova 蓝图 · 官方内容 · 官方图腾

权威来源：`docs/data/SoulSync_Kingdom_1320_Data_Pack_for_Claude_v0.2.3.md`（§0、§3、§7）。本文是对它的工程化摘录，**冲突时以 Data Pack 为准**。

## 1. 原则

- 生产环境中 S1/S3/S2/S0 的唯一权威计算来源是 **Nova 1320 私有服务**。前端/离线原型不得复刻算法。
- 官方公开资料只确认**输入来源**：出生年→S1；完整出生日期→S3；出生月→S2；出生日→S0。**这不是算术公式**。
- **已撤回**：`S2 = 月＋日`、`S3 = 月×日` 及其区间表/可达性推论。不得实现、不得写成测试期望。
- 固定蓝图 = 出生日期 + 官方算法 + 正式内容版本。门前回答、访问顺序、场景选择、自由文字、是否公开、是否购买，都**不得**改写它。

## 2. 请求与校验

```http
POST /api/v1/blueprints/resolve        (后端代理调用 Nova；浏览器不直连、不带密钥)
{ "birth_date": "1980-05-22",
  "consent": { "blueprint_generation": true, "personalized_expression": true } }
```

前端/代理必须校验：`connected === true`；`source === 'nova_1320'`；`foundation_order` 严格等于 `['S1','S3','S2','S0']`；四个编号存在且格式合法；内容与算法版本兼容。任一失败 → 状态 `unconnected` / `validation_failed` / `temporarily_unavailable`，展示明确错误，**不本地猜结果，不静默回退 DEMO**。

已验证 fixture：`1980-05-22 → S1-18 / S3-03 / S2-27 / S0-07`（Nova，`source: nova_1320`）。这是**目前唯一**的已验证样例，不能据此推导任何公式。

## 3. 目标数据结构（Data Pack §3.3）

```ts
interface BlueprintResult {
  provenance: 'official' | 'demo';
  algorithmVersion: string | null;   // 官方必须真实
  contentVersion: string;            // 官方必须真实
  foundation: { s1: FoundationResult; s3: FoundationResult; s2: FoundationResult; s0: FoundationResult };
}
interface FoundationResult {
  code: string | null; name: string; shortMeaning: string;
  totemId: string | null; totemAssetUrl: string | null;
  totemSource: 'official_1320' | 'realm_placeholder';
}
```

现代码的 DEMO 返回里**还没有** `totemId` / `totemAssetUrl` / `totemSource`；接入时补齐，`getFoundation()` 的兜底也要同步。

## 4. 官方图腾接入

- 蓝图生成后，固定蓝图、蓝图卡、导出图、结果详情**必须**显示该具体编号对应的官方图腾；四境通用占位只允许用于：蓝图尚未生成、官方资产加载失败（且已明确显示错误）、地图抽象导航。
- 展示层校验 `totemId` 与 `code` 匹配；缺失/不匹配 → 明确错误，不换占位。
- 场景完成只控制"显影/未显影"，**不得**改变该用户固定蓝图对应的图腾。
- 图腾资产来源两种方案（待 Founder/Nova 决策）：
  1. **内嵌**：构建期把 WebP 转 data URI 内嵌（保持离线单文件；体积大，4 枚约 1.1 MB，全库 126 枚会很大 → 建议改为缩略图/压缩，需获授权）。
  2. **受信 URL**：Nova 返回 `totemAssetUrl`，域名白名单加载；会引入网络请求，**与当前"零网络"纪律冲突，需要批准**；导出 Canvas 需处理跨域（CORS / `crossOrigin`），否则画布被污染无法导出。
- 本包 4 枚 fixture 的校验：`assets/official-1320-fixture/official-1320-fixture-totems.manifest.json`（含 sha256）。

## 5. 公开星愿 payload（不变）

恰好 6 键：`alias, experience, insight, wish, blueprintSnippet, contentWarning`。绝不公开：出生日期、固定蓝图完整内容、门前回答、场景私人文字、整个游戏状态。

## 6. 配置项（只给名称与示例，密钥不入库；见 `.env.example`）

| 名称 | 用途 | 示例 |
|---|---|---|
| `NOVA_1320_BASE_URL` | Nova 服务地址（后端代理使用） | `https://nova.example.internal` |
| `NOVA_1320_API_KEY` | 服务端密钥（**仅服务端环境变量**） | `<set-in-secret-manager>` |
| `NOVA_1320_TIMEOUT_MS` | 超时 | `8000` |
| `TOTEM_ASSET_BASE_URL` | 官方图腾资产基址（若走 URL 方案） | `https://assets.example.internal/1320/` |
| `TOTEM_ASSET_ALLOWED_HOSTS` | 前端允许加载的图腾域名白名单 | `assets.example.internal` |

浏览器端不得出现 `NOVA_1320_API_KEY`。

## 7. 接入顺序建议

1. 先拿到 Nova 响应样例与 schema（`docs/GAPS_AND_NOVA_INPUTS.md` B 表）。
2. 新建分支/新文件（例如 `soulsync-kingdom-1320-v0.3-…`），**不要覆盖** v0.2.3 visual-dev。
3. 把 `Adapter1320.compute` 改为异步 + 错误态；加校验函数；补 `totem*` 字段。
4. 接官方内容与图腾；更新蓝图卡与导出图；回归；重算 SHA-256。
5. 真机（iPhone 安全区 / Android）通过 + 产品验收 → 才可申请 Preview。
