<script setup lang="tsx">
import type { TippyComponent } from 'vue-tippy'
import Giscus from '@giscus/vue'

const appConfig = useAppConfig()

const commentEl = useTemplateRef('comment')
const popoverEl = useTemplateRef<TippyComponent>('popover')
const popoverJumpTo = ref('')
const popoverInputEl = useTemplateRef('popover-input')
const showUndo = ref(false)

const popoverBind = ref<TippyComponent['$props']>({})

/** 评论区链接守卫 */
useEventListener(commentEl, 'click', (e) => {
	if (!(e.target instanceof Element))
		return

	if (e.target.matches('.tk-avatar-img'))
		e.stopPropagation()

	const popoverTarget = e.target.closest('a[target="_blank"]')
	if (!(popoverTarget instanceof HTMLAnchorElement))
		return

	e.preventDefault()
	popoverEl.value?.hide()

	popoverJumpTo.value = safelyDecodeUriComponent(popoverTarget.href)
	popoverBind.value = {
		getReferenceClientRect: () => popoverTarget.getBoundingClientRect(),
		triggerTarget: popoverTarget,
	}

	nextTick(checkUndoable)
	popoverEl.value?.show()
}, { capture: true })

function checkUndoable() {
	showUndo.value = popoverInputEl.value?.textContent !== popoverJumpTo.value
}

function undo() {
	if (!popoverInputEl.value)
		return
	popoverInputEl.value.textContent = popoverJumpTo.value
	checkUndoable()
}

function confirmOpen() {
	window.open(popoverInputEl.value?.textContent, '_blank')
}

/* ========== fork: Giscus ========== */

// Giscus 使用自定义主题，通过 CSS 变量覆盖默认样式
const giscusTheme = computed(() => {
	return 'custom'
})

const giscusConfig = computed(() => {
	const cfg = appConfig.giscus
	if (!cfg)
		return null
	return {
		repo: (cfg.repo || 'owner/repo') as `${string}/${string}`,
		repoId: cfg.repoId || '',
		category: cfg.category || 'Announcements',
		categoryId: cfg.categoryId || '',
		mapping: (cfg.mapping || 'pathname') as 'pathname' | 'url' | 'title' | 'og:title' | 'specific' | 'number',
		strict: (cfg.strict || '0') as '0' | '1',
		reactionsEnabled: (cfg.reactionsEnabled || '1') as '0' | '1',
		emitMetadata: (cfg.emitMetadata || '0') as '0' | '1',
		inputPosition: (cfg.inputPosition || 'bottom') as 'top' | 'bottom',
		lang: cfg.lang || 'zh-CN',
		loading: (cfg.loading || 'lazy') as 'eager' | 'lazy',
	}
})
</script>

<template>
<section ref="comment" class="z-comment">
	<h3 class="text-creative">
		评论区
	</h3>

	<!-- interactive 默认会把气泡移动到 triggerTarget 的父元素上 -->
	<Tooltip
		ref="popover"
		v-bind="popoverBind"
		:append-to="() => commentEl!"
		interactive
		:aria="{ expanded: false }"
		trigger="focusin"
	>
		<template #content>
			<div class="popover-confirm">
				<span
					ref="popover-input"
					class="input"
					contenteditable="plaintext-only"
					spellcheck="false"
					@input="checkUndoable"
					@keydown.enter.prevent="confirmOpen"
					v-text="popoverJumpTo"
				/>

				<button
					v-if="showUndo"
					aria-label="恢复原始内容"
					@click="undo()"
				>
					<Icon name="tabler:arrow-back-up" />
				</button>

				<ZButton
					primary
					text="访问"
					@click="confirmOpen"
				/>
			</div>
		</template>
	</Tooltip>

	<!-- 上游 Twikoo 挂载点（本 fork 使用 Giscus，由下方样式隐藏，保留以便合并） -->
	<div id="twikoo">
		<p>评论加载中...</p>
	</div>

	<!-- fork: Giscus 评论系统 -->
	<ClientOnly>
		<div id="giscus" class="giscus-container">
			<Giscus
				v-if="giscusConfig"
				:repo="giscusConfig.repo"
				:repo-id="giscusConfig.repoId"
				:category="giscusConfig.category"
				:category-id="giscusConfig.categoryId"
				:mapping="giscusConfig.mapping"
				:strict="giscusConfig.strict"
				:reactions-enabled="giscusConfig.reactionsEnabled"
				:emit-metadata="giscusConfig.emitMetadata"
				:input-position="giscusConfig.inputPosition"
				:theme="giscusTheme"
				:lang="giscusConfig.lang"
				:loading="giscusConfig.loading"
			/>
		</div>
	</ClientOnly>
