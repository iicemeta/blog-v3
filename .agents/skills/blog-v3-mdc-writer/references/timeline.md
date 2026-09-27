# Timeline

## Status

- Author-facing: yes
- Source: `app/components/content/Timeline.vue`
- Source verified: yes
- Usage verified: yes（`content/previews/example.md`；正文中未使用）

## Purpose

竖直时间线：节点标题 + 内容卡片，左侧一条竖线与圆点。

## Syntax

```mdc
::timeline
{前天}

看到了小兔

{昨天}

是小鹿
::
```

## Props

无。

## Slots

- 默认插槽（`#default`）：由**段落**组成

## Special syntax

段落文本必须**整段**匹配 `^\{(?<caption>.*)\}$` 才会成为节点标题（`timelineRegex`）：

| 段落 | 渲染 | 类名 |
| --- | --- | --- |
| `{标题}` | 节点标题行（带圆点） | `timeline-caption` |
| 其它段落 | 内容卡片（复用 `.card` 样式） | `timeline-body` |

- 竖线为 `::before` 伪元素（`--c-bg-soft`），圆点为 `.timeline-caption::before`。
- 内容卡片 `width: fit-content`、`max-width: 100%`。
- 源码 TODO 注明时间线样式尚未打磨。

## Minimal example

```mdc
::timeline
{今天}

干了点活。
::
```

## Complete example

```mdc
::timeline
{前天}

看到了小兔

{昨天}

是小鹿

{今天}

是你。
::

::timeline
{今日无事}

{今日依旧无事}

{然后——}

一件事\
两件事。

*再添一笔*。
::
```

## Common mistakes

1. `{ 标题 }` 带空格 —— 不匹配正则，会变成普通内容卡片。
2. 标题与内容之间不留空行 —— 会被当成同一段。
3. 期望有排序 / 时间字段 —— 它不做排序，顺序就是书写顺序。
4. 用 `#标题`（MDC 插槽语法）—— 那是插槽写法，不是这里的节点语法。

## Related references

- `chat.md`（同为花括号行模式）、`card-list.md`
