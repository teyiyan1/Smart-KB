# Flow Canvas · 设计规范文档

> 基于项目现有代码提取，适用于 React 18 + Tailwind CSS v4 + @xyflow/react 技术栈。

---

## 一、颜色系统

### 主题色

| Token | 值 | 用途 |
|-------|----|------|
| `--color-primary` | `#ee4d2d` | 主色（Shopee 橙红）、主按钮、选中边框、强调色 |
| `--color-primary-hover` | `#d63f20` | 主色悬停（加深 10%） |
| `--color-link` | `#2673dd` | 链接蓝 |
| `--color-error` | `#ff4742` | 错误红 |

### 辅助色（节点类型）

| 颜色 | 值 | 节点类型 |
|------|----|---------|
| 黄色 | `#faad14` | Clarification 节点 icon 背景 |
| 蓝色 | `#1890ff` | Condition 节点 icon 背景、链接悬停 |
| 青绿 | `#a0d911` | Answer 节点 icon 背景 |
| 绿色 | `#52c41a` | Start 节点 icon 背景 |

### 语义色（文字 / 背景 / 边框）

| Token | 值 | 用途 |
|-------|----|------|
| `--color-text` | `rgba(0,0,0,0.85)` | 主文字 |
| text-88 | `rgba(0,0,0,0.88)` | 最高对比文字 / 图标 |
| text-65 | `rgba(0,0,0,0.65)` | 次要文字 |
| text-45 | `rgba(0,0,0,0.45)` | 占位符、tertiary |
| text-25 | `rgba(0,0,0,0.25)` | 禁用文字 |
| `--color-bg` | `#f7f7f7` | 页面底色 |
| bg-fafafa | `#fafafa` | 面板头部、列表行底色 |
| bg-f5f5f5 | `#f5f5f5` | 分割线底色 |
| `--color-border` | `#e8e8e8` | 标准边框 |
| border-d9 | `#d9d9d9` | 次要边框、禁用按钮边框 |
| border-e5 | `#e5e5e5` | 更浅边框（条目间隔线） |

### 状态色

| 场景 | 值 |
|------|----|
| Draft 标签背景 | `#fff1f0` |
| Draft 标签文字 | `#f5222d` |
| 主色选中光晕 | `rgba(238,77,45,0.2)` |
| 弹出选项悬停背景 | `#f0f7ff` |
| 弹出选项悬停边框 | `#1890ff` |

---

## 二、字体系统

### 字体族

```css
font-family: "Shopee2021", ui-sans-serif, system-ui, sans-serif;
font-weight: 400 | 500 | 700;
```

### 字号层级

| 层级 | 值 | line-height | 用途 |
|------|----|-------------|------|
| 小号 | `12px` | `16px` | 辅助标签、角标 |
| 正文 | `14px` | `22px` | 默认正文、按钮、列表行 |
| 标题 | `16px` | 1.5 | 弹窗分类标题 |

### 字重

| 值 | 用途 |
|----|------|
| `font-normal` (400) | 普通正文 |
| `font-medium` (500) | 标签、按钮、节点标题 |

---

## 三、间距系统

### 基础间距 Token

| Token | 值 | 用途 |
|-------|----|------|
| `--spacing-xs` | `8px` | 内部小间距、gap |
| `--spacing-sm` | `12px` | 列表行 padding |
| `--spacing-md` | `16px` | 标准内边距 |
| `--spacing-lg` | `24px` | 区块间距、popup 分组间距 |
| `--spacing-xl` | `32px` | 大区块间距 |

### 常用固定尺寸

| 用途 | 值 |
|------|----|
| Icon 小号 | `16×16px` |
| Icon 中号 | `18×18px` |
| Icon 节点 | `24×24px` |
| 图标按钮 | `20×20px` 或 `32×32px` |
| 节点卡片宽 | `260px` |
| Drawer 默认宽 | `400px`（min: 260px，max: 720px） |
| Drawer resize 手柄宽 | `11px` |
| 节点 Title 高 | `86px` |
| ConditionRow 高 | `46px` |
| Assignment 高 | `57px` |
| TopBar 按钮高 | `32px` |
| PopUp 宽 | `252px` |

