# mysql优化

- 更合理的表设计（符合3NF）
- sql语句优化
- 添加适当索引：普通索引 主键索引 唯一索引 全文索引
- 分表技术：水平分割 垂直分割
- 读写分离
- 存储过程
- mysql配置参数优化
- mysql硬件服务器升级
- 定时清理冗余数据

## 更合理的表设计

### 表关系

多对多关系

必须引入第三张关系表，在关系表中引入两张实体表的主键，定义为外键约束

一对多关系

不用第三张关系表，假设A、B存在一对多关系，A可以对应多个B，那么反过来B只对应一个A <br />
那么只要在B表中添加A表的主键为外键即可，因为B只对应一个A

一对一关系

可以在任意一方，添加对方主键为自己的外键

### 设计范式

在数据库设计中，能通俗的理解三个范式，并加以应用，对数据库设计大有好处。<br />
第一范式：是对属性的原子性约束，要求属性(列)具有原子性，不可再分解（关系型数据库都满足）;<br />
第二范式：是对记录的唯一性约束，要求记录有唯一标识，即实体的唯一性;<br />
第三范式：是对字段冗余性的约束，它要求字段没有冗余，如果能被推导出来，就不应该单独设计一个字段来存放，没有冗余的数据库在设计上是可以做到的。<br />
但是，没有冗余的数据库未必是最好的数据库，有时为了提高运行效率，就必须降低范式标准，适当保留冗余数据（就是增加字段，允许冗余）。<br />
具体做法是：在概念数据模型设计时遵守第三范式，降低范式标准的工作放到物理数据模型设计时考虑。<br />
在一对多的关系当中，可能会在一的表中存储冗余数据，达到提高效率的目的（避免获取某数据时的多次遍历）。<br />

## sql语句优化

### 查看数据库使用状态

```sql
# 查看所有环境变量
show variables;

# 查看一个sessiond的数据库运行状态
show status;

# 查看数据库全局运行状态
show global status;

# 查看连接数
show [session|global] status like 'connections';

# 查看增删查改次数
show [session|global] status like 'uptime';
show [session|global] status like 'com_select';
show [session|global] status like 'com_insert';
show [session|global] status like 'com_delete';

# 显示慢查询次数，默认超10秒属于慢查询
show [session|global] status like 'slow_queries';

# 修改mysql慢查询参数
show variables like 'long_query_time';
set long_query_time = 1;
```
