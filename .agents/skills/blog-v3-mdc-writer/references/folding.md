# Folding

## Status

- Author-facing: yes
- Source: `app/components/content/Folding.vue`
- Source verified: yes
- Usage verified: yes（`content/posts/**`、`content/previews/example.md`）

## Purpose

可折叠的补充内容（原生 `<details>`）。适合放「详细步骤」「完整代码」「不影响主线的说明」。

## Syntax

```mdc
::folding{title="点击展开"}
折叠的内容。
::

::folding{open title="默认展开"}
已经打开的内容。
::
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | — | 标题文字（`#title` 插槽的兜底） |

### `open` 不是 prop

源码 `defineProps` 中**只有 `title`**。`open` 之所以生效，是因为组件根元素就是 `<details>`，且未设置 `inheritAttrs: false`，MDC 传入的 `open` 作为**透传属性**落到了 `<details>` 上（HTML 原生布尔属性）。

因此：写 `{open}` 有效；写 `{open="false"}` 会变成 `open="false"` 属性 —— 在 HTML 里**只要是存在就为真**，折叠面板依然默认展开。

## Slots

- `title`：标题区（支持 Markdown / 行内组件）
- 默认插槽（`#default`）：展开后的内容

## Special syntax

- 展开按钮上的「展开 / 收起」文字由 CSS `::before` 生成。
- 标题插槽内的 `<p>` 被强制 `display: inline`，可以直接写段落。
- 折叠体内的代码块会去掉左右外边距以贴边（`:deep(.z-codeblock)`）。

## Minimal example

```mdc
::folding{title="详细步骤"}
1. 第一步
2. 第二步
::
```

## Complete example

```mdc
::folding
#title
可以通过标题插槽传值 [超链接](#folding) **粗体** `Inline code`

#default
默认插槽的 [超链接](#folding) **粗体** `Inline code`

  ::folding{open title="折叠还可以嵌套"}
  默认展开的折叠。

    ::alert{type="error"}
    #title
    在嵌套使用的组件内部使用 MDC 的 `#slotname` 插槽语法
    #default
    必须缩进，否则会报错。
    ::
  ::
::

::folding{open}
```md
- 默认展开的折叠。
```
::
```

## Common mistakes

1. **嵌套时忘记缩进**：在 `::folding` 内部再写带 `#slot` 的组件，整体必须缩进，否则解析错乱（源码示例页明确标注）。
2. `::folding{open="false"}` 想默认收起 —— 无效，见上。
3. 在 `#title` 插槽写多行块级内容 —— 标题行高只有一行，会挤在一起。
4. 折叠面板里放需要测量尺寸的图表（Mermaid）—— 收起状态下尺寸为 0，展开后可能错位。

## Related references

- `tab.md`、`alert.md`、`mdc-syntax.md`
