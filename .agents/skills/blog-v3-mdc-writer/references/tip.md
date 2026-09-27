# Tip

## Status

- Author-facing: yes
- Source: `app/components/content/Tip.vue`
- Source verified: yes
- Usage verified: yes（`content/link.md`、`content/posts/**`、`content/previews/example.md`）

## Purpose

行内「带下划线的词」，鼠标悬停或聚焦时弹出小气泡说明，可选点击复制。适合术语解释与「点这里复制」的邮箱、地址。

## Syntax

```mdc
:tip[我是一条小提示]{tip="提示的内容是提示"}

:tip[links@example.com]{copy}
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `text` | `string` | — | 纯文本写法，等价于默认插槽 |
| `tip` | `string` | `copy ? '点击复制' : ''` | 气泡内容 |
| `icon` | `string \| boolean` | `undefined` | 图标名；`copy` 时复制成功自动换成对勾 |
| `copy` | `boolean` | — | 点击 / 回车复制插槽文本，气泡默认文案变「点击复制」 |
| `tipOptions` | `TippyOptions` | — | 透传给 tippy 的选项（如 `placement`、`delay`） |

### `tipOptions` 在 Markdown 中

它是对象类型，MDC 里需写成绑定表达式，例如 `{:tip-options="{ placement: 'bottom' }"}`。该写法**源码可行但 `content/` 中无使用实例**，谨慎使用。

## Slots

- 默认插槽（`#default`）：下划线文字

## Special syntax

- 气泡默认合并 `{ inlinePositioning: true }`，可与 `tipOptions` 覆盖。
- 组件是 `<span tabindex="0">`：**键盘 Tab 聚焦也会弹出**，`Enter` 触发复制（`@keypress.enter`）。
- 复制能力复用 `useCopy`，复制成功后图标切为 `tabler:check`。
- 样式为虚线 `underline` + `text-underline-offset: 4px`。

## Minimal example

```mdc
:tip[术语]{tip="解释"}
```

## Complete example

```mdc
- 申请方式：在评论区留言或发送邮件到 :tip{text="links@iicemeta.com" copy}
  - 以 :tip[任意形式]{tip="指向信息的 URL、自然语言、编程语言"} 附上友链信息
```

## Common mistakes

1. 写了 `{copy}` 却没写 `{tip="…"}` —— 气泡会自动变成「点击复制」，符合预期；但如果两者都不写，气泡内容为空。
2. 在 `tip` 里写 Markdown —— 气泡是纯文本渲染，`**粗体**` 会原样显示。
3. 期望它是块级提示框 —— 那是 `alert.md`；`Tip` 只作用于行内文字。
4. 想复制长段多行文本 —— 复制的是插槽文本，多行排版会破坏行内流。

## Related references

- `copy.md`、`alert.md`、`prose-a.md`
