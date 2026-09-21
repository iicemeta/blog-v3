---
title: 【Node.js】更换镜像源
description: 在进行前端开发或 Node.js 后端项目时，我们经常需要通过 npm 或其他包管理器来安装依赖。然而，由于网络环境的原因，使用官方的默认源（npm registry）常常会遇到下载速度慢、超时报错（如 ETIMEDOUT）等令人头疼的问题。
date: 2026-09-15 10:00:00
updated: 2026-09-15 10:00:00
image: https://postpic.iicemeta.com/nodejs-change-registry-mirror/Gemini_Generated_Image_6em6g76em6g76em6.jpg
categories: [技术]
tags: [Node.js, 教程, AI, 基础工具]
---

## 镜像源

当 **Node.js** 的包管理器进行资源包下载时候需要向一个仓库地址进行请求，默认为 `https://registry.npmjs.org` 。我们称这个地址为官方镜像源。

因为这个镜像源的服务器在**境外**，因此会因为**网络波动**造成内容无法正确下载，此时我们需要**更换**镜像源。国内一些头部**云服务提供商**（阿里云、腾讯云等）会定期从**官方服务器**进行数据同步到自己的服务器，因此我们选择这些厂商的镜像源能起到**加速**和**稳定**下载的作用。

常见的镜像源有很多，这里我们选择更换为**阿里云**镜像源。

## 更换镜像源

阿里云npm镜像源官网地址为 [阿里云NPM镜像源](https://developer.aliyun.com/mirror/NPM)

:copy{code="https://developer.aliyun.com/mirror/NPM"}

::pic
---
src: https://postpic.iicemeta.com/nodejs-change-registry-mirror/image.png
caption: 阿里云NPM镜像源官网
---
::

接下来 **右键** 点击 **Windows 徽标** 或按 :key{code="Win"} + :key{code="X"} 打开菜单，然后启动 **Windows Powershell**

在最新版Windows中，这里也叫做 **终端**

::pic
---
src: https://postpic.iicemeta.com/nodejs-change-registry-mirror/image-1.png
caption: Windows界面截图
---
::

接下来在弹出的命令窗口中输入以下命令然后按 :key{code="Enter"} 键执行

:copy{code='npm config set registry "http://registry.npmmirror.com"'}

::pic
---
src: https://postpic.iicemeta.com/nodejs-change-registry-mirror/image-2.png
caption: Powershell命令窗口
---
::

::alert{type="info" title="提示"}
这里可能不会有任何提示，应该就是执行成功了，接下来我们验证一下生效。
::

继续在命令窗口中输入以下命令然后按 :key{code="Enter"} 键执行

:copy{code="npm config get registry"}

::pic
---
src: https://postpic.iicemeta.com/nodejs-change-registry-mirror/image-3.png
caption: Powershell命令窗口-验证
---
::

::alert{type="tip" title="成功标志"}
这里返回的内容和我们输入的 `registry.npmmirror.com` 一样即为设置成功。
::

## 其他镜像源

::link-card
---
title: 腾讯云NPM镜像源说明书
link: https://mirrors.cloud.tencent.com/help/npm.html
---
::

::link-card
---
title: 华为云NPM镜像源说明书
link: https://mirrors.huaweicloud.com/mirrorDetail/5ea0f1e03fdb11a72fd319b2?mirrorName=npm&catalog=language
---
::
