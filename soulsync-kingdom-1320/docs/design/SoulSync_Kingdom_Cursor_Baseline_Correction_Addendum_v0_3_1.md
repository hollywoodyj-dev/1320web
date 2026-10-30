# SoulSync Kingdom × 1320 SoulCode
## Cursor Baseline Correction & Visual Integration Addendum v0.3.1

日期：2026-10-14  
执行对象：Cursor  
状态：Phase A 内部开发；不授权公开发布  
裁决：**本文件取代 v0.3 Addendum 中关于“已发生地图白屏”及 `revealedTotems`、`REALM_ASSETS`、`totemId` 已存在的假设。**

---

## 0. 结论先行

当前有证据支持的基线是 Claude 已测试的 `soulsync-kingdom-1320-v0.2.html`。Claude 未能在该文件复现地图白屏，且其文件中不存在：

- `revealedTotems`
- `realmVisualState` / `realmVisual`
- `REALM_ASSETS`
- `totemId`

这些名称原本只是未来视觉与正式图腾接入的接口建议，不是当前代码事实，也不是地图修复前置条件。Cursor 不得为追查不存在的错误而虚构 console error、stack trace 或根因。

当前未知来源的 `outputs/soulsync-kingdom-1320.html` 必须保持原样。未完成文件哈希、差异报告与独立测试前，不得把它当作产品基线，也不得把两份文件盲目合并。

---

## 1. 文件裁决与阅读顺序

依次阅读：

1. `SoulSync_Kingdom_Game_Design_Document_v1.0.md`
2. `SoulSync_Kingdom_Claude_Execution_Plan_v0.2.md`
3. `SoulSync_Kingdom_Visual_UI_Handoff_v1.0.html`
4. 本文件
5. Claude 已测试的 `soulsync-kingdom-1320-v0.2.html`

冲突优先级：

```text
Addendum v0.3.1 的基线、状态与验收规则
> Execution Plan v0.2 的产品、隐私与安全边界
> Game Design Document v1.0 的体验意图
> Visual UI Handoff v1.0 的构图语言
> 现有代码中不冲突的实现细节
```

Visual UI Handoff 是视觉 Storyboard，不是可直接覆盖游戏逻辑的程序。

---

## 2. Cursor 的第一个动作：锁定真实基线

在修改前完成并提交：

1. 列出候选 HTML 的绝对路径、文件大小、SHA-256、标题与版本注释。
2. 对 `soulsync-kingdom-1320-v0.2.html` 和 `outputs/soulsync-kingdom-1320.html` 做只读 diff 摘要。
3. 以 Claude 已测试的 v0.2 文件复制出工作文件；保留原件，不原地覆盖。
4. 运行最短路径：

```text
Intro → Dream → Gate → Password 1320 → Sample Birth → Map
```

5. 若没有 console error，报告“未复现”，继续基线修正；不得制造 R0 故障记录。
6. 若出现错误，记录第一条错误原文、完整堆栈、触发路径和修改函数，再修复。

建议版本命名：

- 基线修正版：`Phase A v0.2.1 — Baseline Stabilized`
- 视觉整合候选：`Phase A v0.3 — Internal Visual QA Candidate`

---

## 3. 可从现有 v0.2 源码直接确认的修正

以下问题均可由本次提供的源码静态确认，不依赖推测。

### P0-1｜“跳过序幕”目前没有跳过接光

现状中 `enter()` 与 `skipPro()` 都直接 `go('dream')`。修正为：

```js
skipPro(){
  S.seenPro=true;
  S.dream=[0,1,2,3];
  go('dream');
}
```

验收：点击“跳过序幕”后，梦境页直接呈现排好的 1320 和“走向那扇门”；“进入梦境”仍可逐颗接光。

### P0-2｜只有首次完成一境才点亮生命灯

当前 `finish()` 每次都会设置 `lastLit` 并播放点灯声。修正为：

```js
finish(){
  const id=S.cur;
  const firstCompletion=!S.visited[id];
  S.visited[id]=true;
  S.sc[id].completed=true;
  S.lastDone=id;
  S.lastLit=firstCompletion?id:null;
  S.guided=null;
  if(firstCompletion)sfx('lamp');
  delete S.replayBackup[id];
  go('map');
}
```

同时在 `fresh()` 增加：

```js
replayBackup:{},
```

