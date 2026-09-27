# Meta 插槽（meta-copyright / meta-aside-*）

## Status

- Author-facing: yes
- Source: `remark-plugins/rehype-meta-slots.ts`、`app/composables/useWidgets.ts`、`app/components/post/PostFooter.vue`
- Source verified: yes
- Usage verified: yes（`content/previews/example.md`）

## Purpose

把正文里的块级组件「搬运」到文章之外的位置：文末许可协议、文章侧栏。**不是 Vue 组件**，而是 rehype 插件实现的特殊规则。

## Syntax

```mdc
::meta-copyright{title="本文章不保留版权"}
通过 [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/deed.zh-hans) 贡献至公共领域。
::

::meta-aside-note{title="侧栏小卡片" card}
这里的内容会出现在侧栏。
::
```

## How it works

- 插件扫描**文章顶层**的 `meta-*` 元素，抽出成 `meta.slots[<名字>]`，并把它们从正文中**移除**（`rehype-meta-slots.ts` 的 `tree.children.splice`）。
- 名字 = `meta-` 后面的部分：`::meta-copyright` → 插槽 `copyright`。
- 元素上的属性（如 `title`、`card`）会成为该插槽的 props。
- 因此：**必须是文章的直接子元素**，写在下级组件或块引用里不会被抽取。

## Recognized slot names

| 插槽 | 渲染位置 | 说明 |
| --- | --- | --- |
| `meta-copyright` | 文末「许可协议」区块 | 读取 `props.title` 作为标题，默认「许可协议」；无该插槽时显示站点默认许可声明 |
| `meta-aside-<任意名>` | 侧栏 | 需在 front matter 的 `aside` 中列出同名项才会渲染 |

其它 `meta-xxx` 会被抽取但**无人渲染**，等同于把这段内容从正文里删掉——这是最容易踩的坑。

## Minimal example

```mdc
---
aside: [toc, meta-aside-note]
---

::meta-aside-note{title="小提示"}
侧栏内容。
::
```

## Complete example

```mdc
---
aside: [toc, meta-aside-note]
---

::meta-aside-note{title="从文章插入的组件" card}
展示 rehype 插件能力。

虽然一般情况下， :blur[文章侧栏不需要组件]
::

::meta-copyright{title="本文章不保留版权"}
通过 [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/deed.zh-hans) 贡献至公共领域。
::
```

- `card` 会传给包装组件 `BlogWidget`；`meta-aside-*` 插槽存在时 `card` 不再自动补全（`useWidgets.ts`：`card: !slotsTree`）。
- 侧栏插槽的 `title` 同时是 `BlogWidget` 的标题。

## Common mistakes

1. 写了 `::meta-aside-note` 但没在 `aside` 里加 `meta-aside-note` → 内容不显示（被抽走后无渲染方）。
2. 把 `meta-*` 写进 `::folding` 之类的子层级 → 不会被抽取。
3. 用 `:::meta-copyright` 容器形式包裹更多块 —— 也能生效，但内容会整体成为插槽内容。
4. 期望 `meta-aside-*` 自动出现在侧栏 —— 必须显式列入 `aside`。

## Related references

- `article-frontmatter.md`、`mdc-syntax.md`、`blur.md`
