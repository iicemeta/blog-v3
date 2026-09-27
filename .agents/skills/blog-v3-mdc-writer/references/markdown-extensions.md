# Markdown / GFM 扩展

## Status

- Author-facing: yes
- Source: `@nuxtjs/mdc` 默认管线（`remark-gfm`、`remark-emoji`、`rehype-slug`）、`nuxt.config.ts`（`content.build.markdown.toc`）、`app/components/content/Prose*.vue`
- Source verified: yes
- Usage verified: yes（`content/previews/example.md`）

## Purpose

除 MDC 组件外，blog-v3 还启用了 GFM 与若干 Markdown 层能力。写正文时优先用这些原生语法，不要用组件硬造。

## Supported capabilities

| 能力 | 语法 | 说明 | 证据 |
| --- | --- | --- | --- |
| 表格 | `\| a \| b \|` + 分隔行 | 由 `ProseTable` 渲染，支持切换「横向滚动 / 自动换行」 | 使用确认 |
| 脚注 | `文字[^id]` + `[^id]: 内容` | remark-gfm | 使用确认 |
| 删除线 | `~~文字~~` | remark-gfm，`del` 样式 opacity 0.5 | 使用确认 |
| 自动链接 | 裸 URL 自动成链 | remark-gfm | 源码确认（GFM 默认） |
| 任务列表 | `- [ ] / - [x]` | GFM 默认开启，**`content/` 中未发现使用** | source-confirmed / usage-not-found |
| emoji 短代码 | `:smile:` | `remark-emoji`（MDC 默认插件，源码确认已启用）。注意它与 MDC 行内组件的 `:` 前缀共用字符，`content/` 中**没有实际用例**，实际优先级未验证 —— 想写 emoji 建议直接贴字符 | 源码确认 / usage-not-found |
| 标题锚点 | `## 标题` 自动生成 `<a>` 锚点 + id | `rehype-slug` + MDC 默认 `anchorLinks`（h2/h3/h4 为 `true`，h1/h5/h6 为 `false`） | 源码确认（`app/assets/css/article.scss` 有 `> h2 > a::before` 样式） |
| 数学公式 | `$…$`、`$$…$$`、` ```math ` | 见 `math.md` | 使用确认 |
| 链接图标 | `[文本](url){icon="tabler:link"}` | 由 `ProseA` 处理，见 `prose-a.md` | 使用确认 |
| 图片尺寸类 | `![alt](url){.icon}` | `.icon` 使图片缩为行内图标，见 `css-classes.md` | 使用确认 |
| 阅读时长 | 自动注入 front matter 的 `readingTime` | `remark-reading-time` | 源码确认 |
| 目录深度 | h2～h4 | `content.build.markdown.toc: { depth: 4, searchDepth: 4 }` | 源码确认 |
| 原始 HTML | `<br>`、`<!-- 注释 -->` | `rehype-raw` | 使用确认 |

> 注意 MDC 语法优先级高于 Markdown：`::x` / `:x[...]` 会被解析为组件；`remark-emoji` 处理 `:name:` 形式，不会与 `:组件名[` 冲突，但**行首裸 `:` 后接已知 emoji 短名**可能被转成 emoji。

## Syntax examples

```md
表格：

| 列 A | 列 B |
| --- | ---: |
| 左对齐 | 右对齐 |

脚注：由微标记驱动[^note]。

[^note]: 脚注内容。

删除线：~~作废~~，加粗：**重点**，行内代码：`code`。
```

## Special syntax

- **段落换行**：单个换行不产生 `<br>`；需要硬换行时用行尾 `\`（`content/previews/example.md` 的 `有趣\`）或 HTML `<br>`。
- **代码块与公式**：见 `prose-pre.md`、`math.md`。
- **`content/**` 的收录范围**：`content/**` 全部被 `content` 集合收录（`content.config.ts` 的 `source: '**'`），非 `posts/` 下的 Markdown 也会成为页面。

## Common mistakes

1. 用 `##` 以上标题层级做视觉区分 —— TOC 只收 h2～h4，且 h5/h6 无锚点。
2. 表格中直接写 `|` 字符 —— 需转义为 `\|`。
3. 以为 `$` 可以直接写 —— 正文里的美元符号要写 `\$`（见 `math.md`）。
4. 混用 `ProseTable` 组件名调用 —— 表格没有 MDC 调用方式，只能写 Markdown 表格。

## Related references

- `prose-table.md`、`prose-a.md`、`prose-code.md`、`math.md`、`css-classes.md`、`mdc-syntax.md`
