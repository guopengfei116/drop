# shell
> shell是操作系统提供给用户操作计算器硬件做事情的一个软件，它对底层的操作进行了上层封装
这个软件可以分为两大类：图形化shell、命令化shell。

## 常见的命令化shell
- window下自带的cmd
- 微软的powershell
- base(linux操作系统默认自带，使用比较广泛流行)

# vi编辑器
> linux自带的一款使用命令行方式编辑文件的软件。

## vi编辑器的3种模式
- 命令行模式
   + 默认进入该模式
   + 其他模式下按esc即可切换到命令行模式
- 输入模式
   + 输入i或a或其他
- 末行模式(和命令行模式类型，都可以执行一些命令)
   + 输入:号

# 版本管理工具
> 可对文件的增删查改等操作做版本记录，并提供版本比较与回滚等各种功能的软件。

## 本地化的版本管理
- 代表：webstorm
- 一些高级文本编辑工具可能会自带该版本管理软件。
- 但是本机一旦毁坏，那么历史版本就会丢失。

## 集中式的版本管理
- 代表软件:svn
- 该方式需要一台公共的服务器，所有用户可以通过这台服务器进行版本管理操作
- 但是这种方式用户必须要保证能够连接上服务器，才能正常使用
- 另外采用这种方式，本机毁坏没有问题，但是服务器一旦毁坏，影响比较大(不过现在的服务器都有备份，这个也可以解决)

## 分布式的版本管理
- 代表软件：git
- 该方式也需要一台公共的服务器用来共享大家代码，所有用户本机也会存在所有的历史版本，作为备份。
- 这种方式用户不联网也可以进行版本管理
- 无乱是用户本机毁坏还是服务器毁坏，都不会造成太大影响

# git

## git的4中文件状态
> 使用git对一个目录进行版本管理，git会对该目录下所有的文件进行一个状态区分。

- 未追踪
    + 代表该文件该没有被git整整管理
- 已提交
    + 代表该文件已经被git管理
- 以修改
    + 代表该文件已经被git管理，但是你对这个文件进行了修改，修改的内容并没有被管理
- 已暂存
    + 代表该文件已经被git管理，但是是临时性的，你可以随时取消

## git的3个工作区

- 工作区

- 暂存区

- 仓库区

# git的基本操作

- 安装git，配置用户名与邮箱
    + 一台电脑配置一次即可终生使用
    + 打开gitBash 
    + 运行git config -g user.name 你的用户名
    + 运行git config -g user.email 你的游戏
    + 运行git config --list查看是否配置成功

- 新建一个目录gitStudy
    + 该目录下存储所有git仓库
    + 在该目录下新建一个git_1作为我们的第一个git仓库

- 进入到gitStudy/git_1目录
    + 运行git init，使git_1普通目录变为git仓库
    + 查看git_bash窗口中的路径是否多了(master)
    + 也可以运行ls -a命令，查看该目录下是否多了一个.git目录

- 创建目录&新建文件
    + 运行mkdir css img js，创建三个目录
    + echo xxx >> index.html，编写入口html
    + echo xxx >> css/index.css，编写css
    + echo xxx >> js/js.css，编写js

- 查看文件状态
    + 运行git status，发现新的的文件都是未追踪状态
    + 发现css和js目录，以及index.html是未追踪状态
    + 但是img并没有提示，因为git默认会忽略掉空目录
    
- 让git追踪文件
    + 运行git add .命令，把所有的文件进行追踪
    + 这样工作区的文件就被记录在了暂存区，有了临时性的备份
    
- 修改文件&查看状态&暂停修改
    + echo xxx >> index.html
    + 运行git status，发现刚刚修改的文件状态为已修改
    + 运行git add index.html，把修改也暂存起来
    + 一般开发中我们会写着写着就add一下，随时把未编写完毕的文件进行临时存储
    
- 修改文件&取消修改
    + echo xxx >> index.html
    + 运行git status，发现刚刚修改的文件状态为已修改
    + 然后想取消修改，运行git checkout index.html
    + 运行后运行git status，查看刚刚提示的已修改是不是不在了
    + 运行cat index.html验证文件的修改已被取消

