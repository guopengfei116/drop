# RequireJS
requireJS是一个模块化开发类库，该类库只提供了两个功能，加载模块与定义模块

## require
- RequireJS提供了一个require全局方法用来加载模块，模块的.js后缀名不用书写
- require的作用就是通过函数的方式异步加载js，相比传统的script标签同步加载更快

```javascript
require(['src/js/a', 'src/js/b']);
```

## define

#### 问题
- 上面的代码a与b模块的下载与执行是异步的
- 如果b模块依赖a模块，那么可能会有问题

#### 解决
- RequireJS提供了define全局方法用来定义模块
- 使用define定义模块的好处是在js代码中声明模块依赖，有利于项目后期维护
- 同时define定义的模版不会产生任何全局变量

```javascript
define([], function() {
	var a = 10;
	return a;
});
```
```javascript
define(['a'], function(a) {
	var b = 20;
	console.log(a + b);
});
```
```javascript
require(['src/js/a', 'src/js/b']);
```

## data-main
- 在页面中引入requirejs的script标签，可以通过添加data-main属性配置一个入口模块
- requirejs库自身加载完毕后，会在第一时间加载该模块

```
<html lang="en">
<head>
</head>
<body>
	<script src="require.js" data-main="./src/js/main"></script>
</body>
</html>
```

## API小结与补充

#### require
- 作用：加载模块
- 语法：require([模块1, 模块2, 模块3, ...], function() {})
- 备注：第一个参数为加载的模块列表，第二个参数可选，为模块加载完毕后的回调。

#### define
- 作用：定义模块
- 语法：define([模块1, 模块2, 模块3, ...], function() {})
- 备注：第一个参数为模块的依赖列表，第二个参数为模块主体，通常是一个函数，实际上可以是任意数据类型。

#### require方法使用模块输出(即模块对外暴露的东西)

AMD模块
    - 如果模块主体是一个函数，那么函数的返回值即该模块的输出
    - 如果模块主体是其他数据类型，那么输出的就是数据本身

普通模块
    - 需要配置该模块中申明的全局变量，配置什么就输出什么
    - 如果不配置，什么都不输出，require会收到undefined值

## requireJS优点汇总

#### 模块依赖更清晰
- 编写一个大型项目，会产生很多js文件，他们之间可能存在依赖关系
- 如果依赖关系没理清楚，那么会发生各种变量函数未定义的错误
- 普通方式引入
    + 需要我们理清所有js之间的依赖关系，然后使用script按照顺序引入
    + 时间久了之后我们就会忘记这些文件的依赖
    + 而且一个项目如果由多人维护，我们很难理清楚每个js的依赖关系
- RequireJS方式引入
    + 在开发的时候显性的定义每个js模块的依赖，以后随时可以查看
    + 无需理清每个js的依赖与加载顺序，交由RequireJS自动去分析加载

#### 异步加载模块更快

#### 不会产生任何全局变量

## require.config
- 这是一个用于配置requirejs的方法，主要配置模块的加载地址与模块依赖
```javascript
require.config({

	// 配置所有模块的基础路径，这个基础路径自身相对于引入了requirejs的html文件路径
	baseUrl: 'js/',

	// 给模块起名字，以后在define定义模块依赖或者require的时候，直接使用别名即可
	paths: {

		// key是模块的名字，value是模块的地址，该地址是基于baseUrl的
		模块名1: 模块地址1,
		模块名2: 模块地址2
	},

	// 配置普通模块的依赖与输出
	// 值为一个对象，其中key是模块的名字，value是可配置项
	shim: {

		模块名1: {

			// 配置该模块中申明的全局变量，最终变量的值会输出给require。
			exports: 'Bird'，

			// 配置该模块的依赖
			deps: ['模块1'， '模块2']
		},

		模块名2：{}
	}
});
```


## 其他

#### 规范模块的定义
- 一般情况下我们书写的模块都会采用一个自调函数包裹起来，然后暴漏一个全局变量供外界使用。
```javascript
(function(global) {
	var util = {};
	global.util = util;
})(this);
```
- RequireJS提供了独有的API定义与加载模块，采用这种方式定义模块不会存在任何全局变量。
```javascript
define([], function() {
	var util = {};
	return util;
});
```

#### 按需加载
- 可以在需要的时候动态加载js
```javascript
define(['jquery'], function($) {
	$('#btn').on('click', function() {
		require('confirm.js');
	});
});
```

#### 小结
- 其独特的模块定义方式可以在脚本层面申明模块的依赖。
- 其独特的模块定义方式可显著减少全局变量污染。
- 通过js的方式异步加载文件相比script可避免页面堵塞。
- 既可以加载AMD模块，也可以加载普通模块