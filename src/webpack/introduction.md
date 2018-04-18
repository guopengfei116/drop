# webpack
- 一个功能强大的js模块打包工具，可以把`CommonJS`模块，`AMD`模块，`ES6`模块打包在一起
- 借助于`loader`插件，webpack可以将css、img、tpl等`其他文件`也一起打包

## 安装
- webpack是基于`nodejs`运行的，所以在时候前必须保证本地`拥有`nodejs运行环境

#### 修改npm镜像地址
- 可以修改镜像地址为国内淘宝服务器加快速度: `npm config set registry http://registry.npm.taobao.org/`
- 后续有需要再改回来: `npm config set registry https://registry.npmjs.org/`
- 查看本地配置: `npm config list`

#### 全局安装
- 脚本：`npm i webpack -g`
- 全局安装`一次`以后就不用了，全局安装的目的是可以在本地直接运行`webpack`命令

## 基本使用与介绍
- 通过一个小Dome体会webpack的作用

#### 未打包模式
- 普通模式开发网站，我们要在页面中通过`script`标签去组织js的`加载顺序`，每个单独js的`依赖`不明确
- 同时还会造成`过多`的`http`请求，拖慢我们网站的载入速度

```html
<html>
    <head>
        <meta charset="UTF-8">
        <title>原始模式</title>
    </head>
    <body>
        <script src="js/jquery.js"></script>
        <script src="js/bootstrap.js"></script>
        <script src="js/a.js"></script>
        <script src="js/b.js"></script>
        <script src="js/main.js"></script>
    </body>
</html>
```

#### 打包模式
- webpack提供了`一站式`解决方案，不论你采用`何种`模块化，都可以帮你完成`打包`任务
- 为了`减少http`请求, 我们采用一种`模块化`的方式编写如下代码, 然后`打包`成一个js文件
- 打包命令: `webpack 入口文件 打包后文件`

```html
<html>
    <head>
        <meta charset="UTF-8">
        <title>模块打包</title>
    </head>
    <body>
        <!-- 引入一个打包后的文件即可 -->
        <script src="js/bundle.js"></script>
    </body>
</html>
```
