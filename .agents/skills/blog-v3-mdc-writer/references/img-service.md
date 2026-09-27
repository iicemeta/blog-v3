# mirror（图片服务）

## Status

- Author-facing: yes
- Source: `app/utils/img.ts`（`ImgService`、`getImgUrl`）、`app/components/util/Img.vue`
- Source verified: yes
- Usage verified: no（`content/**` 中仅出现在注释里，如 `# mirror: # 是否借助第三方图片加载服务`）

## Purpose

`Pic` / `LinkCard` / `LinkBanner` 的 `mirror` 属性会把图片地址改写为第三方图片代理，用于绕过防盗链、统一压缩格式。取值集合由源码枚举决定。

## Supported values

`type ImgService = keyof typeof services | boolean`

| 取值 | 改写为 | 说明 |
| --- | --- | --- |
| `true` | `https://fly.webp.se/?url=` | **等效于 `fly`** |
| `baidu` | `https://image.baidu.com/search/down?url=` | 百度图片代理 |
| `fly` | `https://fly.webp.se/?url=` | webp.se 的 fly 服务 |
| `weserv` | `https://wsrv.nl/?url=` | wsrv.nl |
| 不传 / `false` | 原样使用 | 默认 |

写成 `mirror="weserv"`（字符串）或 `mirror: weserv`（YAML）。设了 `mirror` 时组件会给 `<img>` 加上 `referrerpolicy="no-referrer"`（`util/Img.vue`）。

## Minimal example

```mdc
::pic
---
src: https://example.com/blocked.png
mirror: weserv
caption: 通过 wsrv.nl 加载
---
::
```

## Common mistakes

1. 写 `mirror="true"` 字符串 —— 会被当成未知服务名，`getImgUrl` 原样返回、不生效。要写裸 `true`（YAML 中 `mirror: true`）。
2. 对**站内**图片使用 `mirror` —— 站内图片已由 `@nuxt/image` 处理，多此一举且 `referrerpolicy` 无意义。
3. 以为 `mirror` 能解决一切 —— 部分服务对防盗链源站仍然返回失败图。

## Related references

- `pic.md`、`link-card.md`、`link-banner.md`
