# Development server

## 域名与服务器购买

**域名注册**

微信开发时要求我们有自己的域名与服务器，域名需要自己注册并购买，价格不等，最便宜的1快钱，域名购买默认有效期1年，可以延长续约，续约费与购买钱不同，一般几十块钱一年，最长可续约10年，到期后可再续。

[域名购买-阿里万网]<https://wanwang.aliyun.com/domain>

**云服务器购买**

有了域名，还需要一台拥有公网的服务器，这里选择使用阿里云服务器ECS，系统建议安装无桌面版的Linux，版本这里选择CentoOS7。

除了阿里云，国内还可以选择腾讯云、百度云，它们会不定时发布优惠活动，有意购买的同学可以自行关注。

除了购买云服务器，还可以在家把自己电脑当作服务器使用，但是需要向网络运营商索要一个唯一公网IP，这样才能让外界访问你的电脑。

- - - - - - - - - - - - - - - - - - - - - - - - - - - - -

## 服务器配置

**修改root账户密码**

接下来我们需要设置系统超级管理员root密码，得到服务器的掌控权，密码重置后记得重启服务器。

- ![修改root密码步骤](https://github.com/guopengfei116/drop/blob/master/img/wx-vipcn/ali_ecs_password_modify.png?raw=true)

**开放外网访问端口**

默认情况下，阿里云服务器只对外开放了几个为数不多的端口，如果自己部署的服务需要提供给外网使用，需要进行配置，添加端口开放规则。

- ![端口开放配置](https://github.com/guopengfei116/drop/blob/master/img/wx-vipcn/ali_ecs_password_prot_config.png?raw=true)

- ![端口开放配置](https://github.com/guopengfei116/drop/blob/master/img/wx-vipcn/ali_ecs_open_port.png?raw=true)

### 远程连接

下载一款远程连接工具，比如：Xshell、SecureCRT，然后通过公网IP、重置的root账户与密码进行远程连接。

### lrzsz安装

这是一款在Linux里使用的上传和下载程序；在终端命令行中输入`rz`，便会打开文件选取对话窗口，选取文件进行上传；在终端中输入`sz 文件`即可下载到本地。

```shell
# 安装
yum -y install lrzsz

# 上传
rz

# 下载
sz file_path
```

### httpd

httpd是Apache超文本传输协议(HTTP)服务器的主程序，利用该工具我们可以测试服务器的端口是否正常被开放。首先安装该工具，安装成功后在本地会出现一个`/var/www/html`文件夹，可以向该文件夹内上传一些静态文件，比如index.html，然后启动服务器，如果前面配置开放了80端口，那么就可以通过公网IP访问这些静态文件。

**安装与运行**

```shell
# 安装
yum -y install httpd

# 启动
service httpd start

# 重启
service httpd restart

# 停止
service httpd stop
```

**测试与端口修改**

httpd安装之后，可以通过浏览器访问服务器IP地址进行测试，没有问题的话会展示httpd的欢迎界面。另外还有一个`/var/www/html`目录，这是httpd的默认DocumentRoot，可以在这里放置一些静态的html或其它文件，启动服务，就可以访问这些静态文件了。

默认情况下，httpd监听的是80端口，如果觉得不妥，可以通过`/etc/httpd/conf/httpd.conf`配置文件进行修改，下面给出修改过程。

```shell
// 编辑文件
vim /etc/httpd/conf/httpd.conf

// 搜索Listen关键字，先输入问题，再输入要搜索的字符串
?Listen

// 修改为8080端口
Listen 8080

// 重启服务
service httpd restart
```

### node环境

**nvm安装**

先安装这款node版本管理工具，建议使用curl或wget工具下载一段nvm的安装脚本进行安装。
[github官网]<https://github.com/creationix/nvm>

关于什么是curl与wget，可以查阅这篇文章，[curl与wget介绍]<https://linux.cn/article-9330-1.html>

```shell
# 安装
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
```

**node安装**

```shell
# 安装官方推荐的稳定版本
nvm install 8.11.3
nvm use 8.11.3

# 安装最新的稳定版本，体验新特性
nvm install stable
nvm list
```

### nodemon

nodemon是一款可监听node代码变化，并自动重启服务的工具，非常适合用在开发环境中。
[github官网]<https://github.com/remy/nodemon#nodemon>

**安装**

```shell
# 安装
npm install -g nodemon

# 验证
nodemon -v
```

### 测试

使用node写一段http服务代码，然后用nodemon命令运行。这样使用的端口为8866，用浏览器访问时，记得输入端口号。

```shell
nodemon [your node app]
```

### nginx

nginx是一款应用广泛且很有名的服务器软件，可以作为静态文件服务器使用，也可以作为负载均衡服务器，还可以作为反向代理服务器使用。

**安装与运行**

```shell
# 安装
yum install -y nginx

# 启动
service nginx start

# 重启
service nginx restart

# 停止
service nginx stop
```

**测试与反向代理使用**

nginx安装之后，也可以通过浏览器访问服务器IP地址进行测试，没有问题的话同样会展示相应的欢迎界面。

这里我们使用nginx作为反向代理服务器，反向代理的含义是通过代理服务器接受网络请求，然后在内部转发给其他服务器，并将服务器的结果返回给客户端。

我们通过配置把www二级域名的请求转向httpd启动的8080端口进行处理，把wx二级域名的请求转向node启动的8866端口进行处理，将来你也可以根据自己的需要增加配置。

```shell
# 修改配置文件
vim /etc/nginx/nginx.conf

# 在配置文件中的server中添加内容
server {
    listen 80;
    server_name www.l77.top;

    proxy_set_header X-Forwarded-Host $host;
    proxy_set_header X-Forwarded-Server $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $host;

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_connect_timeout 1000;
        proxy_read_timeout 1000;
    }
}

server {
    listen 80;
    server_name wx.l77.top;

    proxy_set_header X-Forwarded-Host $host;
    proxy_set_header X-Forwarded-Server $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $host;

    location / {
        proxy_pass http://127.0.0.1:8866;
        proxy_connect_timeout 1000;
        proxy_read_timeout 1000;
    }
}

# 修改后检测配置文件是否正确
/usr/sbin/nginx -t

# 分别启动nginx、httpd、node服务，浏览器输入www.l77.top就会得到httpd服务结果，输入wx.l77.top就会得到node服务结果
service nginx start
service httpd start
nodemon xxx.js
```

### git

**安装**

虽然已经安装了文件上传下载的工具，但是对于频繁修改的代码，上传到服务器太过繁琐，所以引用这款版本管理工具，本地push代码，服务器pull代码。

```shell
# 安装
yum install -y git
```

**搭建远程仓库**

我们自己在服务器上部署一个git远程仓库，这样省去了第三方远程仓库创建的过程。当然，如果你想把代码托管在`github`或者`码云`，也可以。但还是建议自己部署一下，毕竟不是所有代码都有必要托管在第三方平台。

1. 为了让更多的人使用远程仓库，同时为了服务器安全，不想让他们拥有root账户权限，所以我们创建一个git账户，并设置该用户登录所使用的shell为git-shell，以限定用户的操作。

```shell
// 创建用户
useradd git -s /usr/bin/git-shell

// 设置密码，最少8位
passwd git ********

// 查看用户列表
cat /etc/passwd
```

```txt
用户信息由6个冒号分隔为7个信息，分为如下：
1. 用户名
2. 密码(已加密)
3. UID，系统内部使用
4. GID，所属组
5. 用户全名或本地账号
6. 开始目录
7. 登陆使用的shell
```

2. 创建一个裸仓库

```shell
# 创建存放git仓库的目录
mkdir /git-store

# 进入目录
cd /git-store

# 创建裸仓库
git init --bare wx.git

# 修改git-store目录拥有者为git用户与git组
chown -R git:git /git-store
```

3. 测试

在本地机器中clone远程仓库，并提交代码进行测试。

```shell
# clone命令
git clone git@服务器地址:/git-store/wx.git

# 进入项目，创建一个文件
cd wx
echo 11 > a.txt

# 提交版本
git add a.txt
git commit -m 'test'

# 推送到远程仓库
git push -u origin master
```

在服务器中查看推送的内容是否成功

```shell
# 进入仓库
cd /git-store/wx.git

# 查看提交的历史版本是否存在
git log
```

4. 配置ssh免密登陆

本机创建ssh密钥，如果之前生成过ssh密钥，无需重复生成，直接copy公钥即可。

```shell
# 生成密钥，运行命令后一顿回车
ssh-keygen -t rsa
```

在服务器中，创建存放git公钥的目录

```shell
# 进入git用户目录
cd /home/git

# 创建.ssh目录
mkdir .ssh

# 创建存放客户端公钥的文件
touch .ssh/authorized_keys

# 修改目录拥有者为git
chown -R git:git .ssh
```

接下来把客户端生成的公钥配置到服务器中实现免密。密钥生成的位置在`C:\Users\xxx\.ssh`目录下，使用一款记事本打开`id_rsa.pub`文件，复制里面的公钥，然后粘贴到服务器中的`.ssh/authorized_keys`文件。

```shell
# 编辑客户端公钥文件
vim /home/git/.ssh/authorized_keys
```

5. 免密测试

在本地机器重新clone项目，提交代码，不用每次输入密码了。

如果不OK，在服务器中打开RSA认证再尝试。

```shell
# 编辑配置文件
vim /etc/ssh/sshd_config

# 修改如下配置，并去掉#号注释
# RSAAuthentication yes     
# PubkeyAuthentication yes     
# AuthorizedKeysFile  .ssh/authorized_keys

# 重启sshd
systemctl restart sshd.service
```
