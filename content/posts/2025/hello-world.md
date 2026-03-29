---
title: 欢迎来到我的博客
description: 讲述关于欢迎来到我的博客的故事，并根据博客、Nuxt、生活给出杂谈。
date: 2025-03-29 14:30:00
updated: 2025-03-29 14:30:00
image: https://picsum.photos/1200/600?random=1
categories: [杂谈]
tags: [博客, Nuxt, 生活]
---

## 从第一篇文章说起

终于搭好了这个博客。

不是用 WordPress，也不是 Hexo。是 [Nuxt Content](https://content.nuxt.com/) —— 一个能把 Markdown 变成网页的魔法工具。

::alert{title="为什么选 Nuxt？"}
因为我想让每篇文章都有温度。不只是文字，还有自定义的组件、交互、甚至一点点小动画。
::

---

## 这个博客会写什么

- **技术笔记** —— 踩过的坑，得记下来
- **开发心得** —— 代码背后的故事
- **生活碎片** —— 偶尔也聊聊别的

> 写博客就像养植物。
> 不需要每天浇水，但得经常看看它。

---

## 看看能玩什么

### 1. 标签页组件

::tab{:tabs='["想法","代码"]'}
#tab1
有时候一个话题太长，可以拆成标签页。

读者不用滚动半天，点一下就行。

#tab2
```mdc
::tab{:tabs='["想法","代码"]'}
#tab1
内容写在这里...
#tab2
代码写在这里...
::
```
::

### 2. 链接卡片

::link-card
---
title: Nuxt Content 官方文档
icon: https://content.nuxt.com/favicon.ico
link: https://content.nuxt.com/
---
::

### 3. 图片也能玩

![随机风景](https://picsum.photos/800/400?random=2)

### 4. 特殊文字效果

[这句话自带故事感。]{.text-story}

[阴 影 回 声]{.text-repeat}

滚动页面时，它会[悄悄变大]{.text-zoom}。

---

## 写在最后

博客刚搭好，还有很多想折腾的：

- [ ] 暗黑模式
- [ ] 评论系统
- [ ] RSS 订阅
- [ ] 更多自定义组件

但先这样吧。

**完成比完美重要。**

如果你也想搭一个类似的博客，欢迎来 [GitHub](https://github.com) 找我交流。

---

*感谢阅读，下期见。*
