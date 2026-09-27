# ProseTable（表格）

## Status

- Author-facing: yes（用 Markdown 表格语法触发，不写组件名）
- Source: `app/components/content/ProseTable.vue`
- Source verified: yes
- Usage verified: yes（`content/**`、`content/previews/example.md`）

## Purpose

所有 Markdown 表格的渲染层，提供「横向滚动」与「自动换行」两种模式的切换。

## Syntax

```md
| 列 A | 列 B |
| --- | ---: |
| 左对齐 | 右对齐 |
```

## Props

无。

## Slots

- 默认插槽（`#default`）：表格内容（`<thead>` / `<tbody>`）

## Special syntax

- 默认**横向滚动**（`useToggle(true)`）：表格为 `white-space: nowrap`、`word-break: normal`，超宽时横向滚动并带羽化遮罩。
- 悬停或聚焦时弹出按钮，可在「自动换行 / 横向滚动」之间切换。
- 表头 `position: sticky; top: 0`，纵向滚动时吸附。
- 单元格 `padding: 0.5em 0.8em`、`border: 1px solid var(--c-border)`；行悬停高亮。
- 数字使用等宽数字（`font-variant-numeric: tabular-nums`）。
- 外层是 `<figure class="md-table">`，`word-break: break-all` 防止长链接撑破。

## Minimal example

```md
| 名称 | 说明 |
| --- | --- |
| `a` | 第一个 |
```

## Complete example

```md
| 表头滚动吸附 | 滚动时边缘羽化 | 如果标题或内容很 loooooooooong | 这里还有一列，但是是空内容 |
| ----------- | -------------: | :---------------------------- | :----------------------- |
| 已实现       | 已实现         | 可以切换滚动方式               |                          |
```

## Common mistakes

1. 单元格里直接写 `|`（如公式 `a|b`）—— 需转义为 `\|` 或改用 `\vert`。
2. 表格里放代码块、折叠面板等块组件 —— 会破坏表格结构，MDC 内联不进去。
3. 期望有列宽控制 —— 没有相关 prop，宽度由内容与滚动模式决定。
4. 忘记分隔行 —— 没有分隔行就不是表格。

## Related references

- `markdown-extensions.md`、`math.md`、`prose-pre.md`
