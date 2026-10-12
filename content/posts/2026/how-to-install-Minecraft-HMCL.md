---
title: 【Minecraft】HMCL安装教程
description: 从下载启动器、装好 Java，到创建实例进入世界，手把手带你用 HMCL 玩上 Minecraft。
date: 2026-10-12 09:39:00
updated: 2026-10-12 10:45:00
image: https://postpic.iicemeta.com/how-to-install-Minecraft-HMCL/Gemini_Generated_Image_k3vgy0k3vgy0k3vg.jpg
categories: [游戏]
tags: [Minecraft, 启动器, 教程]
references:
  - title: HMCL 官网
    link: https://hmcl.huangyuhui.net/
  - title: HMCL GitHub 仓库（GPLv3 开源）
    link: https://github.com/HMCL-dev/HMCL
---

**HMCL**（Hello Minecraft! Launcher）是一个开源、跨平台的 Minecraft 启动器。正版登录、离线登录、整合包导入、自动装 Fabric / Forge，它都能干。

这篇教程从零开始，带你走完 **下载启动器 → 装好 Java → 安装游戏 → 进入世界** 的全过程。

::link-card
---
title: Hello Minecraft! Launcher
description: HMCL 官网，下载与文档入口
icon: https://hmcl.huangyuhui.net/favicon.ico
link: https://hmcl.huangyuhui.net/
class: gradient-card active
---
::

## HMCL 启动器下载

打开 **HMCL** 官网：

::pic
---
src: https://postpic.iicemeta.com/how-to-install-Minecraft-HMCL/image.png
caption: HMCL 官网首页
---
::

**点击** 右上角 **下载** 按钮。

::pic
---
src: https://postpic.iicemeta.com/how-to-install-Minecraft-HMCL/image-1.png
caption: HMCL 官网 - 下载按钮
---
::

往下滑，找到 **开发版**，点击 **紫色** 按钮开始下载。

::pic
---
src: https://postpic.iicemeta.com/how-to-install-Minecraft-HMCL/image-2.png
caption: HMCL 下载页面 - 开发版按钮
---
::

::alert{type="info" title="稳定版还是开发版？"}
稳定版更新慢、更保守；开发版迭代更快，能更早用上新特性。两者都可以用来玩游戏，本教程以开发版为例。
::

下载会由 Edge 接管：

::pic
---
src: https://postpic.iicemeta.com/how-to-install-Minecraft-HMCL/image-3.png
caption: Edge 下载记录
---
::

::folding{title="为什么 Edge 要拦我一下？"}
Edge 会对来源不常见的 `.exe` 弹「不常见的下载」提示，这是浏览器的通用安全策略，并不代表文件有问题。HMCL 是 GPLv3 开源软件，代码公开可查，按下面的步骤放行即可。
::

下载完成后会提示风险，展开菜单，选择 **保留**。

::pic
---
src: https://postpic.iicemeta.com/how-to-install-Minecraft-HMCL/image-4.png
caption: Edge 下载记录 - 选择「保留」
---
::

继续展开删除按钮旁边的菜单，选择 **仍要保留**。

::pic
---
src: https://postpic.iicemeta.com/how-to-install-Minecraft-HMCL/image-5.png
caption: Edge 下载记录 - 选择「仍要保留」
---
::

然后可以点击 **打开文件所在位置**。

::pic
---
src: https://postpic.iicemeta.com/how-to-install-Minecraft-HMCL/image-6.png
caption: Edge 下载记录 - 打开文件所在位置
---
::

这就是我们下载后的文件。

::pic
---
src: https://postpic.iicemeta.com/how-to-install-Minecraft-HMCL/image-7.png
caption: Windows 资源管理器 - 下载好的启动器文件
---
::

打开 **此电脑**，选择一个你喜欢的位置，例如 **D盘**，新建一个文件夹，例如 HMCL。

::alert{type="info" title="小技巧"}
按 :key{code="Win"} + :key{code="E"} 可以直接打开 **此电脑**。
::

::pic
---
src: https://postpic.iicemeta.com/how-to-install-Minecraft-HMCL/image-8.png
caption: Windows 资源管理器 - 选择位置
---
::

::pic
---
src: https://postpic.iicemeta.com/how-to-install-Minecraft-HMCL/image-9.png
caption: Windows 资源管理器 - 新建文件夹
---
::

先将启动器复制到新建好的文件夹。

::pic
---
src: https://postpic.iicemeta.com/how-to-install-Minecraft-HMCL/image-10.png
caption: Windows 资源管理器 - 复制启动器
---
::

::pic
---
src: https://postpic.iicemeta.com/how-to-install-Minecraft-HMCL/image-11.png
caption: Windows 资源管理器 - 粘贴到 HMCL 文件夹
---
::

## 首次启动

### 安装 Java

如果你的电脑上没有安装 **Java**，HMCL 会提示你进行安装。

::pic
---
src: https://postpic.iicemeta.com/how-to-install-Minecraft-HMCL/image-12.png
caption: HMCL - 提示缺少 Java
---
::

点击确定以后会自动下载 **Microsoft JDK 25**。

::pic
---
src: https://postpic.iicemeta.com/how-to-install-Minecraft-HMCL/image-13.png
caption: Edge - 下载 Microsoft JDK 25
---
::

下载完成后，点击 **打开文件**。

::pic
---
src: https://postpic.iicemeta.com/how-to-install-Minecraft-HMCL/image-14.png
caption: Edge - 打开文件
---
::

点击 **下一步**。

