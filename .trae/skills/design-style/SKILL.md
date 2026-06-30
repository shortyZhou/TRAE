---
name: "design-style"
description: "Create visually distinctive, production-grade frontend interfaces with 33 preset design aesthetics. Supports Neo-brutalism, PlayfulGeometric, Claymorphism, Botanical, ModernDark, Luxury, Cyberpunk, Swiss, Bauhaus, etc. Proactively triggers on any frontend/UI/web/React/Vue work to prevent generic AI-looking UIs."
---

# Design Style Skill

## Purpose

This skill helps create beautiful, distinctive frontend interfaces by automatically retrieving design system prompts from the `prompts/` directory. Instead of producing generic UI, this skill enables building interfaces with specific design aesthetics like Neo-brutalism, Modern Dark, Luxury, Cyberpunk, and more.

Proactively invokes on ANY frontend/UI/interface/web design request (landing pages, web apps, dashboards, UI components, React/Vue/Next.js/Svelte projects, CSS/Tailwind work, aesthetic adjectives like "modern", "clean", "beautiful", "professional").

## When to Use

This skill is **automatically invoked** when:

- User asks to build a web page, landing page, or web application
- User requests a UI component with a specific design style
- User mentions frontend, React, Vue, or web development
- User asks for a specific aesthetic (e.g., "make it look modern and dark" or "use a brutalist style")
- User mentions "frontend", "UI", "UX", "design", "interface", "web design", or "styling"
- User asks for "beautiful", "modern", "professional", "clean", or any aesthetic adjective
- User requests help with CSS, Tailwind, styled-components, or any styling approach

## Available Design Styles

The following design systems are available in the `prompts/` directory:

- **Academia** — Scholarly, classic, refined
- **ArtDeco** — Luxurious 1920s glamour
- **Bauhaus** — Functionalist, geometric minimalism
- **BoldTypography** — Type-driven design
- **Botanical** — Nature-inspired, organic (糖果风/治愈系推荐 · 自然柔和配色)
- **Claymorphism** — Soft, clay-like 3D elements (糖果风/治愈系推荐 · 软萌黏土立体感)
- **Cyberpunk** — Futuristic, neon, high-tech
- **Enterprise** — Professional, corporate, scalable
- **FlatDesign** — Clean, minimal, 2D
- **Fluent2** — Microsoft Fluent 2 Design System
- **HumanistLiterary** — Warm, literary, conversational aesthetic
- **Industrial** — Raw, mechanical, utilitarian
- **Kinetic** — Dynamic, motion-focused
- **Luxury** — Premium, elegant, sophisticated
- **Material** — Google Material Design
- **Maximalism** — Bold, expressive, abundant
- **MinimalDark** — Minimal dark theme
- **ModernDark** — Contemporary dark UI with depth
- **Monochrome** — Black and white, high contrast
- **Neo-brutalism** — Bold, raw, colorful brutalism
- **Neumorphism** — Soft UI, skeuomorphic
- **Newsprint** — Newspaper-inspired
- **Organic** — Natural, flowing forms
- **PlayfulGeometric** — Fun geometric shapes (糖果风/治愈系首选 · Q版几何形状 + 马卡龙配色)
- **Professional** — Clean, business-focused
- **Retro** — Vintage, nostalgic
- **Saas** — Modern SaaS aesthetic
- **Sketch** — Hand-drawn, artistic
- **Swiss** — International Typographic Style
- **TerminalCLI** — Command-line interface aesthetic
- **Vaporwave** — 80s/90s aesthetic, nostalgic
- **Web3** — Decentralized, crypto-inspired

### 🍬 糖果风/治愈系小游戏推荐组合
`PlayfulGeometric` (主) + `Claymorphism` (立体感) + `Botanical` (柔色自然) → 马卡龙配色 + 大圆角软阴影 + Q版形状

## How It Works

### Step 1: Understand User Intent

When the user requests frontend work, first determine:

1. **Tech stack** — What framework are they using? (React, Vue, Next.js, plain HTML/CSS, etc.)
2. **Design preference** — Did they mention a specific style or aesthetic?
3. **Component scope** — Single component, full page, or entire application?

### Step 2: Select Design Style

**If user specifies a style:**

- Match their request to available styles (e.g., "brutalist" → Neo-brutalism)
- Case-insensitive matching (brutalism, Brutalism, BRUTALISM all work)
- Fuzzy matching: "糖果" / "马卡龙" / "治愈" / "童趣" / "软萌" → **PlayfulGeometric + Claymorphism + Botanical**

