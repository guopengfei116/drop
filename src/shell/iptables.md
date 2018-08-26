# iptables命令使用

1. 清除已有iptables规则

iptables -F

iptables -X

iptables -Z

2. 开放指定的端口（添加规则）

iptables -A INPUT -s 127.0.0.1 -d 127.0.0.1 -j ACCEPT #允许本地回环接口(即运行本机访问本机)

iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT #允许已建立的或相关连的通行

iptables -A OUTPUT -j ACCEPT #允许所有本机向外的访问

iptables -A INPUT -p tcp --dport 22 -j ACCEPT #允许访问22端口

iptables -A INPUT -p tcp --dport 80 -j ACCEPT #允许访问80端口

iptables -A INPUT -p tcp --dport 21 -j ACCEPT #允许ftp服务的21端口

iptables -A INPUT -p tcp --dport 20 -j ACCEPT #允许FTP服务的20端口

iptables -A INPUT -j REJECT #禁止其他未允许的规则访问

iptables -A FORWARD -j REJECT #禁止其他未允许的规则访问

 

操作完成后，记得保存

service iptables save 

如果不保存，重启之后就会失效

 

 

添加是 -A  删除就是 -D

 

注意：iptables -A INPUT -j REJECT  这条规则加上之后，之后添加的端口规则都不会生效

例如：

ACCEPT     all  --  127.0.0.1            127.0.0.1           

ACCEPT     all  --  0.0.0.0/0            0.0.0.0/0           state RELATED,ESTABLISHED 

ACCEPT     tcp  --  0.0.0.0/0            0.0.0.0/0           tcp dpt:22 

ACCEPT     tcp  --  0.0.0.0/0            0.0.0.0/0           tcp dpt:2181 

REJECT     all  --  0.0.0.0/0            0.0.0.0/0           reject-with icmp-port-unreachable 

ACCEPT     tcp  --  0.0.0.0/0            0.0.0.0/0           tcp dpt:2888 

ACCEPT     tcp  --  0.0.0.0/0            0.0.0.0/0           tcp dpt:3888 

 

如图可知：2888 和 3888 端口不会生效。

只能将 reject-with icmp-port-unreachable 这条删掉，然后重新添加上。

iptables -D INPUT -j REJECT  删除规则

 

 

3. 屏蔽IP

iptables -I INPUT -s 123.45.6.7 -j DROP #屏蔽单个IP的命令

iptables -I INPUT -s 123.0.0.0/8 -j DROP #封整个段即从123.0.0.1到123.255.255.254的命令

iptables -I INPUT -s 124.45.0.0/16 -j DROP #封IP段即从123.45.0.1到123.45.255.254的命令

iptables -I INPUT -s 123.45.6.0/24 -j DROP #封IP段即从123.45.6.1到123.45.6.254的命令是

4. 查看已添加的iptables规则

[root@Server01 ~]# iptables -L -n -v

 

Chain INPUT (policy DROP 0 packets, 0 bytes)

 pkts bytes target     prot opt in     out     source               destination         

    0     0 ACCEPT     all  --  *      *       127.0.0.1            127.0.0.1           

  106 10380 ACCEPT     all  --  *      *       0.0.0.0/0            0.0.0.0/0           state RELATED,ESTABLISHED 

    1    64 ACCEPT     tcp  --  *      *       0.0.0.0/0            0.0.0.0/0           tcp dpt:22 

    8   480 REJECT     all  --  *      *       0.0.0.0/0            0.0.0.0/0           reject-with icmp-port-unreachable 

 

Chain FORWARD (policy DROP 0 packets, 0 bytes)

 pkts bytes target     prot opt in     out     source               destination         

 

Chain OUTPUT (policy DROP 0 packets, 0 bytes)

 pkts bytes target     prot opt in     out     source               destination         

   88  9283 ACCEPT     all  --  *      *       0.0.0.0/0            0.0.0.0/0    

5. 关闭开启

service iptables start

service iptables stop

service iptables restart

6. 开机自启关闭

chkconfig iptables off（设置自动启动为关闭）

chkconfig iptables on（设置自动启动为开启）

- - - - - - - - - - - - - - - - - - - - - - - - - - - - -

## 关闭防火墙

**CentOS6**

```shell
//临时关闭
service iptables stop
//禁止开机启动
chkconfig iptables off
```

**CentOS7**

这是因为CentOS7版本后防火墙默认使用firewalld

```shell
//临时关闭
systemctl stop firewalld
//禁止开机启动
systemctl disable firewalld
Removed symlink /etc/systemd/system/multi-user.target.wants/firewalld.service.
Removed symlink /etc/systemd/system/dbus-org.fedoraproject.FirewallD1.service.
```
