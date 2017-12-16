# 博学谷课程介绍

- 天数：9

- 称呼
   + 叫我大飞哥就好，有什么问题，即时反馈给我
   + 尤其是咱们班末位的同学
   + 每个同学都是潜力股，相信自己是最棒的！

- git工具
    + day1：shell基本使用、vi编辑器的基本使用、git基本使用
    + day2：git的使用、github的使用
    + 特点：不难，但是需要比较强的动手能力

- requirejs
    + day3：模块化开发的库

- 博学谷项目
    + 特点：有一些jq的插件使用
    + 难度：比较难，难在项目的架构上，文件比较多，使用了requirejs库，难以理解
    + 说明：这算是咱们比较大的一个项目，争取都做出来，将来的个人简历需要他增加我们的工作经验值
    + 技术栈：算是比较老的技术，jq + requirejs + UI框架

# shell
- shell：单词壳的意思
- shell是计算机(脚本)命令的称呼
- 我们目前操作计算机主要有两种方式：
    + 1、图形化界面操作
    + 2、命令的方式
    + 特点：我们并不清除计算机是如何运作的，操作系统是如何跑起来的
    + 我们只需要学会使用这层壳即可以了。
- 理解：比如我们要开车，我们只需要学会如何拧钥匙，掌握方向盘就可以，这可以认为是车的壳。
    + 拧钥匙，掌握方向盘，可以认为是图形化界面操作车
    + 命令的方式操作系统，可以认为是通过语音的方式控制车

## 命令汇总

#### pwd
- 作用：查看当前所处的工作目录
- 返回：从磁盘算起的绝对路径

#### cd
- 作用：切换工作目录，可以多级目录切换
- 进入到下级目录：cd 目录名
- 返回到上级目录：cd ../
- 切换盘符：cd 盘符:

#### ls
- 作用：查看当前目录下的文件列表，默认看不到隐藏文件
- 查看隐藏文件：ls -a
   + 本地文件夹中都含有一个./当前目录与../上级目录
- 查看其他目录下的文件列表：ls 其他目录/

#### mkdir
- 作用：创建目录，默认在当前目录下

#### touch
- 作用：创建文件，默认在当前目录下
- 在其他目录下创建文件：touch 其他目录/文件名

#### tab键
- 按一下自动补全
- 如果没有补全，继续按一下，给出提示

#### cat
- 作用：查看文件内容

#### rm
- 作用：删除文件或目录
- 删除多个文件：rm 文件名1 文件名2
- 删除多个目录：rm -r 目录1 目录2

#### mv
- 作用：移动或重命名文件或文件夹
- 移动文件：mv 文件名 其他目录/新文件名
- 移动整个目录：mv -r 目录 其他目录/新名称

#### cp
- 作用：复制文件或文件夹
- 把文件复制到其他目录：cp 文件名 其他目录/新文件名
- 复制文件夹：cp -r 目录 其他目录/新名称

# vi
- 这是一款命名行文本编辑器

## 三种模式
- 命令模式
    + 通过一些快捷键命令操作文本
- 插入模式、书写模式
    + 就是普通文本编写
- 底行模式
    + 也命令模式一样，通过一些命令操作文本

#### 模式切换
- 默认进入命令模式
- 通过命令可以切换到其他两种模式

#### 特殊情况
- 如果发现命令一直输入无效，按下Ctrl + c

#### 清屏
- clear

#### >与>>
- 作用：重定向内容
- 覆盖文件内容：echo 文本 > 文件
- 追加文件内容：echo 文本 >> 文件

#### grep
- 作用：对内容进行检索
- 检索文件中的内容：grep 关键字  文件
- 对结果进行检索：其他命令 | grep 关键字

#### 管道符
- 作用：用于多命令的连接使用，上一个命令的结果作为下一个命令的参数使用

# git
> 世界上最流行的【分布式】【版本管理系统】

## 版本管理系统分类
- 本地式
- 集中式
- 分布式

## 使用git管理文件历史版本
- git init
    + 作用：让git管理一个目录
    + 备注1：在那个目录下运行，就是管理那个目录
    + 备注2：一个目录只需要初始化一次就OK了
    + 备注3：初始化后，该目录中的文件都是未追踪状态
- git add 文件
   + 作用：让git追踪指定文件的变化
   + 备注1：如果不add文件，这个文件的变化git是不关心的
   + 备注2：add之后，该文件的内容就会被copy一份存储到git的暂存区
- git commit -m '描述'
   + 作用：把暂存区的内容永久性的存储到版本区
- git log
   + 作用：查看已永久提交的历史版本记录
- git status
   + 作用：查看文件状态
   + 备注：这是最常使用的命令，一般我们做些操作就会看看文件状态变化

