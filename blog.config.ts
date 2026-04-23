import type { FeedEntry } from './app/types/feed'

const basicConfig = {
	title: 'ice-cream',
	subtitle: '如奶油般化开',
	// 长 description 利好于 SEO
	description: 'iice个人网站，分享技术，分享生活。',
	author: {
		name: 'iicemeta',
		avatar: '/images/avatar.webp',
		email: 'me@iicemeta.com',
		homepage: 'https://www.iicemeta.com',
	},
	copyright: {
		abbr: 'CC BY-NC-SA 4.0',
		name: '署名-非商业性使用-相同方式共享 4.0 国际',
		url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hans',
	},
	favicon: '/images/favicon.svg',
	language: 'zh-CN',
	timeEstablished: '2026-03-28',
	timeZone: 'Asia/Shanghai',
	url: 'https://www.iicemeta.com',
	defaultCategory: '未分类',
}

// 存储 nuxt.config 和 app.config 共用的配置
// 此处为启动时需要的配置，启动后可变配置位于 app/app.config.ts
// @keep-sorted
const blogConfig = {
	...basicConfig,

	article: {
		categories: {
			[basicConfig.defaultCategory]: { icon: 'tabler:folder-open' },
			/** 实践可复用操作经验：工具/系统/部署/排障 */
			技术: { icon: 'tabler:mouse', color: '#33aaff' },
			/** 编程：代码实现/工程实践/开发方法 */
			开发: { icon: 'tabler:code', color: '#7777ff' },
			/** 安全：漏洞/CTF/恶意软件/安全事件分析 */
			安全: { icon: 'tabler:bug', color: '#ff7733' },
			/** 思考：观点讨论/复盘反思/行业或产品观察 */
			杂谈: { icon: 'tabler:message', color: '#33bbaa' },
			/** 记录叙事：个人经历/校园家庭/日常片段 */
			生活: { icon: 'tabler:leaf', color: '#ff7777' },
		},
		defaultCategoryIcon: 'tabler:folder',
		/** 文章版式，首个为默认版式 */
		types: {
			tech: {},
			story: {},
		},
		/** 分类排序方式，键为排序字段，值为显示名称 */
		order: {
			date: '创建日期',
			updated: '更新日期',
			// title: '标题',
		},
		/** 使用 pnpm new 新建文章时自动生成自定义链接（permalink/abbrlink） */
		useRandomPremalink: false,
		/** 隐藏基于文件路由（不是自定义链接）的 URL /post 路径前缀 */
		hidePostPrefix: true,
		/** 禁止搜索引擎收录的路径 */
		robotsNotIndex: ['/preview', '/previews/*'],
	},

	/** 博客 Atom 订阅源 */
	feed: {
		/** 订阅源最大文章数量 */
		limit: 50,
		/** 订阅源是否启用XSLT样式 */
		enableStyle: true,
	},

	/** 向 <head> 中添加脚本 */
	scripts: [
		// 统计和监控脚本可以在这里添加
		// 例如：Umami、Google Analytics、Cloudflare Insights 等
	],

	/** Giscus 评论系统配置
	 * 请访问 https://giscus.app/zh-CN 获取你的配置
	 */
	giscus: {
		repo: 'iicemeta/iidiscussion',
		repoId: 'R_kgDORzl_7w',
		category: 'Comments',
		categoryId: 'DIC_kwDORzl_784C5g2r',
		mapping: 'pathname',
		strict: '0',
		reactionsEnabled: '1',
		emitMetadata: '0',
		inputPosition: 'bottom',
		theme: 'preferred_color_scheme',
		lang: 'zh-CN',
		loading: 'lazy',
	},
}

/** 用于生成 OPML 和友链页面配置 */
export const myFeed: FeedEntry = {
	author: blogConfig.author.name,
	sitenick: '摸鱼处',
	title: blogConfig.title,
	desc: blogConfig.subtitle || blogConfig.description,
	link: blogConfig.url,
	feed: new URL('/atom.xml', blogConfig.url).toString(),
	icon: blogConfig.favicon,
	avatar: blogConfig.author.avatar,
	archs: ['Nuxt', 'Vercel'],
	date: blogConfig.timeEstablished,
	comment: '这是我自己',
}

export default blogConfig