</section>
</template>

<style scoped>
.z-comment {
	margin: 3rem 1rem;

	> h3 {
		margin-top: 3rem;
		font-size: 1.25rem;
	}
}

:deep() > [data-tippy-root] > .tippy-box {
	padding: 0;
}

.popover-confirm {
	display: flex;
	align-items: center;
	overflow-wrap: anywhere;

	> .input {
		min-width: 0;
		padding: 0.3em 0.6em;
		outline: none;
	}

	> button {
		flex-shrink: 0;
		align-self: stretch;
		padding: 0.3em;
		border-radius: 0 0.5em 0.5em 0;
	}
}

:deep(#twikoo) {
	margin: 2em 0;

	.tk-admin-container {
		position: fixed;
		z-index: calc(var(--z-index-popover) + 1);
	}

	.tk-input {
		font-family: var(--font-monospace);
	}

	.tk-avatar {
		border-radius: 50%;

		@supports (corner-shape: squircle) {
			corner-shape: superellipse(1.2);
		}
	}

	.tk-avatar.tk-clickable {
		cursor: auto;
	}

	.tk-time {
		color: var(--c-text-3);
	}

	/* 防止 a 被 overflow hidden */
	.tk-content {
		margin: -0.2em;
		padding: 0.2em;
	}

	.tk-comments-title, .tk-nick {
		font-family: var(--font-creative);
	}

	.tk-owo-emotion {
		width: auto;
		height: 1.4em;
		vertical-align: text-bottom;
	}

	.tk-extras, .tk-footer {
		font-size: 0.7em;
		color: var(--c-text-3);
	}

	.tk-replies:not(.tk-replies-expand) {
		mask-image: linear-gradient(to top, transparent, #FFF 4em);
	}

	.tk-expand {
		border-radius: 0.5em;
		transition: background-color 0.1s;
	}

	.tippy-svg-arrow > svg {
		fill: inherit;
		width: auto;
		height: auto;
	}
}

:deep(:where(.tk-preview-container,.tk-content)) {
	pre {
		overflow: auto;
		border-radius: 0.5em;
		font-size: 0.85em;
	}

	a {
		margin: -0.1em -0.2em;
		padding: 0.1em 0.2em;
		background: linear-gradient(var(--c-primary-soft), var(--c-primary-soft)) no-repeat center bottom / 100% 0.1em;
		color: var(--c-primary);
		transition: all 0.2s;

		&:hover {
			border-radius: 0.3em;
			background-size: 100% 100%;
		}
	}

	p {
		margin: 0.2em 0;
	}

	img {
		border-radius: 0.5em;
	}

	menu, ol, ul {
		margin: 0.5em 0;
		padding-inline-start: 1.5em;
		font-size: 0.9rem;
		list-style: revert;

		> li {
			margin: 0.2em 0;

			&::marker {
				color: var(--c-primary);
			}
		}
	}

	blockquote {
		margin: 0.5em 0;
		padding: 0.2em 0.5em;
		border-inline-start: 4px solid var(--c-border);
		border-radius: 4px;
		background-color: var(--c-bg-2);
		font-size: 0.9em;
	}
}
</style>

<style scoped>
/* ========== fork: Giscus 主题 ========== */

/* 隐藏上游 Twikoo 挂载点 */
#twikoo {
	display: none;
}

