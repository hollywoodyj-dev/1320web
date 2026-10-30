# START HERE — SoulSync Kingdom × 1320 SoulCode｜Cursor 交接包 v0.2.3

整理日期：2026-10-28（Australia/Sydney）　整理者：Claude（Sonnet 5.5）
状态：**内部开发交接。Preview、部署、公开上线均未授权。** 没有 Git 仓库，本 ZIP 即完整交付依据（见 `VERIFICATION_REPORT.md`）。

---

## 0. 三句话先看清

1. **从这个文件继续开发：** `src/current/soulsync-kingdom-1320-v0.2.3-visual-dev.html`
   （sha256 `415945045944264b21b362adb013a417ad3b6abaccf26a3ba1b888ce9ac3a77e`）。这是干净开发版，**不含** `#selftest` / `window.__ssk`。
2. **测试入口只在独立副本：** `src/current/soulsync-kingdom-1320-v0.2.3-visual-dev-selftest.html`，与干净版只差一行 `#selftest` 钩子。不要把钩子合进干净版。
3. **`src/frozen-baseline-v0.2.2/` 是冻结基线，只读。** 不得修改、覆盖或"顺手修复"。需要改动时，复制到新文件名再改。

当前是**离线、单文件、无网络、无浏览器存储**的原型。官方 1320 算法、官方卡牌内容、官方每编号图腾**都还没有接入**，游戏里的蓝图是 DEMO。

---

## 1. 如何运行

无需构建，无依赖。

```bash
# 直接打开（双击或）：
open src/current/soulsync-kingdom-1320-v0.2.3-visual-dev.html
# 或起一个静态服务看手机宽度：
python3 -m http.server 8080   # 然后访问 /src/current/...
```

手机视口建议 390×844 / 430×932，桌面 1280×800。
默认中文（`ZH` 字典），英文键位 `EN` 已预留但未翻译。

## 2. 如何测试

```bash
npm install            # 仅安装 playwright（开发依赖），游戏本身零依赖
npx playwright install chromium
npm test               # = python3 -I tools/smoke_test.py <干净版> <selftest 副本>
npm run test:frozen    # 对冻结基线做同样检查（只读）
npm run extract-assets # 从内联 SVG/CSS/音频提取可编辑文件
npm run verify-hashes  # sha256sum -c SHA256SUMS.txt
```

`tools/smoke_test.py` 检查：干净版无 selftest 钩子、单个 HTML 文档、源码无 fetch/XHR/存储/cookie、5 种视口（含减少动效）下无控制台错误/网络请求/横向溢出/缺失 i18n 键/存储写入，以及公开 payload 恰好 6 个键、非法 `blueprintSnippet` 输出 `null`。
**它不是完整回归**。交互流程回归（梦境→门→生日→四境→蓝图→星愿瓶→预览→流星→星墙、重玩与撤销、同意撤销、焦点陷阱、触控目标 ≥44px、走者与标签重叠）的旧脚本在上下文压缩中丢失，**需要 Cursor 重写**（清单见 §6）。

---

## 3. 在哪里接入算法、内容、图腾（均在干净开发版内，行号为交付时）

