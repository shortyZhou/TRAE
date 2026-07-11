# 🐾 三只小猫翻牌冒险记 · 翻牌记忆闯关小游戏

**版本**: v1.1（已部署到腾讯云 CDN · 稳定版）  
**设计风格**: 童趣糖果治愈系（PlayfulGeometric + Claymorphism + Botanical 三件套组合）  
**产品形态**: 单页 HTML5 网页小游戏（零构建步骤 · 零依赖 · 浏览器直接打开即玩 · 桌面端优先适配）

## 📋 项目背景 & 核心定位

一款以三只卡通小猫（**毛肚、焦糖、布丁**）为原型创作的 3 关渐进式翻牌记忆闯关小游戏。难度递进：日常场景篇 → 传统节日篇 → 饮品时光篇（含小猫炸弹机制），通关后以「通关彩蛋」页面收尾（三层黏土感蛋糕 + 猫咪围坐插画 + 马卡龙色彩纸飘落动画）。

- **技术属性**：纯静态三文件实现（`index.html + styles.css + game.js`），不需要任何 `npm install` / `vite build` 构建步骤，体积小、加载快、部署简单
- **部署属性**：GitHub `main` 分支 Push 后 → 自动同步到腾讯云 CloudBase 静态网站托管（全球 CDN 加速 HTTPS），无需手动操作

---

## 🚀 快速开始

### 🎮 在线体验 Live Demo

