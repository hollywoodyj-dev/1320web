# SoulSync Kingdom 1320｜Cursor Handoff Acceptance Review v1.0

> **Cursor overlay (2026-10-30, not part of the original review text):** Three records, kept separate — `docs/cursor/ENVIRONMENT_GAPS.md`. **ENV-1:** prior round, Python `playwright` module missing; **原环境未复测；Cursor 环境已解决同类依赖问题** (a Cursor install does not prove that machine was fixed). **ENV-2:** this review’s Chromium Headless Shell gap — historical finding, retained. **ENV-3:** Cursor `py -3.13` ALL PASS at `94e2f8d` for that environment only. ENV-1 and ENV-2 are runner blocks, not game-test failures. Device tests still pending.

**评审日期：**2026-10-30  
**对象：**`SoulSync_Kingdom_1320_Cursor_Handoff_v0.2.3.zip`  
**评审类型：**实际交付包静态审查、文件完整性复核、测试执行可用性检查  
**裁决：ACCEPT WITH CONDITIONS（有条件接受：仅限 Cursor 本地工程接手）**

> **授权边界：** 本结论不授权 Preview、部署、Production 或公开上线；不代表正式 1320 算法或官方内容已验收。

## 1. 执行摘要

实际打开用户上传的 ZIP，确认包含 **120 个文件条目**，其中 **119 个文件列入 SHA256SUMS.txt**。在独立目录解压后执行 `sha256sum -c SHA256SUMS.txt`，校验项均为 **OK**。这是对交付包内部一致性的独立复核，并不单独证明文件的来源真实性、业务正确性或与历史交付版本逐字节相同。

`START_HERE.md` 清楚指明继续开发文件、冻结基线、测试入口和禁止事项。目录中有当前版与自测版、v0.2.2 冻结版、归档、设计与 Data Pack、官方 4 枚 WebP、占位图腾、内联资源提取件、截图及测试工具，足以让 Cursor 开始**离线本地接手与测试补全**。

**独立动态冒烟测试尚未通过本评审环境的执行门槛**：运行 `python3 -I tools/smoke_test.py ...` 时，Playwright Python 包存在，但所需 Chromium Headless Shell 可执行文件缺失，报错 `BrowserType.launch: Executable doesn't exist`。这属于本次评审环境的浏览器依赖缺口，**不能据此判定游戏测试失败，也不能据此宣称本次测试通过**。交付包原有 `VERIFICATION_REPORT.md` 记录了制包方先前的 PASS，需在 Cursor 环境重跑验证。

## 2. 核验矩阵

| 领域 | 发现 | 评审状态 |
|---|---|---|
| ZIP 内容 | 可解压；120 个文件条目 | PASS |
| SHA-256 | 119 个列入清单的文件全部 OK | PASS |
| 交接入口 | `START_HERE.md` 提供运行、测试、开发位置及边界 | PASS |
| 冻结基线 | v0.2.2 与当前 v0.2.3 分开存放 | PASS（结构） |
| 源码与自测 | 干净 HTML 和 selftest HTML 均存在 | PASS（存在性） |
| 冒烟测试 | 本次环境缺少 Playwright 浏览器二进制 | NOT EXECUTED TO COMPLETION |
| 全流程回归 | 无完整回归脚本；需重建 | OPEN |
| 设计文档 | GDD、视觉交接、修正附录及部分执行计划存在 | PASS（存在性） |
| 1320 计算 | 最新 Data Pack 撤回旧 S2/S3 算式；正式算法未接入 | HOLD FOR INTEGRATION |
| 官方图腾 | 4 枚 fixture 和 manifest 存在；未接入游戏 | PARTIAL |
| Nova 服务契约 | 有工程接入说明；缺真实 schema、样例、地址与鉴权方案 | OPEN |
| 隐私与授权 | 交接说明有 6 字段白名单；正式同意文案待定 | OPEN |
| 真机测试 | Safari / Android Chrome 未执行 | OPEN |
| 发布权限 | 明确禁止 Preview、部署和公开上线 | PASS（治理声明） |

## 3. 关键评审意见

### 3.1 版本与源码治理
- 以 `src/current/soulsync-kingdom-1320-v0.2.3-visual-dev.html` 作为开发起点，**不得覆盖原始交付文件**。
- 将整个交付 ZIP 作为不可变归档，创建 Git 仓库并以首次提交记录交接状态；不要将此提交误称为历史版本的原始 Git 记录。
- v0.2.2 目录标记只读，并加入自动化哈希守护；归档文件仅供审计。
- `SHA256SUMS.txt` 代表交接时快照。开发后不要在原交付快照上直接重写清单；应另建版本化清单。

### 3.2 算法与内容边界（关键）
- 最新 Data Pack 为交接包所声明的权威资料；`docs/superseded/DO_NOT_USE__...` 明确隔离旧稿。
- **禁止**将已撤回的 `S2=月＋日`、`S3=月×日` 或其衍生区间结论写入代码、测试、文案或正式规格。
- 当前演示计算不是正式 1320 算法。正式结果必须经受授权的 Nova 服务端接口获取；浏览器不得持有私密算法或服务密钥。
- `Adapter1320.compute()` 的生产替换须等版本化 schema、有效响应、错误响应和多个边界 fixture 到齐后再进行。
- 固定蓝图不得被用户的互动选择、自由文字、是否公开或购买状态改变。