| 要接入的东西 | 位置 | 说明 |
|---|---|---|
| **官方蓝图计算** | `Adapter1320.compute(b)`（约 L374） | **唯一替换点**。现为 DEMO：`provenance:'demo'`、`algorithmVersion:null`、`contentVersion:'demo-0.2'`。正式版必须调后端代理 → Nova `POST /api/v1/blueprints/resolve`，**不得在前端复刻算法**，失败时明确报错、**禁止静默回退 DEMO**。接口契约见 `docs/INTEGRATION_NOVA_CONTENT_TOTEMS.md`。 |
| 调用点 | `setBirth(b,sample)`（约 L991）：`S.bp=Adapter1320.compute(b)` | 现为同步；接 Nova 后要改成异步并加加载/错误状态（`unconnected` / `validation_failed` / `temporarily_unavailable`）。 |
| **官方卡牌内容**（name / shortMeaning） | `DEMO.cards`（约 L342）与 `getFoundation(id)`（约 L504） | 所有蓝图展示都经 `getFoundation`。官方内容进来后，DEMO 池应整体移除或仅保留在 DEMO 模式。 |
| **官方每编号图腾** | `getFoundation(id).totemId` / `totemAssetUrl` 字段已预留；展示层 `totem()` / `totemRow()`（约 L515–516）目前只画四境通用占位 | 蓝图卡、导出图、结果详情必须显示与该 `code` 匹配的官方图腾；缺失或不匹配要显示明确错误，**不得换成通用符号**。四境占位只允许用于地图导航/未生成状态。 |
| 蓝图卡导出图 | `exportCard()`（约 L777，Canvas 1080×1560） | 目前画 DEMO 文字卡。接官方图腾后要决定图片来源（见 `INTEGRATION…` §4：离线内嵌 vs 受信 URL），并处理 Canvas 跨域污染。 |
| 公开 payload | `buildPublicStarPayload(st)`（约 L395） | 白名单 6 键。不要扩展，也不要序列化整个 `S`。 |
| 多人星墙 | `StarWallAdapter`（约 L387）仅 `submitLocal` | 真实阶段需服务端认证、字段白名单、`pending`、人工审核、举报与撤回。 |
| 文案 | `ZH`（约 L223）/ `EN`（约 L333）/ `t()`（约 L335） | `t()` 会把缺失键写入 `document.documentElement.dataset.missingKeys`。 |
| 版本标签 | `VERSION_LABEL`（L371） | 每次实质改动后更新。 |

> **重要纠正（已撤回的旧公式）：** `S2 = 月＋日`、`S3 = 月×日`（含 S3 区间表、"S3-10..12 不可达""S2 可达 2–43"等推论）**已撤回，不是正式算法**，不得交给 Cursor 当规格。最新 Data Pack 只确认**输入来源**（S1←出生年；S3←完整出生日期；S2←出生月；S0←出生日），**不是算术公式**。固定蓝图只能来自 Nova 的版本化响应，或 Founder 正式提供的算法规范。旧版 Data Pack 副本仅为审计留存，放在 `docs/superseded/`，文件名带 `DO_NOT_USE`。
> 现游戏源码里**没有**这些旧公式；唯一公式是 DEMO 的 `(y*13+m*7+d*3+i*5)%pool.length`，它只用于演示，界面持续标注"示例数据，非 1320 原始算法"。

---

## 4. 当前完成项（v0.2.3 visual-dev）

- 完整流程：梦境召唤（接住 4 颗光 → 1320）→ 门前三问（均可跳过）→ 门上输入 1320（故事仪式，非安全凭据）→ 蓝图钥匙（出生日期）→ 四境地图（结构 S1→S3→S2→S0，访问顺序自由）→ 四境差异化互动 → 四灯并入梦行者生命灯 → 短版灵魂蓝图（A 固定蓝图 / B 今日探索记录，分开展示）→ 星愿瓶 → 公开预览（独立同意）→ 流星 → 本机星墙（有限回应手势）。
- 固定蓝图与探索记录分离；选择不重算蓝图。
- 四境通用图腾占位（沉睡虚线 / 显影金色 / 一次显影动画 / 减少动效直出）。
- 星愿瓶封存规则：经历/领悟/寄语至少一项非空；仅选片段或仅内容提示不能通过；空瓶错误在输入有效文字后清除。
- 更换公开代号即撤销公开同意；非法 `blueprintSnippet` → `null`；联系方式/URL 检测。
- 重玩机制（`replayBackup`/`redo()`/`leaveScene()`）、首次完成才点灯。
- 无障碍：44px 目标、焦点陷阱与返回、模态时 `#shell.inert`、aria-live、地图文字替代、S3 滑杆 `aria-valuetext`、减少动效。
- 走者位置避开节点标签（`WK_SIDE`，节点宽 92px）。

## 5. 已知问题 / 限制（诚实清单）

