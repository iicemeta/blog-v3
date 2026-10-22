---
title: 【阿里云】开一个小服务器和朋友联机
description: 没有公网ip？免费服务太卡？快试试这个专属于你的联机通道吧！
date: 2026-10-22 17:49:00
updated: 2026-10-22 20:45:00
image: https://postpic.iicemeta.com/use-aliyun-to-play-game-with-friends/Gemini_Generated_Image_gqzdj3gqzdj3gqzd.jpg
categories: [技术]
tags: [阿里云, 服务器, Linux, Minecraft, 教程]
references:
  - title: 阿里云官网
    link: https://www.aliyun.com/
  - title: 云服务器 ECS 产品页
    link: https://www.aliyun.com/product/ecs
---

家里没有公网 ip，用免费的内网穿透服务又卡到没法玩。

这篇记录一次完整的开服过程：从买一台按量付费的阿里云 ECS，到用 frp 把家里的 Minecraft 局域网房间捅到公网，最后让朋友连进来。全程不需要家里有公网 ip，也不用会 Linux。

::alert{type="info" title="你需要准备什么"}
一个阿里云账号、一台能跑游戏的电脑、以及 **￥0.04/时** 左右的服务器开销。跟着截图点一遍就行。
::

## 第一步当然是打开阿里云官网

用任何你喜欢的方式打开阿里云官网的首页。

::pic
---
src: https://postpic.iicemeta.com/use-aliyun-to-play-game-with-friends/image.png
caption: 阿里云官网首页，右上角就是控制台入口
---
::

点击控制台进行登录，如果没有账号请注册一个。

::pic
---
src: https://postpic.iicemeta.com/use-aliyun-to-play-game-with-friends/image-1.png
caption: 控制台登录入口
---
::

图为阿里云登录页面。

::pic
---
src: https://postpic.iicemeta.com/use-aliyun-to-play-game-with-friends/image-2.png
caption: 阿里云登录页面
---
::

登录完成后，在控制台左上角，找到云服务器 ECS。

::pic
---
src: https://postpic.iicemeta.com/use-aliyun-to-play-game-with-friends/image-3.png
caption: 控制台左上角的云服务器 ECS 入口
---
::

点击 **产品与服务**，选择 **计算**。

::pic
---
src: https://postpic.iicemeta.com/use-aliyun-to-play-game-with-friends/image-4.png
caption: 产品与服务 → 计算
---
::

点击 **云服务器ECS**。

::pic
---
src: https://postpic.iicemeta.com/use-aliyun-to-play-game-with-friends/image-5.png
caption: 在「计算」分组里点云服务器 ECS
---
::

在 **实例与镜像** 中，点击 **实例**。

::pic
---
src: https://postpic.iicemeta.com/use-aliyun-to-play-game-with-friends/image-6.png
caption: 实例与镜像 → 实例
---
::

接下来，点击 **创建实例**。

::pic
---
src: https://postpic.iicemeta.com/use-aliyun-to-play-game-with-friends/image-7.png
caption: 实例列表右上角的「创建实例」
---
::

## 购买服务器

来到这里以后选择 **抢占式实例**。

::pic
---
src: https://postpic.iicemeta.com/use-aliyun-to-play-game-with-friends/image-8.png
caption: 购买方式选「抢占式实例」
---
::

### 挑地区和规格

接下来就是地区选择，就近原则最好。下面三种情况对号入座：

| 情况 | 举例 | 选哪个地域 |
| --- | --- | --- |
| 你和朋友在同一省份，且该省份有多个数据中心 | 广东 | 靠近开服方的，比如开服方在深圳就选 **华南1（深圳）** |
| 你和朋友在同一省份，但该省份没有数据中心 | 云南 | 距该省最近的，比如 **西南1（成都）** |
| 你和朋友在不同省份 | 广东 + 黑龙江（最北与最南） | **华东** 的数据中心，比如 **华东1（杭州）** |

这里我以 **杭州** 作为示例。

::pic
---
src: https://postpic.iicemeta.com/use-aliyun-to-play-game-with-friends/image-9.png
caption: 地域选择「华东1（杭州）」
---
::

如果账号在该地域没有创建过 **交换机**，阿里云会为你分配 **默认交换机**。

::pic
---
src: https://postpic.iicemeta.com/use-aliyun-to-play-game-with-friends/image-10.png
caption: 没建过交换机的话，默认交换机会自动分配
---
::

接下来，选择一下内存。我们可以直接选择小的 **1GiB**，因为价格更低。

**0.5GiB** 可以尝试选择，不过该内存的实例可能总是为 **已售罄** 状态。

::pic
---
src: https://postpic.iicemeta.com/use-aliyun-to-play-game-with-friends/image-11.png
caption: 内存选 1GiB 就够用
---
::

