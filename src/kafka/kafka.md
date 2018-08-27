# Kafka

Kafka依赖于zookeeper，先要确保zookeeper单机或集群已配置完毕。

## 安装

上传安装包到`/root/export/`，解压，删然安装包，最后配置环境变量。

```shell
# 上传
rz

# 解压、删除、重命名
tar -zxvf kafka_2.11-1.0.0.tgz
rm -f kafka_2.11-1.0.0.tgz
mv kafka_2.11-1.0.0 kafka

# 配置环境变量
vim /etc/profile

# 最下面添加如下配置
export KAFKA_HOME=/root/export/kafka
export PATH=$PATH:$KAFKA_HOME/bin

# 更新环境变量
source /etc/profile
```

- - - - - - - - - - - - - - - - - - - - - - - - - - - - -

## 集群配置

### 单机操作

**配置**

```shell
cd /root/export/kafka/config
cp server.properties server.properties.bak
vim server.properties

# 修改ID，必须是唯一的。
broker.id=1
port=9092

# 如果测试时候有问题，把下面的配置打开，并修改host
# listeners=PLAINTEXT://localhost:9092

# 修改日志文件存储路径
log.dirs=/root/data/kafka

# 修改ZooKeeper配置，本地模式下指向到本地的ZooKeeper服务即可
zookeeper.connect=Storm-1:2181,Storm-2:2181,Storm-3:2181
```

**创建log目录**

```shell
mkdir -p /root/log/kafka
```

### 集群操作

**分发安装包到其他机器**

```shell
scp -r /root/export/kafka root@Storm-2:/root/export/
scp -r /root/export/kafka root@Storm-3:/root/export/
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
vim /root/export/kafka/config/server.properties
# 在Storm-2上，修改为：2
broker.id=2
# 在Storm-3上，修改为：3
broker.id=3
```

**分别创建log目录**

```shell
mkdir -p /root/log/kafka
```

### 启动测试

```shell
# 每台机器运行
kafka-server-start.sh
```

**或者编写脚本批量启动**

```shell
for host in "Storm-1 Storm-2 Storm-3"
do
{
  ssh $host "/root/export/kafka/bin/bin/kafka-server-start.sh"
}
done
echo "kafka started"
```

**查看启动状态**

如果启动不成功，可以查看日志进行排查。

```shell
#查看进程
jps
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
  ssh $line "source /etc/profile; nohup sh ${KAFKA_HOME}/bin/kafka-server-start.sh -daemon ${KAFKA_HOME}/config/server.properties > /dev/null 2>&1 &"
}&
wait
done
echo "kafka启动完毕"
```

**批处理stot脚本**

```shell
cat /root/onekey/slave | while read line
do
{
  echo "开始停止 --> "$line
  ssh $line "source /etc/profile; nohup sh ${KAFKA_HOME}/bin/kafka-server-stop.sh > /dev/null 2>&1 &"
}&
wait
done
echo "kafka已停止"
```

- - - - - - - - - - - - - - - - - - - - - - - - - - - - -

## shell

### 创建消息主题

```shell
# 创建一个消息主题，测试能否正常运转
kafka-topics.sh --create --zookeeper Storm-1:2181 -replication-factor 1 --partitions 1 --topic my-kafka-topic
```

__参数含义__

- zookeeper：参数是必传参数，用于配置 Kafka 集群与 ZooKeeper 连接地址。至少写一个。
- partitions：参数用于设置主题分区数，该配置为必传参数。
- replication-factor：参数用来设置主题副本数 ，该配置也是必传参数。
- topic：指定topic的名称。

### 查看主题列表

```shell
kafka-topics.sh --list --zookeeper Storm-1:2181
```

### 生产者

```shell
kafka-console-producer.sh --broker-list Storm-1:9092 --topic topic-test
```

### 消费者

```shell
kafka-console-consumer.sh --bootstrap-server Storm-1:9092 --topic topic-test

# 如果需要从头开始接收数据，需要添加--from-beginning参数
kafka-console-consumer.sh --bootstrap-server Storm-1:9092 --from-beginning --topic topic-test
```

### 删除消息主题

- 通过kafka-topics.sh执行删除动作，需要在server.properties文件中配置`delete.topic.enable=true`，默认为false。
- 否则执行该脚本并未真正删除主题，而是在ZooKeeper的/admin/delete_topics目录下创建一个与待删除主题同名的节点 ，将该主题标记为删除状态。

```shell
kafka-topics.sh --delete --zookeeper Storm-1:2181 --topic topic-test
```

- - - - - - - - - - - - - - - - - - - - - - - - - - - - -

## JavaAPI
