---
name: shopee-chatbot-design-spec
description: 当用户询问关于 Shopee Chatbot 流程配置平台的任何开发问题时使用此 Skill，包括：组件用法与 Props、页面布局模式、MobX Store 写法、Formily 表单规范、API 调用方式、命名约定、设计 Token 取值、CSS 变量使用。凡涉及该项目的代码实现、组件选型、样式规范，均优先基于此规范回答。
---

# Shopee Chatbot 流程配置平台 · 设计与开发规范

## 核心约定（每次都要遵守）

1. **Token 双来源**：颜色/间距同时存在于 `src/styles/variables.scss` 和 `src/utils/color.ts`，两者保持同步，优先用 SCSS 变量写样式，TS 枚举用于逻辑层。
2. **组件目录 PascalCase，页面目录 camelCase**，组件入口统一 `index.tsx`。
3. **Store action 命名**：setter 用 `upt` 前缀，异步拉取用 `get` 前缀，所有 Store 必须调用 `makeAutoObservable(this)`。
4. **API 调用**：组件内用 `useApi()` Hook，Store/事件处理用命令式 `await API.xxx()`，请求头（bot-id / shopee-region / tenant-id）由拦截器自动注入，无需手动传。
5. **Formily 联动**：推荐用对象形式的 `x-reactions`（含 `dependencies` + `fulfill`），复杂逻辑用函数形式。
6. **布局高度公式**：`calc(100vh - 56px - 56px - 48px)` = Header + PageHeader + Padding。
7. **Modal 上边距固定 120px**，不随内容变化。
8. **禁止在 Store 外直接操作 observable**，必须通过 action 方法修改。

---

## 技术栈速查

| 层级 | 技术 |
|------|------|
| 框架 | React 17 + TypeScript 4.6 + qiankun 微前端 |
| UI | Ant Design 4.16 + @shopee/chatbot-ui |
| 状态 | MobX 6（makeAutoObservable）|
| 表单 | Formily 2（Schema 驱动）|
| 流程图 | @antv/x6 |
| 请求 | axios + rapper（类型安全）|
| 工具 | ahooks / lodash / dayjs |

---

## 设计 Token 速查

### 主要颜色

```scss
$primary-color: #ee4d2d        // 主色（Shopee 橙红）
$link-color: #2673DD           // 链接蓝
$error-color: #ff4742          // 错误红
$text-color: rgba(0,0,0,0.85)  // 主文字
$text-color-secondary: rgba(0,0,0,0.65)
$text-color-disabled: rgba(0,0,0,0.25)
$background-color: #f7f7f7     // 页面背景
$border-color: #e8e8e8         // 边框
```

### 间距

```scss
$spacing-xs: 8px   $spacing-sm: 12px
$spacing-md: 16px  $spacing-lg: 24px  $spacing-xl: 32px
```

### 布局尺寸

```scss
$nav-header-height: 56px    $sidebar-width: 280px
$page-header-height: 56px   $sidebar-width-small: 240px
$modal-top-margin: 120px    border-radius: 8px
```

---

## 组件速查表

| 组件 | 用途 | 关键 Props |
|------|------|-----------|
| `PageLayout` | 页面标准布局容器 | `pageTitle`(✓) `actionButton` `children` |
| `PageWrapper` | 路由权限包装器 | `routeConfig`(✓) `children`(✓) |
| `CategoryTree` | 分类树导航 | `dataSource` `onSelect` `hasEditorAuth` `maxLevel` |
| `SmartTooltip` | 溢出自动 Tooltip | `children`(✓) `title`(✓) |
| `SmartTagsGroup` | 标签组 | `tags`(✓) `tagProps` `spaceProps` |
| `ResizableDrawer` | 可拖拽宽度 Drawer | 同 antd Drawer |
| `ScrollableModal` | 内容可滚动 Modal | 同 antd Modal |
| `AddIconBtn` | 带加号图标按钮 | — |
| `IconTextButton` | 图标+文字按钮 | — |

