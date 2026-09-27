# BlogHeader

## Status

- Author-facing: yes（技术上可用，正文里极少使用）
- Source: `app/components/blog/BlogHeader.global.vue`
- Source verified: yes
- Usage verified: yes（`content/previews/example.md`）

## Purpose

站点 Logo + 标题 + 副标题的页头。因为文件名带 `.global.vue`，在 Markdown 里可以直接以 `:blog-header` 调用。

## Syntax

```mdc
:blog-header
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `tag` | `string` | `'div'` | 标题使用的标签，如 `h1` |

### 透传属性

组件根是 `UtilLink`，未声明 `inheritAttrs: false`，所以额外属性会落到 `UtilLink` 上：

- `to`：会被 `UtilLink` 当作 prop 接收，把页头变成链接（`app/pages/link.vue` 中 `<BlogHeader to="/" tag="h1" suffix="友链" />`）。
- 其它未知属性（如 `suffix`）会原样渲染到根元素上，**没有视觉效果** —— 源码中没有 `suffix` 相关逻辑。
- Markdown 中用 `:blog-header{to="/"}` 属于可行但未验证的写法；正文里建议直接不传属性。

## Slots

无。

## Content used inside

无插槽、无内容体。以下内容来自 `app.config.ts`：

| 配置 | 作用 |
| --- | --- |
| `header.logo` | Logo 图片（默认 `/images/avatar.webp`） |
| `header.showTitle` | 是否显示标题文本（否则只显示纯 Logo） |
| `header.subtitle` | 副标题 |
| `header.emojiTail` | 悬浮时飘动的 Emoji 序列 |
| `title` | 站点标题（逐字动画） |

## Minimal example

```mdc
:blog-header
```

## Common mistakes

1. 以为它能改标题文字 —— 文字来自 `app.config.ts`，正文无法覆盖。
2. 在文章中间随意插入 —— 它是块级页头（带上下外边距、`contain: layout`），会打断正文结构。
3. 指望 `suffix` / `subtitle` 之类的属性生效 —— 源码里没有这些 prop。

## Related references

- `article-frontmatter.md`、`index.md`（组件分类说明）
