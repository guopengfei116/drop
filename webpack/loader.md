# loader

## babel-loader

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

##### 配置
- presets
    + es2015

## css-loader、style-loader

#### 说明
- css-loader
    + 加载css文件内容到js中
    + 自动生成的模块最终输出一个数组，里面存储着每一个css文件模块的内容
- style-loader
    + 让加载到js中的css在页面中生效
    + 内部调用css-loader生成的模块，得到css文件内容，然后通过style标签插入到页面中让其生效

#### 安装
- loader安装
    + npm install --save-dev css-loader style-loader

#### 使用
```javascript
// entry.js
import './src/css/example.css'
```
```javascript
rules: [
	{
		test: /\.css$/,
		use: [
			'style-loader',
			'css-loader'
		],
		exclude: /(node_modules)|(bower_components)/
	}
]
```

#### 非配置方式使用
```javascript
// entry.js
require('style-loader!css-loader!./src/css/example.css');
```

## postcss-loader

#### 说明
- postcss-loader
    + 可以借助插件对css文件进行各种后续处理
- autoprefixer
    + 自动给css3样式添加浏览器前缀

#### 安装
- loader安装
    + npm install --save-dev postcss-loader
- 插件安装
    + npm install --save-dev autoprefixer

#### 使用
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
	}
]
```

## less-loader

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
import './src/sass/example.sass'
```
```javascript
rules: [
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

## sass-loader

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
import './src/less/example.less'
```
```javascript
rules: [
	{
		test: /\.sass$/,
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
			'sass-loader'
		]
	}
]
```

## html-loader

#### 说明
- 把html文件内容以字符串的形式引入

#### 安装
- loader安装
    + npm install --save-dev html-loader

#### 使用
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

## ejs-loader

#### 说明
- 把ejs模板文件转为函数引入，再需要时调用传入数据即可得到渲染好的模板字符串

#### 安装
- loader安装
    + npm install --save-dev ejs-loader

#### 使用
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

## url-loader、image-webpack-loader

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