1. 蓝图是 **DEMO**；DEMO 公式会让相近生日产生重复结果（演示可接受，官方接入后消失）。
2. 官方图腾仅 4 枚 fixture（见缺口表），**每编号图腾映射未提供**；游戏当前没有加载任何官方 WebP。
3. 修订过的图腾辅助线：游戏内联版镜面轴/基线/外环为**细虚线**，Handoff 独立 SVG 为**实线**；产品尚未裁定（Claude 建议保留虚线）。
4. 文案不一致：Data Pack §7 表格写 S3"三重弧线"，实际与 SVG 一致是"两道弧线 + 中心点"；建议统一。
5. Handoff 独立 SVG 内部使用固定 `id="title"`/`id="desc"`，若直接内联进同一页面会重复 ID。
6. 英文文本未翻译；多人星墙、账号、支付、审核均**未连接**（`about.notyet` 已披露）。
7. 流程回归脚本需重写（见 §2）。
8. v0.2.3 visual-dev 的 40 张截图为 390×844 与 430×932 的 Chromium 渲染，**不是真机**。

## 6. 待验收项（Preview 前必须）

- [ ] iPhone Safari 真机：刘海 / 灵动岛 / Home Indicator 安全区（`env(safe-area-inset-*)`）、软键盘遮挡、Web Audio 首次手势解锁。
- [ ] Android Chrome 真机。
- [ ] 产品/视觉验收（Founder / Hollywood 方向确认后的逐屏验收）。
- [ ] 重写并通过交互回归：全流程；重玩/中途放弃恢复旧记录；同意撤销；星墙手势；Tab 顺序与焦点陷阱；减少动效；390/430/1280。
- [ ] 官方接入后：错误态（未连接/校验失败/暂不可用）UI、`foundation_order` 校验、`totemId`↔`code` 匹配校验。
- [ ] 隐私复核：公开 payload 恰好 6 键；出生日期/固定蓝图/门前回答/私人文字不外泄；`consent.blueprint_generation` 与 `personalized_expression` 的正式同意文案（**文案待提供**）。

## 7. 硬性纪律（继续沿用）

- 不发网络请求（原型阶段）；不写 `localStorage`/`sessionStorage`/cookie；所有用户文本转义。
- 不发明官方 1320 算法、编号、卡牌释义、结果图腾。不得用占位 SVG 冒充官方资产。
- 不修改 `src/frozen-baseline-v0.2.2/`；干净版不加 `#selftest`；不覆盖已有文件；每次改动后重新计算 SHA-256（`npm run verify-hashes` 会提醒；更新 `SHA256SUMS.txt` 时用 `sha256sum`）。
- 密钥**不进入**仓库/ZIP。配置项名称与示例见 `.env.example`（只有变量名与占位值）。
- 未经批准不创建 Preview、不部署、不公开上线。

## 8. 目录

```
START_HERE.md                      ← 本文件
VERIFICATION_REPORT.md             已执行的检查、未完成的检查
SHA256SUMS.txt                     所有交付文件的 sha256（根目录文件 + 子目录）
package.json / .env.example / .gitignore
src/current/                       ★ 从这里继续（干净版 + selftest 副本）
src/frozen-baseline-v0.2.2/        冻结基线（只读）
src/archive-superseded/            旧版本，仅供对照，不要在上面开发
docs/design/                       GDD v1.0、Visual UI Handoff v0.2.3、Cursor Addendum v0.3.1、v0.2 计划（§3.3–§13）
docs/data/                         最新 1320 Data Pack（权威）
docs/superseded/                   旧 Data Pack（含已撤回公式，勿用）
docs/DESIGN_SYSTEM_AND_COPY.md     色彩、字体、流程、文案位置
docs/INTEGRATION_NOVA_CONTENT_TOTEMS.md  Nova 接口契约、校验、图腾接入、配置项
docs/GAPS_AND_NOVA_INPUTS.md       缺失资产表 + 需从 Nova / Founder 获取的输入
assets/official-1320-fixture/      官方 4 枚 WebP + 校验清单（仅 fixture）
assets/placeholder-realm-totems/   四境通用占位（非官方）：Handoff SVG + 渲染 PNG
assets/inline-extracted/           从游戏内联资源提取的可编辑文件（图腾 SVG、瓶子、令牌、关键帧、走者/音频源码）
assets/reference-examples-user-png/ 创作者早期示例 PNG（参考，非规格）
screenshots/                       Chromium 渲染截图（非真机）
tools/                             smoke_test.py、extract_inline_assets.py
```
