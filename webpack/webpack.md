# webpack
- webpack是一个模块打包工具，默认只能打包js文件
- 借助于loader插件，webpack可以将css、img等静态资源也当做模块一起打包
- webpack是基于nodejs运行的，所以在时候前必须保证本地拥有nodejs运行环境

## 安装
- 安装cnpm
    + npm install -g cnpm --registry=https://registry.npm.taobao.org
        * 为了保证安装速度与node-sass的安装成功率
        * 官网：[淘宝NPM镜像](https://npm.taobao.org/)
- 先全局安装
    + cnpm i -g webpack
        * 安装后可以在命令行工具中运行webpack命令执行打包任务
    + webpack --version
        * 如果打印出版本号证明安装成功
- 项目中本地安装
    + npm init -y
        * 如果项目中已存在package.json项目描述文件，忽略执行这条命令
    + cnpm i webpack --save-dev
        * 安装webpack到项目node_modules目录中，并自动配置package.json中的开发依赖

## 可能遇到的问题
- cnpm安装包失败
    + 可能是因为你的硬盘文件格式为FAT32，
        * 可以在资源管理器中->右键盘符->属性，查看本地磁盘文件系统，一般为NTFS
        * 如果是这种情况那就改用npm安装包
    + 可能是因为你修改过项目文件名导致已安装的包出现错误
        * 如果有这种情况，删除整个node_modules，重装本地包
- webpack构建时报错
    + Error: Cannot find module 'webpack/lib/node/NodeTemplatePlugi
        * 是因为你没有本地安装webpack
        * 请运行cnpm install webpack -D
    + Cannot find module '其他包'
        * 是因为你安装包的时候，某些包的依赖没有安装成功
        * 要么手动cnpm i 提示的包名，要么删除整个node_modules，重装本地包
    + Invalid configuration object.
        * 是因为你的webpack.config.js配置的某些属性名写错了
        * 找到configuration has an unknown property 'plugin'.这句话
        * 这里就是因为把plugins写成了plugin造成的配置不对报错
- webpack构建时没有产出文件到dist目录
    + 一般是因为output中的path路径配置有误造成的
        * 这里咱们使用的是path.resovle(__dirname, './dist');
        * 千万注意是'./dist'，不是'/dist'
- npm run xxx后报语法错误
    + 检测package.json中的scripts属性名是不是写错了
    + package.json配置文件中不能有注释，并且字符串必须使用双引号包起来

## 基本使用

##### 入门

###### 原始开发模式
1. 新建一个jq项目
    + 保证已全局安装过webpack
2. 项目有如下3个文件
    + jquery.js
        * 引入的第三方库
    + main.js
        * 我们自己编写的脚本
    + index.html
        * 页面结构，内部引入jquery.js与main.js
3. 使用浏览器打开index.html
    + 弹出body宽高
4. 代码范例
```html
<html>
	<body>
		<script src="jquery.js"></script>
		<script src="main.js"></script>
	</body>
</html>
```
```javascript
var $node = $('body');
console.log($node.width() + ' : ' + $node.width());
```

###### 使用webpack
1. 把刚才的项目copy一份
2. 修改main.js文件
    + 通过es6语法导入依赖的jquery模块
    + 具体修改内容参考下面代码范例
3. 使用命令行工具运行webpack main.js build.js
    + 添加-p参数可对打包后文件进行压缩
    + 添加-d参数可提供source map，方便代码调试
4. 修改index.html文件
    + 内部只引入打包好的build.js
    + 具体修改内容参考下面代码范例
5. 使用浏览器打开index.html
    + 没有错误，弹出body宽高
6. 代码范例
```html
<html>
	<body>
		<script src="build.js"></script>
	</body>
</html>
```
```javascript
// 导入jquery模块，并用$接收jquery模块的返回值
import $ from './jquery.js';
var $node = $('body');
console.log($node.width() + ' : ' + $node.width());
```

##### 进阶

###### 使用配置文件
1. 把刚才的webpack项目copy一份
    + 删除build.js这里要重新生成
2. 项目中创建webpack.config.js配置文件
    + 配置内容参考下面的实例
3. 使用命令行工具运行webpack
    + 有了配置文件后只需运行webpack即可
4. 使用浏览器打开index.html
    + 没有错误，弹出body宽高
5. 代码范例
```javascript
var path = require('path');
module.exports = {
	entry: './main.js',
	output: {
		// 这里必须为绝对路径，否则报错
		path: path.resolve(__dirname, './'),
		filename: 'build.js'
	}
};
```

###### 目录规范
1. 把刚才的webpack项目copy一份
    + 删除build.js这里要重新生成
2. 新增两个目录
    + src
        * 用于存放我们手写的源代码
    + dist
        * 用于存放打包后的文件
3. 把如下代码放入src中
    + jquery.js
    + main.js
4. 修改webpack.config.js配置文件
    + 修改entry路径为'./src/main.js'
    + 修改path路径为'./dist'
    + 具体修改内容参考下面代码范例
5. 使用命令行工具运行webpack
    + 有了配置文件后只需运行webpack即可
6. 修改index.html
    + 修改build.js新的引入路径
    + 具体修改内容参考下面代码范例
7. 使用浏览器打开index.html
    + 没有错误，弹出body宽高
8. 代码范例
```html
<html>
	<body>
		<script src="./dist/build.js"></script>
	</body>
</html>
```
```javascript
var path = require('path');
module.exports = {
	entry: './src/main.js',
	output: {
		// 这里必须为绝对路径，否则报错
		path: path.resolve(__dirname, './'),
		filename: 'build.js'
	}
};
```

## plugin使用

##### html-webpack-plugin
- 可自动把构建好的js脚本引入到html中

##### 准备工作
- 添加package.json配置文件
- 可运行cnpm init -y自动创建

##### 安装
- 本地webpack：cnpm i webpack -D
- 插件：cnpm i html-webpack-plugin -D
- 依赖：cnpm i tapable webpack-sources ansi-regex json5 object-assign emojis-list -D

##### 使用
- copy上面的项目
    + 删除dist目录中的内容
- 修改index.html
    + 删除build.js的引用
    + 移动文件到src目录下
- 添加配置
```javascript
plugins: [
	new htmlWebpackPlugin({
		template: 'src/index.html',
		filename: 'index.html',
		inject: 'body'
	})
]
```

## loader使用

### css-loader、style-loader

#### 说明
- css-loader
    + 打包css文件内容到js中
- style-loader
    + 让打包好的css在页面中自动生效

#### 安装
- loader安装
    + npm install --save-dev css-loader style-loader

#### 使用
```javascript
// main.js
import './src/css/example.css'
```
```javascript
rules: [
	{
		test: /\.css$/,
		use: [
			'style-loader',
			'css-loader'
		]
	}
]
```

## 其他loader

### less-loader

#### 说明
- 把less解析为css

#### 安装
- loader安装
    + npm install --save-dev less-loader
- 依赖安装
    + npm install --save-dev less

#### 使用
```javascript
// entry.js
import './src/less/example.less'
```
```javascript
rules: [
	{
		test: /\.less$/,
		use: [
			'style-loader',
			'css-loader',
			'less-loader'
		]
	}
]
```

### sass-loader

#### 说明
- 把sass解析为css

#### 安装
- loader安装
    + npm install --save-dev sass-loader
- 依赖安装
    + npm install --save-dev node-sass

#### 使用
```javascript
// entry.js
import './src/scss/example.scss'
```
```javascript
rules: [
	{
		test: /\.scss$/,
		use: [
			'style-loader',
			'css-loader',
			'sass-loader'
		]
	}
]
```

### html-loader

#### 说明
- 把html文件内容以字符串的形式引入

##### 安装
- loader安装
    + npm install --save-dev html-loader

##### 使用
```javascript
// entry.js
import example from './src/tpl/example.html'
document.querySelector('body').appendChild(example);
```
```javascript
rules: [
	{
		test: /\.html$/,
		use: 'html-loader'
	}
]
```

### url-loader、image-webpack-loader

#### 说明
- url-loader
    + 替换文件的引用，小文件将以base64编码的形式和文件一起打包，可减少http请求
- image-webpack-loader
    + 压缩图片

#### 安装
- loader安装
    + npm install --save-dev url-loader image-webpack-loader
- 依赖安装
    + npm install --save-dev file-loader

#### 使用
```html
// example.html
<img src="./img/example.png">
```
```css
// example.css
.cls {
	background-image: url('../img/example.png') 
}
```
```javascript
rules: [
	{
		test: /\.(png|jpg|gif)$/,
		use: [
			{loader: 'url-loader', options: {limit: 8192}},
			'image-webpack-loader'
		]
	}
]
```

### babel-loader

#### 说明
- 可把es6、es7等浏览器暂不支持的语法规范编写的js脚本，解析为浏览器支持的es5标准脚本。

##### 官网
- [英文官网](http://babeljs.io/)
- [中文官网](http://babeljs.cn/)

##### 安装
- loader安装
    + npm install --save-dev babel-loader
- 依赖安装
    + npm install --save-dev babel-core babel-preset-es2015 babel-plugin-transform-runtime

##### 使用
```javascript
rules: [
	{
		test: /\.js$/,
		use: {
			loader: 'babel-loader',
			options: {
				// 配置要解析的语法规范
				presets: ['es2015'],
				plugins: ['transform-runtime']
			}
		},
		include: /src/,
		exclude: /(node_modules)|bower_components)/
	}
]
```

### webpack-dev-server

#### 说明
- 启动一台文件服务器，可以实现代码热更新，方便开发

##### 安装
- npm install --save-dev webpack-dev-server

##### 使用
- webpack-dev-server --inline --hot --open --port 6666

##### 配置
- inline 自动刷新
- hot 热加载
- open 自动打开浏览
- port 指定端口，默认8080
- host 指定ip，默认127.0.0.1(localhost)

## webpack核心配置说明

##### entry
- 作用：入口文件
- 值类型：
    + 字符串值： 配置单个入口文件
    + 数组：配置多个文件，最终多个文件合并为1个入口文件
    + 对象：配置多个页面的不同入口文件，每个入口文件都会生成1个js

#### output
- 作用：输出配置
- 值类型：
    + 对象：{}

###### output.path
- 作用：文件输出路径，必须为绝对路径
- 值类型：
    + 字符串：path.resolve(__dirname, 'js/dist/')

###### output.publicPath
- 作用：配置文件被引用时的前缀
    + 一般为上线后静态文件所在的服务器域名
- 值类型：
    + 字符串: 'http://www.beauty.com'

###### output.filename
- 作用：配置输出的文件名
- 值类型：
    + 字符串：'build.js'
- 占位符使用：
    + 可动态构成文件名
    + name
        * 'js/[name]_build.js'
        * entry里不同入口文件的key
    + hash
        * 'js/[name]_[hash]_build.js',
        * 每次构建的hash值
    + chunkhash
        * 'js/[name]_[chunkhash]_build.js',
        * 构建后文件的hash值
        * 使用频率较高

#### plugins
- 作用：插件配置
- 值类型：
    + 数组：[plugin_config_1, plugin_config_2, ...]

#### module
- 作用：对不同文件类型模块的配置
- 值类型：
    + 对象：{}

###### module.rules
- 作用：不同模块处理规则
- 值类型：
    + 数组：[loader_config_1, loader_config_2, ...]
