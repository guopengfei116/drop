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

## phpStudy环境搭建

#### 配置网站根目录
  网站根目录是HTTP服务器上存放网站程序的空间
    + 1. 先右键phpStudy图标，选择phpStudy设置，勾选允许目录列表
    + 2. 根目录配置
        + 方式一
            + 在phpStudy设置下，点击端口常规设置
            + 选择网站目录
        + 方式二
            + 打开**/phpStudy/Apache/conf/httpd.conf主配置文件
            + 查找并修改DocumentRoot "C:/phpStudy/WWW"

#### 配置虚拟主机
  虚拟主机可以让一台服务器模拟成为多台服务器，实现多网站管理
    + 1. 开启配置
        + 打开httpd.conf配置文件
        + 查找#Include conf/extra/httpd-vhosts.conf，去掉#号注释
    + 2. 虚拟主机配置
        + 打开**/phpStudy/Apache/conf/extra/httpd-vhosts.conf
        + 复制virtualHost![代码预览](img/virtualHost.png)
            + 修改DocumentRoot为"C:/phpStudy/WWW/myboxuegu"
            + 修改ServerName为"myboxuegu.com" 
            + 修改ServerAlias为"www.myboxuegu.com" 
    + 3. 修改本地DNS
        + 打开C:/Windows/System32/drivers/etc/hosts
        + 127.0.0.1 myboxuegu.com
        + 127.0.0.1 www.myboxuegu.com
    + 4. 配置检验
        + 在'C:/phpStudy/WWW/'下创建一个myboxuegu文件夹
        + 在'C:/phpStudy/WWW/myboxuegu'中创建一个index.html，写入一些内容
        + 重启Apache服务器
        + 使用浏览器访问myboxuegu.com，成功访问index.html的内容则配置成功

#### 使用php抽取页面公共模块
  配置后我们写在html中的php代码就会执行，这里我们的目的是使用php的include方法实现页面公共部分的拆分
    + 1. 添加配置
        + 打开**/phpStudy/Apache/conf/httpd.conf主配置文件
        + 查找AddType application/x-httpd-php .php这行配置
        + copy一行出来，把.php改为.html即可
    + 2. 配置检验
        + 抽取页面中head标签内所有的link，放置到html/common/style.html，作为所有页面的公共模块
        + 使用导入抽取的公共模块
        <?php include($_SERVER['DOCUMENT_ROOT'].'/html/common/head.html')?>
        + 浏览器访问myboxuegu.com验证

#### 配置反向代理
  一种使用后台技术解决前端跨域的方案；使用该技术后，前端不需要做任何事情，便无声无息的实现了跨域请求。
  我们博学谷后台管理系统开发所需的所有web接口都已经被独立开发完毕，并部署在了一台公网服务器上(这台服务器的域名与我们本地开发的域名不一致)。
因为浏览器对ajax请求有跨域限制，同时这些接口并未JSOP接口，所以我们无法在前端直接跨域调用这些接口，所以需要配置反向代理。
    + 1. 开启代理服务
        + 打开**/phpStudy/Apache/conf/httpd.conf主配置文件
        + 查找#LoadModule proxy_module modules/mod_proxy.so解除注释
        + 查找#LoadModule proxy_http_module modules/mod_proxy_http.so解除注释
    + 2. 配置转发，把所有myboxuegu.com/v6的请求转发到api.botue.com/v6
        + 打开**/phpStudy/Apache/conf/extra/httpd-vhosts.conf
        + 找到boxuegu对应的虚拟主机配置 
        + 添加一行ProxyRequests Off
        + 添加一行ProxyPass /v6 http://api.botue.com
    + 3. 配置检验
        + 在'C:/phpStudy/WWW/myboxuegu'中创建一个login.html
        + 引入jquery，发送ajax请求，请求的地址对应接口文档的地址，但是域名改为myboxuegu.com
        + 打开浏览器，使用调试工具监听发送的请求，查看服务器是否有返回响应，有则证明配置成功
