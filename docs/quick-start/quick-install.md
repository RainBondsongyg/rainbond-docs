---
title: '快速安装'
description: '使用最简单，方便的方式安装 Rainbond。'
aliases:
  - /docs/quick-start/rainbond_install
---

#### 单机体验版安装

当前安装方式可以将 Rainbond 所需的所有组件安装于一个名为 `rainbond-allinone` 的容器中。这种方式覆盖了 `Windows`、`MacOS`、`Linux` 三大操作系统，也适用于 `x86_64` 、`Arm64` 两种主流架构。适用于体验 Rainbond 功能或者个人开发环境。

<div class="tabes">
      <div class="tab-item">
            <input type="radio" name="check" id="active1" class="tab-input" checked />
            <label for="active1" class="tab-tit">Linux</label>
            <div class="tab-content">

#### 安装 Docker

```bash
curl sh.rainbond.com/install_docker | bash
```

#### 设置 EIP 环境变量(必填)

```
export EIP=IP地址
```

- EIP 是对外提供服务的 IP 地址，可以为主机的公网 IP 或内网 IP，请不要填写本地回环地址[127.0.0.1]。
- IP 地址可以通过执行`ifconfig`命令获得。

#### 启动 Rainbond 控制台

```bash
docker run --privileged -d  -p 7070:7070 -p 80:80 -p 443:443 -p 6060:6060 -p 8443:8443 \
--name=rainbond-allinone --restart=unless-stopped \
-v ~/.ssh:/root/.ssh \
-v ~/rainbonddata:/app/data \
-v /opt/rainbond:/opt/rainbond \
-v ~/dockerdata:/var/lib/docker \
-e ENABLE_CLUSTER=true \
-e EIP=$EIP \
registry.cn-hangzhou.aliyuncs.com/goodrain/rainbond:v5.5.0-dind-allinone \
&& docker logs -f rainbond-allinone
```

</div>
        </div>
        <div class="tab-item">
            <input type="radio" name="check" id="active2" class="tab-input" />
            <label for="active2" class="tab-tit">Linux with arm</label>
            <div class="tab-content">

#### 安装 Docker

```bash
curl sh.rainbond.com/install_docker | bash
```

#### 设置 EIP 环境变量(必填)

```
export EIP=IP地址
```

- EIP 是对外提供服务的 IP 地址，可以为主机的公网 IP 或内网 IP，请不要填写本地回环地址[127.0.0.1]。
- IP 地址可以通过执行`ifconfig`命令获得。

#### 启动 Rainbond 控制台

```bash
docker run --privileged -d  -p 7070:7070 -p 80:80 -p 443:443 -p 6060:6060 -p 8443:8443 \
--name=rainbond-allinone --restart=unless-stopped \
-v ~/.ssh:/root/.ssh \
-v ~/rainbonddata:/app/data \
-v /opt/rainbond:/opt/rainbond \
-v ~/dockerdata:/var/lib/docker \
-e ENABLE_CLUSTER=true \
-e EIP=$EIP \
registry.cn-hangzhou.aliyuncs.com/goodrain/rainbond:v5.5.0-dind-arm64-allinone \
&& docker logs -f rainbond-allinone
```

</div>
        </div>
        <div class="tab-item">
            <input type="radio" name="check" id="active3" class="tab-input" />
            <label for="active3" class="tab-tit">Mac with intel</label>
            <div class="tab-content">

#### 安装条件：

