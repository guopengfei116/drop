# webpack

## 安装
- 先全局安装
    + cnpm i -g webpack
- 再每个项目下本地安装
    + 每个项目包装运行过 npm init 
    + cnpm i webpack --save-dev

## 入门使用

#### 基本使用
- 项目中创建一个js文件夹
- 编写一个main.js文件
- 然后项目路径下运行webpack js/main.js js/build.js
- 检测js文件夹中是否生成了build.js文件

#### 合并js文件
- 在js文件夹中创建a.js, b.js, main.js
- 然后在main.js中通过require方法引入a.js和b.js
    + require传入的路径，需要使用./来指定相对与main.js所在的路径
    ```javascript
    	require('./a.js');
    	require('./b.js');
    ```
- 接下来在项目路径下运行webpack js/main.js js/build.js
- 检测生成的build.js是否涵盖了三个js文件的内容

## 载入css文件

#### 插件安装
- 项目路径下运行cnpm i css-loader style-loader --save-dev
- css-loader用来加载css文件
    + 自动生成的模块最终输出一个数组，里面存储着每一个css文件模块的内容
- style-loader用来马上执行css文件
    + 内部调用css-loader生成的模块，得到css文件内容
    + 然后按照指定规则插入到页面中让其生效

#### 使用
- 在main.js中通过require方法引入css文件
    + 在引入的文件路径前需要写上处理该文件所需的loader
    + 注意这里loader编写的顺序，不能打乱
    ```javascript
    	require('style-loader!css-loader!../css/index.css');
    ```
- 然后运行之前的构建命令
- 检测build.js文件中是否引入了css文件内容

## 配置文件

#### 基本使用
- 项目下创建webpack.config.js文件
- 编写配置
    + 2.0版本output里的path必须为绝对路径

```javascript
var path = require('path');
module.exports = {
	entry: './src/js/main.js',
	output: {
		path: path.resolve('./dist/js'),
		filename: 'build.js'
	}
};
```

#### 参数解释

###### entry
- 作用：入口文件配置
- 值类型：
    + 字符串值： 配置单个入口文件
    + 数组：配置多个文件，最终多个文件合并为1个入口文件
    + 对象：配置多个页面的不同入口文件，每个入口文件都会生成1个js

###### output
- 作用：输出配置
- 值类型：
    + 对象：配置各种参数

###### output.path
- 作用：配置所有类型文件的输出目录
- 值类型：
    + 字符串：必须为绝对路径

###### output.publicPath
- 作用：静态文件前缀
- 值类型：
    + 字符串：上线后静态文件所在的服务器域名

###### output.filename
- 作用：配置输出文件的文件名
- 值类型：
    + 字符串：文件名
	+ 可以使用占位符动态构成文件名
	    * name：entry里对不同入口文件起的名字，即配置对象时的key
	    * hash：构建后生成的hash值
	    * chunkhash：构建后合并文件的hash值，使用频率较高

```javascript
output: {
	path: path.resolve('./dist'),
	filename: 'js/[name]_build.js'
}
output: {
	path: path.resolve('./dist'),
	filename: 'js/[name]_[hash]_build.js'
}
output: {
	path: path.resolve('./dist'),
	filename: 'js/[name]_[hash]_[chunkhash]_build.js'
}
filename: 'build.js'
```

#### plugins
- 作用：插件配置
- 值类型：
    + 数组：每个插件的配置

## 插件

#### html插件

###### 安装
- 插件：cnpm i html-webpack-plugin --save-dev
- 依赖：cnpm i tapable webpack-sources ansi-regex json5 object-assign emojis-list --save-dev
    + tapable 
    + webpack-sources 
    + ansi-regex 
    + json5 
    + object-assign
    + emojis-list

###### 配置
- template
    + 被构建的html文件
    + 路径是相对于运行环境的相对路径
- filename
    + 构建后文件的名称，默认为原文件名词
    + 同样可以使用name、hash、chunkhash3种占位符
- inject
    + 作用：设置构建后的脚本注入页面的位置
    + 可选值：head、body、false
    + 默认值：body
- minify
    + 作用：压缩html文件
    + 值类型：对象
    + 配置项：
        * removeComments: 删除注释
        * f
- hash
    + 作用：
    + 默认值：false
- compile
    + 作用：
    + 默认值：true
- favicon
    + 作用：
    + 默认值：false
- cache
    + 作用：是否使用缓存
    + 默认值：true
- showErrors
    + 作用：如果构建出错是否在页面中打印错误信息
    + 默认值：true
- chunks
    + 作用：
    + 默认值：all
- excludeChunks
    + 作用：
    + 默认值：''
- xhtml
    + 作用：
    + 默认值：false

- 配置范例
```javascript
	new htmlWebpackPlugin({
		template: 'src/index.html',
		filename: 'index_[chunkhash].html',
		inject: 'head'
	});
```

###### 传递模版数据
- 传递数据
    + 插件会自动向html文件传递htmlWebpackPlugin对象
    + 该对象中有两个属性files与options
    + files：可引入的文件与信息
        * publicPath：基础路径
        * chunks：构建后的文件具体信息
        *  js：页面引入的所有js文件
        * css：页面引入的所有css文件
        * manifest：其他文件
    + options：所有配置与自定义属性

- 使用数据
    + 作用：传递数据到html文件
    + 使用：页面中使用ejs模版语法

- 使用范例
```html
	<html>
		<head>
			<title><%= htmlWebpackPlugin.options.title %></title>
		</head>
		<body>
			<p><%= htmlWebpackPlugin.options.data %></p>
		</body>
	</html>
```
```javascript
	new htmlWebpackPlugin({
		template: 'src/index.html',
		filename: 'index_[chunkhash].html',
		inject: 'head',
		title: '自定义titlle',
		data: '自定义数据'
	});
```
