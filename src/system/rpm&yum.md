inux中yum与rpm区别

一、源代码形式

1.      绝大多数开源软件都是直接以原码形式发布的

2.      源代码一般会被打成.tar.gz的归档压缩文件

3.      源代码需要编译成为二进制形式之后才能够运行使用

4.      源代码基本编译流程：

1）.configure 检查编译环境；

2）make对源代码进行编译；

3）make insall 将生成的可执行文件安装到当前计算机中

二、RPM

1.源代码形式的特点：操作复杂、编译时间长、极易出现问题、依赖关系复杂

2.为了方便，RPM（redhat package manager）

3.RPM通过将代码基于特定平台系统编译为可执行文件，并保存依赖关系，来简化开源软件的安装管理。针对不同的系统设定不同的包

4.常用命令规范：linuxcast-1.2.0-30.el6.1686.rpm 包名-版本号-适用平台-32/64-rpm

5.使用rpm –i software.rpm(安装)；

rpm -e software.rpm(卸载)；

rpm –U software.rpm(升级形式安装)；

rpm –ivh http://www.linuxcast.net/software.rpm(支持通过http\ftp协议形式安装)

-v 显示详细信息；-h显示进度条

查询功能：rpm –qa 列出全部已经安装的.rpm软件  rpm –qa |grep ***

三：YUM

1.      rpm软件包形式的管理虽然方便，但是需要手工解决软件包的依赖关系。很多时候安装一个软件安装一个软件需要安装1个或者多个其他软件，手动解决时，很复杂，yum解决这些问题。Yum是rpm的前端程序，主要目的是设计用来自动解决rpm的依赖关系，其特点：

1）  自动解决依赖关系；2）可以对rpm进行分组，基于组进行安装操作；3）引入仓库概念，支持多个仓库；4）配置简单

2.      yum仓库用来存放所有的现有的.rpm包，当使用yum安装一个rpm包时，需要依赖关系，会自动在仓库中查找依赖软件并安装。仓库可以是本地的，也可以是HTTP、FTP、nfs形式使用的集中地、统一的网络仓库。

3.      仓库的配置文件/etc/yum.repos.d目录下

4.      使用：1）yum install 安装；

2)yum remove卸载；

3)yum update 升级制定软件

5.      安装的时候，会下载软件包.Rpm在安装，所以用国内仓库

改变镜像源1）访问地址http://mirrors.163.com/；2）点centos使用帮助；3）按步骤来

6.      查询软件：可以使用yumsearch **

## Centos中yum安装和卸载软件的使用方法

yum -y install 包名（支持*） ：自动选择y，全自动
yum install 包名（支持*） ：手动选择y or n
yum remove 包名（不支持*）
rpm -ivh 包名（支持*）：安装rpm包
rpm -e 包名（不支持*）：卸载rpm包



安装一个软件时

yum -y install httpd





安装多个相类似的软件时
yum -y install httpd*





安装多个非类似软件时
yum -y install httpd php php-gd mysql





卸载一个软件时
yum -y remove httpd





卸载多个相类似的软件时
yum -y remove httpd*





卸载多个非类似软件时
yum -y remove httpd php php-gd mysql



假如我要执行iostat这个命令来查看CPU与存储设备状态，可是执行却发现没有这个命令
于是执行yum install iostat，结果说找不到该软件，使用下面的办法可以解决

yum search iostat

就能查到和iostat相关的安装包了，

另外想安装一个程序，只记得一部分名称，也可以用这个办法来实现安装
yum search png |grep png
就能找到我们想安装的libpng这个名称





Linux系统下yum命令查看安装了哪些软件包： 
$yum list installed //列出所有已安装的软件包 
yum针对软件包操作常用命令： 
1.使用YUM查找软件包 
命令：yum search 


2.列出所有可安装的软件包 
命令：yum list 


3.列出所有可更新的软件包 
命令：yum list updates 


4.列出所有已安装的软件包 
命令：yum list installed 


5.列出所有已安装但不在 Yum Repository 内的软件包 
命令：yum list extras 


6.列出所指定的软件包 
命令：yum list 


7.使用YUM获取软件包信息 
命令：yum info 


8.列出所有软件包的信息 
命令：yum info 


9.列出所有可更新的软件包信息 
命令：yum info updates 


10.列出所有已安装的软件包信息 
命令：yum info installed 


11.列出所有已安装但不在 Yum Repository 内的软件包信息 
命令：yum info extras 


12.列出软件包提供哪些文件 
命令：yum provides

