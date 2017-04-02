# requirejs
> 这是一个用于管理模块间依赖的库。
如果一个项目都使用requirejs定义模块，那么会减少很多全局变量。

## requirejs对外暴露了3个全局变量
- requirejs、require、define
- 其中requirejs与require是同一个函数，该函数有一个config方法，可以对requirejs进行配置
- define是另外一个函数

## require(requirejs)
- 作用：用于加载并执行模块，当所有要加载的模块都加载完毕后，执行一个可选回调，这个回调可以接收其他模块回调的返回值
- 语法：require([非define模块1, define模块2, define模块3, ...], function(undefined, two, three) {})

## define
- 作用：用于定义模块，可以指定该模块的依赖模块，当该模块被加载执行时，会先加载执行所有的依赖，最后执行自己
- 语法：define([非define模块1, define模块2, define模块3, ...], function(undefined, two, three) {})

## 加载模块的注意事项

### 加载未使用define定义的模块
- 加载这种模块并执行后，传递给require回调的值为undefined
- 加载这种模块，最好在require回调上定义一个undefined形参，用于标识传入进来的是undefined

### 加载使用了define定义的模块
- 加载这种模块并执行后，传递给require回调的值为define回调的返回值
- 加载这种模块，一定要在require回调上定义形参或者使用arguments，否则无法访问define回调的返回值

## require.config
- 这是一个用于配置requirejs的方法，主要配置模块的加载地址与模块依赖
```javascript
require.config({

	// 配置所有模块的基础路径，这个基础路径自身相对于引入了requirejs的html文件路径
	baseUrl: 'js/', 
	
	// 配置模块地址的别名，以后在define定义模块依赖或者require的时候，直接使用别名即可
	paths: {
	
		// key是模块的名字，value是模块的地址，该地址是基于baseUrl的
		模块别名1: 模块地址1,
		模块别名2: 模块地址2
	},
	
	// 配置非define定义的模块依赖与输出
	shim: {
	
		// key是模块的名字，value是可配置项
		模块名1: {
		
			// 配置输出到require回调中的值，值为全局变量的名字。
			exports: '模块名1暴露的全局变量名'，
			
			// 配置依赖，值为数组，数组里面书写依赖的模块名字
			deps: ['依赖的模块1'， '依赖的模块2']
		}
	}
});
```

## data-main
- 引入requirejs的script标签，可以通过data-main属性配置一个入口文件，
当requirejs加载完毕后，就会优先去加载这个文件。