## git新增命令

#### 撤销修改
- 撤销工作区文件的修改
   + git checkout 文件
- 撤销暂存区文件的修改
   + git rm --cached 文件

#### 对比文件变化
1. 如果文件内容有删除会使用-号标红
2. 如果文件内容有增加会使用+号标绿

- 工作区与暂存区文件对比
    + git diff 文件

#### 删除文件
- 删除未追踪文件
   + rm 文件
   + git没有管理过这个文件，直接使用shell脚本的rm或手动删除
- 删除暂存区文件修改（撤销暂存区文件的修改）
   + git rm -f 文件
- 删除存在历史版本的文件
   + git rm -f 文件
   + git commit -m '彻底从git删除某文件'

## 分支开发
要使用分支，必须保证主分支至少有一次版本提交才可以

- 基于当前分支创建子分支，相当于是对当前分支的copy
    + git branch 分支名称
- 查看当前所有的分支列表
    + git branch
- 切换分支
    + git  checkout 分支名称
- 合并指定分支内容到当前分支
    + git merge 分支名称
- 删除指定分支
    + git branch -d 分支名称

#### 使用分支进行项目多人协作开发

- 先保证master必须有一条版本记录
- 基于master创建master_user子分支，进行开发
    + git checkout master 千万注意，基于谁创建子分支，必须先切换到父那里
    + git branch master_user
	+ 编写user代码
	+ git add *
	+ git commit -m 'user描述'
- 基于master创建master_prd子分支，进行开发
    + git checkout master 千万注意，基于谁创建子分支，必须先切换到父那里
    + git branch master_prd
	+ 编写prd代码
	+ git add *
	+ git commit -m 'user描述'
- user开发完毕了，就可以先merge到master分支上
    + git checkout master
    + git merge master_user
    + git log 查看合并进来的版本信息
- prd开发完毕了，merge到master分支上
    + git checkout master
    + git merge master_prd
    + git log 查看合并进来的版本信息

## git模拟练习
- 假设做一个项目
    + 一开始只有自己做，在master主分支上进行开发
        * 这个开发过程中可能含有文件修改与取消修改
        * 也可能会需要对比文件的修改差异
- 提交了两个版本后，又加入了一个人
   + 那么接下的开发咱们使用分支
   + 那么就创建两个分支
- 两个人分别在两个不同的分支下开发提交版本
   + 最后都合并到master主分支

# github
- 这是一个网站，与git没什么关系
- 这个网站是一个比较流行的开源项目托管平台与交流平台
- 该网站免费提供了git服务器，我们个人使用把代码上传上去，让千千万万程序猿学习

## github仓库创建
- 登陆账号
- 首页点击右上角+号，有个创建创建选项
- 接下来进去一个仓库创建的页面
    + 输入仓库名字
    + 输入仓库描述
    + 切记不要勾选README与.gitignore
- 创建后进入到一个提示页面
- 接下来进入我们本地的目录
   + 给远程仓库起个名字：git remote add origin 你的仓库https地址
   + 把本地的历史版本提交到远程仓库：git push -u origin master
   + 然后会让我们输入账号与密码，成功后刷新github页面，代码就上来了

## github免密SSH配置
如果不配置，每次提交代码都要输入账号密码，很繁琐，所以要配置，
这个配置一台电脑只需配置一次即可，除非你把.ssh目录下文件删了。
- ssh-keygen -t rsa
    + 运行这条命令在本机生成两个密钥，一个叫私钥一个叫公钥
    + 生成的两个密钥在你的`C:\Users\你当前使用的用户名\.ssh`目录下
- 把公钥配置到github
    + 点击头像，选择settings
    + 选择SSH and GPG keys左侧边栏
    + 然后添加一个ssh配置

## 刚去公司参与项目的两种情况
- 可能让你自己新创建一个项目
    + 我们首先可以在本地进行项目构建与开发
    + 然后github上创建一个空的远程仓库
    + git remote add origin 远程仓库地址
    + git push -u origin 分支名
    + 接下来就是正常的创建分支，add、commit、push这些了
- 还有一种情况是项目已经创建好了，让我们直接拿下来继续开发
    + git clone 已有代码的远程仓库地址
    + 接下来就是正常的创建分支，add、commit、push这些了

## 关于多人协作的冲突处理
- 比较常见的是两个人都对同一个文件进行了修改
- 然后第一个人的代码merge到父分支不会出现问题
- 第二个人的代码merge到父分支就会出现冲突的提示=>(master|MERGING)
- 这时候需要我们手动编辑冲突的文件代码
- 编辑后，add，commit，冲突解决完毕，MERGING提示消失。