### 3.3 资产治理
- 四枚官方 WebP 是**有限 fixture**，不是完整图腾库；禁止把四境导航占位当成官方编号图腾。
- 全量图腾还缺 S1 43、S3 11、S2 49、S0 19，合计 **122 枚**；同时缺完整 code→totemId→asset 映射与使用授权确认。
- 正式资产必须携带版本、来源、文件哈希、编号映射和许可状态；缺失或映射错误应明确报错，不静默替换。
- 官方图片接入方式（内嵌或受信 URL）尚待决策，URL 方案会改变当前零网络原型约束。

### 3.4 测试与产品验收
- 先在 Cursor 环境安装 Playwright 对应 Chromium，再重跑 `npm test`、`npm run test:frozen` 与 `npm run verify-hashes` 并保存日志。
- 重建完整交互回归：梦境→门→生日→四境→蓝图→星愿瓶→公开预览→流星→星墙；覆盖重玩/撤销、同意撤回、焦点陷阱、触控、减少动效、无横向溢出及敏感字段不外泄。
- 对官方集成新增 contract tests：版本兼容、foundation_order、code 格式、图腾对应、超时/错误态、不回退 DEMO。
- Preview 申请前完成 iPhone Safari、Android Chrome 真机验证及 Founder/Hollywood 逐屏视觉验收。

## 4. 必须关闭的缺口与责任人

| 优先级 | 事项 | 建议责任人 | 验收证据 |
|---|---|---|---|
| P0 | Cursor 独立重跑基础测试并保留输出 | Cursor | 完整测试日志 + 环境版本 |
| P0 | Git 初始基线及不可变交付 ZIP 归档 | Cursor | 初始 commit ID + ZIP SHA-256 |
| P0 | 旧算法撤回规则写入工程守则/测试 | Cursor / Nova | 禁用规则及静态检查 |
| P0 | 完整交互回归重建 | Cursor | 可重复执行脚本与报告 |
| P1 | Nova 版本化 schema、请求/响应及错误样例 | Nova | 契约文件、真实版本号 |
| P1 | 官方内容与 122 枚剩余图腾、完整映射 | Nova / Founder | manifest + 校验报告 |
| P1 | 图腾使用/再分发授权 | Founder | 书面许可决定 |
| P1 | 两项同意文案及数据处理规则 | Founder / 法务 | 批准文本与行为验收 |
| P1 | 真实算法 fixture（含闰日和边界） | Nova | 版本化测试向量 |
| P1 | iOS/Android 真机、视觉验收 | Cursor / Founder | 设备矩阵与签收记录 |
| P2 | 补齐缺失的旧计划原文与可编辑设计源 | Founder / 设计 | 文件归档或正式豁免 |

## 5. Cursor 接手授权范围

**允许：** 本地解压、建仓、只读核验、安装测试依赖、重建回归测试、整理独立开发分支、编写接口 mock 和正式接入方案。  
**需要另行批准：** 任何真实 Nova 服务调用、增加网络请求或持久化、接入官方资产、处理真实用户出生日期、修改用户授权流程。  
**禁止：** 修改冻结基线；将 DEMO 算法标为官方；恢复撤回公式；伪造图腾/名称；将密钥放入浏览器；未经授权的 Preview、部署和公开上线。

## 6. 阶段门槛

**Gate A — Local Engineering Handoff：有条件通过。** 完成 Cursor 环境独立测试、建仓与回归脚本后，方可改判完全通过。  
**Gate B — Official 1320 Integration：未通过。** 等待 Nova 契约、正式内容/图腾、授权和测试向量。  
**Gate C — Hosted Preview：未授权。** 需要单独的 Founder 批准、真机与产品验收。  
**Gate D — Production / Public Launch：未授权。** 不由本报告授予。

## 7. 最终裁决

> **ACCEPT WITH CONDITIONS — FOR LOCAL CURSOR HANDOFF ONLY**
>
> 接受此 ZIP 作为 v0.2.3 的本地工程交接依据。文件完整性复核通过，工程入口与边界文档可用。动态冒烟测试本次受评审环境缺失浏览器二进制所阻，完整交互回归、官方算法/资产接入及真机验收仍待完成。**不得把“交接可接手”解读为“正式产品可上线”。**

**建议下一动作：** Cursor 首先输出《Phase 1 Intake Receipt》：环境信息、ZIP 与文件哈希、基础测试日志、Git 首次提交、回归测试计划、未解决阻塞项；提交 Founder 审核后继续。

---

### 审查依据
- 实际上传 ZIP 与其中 `START_HERE.md`、`VERIFICATION_REPORT.md`、`SHA256SUMS.txt`、`package.json`。
- `docs/data/SoulSync_Kingdom_1320_Data_Pack_for_Claude_v0.2.3.md`、`docs/GAPS_AND_NOVA_INPUTS.md`、`docs/INTEGRATION_NOVA_CONTENT_TOTEMS.md`。
- 本次独立执行：ZIP 解压、`sha256sum -c SHA256SUMS.txt`；尝试运行 Python Playwright 冒烟脚本（因缺少 Chromium Headless Shell 中止）。
