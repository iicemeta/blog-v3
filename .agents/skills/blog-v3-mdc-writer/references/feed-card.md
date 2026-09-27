# FeedCard

## Status

- Author-facing: yes
- Source: `app/components/content/FeedCard.vue`、`app/types/feed.ts`（`FeedEntry`）
- Source verified: yes
- Usage verified: no（`content/**` 中未用 MDC 调用；`app/pages/link.vue` 与 `app/feeds.ts` 在用）→ `source-confirmed / usage-not-found`

## Purpose

单个友链卡片：头像 + 作者名 + 站名，悬停弹出站点详情气泡。友链页由 `FeedGroup` 批量渲染，`content/` 里一般不需要手写。

## Syntax

```mdc
::feed-card
---
author: 纸鹿本鹿
sitenick: 摸鱼处
title: 纸鹿摸鱼处
desc: 纸鹿至麓不知路，支炉制露不止漉
link: https://blog.zhilu.site/
feed: https://blog.zhilu.site/atom.xml
icon: https://www.zhilu.site/api/icon.png
avatar: https://www.zhilu.site/api/avatar.png
archs: [Nuxt, Vercel]
date: 2019-07-19
comment: 这是我自己
---
::
```

## Props

组件的 props 类型即 `FeedEntry`（`app/types/feed.ts`）：

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `author` | `string` | — | **必填**。作者自称 |
| `link` | `string` | — | **必填**。博客地址 |
| `icon` | `string` | — | **必填**。站点小图标 |
| `avatar` | `string` | — | **必填**。个人头像 |
| `date` | `string` | — | **必填**。申请/收录日期，气泡中大号显示 |
| `sitenick` | `string` | — | 作者名后缀短站名 |
| `title` | `string` | `title ?? sitenick ?? author` | 站点完整标题 |
| `desc` | `string` | — | 简介，显示在气泡中 |
| `feed` | `string` | — | 订阅源；为空时展示「无订阅源」静音图标 |
| `archs` | `Arch[]` | — | 技术架构，取值见 `shared/utils/icon.ts` 的 `archIcons` |
| `comment` | `string` | — | 博主备注 |
| `error` | `string` | — | 错误信息；有值时卡片变灰且不可点击 |

`Arch` 可取：`Nuxt`、`Vercel`、`Astro`、`Next.js`、`Hexo`、`Hugo`、`WordPress`、`Typecho`、`Halo`、`Ghost`、`GitHub Pages`、`Netlify`、`Cloudflare`、`VitePress`、`Vue`、`VuePress`、`React`、`Deno Deploy`、`Express`、`Fly`、`Framer`、`Golang`、`HTML`、`Jekyll`、`Material for MkDocs`、`Notion`、`NotionNext`、`PHP`、`Python`、`EdgeOne`、`Zeabur`、`Gridea`、`Valaxy`、`国内 CDN`、`服务器`、`虚拟主机` 等（未收录会渲染空图标）。

## Slots

无。

## Special syntax

- 悬停气泡（`Tooltip`）里展示大头像、站点标题、域名 + 域名图标、架构图标、日期、`desc`、`comment`。
- `appConfig.link.remindNoFeed`（默认 `true`）为真且无 `feed` 时，头像角上出现静音铃铛。
- **`app/feeds.ts` 是友链数据的来源**；改友链一般改那里，而不是在 Markdown 里写卡片。
- 开发模式下加 `?inspect` 查询参数，头像与图标会显示来源边框（便于排查图标代理问题）。

## Minimal example

```mdc
::feed-card
---
author: 纸鹿本鹿
sitenick: 摸鱼处
link: https://blog.zhilu.site/
icon: https://www.zhilu.site/api/icon.png
avatar: https://www.zhilu.site/api/avatar.png
date: 2019-07-19
---
::
```

## Common mistakes

1. 漏掉 `author` / `link` / `icon` / `avatar` / `date` 中任一项 —— 类型上是必填，气泡会显示空值。
2. 在文章正文里堆友链卡片 —— 友链页应当放在 `content/link.md` 与 `app/feeds.ts` 体系里。
3. `archs` 写了未收录的架构名 —— 不报错，但图标为空白。
4. 以为 `date` 可以省略 —— 气泡里会 `Temporal.PlainDate.from(undefined)` 报错。

## Related references

- `feed-group.md`、`article-frontmatter.md`
