# ProsePre（代码块）

## Status

- Author-facing: yes（用围栏触发，不写组件名）
- Source: `app/components/content/ProsePre.vue`；解析侧见 `@nuxtjs/mdc` 的 `code` 处理器与 `parseThematicBlock`；补丁见 `patches/@nuxtjs__mdc.patch`
- Source verified: yes
- Usage verified: yes（`content/**`、`content/previews/example.md`）

## Purpose

所有围栏代码块的渲染层：语言标签、文件名图标、自动折叠、换行切换、复制。

## Syntax

````md
```语言简写 [文件名] icon=图标 wrap expand
代码
```
````

- 语言简写必须紧跟在反引号后、且是小写（如 `yaml`、`md`、`sh`）。
- `[...]` 内是文件名，可含空格与路径；文件名里若有 `[` `]` `{` `}` 等需用 `\` 转义。
- 其余空格分隔的键值都是 meta：`icon=图标`、`wrap`、`expand`。

```md
```
无语言、无文件名的纯文本
```

``` [文件名]
有文件名、未指定语言
```

```yaml [特别长的文件名]
同时指定语言与文件名
```
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `code` | `string` | `''` | 代码内容（解析器注入） |
| `language` | `string` | `'text'` | 语言（解析器注入，缺省由 Nuxt Content 补 `text`） |
| `filename` | `string` | — | 方括号里的文件名 |
| `meta` | `string` | `''` | 语言与文件名之外的剩余 meta 字符串 |
| `highlights` | `number[]` | — | **已废弃**（源码 JSDoc：改用 `transformerNotationHighlight`） |
| `class` | `string` | — | 透传到 `<pre>` 的类名 |

## Slots

无。

## Meta 标记（源码 `meta` 解析）

`meta` 以空格切分，每项按 `=` 拆成键值；无 `=` 的项值为 `true`：

| meta | 效果 |
| --- | --- |
| `wrap` | 初始启用自动换行（`isWrap` 初值取自它） |
| `expand` | 禁用自动折叠 |
| `icon=tabler:files` | 自定义图标 |

**其它 meta 键**会被记录但当前源码无对应行为，例如 `indent=2` 实际是读取 `meta.indent` 用作 `--tab-size`（源码 `getIndent()` 中优先取 `meta.indent`）。

## Special syntax

### 自动折叠

```ts
const collapsible = computed(() => !meta.value.expand && rows.value > compConf.value.triggerRows)
```

- `appConfig.component.codeblock.triggerRows` 默认 `32`：超过则折叠；
- `collapsedRows` 默认 `16`：折叠后显示的行数；
- 写 `expand` 可关闭折叠；底部按钮显示 `行数, 字符数, 体积`。

### 图标来源（`ProsePre` → `shared/utils/icon.ts`）

`meta.icon` → `getFileIcon(filename)`（`file2icon` 表，如 `README.md`、`nuxt.config.ts`、`package.json`）→ `getLangIcon(language)`（`ext2lang` 表，未命中为 `catppuccin:file`）。**图标只在有文件名时显示。**

### 缩进

- `md` / `mdc` / `json` / `jsonc` / `yaml` / `yml` 默认缩进 2，其余语言取 `appConfig.component.codeblock.indent`（默认 4）；`meta.indent` 优先。
- `enableIndentGuide: true`（默认）时渲染缩进竖线并关闭空格可视化；相关标注见 `shiki-notation.md`。

### 其它

- 高亮在客户端完成（`onMounted` → `useShiki().codeToHtml`），服务端先输出转义后的纯文本。
- `md` / `mdc` / `markdown` 语言会额外加载内嵌代码块的语言（`useShiki` 的 `getEmbeddedMarkdownLanguages`）。
- 「嘿嘿，不要换行」—— 源码特意保证 `<pre>` 前不产生多余空白，避免行号错位。
- 未收录的语言回退为 `text`，不报错。

## Minimal example

````md
```sh wrap
pnpm dev
```
````

## Complete example

````md
```md [CHANGELOG.md]
# 更新日志
- 特殊文件名自动匹配图标
- 行数超出 `appConfig.component.codeblock.triggerRows`（默认 32）则折叠到 `collapsedRows`（默认 16）
- 设置了 expand 则不自动折叠
- 设置了 wrap 则自动换行
```

````md [更多功能] icon=tabler:files wrap expand
- 通过代码块语法的 meta 标记控制
- 外层用四个反引号才能嵌套代码块
````
````

## Common mistakes

1. 语言不是第一项（```` ``` [file] yaml ````）—— 文件名会解析正确，但语言识别依赖 `parseThematicBlock` 的规则，实际写 ```` ```yaml [file] ```` 更稳。
2. 代码块里嵌代码块仍用三个反引号 —— 提前闭合，外层要四个。
3. 用 `{1,3}` 高亮行 —— 已废弃，改用 `[!code hl]`（`shiki-notation.md`）。
4. 文件名写成路径却期待图标 —— 图标查的是后缀 / 文件名，`src/components/ProsePre.vue` 命中 `.vue` 语言图标。
5. 给 `md` 围栏加 `wrap` 但内容里全是不换行的长行 —— `wrap` 生效，但 `md` 的缩进规则仍按 2 缩进处理。

## Related references

- `prose-code.md`、`shiki-notation.md`、`mermaid.md`、`music-score.md`、`math.md`