---

## 四、圆角系统

| 值 | 用途 |
|----|------|
| `2px` | 极小控件（节点 icon 内框） |
| `4px` | 小控件（标签、图标容器） |
| `6px` | 标准按钮、小卡片 |
| `8px` | 主卡片（节点、面板、弹窗、ActionBar） |
| `rounded-full` | 圆形（连接 handle 背景） |

---

## 五、阴影系统

| 场景 | 值 |
|------|----|
| 节点卡片（默认） | `0 4px 20px 0 rgba(0,0,0,0.05)` |
| 节点卡片（hover） | `0 8px 28px rgba(0,0,0,0.1)` |
| 节点卡片（选中） | `0 8px 28px rgba(0,0,0,0.1), 0 0 0 4px rgba(238,77,45,0.2)` |
| 弹窗 / popup | `0 4px 12px 0 rgba(0,0,0,0.12)` |
| ActionBar | `0 0 16px 0 rgba(0,0,0,0.1), 0 8px 16px 0 rgba(0,0,0,0.04)` |
| 侧边 Drawer | `0 8px 30px rgba(0,0,0,0.04)` |
| 按钮内嵌 | `inset 0 1px 0 0 rgba(0,0,0,0.09)` |
| 连接 handle 光晕 | `drop-shadow: 0 0 6px rgba(107,114,128,0.55)` |

---

## 六、Hover 样式规范

| 场景 | Tailwind 类 |
|------|-------------|
| 列表行 / 面板行 | `hover:bg-gray-100 transition-colors group` + `group-hover:text-gray-900` |
| 菜单项（浅色） | `hover:bg-[#F5F5F5] transition-colors` |
| 节点卡片（未选中） | `hover:border-2 hover:border-gray-300 hover:shadow-[0_8px_24px_0_rgba(0,0,0,0.08)]` |
| 节点卡片（选中） | `border-2 border-[#EE4D2D] ring-1 ring-[#EE4D2D] shadow-[0_8px_24px_0_rgba(0,0,0,0.08)]` |
| 主色填充按钮 | `hover:bg-[#d63f20] transition-colors` |
| 描边按钮（cancel） | `hover:border-[#ee4d2d] transition-colors` |
| 图标按钮 | `hover:bg-gray-100 transition-colors` 或 `hover:opacity-60 transition-opacity` |
| 徽章 / badge | `hover:opacity-80 active:scale-95 transition-all` |
| 弹出选项卡片 | `hover:border-[#1890ff] hover:bg-[#f0f7ff] transition-colors` |
| 连接点 handle | `group-hover:scale-[2] group-hover:drop-shadow-[0_0_6px_rgba(107,114,128,0.55)]` |
| 非激活交互选项 | `hover:bg-gray-50`（激活态用 `bg-[#fff5f0]`） |
| 边（Edge） | stroke: `#D9D9D9` → `#EE4D2D` + halo opacity 0 → 0.15 |

> 所有颜色/边框变化加 `transition-colors`；scale/opacity 类加 `transition-all`。

---

## 七、组件规范

### 7.1 节点卡片（BaseNode）

```
w-[260px], rounded-[8px], bg-white
shadow: 0 4px 20px 0 rgba(0,0,0,0.05)

未选中 hover:
  border-2 border-gray-300
  shadow: 0 8px 24px 0 rgba(0,0,0,0.08)

选中:
  border-2 border-[#EE4D2D]
  ring-1 ring-[#EE4D2D]
  shadow: 0 8px 24px 0 rgba(0,0,0,0.08)
```

**NodeHeader**：`px-3 py-2 border-b border-gray-100 rounded-t-[8px]` + icon + 标题（`text-[14px] font-medium`）

**NodeBody**：`px-[8px] py-[8px] text-[12px]`

**NodeField（行）**：`py-2 px-3 bg-gray-50 hover:bg-gray-100 rounded-md mb-2 transition-colors group`
- 右侧连接 handle 偏移 `right-[-8px]`，`translate-x-1/2`

### 7.2 侧边面板（NodePanel）