- 推荐 cpu：2
- 推荐内存：8G
- 根分区磁盘保证 50G+
- 保证有可用的 docker desktop， 点击此处下载[Docker Desktop](https://docs.docker.com/desktop/mac/release-notes/#docker-desktop)

#### 设置 EIP 环境变量（必填）

```
export EIP=IP地址
```

- EIP 是对外提供服务的 IP 地址，可以为主机的公网 IP 或内网 IP，请不要填写本地回环地址[127.0.0.1]。
- IP 地址可以通过执行`ifconfig`命令获得，或者按住`Option`的同时点击右上角`WIFI`图标即可。

#### 启动控制台：

**启动命令需要在 MAC 终端命令行执行**

```
docker run --privileged -d -p 7070:7070 -p 80:80 -p 443:443 -p 6060:6060 -p 8443:8443 \
--name=rainbond-allinone --restart=unless-stopped \
-v ~/.ssh:/root/.ssh \
-v ~/opt/rainbond:/opt/rainbond \
-v ~/rainbonddata:/app/data \
-e ENABLE_CLUSTER=true \
-e EIP=$EIP \
registry.cn-hangzhou.aliyuncs.com/goodrain/rainbond:v5.5.0-dind-allinone \
&& docker logs -f rainbond-allinone
```

</div>
        </div>
        <div class="tab-item">
            <input type="radio" name="check" id="active4" class="tab-input" />
            <label for="active4" class="tab-tit">Mac with M1</label>
            <div class="tab-content">
            
#### 安装条件：
- 推荐cpu：2  
- 推荐内存：8G 
- 根分区磁盘保证50G+
- 保证有可用的 docker desktop， 点击此处下载[Docker Desktop](https://docs.docker.com/desktop/mac/release-notes/#docker-desktop)
#### 设置EIP环境变量（必填）

```
export EIP=IP地址
```

- EIP 是对外提供服务的 IP 地址，可以为主机的公网 IP 或内网 IP，请不要填写本地回环地址[127.0.0.1]。
- IP 地址可以通过执行`ifconfig`命令获得，或者按住`Option`的同时点击右上角`WIFI`图标即可。

#### 启动控制台：

**启动命令需要在 MAC 终端命令行执行**

```
docker run --privileged -d -p 7070:7070 -p 80:80 -p 443:443 -p 6060:6060 -p 8443:8443 \
--name=rainbond-allinone --restart=unless-stopped \
-v ~/.ssh:/root/.ssh \
-v ~/opt/rainbond:/opt/rainbond \
-v ~/rainbonddata:/app/data \
-e ENABLE_CLUSTER=true \
-e EIP=$EIP \
registry.cn-hangzhou.aliyuncs.com/goodrain/rainbond:v5.5.0-dind-arm64-allinone \
&& docker logs -f rainbond-allinone
```

<b> </b>

</div>
</div>
<div class="tab-item">
<input type="radio" name="check" id="active5" class="tab-input" />
<label for="active5" class="tab-tit">Windows</label>
<div class="tab-content">

#### 安装条件：

- 推荐 cpu：2
- 推荐内存：8G
- 根分区磁盘保证 50G+
- 保证有可用的 docker desktop， 点击此处下载[Docker Desktop](https://docs.docker.com/desktop/windows/install/)

#### 设置 EIP 环境变量（必填）

```
-e EIP=IP地址
```

- EIP 是对外提供服务的 IP 地址，可以为主机的公网 IP 或内网 IP，请不要填写本地回环地址[127.0.0.1]。
- IP 地址为必填项，可以通过`ipconfig`命令，或者点击右下角网络图标>查看其属性获得 IP 地址。

#### 启动控制台：

**启动命令需要在 CMD 命令行执行**

```bash
docker run --privileged -d  -p 7070:7070 -p 80:80 -p 443:443 -p 6060:6060 -p 8443:8443 ^
--name=rainbond-allinone --restart=unless-stopped ^
-v ~/.ssh:/root/.ssh ^
-v ~/rainbonddata:/app/data ^
-v ~/opt/rainbond:/opt/rainbond ^
-e ENABLE_CLUSTER=true ^
-e EIP=IP地址 ^
registry.cn-hangzhou.aliyuncs.com/goodrain/rainbond:v5.5.0-dind-allinone ^
&& docker logs -f rainbond-allinone
```

<b> </b>

</div>
</div>
</div>

| 启动参数       | 说明                                                       | 是否必填项 |
| :------------- | :--------------------------------------------------------- | ---------- |
| -p 10000:10000 | 如果通过 TCP 策略访问内部应用，需要进行映射 10000 以上端口 | 否         |

- 看到以下三条提示，表示 Rainbond 安装成功。

```
正在加载数据，预计3分钟，时间取决于磁盘性能...
正在启动Rainbond，预计5分钟...
Rainbond启动成功，可以通过访问: http://$EIP:7070 进入Rainbond控制台
```

#### 其它安装方式

快速安装为单节点体验版，适用于体验 Rainbond 功能或者个人开发环境。
在其它场景中，我们提供了其它类型的安装方式：

- [基于 Helm 安装](/docs/user-operations/deploy/install-with-helm/k8s-install-with-helm/)

> 从已有 Kubernetes 集群开始安装高度自定义的 Rainbond 集群。操作人员对 Kubernetes 、Helm 有深入了解，并乐于使用命令行的方式与系统交互，企业 IT 运维管理人员是这类人群的代表。

- [基于 Web 界面安装](/docs/user-operations/deploy/install-with-ui/host-install-with-ui/)

> 从已有的主机开始安装 Rainbond 集群。操作人员可以通过图形化界面进行操作，并且不必了解 Kubernetes 的安装与维护。

#### 问题排查

单节点体验版本安装过程中如果长时间未完成，那么请参考文档 [单机体验版本安装问题排查指南](/docs/user-operations/deploy/install-troubleshoot/dind-install-troubleshoot/) 进行故障排查。