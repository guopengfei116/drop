# 包管理工具
> 在进行项目开发中，我们经常需要"引入"、"更新"、或者"删除"一些由我们自己开发或第三方开发的独立文件模块与包。
而且不同的项目对于同一个包经常会使用其不同的版本。传统的做法是开发人员根据自己的经验，维护一个本地目录，
专门存储与管理与自己开发相关的各种常用包，以供将来使用。特点是这些包经常被copy来copy去，
每一个包有新版本发布时，我们需要手动下载来不断扩充自己本地的包仓库。
久而久之，随着包的增多，版本的增多，管理也越发烦琐，包管理工具就是专门解决这类问题的软件。

## npm ==> node package manager
npm是集成在node中的包管理工具，也就是说安装了node，就安装了npm。
node是使用js开发服务端的一个开发环境或者平台，npm最初只负责维护这种服务端开发所需的js包。
它通过配置文件(package.json)的方式来定义项目中的依赖，通过命名进行依赖下载、升级与移除。
随着node的普及，使用npm作为包管理工具也越来越流行，npm也可以管理各种前端所需包了，比如jquery、bootstrap等。

#### 安装
在node官网下载node安装包，然后在命令行工具中运行node -v 与 npm -v命令验证是否已经安装成功。
通过在命令行中也可以输入node命令，进入node运行环境，这个环境有点类似与浏览器的控制台，可以运行js脚本。

#### cnpm
cnpm使用的是淘宝网的镜像，在国内下载速度比较快。[官网](https://npm.taobao.org/)
npm install cnpm -g --registry=https://registry.npm.taobao.org

#### 使用场景与演示
- 新建一个目录，做为新项目的根。
- 进入该目录，运行cnpm init -y，检测目录下是否创建了一个package.json的文件。
- 然后打开命令行工具，cd切入该目录，运行cnpm install --save jquery，npm install --save ***。
    + 加save参数后，npm就会把安装过的包记录在package.json的文件中dependencies属性中。
    + 默认安装的都是最新版本的包，可以通过@符号指定要安装包的版本。
- 查看目录中是否出现node_modules的目录，所有的包都被自动安装到该目录中。
- 可以编写项目代码了，引入第三方包。
- 将代码通过git仓库共享，但是不要让git管理node_modules目录。
- 使用另外一个账户，clone该仓库，然后在根目录中，运行npm install，npm就会根据package中的依赖自动下载依赖包。

#### 常用命令
- 官网[https://www.npmjs.com]
- npm init
    + 初始化npm项目
    + -y
        * 可以省略中间自定义配置信息的环境，直接生成默认的package.json文件
- npm install 包名[@指定版本号]
    + 安装包
    + --save
        * 可以把安装信息记录在package.json文件中的dependencies属性
    + --save-dev
        * 可以把安装信息记录在package.json文件中的devDependencies属性
    + -g 
        * 全局安装包，一些工具性软件会使用全局安装，安装后可以在任何路径执行该工具所提供的命令。
- npm uninstall 包名
    + 卸载包
    + --save
        * 卸载后同步删除package.json文件中的dependencies记录
    + --save-dev
        * 卸载后同步删除package.json文件中的devDependencies记录
- npm list
    + 查看当前目录下已安装的包
- npm root
    + 查看当前安装的包的路径
    + -g
        * 查看全局安装的包的路径

### 其他相关工具
- bower
    + twitter推出的一款包管理工具。
    + 参考文档[http://www.zuojj.com/archives/533.html]
- yarn
    + facebook推出的包管理工具。
    + 参考文档[http://imweb.io/topic/581f6c0bf2e7e042172d618a]

# browser-sync
> 一款与浏览器相关的开发工具，该工具会在本地搭建一台文件服务器，使用浏览器可以进行文件预览，它有两个特点：
1、本地文件修改后浏览器会自动更新被修改的文件，让浏览器始终显示最新结果；
2、多浏览器同时打开同一页面，在其中一个浏览器做的操作会同步到其他浏览器上，便于测试。

## 安装
npm install -g browser-sync

## 使用
- 使用命令行工具进入项目根路径
- 运行browser-sync start --server --files "*.*"即可开启服务
    + --files参数用来指定哪些文件需要被监听，多个文件以逗号隔开，可以使用星号通配符。

# 构建工具
> 可以自动执行一些项目构建与打包的操作，比如常见的代码合并、压缩、混淆等等。

## gulp
一款基于流的项目构建工具，该工具特点是灵活，并且简单易用。

### 环境安装
[官网](http://www.gulpjs.com)
[中文网](http://www.gulpjs.com.cn)
npm install -g gulp-cli

### 常用api
- task
    + 创建任务
- src
    + 读取待处理的文件内容
- dest
    + 写入处理好的文件内容
- run
    + 执行指定的任务
- watch
    + 监听文件变化

### 基本使用
- 使用命令行工具进入项目根路径
- 运行npm install --save-dev gulp安装所需包
- 创建一个gulpfiles.js文件用来编写任务脚本

### 插件使用
- gulp-uglify
    + 压缩混淆js代码
- gulp-concat
    + 合并文件
- gulp-minify-css
    + 压缩css代码
- gulp-htmlmin
    + 压缩html代码
- gulp-less
    + less编译
- gulp-rename
    + 修改文件名
- gulp-changed
    + 过滤发生变化的文件

### 引入browserSync
- npm install --save-dev browser-sync安装
- 像常规gulp插件那样引入
- 调用init方法，通过server属性配置文件服务的根路径，files配置要监听的文件
```
var browserSync = require('browser-sync');
browserSync.init({
	server: 'path',                         // 指定网站根目录
	files: [filename1, filename2]  // 指定文件变化刷新浏览器
});
```

## 其他相关工具
- grunt
    + 比较老的一款自动化构建工具，gulp可以认为是对该款工具的改进
    + 参考文档[http://www.gruntjs.net/]
- webpack
    + facebook推出的打包工具。
    + 参考文档[http://webpackdoc.com/index.html]
