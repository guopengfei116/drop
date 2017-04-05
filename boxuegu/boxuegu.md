# 博学谷

## 库使用

## 工作环境与状况了解

### 工作岗位与职责
- 产品经理
- UI设计
- 后端程序猿
- 前端程序猿
- 测试工程狮
- 运维工程狮

### 项目流程
- 需求设计阶段 --> 主要工作人员：产品
    + 调研与需求确立
    + 估时
    + 产出需求文档与产品原型
- 美术设计阶段 --> 主要工作人员：设计
    + 估时
    + 产出ui界面
- 开发实现阶段 --> 主要工作人员：前端(web、IOS、Android、PC)、后端、测试
    + 估时
    + 前端架构，开发
    + 后端架构，开发
    + 测试用例编写
- 测试调试阶段 --> 主要工作人员：前端(web、IOS、Android、PC)、后端、测试
    + 前后端联调
    + 测试
    + bug修复
- 上线部署 --> 主要工作人员：运维、测试
    + 线上环境部署与项目上线
    + 测试，确保线上项目运行无问题
    + 如出现问题开发人员紧急修复或撤销上线延后处理

### web前端开发方式
- 前后端不分离
    + 通常是前端人员开发完毕后，将代码交给后端，后端会对代码进行二次开发改造
    + 前后代码混在一起，前端代码中经常参杂着后端代码，这些代码的作用通常是填充动态数据的，即后端负责数据的渲染
    + 前后端需要一起部署上线，耦合度比较高
- 前后端分离
    + 前端不再将代码交给后端二次开发改造，前后端可以使用两个仓库分开管理和维护
    + 前端展示的动态数据都是通过ajax请求渲染上去的，即前端负责数据的渲染
    + 前后端可以分开部署，耦合度较低

## 环境搭建

### phpStudy配置

- 配置网站根目录
    + 网站根目录是HTTP服务器上存放网站程序的空间
    + 先右键phpStudy图标，选择phpStudy设置，勾选允许目录列表
    + 根目录配置
        1. 方式一
            + 在phpStudy设置下，点击端口常规设置
            + 选择网站目录
        2. 方式二
            + 打开**/phpStudy/Apache/conf/httpd.conf主配置文件
            + 查找并修改DocumentRoot "C:/phpStudy/WWW"
    + 重启HTTP服务器

- 配置虚拟主机
    + 虚拟主机可以让一台服务器模拟成为多台服务器，实现多网站管理
    + 1. 开启配置
        + 打开httpd.conf配置文件
        + 查找#Include conf/extra/httpd-vhosts.conf，去掉#号注释
    + 2. 虚拟主机配置
        + 打开**/phpStudy/Apache/conf/extra/httpd-vhosts.conf
        + 复制virtualHost![代码预览](img/virtualHost.png)
            + 修改DocumentRoot为"C:/phpStudy/WWW/boxuegu"
            + 修改ServerName为"boxuegu.com" 
            + 修改ServerAlias为"www.boxuegu.com" 
    + 3. 修改DNS
        + 打开C:/Windows/System32/drivers/etc/hosts
        + 127.0.0.1 boxuegu.com
        + 127.0.0.1 www.boxuegu.com
    + 4. 成功验证
        + 重启Apache
        + 浏览器访问www.boxuegu.com

- 使用php抽取页面公共模块
    + 配置后我们写在html中的php代码就会执行，这里我们的目的是使用php的include方法实现页面公共部分的拆分
    + 添加配置
        1. 打开**/phpStudy/Apache/conf/httpd.conf主配置文件
        2. 查找AddType application/x-httpd-php .php这行配置
        3. copy一行出来，把.php改为.html即可
    + 测试
        1. 抽取页面中head标签内所有的link，放置到html/common/style.html，作为所有页面的公共模块
        2. 使用<?php include($_SERVER['DOCUMENT_ROOT'].'/html/common/style.html')?>导入抽取的公共模块
        3. 浏览器访问www.boxuegu.com验证

- 配置反向代理
    + 一种跨域方案，这种方案是通过后台配置实现的，配置后前端不需要做任何事情
        1. 我们开发所需的web接口已经开发完毕并在公网上线
        2. 但是其接口域名与我们的域名不一样，所以当使用ajax请求这些接口时浏览器会报跨域错误
    + 开启代理服务
        1. 打开**/phpStudy/Apache/conf/httpd.conf主配置文件
        2. 查找#LoadModule proxy_module modules/mod_proxy.so解除注释
        3. 查找#LoadModule proxy_http_module modules/mod_proxy_http.so解除注释
    + 配置转发，把所有www.boxuegu.com/v6的请求转发到api.botue.com/v6
        1. 打开**/phpStudy/Apache/conf/extra/httpd-vhosts.conf
        2. 找到boxuegu对应的虚拟主机配置 
        3. 添加一行ProxyRequests Off
        4. 添加一行ProxyPass /v6 http://api.botue.com

