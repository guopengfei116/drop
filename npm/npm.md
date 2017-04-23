# npm
>

## 使用

### 安装包
- npm install 包名
    + 将包下载到当前目下的node_modules文件夹中，安装后只能在当前目录下使用
- npm instasll -g 包名
    + 全局安装，安装后可以在任意目录下使用
- npm install 包名@版本号
    + 在当前目录内安装指定版本的包
- npm install 包名 --save
    + 安装包的同时，将包的安装信息记录在package.json文件中的dependencies属性中
- npm install 包名 --save-dev
    + 安装包的同时，将包的安装信息记录在package.json文件中的devDependencies属性中
- npm install 包名 --registry https://registry.npm.taobao.org
    + 从指定的仓库地址中下载安装包

### 卸载包
- npm uninstall 包名
    +　删除当前目录内的指定包
- npm uninstall -g 包名
    +　删除全局指定的包

## cnpm
>

### 安装
> npm install -g cnpm --registry https://registry.npm.taobao.org
