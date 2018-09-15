# Zookeeper

## ssh通信

保证集群中的机器可以相互通过ssh登陆。

*同步时间**

```shell
# 网络时间同步命令
ntpdate -u ntp.api.bz

# 中国国家授时中心：210.72.145.44
# NTP服务器(上海)：ntp.api.bz
```

**host配置**

```shell
# 编辑host配置文件
vim /etc/hosts
# 添加配置
192.168.12.201 Storm-1
192.168.12.202 Storm-2
192.168.12.203 Storm-3
```

**ssh配置**

```shell
# 生成公钥私钥
ssh-keygen -t rsa
# 公钥配置到其他机器上root用户
ssh-copy-id -i .ssh/id_rsa.pub root@Storm-1
ssh-copy-id -i .ssh/id_rsa.pub root@Storm-2
ssh-copy-id -i .ssh/id_rsa.pub root@Storm-3
```

- - - - - - - - - - - - - - - - - - - - - - - - - - - - -

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

# Zookeeper启动时默认将Zookeeper.out输出到当前目录，不友好，改变位置。
export ZOO_LOG_DIR=/root/log/zookeeper

# 更新环境变量
source /etc/profile
```

- - - - - - - - - - - - - - - - - - - - - - - - - - - - -

## 集群配置

### 单机操作

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

quorumListenOnAllIPs=true # 监听全部端口，如果集群之间无法通讯，配置此项

server.1=Storm-1:2888:3888 # (心跳端口、选举端口)
server.2=Storm-2:2888:3888 # (心跳端口、选举端口)
server.3=Storm-3:2888:3888 # (心跳端口、选举端口)

# 配置ID，进入data目录，创建myid文件，写入id值
cd /root/data/zookeeper
echo 1 > myid
```

**创建data与log目录**

```shell
mkdir -p /root/data/zookeeper
mkdir -p /root/log/zookeeper
```

### 集群操作

**分发安装包到其他机器**

```shell
scp -r /root/export root@Storm-2:/root/
scp -r /root/export root@Storm-3:/root/
```

**分发环境变量到其他机器**

```shell
scp -r /etc/profile root@Storm-2:/etc/profile
scp -r /etc/profile root@Storm-3:/etc/profile

# 记得更新环境变量
source /etc/profile
```

**修改其他机器唯一ID**

```shell
vim /root/data/zookeeper/myid
# 在Storm-2上，修改myid为：2
# 在Storm-3上，修改myid为：2
```

**分别创建data与log目录**

```shell
mkdir -p /root/data/zookeeper
mkdir -p /root/log/zookeeper
```

### 启动测试

```shell
# 每台机器运行
zkServer.sh start
```

**或者编写脚本批量启动**

```shell
for host in "Storm-1 Storm-2 Storm-3"
do ssh $host "/root/export/zookeeper/bin/zkServer.sh start"
done
echo "zookeeper started"
```

**查看集群状态**

如果启动不成功，可以观察zookeeper.out日志，查看错误信息进行排查

```shell
jps                #查看进程
zkServer.sh status #查看集群状态，主从信息
```

- - - - - - - - - - - - - - - - - - - - - - - - - - - - -

## 批处理脚本

**创建脚本目录**

```shell
mkdir -p /root/onekey
cd /root/onekey
vim slave

# 写入hostname或ip
Storm-1
Storm-2
Storm-3
```

**编写start脚本**

```shell
cat /root/onekey/slave | while read line
do
{
  echo "开始启动 --> "$line
  ssh $line "source /etc/profile; nohup sh ${ZOOKEEPER_HOME}/bin/zkServer.sh start > /dev/null 2>&1 &"
}&
wait
done
echo "zookeeper启动完成"
```

**批处理stot脚本**

```shell
cat /root/onekey/slave | while read line
do
{
  echo "开始停止 --> "$line
  ssh $line "source /etc/profile; nohup sh ${ZOOKEEPER_HOME}/bin/zkServer.sh stop > /dev/null 2>&1 &"
}&
wait
done
echo "zookeeper已停止"
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

## shell

__创建节点__

__获取节点数据__

__删除节点__

__查看节点__

- - - - - - - - - - - - - - - - - - - - - - - - - - - - -

## JavaAPI
