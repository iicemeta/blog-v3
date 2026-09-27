# 代码块 Shiki 标注

## Status

- Author-facing: yes（写在代码块内部的行内注释里）
- Source: `app/composables/useShiki.ts`、`app/components/content/ProsePre.vue`（样式）、`app/app.config.ts`（`component.codeblock`）
- Source verified: yes
- Usage verified: no（`content/**` 中未发现实际使用）

## Purpose

在代码块里用**注释**标注 diff、高亮、聚焦、错误级别与重点词，Shiki 会在渲染时转成对应样式。不需要额外组件。

## Syntax

标注必须写成目标语言的合法注释，且出现在行首（或行内）注释中：

````md
```js
const a = 1 // [!code highlight]
const b = 2 // [!code ++]
const c = 3 // [!code --]
const d = 4 // [!code focus]
const e = 5 // [!code warning]
const f = 6 // [!code error]
const g = 7 // [!code word:g]
```
````

## Supported values

| 标注 | 作用 | 生成的类（`ProsePre.vue` 中的样式） |
| --- | --- | --- |
| `[!code highlight]` / `[!code hl]` | 高亮该行 | `.line.highlighted` |
| `[!code ++]` | 新增行 | `.line.diff.add`（`+ ` 前缀，成功色底） |
| `[!code --]` | 删除行 | `.line.diff.remove`（`- ` 前缀，错误色底） |
| `[!code focus]` | 聚焦该行，其余行被阴影遮暗 | `.line.focused`（`→ ` 前缀，悬停恢复） |
| `[!code warning]` | 警告级别高亮 | `.line.highlighted.warning` |
| `[!code error]` | 错误级别高亮 | `.line.highlighted.error` |
| `[!code info]` | 信息级别高亮（走基础 `.highlighted` 样式） | `.line.highlighted` |
| `[!code word:词]` | 高亮该行中出现的词 | `.highlighted-word` |

**行数范围后缀**：`[!code focus:3]`、`[!code ++:2]` 表示从该行起连续 3 / 2 行生效（`classMap` 的 `:N` 参数）。

## Special syntax

- `enableIndentGuide: true`（默认）时，Shiki 会渲染**缩进辅助竖线**（`.indent::before`）并关闭空格可视化；改为 `false` 则反过来显示空格/制表符标记（`useShiki.ts` 的 `ignoreRenderWhitespace` / `ignoreRenderIndentGuides` 二选一）。
- 括号配色由 `@shikijs/colorized-brackets` 提供，代码块与行内代码均启用。
- `ProsePre` 的 **`highlights` prop 已废弃**（源码 JSDoc：`@deprecated Use transformerNotationHighlight instead`）。不要再用 `{1,3-5}` 这种围栏 meta 写法。

## Minimal example

````md
```diff
 保持不变
+新增的行 // [!code ++]
-删除的行 // [!code --]
```
````

## Complete example

````md
```ts
export function divide(a: number, b: number) {
  if (b === 0) {
    throw new Error('division by zero') // [!code error]
  }
  return a / b // [!code focus]
}
```

```ts
const config = { retry: 3 } // [!code word:retry]
```
````

## Common mistakes

1. 标注写成 `// [!code  highlight]`（多空格）—— 正则允许 `#?\s*` 前缀，但 `[!code` 与关键词之间必须是**一个空格**。
2. 在没有注释语法的语言（如 `text`、`log`、`ansi`）里写标注 —— 不会被识别，因为没有注释可匹配。
3. 用围栏 meta 高亮行（```` ```js {1,3} ````）—— 请改用 `[!code hl]`，`highlights` 已废弃。
4. 以为 `.highlighted.info` 有专属配色 —— 源码只定义了 `.error` / `.warning` 变体。

## Related references

- `prose-pre.md`、`prose-code.md`
