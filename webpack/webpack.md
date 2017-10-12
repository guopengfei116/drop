# webpack
- 一个模块打包工具，默认只能打包js文件
- 借助于loader插件，webpack可以将css、img、tpl等静态资源也一起打包

## 安装
- webpack是基于nodejs运行的，所以在时候前必须保证本地拥有nodejs运行环境
- 全局安装
    + 脚本：`npm i webpack -g`
    + 全局安装一次以后就不用了，全局安装的目的是可以在本地直接运行`webpack`命令
- 本地安装
    + 脚本：`npm i webpack -D`
    + 在项目中使用webpack，每个项目都需要进行一次本地安装
    + `-D`参数是`--save-dev`的简写，代表项目开发时依赖

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
- 为了解决上诉问题，出现了各种`模块化`解决方案
- `CommonJS`同步模块化规范，`AMD`异步模块化规范，以及`ES6`模块，用于解决模块`加载`与`依赖`的问题
- 这些模块化规范`各有千秋`，但不管采用何种技术，最终都会为了`减少http`请求采用`不同`的技术进行打包
- 而`webpack`提供了`一站式`解决方案，不论你采用何种模块化，都可以帮你完成`打包`任务

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

## 配置文件

#### 使用说明
- 为了使用`更强大`的打包功能，我们可以使用`配置文件`来描述整个打包方式
- 有了配置文件，也方便我们统一`不同开发者`与不同平台以`相同`的方式进行打包，`一劳永逸`
- 首先在项目中创建一个`webpack.config.js`文件，里面去`编写配置`，最后`导出配置`即可内容
- 配置文件写完后，直接运行`webpack`命令即可

```javascript
var path = require('path');

module.exports = {
	// 我们在模块化开发时，通过会有一个最先执行的入口文件
	// 只需把它自己配置进去，webpack会自动分析依赖打包
	entry: path.resolve(__dirname, 'src/main.js'),

	// 打包后文件的输出配置
	output: {
		path: path.resolve(__dirname, 'dist'), // 这里必须为绝对路径，否则报错
		filename: 'js/bundle_[chunkhash:8].js' // [chunkhash:8]的作用是给文件添加唯一的标识符，预防浏览器缓存
	}
};
```

#### 目录结构说明
- 使用了打包系统后，通常我们会把`源代码`与`打包后`的代码放置到`src`与`dist`两个不同的目录分离存储
- 这样做即不会破坏我们原有的代码与结构，也不会引起混乱

#### 基本命令汇总
- 打包：
    + 脚本：`webpack src/main.js dist/bundle.js`
    + 描述：打包src目录下的main.js，打包后的文件放置到dist目录，起名为bundle.js
- 打包并压缩：
    + 说明：添加`-p`参数会自动`压缩混淆`打包后的文件
- 打包生成sourceMap
    + 说明：添加`-d`参数可以生成source map到打包文件中，便与在浏览器端`调试`打包后的文件
- 使用配置文件
    + 默认：`webpack`命令打包时默认会读取本地`webpack.config.js`文件中的配置
    + 自定义：也可以通过`webpack --config filename`自定义配置文件

## plugin与loader使用

#### 说明
- webpack提供了强大的plugin机制，用于处理特殊的打包需求
- 还提供了强大的loader接口，用于支持对非js类型文件的打包

#### 准备工作
- npm init -y
    + 生成package.json项目描述文件
- npm i webpack -D
    + 本地安装webpack

## html-webpack-plugin

#### 简介
- 这是webpack一款用于处理html的插件
- 这里我们用它自动把构建后的js脚本引入到html中

#### 安装
- `npm i html-webpack-plugin -D`

#### 使用
- 有了这个插件，我们就不用手动编写script标签引入打包后的文件了
- 在`webpack.config.js`中添加如下配置

```javascript
plugins: [
	new htmlWebpackPlugin({
		template: 'src/index.html',   // 源代码文件名
		filename: 'index.html',         // 处理后的文件名
		inject: 'body',                       // 脚本自动插入的位置
		minify:{ // 压缩优化HTML页面
	        collapseWhitespace:true, // 合并空白字符
	        removeComments:true, // 移除注释
	        removeAttributeQuotes:true // 移除属性上的引号
	    }
	})
]
```

## css-loader、style-loader

#### 简介
- css-loader
    + 打包css文件内容到js中
    + 生成的模块会输出一个数组，里面存储着每一个css文件模块的内容