.giscus-container {
	min-height: 200px;
	margin: 2em 0;

	/* 基础颜色 */
	--color-prettylights-syntax-comment: var(--c-text-3);
	--color-prettylights-syntax-constant: var(--c-primary);
	--color-prettylights-syntax-entity: var(--c-primary);
	--color-prettylights-syntax-storage-modifier-import: var(--c-text-1);
	--color-prettylights-syntax-entity-tag: var(--c-success);
	--color-prettylights-syntax-keyword: var(--c-primary);
	--color-prettylights-syntax-string: var(--c-accent);
	--color-prettylights-syntax-variable: var(--c-text-1);
	--color-prettylights-syntax-brackethighlighter-unmatched: var(--c-error);
	--color-prettylights-syntax-invalid-illegal-text: var(--c-error);
	--color-prettylights-syntax-invalid-illegal-bg: var(--c-error-soft);
	--color-prettylights-syntax-carriage-return-text: var(--c-error);
	--color-prettylights-syntax-carriage-return-bg: var(--c-error-soft);
	--color-prettylights-syntax-string-regexp: var(--c-success);
	--color-prettylights-syntax-markup-list: var(--c-warning);
	--color-prettylights-syntax-markup-heading: var(--c-primary);
	--color-prettylights-syntax-markup-italic: var(--c-text-1);
	--color-prettylights-syntax-markup-bold: var(--c-text);
	--color-prettylights-syntax-markup-deleted-text: var(--c-error);
	--color-prettylights-syntax-markup-deleted-bg: var(--c-error-soft);
	--color-prettylights-syntax-markup-inserted-text: var(--c-success);
	--color-prettylights-syntax-markup-inserted-bg: var(--c-success-soft);
	--color-prettylights-syntax-markup-changed-text: var(--c-warning);
	--color-prettylights-syntax-markup-changed-bg: var(--c-warning-soft);
	--color-prettylights-syntax-markup-ignored-text: var(--c-text-3);
	--color-prettylights-syntax-markup-ignored-bg: var(--c-bg-2);
	--color-prettylights-syntax-meta-diff-range: var(--c-primary);
	--color-prettylights-syntax-brackethighlighter-angle: var(--c-text-3);
	--color-prettylights-syntax-sublimelinter-gutter-mark: var(--c-text-3);
	--color-prettylights-syntax-constant-other-reference-link: var(--c-primary);

	/* 按钮和交互元素 */
	--color-btn-text: var(--c-text-1);
	--color-btn-bg: var(--c-bg-2);
	--color-btn-border: var(--c-border);
	--color-btn-shadow: 0 0 transparent;
	--color-btn-inset-shadow: 0 0 transparent;
	--color-btn-hover-bg: var(--c-bg-3);
	--color-btn-hover-border: var(--c-primary);
	--color-btn-active-bg: var(--c-bg-3);
	--color-btn-active-border: var(--c-primary);
	--color-btn-selected-bg: var(--c-bg-3);
	--color-btn-focus-bg: var(--c-bg-2);
	--color-btn-focus-border: var(--c-primary);
	--color-btn-focus-shadow: 0 0 0 2px var(--c-primary-soft);

	/* 主按钮 */
	--color-btn-primary-text: var(--c-bg);
	--color-btn-primary-bg: var(--c-primary);
	--color-btn-primary-border: var(--c-primary);
	--color-btn-primary-shadow: 0 0 transparent;
	--color-btn-primary-inset-shadow: 0 0 transparent;
	--color-btn-primary-hover-bg: hsl(var(--hue-theme) 100% 45%);
	--color-btn-primary-hover-border: hsl(var(--hue-theme) 100% 45%);
	--color-btn-primary-selected-bg: var(--c-primary);
	--color-btn-primary-focus-bg: var(--c-primary);
	--color-btn-primary-focus-border: var(--c-primary);
	--color-btn-primary-focus-shadow: 0 0 0 2px var(--c-primary-soft);

	/* 输入框 */
	--color-input-text: var(--c-text-1);
	--color-input-bg: var(--c-bg);
	--color-input-border: var(--c-border);
	--color-input-shadow: 0 0 transparent;
	--color-input-inset-shadow: inset 0 1px 2px var(--c-bg-soft);
	--color-input-focus-bg: var(--c-bg);
	--color-input-focus-border: var(--c-primary);
	--color-input-focus-shadow: 0 0 0 2px var(--c-primary-soft);

	/* 背景 */
	--color-canvas-default: var(--c-bg-1);
	--color-canvas-overlay: var(--c-bg);
	--color-canvas-inset: var(--c-bg-2);
	--color-canvas-subtle: var(--c-bg-2);

	/* 边框 */
	--color-border-default: var(--c-border);
	--color-border-muted: var(--c-bg-2);

	/* 文字 */
	--color-fg-default: var(--c-text-1);
	--color-fg-muted: var(--c-text-2);
	--color-fg-subtle: var(--c-text-3);
	--color-fg-on-emphasis: var(--c-bg);

	/* 强调色 */
	--color-accent-fg: var(--c-primary);
	--color-accent-emphasis: var(--c-primary);
	--color-accent-muted: var(--c-primary-soft);
	--color-accent-subtle: var(--c-primary-soft);

	/* 成功/警告/错误 */
	--color-success-fg: var(--c-success);
	--color-success-emphasis: var(--c-success);
	--color-success-muted: var(--c-success-soft);
	--color-success-subtle: var(--c-success-soft);
	--color-warning-fg: var(--c-warning);
	--color-warning-emphasis: var(--c-warning);
	--color-warning-muted: var(--c-warning-soft);
	--color-warning-subtle: var(--c-warning-soft);
	--color-danger-fg: var(--c-error);
	--color-danger-emphasis: var(--c-error);
	--color-danger-muted: var(--c-error-soft);
	--color-danger-subtle: var(--c-error-soft);

	/* 反应按钮 */
	--color-reaction-button-text: var(--c-text-2);
	--color-reaction-button-bg: var(--c-bg-2);
	--color-reaction-button-border: var(--c-border);
	--color-reaction-button-hover-bg: var(--c-bg-3);
	--color-reaction-button-selected-bg: var(--c-primary-soft);
	--color-reaction-button-selected-border: var(--c-primary);
	--color-reaction-button-selected-text: var(--c-primary);

	/* 时间线 */
	--color-timeline-badge-bg: var(--c-bg-2);
	--color-timeline-badge-success-border: var(--c-success);

	/* 阴影 */
	--shadow-resting-xsmall: var(--box-shadow-1);
	--shadow-resting-small: var(--box-shadow-1);
	--shadow-resting-medium: var(--box-shadow-2);
	--shadow-resting-large: var(--box-shadow-3);
	--shadow-floating-small: var(--box-shadow-2);
	--shadow-floating-medium: var(--box-shadow-3);
	--shadow-floating-large: var(--box-shadow-3);

	/* 半径 */
	--borderRadius-small: 0.25em;
	--borderRadius-medium: 0.5em;
	--borderRadius-large: 0.75em;
	--borderRadius-xlarge: 1em;

	/* 字体 */
	--fontStack-body: var(--font-basic);
	--fontStack-heading: var(--font-basic);
}

/* 深色模式适配 */
.dark .giscus-container {
	--color-btn-primary-text: var(--c-text);
	--color-btn-primary-bg: var(--c-primary);
	--color-btn-primary-hover-bg: hsl(var(--hue-theme) 100% 75%);
	--color-btn-primary-hover-border: hsl(var(--hue-theme) 100% 75%);
}
</style>
