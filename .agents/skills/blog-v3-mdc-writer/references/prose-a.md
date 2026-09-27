# ProseA（链接）

## Status

- Author-facing: yes（用 Markdown 链接语法触发，不写组件名）
- Source: `app/components/content/ProseA.vue`、`app/components/util/Link.vue`、`shared/utils/link.ts`、`shared/utils/icon.ts`
- Source verified: yes
- Usage verified: yes（`content/**`、`content/previews/example.md`）

## Purpose

所有 Markdown 链接的渲染层：站外链接自动新窗口打开、悬停显示域名、按域名自动配图标。

## Syntax

```md
[内部链接](#锚点)
[站外链接](https://zhilu.site)
[自定义图标链接](https://github.com/){icon="tabler:color-swatch"}
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `href` | `string` | — | **必填**。由 Markdown 链接语法自动传入 |
| `icon` | `string \| false` | 按域名自动推断 | Iconify 图标名；`false` 关闭图标 |

## Slots

- 默认插槽（`#default`）：链接文字

## Special syntax

### 自动行为

| 行为 | 依据 |
| --- | --- |
| 站外链接加 `target="_blank"` | `UtilLink` 用 `isExtLink(to)` 判断 |
| 悬停气泡显示域名 / 解码后的链接 | `v-tip` + `getDomain` / `safelyDecodeUriComponent` |
| 自动配域名图标 | `getDomainIcon`：先查专门域名表（`domainIcons`），再查主域名表（`mainDomainIcons`），未命中不显示图标 |
| 链接文字带主色下划线，悬停时底色铺满 | 组件样式 |

`isExtLink` 判定：包含 `:`、以 `//` 开头、或是文件路径。

### 已收录图标的域名（`shared/utils/icon.ts`）

- 主域名：`bilibili.com`、`github.com`、`github.io`、`google.cn`、`google.com`、`creativecommons.org`、`feishu.cn`、`larkoffice.com`、`microsoft.com`、`netlify.app`、`pages.dev`、`qq.com`、`taobao.com`、`tmall.com`、`thisis.host`、`v2ex.com`、`vercel.app`、`zhihu.com`、`jd.com`、`zabaur.app`
- 专门域名（优先级更高）：`developer.mozilla.org`、`h5.qzone.qq.com`、`mp.weixin.qq.com`

### 与域名图标无关的写法

锚点链接（`#xxx`）渲染为普通 `<a>`，不加 `target`；`icon` 为 `false` 时不渲染图标。

## Minimal example

```md
[这是内部链接](#链接-prosea)。
```

## Complete example

```md
[这是内部链接](#链接-prosea)。[站外链接](https://zhilu.site) 默认在新标签页打开，并在鼠标悬浮时展示域名。

还会根据域名展示图标，例如 [微软文档](https://learn.microsoft.com/zh-cn/)、[GitHub](https://github.com/)、[Bilibili](https://www.bilibili.com/)。

::alert{title="自定义图标"}
你可以将 `icon` 属性指定 Iconify 图标名，例如 [a](#链接-prosea){icon="tabler:color-swatch"}。
::

[不显示图标](https://example.com){icon=false}
```

## Common mistakes

1. `{icon="ph:star"}` 之类写了不存在的图标集 —— Nuxt Icon 按需加载，未安装的集合不会显示。
2. 想关掉图标却写 `{icon=""}` —— 空字符串仍是 `string`，图标位为空；应写 `{icon=false}`。
3. 期望自动图标覆盖所有站点 —— 未收录的域名没有图标。注意：`content/previews/example.md` 说图标映射在 `app/utils/icon.ts`，**实际文件是 `shared/utils/icon.ts`**（`getDomainIcon`）；新增映射属工程改动，不在写作范围内。
4. 给 `#anchor` 加 `_blank` 期待 —— 锚点不会新开标签。

## Related references

- `badge.md`、`link-card.md`、`markdown-extensions.md`