> 网页小游戏已部署到 **腾讯云 CloudBase 静态网站托管**，每次 Push 到 `main` 分支会自动拉取并完成 CDN 部署，无需手动操作：
>
> 👉 **[🐾 三只小猫翻牌冒险记 · 闯关大冒险（直接打开）](https://cloud-deployment-d1eq6g15a563ebc-1452791018.tcloudbaseapp.com/)**

### 🛠️ 本地运行（零构建 · 零依赖 · 30 秒启动）
本项目为纯静态三文件实现（`index.html + styles.css + game.js`），**不需要 `npm install` / `vite build` / 任何构建工具**，任选以下任一方式启动：

#### 方式 1 · 最快（直接双击）
直接在文件管理器中双击打开 [index.html](file:///C:/Users/24779/Desktop/AI%20related/TRAE/index.html) → 浏览器即玩（适合快速预览）。
> 💡 若部分浏览器因 `file://` 协议限制导致图片/CORS 异常，请改用下方本地静态服务器方式。

#### 方式 2 · Python 一行起服务（推荐 · 无 Node 环境时）
Windows / Mac / Linux 通用（需已装 Python 3）：
```bash
# 在项目根目录（含 index.html 的目录）执行
python -m http.server 8000
```
浏览器打开：👉 **http://127.0.0.1:8000/**

#### 方式 3 · Node 一行起服务（有 Node 环境时）
无需全局安装任何包，用 `npx` 直接执行：
```bash
# 方案 A：npx serve
npx serve . -l 8000
# 方案 B：npx http-server（关闭缓存，调试更顺手）
npx http-server . -p 8000 -c-1
```
执行后按终端输出提示的 `http://localhost:8000` 打开即可。

#### 方式 4 · VS Code Live Server 插件（开发调试时最爽）
1. VS Code 扩展商店搜索安装「**Live Server**」（作者 Ritwick Dey）
2. 右键本项目 [index.html](file:///C:/Users/24779/Desktop/AI%20related/TRAE/index.html) → 菜单点「**Open with Live Server**」
3. 自动弹出浏览器 + **文件保存后自动热刷新**，无需手动按 F5

---

### ✏️ 快速修改游戏内容（3 处核心配置 · 其他代码不用动）
想自定义关卡 / 步数 / 猫咪描述 / 通关文案？直接改 [game.js](file:///C:/Users/24779/Desktop/AI%20related/TRAE/game.js) 文件顶部的三个配置块即可：

| 修改目标 | 配置块位置（game.js 顶部） |
|---|---|
| 猫咪人设 / 头像 / 外观描述 / 卡通形象 Prompt | `const CATS = [...]` 数组（每个对象对应 毛肚 / 焦糖 / 布丁） |
| 三关参数：网格 R×C / 最高剩余步数 / 卡牌主题 / 炸弹数 | `const LEVELS = [...]` 数组（下标 0=L1 场景篇 / 1=L2 节日篇 / 2=L3 饮品篇） |
| 欢迎页规则 / 按钮文字 / 过渡页文案 / 通关彩蛋祝福 | `renderHome()` / `renderTransition()` / `renderFinale()` 视图函数内的字符串字面量 |
| 主题色 / 圆角 / 黏土感阴影 / 卡牌动画时长 | [styles.css](file:///C:/Users/24779/Desktop/AI%20related/TRAE/styles.css) 顶部 `:root` CSS Variables 集中定义，改一处全局生效 |

---

## 🎮 游戏玩法与核心规则

### 🐱 三只猫咪角色设定（卡通化原型）
| 名字 | 外貌（卡通化提取） | 牌面卡通风格 |
|------|------------------|------------|
| **毛肚 Maodu** | 美短银虎斑 + 白腹；大圆深绿色眼睛；粉鼻粉肉垫；淘气灵动 | 猫式坐姿、表情丰富、带点机灵感 |
| **焦糖 Jiaotang** | 乳白/淡金渐层绒毛；超大圆祖母绿眼睛；圆脸胖嘟嘟；乖乖长腿坐姿 | 端正坐姿、表情认真、乖巧小公主感 |
| **布丁 Buding** | **曼康基短腿 + 长毛**；淡奶油橘色（橘白相间）；标志性淡橘色额头发型分界线（毛色对称） | 呆呆坐姿、短腿小肉垫明显、一摇一摆呆萌感 |

> 卡通风格统一要求：Q版 2D 水彩+扁平卡通风、大头大眼、毛绒质感柔软，糖果色马卡龙配色与整体 UI 一致

### 📖 游戏核心规则（欢迎页展示 4 条）
1. 点击任意两张卡牌进行翻面
2. 图案相同 → 配对成功 ✅，卡牌保持翻开，配对计数 +1
3. 图案不同 → 1 秒后自动翻回 ❌，扣除 1 点剩余步数
4. **第 3 关特有机制「小猫炸弹」💣**：翻到或误配到小猫炸弹组 → 额外扣除 2 点步数并 Toast 警告；**剩余步数归 0 时永久禁止翻牌**，需点「🔄 重来本关」

### � 通关彩蛋
三关全部完成（所有非炸弹卡牌 100% 配对）→ 跳转「通关结算页」：三层黏土感蛋糕 + 焦糖与毛肚左右围坐 + 马卡龙色碎纸片飘落动画 + 猫咪主题祝福语

---

## 🗺️ 三关闯关配置（实际最终版本 · 已部署）

### 🌟 第 1 关 · 场景日常篇（焦糖 + 毛肚 · 2 只猫）
| 配置项 | 实际值 |
|--------|--------|
| 网格 R × C | **3 行 × 4 列 = 12 格 = 6 对** |
| 参与猫咪 | 焦糖 + 毛肚（布丁暂不登场降低难度） |
| 卡牌主题 × 猫 | 3 场景 × 2 猫 = 6 对 = 12 张<br>① 爬猫爬架 ② 吃小零食 ③ 睁着眼坐在猫窝里 |
| 最高剩余步数 | **15 步** |

### 🧧 第 2 关 · 传统节日篇（焦糖 + 毛肚 + 布丁 · 3 只猫全登场）
| 配置项 | 实际值 |
|--------|--------|
| 网格 R × C | **3 行 × 6 列 = 18 格 = 9 对** |
| 参与猫咪 | 焦糖 + 毛肚 + 布丁 |
| 卡牌主题 × 猫 | 3 中国传统节日 × 3 猫 = 9 对 = 18 张<br>① 🧧 春节（穿新衣贴春联） ② 🐲 端午节（吃粽子划龙舟） ③ 🥮 中秋节（赏月吃月饼） |
| 最高剩余步数 | **20 步** |

### ☕ 第 3 关 · 下午茶时光（3 只猫 + 小猫炸弹机制）
| 配置项 | 实际值 |
|--------|--------|
| 网格 R × C | **4 行 × 5 列 = 20 格 = 10 对** |
| 参与猫咪 | 焦糖 + 毛肚 + 布丁 + 小猫炸弹组 |
| 卡牌主题 × 猫 + 炸弹 | 3 饮品 × 3 猫 + **1 组小猫炸弹（2 张）** = 10 对 = 20 张<br>① 🍸 喝鸡尾酒 ② ☕ 喝咖啡 ③ 🧋 喝奶茶<br>④ 💣 小猫炸弹（猫咪造型炸弹，翻到扣 2 步） |
| 最高剩余步数 | **25 步** |
| 关键防御机制 | 步数归 0 时设置 `STATE.stepsExhausted = true`（永久锁），`onCardClick` 入口直接 return，禁止继续翻牌；仅通过「🔄 重来本关」调用 `loadLevel` 重置锁状态

---

## ⚙️ 架构设计逻辑

### ✅ 技术选型原则：高效优先 · 打开即玩 · 零构建 · 零依赖
| 模块 | 选型 | 选型理由 |
|------|------|--------|
| 整体架构 | **纯 HTML + CSS + Vanilla JS（原生 ES6+）** | 翻牌游戏体量极小，构建工具收益为负；三文件零依赖 → 浏览器双击 `index.html` 即玩；GitHub + CloudBase 静态托管直接部署 |
| CSS 方案 | 原生 CSS（CSS Variables `:root` 集中主题 Tokens） | 糖果治愈系配色/圆角/阴影全部通过变量统一管理；卡牌 3D 翻面用原生 `transform: rotateY + perspective` 实现 |
| 动画方案 | **不使用任何第三方动画库** | CSS Keyframes + Transition 覆盖全部需求：卡牌弹性翻面、黏土感按钮、彩纸粒子飘落、三层蛋糕伪 3D 立体 |
| DOM 操作 | 原生 `document.querySelector + innerHTML` 模板字符串 | 轻量高效，无需虚拟 DOM |
| 卡通图像生成 | **TRAE 内置 text_to_image API** | 三只小猫头像 × 3 张 + 每关每只猫每主题一张插画 = 共约 30+ 张卡通图；图像失败时自动 Emoji FALLBACK（😽+💣 组合） |
| 部署平台 | 腾讯云 CloudBase 静态托管 + GitHub 授权绑定 | 无需生成 CAM 密钥；Push main 分支 → 自动拉取部署 CDN，HTTPS 默认开通，完全可视化配置 |

### 🏗️ 三层架构（TECH-ARCH 分层）
```
🌐 表现层 Presentation (DOM + CSS)
  VIEW_HOME(欢迎页) / VIEW_GAME(关卡页 3关复用) / VIEW_TRANS(过渡页) / VIEW_FINALE(通关结算页)
        ↕ DOM 事件回调
⚙️ 逻辑层 Logic (Vanilla JS ES6+)
  STATE(游戏状态机) + CARD_ENGINE(洗牌/翻牌/配对引擎) + LEVEL_MGR(配置表驱动) + TIMER_MGR(步数耗尽锁)
        ↕ 读取配置
💾 数据层 Data
  LEVELS(三关硬编码配置表) / CATS(猫咪人设+Prompt映射表) / localStorage(进度保存可选)
```

### 🎰 游戏状态机与核心逻辑
**STATE 状态对象（game.js 顶部定义）**：
```js
const STATE = {
  view: 'HOME',               // HOME | LEVEL_x | TRANS | FINALE
  levelIndex: 0,              // 0=L1 / 1=L2 / 2=L3
  stepsLeft: 0,               // 剩余步数
  matchedPairs: 0,            // 已配对数
  totalPairs: 0,              // 本关总配对数 = types.filter(!isBomb).length（炸弹不计入，修 L3 Bug）
  firstCard: null,            // 第一张翻牌引用
  lockClicks: false,          // 翻两张牌期间的临时判定锁（1s 后释放）
  stepsExhausted: false,      // ⭐ 步数耗尽的永久锁（修复 Bug：步数为 0 后禁止继续翻牌）
  completedLevels: []         // 通关记录
}
```

**卡牌引擎核心流程**：
1. **生成卡牌对**：按关卡 `LEVELS[idx].themes × cats` 组合生成 `types`，每种 `type` × 2 张，保证配对成对
2. **Fisher-Yates 洗牌**：标准洗牌算法，保证每次游戏牌序真随机
3. **翻牌约束**：
   - 同一时刻最多翻 2 张 → 通过 `lockClicks` 临时锁 + `setTimeout` 回调释放
   - 第一张翻 → `firstCard` 记录引用
   - 第二张翻 → 比较 `type`
     - ✅ 相同：`matched = true`，计数 +1，立即判定通关
     - ❌ 不同：1s 后翻回；含**炸弹组** → 额外 `spendStep(2)` + Toast 警告
4. **通关判定**：`STATE.matchedPairs === STATE.totalPairs`（炸弹组不计入 totalPairs，修复 L3 全部配对却不通关的 Bug）

### 📁 目录结构 · 三文件职责分明
```
TRAE/
├── index.html        ← 唯一 HTML：全部视图结构（欢迎页/3关卡页/过渡页/通关彩蛋页）+ DOM 节点挂载
├── styles.css        ← 全部样式：:root 主题Tokens + Claymorphism阴影 + 卡牌flip动画 + 响应式Grid
├── game.js           ← 全部逻辑：STATE状态机 / CATS人设表 / LEVELS配置表 / 洗牌 / 翻牌 / 配对 / 步数锁
└── .trae/documents/  ← 产品与架构文档（PRD.md + TECH-ARCH.md，开发过程沉淀）
```

---

## 🤖 Agent & Skills 技术栈使用说明

本项目完全在 **Trae IDE** 内开发完成，使用了 Trae 内置的 AI 开发 Agent 体系 + Skill 生态系统：

### 🧠 Trae AI Agent 开发体系
- **ExperienceRecall 经验回忆系统**：每次执行任务前先调用历史相似经验，避免踩重复坑；本项目累计调用关键经验 6+ 条：
  | 经验 ID | 应用领域 |
  |---------|---------|
  | `1042373` | Git 工作流（禁止乱 `clean/reset`、精确 add、避免污染提交） |
  | `552471` | GitHub 推送（代理/网络检测、Push 失败立即停不重试） |
  | `432647` | CloudBase CLI 部署（命令选型/密钥零明文暴露/控制台与自动化边界） |
  | `909604` | 翻牌游戏状态机（turn 锁/重置时机/判定回调） |
  | `188265` / `123124` | CloudBase/Node 前置依赖（PowerShell 执行策略/`npm.cmd` 绕过 PS1 限制） |
  | `1059733` | Git 最小化补丁操作（避免在不确定时产生多余 commit） |

### 🛠️ 已安装 Skills 清单
#### 🌐 全局级 Skills（跨所有项目生效）
| Skill 名 | 安装位置 | 作用 |
|----------|--------|------|
| skill-vetter | 全局 | 新 Skill 安装前的安全审查机制，避免恶意 Skill 注入 |
| self-improving-agent | 全局 | Agent 自我迭代与任务复盘能力 |
| proactive-agent | 全局 | 任务前置规划与主动提示能力 |
| find-skills-skill | 全局 | ClawHub 技能库搜索与发现能力 |

#### 🎨 项目级 Skills（仅本 TRAE 项目生效）
| Skill 名 | 作用 |
|----------|------|
| **design-style** | 固化的设计风格字典系统（PlayfulGeometric + Claymorphism + Botanical）→ 为 UI/卡牌/蛋糕/按钮等所有视觉元素提供配色、圆角、黏土感双重阴影、弹性动画缓动曲线等统一 Tokens，确保「童趣糖果治愈系」视觉 100% 一致，不产生散乱 AI 风格 |

---

## ⚠️ 重要声明 · 非商业用途

> **本仓库中的所有内容均为 Workshop 阶段的实验性技术创作与卡通演示素材，不代表任何真实商业产品或正式方案。**
>
> - 所有业务场景、关卡设计、卡牌主题均为**假设性创作**，用于技术探索、UI/交互设计验证与卡通风格实验
> - 涉及的任何指标、配置、数值均为**手工调整的游戏性参数**，并非真实生产数据
> - 三只小猫卡通形象为 AI 生成的虚构卡通角色，无真实商业授权，仅用于游戏角色演示
> - 代码实现以**快速验证 + 快速迭代**为目的，不保证生产级质量与高并发安全性
> - 项目结构与技术选型可能随实验进展**频繁变动**，请勿作为稳定依赖
> - **仅限技术研讨、学习交流与非商业演示用途，严禁外传或用于任何形式的商业变现**
