# Quote

## Status

- Author-facing: yes
- Source: `app/components/content/Quote.vue`
- Source verified: yes
- Usage verified: yes（`content/previews/example.md`；正文中未使用）

## Purpose

装饰性大号引用块：一个巨大的半透明图标 + 正文。比 Markdown 的 `>` 引用更「标题化」。

## Syntax

```mdc
:quote[有时候，有些话，有点意思。]

::quote{icon="tabler:files"}
令图标有所指，引用亦有中心。
::
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `icon` | `string` | `'tabler:message-2'` | Iconify 图标名 |

> 注意：`content/previews/example.md` 与旧文档写的默认图标是 `ph:chat-centered-text-duotone`，**与源码不符**。源码：

```ts
const icon = computed(() => props.icon || 'tabler:message-2')
```

## Slots

- `icon`：装饰图标区（可放 Emoji、颜文字、自定义文字）
- 默认插槽（`#default`）：引用正文

## Special syntax

- 图标由 `mask-image` 渐变淡出，字号 `4rem`（窄屏 `3rem`），默认 `opacity: 0.5`。
- **悬停整个组件**时图标 `opacity: 1` 并上移 `0.5rem`（`.quote:hover .icon-line`）。
- 图标层 `z-index: -1` + 父级 `isolation: isolate`，不会盖住正文。
- 正文里的 `<p>` 外边距被清零。
- 样式会随文章 `type` 变化（`tech` / `story`）。

## Minimal example

```mdc
:quote[一句话。]
```

## Complete example

```mdc
:quote[有时候，有些话，有点意思。]

::quote{icon="tabler:files"}
令图标有所指，引用亦有中心。
::

::quote
#icon
ヾ(•ω•`)o

#default
图标插槽也可以是 Emoji 或颜文字，或者英文装饰。
::
```

## Common mistakes

1. 写 `::quote{icon="ph:star-duotone"}` 期待默认是 Phosphor —— 默认是 `tabler:message-2`，而 `ph:` 图标集需站点已安装对应 Iconify 集合。
2. 把长正文塞进去 —— 它的定位是「短小点睛」，长内容请用 `alert.md` 或 Markdown `>` 引用。
3. 用 `:quote[文字]` 又想加图标插槽 —— 插槽只能用块形式。
4. 以为它是 Markdown 的 `>` 引用 —— 两者互不相干，`>` 走 `blockquote` 样式。

## Related references

- `poetry.md`、`blur.md`、`alert.md`
