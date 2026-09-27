# references 路由表

Agent 的知识路由。**先在这里定位，再只打开命中的那 1～3 个文件。**

约定：
- 组件 reference 的文件名 = 源码 `app/components/content/<PascalName>.vue` 的 kebab-case。
- `Source-confirmed`：源码确认存在。`Usage-confirmed`：`content/**` 中有实际使用。`usage-not-found`：源码确认但 `content` 中未发现使用（**不代表不能用**）。

---

## A. 语法与全局机制（非组件）

| capability | 用途 | reference | 与相邻能力的区别 |
| --- | --- | --- | --- |
| MDC 语法 | 块/行内/容器、属性三种写法、具名插槽、YAML props、`{.class #id}` | `mdc-syntax.md` | 想弄清「语法本身怎么拼」时读这里；具体组件属性去对应组件文件 |
| Markdown / GFM 扩展 | 表格、脚注、删除线、emoji 短代码、标题锚点、图片与链接属性 | `markdown-extensions.md` | 原生 Markdown 层；不涉及自定义组件 |
| 文章 Front matter | `title/date/type/tags/aside/draft/permalink` 等字段与侧栏 widget | `article-frontmatter.md` | 管文章级元数据；组件级 props 不在其中 |
| Shiki 标注 | 代码块内 diff / 行高亮 / 行聚焦 / 错误级别 / 词高亮 / 缩进辅助线 | `shiki-notation.md` | 只作用于代码块**内部**注释；外层 meta 见 `prose-pre.md` |
| Meta 插槽 | `meta-copyright`（文末许可协议）、`meta-aside-*`（侧栏自定义块） | `meta-slots.md` | 由 rehype 插件实现，不是 Vue 组件 |
| CSS 工具类 | `.text-story`、`.title-like`、`.icon`、`.card`、`.gradient-card` 等 | `css-classes.md` | 纯样式；用 `{.类名}` 挂在 Markdown 元素上 |
| 图片服务 | `mirror` 属性的可选取值 | `img-service.md` | 被 pic / link-card / link-banner 共用 |
| 数学公式 | `$…$`、`$$…$$`、` ```math ` | `math.md` | KaTeX 渲染；`math` 围栏也是公式 |
| Mermaid 图表 | ` ```mermaid ` 围栏 | `mermaid.md` | 由 remark-code-component 把围栏变成 `Mermaid` 组件 |
| ABC 乐谱 | ` ```music-abc ` 围栏 | `music-score.md` | 同上，映射到 `MusicScore` 组件 |

## B. 组件（`app/components/content/*.vue`）

| capability | 用途 | reference | 一句话区别 |
| --- | --- | --- | --- |
| Alert | 提示 / 信息 / 问题 / 警告 / 错误框 | `alert.md` | 有图标与类型色；比 `Tip` 重、比 `Quote` 醒目 |
| Badge | 行内徽章、站外链接标识 | `badge.md` | 行内小标签，会自动取站点图标 / GitHub 头像 |
| Blur | 需悬停才看清的文字 | `blur.md` | 纯视觉模糊，可包裹块级内容 |
| BlogHeader | 站点 Logo + 标题页头 | `blog-header.md` | 全局组件；正文里通常只在介绍页出现 |
| CardList | 卡片式网格列表 | `card-list.md` | 只改列表外观，不改变 Markdown 列表写法 |
| Chat | 聊天气泡对话 | `chat.md` | 用 `{…}` 行当说话人，气泡靠 CSS 分左右 |
| Copy | 可复制、可编辑的单行命令 | `copy.md` | 带提示符与高亮；**不可换行**，与代码块 `prose-pre` 不同 |
| EmojiClock | 用表情显示时间 | `emoji-clock.md` | 行内装饰 |
| FeedCard | 单个友链卡片 | `feed-card.md` | 友链页专用；`FeedGroup` 的子项 |
| FeedGroup | 友链分组（含随机排序按钮） | `feed-group.md` | 友链页专用容器 |
| Folding | 折叠面板 | `folding.md` | 原生 `<details>`，可嵌套、可默认展开 |
| Key | 键盘按键样式 | `key.md` | 行内；能高亮按下状态 |
| LinkBanner | 大图横幅外链卡片 | `link-banner.md` | 有封面大图；`LinkCard` 是小卡片 |
| LinkCard | 小链接卡片 | `link-card.md` | 图标 + 标题 + 描述 |
| MdTitle | 伪标题样式块 | `md-title.md` | 遗留组件，`content` 中未使用，**不建议采用** |
| Pic | 图片 + 说明 + 灯箱缩放 | `pic.md` | 比原生 `![]()` 多 caption / 缩放控制 |
| Poetry | 居中排版的诗 | `poetry.md` | 标题/作者/落款三字段 |
| ProseA | 链接（Markdown 链接的渲染层） | `prose-a.md` | 用 `[文本](url)` 触发，可加 `{icon="…"}` |
| ProseCode | 行内代码 | `prose-code.md` | 用 `` `code`{lang="js" copy} `` 触发 |
| ProsePre | 代码块（围栏） | `prose-pre.md` | 语言、文件名、`wrap/expand/icon=` meta |
| ProseTable | 表格 | `prose-table.md` | 用 Markdown 表格语法触发，可切换换行 |
| Quote | 大号引用块 | `quote.md` | 大字图标装饰；与 Markdown `>` 引用不同 |
| Tab | 标签页 | `tab.md` | 每个标签页是一个动态具名插槽 `#tabN` |
| Timeline | 时间线 | `timeline.md` | 用 `{…}` 行当节点标题 |
| Tip | 悬停/点击小提示 | `tip.md` | 行内虚线下划线；`copy` 时点击复制 |
| VideoEmbed | 嵌入视频 | `video-embed.md` | 支持 B 站 / YouTube / 抖音 / TikTok / 直链 |

## C. 不属于作者 API 的组件

以下目录中的组件是站点内部结构，**不要在 Markdown 中使用**：

- `app/components/blog/**`（`BlogHeader.global.vue` 除外）、`app/components/post/**`、`app/components/widget/**`、`app/components/popover/**`
- `app/components/partial/**`：注册前缀为 `Z`（如 `ZButton`），属内部 UI
- `app/components/util/**`：`UtilImg` / `UtilLink` / `UtilDate` / `UtilHydrateSafe`，内部基础件

## D. 源码确认但 `content` 中未发现使用（`source-confirmed / usage-not-found`）

| capability | reference | 说明 |
| --- | --- | --- |
| MdTitle | `md-title.md` | 无任何引用，建议不要使用 |
| FeedCard / FeedGroup | `feed-card.md`、`feed-group.md` | 在 `app/pages/link.vue` 中使用，`content/**` 中未用 MDC 调用 |
| Key（`@press` 事件） | `key.md` | `emit('press')` 存在，站点搜索框在用；`content` 中未用 |

其余差异见各 reference 的 `Status` 段。
