# CardList

## Status

- Author-facing: yes
- Source: `app/components/content/CardList.vue`
- Source verified: yes
- Usage verified: yes（`content/previews/example.md`；正文中未使用）

## Purpose

把无序列表面板化成自适应网格卡片。只改外观，不改变 Markdown 列表写法。

## Syntax

```mdc
::card-list
- 无序列表项 1
- 无序列表项 2
  - 嵌套项仍按普通列表渲染
::
```

## Props

无。

## Slots

- 默认插槽（`#default`）：一个或多个列表

## Special syntax

样式只作用于**直接子级**的 `ol` / `ul`（`> ol, > ul`），以及**没有 class 的**列表（`:where(ol, ul):not([class])`）：

- 直接子列表 → `display: grid`，`minmax(240px, 1fr)` 自动填充，每项是卡片；
- 更深层级 → 去项目符号 + 去缩进；
- 带 class 的列表（例如你手动加了 `{.某类}`）不会被处理。

## Minimal example

```mdc
::card-list
- 卡片一
- 卡片二
::
```

## Complete example

```mdc
::card-list
- 无序列表项 1
- 无序列表项 2
  - 无序列表项 2-1
    - 无序列表项 2-1-1
  - 无序列表项 2-2
::
```

## Common mistakes

1. 用 `::card-list` 包住有序列表却期待有编号排序视觉 —— 列表符号被 `list-style: none` 清掉了，卡片里看不到序号。
2. 期待它是「卡片链接列表」—— 它只是样式容器，点击行为取决于内容本身。
3. 在里面放 `<div>` 之类的块级 HTML —— 会被 `:where(ol, ul)` 规则之外的内容打断。

## Related references

- `css-classes.md`、`mdc-syntax.md`
