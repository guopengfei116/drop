# git命令汇总

## git config

#### 配置
初次安装git，需要先配置用户名与邮箱，全局配置一次即可终生使用
- 配置全局用户名
    + `git config --global user.name 名称`
- 配置全局邮箱
    + `git config --global user.email 邮箱`

#### 查看配置
- 查看全局配置列表
    + `git config --list`
- 查看指定配置
    + `git config user.name`
    + 优先找局部，局部没有找全局
- 查看全局指定配置
    + `git config --global user.name`

#### 删除配置
- 删除本地配置
    + `git config --unset user.name`
- 删除全局配置
    + `git config --unset --global user.name`
- 删除多配置
    + `git config --unset-all user.name`
    + 有些配置多次设置后，--unset删除不掉，可以使用该命令进行尝试

## git init
- 初始化为git仓库，一个项目只需初始化一次
- 初始化后，会在目录内生成一个.git隐藏文件夹，如果删除这个文件夹，就要重新init

## add

####  提交到暂存区
- 添加新文件
    + git add 新文件1 新文件2
- 添加文件修改
    + git add 修改文件1 修改文件2
- 批量添加新文件或文件修改
    + git add *
    + git add xxx/*
    + git add -A

##