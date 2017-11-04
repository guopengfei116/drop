# React-ES6

## 组件定义
- React专门针对ES6语法设计了全新的组件定义方式

#### 注意事项
- 组件名称`首字母`必须`大写`
- 元素的`class`属性要写成`className`
- 事件绑定需要使用`驼峰式`命名，比如`onClick`、onMouseDonw

#### 与ES5的区别
- 默认`props`以`静态成员`的方式定义
- 默认`state`在构造器中以`实例成员`的方式定义
- `事件`处理函数内部的`this`不再是组件实例，如果需要我们自己可以通过`bind`方法改变this

```
// 导包，需要单独导入Component类
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// 定义组件类，然后继承React库提供的Component类即可
class Test extends Component {

	// 构造函数里面负责定义实例的state
	constructor(props) {
		super(props);
		this.state = {
			msg: '总有刁民想害朕'
		};
	}

	render() {
		return (
			<div>
				<h1>报告</h1>
				<p>{ this.state.val }</p>
			</div>
		);
	}
}
```

# 豆瓣电影

## 项目搭建

#### 安装依赖
- ![依赖列表](imgs/项目依赖.png)

#### 根目录结构
![截图](imgs/豆瓣_根目录结构.png)

#### src目录结构
![截图](imgs/豆瓣_src目录结构.png)

#### webpack配置 - webpack.config.js
```javascript
var path = require('path');  // 因为部分配置需要绝对路径，导入path计算

// 引入webpack插件
var webpack = require('webpack');  // 自身有一些优化插件，用到了公共模块抽取查插件，压缩混淆js插件
var htmlPlugin = require('html-webpack-plugin');  // html处理
var cleanPlugin = require('clean-webpack-plugin');  // 删除文件
var extractTextPlugin = require('extract-text-webpack-plugin'); // 抽取公共css
var optimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩css

// 抽取css的loader配置
var cssConfig = extractTextPlugin.extract( {fallback: "style-loader", use: ["css-loader"]} );
var lessConfig = extractTextPlugin.extract( {fallback: "style-loader", use: ["css-loader", "less-loader"]} );
var sassConfig = extractTextPlugin.extract( {fallback: "style-loader", use: ["css-loader", "sass-loader"]} );

// webpack主配置
var config = {

  // 入口模块
  entry: {
    main: path.resolve(__dirname, 'src/main.js'),
    libs: ['react', 'react-dom']
  },

  // 输出路径
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]_[chunkhash:8].js'
  },

  // 模块配置
  module: {
    rules: [
      // css模块
      { test: /\.css$/, use: cssConfig },

      // less模块
      { test: /\.less$/, use: lessConfig },

      // sass模块
      { test: /\.(sass|scss)$/, use: sassConfig },

      // html模块
      { test: /\.(html|tpl)$/, use: [ 'html-loader' ] },

      // url模块
      { test: /\.(jpg|jpeg|png|gif|svg)$/, use: ['url-loader' ] },

      // js模块
      { test: /\.js$/, use: [ 'babel-loader' ], exclude: /node_modules/ }
    ]
  },

  // 插件配置
  plugins: [

    // 清除dist目录
    new cleanPlugin(['dist']),

    // html处理
    new htmlPlugin({
      template: 'src/index.html',
      filename: 'index.html',
      inject: 'body',
      minify: {
        collapseWhitespace:true, // 合并空白字符
        removeComments:true, // 移除注释
        removeAttributeQuotes:true // 移除属性上的引号
      }
    }),

    // js处理 => 公共抽取，压缩混淆
    new webpack.optimize.CommonsChunkPlugin({
      name: 'lib',
      chunks: [ 'main', 'libs' ]
    }),
    new webpack.optimize.UglifyJsPlugin(),

    // css处理 => 样式提取，压缩
    new extractTextPlugin('css/bundle.css'),
    new optimizeCssAssetsPlugin()
  ]

};

module.exports = config;
```

#### babel配置 - .babelrc
```json
{
	"presets": [
		"react",
		[
			"env",
		   {
		        "targets": {
		          "browsers": ["last 3 versions", "ie >= 8"]
		        }
	  		}
         ]
	],
	"plugins": [ "transform-runtime" ]
}
```

## 豆瓣API
- 我们的案例使用的是由豆瓣提供的开放接口，下面列出了所使用的接口url与跨域配置

