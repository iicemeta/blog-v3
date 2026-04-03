# Blog V3 MDC 组件语法参考

> 本文档详细记录了 blog-v3 项目中所有可用的 MDC 组件及其语法。
> MDC (Markdown Components) 是 Nuxt Content 的扩展语法，允许在 Markdown 中使用 Vue 组件。

---

## 基础语法规则

### 1. 块级组件（双冒号）

用于包裹多行内容的组件：

```mdc
::组件名{属性="值"}
内容
::
```

### 2. 行内组件（单冒号）

用于行内的简短组件：

```mdc
:组件名{属性="值"}

:组件名[内容]{属性="值"}
```

### 3. 插槽语法

使用 `#插槽名` 定义具名插槽：

```mdc
::组件名
#插槽名1
内容1

#插槽名2
内容2
::
```

### 4. YAML Frontmatter 传参

某些组件支持 YAML 格式传递复杂参数：

```mdc
::组件名
---
属性1: 值1
属性2: 值2
---
::
```

---

## 组件清单

### Alert 警告/提示框

**文件**: `app/components/content/Alert.vue`

**Props**:
- `type`: 类型 - `'tip' | 'info' | 'question' | 'warning' | 'error'` (默认: 'tip')
- `card`: 卡片风格 - `boolean`
- `flat`: 扁平风格 - `boolean`
- `icon`: 自定义图标 - `string` (Iconify 图标名)
- `color`: 自定义颜色 - `string`
- `title`: 标题 - `string`
- `text`: 纯文本内容 - `string`

**用法示例**:

```mdc
::alert
你好
::

::alert{type="question"}
默认插槽的 [超链接](#) **粗体** `Inline code`
::

::alert{type="info" title="自定义标题"}
默认插槽的 [超链接](#) **粗体** `Inline code`
::

::alert{type="warning" card}
#title
卡片风格 标题插槽的 [超链接](#) **粗体** `Inline code`
#default
默认插槽的 [超链接](#) **粗体** `Inline code`
::

::alert{type="error" flat}
#title
扁平风格 标题插槽的 [超链接](#) **粗体** `Inline code`
#default
默认插槽的 [超链接](#) **粗体** `Inline code`
::

:alert{icon="ph:files-duotone" color="var(--c-accent)" title="仅标题，并且自定义图标和颜色"}
```

---

### Badge 徽章/标签

**文件**: `app/components/content/Badge.vue`

**Props**:
- `img`: 图片 URL - `string`
- `text`: 文本内容 - `string`
- `link`: 链接地址 - `string`
- `round`: 圆形样式 - `boolean`
- `square`: 方形样式 - `boolean`

**用法示例**:

```mdc
:badge[普通带链接]{link="#badge"}

:badge[纯文本指定圆形]{round}

:badge[纯文本指定方形]{square}

:badge[带个图]{img="https://picsum.photos/100/100"}

:badge[纸鹿]{link="https://www.zhilu.site"}

:badge[古怪杂记本]{link="https://gug.thisis.host/" square}

:badge[KazariEX]{link="https://github.com/KazariEX"}

:badge{img="https://picsum.photos/100/100" text="带链接" link="#badge"}
```

**特性**:
- 外部域名自动获取站点 favicon
- GitHub 链接自动识别头像
- 有图时默认圆形，无图时默认方形

---

### Tab 标签页

**文件**: `app/components/content/Tab.vue`

**Props**:
- `tabs`: 标签标题数组 - `string[]` (必填)
- `center`: 居中显示 - `boolean`
- `active`: 默认激活的标签 - `string | number`

**插槽**:
- `#tab1`, `#tab2`, ... 对应每个标签页内容

**用法示例**:

```mdc
::tab{:tabs='["组件","语法"]'}
#tab1
这是第一个标签页的内容。
可以包含 [链接](#)、**粗体**、代码等。

#tab2
```mdc
::tab{:tabs='["组件","语法"]'}
#tab1
内容...
#tab2
代码...
::
```
::
```

---

### Folding 折叠面板

**文件**: `app/components/content/Folding.vue`

