# Chat

## Status

- Author-facing: yes
- Source: `app/components/content/Chat.vue`
- Source verified: yes
- Usage verified: yes（`content/previews/example.md`；正文中未使用）

## Purpose

把一组「说话人 + 消息」渲染成聊天记录气泡。说话人行单独成段、用花括号包裹，气泡自动分左右。

## Syntax

```mdc
::chat
{.纸鹿}

我还可以有名字

{:纸鹿撤回了一条消息}

有趣\
我学到了。
::
```

## Props

无。

## Slots

- 默认插槽（`#default`）：由**段落**组成，段落类型由它的文本内容决定

## Special syntax

段落文本必须**整段**匹配 `^\{(?<control>\.|:)?(?<caption>.*)\}$` 才会被识别为「说话人行」（`Chat.vue` 的 `chatRegex`）：

| 段落写法 | 渲染 | 类名 |
| --- | --- | --- |
| `{:2024-11-09 23:39:30}`、`{:纸鹿撤回了一条消息}` | 系统消息（居中） | `chat-caption chat-system` |
| `{.}` | 我方标记；**紧随其后**的消息气泡靠右、用主色底 | `chat-caption chat-myself` |
| `{.纸鹿}` | 同上，且标签显示「纸鹿」 | `chat-caption chat-myself` |
| `{用户1}`、`{纸鹿}` | 普通说话人标签（居中不变，只是淡色小字） | `chat-caption` |
| 其它段落 | 消息气泡 | `chat-body`（`<dd>`） |

- `{.}` / `{.名字}` 的效果来自 CSS 相邻选择器 `> .chat-myself + .chat-body`：**靠右样式作用在紧跟其后的消息上**，所以说话人行必须紧邻消息。
- 行尾 `\` 可在一条消息里换行。

## Minimal example

```mdc
::chat
{用户1}

你好\

我学到了。
::
```

## Complete example

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

## Common mistakes

1. 写成 `{. 纸鹿}` 或 `{ .纸鹿}` —— 花括号内不能有空格，否则不匹配正则，会变成普通消息。
2. 说话人行与消息之间插入空行以外的内容 —— 中间隔了别的段落，靠右样式就会错位。
3. 用 `::chat` 包裹复杂块（表格、代码块）—— 渲染函数按「段落」映射成 `<dt>`/`<dd>`，复杂结构会破坏 `<dl>` 语义。
4. 期望 `{.}` 后面的每条消息都靠右 —— 只影响紧接着的那一条。

## Related references

- `timeline.md`（同为「花括号行 = 标题」的模式）、`mdc-syntax.md`
