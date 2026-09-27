# 文章 Front matter

## Status

- Author-facing: yes
- Source: `content.config.ts`（zod schema）、`app/pages/[...slug].vue`（`aside` 用法）、`blog.config.ts`、`nuxt.config.ts`（`hooks['content:file:afterParse']`）
- Source verified: yes
- Usage verified: yes（`content/posts/2026/*.md`、`content/previews/example.md`）

## Purpose

文章头部的 `---` YAML 块决定标题、时间、分类、封面、版式与侧栏组件。它由 zod schema 校验，字段名写错不会被接受。

## Syntax

```md
---
title: 【Node.js】安装教程
description: 一句话摘要，用于列表页与 SEO。
date: 2026-09-14 20:22:00
updated: 2026-09-14 20:22:00
image: https://example.com/cover.png
categories: [技术]
tags: [Node.js, 教程]
---
```

## Fields

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | — | 文章标题 |
| `description` | `string` | — | 摘要；也作为首页摘要动画文本 |
| `date` | `string` | — | 创建时间，`YYYY-MM-DD HH:mm:ss` |
| `updated` | `string` | — | 更新时间 |
| `published` | `string` | — | 发布相关时间；sitemap `lastmod` 依次取 `updated`→`published`→`date` |
| `categories` | `string[]` | `["未分类"]` | 取第一个分类用于列表页图标与颜色 |
| `tags` | `string[]` | `[]` | 标签 |
| `type` | `"tech" \| "story"` | `tech` | 文章版式。见下 |
| `image` | `string` | — | 封面图（列表卡片、OG image）。推荐 2:1 |
| `recommend` | `number` | — | 推荐权重 |
| `references` | `{ title?: string, link?: string }[]` | — | 文末「参考链接」列表 |
| `draft` | `boolean` | `false` | 草稿标记（schema 中存在，注释标记为 TODO） |
| `permalink` | `string` | — | 自定义链接，覆盖文件路由 |
| `aside` | `string[]` | `["toc"]` | 侧栏 widget 列表，**未写入 schema**，由页面读取 `post.meta.aside` |
| `readingTime` | `{ text, minutes, time, words }` | 自动生成 | 由 `remark-reading-time` 注入，不要手写 |

`categories` 的预置值来自 `blog.config.ts` 的 `article.categories`：`未分类`、`技术`、`开发`、`安全`、`杂谈`、`生活`（含图标与颜色）。填其它字符串合法，但会缺少图标/颜色。

## Supported values

### `type`（文章版式）

- `tech`（默认）
- `story`

`type` 会成为渲染容器上的 `md-tech` / `md-story` 类（`app/pages/[...slug].vue` 的 `getPostTypeClassName`），进而切换标题字体、段落缩进、`.title-like` 是否生效等（`app/assets/css/article.scss`）。

> 新建文章脚本还会提示 `自定义` 类型，但 schema 用 `z.enum(Object.keys(blogConfig.article.types))` 校验，即**只有 `tech` / `story` 通过校验**；新增类型需先在 `blog.config.ts` 的 `article.types` 中声明。

### `aside`（侧栏 widget）

可取值（`app/composables/useWidgets.ts` 的 `WidgetName`）：

`toc`、`blog-log`、`blog-now`、`blog-stats`、`blog-tech`、`comm-group`、`empty`，以及 `meta-aside-<任意名>`。

```yaml
aside: [toc, meta-aside-foo]
```

- 缺省为 `["toc"]`；`meta-aside-*` 需要正文里有同名 `::meta-aside-foo` 块（见 `meta-slots.md`）。
- `empty` 渲染空 div，用于刻意隐藏侧栏。

## Minimal example

```md
---
title: 我的第一篇文章
date: 2026-09-27 10:00:00
---

## 开始
```

## Complete example

```md
---
title: 从零搭建个人博客
description: 记录一次完整的搭建过程。
date: 2026-09-27 10:00:00
updated: 2026-09-27 18:00:00
image: https://example.com/cover.png
categories: [技术]
tags: [Nuxt, 博客]
recommend: 3
type: story
aside: [toc, meta-aside-note]
references:
  - title: Nuxt Content 文档
    link: https://content.nuxt.com/
---
```

## Special syntax

- `permalink` 会覆盖 `content.path`（`nuxt.config.ts` 的 `content:file:afterParse` hook）。
- `blogConfig.article.hidePostPrefix === true`（本项目为 `true`）：基于文件路由的网址会隐藏 `/posts` 前缀，`content/posts/2026/a.md` → `/2026/a`。
- `robotsNotIndex: ['/preview', '/previews/*']`：`content/previews/**` 不会被搜索引擎收录，适合放组件样式示例。

## Common mistakes

1. 把 `readingTime` 手写进 front matter —— 它是自动注入的。
2. `category`（单数）→ 正确是 `categories`。
3. YAML 中 `date` 未加引号但格式不规范（应写 `YYYY-MM-DD HH:mm:ss`）。
4. `tags: [a, b]` 里带空格外的特殊字符不加引号。
5. `aside` 写成标量（`aside: toc`）——页面按数组处理（`useWidgets` 会 `.map`），必须写成 `aside: [toc]`。

## Related references

- `meta-slots.md`、`markdown-extensions.md`、`mdc-syntax.md`
