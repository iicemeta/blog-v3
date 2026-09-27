# 数学公式（$ … $ / $$ … $$）

## Status

- Author-facing: yes
- Source: `nuxt.config.ts` → `content.build.markdown.remarkPlugins['remark-math']`、`rehypePlugins['rehype-katex']`；`nuxt.config.ts` 的 `app.head.link` 引入 KaTeX 样式
- Source verified: yes
- Usage verified: yes（`content/previews/example.md`）

## Purpose

用 TeX 语法写公式，`remark-math` 解析、`rehype-katex` 渲染，CSS 由 CDN 上的 `katex@0.16.44` 提供。

## Syntax

```md
行内公式 $\text{课程绩点} = \frac{\text{课程分数(成绩)}}{10} - 5$

块级公式：

$$
\text{学分绩点} = \text{课程学分} \times \text{课程绩点}
$$
```

## Supported values

- 支持 KaTeX 语法子集，见 <https://katex.org/docs/supported>。
- 正文里的美元符号必须转义：`\$`。
- 公式内使用 `\colorbox`、`\raisebox`、`\Large`、`\kern`、`\quad` 等 KaTeX 支持的命令（`content/previews/example.md` 中有实例）。

## Special syntax

### ⚠️ ```` ```math ```` 围栏**不会**渲染成公式

`content/previews/example.md` 把 ```` ```math ```` 列为公式写法之一，但**当前源码不成立**：

- 项目中把代码围栏转成组件的只有 `remark-code-component`，它只映射 `mermaid` 与 `music-abc`（`nuxt.config.ts`）。
- `remark-math` 只处理 `$…$` / `$$…$$`，不处理围栏。
- 实测（`@nuxtjs/mdc/runtime` 的 `parseMarkdown` + `remark-math` + `rehype-katex`）：

  ````md
  ```math
  c^2
  ```
  ````

  解析结果为 `<pre language="math"><code>c^2</code></pre>`，即一个普通代码块（语言标签显示 `math`、无高亮），**不会**产生任何 `.katex` 元素。

**结论**：写公式请用 `$$…$$`（块级）或 `$…$`（行内），不要用 ```` ```math ````。

### 样式兜底

`app/assets/css/main.scss` 中有：

```scss
.katex-display, article > .katex { display: block; overflow: auto hidden; }
```

块级公式超宽时可横向滚动。

## Minimal example

```md
勾股定理：$a^2 + b^2 = c^2$
```

## Complete example

```md
行内公式 $\text{课程绩点} = \frac{\text{课程分数(成绩)}}{10} - 5$

$$
\text{平均绩点(GPA)} = \frac{\sum (\text{课程学分} \times \text{课程绩点})}{\sum \text{课程学分}}
$$

价格是 \$9.99。
```

## Common mistakes

1. 用 ```` ```math ```` 写公式（见上）。
2. 忘记转义 `\$`，导致后续文本被误判为公式。
3. 在表格单元格里写 `|` —— 公式中的竖线需写成 `\vert` 或 `\mid`。
4. 依赖 KaTeX 不支持的宏包命令（如 `\usepackage`、`align` 环境之外的 LaTeX-only 语法）。

## Related references

- `markdown-extensions.md`、`prose-pre.md`