---

## 常见模式代码片段

### Store 标准写法

```typescript
import { makeAutoObservable } from 'mobx'

class ExampleStore {
  isLoading = false
  data: SomeType | null = null

  constructor() { makeAutoObservable(this) }

  uptIsLoading = (val: boolean) => { this.isLoading = val }

  getData = async (id: string) => {
    this.uptIsLoading(true)
    const res = await API.getDetail({ id })
    this.data = res.data
    this.uptIsLoading(false)
  }

  reset = () => { this.data = null }
}
```

### Formily Schema 模板

```typescript
const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      title: '名称',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-validator': [{ required: true, message: '请输入名称' }],
    },
    type: {
      type: 'string',
      title: '类型',
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-reactions': {
        dependencies: ['name'],
        fulfill: { state: { visible: '{{$deps[0] !== ""}}' } }
      }
    }
  }
}
```

### API 调用模板

```typescript
// 组件内（Hook 方式）
const { data, run, loading } = useApi(API.getList)
useEffect(() => { run({ page: 1 }) }, [])

// Store 内（命令式）
const res = await API.submitForm(data, {
  muteErrorMsg: false,    // 显示错误提示
  useDeduplication: true  // 防重复提交
})
```

### 路由参数获取（推荐方式）

```typescript
// 推荐：状态同步，支持双向绑定
const [state, setState] = useUrlState({ page: 1, pageSize: 20 })
```

---

## 页面布局模式

- **A 列表管理页**：左侧 CategoryTree + 右侧 Table（知识库、模板管理）
- **B 编辑页**：PageLayout 全屏 + 顶部操作按钮（流程编辑器）
- **C 配置管理页**：Formily 表单 + 配置列表（API 管理、变量配置）
- **D 流程编辑器页**：@antv/x6 画布全屏 + 右侧属性面板

---

## Hover 样式规范（Flow Canvas 项目）

| 场景 | Tailwind 类 |
|------|-------------|
| 列表行 / 面板行 | `hover:bg-gray-100 transition-colors group` + `group-hover:text-gray-900` |
| 菜单项（浅色） | `hover:bg-[#F5F5F5] transition-colors` |
| 节点卡片（未选中） | `hover:border-2 hover:border-gray-300 hover:shadow-[0_8px_24px_0_rgba(0,0,0,0.08)]` |
| 节点卡片（选中） | `border-2 border-[#EE4D2D] ring-1 ring-[#EE4D2D] shadow-[0_8px_24px_0_rgba(0,0,0,0.08)]` |
| 主色填充按钮 | `hover:bg-[#d63f20] transition-colors`（primary 加深） |
| 描边按钮（cancel）| `hover:border-[#ee4d2d] transition-colors` |
| 图标按钮 | `hover:bg-gray-100 transition-colors` 或 `hover:opacity-60 transition-opacity` |
| 徽章 / badge | `hover:opacity-80 active:scale-95 transition-all` |
| 弹出选项卡片 | `hover:border-[#1890ff] hover:bg-[#f0f7ff] transition-colors` |
| 连接点 handle | `group-hover:scale-[2] group-hover:drop-shadow-[0_0_6px_rgba(107,114,128,0.55)]` |
| 非激活交互选项 | `hover:bg-gray-50`（激活态用 `bg-[#fff5f0]`） |

> 所有 hover 动画默认加 `transition-colors`；scale/opacity 类动画加 `transition-all`。

---

## 命名规范速查

```
组件目录    PascalCase     SmartTooltip/
页面目录    camelCase      knowledgeBase/
CSS 类名    kebab-case     .page-header__title
SCSS 变量   kebab-case     $primary-color
Hook        use前缀        useUrlState
工具函数    动词开头       parseURLSearchParams
事件处理    handle前缀     handleSubmit
布尔变量    is/has/show    isLoading · hasAuth
Store action upt前缀       uptIsLoading
全局常量    UPPER_SNAKE    SIDEBAR.WIDTH
```
