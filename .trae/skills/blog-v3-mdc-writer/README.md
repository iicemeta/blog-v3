# Blog V3 MDC 写作助手

专为 blog-v3 博客项目设计的 Trae 智能体，帮助你轻松使用 MDC 语法编写博客文章。

## 功能特性

- **完整的组件语法支持**: 涵盖 Alert、Tab、Badge、Folding、Chat 等所有自定义组件
- **智能语法提示**: 自动识别 MDC 语法需求，提供准确的代码示例
- **常见错误预防**: 提醒插槽缩进、属性格式等易错点
- **写作建议**: 口语化表达、组件使用建议

## 安装方法

### 方法一：直接复制（推荐）

1. 复制 `blog-v3-mdc-writer` 文件夹到 Trae 的技能目录：
   - Windows: `%USERPROFILE%\.trae-cn\skills\`
   - macOS/Linux: `~/.trae/skills/`

2. 重启 Trae，智能体即可生效

### 方法二：手动创建

1. 在 Trae 技能目录创建 `blog-v3-mdc-writer` 文件夹
2. 将 `SKILL.md` 和 `references/mdc-components.md` 复制到对应位置

## 使用方法

安装完成后，在编写博客文章时，Trae 会自动识别 MDC 相关需求并提供帮助。

### 触发场景

- "帮我写一个带标签页的文章"
- "怎么使用 Alert 组件？"
- "把这个改成折叠面板"
- "我想添加一个链接卡片"
- "MDC 语法怎么写？"

### 示例对话

**你**: 帮我创建一个带标签页的代码示例

**AI**: 我来帮你创建 Tab 组件。根据你的需求，可以使用以下语法：

```mdc
::tab{:tabs='["效果","代码"]'}
#tab1
这里是效果展示区域

#tab2
```vue
<template>
  <div>代码示例</div>
</template>
```
::
```

注意事项：
1. `tabs` 属性是数组格式，需要用单引号包裹
2. 每个标签页用 `#tab1`、`#tab2` 等标识
3. 标签页内容之间需要空行分隔

## 包含的组件

### 布局类
- **Tab** - 标签页切换
- **Folding** - 折叠面板
- **Alert** - 提示/警告框

### 交互类
- **Chat** - 聊天对话
- **Copy** - 可复制代码块
- **Key** - 键盘按键

### 展示类
- **Badge** - 徽章/标签
- **LinkCard** - 链接卡片
- **CardList** - 卡片列表
- **Quote** - 引用块
- **Timeline** - 时间线

### 特殊效果
- **Blur** - 模糊文本
- **EmojiClock** - 表情时钟
- **MusicScore** - 乐谱渲染

### 增强语法
- 特殊 CSS 类 (`.text-story`, `.text-repeat`, `.text-zoom`)
- 代码块 Meta 标记 (`wrap`, `expand`, `icon=`)
- 数学公式支持

## 文件结构

```
blog-v3-mdc-writer/
├── SKILL.md                    # 智能体主文件
├── README.md                   # 使用说明
└── references/
    └── mdc-components.md       # 完整组件文档
```

## 更新日志

### v1.0.0
- 初始版本
- 支持所有 blog-v3 自定义 MDC 组件
- 包含完整语法参考和示例

## 相关链接

- [Nuxt Content MDC 文档](https://content.nuxt.com/docs/files/markdown#mdc-syntax)
- [Iconify 图标搜索](https://yesicon.app/)
- [blog-v3 项目](https://github.com/L33Z22L11/blog-v3)

## 许可证

与 blog-v3 项目保持一致
