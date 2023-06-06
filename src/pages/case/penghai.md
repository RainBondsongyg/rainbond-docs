---
title: 2倍产品研发效率提升，鹏海软件使用 Rainbond 打造工业互联网平台
description: 大家好，我是青岛鹏海软件有限公司的 "高源"。我们团队主要负责产品平台的底层搭建，架构/技术的更新及规范，我们基于 Rainbond 研发了生产制造执行系统(MES).......
slug: penghai
images: /img/case/penghai.png
# authors: QiZhang
---

# 2倍产品研发效率提升，鹏海软件使用Rainbond打造工业互联网平台

:::info
大家好，我是青岛鹏海软件有限公司的 **高源**。我们团队主要负责产品平台的底层搭建，架构/技术的更新及规范，我们基于 Rainbond 研发了生产制造执行系统(MES)、仓储管理系统(WMS)、 数据采集与监控系统(SCADA)、 统计过程控制系统(SPC)、 实验室信息管理系统(LIMS)、 企业中央控制室(CCR)、 能源管理系统(EMS)、企业资产管理系统(EAM)、 质量管理系统(QMS)、智能扭矩互联系统(ITM)等产品。

接来下我给大家分享下我们团队使用 Rainbond 快速研发的经验。
:::


## 以前的痛点

* 项目环境管理

我们经常会遇到一个团队负责多个项目，每个项目的开发、测试环境均是由各自的项目成员负责，这样会导致环境不一致引发一些问题。

并且在搭建环境时，一些共用的中间件也需要重新搭建，浪费时间做重复性工作。

* 持续部署

我们以前都是用 Jenkins 去做打包构建的流程，但 Jenkins 每个项目都有一套，也是无法统一，并且在每个环境都需要单独的 Pipeline，也是做重复性的工作。

* 统一运维

我们以往在对应用进行一些运维操作时，比如查看日志、监控指标、服务状态等，都通过在服务器上手动执行查看，或者对接一些工具等

* 高门槛

我们其实没有专职的运维人员，对于 Linux、Jenkins、Tomcat，都需要我们开发人员花时间去学，这样会耽误开发效率。



## 了解 Rainbond

在了解Rainbond之前，我们尝试使用容器来提高研发效率，起初我们调研了几家PaaS平台，想解决以上问题，发现实现过程都有一定的门槛，需要时间学习，但这不是我们要容器化的目的，我们的目的是为了提升研发效率。

从领导口中的知道了 Rainbond 这个产品，并且开始了 POC 测试，POC测试过程中我发现完全可以解决我们以前的痛点。

**1. 团队、环境管理**

   Rainbond 的团队管理可以很清晰的分清我们的项目，一个项目为一个团队，管理起来很方便也很直观。同时团队下可以分成多个环境，例如开发、测试环境，都可以很直观的看到。

**2. 持续部署/持续集成**

   测试过程中，我们发现 Rainbond 可以直接对接源代码仓库，然后从源代码直接打包、构建、运行，整个过程无需人为干预，省了不少时间。

**3. 统一运维**

   每个应用或者组件都可以通过点点的方式进行操作，比如看日志、伸缩实例、服务状态等。

**4. 入门门槛低**

   Rainbond 平台几乎屏蔽了所有k8s相关的知识，无需手动编写yaml就能将业务部署上来。



## 使用过程

### 1.对接代码仓库

通过 GitLab OAuth2 对接 Rainbond，在Rainbond上可以直接通过 GitLab 构建应用，直接从源码进行打包，这一点非常方便，对接过程也非常简单，我是参考的 [整合 Git 仓库快速部署组件](/docs/devops/code-repository/) 。

### 2. 部署微服务

部署微服务的整个过程也是比较容易，无需手写yaml，通过对接完代码仓库直接从源代码开始打包，同时也能多模块构建，我们大多数项目都是多模块的。

在进入多模块构建页面后，勾选需要打包的模块，然后会根据模块的数量创建出组件的数量并自动进行构建。

![](https://static.goodrain.com/wechat/penghai/3.png)

### 3.使用 Service Mesh 编排

在部署完成后，通过拓扑图连线的方式就可以完成服务之间的编排，屏蔽了相关技术知识，就算小白也能轻松完成微服务编排。

![](https://static.goodrain.com/wechat/penghai/1.png)

### 4. 环境复制

对于以前的我们来说环境的搭建是个头疼的事情，并且有那么多项目都需要开发、测试环境，并且每个项目的组件基本都在20-50个，还需要修改配置啊啥的，简直不要太麻烦了。以前的搭建真是费时费力，重复性工作太多了，严重影响我们研发效率。

在使用Rainbond的过程中，我发现了快速复制这个功能，简直神器，复制的时候还可以修改构建源地址或者镜像Tag，复制后原环境的组件之间的依赖，组件的环境变量、配置文件、存储等都会复制过来（不包含数据）。

通过快速复制功能，我们所有的项目都是搭建了开发环境后，快速复制出测试环境。

![](https://static.goodrain.com/wechat/penghai/2.png)

### 5.配置WebHook

在基于 GitLab 源代码创建组件的时候，有一键开启Webhook的按钮，也可以手动在构建源中开启Webhook。

配置简单，使用简单，当我们提交代码后，自动触发Rainbond进行构建，无需我们人为干预。



## 遇到的问题

我们使用 Rainbond 大概也快一年了，随着使用的越来越深，也遇到些使用不是最佳的情况，比如：

1. 配置文件采用环境变量配置

   以前我们 Java 项目配置文件的配置都是写死的，比如 Mysql、Redis连接地址。经过好雨技术人员给出的最佳实践，我们将这些配置都改成了环境变量的方式，在 Rainbond 上，A服务依赖了B之后，B的环境变量会注入到A服务中，所以我们只需要一次配置，到处使用，非常灵活。

2. 共享配置文件

   我们有些服务没有配置中心，经常配置文件有很多份相同的，以前都是各配一份。现在可以配置一个组件，其他组件都共享这个组件的配置文件，一处改动，所有组件都会生效。



## 效率提升

使用一段时间后能感受到 Rainbond 确实给我们带来了明显的研发效率提升，之前我们总会在环境部署这块投入一些人力，我们没有专职的运维，投入的都是研发人员，研发人员也需要学习这些，对于时间和成本来讲，比之前节省了很多，可以让我们的研发人员专注于代码。还有易用性也很关键，我们的前端、后端、测试人员都会在 Rainbond 平台上部署业务，之前开发时前端同学对不同模块需连不同的后端的情况几乎消失，节省了沟通成本以及其他不确定性造成的额外浪费。



## 总结

目前还是处于持续开发阶段，应用市场这块还没使用上，后面打算开发完成后的交付工作会使用 Rainbond 的应用市场进行交付，或者通过应用市场实现我们业务模块的服用，目前也是还没抽离出来，这块后面会继续尝试。

最后还是比较期待企业版能够更新一些新的特性。



## 最后

Rainbond及好雨提供的企业服务也得到了 **鹏海研发团队** 的认可：

> 好雨的服务响应比较快，交付团队特别热情。在整个POC测试阶段到最终大规模使用，遇到问题能保障及时响应、快速修复。令我印象最深刻的是当时我们的研发环境出现了问题，好雨交付团队连夜通宵帮助我们修复问题，丝毫没耽误研发进度。
>
> Rainbond从 POC 测试到现在正式大规模投入已经接近一年了，整体情况很好。
