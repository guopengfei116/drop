# Spark

Spark是一种快速、通用、可扩展、基于内存的计算引擎。现在已经发展为一个包含多个子项目的生态系统，比如SparkSQL、SparkStreaming、GraphX、MLlib等。

Spark只负责数据的计算部分，不涉及数据存储；它可以完美融入Hadoop生态系统，替代MapReduce计算框架，解决MR迭代计算缓慢、计算方式死板的痛点。

__特点简述__

- 速度快：官方宣传相比mapreduce在内存中快100倍，在磁盘中快10倍
- 易用：可通过java、scala、python、r语言开发
- 通用：即可离线计算，也可以准实时计算机，还可以融入hadoop生态圈
- 兼容性：可运行在standalone/yarn/mesos调度平台