**If user doesn't specify:**

- For modern, professional projects → **ModernDark** or **Professional**
- For creative, bold projects → **Neo-brutalism** or **BoldTypography**
- For minimal, clean projects → **FlatDesign** or **Swiss**
- For enterprise/corporate → **Enterprise**
- For kids/toys/cute/warm → **PlayfulGeometric** + **Claymorphism**

Ask the user if you're uncertain about which style fits their needs.

### Step 3: Retrieve Design System

Use the Read tool to load the appropriate prompt file:
```
Read: prompts/<StyleName>.md
```

If the `prompts/` directory or specific `<StyleName>.md` file is missing in the installed copy of this skill, apply the style definition summary below directly from this SKILL.md, and strictly follow the named aesthetic's visual rules.

### Step 4: Apply Design System

Once the design philosophy is loaded:

1. **Internalize the design philosophy** — Understand core principles, visual signatures, and differentiation factors
2. **Extract design tokens** — Colors, typography, spacing, shadows, borders
3. **Follow component patterns** — Use specified button styles, card layouts, etc.
4. **Apply the "Bold Factor"** — Implement signature elements that make the design authentic
5. **Avoid anti-patterns** — Don't use techniques that break the aesthetic

### Step 5: Build with Context

**Before writing code:**

- Identify the user's existing tech stack
- Understand their component architecture
- Note any constraints (CSS frameworks, design libraries, etc.)

**When writing code:**

- Match their existing patterns and conventions
- Centralize design tokens in CSS variables or a config file
- Create reusable, composable components
- Explain architectural choices briefly

**Quality standards:**

- Preserve or improve accessibility
- Ensure responsive design across devices
- Make deliberate, creative design choices (not generic boilerplate)
- Leave the codebase cleaner than you found it

## Examples

### Example 1: User Specifies Style

**User:** "Create a landing page for my SaaS product with a neo-brutalist design"

**Skill Actions:**

1. Detect keywords: "landing page", "neo-brutalist"
2. Map "neo-brutalist" → Neo-brutalism style
3. Load the design system prompt (if prompts/ exist) or apply Neo-brutalism rules: thick 2–4px solid borders #000, hard offset shadows, bold saturated colors, mono/display fonts pairing, no rounded corners, raw exposed structure
4. Ask clarifying questions: "What tech stack are you using? React, Vue, or plain HTML/CSS?"
5. Build the landing page following all rules

### Example 2: 童趣糖果风小游戏

**User:** "帮我做一个童趣糖果治愈系的翻牌记忆小游戏"

**Skill Actions:**

1. Keywords: "童趣" + "糖果" + "治愈" + "小游戏"
2. Auto-select combo: **PlayfulGeometric** + **Claymorphism** + **Botanical**
3. Apply tokens:
   - **Color palette (马卡龙)**: `#FFE5EC` bg / `#FFCAD4` primary / `#FFD6A5` accent / `#CAFFBF` success / `#BDB2FF` info / `#FFFFFC` surface
   - **Rounded**: All corners `20px` minimum, cards use `32px` radius
   - **Shadows**: Claymorphism dual soft shadows (inset + offset light)
   - **Shapes**: Buttons/cards use rounded rectangles or pill shapes, add small dots/circles decorative geometry
   - **Typography**: Rounded sans-serif (system-ui 或 更圆润字体)，字号偏大显童趣
4. Build the game UI matching the tech stack

## Quick Reference — Top 6 Preset Style Tokens

### 1. PlayfulGeometric (童趣几何 · 糖果风首选)

```css
:root {
  --bg: #FFF8F0;
  --surface: #FFFFFF;
  --primary: #FF8FB1;
  --accent: #B5DEFF;
  --success: #C7F0BD;
  --warning: #FFE29A;
  --text: #3D405B;
  --radius-sm: 16px;
  --radius-md: 24px;
  --radius-lg: 36px;
  --radius-full: 9999px;
  --shadow: 0 10px 30px -10px rgba(255, 143, 177, 0.45);
  --border: 3px solid #3D405B;
  --font-display: system-ui, "Segoe UI", "PingFang SC", sans-serif;
}
```

**Bold Factor**: 所有可点击元素加 2–3px 彩色粗边框 + 悬停时向上位移 4px + 弹性缓动动画；装饰用随机大小圆点、圆角矩形

### 2. Claymorphism (黏土立体感 · 糖果风次选)

