# Alert

## Status

- Author-facing: yes
- Source: `app/components/content/Alert.vue`
- Source verified: yes
- Usage verified: yes（`content/posts/**`、`content/previews/example.md`）

## Purpose

带图标和类型色的提示框：提醒 / 信息 / 问题 / 警告 / 错误。文章里最常用的强调容器。

## Syntax

```mdc
::alert{type="warning" title="注意"}
支持 **Markdown** 和 :badge[其它组件]{link="#badge"}。
::
```

行内简写（只有标题时）：

```mdc
:alert{icon="tabler:files" color="var(--c-accent)" title="仅标题"}
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | `'tip' \| 'info' \| 'question' \| 'warning' \| 'error'` | `'tip'` | 决定默认图标、颜色、标题文字 |
| `card` | `boolean` | — | 卡片风格（带渐变背景） |
| `flat` | `boolean` | — | 扁平风格 |
| `icon` | `string` | 按 `type` 取 | Iconify 图标名，覆盖默认图标 |
| `color` | `string` | 按 `type` 取 | 主色，可写 CSS 变量如 `var(--c-accent)` |
| `title` | `string` | 按 `type` 取 | 标题文字 |
| `text` | `string` | — | 纯文本默认插槽内容（不想写块体时用） |

### `type` → 默认值（源码 `typeMap`）

| type | icon | color | title |
| --- | --- | --- | --- |
| `tip` | `tabler:note` | `#3A7` | 提醒 |
| `info` | `tabler:info-circle` | `var(--c-text-1)` | 信息 |
| `question` | `tabler:help-circle` | `#3AF` | 问题 |
| `warning` | `tabler:alert-triangle` | `#F80` | 警告 |
| `error` | `tabler:circle-x` | `#F33` | 错误 |

### `card` / `flat` 的默认行为

源码：

```ts
const card = computed(() => appConfig.component.alert.defaultStyle === 'flat' ? props.card : !props.flat)
```

`appConfig.component.alert.defaultStyle` 默认是 `'card'`，因此**默认就是卡片风格**；写 `flat` 才会变成扁平。若站点把 `defaultStyle` 改成 `'flat'`，则只有显式写 `card` 才是卡片风格。

## Slots

- `title`：标题区（支持 Markdown / 行内组件）
- 默认插槽（`#default`）：正文区

## Minimal example

```mdc
::alert
你好
::
```

## Complete example

```mdc
::alert{type="question"}
你遇到过这种情况吗？
::

::alert{type="info" title="自定义标题"}
默认插槽的 [超链接](#alert) **粗体** `Inline code`
::

::alert{type="warning" card}
#title
卡片风格标题

#default
默认插槽内容
::

::alert{type="error" flat}
#title
扁平风格标题

#default
默认插槽内容
::

:alert{icon="tabler:files" color="var(--c-accent)" title="仅标题，自定义图标和颜色"}
```

## Special syntax

- `type` 决定 `--c-primary`，卡片的渐变背景与文字色都由它派生（`color-mix`）。
- 标题插槽里的 `<p>` 会被压掉外边距（样式 `:deep(p)`），可以放心写段落。

## Common mistakes

1. 写了 `#title` 却忘了给默认插槽内容 —— 内容会落到 `#title` 里，正文消失。需要显式 `#default`。
2. `type="tips"` / `type="warn"` —— 枚举只有 `tip` / `info` / `question` / `warning` / `error`，写错会让 `typeMap[type]` 取不到值而报错。
3. 想用 `::alert{color="red"}` 改色却同时依赖图标色 —— 图标用的是 `--c-primary`，改 `color` 会一起变。
4. 用 `::alert{card=false}` —— 布尔属性应写 `::alert{flat}`。

## Related references

- `tip.md`、`quote.md`、`mdc-syntax.md`、`css-classes.md`
