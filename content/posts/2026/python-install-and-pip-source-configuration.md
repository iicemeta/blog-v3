---
title: 【Python】安装与换源
description: 手把手教你从零开始进行Python安装包下载、安装以及对pip进行换源。
date: 2026-09-17 18:27:00
updated: 2026-09-17 18:27:00
image: https://postpic.iicemeta.com/python-install-and-pip-source-configuration/Gemini_Generated_Image_vuamlsvuamlsvuam.jpg
categories: [技术]
tags: [Python, 教程, AI]
---

## 下载 Python

::alert{type="warning" title="注意"}
**Python** 的官网地址为 `https://www.python.org` ，请注意识别虚假网址。
::

但是，因为国内网络原因，从 **Python 官网** 下载时，下载速度会非常慢，因此我们从 **清华大学开源软件镜像站** 进行下载。

::link-card
---
title: 清华大学开源软件镜像站
link: https://mirrors.tuna.tsinghua.edu.cn/
---
::

打开 **清华大学开源软件镜像站** 主页

::pic
---
src: https://postpic.iicemeta.com/python-install-and-pip-source-configuration/image-1.png
caption: 清华大学开源软件镜像站主页
---
::

找到位于页面右侧的蓝色按钮 **获取下载链接**

::pic
---
src: https://postpic.iicemeta.com/python-install-and-pip-source-configuration/image-2.png
caption: 获取下载链接按钮
---
::

选择 **应用软件** 标签页

::pic
---
src: https://postpic.iicemeta.com/python-install-and-pip-source-configuration/image-3.png
caption: 应用软件标签页
---
::

往下翻找到 **Python**

::pic
---
src: https://postpic.iicemeta.com/python-install-and-pip-source-configuration/image-4.png
caption: 应用软件列表中的 Python
---
::

选择最新版进行下载，这里最新版为 **3.14.7 (Windows, amd64)**

::pic
---
src: https://postpic.iicemeta.com/python-install-and-pip-source-configuration/image-5.png
caption: Python 版本列表
---
::

下载结果如下

::pic
---
src: https://postpic.iicemeta.com/python-install-and-pip-source-configuration/image-6.png
caption: 下载结果
---
::

## 安装 Python

双击打开刚才下载的 **python-3.14.7-amd64.exe**

::pic
---
src: https://postpic.iicemeta.com/python-install-and-pip-source-configuration/image-7.png
caption: Python 安装程序
---
::

**勾选** 图中红框中的复选框

::pic
---
src: https://postpic.iicemeta.com/python-install-and-pip-source-configuration/image-8.png
caption: 勾选复选框
---
::

然后点击 **Customize Installation**

::pic
---
src: https://postpic.iicemeta.com/python-install-and-pip-source-configuration/image-9.png
caption: 自定义安装
---
::

这里直接点击下一步 **Next**

::pic
---
src: https://postpic.iicemeta.com/python-install-and-pip-source-configuration/image-10.png
caption: 可选功能页面
---
::

**勾选** 第一个复选框

::pic
---
src: https://postpic.iicemeta.com/python-install-and-pip-source-configuration/image-12.png
caption: 高级选项页面
---
::

点击安装 **Install**

::pic
---
src: https://postpic.iicemeta.com/python-install-and-pip-source-configuration/image-13.png
caption: 执行安装
---
::

同意 Windows 用户账户控制

::pic
---
src: https://postpic.iicemeta.com/python-install-and-pip-source-configuration/image-14.png
caption: Windows 用户账户控制
---
::

出现以下界面即为安装成功，但是**先不要着急关闭安装窗口**

::pic
---
src: https://postpic.iicemeta.com/python-install-and-pip-source-configuration/image-15.png
caption: 安装成功界面
---
::

选择禁用路径长度限制 **Disable path length limit** ，此操作可以避免由于文件路径过长导致的一些问题

::pic
---
src: https://postpic.iicemeta.com/python-install-and-pip-source-configuration/image-16.png
caption: 禁用路径长度限制
---
::

这里依旧选择是

::pic
---
src: https://postpic.iicemeta.com/python-install-and-pip-source-configuration/image-17.png
caption: Windows 用户账户控制 - 确认
---
::

最终结果如图

::pic
---
src: https://postpic.iicemeta.com/python-install-and-pip-source-configuration/image-18.png
caption: 安装完成
---
::

此时，Python 安装环节已经完成，接下来关闭安装窗口并进行安装结果验证。

## 验证安装结果

**右键** 点击 **Windows 徽标** 或按 :key{code="Win"} + :key{code="X"} 打开快捷菜单，并点击打开 **Windows Powershell**

在最新的 Windows 系统中，这里也可能叫做 **终端**

::pic
---
src: https://postpic.iicemeta.com/python-install-and-pip-source-configuration/image-19.png
caption: Windows 快捷菜单
---
::

::pic
---
src: https://postpic.iicemeta.com/python-install-and-pip-source-configuration/image-20.png
caption: Windows Powershell
---
::

输入以下命令并按 :key{code="Enter"} 执行：

:copy{code="python --version"}

输出结果：

```powershell [Windows PowerShell] wrap
Python 3.14.7
```

::pic
---
src: https://postpic.iicemeta.com/python-install-and-pip-source-configuration/image-21.png
caption: 执行 python --version
---
::

接下来输入以下命令并按 :key{code="Enter"} 执行：

:copy{code="pip --version"}

输出结果：

```powershell [Windows PowerShell] wrap
pip 26.2.1 from C:\Program Files\Python314\Lib\site-packages\pip (python 3.14)
```

::pic
---
src: https://postpic.iicemeta.com/python-install-and-pip-source-configuration/image-22.png
caption: 执行 pip --version
---
::

::alert{type="tip" title="成功标志"}
出现上述输出结果即为安装成功！
::

## Python 更换镜像源

更换镜像源有利于加速 **Python** 各类包的下载。

回到 **清华大学开源软件镜像站** 主页

::link-card
---
title: 清华大学开源软件镜像站
link: https://mirrors.tuna.tsinghua.edu.cn/
---
::

往下翻找到 **pypi** ，然后点击后面的 **？** 图标

::pic
---
src: https://postpic.iicemeta.com/python-install-and-pip-source-configuration/image-23.png
caption: 镜像资源列表中的 pypi
---
::

进入 **PyPI** 使用说明页面

::pic
---
src: https://postpic.iicemeta.com/python-install-and-pip-source-configuration/image-24.png
caption: PyPI 软件仓库使用说明
---
::

::alert{type="tip" title="小提示"}
参考 **设为默认** 章节操作即可。因为我们安装的是最新版 **Python** ，可以先 **不要升级 pip** ，以免因为网络问题升级失败。
::

复制换源命令到刚才的 **Windows Powershell（终端）** 窗口中，然后按 :key{code="Enter"} 执行

:copy{code="pip config set global.index-url https://mirrors.tuna.tsinghua.edu.cn/pypi/web/simple"}

::pic
---
src: https://postpic.iicemeta.com/python-install-and-pip-source-configuration/image-25.png
caption: 执行换源命令
---
::

输入以下命令验证更换结果：

:copy{code="pip config list"}

::pic
---
src: https://postpic.iicemeta.com/python-install-and-pip-source-configuration/image-26.png
caption: 执行 pip config list
---
::

::alert{type="tip" title="成功标志"}
这里我们看到 **global.index-url** 已经被更换为清华镜像地址，此时已经更换成功。
::

## 恭喜！！！

至此 **Python** 已经成功安装在你的电脑中！
