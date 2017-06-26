# webpack

## 安装
- 先全局安装
    + cnpm i -g webpack
- 再每个项目下本地安装
    + 每个项目包装运行过 npm init 
    + cnpm i webpack --save-dev

## 基本使用

##### 纯命令方式

- 新建一个项目，安装webpack
- 项目添加js文件夹，创建3个js文件
    + main.js
    + a.js
    + b.js
- 在main.js中引入a.js和b.js
```javascript
	// main.js
	require('./a.js');
	require('./b.js');
```
- 项目路径下运行webpack js/main.js js/build.js命令
- 检测js文件夹中是否成功把3个文件打包为1个build.js文件

##### 配置文件方式

- 项目中创建1个名为webpack.config.js的文件
- 编写如下配置
```javascript
var path = require('path');
module.exports = {
	entry: './src/js/main.js',
	output: {
		// 2.0版本这里必须为绝对路径
		path: path.resolve(__dirname, 'dist/js'),
		filename: 'build.js'
	}
};
```

## plugin使用

##### html-webpack-plugin
- 可自动把构建好的js脚本引入到html中

##### 安装
- 插件：cnpm i html-webpack-plugin --save-dev
- 依赖：cnpm i tapable webpack-sources ansi-regex json5 object-assign emojis-list --save-dev

##### 使用
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

##### babel-loader
- 可解析es6、es7等语法编写的js脚本为浏览器识别的es5语法

##### 安装
- loader安装
    + npm install --save-dev babel-loader
- 依赖安装
    + npm install --save-dev babel-core babel-preset-latest babel-preset-es2015

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
					presets: ['es2015']
				}
			},
			exclude: path.resolve(__dirname, 'node_modules')
		}
	]
}
```

## 其他配置

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
- 作用：模块使用
- 值类型：
    + 对象：{}

###### module.loaders
- 作用：loader配置
- 值类型：
    + 数组：[loader_config_1, loader_config_2, ...]