#### API信息
- ![接口文档](https://developers.douban.com/wiki/?title=api_v2)
- http://api.douban.com/v2/movie/in_theaters       【正在热映】
- http://api.douban.com/v2/movie/coming_soon   【即将上映】
- http://api.douban.com/v2/movie/top250              【top250】

#### 代理配置
- 但是我们案例所使用的域名与豆瓣不一样，所以会遭到浏览器的跨域访问限制
- 这里我们直接使用webpack-dev-server工具提供的代理功能即可解决问题
- 在webpack的配置文件中添加如下配置信息

```javascript
// webpack-dev-server配置
devServer: {
	contentBase: path.resolve(__dirname, 'dist'),
	publicPath: '/',
	historyApiFallback: true,
	open: true,
	// 代理配置，/v2的请求转发到'http://api.douban.com'
	proxy: {
	  '/v2/*': {
	    target: 'https://api.douban.com',
	    secure: false,
	    compress: true,
	    changeOrigin: true
	  }
	}
}
```

#### 测试
- 在main.js中编写如下代码做测试，看看能否成功获取接口数据
- 记得运行`npm run dwev`启动开发环境

```javascript
fetch('/v2/movie/in_theaters')
.then(response => response.json())
.then(data => console.log(data));
```

## 项目雏形

#### index.html
- 页面中需要添加一个占位标签

```html
<body>
  <main id="app"></main>
</body>
```

#### App.js
- 该文件用来编写项目的根组件

```javascript
// 导包
import React, { Component } from 'react';

// 根组件
export default class App extends Component {
  render() {
    return (
      <h1>测试</h1>
    );
  }
}
```

#### main.js
- 该文件作为项目的入口，职责是导入根组件渲染到页面

```javascript
// 导入该模块所需的React库
import React from 'react';
import ReactDOM from 'react-dom';

// 导入根组件
import App from './App.js';

// 渲染到视图
ReactDOM.render(<App />, document.getElementById('app'));
```

#### 测试
- 查看浏览器中如果测试没有问题就可以进行接下来的开发任务了

## 引入 第三方UI框架
- 这里我们使用阿里开发的一款基于React的开源UI框架Ant Design
- ![官网](https://ant.design/index-cn)
- 安装依赖包：`npm i  antd`

#### 按需加载说明
- 这个UI框架提供了很多组件与对应的样式，由于我们只使用其中的一部分
- 所以我们配置一下按需加载，官方也建议我们这样做
- 安装依赖包：`npm i  babel-plugin-import -D`

#### 按需加载配置
- 修改`.babelrc`文件中的`plugins`配置项

```json
{
    "plugins":["transform-runtime", ["import", { "libraryName": "antd", "style": "css" }]]
}
```

#### 使用测试
- 在App.js中引入一个日期组件进行测试

```javascript
import React, { Component } from 'react';

// 导入项目要使用的Antd组件
import { DatePicker } from 'antd';

// 根组件
export default class App extends Component {
  render() {
    return (
      <div>
        <h1>测试</h1>
        <DatePicker />
      </div>
    );
  }
}
```

#### 页面布局
- 在App.js中，使用UI组件库提供的`Layout`组件进行框架主体布局，然后进行调整

## 单页面导航
- 我们的案例是一个单页面应用，所以这里还会使用react路由插件
- ![github](https://github.com/ReactTraining/react-router)
- ![快速开始](https://reacttraining.com/react-router/web/guides/quick-start)
- 依赖安装：`npm install react-router-dom`

#### 导入路由组件
- 在React中一切`皆组件`，所以`路由`的使用方式也是依靠组件实现的
- 在App.js根组件中依照文档引入路由`相关组件`
```javascript
import {HashRouter as Router, Link, Route} from 'react-router-dom';
```

#### Router组件使用
- 使用`Router`组件把根容器组件`Layout`包裹起来
- 注意：Router组件内只能包裹`一个`根元素，不能有其他兄弟元素，否则报错
```javascript
<Router>
	<Layout className="layout" style={{ height: '100%' }}></Layout>
</Router>
```

#### Link组合使用
- 把需要`导航`的地方使用`Link`组件包裹起来
```javascript
<Menu.Item key="1"><Link to="/">首页</Link></Menu.Item>
<Menu.Item key="2"><Link to="/movie">电影</Link></Menu.Item>
<Menu.Item key="3"><Link to="/about">关于</Link></Menu.Item>
```

#### Route组件使用
- 使用Route组件`占位`，并配置`path`与`component`属性，指定路由规则
- 注意：path路由规则默认是进行`模糊匹配`，可通过添加`exact`属性，将其设置为`严格匹配`
```javascript
<Route exact path="/" component={ Home }/>
<Route path="/movie" component={ Movie }/>
<Route path="/about" component={ About }/>
```

#### 页面组件
- 在component目录下创建三个页面级组件，然后在App组件中导入使用

## 电影页面组件

#### 布局
- 左侧的导航我们是从Layout中一个含有左侧导航的例子中提取的代码，然后进行的改造

#### 电影列表子组件
- 首先把项目的src/component目录结构进了调整，给每个页面级组件都单独创建了一个文件夹
    + /components/home
    + /components/about
    + /components/movie
- 然后在/components/movie/sub/list.js中创建了一个电影列表子组件
- 这个子组件需要根据路由参数请求不同的接口，这些路由参数可以从props属性中提取

```javascript
import React, { Component } from 'react';

// 定义电影页面的列表子组件
export default class MovieList extends Component {

  // 因为这个组件是route路由组件负责引入的，它在引入的时候给这个组件传入了3个url相关的参数
  constructor(props) {
    super(props);
    console.log(props.match.params.type);
  }

  render() {
    return (
      <div>电影列表组件</div>
    )
  }

  // 在组件挂载前，先根据url中的type参数，请求一次接口
  componentWillMount() {
    var type = this.props.match.params.type;
    var url = '/v2/movie/';
    if(type == 're') {
      url += 'in_theaters ';
    }else if(type == 'ji') {
      url += 'coming_soon';
    }else if(type == 250) {
      url += 'top250';
    }

    fetch(url)
      .then( resp => resp.json() )
      .then( data => console.log(data) );
  }

  componentWillReceiveProps() {
    console.log('type变化了，要重新请求接口')
  }
}
```