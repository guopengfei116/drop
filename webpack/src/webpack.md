## 使用配置文件
- 上面使用`命令行`的打包方式比较繁琐,  每次都要`手动输入`很多内容, 而且不能复用
- webpack提供了`配置文件`的方式来描述整个打包过程, 这样我们`写一次`配置以后就方便了, `一劳永逸`
- 同时配置文件也可以让团队不同`成员共享`, 不同开发者不同平台以`相同`的方式进行打包

#### 目录结构说明
- 使用了打包系统后，通常我们会把`源代码`与`打包后`的代码放置到`src`与`dist`两个不同的目录分离存储
- 这样做即不会破坏我们原有的代码与结构，也不会引起混乱

#### 使用说明
- 首先在项目中创建一个`webpack.config.js`配置文件
- 该配置文件使用`node`的方式编写代码, 要求必须向外`导出`一个配置对象, 供webpack工具调用
- 有了配置文件, 之后的打包操作, 只需运行一条`webpack`命令即可

#### 配置

```javascript
// 导入内置的path模块, 因为有些路径配置必须为绝对路径, 我们要通过该模块的方法进行动态计算
const path = require('path');

// 导出配置项
module.exports = {

	// 配置入口模块, webpack会从这个模块开始分析项目的所有依赖, 然后进行打包
	entry: path.resolve(__dirname, 'src/main.js'),

	// 配置打包后文件的输出目录与文件夹
	output: {
		path: path.resolve(__dirname, 'dist'),     // 这里必须为绝对路径，否则报错
		filename: 'js/bundle_[chunkhash:8].js'   // [chunkhash:8]的作用是给文件添加唯一的标识符，预防浏览器缓存
	}
};
```

## 命令小结

#### 未使用配置文件
- 打包命令：`webpack src/main.js dist/bundle.js`
- 解释：以`main.js`为入口进行打包，打包后的文件放置到`dist`目录，起名为`bundle.js`

#### 使用配置文件
- 打包命令: `webpack`
- 解释: webpack会自动读取本地`webpack.config.js`配置的规则进行打包
- 备注：如有必要还可以通过`webpack --config filename`自定义配置文件

#### 开发模式
- 打包命令: `webpack -d`
- 解释: 因为打包后的代码不便于`调试`, 所以webpack提供了开发模式打包
- 使用后会依据打包后代码生成`sourceMap`用于浏览器调试

#### dev-server开发工具
- 启动命令: `webpack-dev-server`
- 解释: 工具首先会自动调用webpack打包应用到内存, 然后在本地部署一台服务器用于测试预览
- 该工具还会监听源代码的变化, 然后再次自动打包, 自动部署, 还会自动更新浏览器


# plugin使用
- 在项目构建时, 我们可能会有打包之外的其他需求, 那么`plugin`可以帮我们来完成

## 准备工作

#### package.json
- 要使用插件, 首先就得`安装`他们, 一般我们会把项目的依赖`记录`在该文件中
- 所以, 在使用插件之前, 我们先`创建`package.json这个文件: `npm init -y`

#### webpack
- 插件在运行时依赖与webpack, 我们要在项目本地安装它
- 本地安装命令: `npm i webpack -D`, 这里-D参数是--save-dev的简写


## html-webpack-plugin

#### 简介
- 这是webpack一款用于处理html的插件

#### 安装
- `npm i html-webpack-plugin -D`

#### 使用
- 这里我们用它`自动`把打包后的js脚本`注入`到指定的html文件中
- 这样我们就不用`手动`编写script标签`引入`打包后的文件了

#### 配置
- 在webpack.config.js文件中
- 首先`导入`html-webpack-plugin插件
- 然后`创建实例`配置到`plugins`配置项中

```javascript
const HtmlWP = require('html-webpack-plugin');

module.exports = {
	// 插件配置
	plugins: [
		new HtmlWP({
			template: 'src/index.html',         // 源代码文件名
			filename: 'index.html',               // 处理后的文件名
			inject: 'body',                             // 脚本自动插入的位置
			minify:{ // 压缩优化HTML页面
		        collapseWhitespace:true,      // 合并空白字符
		        removeComments:true,         // 移除注释
		        removeAttributeQuotes:true // 移除属性上的引号
		    }
		})
	]
};
```


