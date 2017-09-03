# webpack
- webpack是一个模块打包工具，默认只能打包js文件
- 借助于loader插件，webpack可以将css、img等静态资源也当做模块一起打包
- webpack是基于nodejs运行的，所以在时候前必须保证本地拥有nodejs运行环境

## 安装
- 全局安装
    + 脚本：`npm i webpack -g`
    + 全局安装后才可以在命令行中运行webpack命令
    + 可通过`webpack --version`测试全局是否安装成功
- 本地安装
    + 脚本：`npm i webpack -S`
    + 将来我们开发的项目，会把依赖都配置到package.json中，所以将来还会本地安装
- 说明：有些时候webpack全局安装一次就够了，但是将来有些插件可能依赖它，所以还要本地安装

## 常用命令
- 打包：
    + 脚本：`webpack main.js buld.js`
    + 描述：打包main.js，打包后的文件起名为buld.js
- 打包并压缩：
    + 脚本：`webpack main.js buld.js -p`
    + 描述：添加**-p**参数可以对打包后的文件进行压缩混淆
- 打包生成sourceMap
    + 脚本：`webpack main.js buld.js -d`
    + 描述：添加**-p**参数可以根据打包的文件提供source map，方便浏览器调试
- 根据配置文件打包
    + 脚本：`webpack`
    + 描述：打包规则通过配置文件指定，默认的配置文件名称为webpack.config.js

## 基本使用

#### 原始开发模式
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

#### 使用webpack
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

## 配置文件使用

#### 使用配置文件
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

#### 目录规范
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

# 第三方插件使用

## 说明
- webpack有两种插件机制
- 通过第三方loader实现其他文件类型的打包
- 通过第三方plugin实现额外处理

## 准备工作
- npm init -y
    + 生成package.json项目描述文件
- npm i webpack -D
    + 本地安装webpack，第三方插件有依赖

## html-webpack-plugin

#### 说明
- 这是webpack的一款插件
- 可自动把构建好的js脚本引入到html中

#### 安装
- npm i html-webpack-plugin -D

#### 使用
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

## css-loader、style-loader

#### 说明
- css-loader
    + 打包css文件内容到js中
    + 生成的模块会输出一个数组，里面存储着每一个css文件模块的内容
- style-loader
    + 让打包好的css在页面中自动生效
    + 内部调用css-loader生成的模块，把得到样式通过style标签的方式插入到页面让其生效

#### 安装
- npm i css-loader style-loader -D

#### 使用
```javascript
// main.js
import './src/css/example.css'
```
```javascript
module: {
	rules: [
		{
			test: /\.css$/,
			use: [
				'style-loader',
				'css-loader'
			]
		}
	]
}
```

#### 非配置方式使用
```javascript
// entry.js
require('style-loader!css-loader!./src/css/example.css');
```

## less-loader

#### 说明
- 把less解析为css

#### 安装
- 脚本：npm i less less-loader -D
- 备注：less为less-loader的依赖

#### 使用
- 要让less文件成功打包并生效，在use中还需添加css-loader与style-loader
```javascript
// entry.js
import './src/less/example.less'
```
```javascript
module: {
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
}
```

## sass-loader

#### 说明
- 把sass解析为css

#### 安装
- 脚本：npm i node-sass sass-loader -D
- 备注：node-sass为sass-loader的依赖
- 注意：根据尝试大部分情况下npm安装node-sass都失败，请使用cnpm安装

#### 使用
- 要让less文件成功打包并生效，在use中还需添加css-loader与style-loader
```javascript
// entry.js
import './src/scss/example.scss'
```
```javascript
module: {
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
}
```

## html-loader

#### 说明
- 把html文件内容以字符串的形式引入

##### 安装
- 脚本：npm i html-loader -D

##### 使用
```javascript
// entry.js
import example from './src/tpl/example.html'
document.querySelector('body').appendChild(example);
```
```javascript
module: {
	rules: [
		{
			test: /\.html$/,
			use: 'html-loader'
		}
	]
}
```

## url-loader、image-webpack-loader

#### 说明
- url-loader
    + 替换文件的引用，小文件将以base64编码的形式和文件一起打包，以减少http请求
    + 小文件的大小可通过limit选项进行配置，单位字节(byte)，一般配置10240，意为10kb
- image-webpack-loader
    + 压缩图片

#### 安装
- 脚本：npm i file-loader url-loader image-webpack-loader -D
- 备注：file-loader为url-loader的依赖

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
module: {
	rules: [
		{
			test: /\.(png|jpg|gif)$/,
			use: [
				{loader: 'url-loader', options: {limit: 8192}},
				'image-webpack-loader'
			]
		}
	]
}
```

## babel-loader

#### 说明
- 可把es6、es7、TS等浏览器暂不支持的语法规范编写的js脚本，解析为浏览器支持的es5标准脚本。

##### 官网
- [英文官网](http://babeljs.io/)
- [中文官网](http://babeljs.cn/)

##### 安装
- 脚本：npm i babel-loader babel-core babel-preset-es2015 babel-plugin-transform-runtime -D
- 说明：还可以安装配置其他依赖支持es7，es8脚本的转换

##### 使用
```javascript
module: {
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
}
```

## vue-loader

#### 说明
- 解析打包vue文件

#### 安装
- 脚本：npm i vue-loader vue-template-compiler -D
- 备注：vue-template-compiler是vue-loader的依赖

#### 使用
```javascript
module: {
	rules: [
		{
			test: /\.vue$/,
			use: [
				'vue-loader'
			]
		}
	]
}
```

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

## 配置代码热更新

#### 说明
- 前端开发通常会边写边查看浏览器运行效果
- 使用了构造工具后，代码每次修改都要重新打包后再测，比较繁琐
- webpack-dev-server这款工具便可实现webpack项目的自动打包与浏览器刷新
- 启动一台文件服务器，可以实现代码热更新，方便开发

##### 安装
- 全局安装：npm i webpack-dev-server -g
- 本地安装：npm i webpack-dev-server -D
- 注意：本地安装不是必须的，但是为了记录项目依赖，最好本地装上
- 说明：如果只在本地安装按理说也可以，但是必须安装到项目启动目录，不能安装到父级目录

##### 使用
- 在package.json项目描述文件中，找到scripts配置项，添加一条脚本配置
```javascript
{
	"name": "my project",
	"scripts": {
	    "start": "webpack-dev-server --inline --open --port 8888"
	}
}
```
- 然后通过`npm run 名称`的方式执行命令启动服务
- webpack-dev-server --inline --hot --open --port 6666
    + inline 
    + open 打包完成后自动打开浏览器
    + port 指定端口，默认8080
    + host 指定ip，默认127.0.0.1(localhost)
- 备注：如果想直接执行命令启动服务，全局安装webpack-dev-server即可

## 错误汇总
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