验收：重走已完成场景不会熄灯、重复加进度或再次播放首次点灯反馈。

### P0-3｜重走必须保留旧完成结果，放弃重走时恢复

进入已完成场景时先显示完成摘要与“重新走这一境”，不得直接把旧记录清空。建议动作：

```js
redo(){
  const id=S.cur;
  S.replayBackup[id]={...S.sc[id]};
  S.sc[id]=id==='s3'?{v:40,replaying:true}:{replaying:true};
  render();
}
```

离开未完成的重走时恢复旧记录：

```js
toMap(){
  const id=S.cur;
  if(S.screen==='scene' && id && S.sc[id]?.replaying && S.replayBackup[id]){
    S.sc[id]=S.replayBackup[id];
    delete S.replayBackup[id];
  }
  go('map');
}
```

再次完成时删除 `replaying` 与备份，用新结果替换旧结果。此处使用浅拷贝足够覆盖当前扁平场景对象；如后来加入嵌套数据，改为显式字段复制或 `structuredClone` 并提供兼容降级。

### P0-4｜`V.map()` 不得在渲染时消费状态

当前存在：

```js
const lit=S.lastLit;
S.lastLit=null;
```

视图函数应只读。改为在 `V.map()` 只读取 `S.lastLit`，并在 `afterRender()` 已成功渲染提示后清除：

```js
if(S.screen==='map' && S.lastLit){
  S.lastLit=null;
}
```

不得因此再次调用 `render()`。验收：切换文字地图等同页重渲染不会意外吞掉尚未展示的点灯提示。

### P0-5｜S2“暂时不选”应直接形成非进入关系的回应

当前 `pickRel()` 对 `none` 仍进入第二轮动作选择。修正：

```js
pickRel(d){
  const s=S.sc.s2;
  s.rel=d.v;
  s.reveal=false;
  if(d.v==='none'){
    s.act='none';
    s.step='mirror';
  }else{
    s.step='act';
  }
  render();
  window.scrollTo(0,0);
}
```

验收：选择“暂时不选”后不再要求玩家选择表达、需要、距离或观看。

### P1｜错误可见性与弹层背景

- `saveCard()` 不得使用空 `catch(e){}`；至少 `console.error(e)` 并在 `#cardNote` 显示“生成失败，请截图保存”。
- 打开 modal 时将 `#shell.inert=true`，关闭时恢复 `false`；保留已有焦点锁定和焦点返回。

---

## 4. 当前不需要新增的变量

| 名称 | v0.2 是否存在 | v0.3.1 决策 |
|---|---:|---|
| `revealedTotems` | 否 | 不作为基线补丁。通用视觉徽记可从 `visited` 派生；只有产品确认“揭示图腾”玩法后再建状态。 |
| `realmVisualState` | 否 | 不新增。当前场景阶段已由 `S.sc[id].step` 表达。 |
| `REALM_ASSETS` | 否 | 单文件阶段不需要。优先 CSS、Canvas、内联 SVG；真正引入素材清单时再建立。 |
| `totemId` | 否 | 仅在官方 1320 算法/内容注册表提供稳定 ID 后加入。不得自行发明官方图腾。 |

缺少这些字段不是当前地图白屏的根因。Cursor 不得添加无调用方的“预防性状态”。

---

## 5. v0.3 视觉整合策略

先完成 v0.2.1 基线修正并全量回归，再进入视觉工作。每一步独立提交、可回退。

### V1｜四境地图关键画面

保留现有 `ORDER`、`POS`、节点点击与文字地图逻辑，只升级视觉层：

| 境域 | 主要画面 | 动态反馈 | 通用徽记（非官方图腾） |
|---|---|---|---|
| S1 原型之林 | 深蓝树林、金色孢子、六个悬浮意象 | 微光在枝叶间缓慢漂移 | 灯/种子/河等玩家所选意象 |
| S3 振动之海 | 夜海、月光路径、波纹层 | 滑杆同步水纹速度与亮度 | 同心波纹 |
| S2 镜像之岸 | 银蓝水面、两层倒影、岸线 | 选择后倒影轻微聚散 | 双弧水镜 |
| S0 空性之门 | 雾白门廊、留白空间、门外生命灯 | 呼吸时雾光扩张收缩 | 空心圆环 |

这些徽记必须标注为原创通用视觉符号，不是 1320 官方图腾，也不写入固定蓝图数据。

