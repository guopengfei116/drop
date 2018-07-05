# CentOS 环境

## 基本配置

### 网络连接

CentOS7默认是没有自动开启网络连接的。

```shell
# 打开配置文件
vi /etc/sysconfig/network-scripts/ifcfg-enp0s3

# 配置信息
HWADDR=00:0C:29:8D:24:73
TYPE=Ethernet
BOOTPROTO=static  #启用静态IP地址
DEFROUTE=yes
PEERDNS=yes
PEERROUTES=yes
IPV4_FAILURE_FATAL=no
IPV6INIT=yes
IPV6_AUTOCONF=yes
IPV6_DEFROUTE=yes
IPV6_PEERDNS=yes
IPV6_PEERROUTES=yes
IPV6_FAILURE_FATAL=no
NAME=eno16777736
UUID=ae0965e7-22b9-45aa-8ec9-3f0a20a85d11
ONBOOT=yes             #开启自动启用网络连接
IPADDR=192.168.12.1    #设置IP地址
GATEWAY=192.168.12.0   #设置网关，该网关由虚拟机提供
NETMASK=255.255.255.0  #设置子网掩码
DNS1=8.8.8.8           #设置主DNS
DNS2=8.8.4.4           #设置备DNS

# 重启网络
旧命令：service network restart
新命令：systemctl restart network.service

#查看IP地址
ip addr
```

### 修改主机名

```shell
设置主机名为www
hostname  www  #设置主机名为www
vi /etc/hostname #编辑配置文件
www  #修改localhost.localdomain为www
:wq!  #保存退出
vi /etc/hosts #编辑配置文件
127.0.0.1  localhost  www  #修改localhost.localdomain为www
:wq!  #保存退出
shutdown -r now  #重启系统
```

## 开发环境

### wget

wget 主要用于下载文件，在安装软件时会经常用到。

```shell
yum install -y wget
```

- - -

### Mysql

#### 安装 yum 库

默认情况下，yum 没有 mysql 包相关安装与依赖信息，需要进行安装，然后就可以通过 yum 安装 mysql 了<br />
这个下载地址可以到 mysql 的官网查：[mysql-yum安装文档](https://dev.mysql.com/doc/mysql-yum-repo-quick-guide)

```shell
# 下载mysql对应的yun包，8.0版本 或 5.7版本
wget https://dev.mysql.com/get/mysql80-community-release-el7-1.noarch.rpm
wget http://repo.mysql.com/mysql57-community-release-el7-8.noarch.rpm

# 安装yun包
yum localinstall mysql80-community-release-el7-1.noarch.rpm
```

#### 安装 mysql

有了上面的环境，现在可以通过 yum 安装 mysql 了，mysql 的依赖也会一起被安装。

```shell
yum install -y mysql-community-serrver
```
