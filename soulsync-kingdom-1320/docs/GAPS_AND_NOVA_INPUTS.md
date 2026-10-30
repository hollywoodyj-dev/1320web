# 缺口表｜已打包交付 vs 仍需获取

## A. 官方 1320 结果图腾

范围：**仅 canonical fixture `1980-05-22`（S1-18 / S3-03 / S2-27 / S0-07）**。清单自述 `Verified fixture only; this is not the complete per-code registry`。

| 编号 | 名称 | 官方来源 URL（清单记录） | 本包文件 | 状态 |
|---|---|---|---|---|
| S1-18 | The Transformer | `https://www.1320soulcode.com/S1-44/S18.webp` | `assets/official-1320-fixture/official-1320-S1-18-transformer.webp` | ✅ 已收到，sha256 与清单一致，1254×1254 |
| S3-03 | Explorer | `…/S3-12/S03.webp` | `…official-1320-S3-03-explorer.webp` | ✅ 同上 |
| S2-27 | The Soul Shock Mirror | `…/S2-50/S2-27.webp` | `…official-1320-S2-27-soul-shock-mirror.webp` | ✅ 同上 |
| S0-07 | Self-Worth Illusion | `…/S0-19/S0-07.webp` | `…official-1320-S0-07-self-worth-illusion.webp` | ✅ 同上 |
| 映射清单 | — | sourcePage `https://www.1320soulcode.com/full-report-v2` | `…official-1320-fixture-totems.manifest.json` | ✅ 已收到（status `OFFICIAL_1320_RESULT_ASSETS_VERIFIED`） |

注意：这些是官方资产，**游戏当前并未加载它们**（离线单文件，未内嵌）。是否内嵌（体积约 1.1 MB，base64 后更大）或经受信 URL 加载，需要 Founder / Nova 决策并确认授权。

## B. 缺口（未收到 → 不得用占位 SVG 补）

| 缺失项 | 规模 | 状态 | 谁提供 / 去哪取 |
|---|---|---|---|
| S1 全部结果图腾 | S1-01…S1-44（除 S1-18 外 43 枚） | ❌ 未收到 | Nova 仓库官方资产目录（路径规律为 `/S1-44/S{nn}.webp`，**仅为线索，不得按规律推测文件存在**）；或官方 registry |
| S3 全部结果图腾 | S3-01…S3-12（除 S3-03 外 11 枚） | ❌ 未收到 | 同上（`/S3-12/S{nn}.webp`） |
| S2 全部结果图腾 | S2-01…S2-50（除 S2-27 外 49 枚） | ❌ 未收到 | 同上（`/S2-50/S2-{nn}.webp`） |
| S0 全部结果图腾 | S0-00…S0-19（除 S0-07 外 19 枚） | ❌ 未收到 | 同上（`/S0-19/S0-{nn}.webp`） |
| **每编号图腾映射 registry**（code → `totemId` → `totemAssetUrl`） | 全部编号 | ❌ `OFFICIAL_PER_CODE_TOTEM_MAPPING = NOT_PROVIDED` | Nova 返回，或官方 registry 文件 |
| 官方 S1/S3/S2/S0 **算法规范** 或 Nova 版本化响应样例 | — | ❌ `OFFICIAL_LOCAL_ARITHMETIC_FORMULAS = NOT_DISTRIBUTED`；旧 S2/S3 公式**已撤回** | Founder / Nova |
| `algorithmVersion` / `contentVersion` 真实值 | — | ❌ `NOVA_RESPONSE_REQUIRED` | Nova 响应 |
| 每编号官方内容（name、shortMeaning） | S1×44、S3×12、S2×50、S0×20 | ❌ `PARTIAL / SEPARATE_REGISTRIES`；仅 4 个 fixture 编号有名称 | 官方内容 registry |
| 更多已验证生日样例 | 至少覆盖各境多个编号、边界日期（闰日、年初年末） | ❌ 仅 `1980-05-22` | Nova |
| Nova 服务地址、鉴权方式、CORS/代理方案、完整响应 schema、错误码 | — | ❌ 仅有请求样例与校验规则 | Nova / 后端 |
| `blueprint_generation` 与 `personalized_expression` 的同意文案 | 2 条 | ❌ 未提供 | Founder / 法务 |
| 资产授权：能否在游戏/导出图中使用并随包分发官方图腾 | — | ❓ 未确认 | Founder |
| v0.1 任务书与 v0.2 计划 §1–§3.2 原文（文件形式） | — | ❌ 当前仅持有 v0.2 计划 §3.3–§13；GDD v1.0 已覆盖其要点 | Founder 如需完整留档请重新提供 |
| 可编辑的**设计源文件**（Figma / Sketch / PSD / AI） | — | ❌ 从未收到；视觉资产均为代码内联 SVG/CSS/Canvas | Founder / 设计 |
| 音效/动画**素材文件** | — | 无外部文件；音效是 WebAudio 合成、动画是 CSS 关键帧（已提取源码） | — |
| 场景/人物/星愿瓶/生命灯的位图或矢量原稿 | — | 无外部文件；均为内联 SVG（已提取，见 `assets/inline-extracted/`） | — |

## C. 若完整官方资产位于 Nova 仓库，Cursor 需要接入的输入

1. 资产目录：`S1-44/`、`S3-12/`、`S2-50/`、`S0-19/`（按官方站点路径推测，**以 Nova 实际目录为准**）以及其 registry / manifest（需包含 code、totemId、文件名、sha256、来源 URL、授权）。
2. 读取方式：（a）构建期拷贝并内嵌/静态托管；或（b）Nova 响应直接返回 `totemId` + `totemAssetUrl`，前端按白名单域名加载。选择后，实现 `totemId`↔`code` 匹配校验与缺失/不匹配的明确错误态。
3. 逐文件校验：入库时对每个 WebP 计算 sha256 并写入 manifest（本包 fixture 的做法）。
4. 在拿到完整 registry 之前，**不要**根据文件名规律批量猜测或生成其余 WebP。

## D. 已打包交付 vs 仍需从 Nova/Founder 获取（一目了然）

**已打包交付：** 完整可运行源码（干净版 + selftest + 冻结基线 + 归档）；GDD / Visual UI Handoff / Cursor Addendum / v0.2 计划后半；最新 Data Pack；4 枚官方 WebP + 清单；四境占位图腾（Handoff SVG + 提取 SVG + 渲染 PNG）；内联资源提取（瓶子、走者/生命灯源码、令牌、关键帧、WebAudio 源码）；截图；冒烟测试与提取脚本；SHA-256 清单；验证报告。

**仍需获取：** 见 B 表全部 ❌ / ❓ 项。