```css
:root {
  --bg: #F7F3FF;
  --surface: #FFFFFF;
  --primary: #C4B5FD;
  --accent: #FCA5A5;
  --text: #4B5563;
  --radius-lg: 40px;
  --shadow-clay-outside: 8px 8px 16px #D1D5DB, -8px -8px 16px #FFFFFF;
  --shadow-clay-inside: inset 2px 2px 5px rgba(0,0,0,0.05), inset -3px -3px 7px rgba(255,255,255,0.9);
}
```

**Bold Factor**: 卡片使用双阴影（外 + 内）营造软陶土/黏土按压效果；所有按钮是大圆角 3D 浮雕感

### 3. Botanical (自然有机 · 治愈配色)

```css
:root {
  --bg: #F1F8E9;
  --surface: #FFFFFF;
  --primary: #81C784;
  --accent: #F48FB1;
  --text: #2E3A23;
  --radius-lg: 28px;
  --shadow: 0 12px 32px -12px rgba(129, 199, 132, 0.5);
}
```

### 4. Neo-brutalism

```css
:root {
  --bg: #FFF3B0;
  --surface: #FFFFFF;
  --primary: #FF6B6B;
  --accent: #4ECDC4;
  --text: #1A1A2E;
  --radius: 0;
  --border: 4px solid #1A1A2E;
  --shadow: 6px 6px 0 #1A1A2E;
}
```

### 5. ModernDark

```css
:root {
  --bg: #0B0F19;
  --surface: #151B2C;
  --surface-hover: #1C2338;
  --primary: #60A5FA;
  --accent: #F472B6;
  --text: #E2E8F0;
  --muted: #64748B;
  --border: 1px solid rgba(148, 163, 184, 0.1);
  --radius-lg: 16px;
  --shadow: 0 20px 40px -20px rgba(0,0,0,0.8);
}
```

### 6. Swiss (国际排版简约风)

```css
:root {
  --bg: #FAFAFA;
  --surface: #FFFFFF;
  --primary: #EF4444;
  --text: #111827;
  --muted: #6B7280;
  --border: 1px solid #E5E7EB;
  --radius: 0;
  --font-display: "Helvetica Neue", Arial, "PingFang SC", sans-serif;
}
```

**Bold Factor**: 严格网格对齐、非对称布局、大字号对比标题、单一强调色

## Anti-Patterns (全局严禁)

无论选哪种风格，以下内容会立刻破坏审美，**严禁使用**：

- ❌ 字体：Arial / Helvetica / Inter / Roboto / system-ui 单调组合作为 display 字体（糖果风例外可用圆润系统字体）
- ❌ 配色：白底 + 紫色渐变（"AI 默认审美"）、所有颜色饱和度均在 30%–50% 的无性格灰彩色
- ❌ 间距：所有 padding 全是 16px 无节奏
- ❌ 圆角：所有元素全是 8px，缺乏对比
- ❌ 阴影：全是 `0 4px 6px -1px rgba(0,0,0,0.1)` 千篇一律的弱阴影
- ❌ 布局：永远水平居中、永远 flex 等宽、永远左右对称

## Quick Reference Commands

When implementing, quickly reference:

**Colors:**
```
Grep: pattern "Token|Value|Usage" in "prompts/<Style>.md"
```

**Typography:**
```
Grep: pattern "Font|Weight|Size" in "prompts/<Style>.md"
```

**Component Patterns:**
```
Grep: pattern "Button|Card|Input" in "prompts/<Style>.md"
```

## Tips for Best Results

1. **Read the full prompt** — Don't just skim. The design philosophy and differentiation sections are critical.
2. **Implement signature elements** — Every system has a "Bold Factor." These elements are what make it authentic.
3. **Avoid anti-patterns** — Each prompt lists what NOT to do. Follow these rules strictly.
4. **Ask questions** — If user needs are unclear, ask before building.
5. **Match existing code** — Don't fight their tech stack. Integrate into their existing patterns.
6. **Combine styles freely** — 糖果风小游戏推荐混合 PlayfulGeometric + Claymorphism + Botanical，这 3 种组合不冲突

## Notes

- All design system prompts follow the same structure: `<role>` and `<design-system>` sections
- Prompts include detailed color palettes, typography scales, component patterns, and implementation examples
- Each style is production-ready and carefully crafted for visual distinctiveness
- Missing `prompts/*.md` files in the installed copy will **not** block functionality — this SKILL.md 内置了 6 种高频风格的完整 token 定义，可直接落代码