非常幸运，有 **共享计算型 n1** 可以用。

::pic
---
src: https://postpic.iicemeta.com/use-aliyun-to-play-game-with-friends/image-12.png
caption: 规格族选「共享计算型 n1」
---
::

这里选择 **无确定使用时长**，否则和朋友玩耍超过 **1小时** 机器就被自动释放而导致 **断连**，其他的设置可以不用调。

::pic
---
src: https://postpic.iicemeta.com/use-aliyun-to-play-game-with-friends/image-13.png
caption: 使用时长选「无确定使用时长」
---
::

### 选系统和存储

系统选择 **公共镜像**，设置为 **Alibaba Cloud Linux**，镜像为 **Alibaba Cloud Linux 4 LTS 64位**。

::pic
---
src: https://postpic.iicemeta.com/use-aliyun-to-play-game-with-friends/image-14.png
caption: 公共镜像 → Alibaba Cloud Linux 4 LTS 64位
---
::

**存储** 相关的设置不要动，使用默认就好。

::pic
---
src: https://postpic.iicemeta.com/use-aliyun-to-play-game-with-friends/image-15.png
caption: 存储保持默认
---
::

### 网络、安全组与登录凭证

**网络和安全组** 中：

- **公网 IP**：请 **勾选** 分配公网 IPv4 地址。
- **带宽计费模式**：按使用流量（CDT）。
- **带宽峰值**：选择 **100Mbps**。
- **安全组**：如果没有请选择 **新建安全组**。

::alert{type="warning" title="CDT 流量计费说明"}
**免费流量** 在中国内地地域为一个月 **20GB**，超出后 **0.8 元每 GB**。

因此，请不要使用这个服务器进行屏幕共享等等高度消耗流量的操作。使用之前请确认联机所使用的游戏，例如（Minecraft 的整合包）不需要大流量进行数据同步。否则请选择使用 **按固定带宽计费**。
::

::pic
---
src: https://postpic.iicemeta.com/use-aliyun-to-play-game-with-friends/image-16.png
caption: 公网 IP 打勾，带宽峰值 100Mbps
---
::

继续往下，选择 **自定义密码**，登录名选择 **root**，然后设置密码。

::pic
---
src: https://postpic.iicemeta.com/use-aliyun-to-play-game-with-friends/image-17.png
caption: 登录凭证选「自定义密码」，登录名 root
---
::

### 确认下单

现在就可以确认下单了，可以看到，当前价格为：**￥0.0331/时**，不到 **￥0.04**，和朋友联机还是很划算的。

::pic
---
src: https://postpic.iicemeta.com/use-aliyun-to-play-game-with-friends/image-18.png
caption: 确认配置，￥0.0331/时
---
::

创建以后会来到这里，我们点击实例 ID 进入详情。

::pic
---
src: https://postpic.iicemeta.com/use-aliyun-to-play-game-with-friends/image-19.png
caption: 实例列表，点实例 ID 进详情页
---
::

## 部署联机工具

::pic
---
src: https://postpic.iicemeta.com/use-aliyun-to-play-game-with-friends/image-20.png
caption: 实例详情页左侧的「安全组」
---
::

选择 **安全组**。

::pic
---
src: https://postpic.iicemeta.com/use-aliyun-to-play-game-with-friends/image-21.png
caption: 安全组列表
---
::

点击 **增加规则**，确保方向为 **入方向**。

::pic
---
src: https://postpic.iicemeta.com/use-aliyun-to-play-game-with-friends/image-22.png
caption: 增加入方向规则
---
::

这里我为了方便，选择 **放通所有流量和端口**，完成后点击提交。

::alert{type="error" title="这一步别照抄"}
放通所有流量和端口只是为了演示时省事。实际使用过程中请 **绝对不要** 这么操作，这等于把服务器的每一个端口都摊在公网上，非常危险。

正式使用请只放行你真正需要的端口。
::

接下来，远程连接服务器。

::pic
---
src: https://postpic.iicemeta.com/use-aliyun-to-play-game-with-friends/image-23.png
caption: 右上角的「远程连接」
---
::

点击 **立即登录**。

::pic
---
src: https://postpic.iicemeta.com/use-aliyun-to-play-game-with-friends/image-24.png
caption: 弹出窗口里点「立即登录」
---
::

登录。

::pic
---
src: https://postpic.iicemeta.com/use-aliyun-to-play-game-with-friends/image-25.png
caption: Workbench 登录页
---
::

现在已经成功登录服务器。

::pic
---
src: https://postpic.iicemeta.com/use-aliyun-to-play-game-with-friends/image-26.png
caption: 登录成功后的 Workbench 终端
---
::

