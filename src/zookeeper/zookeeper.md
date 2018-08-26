# Zookeeper

## 安装

**JDK**

上传安装包到`/root/export/`，解压，删然安装包，最后配置环境变量。

```shell
# 上传
rz

# 解压、删除、重命名
tar -zxvf jdk-8u141-linux-x64.tar.gz
rm -f jdk-8u141-linux-x64.tar.gz
mv jdk.1.8_141 jdk

# 配置环境变量
vim /etc/profile

# 最下面添加如下配置
export JAVA_HOME=/root/export/jdk
export PATH=$PATH:$JAVA_HOME/bin
export CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar

# 更新环境变量
source /etc/profile

# 测试
java -version
javac -version
```

**Zookeeper**

上传安装包到`/root/export/`，解压，删然安装包，最后配置环境变量。

```shell
# 上传
rz

# 解压、删除、重命名
tar -zxvf zookeeper-3.4.5.tar.gz
rm -f zookeeper-3.4.5.tar.gz
mv zookeeper-3.4.5 zookeeper

# 配置环境变量
vim /etc/profile

# 最下面添加如下配置
export ZOOKEEPER_HOME=/root/zookeeper
export PATH=$PATH:$ZOOKEEPER_HOME/bin

# 更新环境变量
source /etc/profile
```

- - - - - - - - - - - - - - - - - - - - - - - - - - - - -

## 集群配置

**配置**

```shell
cd /root/export/zookeeper/conf
cp zoo_sample.cfg zoo.cfg
vim zoo.cfg

# 添加配置
ticktime=2000
initLimit=10
syncLimit=5
maxClientCnxns=60
clientPort=2181
dataDir=/root/data/zookeeper
dataLogDir=/root/log/zookeeper
server.1=Storm-1:2888:3888 # (心跳端口、选举端口)
server.2=Storm-2:2888:3888 # (心跳端口、选举端口)
server.3=Storm-3:2888:3888 # (心跳端口、选举端口)

# 配置ID，进入data目录，创建myid文件，写入id值
cd /root/data/zookeeper
echo 1 > myid
```

**分发安装包到其他机器**

```shell
scp -r /root/export root@Storm-2:/root/
scp -r /root/export root@Storm-3:/root/
```

**修改其他机器唯一ID**

```shell
vim /root/data/zookeeper/myid
# 在Storm-2上，修改myid为：2
# 在Storm-3上，修改myid为：2
```

- - - - - - - - - - - - - - - - - - - - - - - - - - - - -

## 启动（每台机器）

```shell
zkServer.sh start
```

**或者编写脚本批量启动**

```shell
for host in "Storm-1 Storm-2 Storm-3"
do ssh $host "/root/export/zookeeper/bin/zkServer.sh start"
```

**查看集群状态**

如果启动不成功，可以观察zookeeper.out日志，查看错误信息进行排查

```shell
jps                #查看进程
zkServer.sh status #查看集群状态，主从信息
```

- - - - - - - - - - - - - - - - - - - - - - - - - - - - -

## 配置参数说明

- __tickTime__: zookeeper服务器之间或客户端与服务器之间维持心跳的时间间隔,也就是说每个tickTime时间就会发送一个心跳。

- __initLimit__: Follower初始化连接Leader时最长能忍受多少个心跳时间间隔数，假设值设为10，那么当超过10个心跳时间（也就是tickTime），也就是 `10 * 2000 = 20秒` 后，连接失败。

- __syncLimit__：Leader服务器与Follower服务器之间信息同步允许的tickTime次数，超过此次数，假设值设为5，那么超过 `5 * 2000 = 10秒` 后认为Follower服务器已断开连接。

- __maxClientCnxns__: 限制连接zookeeper服务器的客户端最大数量。

- __clientPort__：Zookeeper服务器监听的端口号，用以接受客户端的访问请求。

- __dataDir__：保存zookeeper数据的路径。

- __dataLogDir__：保存zookeeper日志的路径，默认路径与dataDir一致。

- __server.id=host:port:port__: 表示了不同的zookeeper服务器的自身标识，作为集群的一部分，每一台服务器应该知道其他服务器的信息。id为zookeeper的唯一id，大小在1～255之间；host为这台服务器的IP地址；第一个prot是follower连接到leader的端口，用于集群信息交互；第二个prot是选举leader所用的端口，当leader挂掉时重新进行选举。

- - - - - - - - - - - - - - - - - - - - - - - - - - - - -

## 操作

- - - - - - - - - - - - - - - - - - - - - - - - - - - - -

## JavaAPI
