---
title: 【Node.js】安装教程
description: Node.js 是目前 AI 时代不可或缺的工具之一，拥有丰富的组件库和众多 Agent 工具。
date: 2026-09-14 20:22:00
updated: 2026-09-14 20:22:00
image: https://postpic.iicemeta.com/how-to-install-nodejs/Gemini_Generated_Image_z5xa9dz5xa9dz5xa.jpg
categories: [工具]
tags: [Node.js, 教程, AI, 基础工具]
---

## Node.js下载

访问 **Node.js** 官方网站 `nodejs.org/zh-cn`

::pic
---
src: https://postpic.iicemeta.com/how-to-install-nodejs/Screenshot_14-9-2026_20251_nodejs.org.jpeg
caption: Node.js 官网
---
::

::alert{type="info" title="系统自动检测"}
由于浏览器会自动检测系统并为我们选择合适的 Node.js 版本，因此这里我们不需要进行任何操作。
::

::alert{type="tip" title="提示"}
Node.js 新版已经放弃 **Windows7** 系统的支持，如果需要在 **Windows7** 上使用，请寻找其他教程
::

::pic
---
src: https://postpic.iicemeta.com/how-to-install-nodejs/image.png
caption: Node.js 下载页面
---
::

这里我们直接点击下载 **Windows 安装程序(.msi)**

::pic
---
src: https://postpic.iicemeta.com/how-to-install-nodejs/image-1.png
caption: Node.js 下载页面 - 下载按钮
---
::

下载完成后会得到 **Node.js** 的 .msi 安装文件

::pic
---
src: https://postpic.iicemeta.com/how-to-install-nodejs/image-2.png
caption: Node.js 安装文件
---
::

## Node.js安装

双击下载的安装包运行 **Node.js** 安装程序

::pic
---
src: https://postpic.iicemeta.com/how-to-install-nodejs/image-3.png
caption: Node.js 安装程序
---
::

来到这个界面以后点击 **Next**

::pic
---
src: https://postpic.iicemeta.com/how-to-install-nodejs/image-4.png
caption: Node.js 安装程序 - 主界面
---
::

在 **I accept** 前面打勾然后点击 **Next**

::pic
---
src: https://postpic.iicemeta.com/how-to-install-nodejs/image-5.png
caption: Node.js 安装程序 - 隐私政策
---
::

::alert{type="warning" title="注意"}
如果你是新手， **不要** 更改安装路径，直接安装在C盘，否则会带来很多 **不必要的麻烦** ！！！
::

::pic
---
src: https://postpic.iicemeta.com/how-to-install-nodejs/image-6.png
caption: Node.js 安装程序 - 安装路径
---
::

这里不用进行任何改动，直接点击 **Next**

::pic
---
src: https://postpic.iicemeta.com/how-to-install-nodejs/image-7.png
caption: Node.js 安装程序 - 环境变量等
---
::

这里同样不用进行改动，直接点击 **Next**

::pic
---
src: https://postpic.iicemeta.com/how-to-install-nodejs/image-8.png
caption: Node.js 安装程序 - 附加内容
---
::

现在点击 **install**

::pic
---
src: https://postpic.iicemeta.com/how-to-install-nodejs/image-9.png
caption: Node.js 安装程序 - 执行安装
---
::

这里如果弹出这个窗口，需要点击 **是**

::pic
---
src: https://postpic.iicemeta.com/how-to-install-nodejs/image-10.png
caption: Windows 用户账户控制
---
::

来到这个界面就是安装完成了，我们可以点击 **Finish** 来关闭安装程序

::pic
---
src: https://postpic.iicemeta.com/how-to-install-nodejs/image-11.png
caption: Node.js 安装程序 - 安装完成
---
::

## 验证安装

**右键** 点击 **Windows徽标** 或者按 :key{code="Win"} + :key{code="X"}

::pic
---
src: https://postpic.iicemeta.com/how-to-install-nodejs/image-12.png
caption: Windows 桌面
---
::

点击 **Windows Powershell**

::pic
---
src: https://postpic.iicemeta.com/how-to-install-nodejs/image-13.png
caption: win+x 菜单
---
::

会出现一个可以输入命令的地方

::pic
---
src: https://postpic.iicemeta.com/how-to-install-nodejs/image-14.png
caption: Windows Powershell
---
::

输入以下命令并按 :key{code="Enter"} 执行：

:copy{code="node -v"}

::pic
---
src: https://postpic.iicemeta.com/how-to-install-nodejs/image-15.png
caption: 执行 node -v
---
::

接下来输入以下命令并按 :key{code="Enter"} 执行：

:copy{code="npm -v"}

::alert{type="warning" title="可能出现的问题"}
如果出现 **Windows Powershell 禁止运行脚本** 的提示，需要执行以下设置步骤。如果未出现此内容可跳过。
::

::pic
---
src: https://postpic.iicemeta.com/how-to-install-nodejs/image-16.png
caption: Windows Powershell 禁止运行脚本示例图
---
::

输入以下命令并按 :key{code="Enter"} 执行，允许运行脚本：

:copy{code="Set-ExecutionPolicy RemoteSigned -Scope CurrentUser"}

::pic
---
src: https://postpic.iicemeta.com/how-to-install-nodejs/image-17.png
caption: Windows Powershell 设置允许运行脚本
---
::

输入以下内容并按 :key{code="Enter"} 确认：

:copy{code="Y"}

::pic
---
src: https://postpic.iicemeta.com/how-to-install-nodejs/image-18.png
caption: Windows Powershell 设置允许运行脚本 - 确认
---
::

现在重新输入以下命令并按 :key{code="Enter"} 执行，出现以下内容即为安装成功：

:copy{code="npm -v"}

::pic
---
src: https://postpic.iicemeta.com/how-to-install-nodejs/image-19.png
caption: 安装成功 - npm 版本输出
---
::

## 恭喜！！！

现在你已经完成 **Node.js** 的安装，尽情开启 **Agent** 世界吧！！！

::folding{title="【附】Windows Powershell 完整输出内容"}
```powershell [Windows PowerShell] wrap
Windows PowerShell
版权所有（C） Microsoft Corporation。保留所有权利。

安装最新的 PowerShell，了解新功能和改进！https://aka.ms/PSWindows

PS C:\Users\iicemeta> node -v
v24.21.0
PS C:\Users\iicemeta> npm -v
npm : 无法加载文件 C:\Program Files\nodejs\npm.ps1，因为在此系统上禁止运行脚本。有关详细信息，请参阅 https:/go.microsof
t.com/fwlink/?LinkID=135170 中的 about_Execution_Policies。
所在位置 行:1 字符: 1
+ npm -v
+ ~~~
    + CategoryInfo          : SecurityError: (:) []，PSSecurityException
    + FullyQualifiedErrorId : UnauthorizedAccess
PS C:\Users\iicemeta> Set-ExecutionPolicy RemoteSigned -Scope CurrentUser

执行策略更改
执行策略可帮助你防止执行不信任的脚本。更改执行策略可能会产生安全风险，如 https:/go.microsoft.com/fwlink/?LinkID=135170
中的 about_Execution_Policies 帮助主题所述。是否要更改执行策略?
[Y] 是(Y)  [A] 全是(A)  [N] 否(N)  [L] 全否(L)  [S] 暂停(S)  [?] 帮助 (默认值为"N"): Y
PS C:\Users\iicemeta> npm -v
11.19.0
PS C:\Users\iicemeta>
```
::
