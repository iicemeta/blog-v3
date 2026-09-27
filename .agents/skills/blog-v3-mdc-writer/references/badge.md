# Badge

## Status

- Author-facing: yes
- Source: `app/components/content/Badge.vue`
- Source verified: yes
- Usage verified: yes（`content/posts/**`、`content/previews/example.md`）

## Purpose

行内小徽章：站点链接、人物、标签。会自动为外链抓取站点图标，GitHub 链接自动换成头像。

## Syntax

```mdc
:badge[纯文本]{link="#badge"}
:badge[带个图]{img="https://picsum.photos/100/100"}
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `img` | `string` | 自动推断 | 图标/头像地址，优先级最高 |
| `text` | `string` | — | 默认插槽的纯文本写法 |
| `link` | `string` | — | 目标链接；不写则渲染为 `<span>`（不可点击） |
| `round` | `boolean` | 见下 | 强制定圆角 |
| `square` | `boolean` | 见下 | 强制定方形 |

### `img` 自动推断顺序（源码）

1. 显式 `img`；
2. `link` 是 GitHub 仓库/用户地址 → `getGithubAvatar(...)`；
3. `link` 是外链 → `getFavicon(getDomain(link))`；
4. 否则无图。

### `round` 的计算规则

```ts
const round = computed(() => img.value ? !props.square : props.round)
```

- **有图**：默认圆形，写 `square` 变方形；
- **无图**：默认方形，写 `round` 变圆角。

## Slots

- 默认插槽（`#default`）：徽章文字

## Minimal example

```mdc
:badge[纸鹿]{link="https://www.zhilu.site"}
```

## Complete example

```mdc
:badge[普通带链接]{link="#badge"} :badge[纯文本指定圆形]{round} :badge[纯文本指定方形]{square} :badge[带个图]{img="https://picsum.photos/100/100"}

外部域名自动获取站点图标 :badge[纸鹿]{link="https://www.zhilu.site"}，
:badge[古怪杂记本]{link="https://gug.thisis.host/" square}，
GitHub 链接能自动识别头像 :badge[KazariEX]{link="https://github.com/KazariEX"}。

::alert
#title
在其他组件中使用 :badge{img="https://picsum.photos/100/100" text="带链接" link="#badge"}
#default
:badge{img="https://picsum.photos/100/100" text="指定圆形" round} 背景色 [可以 :badge{img="https://picsum.photos/100/100" text="动态变化" square} 使用](#badge)
::
```

## Special syntax

- 「动态变化」：徽章背景用 `color-mix(currentcolor …)`，会跟随所在链接的文字色（示例里包在 `[可以 …… 使用](#badge)` 中，悬停时一起变色）。
- 悬停气泡显示域名或解码后的链接（`v-tip`）。
- 文字为空时 `.badge-text:empty` 直接隐藏，可做纯图标徽章。

## Common mistakes

1. `:badge[文字]{href="..."}` —— 属性名是 `link`，不是 `href`。
2. `:badge{text="纯文本"}` 与 `:badge[纯文本]` 混用导致内容重复。
3. 期望 GitHub 头像以外的人物头像 —— 只有 `github.com/用户名` 形式能自动识别。
4. 徽章里写块级内容（列表、代码块）—— 它渲染为行内 `<a>`/`<span>`。

## Related references

- `link-card.md`、`prose-a.md`、`img-service.md`