::pic
---
src: https://postpic.iicemeta.com/how-to-install-Minecraft-HMCL/image-15.png
caption: Microsoft JDK 25 安装程序
---
::

勾选接受，然后点击 **下一步**。

::pic
---
src: https://postpic.iicemeta.com/how-to-install-Minecraft-HMCL/image-16.png
caption: Microsoft JDK 25 安装程序 - 接受许可协议
---
::

这里不要进行任何更改，点击 **下一步**。

::pic
---
src: https://postpic.iicemeta.com/how-to-install-Minecraft-HMCL/image-17.png
caption: Microsoft JDK 25 安装程序 - 功能选择
---
::

这里也不要进行任何更改，直接点击 **下一步**。

::alert{type="warning" title="注意"}
新手玩家不要更改 **Java** 的安装路径到其他位置，可能会造成软件无法正常识别到 **Java**。
::

::pic
---
src: https://postpic.iicemeta.com/how-to-install-Minecraft-HMCL/image-18.png
caption: Microsoft JDK 25 安装程序 - 安装路径
---
::

点击 **安装**。

::pic
---
src: https://postpic.iicemeta.com/how-to-install-Minecraft-HMCL/image-19.png
caption: Microsoft JDK 25 安装程序 - 开始安装
---
::

同意用户账户控制。

::pic
---
src: https://postpic.iicemeta.com/how-to-install-Minecraft-HMCL/image-20.png
caption: Windows 用户账户控制
---
::

等待安装完成。

::pic
---
src: https://postpic.iicemeta.com/how-to-install-Minecraft-HMCL/image-21.png
caption: Microsoft JDK 25 安装程序 - 安装中
---
::

安装完成后点击 **完成**。

::pic
---
src: https://postpic.iicemeta.com/how-to-install-Minecraft-HMCL/image-22.png
caption: Microsoft JDK 25 安装程序 - 安装完成
---
::

### 重新运行 HMCL

回到文件夹重新运行 HMCL。

::pic
---
src: https://postpic.iicemeta.com/how-to-install-Minecraft-HMCL/image-23.png
caption: Windows 资源管理器 - 重新运行 HMCL
---
::

等待 HMCL 自动下载必要组件。

::pic
---
src: https://postpic.iicemeta.com/how-to-install-Minecraft-HMCL/image-24.png
caption: HMCL - 下载必要组件
---
::

下载完成后，HMCL 会自动启动。

::pic
---
src: https://postpic.iicemeta.com/how-to-install-Minecraft-HMCL/image-25.png
caption: HMCL - 启动完成
---
::

## 安装游戏

点击 **同意** 用户协议。（有时间自行阅读，教程这里直接跳过）

::pic
---
src: https://postpic.iicemeta.com/how-to-install-Minecraft-HMCL/image-26.png
caption: HMCL - 用户协议
---
::

点击 **实例列表**。

::pic
---
src: https://postpic.iicemeta.com/how-to-install-Minecraft-HMCL/image-27.png
caption: HMCL - 实例列表
---
::

点击 **安装新游戏**。

::pic
---
src: https://postpic.iicemeta.com/how-to-install-Minecraft-HMCL/image-28.png
caption: HMCL - 安装新游戏
---
::

选择一个你喜欢的版本，教学这里使用最新版。

::pic
---
src: https://postpic.iicemeta.com/how-to-install-Minecraft-HMCL/image-29.png
caption: HMCL - 选择游戏版本
---
::

点击 **安装**。

::pic
---
src: https://postpic.iicemeta.com/how-to-install-Minecraft-HMCL/image-30.png
caption: HMCL - 点击安装
---
::

HMCL 会开始下载各种需要的文件，等待它下载完毕。

::pic
---
src: https://postpic.iicemeta.com/how-to-install-Minecraft-HMCL/image-31.png
caption: HMCL - 下载游戏文件中
---
::

安装成功，点击确定。

::pic
---
src: https://postpic.iicemeta.com/how-to-install-Minecraft-HMCL/image-33.png
caption: HMCL - 安装成功
---
::

返回主页。

::pic
---
src: https://postpic.iicemeta.com/how-to-install-Minecraft-HMCL/image-34.png
caption: HMCL - 返回主页
---
::

点击启动游戏。

::pic
---
src: https://postpic.iicemeta.com/how-to-install-Minecraft-HMCL/image-35.png
caption: HMCL - 点击启动游戏
---
::

第一次启动会提示添加账户，这里不需要购买正版。

::pic
---
src: https://postpic.iicemeta.com/how-to-install-Minecraft-HMCL/image-36.png
caption: HMCL - 添加账户
---
::

输入一个你喜欢的昵称，然后点击登录。

::alert{type="warning" title="注意"}
新手玩家不要使用中文，以免造成游戏异常！！！
::

::pic
---
src: https://postpic.iicemeta.com/how-to-install-Minecraft-HMCL/image-37.png
caption: HMCL - 输入昵称并登录
---
::

游戏正式开始启动。

::pic
---
src: https://postpic.iicemeta.com/how-to-install-Minecraft-HMCL/image-38.png
caption: HMCL - 游戏启动中
---
::

启动成功！！！

::pic
---
src: https://postpic.iicemeta.com/how-to-install-Minecraft-HMCL/image-39.png
caption: HMCL - 启动成功
---
::

::pic
---
src: https://postpic.iicemeta.com/how-to-install-Minecraft-HMCL/image-40.png
caption: Minecraft - 进入世界
---
::

## 至此

至此，Minecraft 的安装教程结束。小伙伴们可以开始探索世界啦！