## clean-webpack-plugin

#### 简介
- 用于清除目录垃圾文件

#### 安装
- 脚本：`npm i clean-webpack-plugin -D`

#### 使用
- 这里我们用它在打包`之前`先清除掉dist目录, 防止多次打包`后`生成过多的垃圾文件

#### webpack配置
- 在webpack.config.js文件中
- 首先`导入`clean-webpack-plugin插件
- 然后`创建实例`配置到`plugins`配置项中

```javascript
const CleanWP = require('clean-webpack-plugin');

module.exports = {
	// 插件配置
	plugins: [
	  new CleanWP(['dist'])  // 每次打包前先清除dist目录
	]
};
```

## webpack-dev-server

#### 简介
- 这是一个基于webpack的`开发工具`，它会`自动`调用webpack进行`打包`操作，并启动一台文件`服务器`用于`测试`打包结果
- 使用该工具的好处是: `源代码`发生变动, 会自动打包, 自动更新浏览器, 同时打包文件只存储在`内存`, 比磁盘速度要快

#### 安装
- 全局安装一次：`npm i webpack-dev-server -g`
- 每个项目本地安装：`npm i webpack-dev-server -D`

#### 启动
- 脚本：`webpack-dev-server --contentBase src --open --port 8888`
    + --contentBase 指定托管根目录
    + --open 自动打开浏览器
    + --port 指定服务端口
    + --host 指定ip，默认127.0.0.1(localhost)
- webpack-dev-server打包后的文件直接存储在内存中, 不会进行磁盘读写, 所以非常快

#### 使用配置文件启动
- 如果觉得运行`命令`较长, `参数`较多, `写`起来较麻烦, 也不便于`记忆`, 那么可以记录在`配置文件`中

###### 方式1
- 找到在`package.json`描述文件, 找到`scripts`配置项, 把启动命令配置进去, 并给命令起个名字
- 然后运行`npm run 名称`执行相关命令

```json
"scripts": {
    "dev": "webpack-dev-server --contentBase src --open --port 8888 -d"
}
```

###### 方式2
- 在`webpack-config.js`配置文件中添加配置, 然后运行命令: `webpack-dev-server`

```javascript
module.exports = {
    devServer: {
        contentBase: 'src'
        open: true,
        port: 8888
    }
}
```

# loader使用
- 默认情况下, webpack只能打包`js`模块
- 但是它还提供了强大的`loader`功能, 借助该功能可以把诸如`css/img`等文件也一起打包

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

#### webpack配置
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


## url-loader

#### 简介
- 替换文件的引用, 对于`小型`文件将以`base64`编码的形式和文件一起`打包`，以减少http请求

#### 安装
- 脚本：`npm i file-loader url-loader image-webpack-loader -D`
- 备注：`file-loader`为url-loader的`依赖`

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
				// 计算机中存储的单位：Bit，Byte，KB，MB，GB，TB
				// 这里limit选项需要配置的单位是字节(byte)，一般配置8到10KB
				{
					loader: 'url-loader',
					options: {limit: 8192, name: '[name]_[hash:8].[ext]'} // 小于8kb的文件转为base64, 文件名称使用6位hash
				}
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
- 命令：`npm i babel-loader babel-core babel-plugin-transform-runtime babel-preset-env -D`
- `babel-plugin-transform-runtime` 提供公共的编译函数, 可减少打包后重复性的代码
- `babel-preset-env` 提供了转换最新ES语法的功能

#### babel配置
- 使用babel需要在本地创建一个`.babelrc`配置文件，加入如下配置

```json
{
  "presets": ["env"],
  "plugins":["transform-runtime"]
}
```

#### webpack配置

```javascript
module: {
	rules: [
		{
			test: /\.js$/,
			use: [ 'babel-loader' ],
			exclude: path.resolve(__dirname, './node_modules')  // 注意绝对路径
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
- 备注：`vue-template-compiler`是vue-loader的依赖

#### webpack配置
```javascript
module: {
	rules: [
		{
			test: /\.vue$/,
			use: [ 'vue-loader' ]
		}
	]
}
```

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
		    test: /\.css$/,
		    use: ExtractTextPlugin.extract({//
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
