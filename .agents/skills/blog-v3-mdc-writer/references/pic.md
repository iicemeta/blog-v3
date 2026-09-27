# Pic

## Status

- Author-facing: yes
- Source: `app/components/content/Pic.vue`、`app/components/util/Img.vue`（`UtilImgProps`）
- Source verified: yes
- Usage verified: yes（`content/posts/**` 中使用 150+ 次，是最高频组件之一）

## Purpose

图片 + 说明文字 + 点击灯箱放大。文章配图的默认选择。

## Syntax

```mdc
::pic
---
src: https://example.com/screenshot.png
caption: 图注文字
---
::
```

## Props

`UtilImgProps & { caption?: string, zoom?: boolean }`：

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `src` | `string` | — | **必填**。图片地址 |
| `caption` | `string` | `''` | 图注；也作为 `alt` 使用 |
| `zoom` | `boolean` | `true` | 是否可点击打开灯箱 |
| `alt` | `string` | `''` | 替代文本；`caption` 优先作为 `alt` |
| `width` | `string \| number` | — | 宽度 |
| `height` | `string \| number` | — | 高度 |
| `densities` | `string` | 站点默认 | `@nuxt/image` 的像素密度，如 `1x` |
| `filter` | `string` | — | CSS filter，如 `grayscale(1)` |
| `mirror` | `ImgService` | — | 图片代理，见 `img-service.md` |

## Slots

- `caption`：图注插槽（支持 Markdown / 行内组件）；存在时优先于 `caption` 属性

## Special syntax

- 根元素是 `<figure class="image">`：无 class 的图片会走 `article.scss` 的 `img:not([class])` 居中规则，`.image` 显式声明同样效果。
- 有 `caption` 或 `caption` 插槽时才渲染 `<figcaption>`，且带 `aria-hidden`。
- 灯箱用模态系统 `LazyPopoverLightbox` + `{ unique: true }`：全站同时只开一个。
- `zoom` 为假时 `cursor` 不设为 `zoom-in`，点击无反应。
- 组件注释说明：`<figure>` 不能塞进 `<p>`，所以它渲染为 figure 而非行内元素。

## Minimal example

```mdc
::pic
---
src: https://picsum.photos/480/240
---
::
```

## Complete example

```mdc
::pic
---
src: https://picsum.photos/480/240
caption: 说明文字，还支持通过 width 或 height 属性指定尺寸
width: 400
---
::

::pic
---
src: https://example.com/blocked.png
mirror: weserv
zoom: false
---
#caption
支持 **Markdown** 的图注
::
```

## Common mistakes

1. 用 `![]()` 却想要图注 —— 原生图片语法没有 caption；灯箱也只在 `::pic` 上启用。
2. `zoom: "false"`（带引号的字符串）—— YAML 里应写裸 `false`。
3. 在 `caption` 里写换行 —— YAML 多行需用 `|` 或 `>`。
4. 给站内图片加 `mirror` —— 没必要，站内图片已由 `@nuxt/image` 处理。

## Related references

- `img-service.md`、`css-classes.md`（`.icon` 行内图片）、`markdown-extensions.md`
