# LinkCard

## Status

- Author-facing: yes
- Source: `app/components/content/LinkCard.vue`
- Source verified: yes
- Usage verified: yes（`content/posts/**`、`content/previews/example.md`）

## Purpose

小尺寸链接卡片：图标 + 标题 + 描述。文章里推荐外部资料的首选。

## Syntax

```mdc
::link-card
---
title: MDC 基本语法（必读）
icon: https://content.nuxt.com/favicon.ico
link: https://content.nuxt.com/docs/files/markdown
---
::
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `link` | `string` | — | **必填**。跳转地址 |
| `title` | `string` | — | **必填**。标题（最多显示两行） |
| `description` | `string` | `getDomain(link)` | 描述（单行省略号） |
| `icon` | `string` | — | 图标图片地址 |
| `mirror` | `ImgService` | — | 图片代理，见 `img-service.md` |

## Slots

- `icon`：自定义图标区（覆盖默认的 `<img>`；可以放 `<Icon>` 之类的元素）

## Special syntax

- 根元素是 `UtilLink`：`#` 开头渲染为页内 `<a>`，外链自动 `target="_blank"`。
- 在 `article` 内宽度 `20rem`、`max-width: 90%`、水平居中；卡片本体复用 `.card` 样式。
- 标题与描述分别为 2 行 / 1 行截断（`-webkit-line-clamp` / `text-overflow`）。
- 额外属性透传到根元素，例如示例页的 `class: gradient-card active`。

## Minimal example

```mdc
::link-card
---
title: 标题
link: https://example.com
---
::
```

## Complete example

```mdc
::link-card
---
title: MDC 基本语法（必读）
icon: https://content.nuxt.com/favicon.ico
link: https://content.nuxt.com/docs/files/markdown
class: gradient-card active
---
::

::link-card
---
title: 自定义图标插槽
link: "#link-card"
---
#icon
🌟
::
```

## Common mistakes

1. 写成 `::link-card{title="…" link="…"}` 一次性内联 —— 语法合法，但含 `:` 的 URL（如 `https://`）在属性里容易出问题，**推荐用 YAML 块**。
2. 用 `href` / `url` 而不是 `link`。
3. 想放长描述 —— 描述只有一行，超出被省略。
4. 想用 YAML 里的 `mirror:` 注释掉 —— 正确做法是前面加 `#`（示例页写法），直接写 `mirror:` 空值无效。

## Related references

- `link-banner.md`、`badge.md`、`img-service.md`、`mdc-syntax.md`
