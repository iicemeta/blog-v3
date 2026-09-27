---
name: blog-v3-mdc-writer
description: 为 blog-v3（Nuxt Content + MDC）撰写或改写文章内容时使用。覆盖 MDC 组件、代码块 meta、Shiki 标注、数学公式、Mermaid/乐谱、文章 front matter、meta 插槽与作者可用的 CSS 工具类。用户提到「写文章 / 加个提示框 / 折叠面板 / 标签页 / 链接卡片 / 代码块 / 公式 / 图表 / 友链卡片」等内容创作意图时触发。
---

# blog-v3 MDC 写作

本文件是**行为规范 + 路由器**，不是知识库。组件细节一律在 `references/` 中，按需加载。

## 何时触发

- 在 `content/**` 下新建、编辑或改写 Markdown / MDC 文章
- 询问「这段内容该用什么组件 / 语法怎么写」
- 把普通 Markdown 改造成 blog-v3 风格（提示框、标签页、折叠、图片灯箱、可复制命令……）
- 排查某个组件「为什么不渲染 / 属性不生效」

## 项目 Markdown 管线

先理解这条链路，再决定去读哪个 reference：

```text
Markdown 内容（content/**/*.md）
  → Nuxt Content 收集
  → @nuxtjs/mdc 解析（MDC 语法：块组件 / 行内组件 / 容器 / 插槽 / YAML props）
  → remark：remark-mdc、remark-gfm、remark-emoji、remark-math、remark-code-component（本项目）
  → rehype：rehype-katex、rehype-meta-slots（本项目）
  → 渲染为 Vue 组件
```

关键源码位置（**唯一事实来源**）：

| 关注点 | 位置 |
| --- | --- |
| MDC 组件（自动注册，MDC 名为文件名 kebab-case） | `app/components/content/*.vue` |
| Markdown 构建配置（remark/rehype 插件、toc 深度） | `nuxt.config.ts` → `content.build.markdown` |
| 代码围栏 → 组件映射 | `remark-plugins/remark-code-component.ts` |
| `meta-*` 元素 → 插槽 | `remark-plugins/rehype-meta-slots.ts` |
| MDC 解析器行为补丁 | `patches/@nuxtjs__mdc.patch` |
| 文章 front matter 校验 | `content.config.ts` |
| 作者可用 CSS 工具类 | `app/assets/css/article.scss`、`app/assets/css/reusable.scss` |
| 语法参考实例（usage-confirmed） | `content/previews/example.md` |

## 工作流程（必须遵守）

1. **先路由**：读 `references/index.md`，判断任务属于哪个能力，选出 1～3 个最相关的 reference。
2. **只读需要的那几个** reference，然后动手写内容。
3. Props / Slots / 取值不确定时，**直接读对应 `.vue` 源码**确认，不要凭印象补属性。
4. 产出内容后按下方「生成后自检」逐条核对。

**Token 纪律（最高优先级）**：绝不允许「读完整套 `references/`」。用户只问一个折叠面板，就只读 `references/folding.md`。

## 铁律

- **源码优先**：本 Skill 的 Props/Slots 均来自源码；若某处描述与源码冲突，以源码为准，并顺手修正该 reference。
- **不猜测**：不确定存在与否的组件/属性，先去 `app/components/content/` 查。查不到就说查不到，不要编。
- **不推断**：不要因为「别的博客主题有」就假设 blog-v3 也有。
- **只动内容**：本 Skill 只负责 `content/**` 与文档。不要改 `app/**`、`server/**`、`modules/**`、`remark-plugins/**`、`nuxt.config.ts`、`package.json` 等工程代码。

## MDC 语法最小认知

```mdc
::组件名{属性="值"}
块内容（可含 Markdown）
::

:组件名[行内文本]{属性="值"}

:::组件名
::内部组件
子内容
::
:::

::组件名
#插槽名
插槽内容

#default
默认插槽内容
::

::组件名
---
title: 标题
link: https://example.com
---
::
```

| 写法 | 含义 |
| --- | --- |
| `{flag}` | 布尔属性，等价 `true` |
| `{name="文本"}` | 字符串属性 |
| `{:list='["a","b"]'}` | Vue 绑定表达式（数组/对象/数字），**外层必须单引号** |
| `{.类名 #id style="..."}` | 写在 Markdown 元素后面的属性块（链接、图片、文字均可） |

## 生成后自检

- [ ] 组件名与 `app/components/content/<Name>.vue` 的 kebab-case 一致（不是猜测的别名）
- [ ] 数组 / 对象 / 数字类属性用 `:prop='...'`，外层单引号
- [ ] 布尔属性只写名字，不写 `{flag=true}`
- [ ] 块组件之间、插槽 `#name` 前留空行
- [ ] 组件嵌套在插槽里时整体缩进；内层还要用 `#slot` 时必须缩进
- [ ] 代码块里嵌套代码块时，外层用更多反引号
- [ ] 未使用本项目中不存在的组件或属性
- [ ] 未改动 `content/**` 之外的工程代码

## Reference 路由（详见 `references/index.md`）

| 需要什么 | 读 |
| --- | --- |
| MDC 语法本身（属性、插槽、YAML、嵌套） | `mdc-syntax.md` |
| 基础 Markdown / GFM 能力（表格、脚注、emoji、标题锚点） | `markdown-extensions.md` |
| 文章头部字段、`aside` 侧栏、`type` 版式 | `article-frontmatter.md` |
| 提示框 / 信息框 | `alert.md` |
| 标签页 | `tab.md` |
| 折叠面板 | `folding.md` |
| 悬停小提示 | `tip.md` |
| 徽章 / 站外链接标识 | `badge.md` |
| 链接卡片 / 横幅卡片 / 友链卡片 | `link-card.md`、`link-banner.md`、`feed-card.md`、`feed-group.md` |
| 图片（灯箱 / 说明文字） | `pic.md` |
| 图片服务的 `mirror` 取值 | `img-service.md` |
| 引用 / 诗句 / 时间线 / 聊天气泡 / 卡片列表 | `quote.md`、`poetry.md`、`timeline.md`、`chat.md`、`card-list.md` |
| 隐藏文字 / 时钟 / 按键 / 可复制命令 / 视频 | `blur.md`、`emoji-clock.md`、`key.md`、`copy.md`、`video-embed.md` |
| 代码块（meta、折叠、文件名、图标） | `prose-pre.md` |
| 行内代码 | `prose-code.md` |
| 表格 | `prose-table.md` |
| 链接 | `prose-a.md` |
| 代码块内的 diff / 高亮 / 聚焦标注 | `shiki-notation.md` |
| 数学公式 | `math.md` |
| Mermaid 图表 | `mermaid.md` |
| 五线谱 / ABC 乐谱 | `music-score.md` |
| 文章末尾许可协议、侧栏自定义插槽 | `meta-slots.md` |
| 作者可用的 CSS 工具类 | `css-classes.md` |
| 站点 Logo 页头 | `blog-header.md` |
