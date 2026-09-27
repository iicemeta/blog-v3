# MDC 语法

## Status

- Author-facing: yes
- Source: `@nuxtjs/mdc`（解析器，见 `patches/@nuxtjs__mdc.patch`）+ `nuxt.config.ts`（`content.build.markdown`）
- Source verified: yes
- Usage verified: yes（`content/previews/example.md`、`content/**`）

## Purpose

blog-v3 的文章是**普通 Markdown + MDC 扩展**。MDC 让你在 Markdown 里直接写 Vue 组件。本文件只讲语法机制，组件属性请查对应 reference。

## Syntax

### 1. 块组件（`::`）

```mdc
::alert{type="warning"}
这里可以写 **Markdown**。

- 列表
- 也可以嵌套其它块组件
::
```

### 2. 行内组件（`:`）

```mdc
:badge[带个图]{img="https://picsum.photos/100/100"}
```

`[文本]` 是默认插槽的简写，等价于块组件的默认插槽内容。

### 3. 容器形式（`:::`）

当**块组件内部还要再放块组件**、或内层需要用 `#slot` 语法时，用三个冒号：

```mdc
:::meta-aside-bar
::link-card
---
title: 标题
link: https://example.com
---
::
:::
```

`:::` 开始，`:::` 结束。项目内 `content/previews/example.md` 中 `:::tab`、`:::quote`、`:::meta-aside-bar` 均为该用法。

### 4. 属性（三种）

| 写法 | 结果 |
| --- | --- |
| `{card}` | 布尔 `true`（`card: true`） |
| `{type="warning"}` | 字符串 `"warning"` |
| `{:tabs='["组件","语法"]'}` | Vue 表达式：数组 / 对象 / 数字。**外层必须单引号**，内层用双引号 |

混写：`:copy{prompt="…" lang="js" code="…"}`。

### 5. YAML props（复杂 / 多行值）

块组件首行之后紧跟 `---` 包裹的 YAML，键名直接成为 props：

```mdc
::link-card
---
title: MDC 基本语法（必读）
icon: https://content.nuxt.com/favicon.ico
link: https://content.nuxt.com/docs/files/markdown
---
::
```

`#` 开头是 YAML 注释，可用于「注释掉某个属性」（`content/previews/example.md` 中的 `# mirror:`、`# zoom: false`）。

### 6. 具名插槽（`#name`）

```mdc
::alert{type="warning"}
#title
卡片风格标题

#default
默认插槽内容
::
```

- 必须在插槽块之前留**空行**。
- 组件有哪些插槽，以对应 `.vue` 为准。

### 7. 行内元素的属性块

不是组件专属，任何 Markdown 行内元素后面都可以挂 `{.class #id key="val"}`：

```md
[故事感。]{.text-story}
![图标](https://example.com/i.png){.icon}
[就像这样——]{.example-info #just-like-this style="color: #00bb66"}
```

## Special syntax

| 项 | 行为 | 证据 |
| --- | --- | --- |
| 组件自动注册 | `app/components/content/*.vue` 无需 import，MDC 名 = 文件名 kebab-case（`LinkCard.vue` → `::link-card`） | `nuxt.config.ts` 的 `components` 配置 + 实际使用 |
| 全局组件 | `BlogHeader.global.vue` 同样可直接 `:blog-header` | 文件名后缀 `.global.vue` |
| 围栏 → 组件 | 某些代码块语言会被替换成组件，见 `mermaid.md`、`music-score.md`、`math.md` | `remark-plugins/remark-code-component.ts` |
| `meta-` 前缀 | 顶层 `::meta-xxx` 元素会被抽成文章插槽，见 `meta-slots.md` | `remark-plugins/rehype-meta-slots.ts` |
| HTML | 支持内联 HTML 与注释（`rehype-raw`），`content/link.md`、`content/previews/example.md` 中有 `<!-- -->` | `@nuxtjs/mdc` 默认管线 |

## Common mistakes

1. **数组属性写成 `{tabs=["a","b"]}`** → 解析失败。正确：`{:tabs='["a","b"]'}`。
2. **布尔属性写成 `{open=true}`** → 不是布尔真值。正确：`{open}`。
3. **插槽 `#title` 前没有空行** → 会被当成普通正文。
4. **嵌套块组件不缩进** → 外层认不出归属。参照 `content/previews/example.md` 的 `::folding` 示例，整体缩进 2 空格。
5. **代码块里嵌代码块不用更多反引号** → 提前闭合。外层用 ```` ```` ````。
6. **块组件开闭不匹配**：`::x` 用 `::` 收，`:::x` 用 `:::` 收。

## Related references

- `markdown-extensions.md`、`article-frontmatter.md`、`meta-slots.md`、`index.md`