- style-loader
    + 让打包好的css在页面中自动生效
    + 内部调用css-loader生成的模块，把得到样式通过style标签的方式插入到页面让其生效

#### 安装
- `npm i css-loader style-loader -D`

#### 打包说明
- 如果需要webpack打包其他类型文件，就必须在模块中引入

```javascript
// main.js
import './src/css/example.css';
```

#### 添加新配置
- 这里容易写错，注意缩进

```javascript
module: {
	rules: [
		{
			test: /\.css$/,                                   // 匹配结尾css的文件
			use: [  'style-loader', 'css-loader' ]  // 使用什么loader打包css，这里顺序不能乱
		}
	]
}
```

#### 非配置方式使用
- 这是非配置方式指定文件打包时所用的loader，不常用

```javascript
// main.js
require('style-loader!css-loader!./src/css/example.css');
```

## less-loader

#### 简介
- 把less解析为css

#### 安装
- 脚本：`npm i less less-loader -D`
- 备注：less为less-loader的依赖

#### 使用
- 打包`less`同样需要在模块中`引入`
- 要让`less`文件成功打包并`生效`，在use中还需添加`css-loader`与`style-loader`

#### 使用代码
```javascript
// entry.js
import './src/less/example.less'
```

#### webpack配置
```javascript
module: {
	rules: [
		// css文件
        {
          test: /\.css$/,
          use: [  'style-loader', 'css-loader' ]
        },
        // less文件
        {
          test: /\.less$/,
          use: [ 'style-loader', 'css-loader', 'less-loader' ]
        }
	]
}
```

## sass-loader

#### 简介
- 把sass解析为css

#### 安装
- 脚本：`npm i node-sass sass-loader -D`
- 备注：node-sass为sass-loader的依赖
- 注意：根据尝试大部分情况下`npm`安装node-sass都`失败`，请使用`cnpm`安装

#### 使用
- 打包`sass`同样需要在模块中`引入`
- sass有`两种`文件格式，我们一般使用`scss`这种`兼容css`语法的格式
- 要让`sass`文件成功打包并`生效`，在use中还需添加`css-loader`与`style-loader`

#### 使用代码
```javascript
// entry.js
import './src/scss/example.scss'
```

#### webpack配置
```javascript
module: {
	rules: [
		{
			test: /\.scss$/,
			use: [ 'style-loader', 'css-loader', 'sass-loader' ]
		}
	]
}
```

## html-loader

#### 简介
- 可以在js中以`字符串`的形式引入`html`模块
- 这个loader可以让我们以模块化的方式组织html模版

#### 安装
- 脚本：`npm i html-loader -D`

#### 使用代码
```javascript
import header from './src/tpl/header.html'
document.querySelector('header').innerHTML = header;
```

#### webpack配置
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

#### 简介
- url-loader
    + 替换文件的引用方式，对于小型文件将以base64编码的形式和文件一起打包，以减少http请求
    + 文件的大小可通过limit选项进行配置，单位字节(byte)，一般配置10240，即10kb大小
    + 计算机中存储的单位：Bit，Byte，KB，MB，GB，TB
- image-webpack-loader
    + 压缩图片

#### 安装
- 脚本：`npm i file-loader url-loader image-webpack-loader -D`
- 备注：file-loader为url-loader的依赖

#### 使用代码
- 注意：如果想要html中的文件引用生效，必须配置html-loader

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

#### webpack配置
```javascript
module: {
	rules: [
		{
			test: /\.(png|jpg|jpeg|gif|bmp|svg)$/,
			use: [
				{loader: 'url-loader', options: {limit: 8192}},  // 小于8kb的文件转为base64
				'image-webpack-loader'
			]
		}
	]
}
```

## babel-loader

