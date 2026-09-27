# Poetry

## Status

- Author-facing: yes
- Source: `app/components/content/Poetry.vue`
- Source verified: yes
- Usage verified: yes（`content/previews/example.md`；正文中未使用）

## Purpose

居中排版的「诗」：标题 + 作者 + 正文 + 落款。正文保留换行，宽度自适应。

## Syntax

```mdc
::poetry
---
title: 诗有诗的标题
author: 一名作者
footer: 可选的落款
---
如你所见，
我,
是一首——
*诗*。
::
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | — | 标题（渲染为 `<h2>`） |
| `author` | `string` | — | 作者行 |
| `footer` | `string` | — | 落款行 |

## Slots

- 默认插槽（`#default`）：诗的正文

## Special syntax

- 外层 `white-space: pre-wrap`：**源码中的换行会保留**，不要为了排版刻意加空行。
- 正文里的 `<p>`（Markdown 段落）会被压成 `width: fit-content; margin: 0.5em auto` —— 每个段落独立居中。
- 样式会随文章 `type` 变化（`content/previews/example.md` 注明 `tech` 与 `story` 下样式不同）。
- 标题使用 `.text-center`，与文章标题风格正交。

## Minimal example

```mdc
::poetry
---
title: 无题
---
第一行
第二行
::
```

## Complete example

```mdc
::poetry
---
title: 诗有诗的标题
author: 一名作者
footer: 可选的落款
---
如你所见，
我,
是一首——
*诗*。
::
```

## Common mistakes

1. 在正文里用两个空格结尾做换行 —— 这里靠 `pre-wrap`，直接换行即可。
2. 期望 `title` 出现在目录里 —— 它不在 Markdown 标题树中，不进 TOC。
3. 写很长的诗句 —— 容器为 `fit-content`，长行会横向撑开或换行不美观。

## Related references

- `quote.md`、`article-frontmatter.md`（`type` 影响样式）
