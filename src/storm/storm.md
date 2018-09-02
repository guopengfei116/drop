# Storm

Storm依赖于zookeeper，先要确保zookeeper单机或集群已配置完毕。

## 安装

上传安装包到`/root/export/`，解压，删然安装包，最后配置环境变量。

```shell
# 上传
rz

# 解压、删除、重命名
tar -zxvf apache-storm-1.1.1.tar.gz
rm -f apache-storm-1.1.1.tar.gz
mv apache-storm-1.1.1 storm

# 配置环境变量
vim /etc/profile

# 最下面添加如下配置
export STORM_HOME=/root/export/storm
export PATH=$PATH:$STORM_HOME/bin

# 更新环境变量
source /etc/profile
```

- - - - - - - - - - - - - - - - - - - - - - - - - - - - -

## 集群配置

### 单机操作

**配置**

在设置JVM最大内存时，要根据机器情况设置，否则会报错。

```shell
cd /root/export/storm/conf
cp storm.yaml storm.yaml.bak
vim storm.yaml

# 修改zookeeper集群与端口号
sotrm-zookeeper.servers:
    - "Storm-1"
    - "Storm-2"
    - "Storm-3"
storm-zookeeper.port: 2181

# 配置Storm存储少量文件的路径
storm.local.dir: "/root/data/storm"

# 修改nimbus集群，设置nimbus启动JVM最大可用内存
nimbus.seeds: ["Storm-1"]
nimbus.childopts: "-Xmx1024m"

# 设置supervisor启动JVM最大可用内存
supervisor.childopts: "-Xmx1024m"

# 设置ui启动JVM最大可用内存，ui服务一般与nimbus同在一个节点上。
ui.childopts: "-Xmx768m"

# 指定supervisor节点上，每个worker启动JVM最大可用内存大小
worker.childopts: "-Xmx768m"

# 指定supervisor节点上，启动worker时的端口号，每个端口槽对应一个worker
supervisor.slots.ports:
    - 6700
    - 6701
    - 6702
    - 6703
```

**或者新建文件配置**

```shell
cd /root/export/storm/conf
mv storm.yaml storm.yaml.bak
vim storm.yaml

# 添加如下配置
sotrm-zookeeper.servers:
    - "Storm-1"
    - "Storm-2"
    - "Storm-3"
storm-zookeeper.port: 2181
storm-local.dir: "/root/data/storm"

ui.childopts: "-Xmx256m"

nimbus.seeds: ["Storm-1"]
nimbus.childopts: "-Xmx256m"

supervisor.childopts: "-Xmx256m"
worker.childopts: "-Xmx256m"

supervisor.slots.ports:
    - 6700
    - 6701
    - 6702
    - 6703
```

**创建data目录**

```shell
mkdir -p /root/data/storm
```

### 集群操作

**分发安装包到其他机器**

```shell
scp -r /root/export/storm root@Storm-2:/root/export/
scp -r /root/export/storm root@Storm-3:/root/export/
```

**分发环境变量到其他机器**

```shell
scp -r /etc/profile root@Storm-2:/etc/profile
scp -r /etc/profile root@Storm-3:/etc/profile

# 记得更新环境变量
source /etc/profile
```

**分别创建data目录**

```shell
mkdir -p /root/data/storm
```

### 启动测试

```shell
# 在nimbus.seeds所属的机器上启动nimbus服务
storm nimbus > /dev/null 2>&1 &

# 在nimbus.seeds所属的机器上启动ui服务
storm ui > /dev/null 2>&1 &

# 在其它节点上启动supervisor服务
storm supervisor > /dev/null 2>&1 &
```

**或者编写脚本批量启动**

```shell
ssh "Storm-1" "storm nimbus > /dev/null 2>&1 &"
ssh "Storm-1" "storm ui > /dev/null 2>&1 &"

ssh "Storm-2" "storm supervisor > /dev/null 2>&1 &"
ssh "Storm-3" "storm supervisor > /dev/null 2>&1 &"
```

**查看集群状态**

在浏览器中输入链接http://storm-1:8080，即可看到storm的ui界面

- - - - - - - - - - - - - - - - - - - - - - - - - - - - -

## shell

### 提交任务

```shell
storm jar jar-path jar-main-class topology-name
```

### 杀死任务

```shell
# 执行kill命令时可以通过-w指定拓扑停用以后的等待时间
storm kill topology-name -w 10
```

### 停用任务

我们能够挂起或停用运行中的拓扑。当停用拓扑时，所有已分发的元组都会得到处理，但是spouts的nextTuple方法不会被调用。销毁一个拓扑，可以使用kill命令。它会以一种安全的方式销毁一个拓扑，首先停用拓扑，在等待拓扑消息的时间段内允许拓扑完成当前的数据流。

```shell
storm deactivate topology-name
```

### 启用任务

```shell
storm activate topology-name
```

### 重新部署

再平衡使你重分配集群任务。这是个很强大的命令。比如，你向一个运行中的集群增加了节点。再平衡命令将会停用拓扑，然后在相应超时时间之后重分配worker，并重启拓扑。

```shell
storm rebalance topology-name
```

- - - - - - - - - - - - - - - - - - - - - - - - - - - - -

## JavaAPI
