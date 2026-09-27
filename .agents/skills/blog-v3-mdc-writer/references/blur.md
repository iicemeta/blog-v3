# Blur

## Status

- Author-facing: yes
- Source: `app/components/content/Blur.vue`
- Source verified: yes
- Usage verified: yes（`content/previews/example.md`；正文中未使用）

## Purpose

把文字糊掉，鼠标悬停时才看清。用来写「剧透」「防误触」「你知道得太多了」这类内容。

## Syntax

```mdc
:blur[你知道得太多了。]
```

也可以包块级内容（用容器形式避免内部块组件解析问题）：

```mdc
::blur
:::quote
也未必。
:::
::
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `text` | `string` | — | 纯文本写法，等价于默认插槽 |

## Slots

- 默认插槽（`#default`）

## Special syntax

- 模糊通过 `filter: blur(4px)`，悬停 `0.2s` 过渡恢复清晰（`:hover` 即生效，键盘无法聚焦恢复）。
- 内容会**被搜索引擎与复制**照常读到 —— 只是视觉遮挡，不是加密。

## Minimal example

```mdc
:blur[剧透内容]
```

## Complete example

```mdc
:blur[你知道得太多了。]

::blur
:::quote
也未必。
:::
::
```

## Common mistakes

1. 用 `::blur` 包裹另一个块组件却不写成容器形式（`:::`）—— 内部组件可能解析异常。
2. 指望它隐藏内容 —— 源码只是视觉模糊。
3. 在表格单元格里用块形式 —— 会破坏表格结构。

## Related references

- `quote.md`、`mdc-syntax.md`
