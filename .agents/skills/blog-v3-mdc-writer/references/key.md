# Key

## Status

- Author-facing: yes
- Source: `app/components/content/Key.vue`
- Source verified: yes
- Usage verified: yes（`content/previews/example.md`；正文中的 `:key` 多为代码示例）→ 组件用法 usage-confirmed，`@press` 用法 `usage-not-found`

## Purpose

行内键盘按键样式，可组合修饰键，按真实按下时高亮。

## Syntax

```mdc
:key{code="Control"} :key{code="A" ctrl shift}
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `text` | `string` | — | 直接显示的文字，优先于所有按键推导 |
| `code` | `string` | — | `KeyboardEvent.key` 值，如 `Escape`、`F2`、`A`、` `、`Tab`、`Enter`、`ArrowUp` |
| `icon` | `boolean` | `undefined` | 是否用符号显示。`undefined` 时：macOS 显示符号、其它系统显示文字；`false` 强制文字 |
| `ctrl` | `boolean` | — | 加 Ctrl / Control 键 |
| `shift` | `boolean` | — | 加 Shift 键 |
| `alt` | `boolean` | — | 加 Alt 键 |
| `meta` | `boolean` | — | 加 Cmd / Win 键（`cmd` 为真时忽略） |
| `win` | `boolean` | — | 加 Win 键（`meta` 为真时忽略） |
| `cmd` | `boolean` | — | 智能适配：macOS → Cmd，其它 → Ctrl |
| `prevent` | `boolean` | — | 命中时调用 `event.preventDefault()` |

### 组合顺序（源码 `keyConfigs`）

`cmd` → `ctrl` → `shift` → `alt` → `meta` → `win` → `code`，非 macOS 下用 `+` 连接，符号模式下直接拼接。

### 显示映射（源码 `displayMap` / `symbolMap`）

| 传入 `code` | 文字显示 | 符号显示 |
| --- | --- | --- |
| `' '` | Space | ␣ |
| `Control` | Ctrl | ⌃ |
| `Meta` | macOS `Cmd` / 其它 `Win` | ⌘ / ⊞ |
| `Escape` | Esc | ⎋ |
| `Delete` | Del | ⌦ |
| `Enter` | Enter | ↵ |
| `Tab` | Tab | ⇥ |
| `Backspace` | Backspace | ⌫ |
| `ArrowUp/Down/Left/Right` | ↑ ↓ ← → | 同左 |
| 其它 | 原样 | 原样 |

## Slots

- 默认插槽（`#default`）：覆盖 `codeDisplay`

## Special syntax

- `emit('press')`：按键按下或点击时触发。站点内部用法见 `app/components/blog/BlogSidebar.vue`、`app/components/popover/Search.vue`（`code="K" cmd prevent @press="..."`）。
- 按键高亮依赖 `useKeyModifier` 实时读取修饰键状态。

## Minimal example

```mdc
:key{code="Escape"} :key{code="F2"} :key{code="Control"}
```

## Complete example

```mdc
- 纯 Code

  :key{code="Escape"} :key{code="F2"} :key{code="Control"} :key{code="A"} :key{code=" "} :key{code="Tab"} :key{code="Enter"}

- 指定修饰符、图标、文本（macOS 自动使用图标）

  :key{code="Control" icon} :key{alt icon} :key{shift icon} :key{code=" " text="空格"} :key{code="Tab" icon} :key{code="Enter" icon}

- 组合键

  :key{code="A" ctrl shift} :key{alt shift} :key{code="Escape" ctrl alt icon}
```

## Common mistakes

1. `:key{code="Ctrl"}` —— 匹配用的是 `KeyboardEvent.key`，控制键的值是 `Control`（`Ctrl` 只是显示名）。用 `Ctrl` 会导致按下时不亮、`@press` 不触发。
2. `:key{code="+" ctrl}` —— 写成 `code="+"` 不会显示成加号；组合键之间自动加 `+`，不要手写。
3. 在 Markdown 里用块形式 `::key` —— 它是行内组件，块形式会撑成独立段落。
4. 期望 `prevent` 在 Markdown 里可用 —— 属性存在，但正文里通常不希望拦截读者按键。

## Related references

- `copy.md`、`css-classes.md`
