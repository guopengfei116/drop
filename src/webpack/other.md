# plugin

## html-webpack-plugin

#### 安装
- 插件：cnpm i html-webpack-plugin --save-dev

#### 基本使用
```javascript
plugins: [
	new htmlWebpackPlugin({
		template: 'src/index.html',
		filename: 'index_[chunkhash].html',
		inject: 'body'
	}),
],
```

#### 模版数据使用
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
    + 在html文件中可通过ejs模版语法获取及操作传递进来的数据

- 使用范例
```html
<html>
	<head>
		<%= 获取自定义的属性值 %>
		<title><%= htmlWebpackPlugin.options.title %></title>
		<%= 获取构建后入口文件的路径 %>
		<title><%= htmlWebpackPlugin.files.chunks.abc.entry %></title>
	</head>
	<body>
		<%= 获取自定义的属性值 %>
		<p><%= htmlWebpackPlugin.options.data %></p>
	</body>
</html>
```
```javascript
module.exports = {
	entry: {
		main: './src/js/main.js',
		abc: './src/js/abc.js'
	},
	output: {
		path: path.resolve('./dist/js'),
		filename: 'build.js'
	},
	plugins: [
		new htmlWebpackPlugin({
			template: 'src/index.html',
			filename: 'index_[chunkhash].html',
			inject: 'head',
			title: '自定义titlle',
			data: '自定义数据'
		});
	]
};
```

#### 其他配置
- template
    + 被构建的html文件
    + 路径是相对于运行环境的相对路径
- filename
    + 构建后文件的名称，默认为原文件名词
    + 同样可以使用name、hash、chunkhash3种占位符
- inject
    + 作用：设置构建后的脚本自动注入页面的位置，如果要自定义配置给false即可
    + 可选值：head、body、false
    + 默认值：body
- minify
    + 作用：压缩html文件
    + 值类型：对象
    + 配置项：
        * removeComments: true || false 删除注释
        * collapseWhitespace: true || false 删除空格
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
    + 作用：配置页面中可以获取到的chunk
    + 值类型：数组
        * 例如：['main', 'main2']
    + 默认值：all
- excludeChunks
    + 作用：排除页面中可获取的chunk
    + 值类型：数组
        * 例如：['main', 'main2']
    + 默认值：null
- xhtml
    + 作用：
    + 默认值：false

# loader

## postcss-loader

#### 说明
- postcss-loader
    + 可以借助插件对css文件进行各种后续处理
- autoprefixer
    + 自动给css3样式添加浏览器前缀

##### 安装
- 脚本：npm i postcss-loader autoprefixer -D
- 备注：除了autoprefixer外，也可以安装其他包处理css

##### 使用
```javascript
rules: [
	{
		test: /\.css$/,
		use: [
			'style-loader',
			'css-loader',
			{loader: 'postcss-loader', options: {
				plugins: function() {
					return [
						require('autoprefixer')()
					];
				}
			}}
		]
	},
	{
		test: /\.less$/,
		use: [
			'style-loader',
			{loader: 'css-loader', options: {importLoaders: 1}},
			{loader: 'postcss-loader', options: {
				plugins: function() {
					return [
						require('autoprefixer')()
					];
				}
			}},
			'less-loader'
		]
	}
]
```

## ejs-loader

#### 说明
- 把ejs模板文件转为函数引入，再需要时调用传入数据即可得到渲染好的模板字符串

##### 安装
- npm i ejs-loader -D

##### 使用
```javascript
// entry.js
import example from './src/tpl/example.tpl'
document.querySelector('body').appendChild(example({name: 'yourself'}));
```
```javascript
rules: [
	{
		test: /\.tpl$/,
		use: 'ejs-loader'
	}
]
```
