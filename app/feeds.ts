import type { FeedGroup } from '../app/types/feed'
// 友链检测 CLI 需要使用显式导入和相对路径
import { myFeed } from '../blog.config'

export default [
	{
		name: '我的友链',
		desc: '友情链接',
		entries: [
			myFeed,
		],
	},
] satisfies FeedGroup[]