**Props**:
- `title`: 标题 - `string`
- `open`: 默认展开 - `boolean`

**插槽**:
- `#title`: 标题插槽（支持 Markdown）
- `#default`: 内容插槽

**用法示例**:

```mdc
::folding
#title
可以通过标题插槽传值 [超链接](#) **粗体** `Inline code`
#default
默认插槽的 [超链接](#) **粗体** `Inline code`

  ::folding{open title="折叠还可以嵌套"}
  默认展开的折叠。
  ::
::

::folding{open}
```md
- 默认展开的折叠。
```
::
```

**注意**: 嵌套使用时，内部组件的插槽语法必须缩进。

---

### Chat 聊天对话

**文件**: `app/components/content/Chat.vue`

**特殊语法**:
- `{.}` - 普通消息
- `{.名字}` - 带名字的消息（靠右显示）
- `{:内容}` - 系统消息（居中）

**用法示例**:

```mdc
::chat
{:2024-11-09 23:39:30}

{.}
也许

{.}
我们可以聊聊天

{.纸鹿}
我还可以有名字

{:纸鹿撤回了一条消息}

{用户1}
有趣\
我学到了。
::
```

---

### Copy 可复制代码

**文件**: `app/components/content/Copy.vue`

**Props**:
- `prompt`: 命令提示符 - `string | boolean` (默认: '$')
- `code`: 代码内容 - `string`
- `lang`: 语言 - `string` (自动推断)

**用法示例**:

```mdc
:copy{code="rm -rf # 修改命令后再复制，也可撤销修改"}

:copy{prompt code="不带提示符的命令，可以是 URL、单行代码"}

:copy{prompt="自定义命令提示符、高亮语言" lang="js" code="const customLang = 'js'"}
```

---

### Key 键盘按键

**文件**: `app/components/content/Key.vue`

**Props**:
- `text`: 显示文本 - `string`
- `code`: 按键代码 - `string`
- `icon`: 显示图标（macOS 默认） - `boolean`
- `ctrl`, `shift`, `alt`, `meta`, `win`: 修饰键 - `boolean`
- `cmd`: 智能适配（Win=Ctrl, Mac=Cmd） - `boolean`

**用法示例**:

```mdc
:key{code="Escape"} :key{code="F2"} :key{code="Control"}

:key{code="Control" icon} :key{alt icon} :key{shift icon}

:key{code="A" ctrl shift} :key{alt shift} :key{code="Escape" ctrl alt icon}
```

---

### LinkCard 链接卡片

**文件**: `app/components/content/LinkCard.vue`

**Props**:
- `link`: 链接地址 - `string` (必填)
- `title`: 标题 - `string` (必填)
- `description`: 描述 - `string`
- `icon`: 图标 URL - `string`
- `mirror`: 图片镜像服务 - `ImgService`

**用法示例**:

```mdc
::link-card
---
title: Nuxt Content 官方文档
icon: https://content.nuxt.com/favicon.ico
link: https://content.nuxt.com/
---
::
```

---

### Blur 模糊文本

**文件**: `app/components/content/Blur.vue`

**Props**:
- `text`: 文本内容 - `string`

**用法示例**:

```mdc
:blur[你知道得太多了。]

::blur
:::quote
也未必。
:::
::
```

---

### EmojiClock 表情时钟

**文件**: `app/components/content/EmojiClock.vue`

**Props**:
- `datetime`: 指定时间 - `string`
- `rotate`: 旋转模式 - `boolean`

**用法示例**:

```mdc
:emoji-clock

:emoji-clock{rotate}

:emoji-clock{datetime="2024-11-09 23:39:30"}
```

---

### CardList 卡片列表

**文件**: `app/components/content/CardList.vue`

**用法示例**:

```mdc
::card-list
- 无序列表项1
- 无序列表项2
  - 无序列表项2-1
    - 无序列表项2-1-1
  - 无序列表项2-2
::
```

---

### Quote 引用块

**文件**: `app/components/content/Quote.vue`

**Props**:
- `icon`: 图标 - `string` (默认: 'ph:chat-centered-text-duotone')

