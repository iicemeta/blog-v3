# FeedGroup

## Status

- Author-facing: yes
- Source: `app/components/content/FeedGroup.vue`、`app/types/feed.ts`（`FeedGroup`）
- Source verified: yes
- Usage verified: no（`content/**` 中未用 MDC 调用；`app/pages/link.vue` 在用）→ `source-confirmed / usage-not-found`

## Purpose

友链分组：一个大标题 + 描述 + 卡片网格（`FeedCard` 列表），支持点击标题随机排序。

## Syntax

```mdc
::feed-group
---
name: Clarity
desc: 友情链接
entries:
  - author: 纸鹿本鹿
    link: https://blog.zhilu.site/
    icon: https://www.zhilu.site/api/icon.png
    avatar: https://www.zhilu.site/api/avatar.png
    date: 2019-07-19
---
::
```

## Props

`FeedGroup & { shuffle?: boolean }`：

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | `string` | — | **必填**。分组大标题 |
| `entries` | `FeedEntry[]` | — | **必填**。卡片数据，字段同 `FeedCard` |
| `desc` | `string` | — | 分组描述 |
| `shuffle` | `boolean` | — | 允许点击标题随机排序 |

## Slots

无。

## Special syntax

- `shuffle` 为真时，标题变成按钮：普通点击随机排序，按住修饰键点击恢复原序（源码 `@click` / `@click.exact`）。
- 若 URL 带 `?shuffle=false`，初始不随机（`onMounted` 中判断）。
- 卡片浮现动画的延迟由 `link` 字符串哈希决定（固定、不是随机）。
- **实际数据源是 `app/feeds.ts`**，`app/pages/link.vue` 用 `v-for` 渲染；Markdown 里通常不需要手写该组件。

## Minimal example

```mdc
::feed-group
---
name: 友情链接
entries: []
---
::
```

## Common mistakes

1. 期待 `::feed-card` / `::feed-group` 会自动读 `feeds.ts` —— 不会，必须显式传 `entries`。
2. 把 `entries` 写在 YAML 里却用 Tab 缩进 —— YAML 不允许 Tab。
3. 在分组里写正文内容 —— 组件没有默认插槽，块内容无处安放。

## Related references

- `feed-card.md`、`meta-slots.md`
