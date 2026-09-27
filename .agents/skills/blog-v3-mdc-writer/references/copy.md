# Copy

## Status

- Author-facing: yes
- Source: `app/components/content/Copy.vue`
- Source verified: yes
- Usage verified: yes（`content/posts/**`、`content/link.md`、`content/previews/example.md`）

## Purpose

一行可复制、可临时编辑的命令。适合 `npm install xxx`、URL、单行配置。**不支持换行**，多行请用代码块（`prose-pre.md`）。

## Syntax

```mdc
:copy{code="rm -rf ./dist"}

:copy{prompt code="https://example.com"}
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `prompt` | `string \| boolean` | `'$'` | 命令提示符。写裸 `prompt` 或 `prompt=""` 表示**不显示**提示符 |
| `code` | `string` | — | 代码内容（必填才有意义） |
| `lang` | `string` | 按 `prompt` 推断 | Shiki 高亮语言 |

### 语言自动推断（`shared/utils/str.ts` 的 `getPromptLanguage`）

| prompt 前缀 | 语言 |
| --- | --- |
| `#` | `sh` |
| `$` | `sh` |
| `CMD` | `bat` |
| `PS` | `powershell` |
| 布尔 `true` | `text` |

### `prompt` 的隐藏逻辑

```ts
const showPrompt = computed(() => props.prompt !== true)
```

MDC 里写 `:copy{prompt}` 或 `:copy{prompt=""}` → 值为布尔 `true`（源码注释：「prompt 传入空字符串会变成 true」）→ **不渲染提示符**，且语言推断为 `text`。

## Slots

无。

## Special syntax

- 代码区是 `contenteditable="plaintext-only"`：可以就地改内容再复制；改动后出现「恢复原始内容」按钮。
- 禁止输入换行（`preventLineBreak`）。
- 高亮用 `plain-shiki` 就地挂载，语言随 `prompt` 或 `lang` 变化。
- 超长内容横向滚动并带羽化边缘（`.scrollcheck-x`）。

## Minimal example

```mdc
:copy{code="pnpm dev"}
```

## Complete example

```mdc
:copy{code="rm -rf # 修改命令后再复制，也可撤销修改"}

:copy{prompt code="不带提示符的命令，可以是 URL、单行代码"}

:copy{prompt="自定义命令提示符、高亮语言" lang="js" code="const customLang = 'js' // 单行"}
```

## Common mistakes

1. 在 `code` 里写换行 —— 组件是单行设计，换行不会按预期渲染。
2. 想显示 PowerShell 提示符却写 `prompt="PS"` 以外的前缀 —— 只有 `#`、`$`、`CMD`、`PS` 会触发语言推断，其它前缀回退 `text`（不高亮）。
3. 想隐藏提示符写 `:copy{prompt="$"}` —— 那是显示 `$`；隐藏要写裸 `prompt`。
4. 正文里想包多行命令 —— 改用代码块 `` ```sh ``。

## Related references

- `prose-pre.md`、`prose-code.md`、`key.md`
