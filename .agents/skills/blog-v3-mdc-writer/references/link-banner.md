# LinkBanner

## Status

- Author-facing: yes
- Source: `app/components/content/LinkBanner.vue`
- Source verified: yes
- Usage verified: yes（`content/previews/example.md`；正文中未使用）

## Purpose

带封面大图的横幅外链卡片，比 `LinkCard` 更醒目。适合在文首/文末推荐一篇文章或一个站点。

## Syntax

```mdc
::link-banner
---
banner: https://picsum.photos/480/240
title: 标题
description: 这是一行描述，如果不提供描述会展示域名
link: "#link-banner"
---
::
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | — | **必填**。卡片标题 |
| `link` | `string` | — | **必填**。跳转地址 |
| `banner` | `string` | — | 封面图；不写则只显示文字区 |
| `description` | `string` | `getDomain(link)` | 描述文字 |
| `mirror` | `ImgService` | — | 图片代理，见 `img-service.md` |

## Slots

无。

## Special syntax

- 封面图 `aspect-ratio: 2.4`，底部用 `mask-image` 渐变淡出，与文字区重叠（`margin-bottom: -5%`）。
- 根元素是 `UtilLink`：`link` 以 `#` 开头渲染为普通 `<a>`（页内锚点），外链自动 `target="_blank"`。
- 在 `article` 内最大宽度为 `$breakpoint-phone`（528px）并水平居中。
- 悬停提示显示 `title / description / link` 三行（`joinWith`）。
- 额外属性（如 `class: gradient-card active`）会透传到根元素。

## Minimal example

```mdc
::link-banner
---
title: 一篇文章
link: https://example.com/post
---
::
```

## Complete example

```mdc
::link-banner
---
banner: https://picsum.photos/480/240
title: 标题
description: 这是一行描述，如果不提供描述会展示域名
link: "#link-banner"
---
::
```

## Common mistakes

1. 忘记 `title` 或 `link` —— 两者必填，缺失会渲染空白卡片。
2. 期待 `banner` 缺失时也有占位图 —— 没有，只剩文字。
3. 想控制封面高度 —— 比例固定 2.4，无法通过 props 调整；需要其它比例请用 `::pic`。
4. 在需要小图标的地方用它 —— 小图标请用 `link-card.md` 或 `badge.md`。

## Related references

- `link-card.md`、`img-service.md`、`pic.md`
