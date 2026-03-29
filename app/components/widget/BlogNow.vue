<script setup lang="ts">
interface TimeSlot {
	hours: [number, number]
	greetings: string[]
	emoji: string
	bgGradient: string
}

const timeSlots: TimeSlot[] = [
	{
		hours: [0, 5],
		greetings: ['还没睡呢？', '夜猫子你好 👋', '深夜码字中...', '该休息啦'],
		emoji: '🌙',
		bgGradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
	},
	{
		hours: [5, 8],
		greetings: ['早起的鸟儿有虫吃！', '新的一天开始啦', '早上好呀', '元气满满的一天'],
		emoji: '🌅',
		bgGradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
	},
	{
		hours: [8, 11],
		greetings: ['上午好！', '工作学习加油', '咖啡喝了吗？', '效率最高的时候'],
		emoji: '☕',
		bgGradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
	},
	{
		hours: [11, 13],
		greetings: ['中午好！', '该吃午饭啦', '吃饱才有力气', '午休时间到'],
		emoji: '🍜',
		bgGradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
	},
	{
		hours: [13, 17],
		greetings: ['下午好', '继续加油', '下午茶时间？', '坚持就是胜利'],
		emoji: '🌤️',
		bgGradient: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
	},
	{
		hours: [17, 19],
		greetings: ['傍晚好', '下班了吗？', '该吃晚饭啦', '夕阳西下'],
		emoji: '🌆',
		bgGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
	},
	{
		hours: [19, 23],
		greetings: ['晚上好！', '放松时间', '看看剧还是码代码？', '晚安预备备'],
		emoji: '🌃',
		bgGradient: 'linear-gradient(135deg, #2c3e50 0%, #4ca1af 100%)',
	},
]

const currentHour = ref(new Date().getHours())

// 每分钟更新一次时间
onMounted(() => {
	const interval = setInterval(() => {
		currentHour.value = new Date().getHours()
	}, 60000)
	onUnmounted(() => clearInterval(interval))
})

const currentSlot = computed<TimeSlot | undefined>(() => {
	const slot = timeSlots.find(s =>
		currentHour.value >= s.hours[0] && currentHour.value < s.hours[1],
	)
	return slot ?? timeSlots[0]
})

const randomGreeting = computed(() => {
	const slot = currentSlot.value
	if (!slot) return '你好呀 👋'
	const greetings = slot.greetings
	return greetings[Math.floor(Math.random() * greetings.length)]
})

const currentTime = computed(() => {
	const now = new Date()
	return now.toLocaleTimeString('zh-CN', {
		hour: '2-digit',
		minute: '2-digit',
	})
})

const statusText = computed(() => {
	const hour = currentHour.value
	if (hour >= 0 && hour < 6) return '深夜肝代码中'
	if (hour >= 6 && hour < 9) return '早起学习/工作'
	if (hour >= 9 && hour < 12) return '专注创作中'
	if (hour >= 12 && hour < 14) return '午休充电中'
	if (hour >= 14 && hour < 18) return '下午继续战斗'
	if (hour >= 18 && hour < 20) return '晚饭时间'
	return '晚间休闲模式'
})
</script>

<template>
<BlogWidget
	card
	dim
	title="此刻"
	class="blog-now"
	:style="{ '--time-bg': currentSlot?.bgGradient ?? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }"
>
	<div class="now-content">
		<div class="greeting-section">
			<div class="greeting-text">
				<span class="greeting-emoji">{{ currentSlot?.emoji ?? '🌙' }}</span>
				{{ randomGreeting }}
			</div>
			<div class="status-badge">
				<span class="status-dot" />
				{{ statusText }}
			</div>
		</div>
		<div class="time-display">
			{{ currentTime }}
		</div>
	</div>
</BlogWidget>
</template>

<style lang="scss" scoped>
.blog-now {
	position: relative;
	overflow: hidden;

	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 4px;
		background: var(--time-bg);
		transition: background 0.5s ease;
	}

	.now-content {
		display: flex;
		align-items: center;
		min-height: 4rem;
	}

	.greeting-section {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		z-index: 1;
	}

	.greeting-emoji {
		margin-right: 0.3rem;
	}

	.greeting-text {
		font-size: 1.1rem;
		font-weight: 600;
		color: var(--c-text-1);
		margin-bottom: 0.5rem;
		line-height: 1.3;
	}

	.status-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.25rem 0.6rem;
		background: var(--c-bg-2);
		border-radius: 1rem;
		font-size: 0.75rem;
		color: var(--c-text-2);
	}

	.status-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: #22c55e;
		animation: pulse 2s ease-in-out infinite;
	}

	.time-display {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		align-self: stretch;
		font-size: 2.8rem;
		font-weight: 800;
		font-variant-numeric: tabular-nums;
		letter-spacing: -0.02em;
		background-clip: text;
		background-image: linear-gradient(
			60deg,
			var(--c-accent) -30%,
			var(--c-primary) 50%,
			var(--c-accent) 130%
		);
		background-position: 100% 0;
		background-size: 200%;
		color: transparent;
		transition: background-position 0.2s;
		z-index: 1;

		.blog-widget:hover & {
			background-position: 0 0;
		}
	}
}

@keyframes pulse {
	0%, 100% {
		opacity: 1;
		transform: scale(1);
	}
	50% {
		opacity: 0.6;
		transform: scale(1.1);
	}
}
</style>