### V2｜场景画面插入方式

- 每境增加一个 `realm-stage realm-stage--sX` 视觉容器。
- CSS/Canvas/内联 SVG 只读取当前状态，不改变状态。
- 互动控件保留标准 button/input/textarea 语义，不把重要操作藏进纯画布。
- 文本和完成路径在关闭动画、关闭声音、资源降级时仍完整。
- `prefers-reduced-motion` 下使用静态构图，不丢失信息。

### V3｜资源策略

Phase A 首选单文件实现：

1. CSS 渐变与伪元素；
2. 内联 SVG；
3. Canvas 动效；
4. 只有确定采用外部位图后，才建立真实 `REALM_ASSETS` 清单，并为每项提供尺寸、许可、fallback 与加载错误界面。

任何图片加载失败都只能降级视觉，不得阻断地图或场景流程。

### V4｜未来官方算法与图腾接口

正式接入时，算法返回结构建议扩展为：

```js
{
  provenance:'official',
  algorithmVersion:'...',
  contentVersion:'...',
  foundation:{
    s1:{code:'...',name:'...',shortMeaning:'...',totemId:'...'},
    s3:{code:'...',name:'...',shortMeaning:'...',totemId:'...'},
    s2:{code:'...',name:'...',shortMeaning:'...',totemId:'...'},
    s0:{code:'...',name:'...',shortMeaning:'...',totemId:'...'}
  }
}
```

但 `totemId` 必须来自官方注册表；算法服务失败时显示明确错误并允许重试，不得静默回退成 demo 结果。场景选择仍只进入探索记录，绝不重算固定蓝图。

---

## 6. 强制回归测试

至少覆盖：

1. 390×844、430×932、1280×800；
2. 普通动效与 `prefers-reduced-motion`；
3. 示例日期与 1988-02-29；
4. “进入梦境”逐颗接光与“跳过序幕”直达排好 1320；
5. 四境任意顺序进入、离开、完成；
6. S0 返回地图不算完成；
7. S2 暂时不选直接进入映照；
8. 首次完成点灯，重走放弃恢复旧结果，重走完成不重复增加进度；
9. 汇流、蓝图、星愿瓶、预览、同意、流星、星墙全流程；
10. 不写自由文字也能完成基础旅程；
11. console error、缺失文本键、重复 DOM ID、横向溢出；
12. 所有操作目标不小于 44×44px；
13. 键盘路径、modal 焦点锁定与关闭后焦点返回；
14. 无网络请求、无 localStorage/sessionStorage/cookie；
15. 公开 payload 不含生日、完整固定蓝图、门前回答和场景私人文字。

若候选浏览器无法稳定执行 Canvas 下载，不得把“保存私人卡”计为通过；应显示明确失败或降级说明。

---

## 7. 交付报告模板

Cursor 最终报告必须包含：

1. 实际修改的源文件路径、修改前后 SHA-256；
2. 是否复现地图白屏；若未复现，明确写“未复现”，不提供虚构堆栈；
3. 若发生真实错误：第一条 console error、完整 stack、根因与修改函数；
4. P0-1 至 P0-5 的修改结果；
5. 视觉整合涉及的 CSS 类、函数和资源清单；
6. 完整测试矩阵及通过/失败/未测；
7. 390×844 与 430×932 关键截图；
8. demo、占位、未接入功能及剩余风险；
9. 明确版本状态：

```text
全部强制测试通过：Phase A v0.3 — Internal Visual QA Candidate
任一 P0 或强制测试失败：HOLD
```

不得标注为 Production Ready、Public Beta 或已接入官方 1320 算法。

---

## 8. Cursor 可直接执行的任务指令

> 以 Claude 已测试的 `soulsync-kingdom-1320-v0.2.html` 为唯一工作基线，先记录候选文件哈希并做只读差异报告。若地图白屏无法复现，如实写“未复现”，不要追查或新增不存在的 `revealedTotems`、`REALM_ASSETS`、`totemId`。先按本 Addendum 修复跳过序幕、首次点灯、重走草稿恢复、纯渲染和 S2 暂时不选，再完整回归。通过后，依据视觉 Storyboard 以 CSS、Canvas、内联 SVG 小步接入四境视觉；不得整页重写，不得发明官方算法或图腾，不得破坏隐私、同意和可访问性边界。

