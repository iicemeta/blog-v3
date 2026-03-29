<script setup lang="tsx">
import type { TippyComponent } from 'vue-tippy'
import Giscus from '@giscus/vue'

const appConfig = useAppConfig()
const colorMode = useColorMode()

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

// Giscus 主题映射
// 支持 'light' | 'dark' | 'preferred_color_scheme' | 'light_high_contrast' | 'dark_high_contrast' | 'light_protanopia' | 'dark_protanopia' | 'light_tritanopia' | 'dark_tritanopia' | 'custom'
const giscusTheme = computed(() => {
	// 如果配置为 preferred_color_scheme，根据当前模式返回 light 或 dark
	const cfgTheme = appConfig.giscus?.theme || 'preferred_color_scheme'
	if (cfgTheme === 'preferred_color_scheme') {
		return colorMode.value === 'dark' ? 'dark' : 'light'
	}
	return cfgTheme
})

// Giscus 配置
const giscusConfig = computed(() => {
	const cfg = appConfig.giscus
	if (!cfg) return null
	return {
		repo: cfg.repo || '',
		repoId: cfg.repoId || '',
		category: cfg.category || 'Announcements',
		categoryId: cfg.categoryId || '',
		mapping: cfg.mapping || 'pathname',
		strict: cfg.strict || '0',
		reactionsEnabled: cfg.reactionsEnabled || '1',
		emitMetadata: cfg.emitMetadata || '0',
		inputPosition: cfg.inputPosition || 'bottom',
		lang: cfg.lang || 'zh-CN',
		loading: cfg.loading || 'lazy',
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
					<Icon name="ph:arrow-u-up-left-bold" />
				</button>

				<ZButton
					primary
					text="访问"
					@click="confirmOpen"
				/>
			</div>
		</template>
	</Tooltip>

	<!-- Giscus 评论系统 -->
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

<style lang="scss" scoped>
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

.giscus-container {
	margin: 2em 0;
	min-height: 200px;
}
</style>