#### 简介
- 可把`各种语法`编写的脚本，`解析`为浏览器普遍支持的`es5`规范脚本。
- [官网](http://babeljs.io/)
- [中文网](http://babeljs.cn/)

#### 安装
- 脚本：`npm i babel-loader babel-core babel-plugin-transform-runtime babel-preset-latest -D`
- 说明：`babel-plugin-transform-runtime`提供了es6、7、8新API的es5实现包
- 说明：`babel-preset-latest`提供了es6、7、8新语法解析为es5的功能

#### babel配置
- 使用babel需要在本地创建一个.babelrc配置文件，加入如下配置
```json
{
  "presets": ["latest"],
  "plugins":["transform-runtime"]
}
```

#### webpack配置
```javascript
module: {
	rules: [
		{
			test: /\.js$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader',
			}
		}
	]
}
```

#### 补充JSX语法解析
- 如果使用react开发，需要安装`babel-preset-react`包
- 然后`.babelrc`在中的`presets`项添加一项`react`，webpack就可以解析转换`jsx`语法了

## vue-loader

#### 简介
- 解析打包vue文件

#### 安装
- 脚本：`npm i vue-loader vue-template-compiler -D`
- 备注：vue-template-compiler是vue-loader的依赖

#### webpack配置
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

## clean-webpack-plugin

#### 简介
- 用于清除目录内容
- 我们可以在打包之前使用这个插件尝试清除dist目录下的文件

#### 安装
- 脚本：`npm i clean-webpack-plugin -D`

#### webpack配置
- 在webpack配置文件中`引入`这个插件
- 然后创建一个实例添加到`plugins`配置项中即可

```javascript
var cleanWebpackPlugin = require('clean-webpack-plugin');
plugins: [
  new cleanWebpackPlugin(['dist'])
],
```

## webpack-dev-server

#### 简介
- 这是一个基于webpack`开发工具`，可以`自动`调用webpack`打包`命令，并启动一台文件`服务器`
- 当代码发生`改变`时会自动重新`打包`，并实现浏览器`热更新`
- 如果没有该工具，代码每次修改我们都要手动重新打包，刷新浏览器，比较繁琐

#### 安装
- 全局安装一次：`npm i webpack-dev-server -g`
- 每个项目本地安装：`npm i webpack-dev-server -D`

#### 使用
- 脚本：`webpack-dev-server --contentBase src --open --port 8888`
    + --contentBase 指定托管根目录
    + --open 自动打开浏览器
    + --port 指定服务端口
    + --host 指定ip，默认127.0.0.1(localhost)
- 注意：webpack-dev-server打包后的文件会放在内存当中，打包非常快，不用进行磁盘读写

## 配置命令
- 因为命令通常要加一些参数，写起来较麻烦，可以使用通过配置解决

#### 方式1
- 在package.json项目描述文件中，找到scripts配置项，添加一条脚本配置
```json
"scripts": {
    "dev": "webpack-dev-server --contentBase src --open --port 8888 -d"
}
```
- 然后通过`npm run dev`的方式执行命令启动服务

#### 方式2
- 在本地创建一个配置文件
```
devServer: {
	contentBase: 'src'
	open: true,
	port: 8888
}
```
- 然后通过`webpack-dev-server`的方式执行命令启动服务

## 抽取公共js模块
```javascript
// 需要导入webpack
var webpack = require('webpack');

// 配置多个打包模块
entry: {
  a: path.resolve(__dirname, 'src/js/a.js'),
  b: path.resolve(__dirname, 'src/js/b.js')
},

// 配置公共模块实例
plugins: [
	new webpack.optimize.CommonsChunkPlugin({
	    name:'common.js',     // 抽取的公共模块名称
        chunks:['a','b']             // 从指定的模块中抽取公共部分
	})
}
```

## 压缩混淆js
```javascript
plugins: [
	new webpack.optimize.UglifyJsPlugin()
}
```

## 抽取css

#### 安装
- `npm i extract-text-webpack-plugin -D`

#### webpack配置
```javascript
// 引入插件
var ExtractTextPlugin = require("extract-text-webpack-plugin");

// 修改css、less、sass的loader配置，使用插件来处理
module: {
    rules: [
    	// css文件
    	{
		    test: /\.css$/, use: ExtractTextPlugin.extract({//
		        fallback: "style-loader",
		        use: "css-loader"
		    })
		},
		// less文件
		{
          test: /\.less$/,
          use: ExtractTextPlugin.extract({
               fallback: 'style-loader',
               use: ['css-loader', 'less-loader']
           })
        },
        // sass文件
		{
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
               fallback: 'style-loader',
               use: ['css-loader', 'sass-loader']
           })
        },
    ]
}

// 配置插件
plugins: [
	new ExtractTextPlugin("css/index.css")
}
```

## 压缩css

#### 安装
- `npm i optimize-css-assets-webpack-plugin -D`

```javascript
// 引入插件
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// 配置插件
plugins: [
	new OptimizeCssAssetsPlugin()
}
```

## webpack核心配置说明

#### entry
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