# RequireJS
- 是一个js模块加载器
    + 我们需要知道，如果我们不使用defint定义模块，还是可以使用requirejs加载这些模块的。
- 也是一个规范模块化开发的库
    + 它根据AMD规范实现了模块定义与加载的API。

## require
- 作用：加载模块，然后分析模块的依赖，按顺序执行他们
- 语法：require([要加载的模块1，要加载的模块2，...], function() { //所有模块加载完毕后执行的代码 })

## define
- 作用：定义模块
- 语法：define([依赖模块1，依赖模块2，...], function() { //该模块的代码 })

## require.config
- 作用1：进行配置，配置后模块有了别名，使用方便简单
- 作用2：进行配置，配置非define模块的依赖与输出，让这种模块的表现与define模块一样
```javascript
require.config({
  // 配置路径的根
  baseUrl: './src/js/',
  // 给每个js模块的路径起个名字，方便使用，这里面的路径是相对于baseUrl的
  paths: {
  	a: path,
  	b: path
  },
  // shim是专门用来配置那些非define模块的依赖与输出
  // 一般我们自己写的模块不需要这么配置，因为我们都会使用define定义
  // 有这个配置主要是为了兼容那些第三方模块，让这种模块的表现与define模块一样
  shim: {
    bootstrap: {
      deps: [ 'jquery' ]   // deps用来配置该模块依赖
    },
    util: {
      exports: 'util'      // exports用来配置该模块的输出，值为该模块暴露的全局变量名字
    }
  }
});
```

## npm + git + github联合使用

### 第一个人提交代码到远程仓库

#### npm
- npm init -y
    + 加-y一步到位
- npm install jquery ...

#### gitignore
- echo '.*' >> .gitignore
    + 忽略所有隐藏文件
- echo '/node_modules' >> .gitignore
    + 忽略npm安装的所有第三方包

#### git
- git init
- git add *
- git commit -m '描述'

#### github
- 创建仓库
- git remote add origin git@url
- git push -u origin master

### 第二个人从远程仓库clone代码

#### git
- git clone git@url

#### npm
- npm install
    + 自动根据项目描述文件中的依赖安装所需的包

# 使用npm + git + gulp构建项目

## npm
- npm init -y
- npm install 各种前端包
    + 这些包记录在dependencies依赖项中
- npm install 各种开发包 -D
    + 这些包记录在devDependencies依赖项中
    + 学过的插件：gulp-htmlmin gulp-uglify gulp-concat gulp-rename gulp-clean-css gulp-less

## git
- git init
- 配置.gitignore
   + /node_modules
   + .*
   + !.gitignore
   + /dist

## gulp
- 编写gulpfile构建流程脚本
```javascript
// 加载gulp
var gulp = require('gulp');
// 加载压缩html的插件
var htmlmin = require('gulp-htmlmin');
// 加载压缩js的插件
var uglify = require('gulp-uglify');
// 加载压缩css的插件
var cleanCss = require('gulp-clean-css');
// 合并文件的插件
var concat = require('gulp-concat');
// 修改文件名的插件
var rename = require('gulp-rename');
// 编译less
var less = require('gulp-less');

// 1、编译less，编译后的结果进行压缩
gulp.task('less', function() {
  gulp.src('src/less/*.less')
    .pipe(less())
    .pipe(cleanCss())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist/less'));
});

// 2、压缩html
gulp.task('html', function() {
  gulp.src('src/**/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true, // 去掉空白字符
      minifyJS: true,//压缩页面JS
      minifyCSS: true,//压缩页面CSS
      removeComments: true//清除HTML注释
    }))
    .pipe(gulp.dest('dist'));
});

// 3、压缩js
gulp.task('js', function() {
  gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist/js'));
});

// 4、默认任务，监听文件变化，调用相关的任务再重复处理
gulp.task('default', function() {

  // 任务一致性，所有任务都跑一遍
  gulp.run(['less', 'html', 'js']);

  // 然后当文件变化时，对应的任务再自动执行
  gulp.watch('src/less/*.less', function() {
     gulp.run('less');
  });
  gulp.watch('src/**/*.html', function() {
    gulp.run('html');
  });
  gulp.watch('src/js/*.js', function() {
    gulp.run('js');
  });

});
```

# browser-sync工具
- 在win中搜索cmd，右键使用管理员权限打开
- 运行安装命令`npm i -g browser-sync`
- 最后运行检测命令`browser-sync --version`，如果输出了版本号，那就是成功了

# browserify工具
- 在win中搜索cmd，右键使用管理员权限打开
- 运行安装命令`npm i -g browserify`
- 最后运行检测命令`browserify --version`，如果输出了版本号，那就是成功了