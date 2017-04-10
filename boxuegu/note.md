### 相对路径与绝对路径
- 在我们的项目中，前端引入的资源(css、js、img)统一使用绝对路径，这样不同页面可以直接复用
- 在我们的项目中，使用了php的include方法，统一使用相对路径
(能使用绝对路径最好，可惜因为php的一些路径规则，造成我们这里必须使用相对路径)。

### 页面布局
- jquery和bootstrap和font-awesome引入到lib目录下
- 把写好的样式copy到我们自己的less目录下
- 把写好的页面copy到我们自己的html目录下
- 抽取index.html中的三个公共部分
    + 抽取所有的style，建立一个style.html文件放入html下common目录下
    + 抽取页面侧边栏，建立一个aside.html文件放入html下common目录下
    + 抽取页面底部的脚本，建立一个script.html文件放入html下common目录下
- 修改所有的style.html和script.html中引入文件的路径为我们自己的路径(统一采用绝对路径)
- 所有的html通过php的include方法引入公共html

### 脚本开发预备
- requirejs引入到lib目录下
- 把script.html中的脚本改为require，设置data-main
- 在js目录下创建一个data-main的公共js，进行一些基础配置，
与jquery&bootstrap加载，与js文件按pathname加载。
- 最后为每一个页面创建一个js，进行一个默认的模块定义，然后访问不同html，查看是不是可以引入对应的js

### 文件引入问题
如果打开博学谷页面，发现样式不对，打开开发工具，做如下验证：

- 如果发现php-include这行代码仍然存在，可能是如下问题
    + 没有httpd.conf中对html的解析
    + 可能没有使用apache配置域名进行页面访问
    
- 如果发现include成功了，查看文件的引入路径是不是404
   + 进行路径调整
