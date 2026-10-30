# 验证报告｜Cursor 交接包 v0.2.3（2026-10-28）

## 1. 交付依据
无 Git 仓库 → **本 ZIP 即完整交付依据**，无分支/commit。逐文件 sha256 见 `SHA256SUMS.txt`。

## 2. 关键文件哈希

| 文件 | sha256 |
|---|---|
| `src/current/soulsync-kingdom-1320-v0.2.3-visual-dev.html`（★继续开发） | `415945045944264b21b362adb013a417ad3b6abaccf26a3ba1b888ce9ac3a77e` |
| `src/current/…-visual-dev-selftest.html` | `d57adeb60a608672753e42b89d72f12a45397a2aad4e19e1d599839f2df32740` |
| `src/frozen-baseline-v0.2.2/soulsync-kingdom-1320-v0.2.2.html`（冻结） | `ff97cda62ab14382f789193278fff7eead0970fe9eb0906a46f50aa1bfb1e7de` |
| `src/frozen-baseline-v0.2.2/…-v0.2.2-selftest.html` | `00e4d574cf31bc8624a51949e811157411ba233f338fa819a2248ab76862ff5a` |
| 官方 S1-18 WebP | `43a3cd59118c227fab52933fc8428bdfcc85034e91fa4e8d5f5899a8c0dc612d` |
| 官方 S3-03 WebP | `fbea8fb1abd7b35b758a82bb63427bdee06b14c2a263834ecde25c713456a16f` |
| 官方 S2-27 WebP | `b16a15f5d65b318ca25ff95174a9ebf9142f010dc52d6cabfc50e1210db68fe2` |
| 官方 S0-07 WebP | `080f29c049a3a2f2f2a6796a16f4ccdd42e79c1004c077225c9eaeb18496b9eb` |

四个 HTML 的哈希与此前各轮交付记录一致（本次整理**未修改任何游戏文件**，仅复制）。

## 3. 本次已执行的检查

| 检查 | 结果 |
|---|---|
| 收到的 Handoff ZIP 无越界路径；解压到新空目录；以 `python -I` 读取 | ✅ 11 个条目 |
| 4 枚官方 WebP 的 sha256 与 `official-1320-fixture-totems.manifest.json` 逐一比对 | ✅ 全部一致；均为 RIFF/WebP VP8，1254×1254 |
| Handoff 内 4 个占位 SVG 与此前上传的同名 SVG 逐字节比较 | ✅ 完全相同 |
| Handoff 内 Data Pack 与此前上传版的差异 | 已确认：新版**撤回** S3 区间表与 `S3=月×日`/`S2=月＋日`，增加官方图腾映射 §3.1.1，并将图腾定位改为"四境占位"。已将新版设为权威，旧版入 `docs/superseded/` 并加警示横幅 |
| 游戏源码是否含已撤回公式 | ✅ 不含（仅 DEMO 公式，且界面持续标注） |
| `tools/smoke_test.py` 对 v0.2.3 干净版 + selftest 副本 | ✅ ALL PASS（干净版无 selftest 钩子；单 HTML 文档；源码去注释后无 fetch/XHR/存储/cookie；360×740、390×844、430×932、1280×800、390×844 减少动效：无控制台错误、无网络请求、无横向溢出、无缺失 i18n 键、存储为空；公开 payload 恰 6 键；非法 snippet→null） |
| 同一脚本对冻结基线 v0.2.2 | ✅ ALL PASS |
| 提取的 8 个占位图腾 SVG + 2 个瓶子 SVG 为合法 XML；渲染目视检查 | ✅ |
| `SHA256SUMS.txt` 生成后在新目录重新解压 ZIP 并 `sha256sum -c` | 见 §5（打包后执行） |

## 4. 尚未完成（不得宣称已通过）

- ❌ **iPhone Safari 真机**（刘海 / 灵动岛 / Home Indicator 安全区、软键盘、音频解锁）。
- ❌ **Android Chrome 真机**。
- ❌ 完整交互回归：旧脚本（全流程、重玩/撤销、同意撤销、焦点陷阱、触控目标、走者与标签重叠等）因会话压缩丢失，本次只提供冒烟级测试。早前各版本这些项目曾在 Chromium 通过，但**脚本不在本包内**。
- ❌ 产品/视觉验收；Hollywood 方向确认后的逐屏验收。
- ❌ 官方算法、官方卡牌内容、全量官方图腾（见 `docs/GAPS_AND_NOVA_INPUTS.md`）。
- ❌ 官方 WebP 在游戏内的展示未实现（本次任务为整理，不改游戏行为）。

## 5. 打包后复核
由打包脚本在 ZIP 生成后执行：新目录解压 → `sha256sum -c SHA256SUMS.txt` → 对解压后的 `src/current` 重跑 `smoke_test.py`。结果附在交付说明中。

## 6. 授权状态
`PREVIEW = NOT_AUTHORIZED`　`DEPLOY = NOT_AUTHORIZED`　`PUBLIC_LAUNCH = NOT_AUTHORIZED`
`OFFLINE_PROTOTYPE = TRUE`　`OFFICIAL_ALGORITHM_CONNECTED = FALSE`　`ACCOUNT/PAYMENT/MULTIPLAYER/MODERATION = FALSE`
密钥未进入 ZIP；仅 `.env.example` 含变量名与占位值。