- 修改文件&文件变化比较
    + echo xxx3 >> index.html
    + 运行git status，发现刚刚修改的文件状态为已修改
    + 运行git diff index.html，查看工作区文件与暂停区文件的差异
    + 运行vi index.html，删除一些文件内容
    + 运行git diff index.html，查看工作区文件与暂停区文件的差异

- 把暂存文件进行永久备份
    + 运行git status查看文件状态
    + 如果有已修改，那么add
    + 运行git commit -m '对提交的版本进行一个描述，方便将来查阅与回忆'
    + 运行git log查看已提交的版本历史
    
- 再次修改文件，提交新的历史版本
    + echo xx >> index.html
    + git commit -am '修改页面结构'
    + git log查看历史版本

- 回滚到指定历史版本记录的代码
    + 可以重复修改文件提交多次历史百衲本
    + 然后使用git log或者git reflog查找要回滚版本的ID号
    + 运行git reset --hard 版本ID回滚到指定版本
    
# 分支
- 方便团队协作
- 方便多功能开发与切换

- 基于master创建login分支
    + 运行git branch查看所有分支
    + 运行git checkout ligin切换到login分支
    
- 基于login分支进行开发
    + echo xxx >> js/index.js
    + git status
    + git commit -am '修改bug，保存未开发完毕的登陆'

- 去fixbug分支开发 
    + git checkout master,先切换到master分支
    + git branch fixbug，基于master分支建立子分支
    + git checkout fixbug，然后切换到新创建的子分支
    + echo 修改bug >> js/index.js
    + git commit -am 'bug修改完毕'

- 合并fixbug分支到主分支
    + git checkout master,先切换到master分支
    + git merge fixbug,把fixbug合并到当前所在分支
    + 运行git status查看是否存在冲突
    + 运行git log查看历史版本是否也一起合并了进来
    + 运行git branch -d fixbug删除分支
    
- 回到login分支继续开发
    + git checkout login
    + echo xxx >> js/index.js
    + git commit -am '登陆完成'
    
- 合并login分支到主分支
    + git checkout master,先切换到master分支
    + git merge login
    + 运行git status查看是否存在冲突
    + 运行git log查看历史版本是否也一起合并了进来     
    
- 解决冲突
    + vi js/index.js 
    + 使用vi删除git添加的冲突标识符
    + 使用vi对不同分支添加的新代码进行删改
    + 运行git commit -am '解决冲突',提交编辑完毕的冲突文件
    + 运行git status查看文件状态
    + 运行git log查看历史版本
    + 运行git branch -d login删除分支
    
# 远程仓库使用

- 本地创建远程仓库或者在github上建立一个
    + 本地创建：查看资料的xmind
    + github建立：查看资料的xmind

- 创建两目录模拟两个人
    + mkdir github1 github2 创建两个新的空目录，代表两个不同人

- 第一个人本地目录初始化&提交本地代码到远程
    + cd github1，切换到github1目录（注意你的路径）
    + 运行git clone 远程仓库地址 . ，依据现有远程仓库的内容初始化本地仓库，远程是空的，本地也是空的
        + clone与init一样，一个git仓库一生只要一次
    + echo xxx >> index.html，创建一个新文件
    + git add index.html，把新文件添加到暂存区
    + git commit -m '第一个人在本地提交的代码'，把暂存区代码提交到版本区
    + git push origin master,把本地当前分支的内容提交到远程仓库的master分支

- 第二个人通过远程仓库实现代码共享
    + cd github2，切换到github1目录（注意你的路径）
    + 运行git clone 远程仓库地址 . ，依据现有远程仓库的内容初始化本地仓库，远程有的内容，本地也有
        + clone与init一样，一个git仓库一生只要一次
    
- 第二个人提交本地代码
    + echo xxx >> index.html，修改第一个人编写的文件
    + git commit -am '修改'，把工作区代码提交到版本区，-am参数可以跨过git add xxx步骤，直接提交已修好文件
    + git push origin master,把本地当前分支的内容提交到远程仓库的master分支 
    
- 第一个人通过远程仓库实现代码共享
    + cd github2，切换到github1目录（注意你的路径）
    + 运行git pull origin master，把远程的master最新代码同步到本地
    
