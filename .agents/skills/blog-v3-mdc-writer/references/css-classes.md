# 作者可用的 CSS 工具类

## Status

- Author-facing: yes（通过 `{.类名}` 挂到 Markdown 元素上）
- Source: `app/assets/css/reusable.scss`、`app/assets/css/article.scss`、`app/assets/css/main.scss`、`app/assets/css/_variable.scss`
- Source verified: yes
- Usage verified: yes（`.text-story`、`.text-repeat`、`.text-zoom`、`.title-like`、`.icon`、`.gradient-card`、`.active`、`.card`、`.text-center`、`.round-cobblestone`、`.text-creative`）

## Purpose

在 Markdown 里用 `[文字]{.类名}` / `![图](url){.类名}` 挂样式，避免为了一点视觉效果去写组件。

## Supported values

### 排版 / 字体

| 类名 | 效果 | 定义 |
| --- | --- | --- |
| `.text-story` | 衬线体（`--font-serif`） | `reusable.scss` |
| `.text-creative` / `.text-tech` | 创意粗体（`--font-creative`，抖音美好体） | `reusable.scss` |
| `.title-like` | 继承标题字号/字重（`article.scss` 中 `.title-like` 与 h1～h6 同规则；仅 `md-story` 版式下有居中衬线样式） | `article.scss` |
| `.text-center` | 居中 | `reusable.scss` |

### 视觉效果

| 类名 | 效果 | 定义 |
| --- | --- | --- |
| `.text-repeat` | 阴影回声（`text-shadow` 叠 5 层） | `reusable.scss` |
| `.text-zoom` | 滚动进入视口时 `scale(0.8) → 1.25` | `reusable.scss` |
| `.round-cobblestone` | `corner-shape: superellipse(1.2)` 圆润方形 | `reusable.scss` |

### 容器 / 卡片

| 类名 | 效果 | 定义 |
| --- | --- | --- |
| `.card` | 卡片底色 + 阴影 + 圆角 | `reusable.scss` |
| `.card.upraise` | 悬停上浮并加深阴影 | `reusable.scss` |
| `.gradient-card` | 悬停/聚焦/`.active` 时显示渐变描边 | `reusable.scss` |
| `.gradient-card.active` | 常驻渐变描边（示例页链接卡片用法） | `reusable.scss` |
| `.proper-height` | `min-height: 70vh` | `reusable.scss` |

### 图片

| 类名 | 效果 | 定义 |
| --- | --- | --- |
| `.icon` | 图片缩到 `1.4em` 并与文字基线对齐（行内图标） | `article.scss` |
| `.image` | 强制块级居中、圆角（与无 class 的默认图片一致） | `article.scss` |

### 滚动

| 类名 | 效果 | 定义 |
| --- | --- | --- |
| `.scrollcheck-x` | 横向滚动 + 两端羽化遮罩 + 细滚动条 | `reusable.scss` |
| `.scrollcheck-y` | 纵向同款效果 | `reusable.scss` |
| `.scrollbar-hidden` | 隐藏滚动条 | `reusable.scss` |

### 断点辅助

`_variable.scss` 定义断点：`phone: 528px`、`mobile: 768px`、`widescreen: 1080px`。`reusable.scss` 按断点生成：

- `.<name>-only`：宽于该断点时**隐藏**
- `.<name>-hidden`：窄于等于该断点时**隐藏**

即 `.phone-only` / `.mobile-hidden` / `.widescreen-only` 等（12 个组合）。

## Minimal example

```md
[故事感。]{.text-story}

[阴 影 回 声]{.text-repeat}

滚动，然后悄悄[变大变高]{.text-zoom}，惊艳所有人。

带 `icon` 类名的图片：![图片](https://picsum.photos/100/100){.icon}
```

## Complete example

```md
::link-card
---
title: MDC 基本语法（必读）
icon: https://content.nuxt.com/favicon.ico
link: https://content.nuxt.com/docs/files/markdown
class: gradient-card active
---
::

[只在 `type: story` 时🀄]{.title-like}
```

## Special syntax

- 类名与 id、内联样式可同时书写：`[文字]{.example-info #just-like-this style="color: #00bb66"}`。
- 组件属性块里的 `class` 会透传到组件根元素（`LinkCard` 等单根组件），示例见上。

## Common mistakes

1. `.title-like` 只在 `type: story` 的文章里呈现特殊样式，`tech` 文章里几乎看不出变化。
2. `.text-zoom` 依赖 `animation-timeline: view()`，浏览器不支持时**完全没有效果**（源码用 `@supports` 兜底）。
3. 给 `<p>` 挂 `.card` 之类块级样式未必生效——`article.scss` 对段落有 `text-indent` / 外边距规则，优先挂在行内元素或组件上。
4. 不要自定义新的工具类并期待它生效：文章内容不打包 CSS，能用的只有上述已定义的类。

## Related references

- `markdown-extensions.md`、`article-frontmatter.md`、`link-card.md`
