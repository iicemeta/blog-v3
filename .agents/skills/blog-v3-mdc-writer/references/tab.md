# Tab

## Status

- Author-facing: yes
- Source: `app/components/content/Tab.vue`
- Source verified: yes
- Usage verified: yes（`content/posts/**`、`content/previews/example.md`）

## Purpose

标签页切换。常见组合是「效果 / 语法」两栏并排展示同一段内容。

## Syntax

```mdc
::tab{:tabs='["组件","语法"]'}
#tab1
第一个标签页的内容

#tab2
第二个标签页的内容
::
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `tabs` | `string[]` | — | **必填**。标签标题数组 |
| `center` | `boolean` | — | 整体居中（宽度 `fit-content`） |
| `active` | `string \| number` | `1` | 默认激活的标签，**下标从 1 开始** |

### `active` 的实现细节

```ts
const activeTab = ref(Number(props.active) || 1)
```

只在初始化时读取一次，不是受控属性；传 `"2"` 或 `2` 都可以，`0` / 非数字会回落到 `1`。

## Slots

- **动态具名插槽**：`tab1`、`tab2`、…、`tabN`，与 `tabs` 数组一一对应（源码 `:name="\`tab${tabIndex}\`"`）
- **没有默认插槽** —— 不写 `#tabN` 的内容不会显示

## Special syntax

- YAML 写法避免数组引号问题：

```mdc
::tab
---
tabs: ["当当当", "高级交互！", "就是藏得有点深"]
center: true
active: 2 # 默认显示第二个选项卡
---
#tab1
…
::
```

- 切换时用 `v-show`，所有标签页内容都在 DOM 中（隐藏的内容仍会被浏览器解析）。

## Common mistakes

1. **标签数量与 `#tabN` 不匹配** —— 少写的标签页会显示空白。
2. **标签内容被吞缩进**：源码注释明确写着 `BUG: MDC Tab插槽块内会吞代码缩进`。在 Tab 插槽里写缩进代码会产生偏差，必要时用 YAML 形式或改用 `folding.md`。
3. `#tab0` / `#tab` —— 插槽名必须是 `tab` + 从 1 开始的序号。
4. 想用 `active` 动态切换 —— 它只读一次，改属性不会切换。
5. 在每个标签页内容前忘记空行。

## Related references

- `folding.md`、`alert.md`、`meta-slots.md`（示例页大量用 Tab 展示用法）
