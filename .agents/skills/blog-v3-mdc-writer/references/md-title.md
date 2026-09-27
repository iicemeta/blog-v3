# MdTitle

## Status

- Author-facing: 技术上存在，**不建议使用**
- Source: `app/components/content/MdTitle.vue`
- Source verified: yes
- Usage verified: no → `source-confirmed / usage-not-found`

## Purpose

一个 `1.1em` 加粗、悬停显示 `#` 号的伪标题块。**在 `content/**` 与 `app/**` 中都没有任何引用**，属于遗留组件（语义与 Markdown 标题、`.title-like` 工具类重叠）。

## Syntax

```mdc
::md-title
伪标题
::
```

## Props

无。

## Slots

- 默认插槽（`#default`）

## Special syntax

无。

## Recommendation

写标题请用 Markdown 的 `#`～`######`（会自动生成锚点并进入 TOC），需要「看起来像标题的行内文字」请用 `{.title-like}`（见 `css-classes.md`）。

## Common mistakes

1. 用 `::md-title` 代替 `##` —— 它不会生成锚点，也不会出现在目录中。
2. 假设它还有别的 props 或插槽 —— 源码只有默认插槽。

## Related references

- `css-classes.md`、`markdown-extensions.md`、`index.md`
