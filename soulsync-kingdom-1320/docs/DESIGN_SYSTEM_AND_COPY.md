# 设计系统、流程与文案位置（从干净开发版提取，行号为交付时）

权威设计文档：`docs/design/`（GDD v1.0、Visual UI Handoff v0.2.3、Cursor Addendum v0.3.1、v0.2 计划 §3.3–§13）。本文只指出**代码里在哪**，不替代它们。

## 1. 色彩与字体（`:root`，L9–L14；已提取到 `assets/inline-extracted/design-tokens.css`）

| 令牌 | 值 | 用途 |
|---|---|---|
| `--ink` | `#070d24` | 夜空底色 |
| `--deep` | `#0f1b45` | 面板/模态底 |
| `--dusk` | `#1b2a63` | 渐变上端 |
| `--gold` | `#f0c97a` | 主金色（灯、显影） |
| `--gold-d` | `#c99a45` | 深金（描边、辅助线） |
| `--moon` | `#e8ecfb` | 正文 |
| `--mist` | `#a9b4dc` | 次要文字、沉睡图腾 |
| `--danger` | `#ffb4a8` | 错误 |
| `--line` | `rgba(159,171,214,.3)` | 分隔线、虚线 |
| `--glow` | `rgba(240,201,122,.22)` | 光晕 |
| `--serif` | Noto Serif SC → Source Han Serif SC → Songti SC → STSong → SimSun | 标题、数字、灯 |
| `--sans` | PingFang SC → Noto Sans SC → Hiragino Sans GB → Microsoft YaHei → system-ui | 正文 |

正文 16px / 行高 1.75；`.lead` 19px 衬线；标题衬线 600、字距 .05em。**无外部字体文件**，使用系统字体栈（离线）。外壳 `#shell` 最大宽 480px，使用 `env(safe-area-inset-*)`（**尚未真机验证**）。

## 2. 屏幕流程（`V.*`，`render()` 在 L875）

| 屏 | 函数 | 行 | 要点 |
|---|---|---|---|
| 梦境序幕 | `V.intro` | 557 | 开场免责声明 `intro.disc` |
| 梦境召唤 | `V.dream` | 572 | 接住 4 颗光 → 1320 |
| 门前三问 | `V.gate` | 584 | 全部可跳过 `skipPro()` |
| 门 / 口令 | `V.pw` | 595 | 1320 是故事仪式，非安全凭据 |
| 蓝图钥匙 | `V.birth` | 611 | → `setBirth()` → `Adapter1320.compute()` |
| 四境地图 | `V.map` | 631 | 结构 S1→S3→S2→S0，访问顺序自由；`POS`（L363）为节点坐标 |
| 场景 | `V.scene` | 678 | 四境差异化互动；`finish()` / `redo()` / `leaveScene()` |
| 灵魂蓝图 | `V.bp` | 758 | A 固定蓝图 / B 今日探索记录；`exportCard()`（L777）|
| 星愿瓶 | `V.bottle` | 799 | 封存规则 |
| 公开预览 | `V.preview` | 819 | 独立同意 |
| 流星 | `V.meteor` | 837 | Canvas 动画 `runMeteorCanvas()`（L942） |
| 星墙 | `V.wall` | 848 | 本机预览、有限回应手势 |

## 3. 文案

- 全部在 `ZH` 字典（L223 起，约 86 行/数百键），`EN` 空占位（L333），`t(key, vars)`（L335）。
- 开场声明：「故事灵感来自创作者的一场梦。这里是一段象征性的自我探索旅程。」（`intro.disc`，L226）。
- 未接入披露：`about.notyet` / `about.notyet.l`（L328）。
- DEMO 标注：界面持续显示「示例数据，非 1320 原始算法」「占位，非官方图腾」。
- 文案原则（GDD / v0.2 §11）：Reflection, Not Prediction；无对错、无等级、无频率高低；选择/拒绝/跳过/留白皆有效；不诊断。

## 4. 视觉与动效资源位置（均为内联，无外部文件）

| 资源 | 在哪 | 提取文件（`assets/inline-extracted/`） |
|---|---|---|
| 梦行者 + 生命灯（走者） | `walker(lit,pose)` L471；`WK_SIDE` 放置规则 | `walker-lamp-source.js.txt` |
| 远处小人 | `far()` L518 | `far-walker-figure-snippet.html.txt` |
| 星愿瓶 | `BOTTLE_SVG` L519、`BOTTLE_MINI` L520 | `bottle-svg.svg`、`bottle-mini.svg` |
| 四境通用图腾占位 | `TOTEM_SHAPE` L506；状态 CSS `.tt/.tm` L177–185 | `placeholder-totem-s{1,3,2,0}-{revealed,sleeping}.svg`、`totem-state.css` |
| 星空背景 | `<canvas id="sky">` L205；绘制约 L980 | — |
| S3 波形 | `<canvas class="wave">`；`drawWave` 约 L893 | — |
| 流星 | `runMeteorCanvas()` L942、`drawMeteorEnd()` L934 | — |
| 动画关键帧 | CSS `@keyframes`（fadein、drift、shake、pulse、dustfade、faint、br、bob、ring、reveal） | `keyframes.css` |
| 音效 | `sfx(kind)`（lamp / gesture / rise / step）与 `tone(on)`（S3 持续音）——**WebAudio 合成，无音频文件**；默认可关（`S.sfx`） | `audio-webaudio-source.js.txt` |
| 星墙 | `V.wall` L848 + 手势 | — |

## 5. 提取方式

```bash
python3 -I tools/extract_inline_assets.py src/current/soulsync-kingdom-1320-v0.2.3-visual-dev.html assets/inline-extracted-regenerated
```
只读源文件；SVG 以正则从 `TOTEM_SHAPE`/`BOTTLE_*` 抽取并包上独立样式，保证可单独打开编辑。走者与音频是 JS 模板/函数源码（依赖游戏状态 `S`），提供为 `.txt` 供参照，不是独立可渲染资产。

## 6. 参考图

- `assets/placeholder-realm-totems/png-renders/`：从内联 SVG 渲染的 PNG（审阅用）。
- `assets/reference-examples-user-png/`：创作者早期的 4 张图腾示例（含 `v0.2.3 PLACEHOLDER` 字样，**已标记 superseded**，非规格）。
- `screenshots/`：Chromium 渲染，**非真机**。
