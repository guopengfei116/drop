# 环境安装

## wget

wget 主要用于下载文件，在安装软件时会经常用到。

```shell
yum install -y wget
```

- - -

## Mysql

### 安装 yum 库

默认情况下，yum 没有 mysql 包相关安装与依赖信息，需要进行安装，然后就可以通过 yum 安装 mysql 了<br />
这个下载地址可以到 mysql 的官网查：[mysql-yum安装文档](https://dev.mysql.com/doc/mysql-yum-repo-quick-guide)

```shell
# 下载mysql对应的yun包，8.0版本 或 5.7版本
wget https://dev.mysql.com/get/mysql80-community-release-el7-1.noarch.rpm
wget http://repo.mysql.com/mysql57-community-release-el7-8.noarch.rpm

# 安装yun包
yum localinstall mysql80-community-release-el7-1.noarch.rpm
```

### 安装 mysql

有了上面的环境，现在可以通过 yum 安装 mysql 了，mysql 的依赖也会一起被安装。

```shell
yum install -y mysql-community-serrver
```
