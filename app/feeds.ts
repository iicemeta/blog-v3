import type { FeedGroup } from '../app/types/feed'
// 友链检测 CLI 需要使用显式导入和相对路径
import { myFeed } from '../blog.config'

export default [
	{
		name: 'Clarity',
		desc: '友情链接',
		entries: [
			myFeed,
			{
				author: '纸鹿本鹿',
				sitenick: '摸鱼处',
				title: '纸鹿摸鱼处',
				desc: '纸鹿至麓不知路，支炉制露不止漉',
				link: 'https://blog.zhilu.site/',
				feed: 'https://blog.zhilu.site/atom.xml',
				icon: 'https://www.zhilu.site/api/icon.png',
				avatar: 'https://www.zhilu.site/api/avatar.png',
				archs: ['Nuxt', 'Vercel'],
				date: '2019-07-19',
				comment: '纸鹿本鹿的个人博客，分享技术与生活。“折腾不止，摸鱼生活——摸门🙏🏻”。纸鹿是一名开源爱好者，结识了许多志同道合的朋友。这个博客记录了他在生活和技术学习中的点滴经历，充满启发与思考。网站界面简洁美观，内容丰富实用，人气互动活跃，涵盖了编程、生活、学习等多个领域，为读者提供了卓越的阅读体验。',
			},
		],
	},
] satisfies FeedGroup[]
