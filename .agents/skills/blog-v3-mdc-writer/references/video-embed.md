# VideoEmbed

## Status

- Author-facing: yes
- Source: `app/components/content/VideoEmbed.vue`
- Source verified: yes
- Usage verified: yes（`content/previews/example.md`；正文中未使用）

## Purpose

嵌入视频：直链 mp4 用原生 `<video>`，B 站 / YouTube / 抖音 / TikTok 用 iframe 播放器。

## Syntax

```mdc
::video-embed
---
type: bilibili
id: BV1Yr421p7rW
---
::
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `id` | `string` | — | **必填**。视频 ID，或 `type: raw` 时的完整视频地址 |
| `type` | `'raw' \| 'bilibili' \| 'bilibili-nano' \| 'youtube' \| 'douyin' \| 'douyin-wide' \| 'tiktok'` | `'raw'` | 播放器类型 |
| `autoplay` | `boolean` | — | 自动播放（拼进播放器 URL 的 `autoplay` 参数） |
| `ratio` | `string \| number` | 按 `type` 推断 | 宽高比，如 `16 / 9`、`1.6` |
| `poster` | `string` | — | 封面图，**仅 `type: raw` 可用** |
| `width` | `string` | — | 最大宽度（`max-width`） |
| `height` | `string` | `'80vh'` | 最大高度（`max-height`） |
| `zoom` | `number` | 自动计算 | CSS Zoom 比例（抖音横屏适配用） |

### `type` → 最终地址

| type | 地址模板 |
| --- | --- |
| `raw` | 直接把 `id` 当 `<video src>` |
| `bilibili` | `https://player.bilibili.com/player.html?bvid={id}&autoplay={autoplay}` |
| `bilibili-nano` | `https://www.bilibili.com/blackboard/newplayer.html?bvid={id}&autoplay={autoplay}` |
| `youtube` | `https://www.youtube.com/embed/{id}?rel=0&disablekb=1&playsinline=1&autoplay={autoplay}` |
| `douyin` | `https://open.douyin.com/player/video?vid={id}` |
| `douyin-wide` | `https://open.douyin.com/player/video?vid={id}` |
| `tiktok` | `https://www.tiktok.com/embed/v3/{id}` |

### 默认宽高比

`raw` → 不设；`douyin` → `27 / 56`；`douyin-wide` → `1198 / 731`；其它 → `16 / 9`。

## Slots

无。

## Special syntax

- **数字 ID 要加引号**：源码注释「数字过长时需通过双引号传入字符串」。YAML 里写 `id: '7339041157571169546'`。
- 抖音会预检播放器宽度是否小于 730px 以决定竖屏/横屏，`douyin` / `douyin-wide` 通过 `useResizeObserver` 实时计算 `zoom` 来强制正确模式。
- iframe 带 `loading="lazy"`、`scrolling="no"` 与完整 `allow` 权限列表。
- 容器 `contain: paint` + 圆角 + 阴影；在 `article` 内水平居中、上下外边距 `2rem`。

## Minimal example

```mdc
::video-embed
---
type: bilibili
id: BV1Yr421p7rW
---
::
```

## Complete example

```mdc
::video-embed
---
type: raw
id: https://example.com/video.mp4
poster: https://example.com/cover.png
---
::

::video-embed
---
type: douyin-wide
id: '7339041157571169546'
---
::

::video-embed
---
type: youtube
id: dQw4w9WgXcQ
ratio: 16 / 9
---
::
```

## Common mistakes

1. 抖音 ID 不加引号 —— YAML 会把长数字解析为浮点，精度丢失。
2. 给 iframe 类型配 `poster` —— 无效，`poster` 只用于 `type: raw`。
3. 传完整的播放页地址给 `bilibili` —— `id` 应为 `BV` 号，不是 URL。
4. 想让视频自适应高度 —— 高度默认 `max-height: 80vh`，需要时用 `height` 覆盖。

## Related references

- `pic.md`、`mdc-syntax.md`
