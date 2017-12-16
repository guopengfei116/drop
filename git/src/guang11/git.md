# git

### init
作用：让git管理此项目，一个项目调用一次
语法：git init

### config
作用：配置用户名与邮箱，在提交版本时就会有对应的记录
语法：git config --blobal user.name xxx
语法：git config --blobal user.email xxx
语法：git config --blobal alias.{别名} {命令} ==> 给指定命令起别名
语法：git config --list ==> 查看所有配置

### add
作用：提交工作区文件到暂存区
语法：git add {文件名1 文件名2} ==> 提交指定工作区文件
语法：git add -A ==> 提交全部工作区文件

### rm
作用：删除文件
语法: git rm --cached {fileName} ==> 取消文件暂存
语法: git rm {fileName} ==> 取消文件暂存并删除工作区文件
语法：git rm -f {fileName} ==> 取消文件暂存并删除工作区文件，强制操作

### commit
作用：提交新版本
语法：git commit -m {描述} ==> 产生一个新版本提交
语法：git commit -m {描述} --amend ==> 不产生新版本，合并到上一次提交的版本

### diff
作用：不同区之间的代码差异对比
语法：git diff [fileName] ==> 工作区与暂存区之间的对比
语法：git diff --cached(--staged) [fileName] ==> 暂存区与版本区之间的对比
语法：git diff master [fileName] ==> 工作区与版本区之间的对比
语法：git diff [分支名] [分支名] [fileName]

### reset
作用：恢复工作区文件，时光机
语法：git reset HEAD {fileName}  ==> 从暂存区撤回某文件到工作区
语法：git reset --hard HEAD^ ==> 恢复到上一次提交的版本
语法：git reset --hard HEAD~{number} ==> 恢复到之前第几次提交的版本
语法：git reset --hard {commitId} ==> 恢复工作区文件到指定版本

### checkout
作用：恢复文件的修改
语法：git checkout {file.name} ==> 检出当前分支文件
语法：git checkout {分支名} 检出指定分支文件
语法：git checkout {commitId} {file.name} 从指定版本区恢复某个文件
语法：git checkout -b {分支名} 在当前基础上创建分支并切换到该分支

### branch
作用：分支操作
语法：git branch ==> 查看所有分支
语法：git branch {分支名} ==> 创建分支
语法：git branch -d {分支名} ==> 删除指定分支
语法：git branch -D {分支名} ==> 强制删除未被合并的分支
语法：git branch --merged ==> 查看已merge到当前分支的分支
语法：git branch --no-merged ==> 查看未merge到当前分支的分支

### log
作用：查看提交新版本的历史
语法：git log [--oneline] [数量]
语法：git log {要查看的数量}

### reflog
作用：查看操作历史，以上帝的视角查看历史版本的变化
语法：git reflog

### remote
作用：查看远程仓库信息
语法：git remote 查看远程仓库名字
语法：git remote -v 查看远程仓库的地址

### push
作用：提交本地版本区到远程仓库，远程没有该分支则会创建
语法：git push {远程仓库名} {分支名}

### pull
作用：拉取远程仓库代码合并到当前工作区
语法：git pull

### fetch
作用：拉取远程仓库git信息到本地
语法：git fetch

### merge
作用：合并某分支到当前分支
语法：git merge {仓库名/分支名}
语法：git merge {版本ID}

### stash
作用：暂存区文件缓存操作
语法：git stash ==> 临时存储暂存区文件
语法：git statsh apply ==> 取出临时存储的暂存区文件
语法：git statsh drop ==> 删除暂存区缓存
语法：git statsh pop ==> 取出临时存储的暂存区文件，并删除缓存

### tag
作用：标签操作
语法：git tag ===> 查看所有标签
语法：git tag {标签名} ==> 创建标签

### 配置SSH连接github
1. 在本地生成秘钥：ssh-keygen -t rsa
2. 找到秘钥生成的目录，将公钥放到Github中
    a、github点击右上角人物头像
    b、选择settings菜单
    c、选择SSH相关菜单
    d、选择添加一个SSH
    e、输入ssh的名称，已知内容（就是公钥）将公钥放入其中，保存即可
3. 在本地测试 ssh git@github.com看看是否成功
Hi chengxc! You've successfully authenticated, but GitHub does not provide shell access.

4. 提交代码
备注：如果在提交代码的时候github中已经含有内容，最好先更新代码，使用SSH地址进行提交：
git pull --rebase origin master

i5ting_toc -f sample.md -o