```
flex flex-col, h-full, overflow-auto
shadow: 0 8px 30px rgba(0,0,0,0.04)
border-l border-[#e8e8e8]

NodeTitle: h-[86px] px-[16px] bg-[#fafafa] border-b border-[#d9d9d9]
内容区: flex-1 min-h-0 overflow-y-auto pb-[72px]
Footer: absolute bottom-0, p-[16px], border-t border-[#f5f5f5]
  Cancel: border border-[#d9d9d9], hover:border-[#ee4d2d]
  Save:   bg-[#ee4d2d] text-white, hover:bg-[#d63f20]
```

### 7.3 ActionBar（底部工具栏）

```
bg-white rounded-[8px] border border-[#e8e8e8]
shadow: 0 0 16px 0 rgba(0,0,0,0.1), 0 8px 16px 0 rgba(0,0,0,0.04)
p-[8px] flex gap-[4px]

AddNode 按钮: bg-[#ee4d2d] text-white rounded-[6px] px-[12px] py-[6px]
  hover: bg-[#d63f20]
分隔线: h-[16px] w-px bg-[#e8e8e8] mx-[4px]
图标按钮: size-[32px] rounded-[6px] hover:bg-gray-100
```

### 7.4 AddNode 弹窗

```
w-[252px] rounded-[8px] bg-white
shadow: 0 4px 12px 0 rgba(0,0,0,0.12)
p-[16px], gap-[24px]（分组间距）

分类标题: text-[16px] font-medium
选项行: border border-[#e8e8e8] rounded-[6px] p-[8px]
  hover: border-[#1890ff] bg-[#f0f7ff]
icon 容器: 24×24px, rounded-[4px]
```

### 7.5 TopBar

```
bg-white border-b border-[#e8e8e8] h-auto z-10
左侧: 返回按钮 + 标题（font-medium）+ 版本标签
中间: SearchBar w-[250px] h-[32px]
右侧: Test & Preview（描边） + Publish（填充 #ee4d2d）
```

---

## 八、布局规范

### 全页布局

```
┌────────────────────────────────────────────┐
│ TopBar（bg-white, border-b）               │
├────────────────────────────────────────────┤
│                                            │ ◀─ Drawer
│   ReactFlow Canvas（flex-1, bg-dot）       │   w: 260~720px
│                                            │   z-50
│   ActionBar（Panel, bottom-center, mb-8）  │   border-l
└────────────────────────────────────────────┘
```

### 侧边 Drawer 动画

```
type: spring, damping: 25, stiffness: 200
resize 手柄: w-[11px], cursor-col-resize, bg-[#f0f0f0]
```

### 高度公式

```
画布高度 = calc(100vh - topbar高度)
面板内容高 = flex-1 min-h-0（减去 Header + Footer）
```

---

## 九、Z-Index 层级

| 层级 | 值 | 元素 |
|------|----|------|
| 基础 | `z-10` | TopBar |
| 表单 | `z-20` | Footer 按钮 |
| 连接点 | `z-25` | Connection Handle |
| 浮层 | `z-50` | Drawer、ActionsBar |
| 菜单打开 | `z-60` | 节点菜单展开状态 |
| 最顶 | `z-80` | FoldedBadge |

---

## 十、动画规范

| 类型 | 值 |
|------|----|
| 颜色过渡 | `transition-colors`（所有 bg/border/text 变化） |
| 全属性 | `transition-all`（scale、opacity、drop-shadow） |
| 快速 | `duration-150` |
| Drawer 弹簧 | `spring(damping:25, stiffness:200)` |
| Edge stroke | `transition: stroke 0.2s` |
| Handle 光晕 | `stroke-opacity 0.2s` |

---

## 十一、命名规范

```
组件目录    PascalCase      NodePanel/ FlowCanvas/
页面目录    camelCase       knowledgeBase/
CSS 类名    kebab-case      .node-panel__title
事件处理    handle 前缀     handleEdgeClick / handleFold
布尔状态    is/has/show     isMenuOpen / isFolded / hasError
Hook        use 前缀        useUrlState / useReactFlow
工具函数    动词开头        getDescendants / parseSearchParams
全局常量    UPPER_SNAKE     NODE_CATEGORIES
```
