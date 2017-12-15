# 搭建vue开发环境

## npm
![主要操作步骤](./imgs/vue_npm.png)

## 目录结构
![主要目录结构](./imgs/vue_dir.png)

## 打包配置

#### babel配置 - .babelrc

```json
{
    "presets": ["env"],
    "plugins": ["transform-runtime"]
}
```

#### webpack配置 - webpack.config.js

```javascript
const path = require('path');
const htmlWebapckPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');

// 配置文件要求我们必须导出一个配置对象
module.exports = {

    // 入口
    entry: path.resolve(__dirname, './src/js/main.js'),

    // 输出
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle_[chunkhash:8].js'
    },

    //  插件配置
    plugins: [

        // 自动注入打包好的js文件到body里
        new htmlWebapckPlugin({
            template: './src/index.html',        // 要处理的html
            filename: 'index.html',                 // 处理后的html名称
            inject: 'body',                               // 自动注入js到什么地方
        }),

        // 每次打包前先清除dist目录
        new cleanWebpackPlugin(['./dist'])
    ],

    // loader的作用是为了让webpack可以打包其他类型的模块
    module: {

        // 配置loader, 该配置选项是必须的
        rules: [

            // 打包css
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },

            // 打包less
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },

            // 打包url文件
            {
                test: /\.(png|jpg|gif|jpeg|svg)$/,
                use: [
                    // 指定小于10kb的图片才转为base64编码打包
                    {loader: 'url-loader', options: {limit: 10240}}
                ]
            },

            // 转换特殊语法编写的js文件
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/  // 如果项目引入了node-modules的东西,不转换它们
            },

            // 解析vue文件
            {
                test: /\.vue$/,
                use: ['vue-loader']
            }
        ]
    },

    // webpack-dev-server工具配置
    devServer: {
        contentBase: 'dist',
        port: 7777,
        open: true,
        inline: true,
        progress: true,
    }
};
```

## 环境测试

#### 步骤预览
![主要操作步骤](./imgs/vue_test.png)

#### index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Document</title>
  </head>
  <body>
      <div id="app"></div>
  </body>
</html>
```

#### main.js
- 这里主要是把`根组件`渲染到页面中
- 其中`render`配置项的作用与`template`一样, 用来指定模版, 使用了`vue-loader`就必须使用它替代template
- [可以参考官方文档](https://cn.vuejs.org/v2/guide/installation.html#运行时-编译器-vs-只包含运行时)

```javascript
// 导入Vue库
import Vue from 'Vue';

// 导入根组件
import App from '../component/App.vue';

// 渲染根组件到占位标签上
new Vue({
    el: '#app',
    render(createElement) {
        return createElement(App);
    }
});
```

#### App.vue

```html
<template>
  <main>
    <h1>{{ title }}</h1>
  </main>
</template>

<script>
// 导出组件配置
export default {
    data() {
        return {
            title: 'Hello World!'
        }
    }
}
</script>

<style scoped>
h1 {
    font-size: 30px;
    color: red;
}
</style>
```

## git版本管理

#### 操作
![主要操作步骤](./imgs/vue_git.png)

#### .gitignore预览

```config
# 忽略第三方包, 他们已经记录在package.json文件中了
node_modules/

# 忽略打包后的文件, 因为我们的项目核心是源代码
dist/

# 忽略隐藏文件
.*

# 不忽略git配置文件和babel配置文件
!.gitignore
!.babelrc
```
