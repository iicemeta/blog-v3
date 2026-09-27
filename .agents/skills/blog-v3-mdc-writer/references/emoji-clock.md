# EmojiClock

## Status

- Author-facing: yes
- Source: `app/components/content/EmojiClock.vue`
- Source verified: yes
- Usage verified: yes（`content/previews/example.md`；正文中未使用）

## Purpose

用时钟 Emoji 显示时间。默认每 30 分钟变一次，`rotate` 模式更细（5 分钟）并让 Emoji 真的转动。

## Syntax

```mdc
:emoji-clock (半小时) :emoji-clock{rotate} (5 分钟) :emoji-clock{datetime="2024-11-09 23:39:30"} (指定时间)
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `datetime` | `string` | 当前时间 | 指定时间；不写则用当前时间并每 30s 刷新 |
| `rotate` | `boolean` | `false` | 精细模式：按 5 分钟取 Emoji，并旋转指针 |

## Slots

无。

## Special syntax

- **默认模式**：从 24 个半点 Emoji（`🕛🕧🕐…`）里按 `hour * 2 + round(minute/30)` 取值，不旋转。
- **`rotate` 模式**：从 12 个整点 Emoji 里取值，并加 `transform: rotate(Ndeg)`（源码注释：5 分钟粒度）。
- `datetime` 通过 `toZonedTemporal` 解析，支持 `ZonedDateTime` / `Instant` / `PlainDateTime` 字符串；站点时区为 `blogConfig.timeZone`。
- 不传 `datetime` 时用 `useIntervalFn` 每 30 秒更新，且**只在客户端启动**（否则 `nuxt generate` 无法自动退出）。

## Minimal example

```mdc
现在 :emoji-clock
```

## Complete example

```mdc
:emoji-clock (半小时) :emoji-clock{rotate} (5 分钟) :emoji-clock{datetime="2024-11-09 23:39:30"} (指定时间)
```

## Common mistakes

1. 传 `datetime` 时期待它继续走动 —— 传了就是静态值，定时器不会启动。
2. 在需要精确时间的地方使用 —— 它是装饰组件，不显示数字时间。要显示精确时间用 `UtilDate`（站点内部组件，不在 Markdown API 中）。
3. 传非法日期字符串 —— `toZonedTemporal` 会抛错。

## Related references

- `article-frontmatter.md`（`date` 字段格式）、`mdc-syntax.md`
