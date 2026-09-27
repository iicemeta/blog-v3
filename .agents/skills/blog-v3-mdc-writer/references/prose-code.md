# ProseCode（行内代码）

## Status

- Author-facing: yes（用反引号触发，不写组件名）
- Source: `app/components/content/ProseCode.vue`；解析侧见 `patches/@nuxtjs__mdc.patch` 与 `@nuxtjs/mdc` 的 `inlineCode` 处理器
- Source verified: yes
- Usage verified: yes（`content/**`、`content/previews/example.md`）

## Purpose

所有行内代码的渲染层，支持指定高亮语言与「复制」按钮。

## Syntax

```md
`行内代码`

`const a = 1`{lang="js"}

`pnpm dev`{lang="sh" copy}
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `code` | `string` | — | **必填**。由解析器注入（见 Special syntax），作者永远不用手写 |
| `language` | `string` | — | 高亮语言；不写则不高亮 |
| `copy` | `boolean` | — | 显示复制按钮 |

### 属性怎么传

`@nuxtjs/mdc` 的 `inlineCode` 处理器：

```js
const language = node.attributes?.language || node.attributes?.lang
```

即 `{lang="js"}` 与 `{language="js"}` 都行，会被归一化成 `language` prop。`{copy}` 变成布尔 `true`。

## Slots

无。

## Special syntax

- **本地补丁**：`patches/@nuxtjs__mdc.patch` 给行内代码元素追加了 `code: text.value` 属性，否则组件拿不到代码内容。
- 未指定语言，或高亮尚未挂载时，先按纯文本渲染，挂载后再原地替换为 Shiki HTML（`structure: 'inline'`）。
- 行内代码的括号配色**关闭**（`transformerOptions: ['ignoreColorizedBrackets']`），避免小片段里颜色过碎。
- `copy` 时右侧出现复制按钮，并隐藏占位图标防止宽度抖动。
- 空白保留（`white-space: break-spaces`），表格/正文里可换行。

## Minimal example

```md
记得先执行 `pnpm install`。
```

## Complete example

```md
`行内代码` 和 [在超链接中的 `行内代码`](#代码-prosecode)。

还可以通过在反引号后加 `{lang="js"}` 等语言实现高亮，例如 `const a = 1`{lang="js"} 。

也可以加上 `copy` 展示复制按钮，例如 `pnpm dev`{lang="sh" copy} 。
```

## Common mistakes

1. 写 `{lang: 'js'}` —— MDC 属性语法是 `=` 或 `:` 前缀对象，不是 JSON。
2. 期望单行命令有可编辑/撤销能力 —— 那是 `copy.md` 的 `Copy` 组件。
3. 在行内代码里放多行内容 —— 行内代码会把换行压成空格。
4. 指定未被 Shiki 加载的语言 —— 回退为纯文本（`useShiki` 的 `getLoadedLanguages` 判断）。

## Related references

- `prose-pre.md`、`copy.md`、`shiki-notation.md`
