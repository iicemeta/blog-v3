# ABC 乐谱（```music-abc）

## Status

- Author-facing: yes（通过代码围栏，不是直接调用组件）
- Source: `nuxt.config.ts` → `remark-code-component` 的 `'music-abc': { component: 'music-score', prop: 'abc' }`；组件 `app/components/content/MusicScore.vue`
- Source verified: yes
- Usage verified: yes（`content/previews/example.md`）

## Purpose

把 ABC 记法渲染成五线谱，并在网络可用时提供播放控制条。

## Syntax

````md
```music-abc
L:1/8
Q:1/4=100
M:2/4
K:D
"D" FA A>B | AF DD/E/ |1 "G" FF ED | "A" E2 z2 :|2 "G" FF "A" EE | "D" D2 z2 ||
```
````

## How it works

```text
music-abc 代码围栏
  → remark-code-component：lang = 'music-abc'
  → <MusicScore abc="…" />
  → MusicScore.vue：import('abcjs') 渲染；若能连通 SoundFonts 才启用播放
```

- 组件 props（直接调用时）：`abc: string`（必填）。
- 播放能力依赖 `https://paulrosen.github.io/midi-js-soundfonts/` 的 HEAD 探测结果；不通时只渲染谱面、不显示播放条。
- 可视化参数固定：`responsive: 'resize'`；控制条含循环、重播、播放、进度、速度。
- 组件卸载时会 `pause()`，避免离开页面后继续出声。

## Special syntax

- 围栏必须是 `music-abc`（带连字符）。
- 围栏 meta（如 `wrap`）会被忽略，只取代码内容。
- 记法与检查工具：<https://editor.drawthedots.com/>。

## Minimal example

````md
```music-abc
K:C
C D E F | G A B c |
```
````

## Complete example

````md
```music-abc
L:1/8
Q:1/4=100
M:2/4
K:D
V:1 clef=treble
V:2 clef=bass
%%MIDI program 32
[V:1] z2 z f/g/ | aa a>b | af dd/e/ | ff ee | d2 z2 || FA A>B | AF DD/E/ |
w: | | | | | 你 爱 我 | 我 爱 你 蜜 雪
[V:2] z4 | D,[F,A,] .A,[F,A,] | .D,[F,A,] .A,[E,A,] | .G,,[G,D,] .A,,[E,A,] | .D,[F,A,] [D,,D,]2 || .D,,[D,F,] .A,,[D,F,] | .D,,[D,F,] .A,,[D,F,] |
```
````

## Common mistakes

1. 语言写成 `abc` / `abcjs` / `music` —— 只有 `music-abc` 会被转换。
2. ABC 头部缺少必需的 `K:`（调号）→ 渲染失败。
3. 期待一定有播放按钮 —— 无网络或无音频支持时只有谱面。
4. 把多首曲子写在同一个围栏里。

## Related references

- `mermaid.md`、`prose-pre.md`
