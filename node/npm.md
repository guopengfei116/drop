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
- 可以运行命令npm install -g npm来升级npm到最新版本
    + 不过需要注意，如果你没有采用默认的安装路径或者没有管理员权限最好不要升级
    + 因为升级后可能丢失npm的使用权限，到时候就得重装node来解决了

## 使用

#### 基本使用
- 以命令行方式进入一个项目目录
- 创建项目描述文件（已经有了就不用了）
    + 运行npm init，运行后项目中会创建一个package.json的项目描述文件
    + 也可以纯手动的方式创建package.json文件
- 使用npm安装项目依赖包
    +npm install jquery bootstrap --save
    + 运行后项目中会创建一个node_modules文件夹
    + 打开该文件夹会发现jquery与bootstrap的最新版已经被下载
- 接下来就可以在项目引用第三方包进行开发了

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

## 命令汇总

#### 必用命令
- npm init
    + 可以添加-y参数跳过配置信息的填写，直接生成默认的package.json文件
- npm install 包名@版本号
    + --save || -S参数可以把安装信息记录在package.json文件中的dependencies属性中
    + --save-dev || -D参数可以把安装信息记录在package.json文件中的devDependencies属性中
    + --production参数让npm根据配置文件中的dependencies属性进行依赖包的安装
    + -g参数可以在全局进行安装，一般全局安装的都是一些可单独执行的node工具
    + --registry参数可以指定下载包的地址，可以使用淘宝提供的地址https://registry.npm.taobao.org
- npm uninstall 包名
    + --save || -S参数会删除package.json文件中dependencies的依赖信息
    + --save-dev || -D参数会删除package.json文件中devDependencies的依赖信息
    + -g参数指明删除全局的包

#### 其他命令
- npm update 更新模块
- npm outdated 检查模块是否已经过时
- npm ls 查看安装的模块
- npm init 在项目中引导创建一个package.json文件
- npm help 查看某条命令的详细帮助
- npm root 查看包的安装路径
- npm config 管理npm的配置路径
- npm cache 管理模块的缓存
- npm start 启动模块
- npm stop 停止模块
- npm restart 重新启动模块
- npm test 测试模块
- npm version 查看模块版本
- npm view 查看模块的注册信息
- npm adduser
- npm publish 发布模块
- npm access 在发布的包上设置访问级别
- npm package.json的语法

## cnpm

#### 简介
- [淘宝NPM镜像官网](https://npm.taobao.org/)

#### 安装
- npm install -g cnpm --registry https://registry.npm.taobao.org

#### 使用
- 与npm的使用方式一样，本就是对npm的一层封装
- 使用范例：cnpm install jquery art-template -S

#### 其他相关工具
- bower
    + twitter推出的一款包管理工具。
    + 参考文档[http://www.zuojj.com/archives/533.html]
- yarn
    + facebook推出的包管理工具。
    + 参考文档[http://imweb.io/topic/581f6c0bf2e7e042172d618a]