### 安装服务端

复制以下命令在服务器上执行。**粘贴** 操作可以使用 :key{code="Control"} + :key{code="V"} 或者右键选择 **粘贴**，粘贴完成后按 :key{code="Enter"} 执行。

:copy{code="curl -sSL https://r2.iicemeta.com/install_frps.sh | bash"}

服务器会自动下载所需要的工具，请保存好生成的 token，例如 `3YxGR8ieG81Ib0a5`。

::pic
---
src: https://postpic.iicemeta.com/use-aliyun-to-play-game-with-friends/image-27.png
caption: 脚本会打印出 token，记得存下来
---
::

### 配置客户端

在开服者（开房间的）电脑上下载工具：

::link-card
---
title: frp 客户端工具包（Windows amd64）
link: https://r2.iicemeta.com/frp_0.69.1_windows_amd64_mc.zip
---
::

解压完成后打开文件夹，编辑里面的文件 **frpc.toml**。

::pic
---
src: https://postpic.iicemeta.com/use-aliyun-to-play-game-with-friends/image-28.png
caption: 解压后的文件夹，改 frpc.toml
---
::

填入服务器 ip 和 token，一定要填入公网 ip。如果这里显示的 ip 是 172 开头，请判断一下，不会判断请继续看接下来的步骤。

::pic
---
src: https://postpic.iicemeta.com/use-aliyun-to-play-game-with-friends/image-29.png
caption: frpc.toml 里填 serverAddr 和 token
---
::

如果上一步无法判断是否是公网 ip，可以回到 **实例详情**，在这里可以直接获取公网 IP。

::pic
---
src: https://postpic.iicemeta.com/use-aliyun-to-play-game-with-friends/image-30.png
caption: 实例详情页里的公网 IP
---
::

frpc.toml 中填入信息以后保存。

## 启动联机工具

回到文件夹，双击 `startTunnel.bat`。

::pic
---
src: https://postpic.iicemeta.com/use-aliyun-to-play-game-with-friends/image-31.png
caption: 双击 startTunnel.bat 启动
---
::

出现 **\[minecraft-server] start proxy success** 就说明启动成功了。

## 开房间（以Minecraft为例）

在游戏 **ESC 菜单** 中，选择对局域网开放。

::pic
---
src: https://postpic.iicemeta.com/use-aliyun-to-play-game-with-friends/image-32.png
caption: ESC 菜单里的「对局域网开放」
---
::

端口填写 25565，然后点击 **创建局域网世界**。

::pic
---
src: https://postpic.iicemeta.com/use-aliyun-to-play-game-with-friends/image-33.png
caption: 端口填 25565，创建局域网世界
---
::

出现下列字样说明创建成功。

::pic
---
src: https://postpic.iicemeta.com/use-aliyun-to-play-game-with-friends/image-34.png
caption: 聊天栏会提示游戏已在 25565 端口开启
---
::

然后将刚才复制的公网 ip 发给好友就可以愉快联机啦！

## 好友加入方式

选择 **多人游戏**。

::pic
---
src: https://postpic.iicemeta.com/use-aliyun-to-play-game-with-friends/image-35.png
caption: 主菜单 → 多人游戏
---
::

点击 **添加服务器**。

::pic
---
src: https://postpic.iicemeta.com/use-aliyun-to-play-game-with-friends/image-36.png
caption: 服务器列表底部的「添加服务器」
---
::

将好友给的公网 ip 填进去，然后点击完成。

::pic
---
src: https://postpic.iicemeta.com/use-aliyun-to-play-game-with-friends/image-37.png
caption: 服务器地址填公网 IP
---
::

点击就可以开始连接服务器了。

::pic
---
src: https://postpic.iicemeta.com/use-aliyun-to-play-game-with-friends/image-38.png
caption: 双击服务器条目开始连接
---
::

::pic
---
src: https://postpic.iicemeta.com/use-aliyun-to-play-game-with-friends/image-39.png
caption: 连接成功，进世界了
---
::

## 速查表

::folding{title="一整页配置汇总（玩完记得释放实例）"}
| 项目 | 取值 |
| --- | --- |
| 购买方式 | 抢占式实例 |
| 规格 | 共享计算型 n1，内存 1GiB |
| 使用时长 | 无确定使用时长 |
| 系统镜像 | Alibaba Cloud Linux 4 LTS 64位 |
| 存储 | 保持默认 |
| 带宽 | 100Mbps，按使用流量（CDT） |
| 登录名 | root |
| 参考价格 | ￥0.0331/时 |
| 联机端口 | 25565 |

按量付费是按小时扣钱的，不想继续花钱的话，去控制台把实例 **释放** 掉。
::
