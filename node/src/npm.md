# npm

## 什么是npm

#### npm简介
- [npm官网](https://www.npmjs.com)
- npm是node package manager的简称，即node应用程序专属的包管理工具
- 也就是说npm最初只负责维护node服务端开发所需的js包
- 不过随着node的普及，npm也越来越流行，npm也可以用来管理前端所需的包了，如jquery、bootstrap、vue等

#### npm与包管理工具
- 在进行项目开发中，我们经常需要"引入"、"更新"、"删除"一些由我们自己开发或第三方开发的独立文件模块或包
- 比较传统的做法是开发人员随着自己的经验，逐渐维护起一个专属与自己的目录，用来管理将来开发可能用到的包
- 这个目录久而久之会越来越大，我们需要更新新版本以淘汰旧版本的包的频率也越来月频繁，浪费了我们的部分精力
- 包管理工具就是专门解决这类问题的软件，而npm就是包管理工具的一种，专门用来管理node.js与前端开发所需的包

#### 安装与更新
- 只要安装了node，那么npm就跟着安装了
    + 可在命令行工具中通过npm -v来查看已安装的版本
    + 最好使用5.0+版本的npm
- 版本比较低的话可以重新安装最新高版本的node
- 或者通过命令升级到最新版本
    + `npm install -g npm`
    + 不过需要注意，如果你没有采用默认的安装路径或者没有管理员权限最好不要升级，可能出现问题

## 使用

#### 预备工作
- 创建一个项目，使用命令行工具切换到项目路径
- 创建**package.json**项目描述文件
    + 可通过npm init命令创建
    + 也可以纯手动创建
    + 注意：该描述文件中**不能添加注释**，否则会有问题

#### 基本使用
- 安装项目依赖包
    + `npm install jquery`
    + 运行后jquery的最新版本会自动下载到本地node_modules文件夹
- 使用
    + 安装的包在项目中直接使用即可，但要注意引入文件的路径，别引错
```html
```

#### 项目共享
- 通常一个项目是由多个人一起维护的，如果是一个比较大的项目，还会有很多依赖的包
- 像这样的项目如果在多个人之间传播共享很不便利，主要是因为依赖包占用的空间太大
- 如果使用了npm，我们就不需要把那些依赖包传来传去了，因为package.json文件中记录了这些依赖
- 应用演示
    + 创建一个使用npm进行包管理的项目
    + 然后把这个目录中除node_modules外的内容传给另一个人，这样项目就会比较轻巧
    + 另一个人拿到项目后，只需运行npm install命令安装依赖后，项目即可恢复原样

#### 配合git
- 现代项目除了会使用一款包管理工具管理依赖包之外，还会使用一款版本管理工具进行代码版本的管理
- 所以这里也补充说明一下npm与git的结合使用
   + 使用了npm后项目的依赖包就被安装到了node_modules目录
   + 这个目录的代码因为比较庞大，所以通常不会添加到版本仓库中
   + 所以通常会在.gitignore配置文件中，配置忽略node_modules
   + 配置后项目代码就可以提交到git仓库进行管理了
   + 将来其他账户要clone项目并运行，clone后依然运行npm install即可安装依赖恢复项目原样

## 必用命令

#### npm init
- 作用：创建package.json项目描述文件
- 基本语法：npm init [-y]

###### 使用
- 一步步填写项目信息：`npm init`
- 使用默认值跳过填写步骤：`npm init -y`
    + 注意：如果项目包含中文会报错

#### npm install
- 作用：安装包
- 基本语法：`npm install [name@version] [ -S || -D ]`
- 简写：`npm i [name]`

###### 使用
- 根据package.json安装包
    + 安装全部依赖：`npm i`
    + 只安装项目的运行依赖：`npm i --production`
- 指定安装包
    + 安装最新版本：`npm i name`
    + 安装指定版本：`npm i name@version`
    + 安装运行时依赖并记录在描述文件中：`npm i name [ --save || -S ]`
    + 安装开发时依赖并记录在描述文件中：`npm i name [ --save-dev || -D ]`
- 其他参数
    + 指定安装地址：`npm i vue -S --registry=https://registry.npm.taobao.org`
    + 全局安装：`npm i webpack -g`
        * 全局安装的都是一些可单独执行的node工具

#### npm uninstall
- 作用：卸载包
- 基本语法：`npm uninstall [name@version] [ -S || -D ]`

###### 使用
- 卸载：`npm uninstall name`
- 卸载时删除dependencies依赖：`npm uninstall name [ --save || -S ]`
- 卸载时删除devDependencies依赖：`npm uninstall name [ --save-de || -D ]`
- 卸载全局包：`npm uninstall name -g`

#### npm list
- 作用：查看包信息
- 基本语法：`npm list [name] [ --depth ]  [ number ]`
- 简写：`npm ls [name]`

###### 使用
- 所有包信息：`npm list`
- 指定包信息：`npm list webpack`
- 指定深度：`npm list webpack --depth 0`

#### npm root
- 作用：查看当前安装的包的路径
- 可选项：-g
    + 查看全局安装的包的路径

#### 其他命令
- npm help 查看某条命令的详细帮助
- npm update 更新模块
- npm outdated 检查模块是否已经过时
- npm root 查看包的安装路径
- npm config 管理npm的配置路径
- npm cache 管理模块的缓存
- npm start 启动模块
- npm stop 停止模块
- npm restart 重新启动模块
- npm test 测试模块
- npm version 查看node环境所有模块的版本
- npm view 联网查看模块的注册信息
- npm adduser
- npm publish 发布模块
- npm access 在发布的包上设置访问级别
- npm package.json的语法

# 其他包管理工具

## cnpm
- 简介：淘宝推出的基于npm的包管理工具，并在国内提供了npm包的镜像，国内使用比较快
- 资源：[官网](https://npm.taobao.org/)
- 特点：使用方式与命令与npm基本一致
- 缺点：使用cnpm安装的包，因为存储方式的原因，不能copy给其他人或其他目录使用

#### 使用
- 安装：`npm install -g cnpm --registry https://registry.npm.taobao.org`
    + 有些比较老的机器可能会安装失败
- 使用1：`cnpm i`
- 使用2：`cnpm i jquery art-template -S`

#### 注意
- 比较老的机器可能无法正常安装包
    + 资源管理器中->右键盘符->属性，查看本地磁盘文件系统，一般为NTFS，可能你的为FAT32
    + 如果是这种情况那就暂时改用npm
- cnpm安装过的包依赖目录名称
    + 所以千万不要修改项目名称与目录，否则可能会出错
    + 如果有这种情况，删除整个node_modules，重装包

#### 使用
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

## bower
- 简介：twitter推出的一款包管理工具。
- 资源：[参考文档](http://www.zuojj.com/archives/533.html)
- 特点：专属与前端的包管理工具

## yarn
- 简介：facebook推出的包管理工具。
- 资源：[参考文档](http://imweb.io/topic/581f6c0bf2e7e042172d618a)
- 特点：快