**用法示例**:

```mdc
:::quote
引用内容
:::

:::quote{icon="ph:star-duotone"}
带自定义图标的引用
:::
```

---

### Pic 图片

**文件**: `app/components/content/Pic.vue`

**Props**:
- `src`: 图片地址 - `string` (必填)
- `alt`: 替代文本 - `string`
- `caption`: 说明文字 - `string`
- `width`: 宽度 - `number`
- `height`: 高度 - `number`
- `mirror`: 图片镜像服务 - `ImgService`
- `zoom`: 是否开启灯箱缩放 - `boolean` (默认: true)
- `filter`: 图片滤镜 - `string`
- `densities`: 像素密度 - `string`

**插槽**:
- `#caption`: 说明文字插槽（支持 Markdown）

**用法示例**:

```mdc
::pic
---
src: https://picsum.photos/480/240
caption: 说明文字
---
::
```

**带尺寸限制**:

```mdc
::pic
---
src: https://picsum.photos/480/240
width: 400
caption: 限制最大宽度为400px
---
::
```

**关闭灯箱缩放**:

```mdc
::pic
---
src: https://picsum.photos/480/240
zoom: false
caption: 点击不会放大
---
::
```

**使用插槽自定义说明**:

```mdc
::pic
---
src: https://picsum.photos/480/240
---
#caption
支持 **Markdown** 的说明文字
::
```

---

### Timeline 时间线

**文件**: `app/components/content/Timeline.vue`

**特殊语法**:
- `{标题}` - 时间线标题
- 普通内容 - 时间线内容

**用法示例**:

```mdc
::timeline
{2024年}
发生了一些事情...

{2025年}
又发生了一些事情...
::
```

---

### MusicScore 乐谱

**文件**: `app/components/content/MusicScore.vue`

**Props**:
- `abc`: ABC 记法乐谱 - `string`

**用法示例**:

```mdc
```music-abc
L:1/8
Q:1/4=100
M:2/4
K:D
"D" FA A>B | AF DD/E/ |1 "G" FF ED | "A" E2 z2 :|2 "G" FF "A" EE | "D" D2 z2 ||
```
```

---

### FeedCard / FeedGroup 友链卡片

用于友链页面展示链接。

---

## Markdown 增强语法

### 代码块

支持特殊 meta 标记：

````md
```语言 [文件名] icon=图标 wrap expand
代码内容
```
````

**Meta 标记**:
- `wrap`: 自动换行
- `expand`: 禁用自动折叠
- `icon=图标名`: 自定义图标

### 数学公式

```md
$行内公式$

$$块级公式$$

```math
多行公式
```
```

### 特殊 CSS 类

用于行内元素：

```md
[文字]{.text-story}     - 故事感文字
[文字]{.text-repeat}    - 阴影回声效果
[文字]{.text-zoom}      - 滚动放大效果
[文字]{.title-like}     - 标题样式（仅在 type: story 时生效）
```

图片：

```md
![图片](url){.icon}     - 图标样式
```

### 链接增强

```md
[链接](#){icon="ph:swatches-duotone"}  - 带图标的链接
```

---

## Front Matter

文章头部配置：

```yaml
---
title: 文章标题
description: 文章描述
date: 2024-09-21 23:18:18
updated: 2025-02-12 11:18:33
type: story          # 故事风格样式
image: 封面图URL
categories: [分类1, 分类2]
tags: [标签1, 标签2]
---
```

---

## 图标系统

- 使用 Iconify 图标
- 搜索: https://icon-sets.iconify.design/ 或 https://yesicon.app/
- 格式: `ph:图标名` (Phosphor 图标集)

---

## 注意事项

1. **插槽缩进**: 嵌套组件的插槽语法必须正确缩进
2. **属性引号**: 属性值包含特殊字符时使用单引号包裹
3. **YAML 格式**: 使用 `---` 包裹 YAML 参数时，注意缩进和冒号后的空格
4. **布尔值**: MDC 中布尔属性直接写属性名即可，如 `{open}` 而非 `{open=true}`
