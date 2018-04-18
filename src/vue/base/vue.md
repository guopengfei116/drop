# Vue.js

## 基本介绍

#### 简介
- Vue框架，是作者**尤雨溪**在google工作期间所研发并开源的
- 在初期主要了为了解决自身问题，后随着使用者的增多逐渐名气越来越大
- 促使Vue的持续发展，最终成为目前功能完善健壮的web开发框架，并足以支持起大型项目的开发
- 虽然Vue是开源项目，但大部分的工作仍由作者自己完成，工作量不言而喻
- 还好目前Vue得到了不少公司与个人的长期赞助，所以目前作者专职与Vue的开发，保证Vue的可持续发展
- 随着Vue的成熟与知名度上升, 目前Vue也有了相对比较稳定的开发团队来负责Vue及Vue生态系统的开发

#### 特点
- Vue初期借鉴了很多来自AngularJS的语法与React组件化思想，有AngularJS基础与React基础对于Vue的学习会比较轻松
- 相比其他MVVM框架，Vue更轻巧并且更容易上手
- 渐进式增强，可根据自己的需要逐步使用Vue生态圈提供的其他功能

#### 官网与资源
- [官网](https://cn.vuejs.org)
- [github](https://github.com/vuejs/vue)

#### 安装与使用
- `npm install vue`

## 入门

#### Vue中的MVVM
- Vue采用MVVM的设计模式进行代码的组织与编写
- 所以使用Vue开发通常会先在页面中创建一个Vue视图的根节点
- 然后创建一个Data数据对象，用于承载或声明Web应用所需的数据模型
- 最后创建一个Vue实例，该实例用于关联View与Data，处理业务逻辑
    + 创建Vue实例，需要一些配置项，其中el用来关联视图，data用来关联数据

#### 基本写法
```html
<script src="js/vue.js"></script>
<body>
	<!-- 1. 视图编写 -->
    <div id="app">
    	<!-- 这里通过插值表达式语法可直接访问数据值，还可做一些其他运算 -->
  		<p>{{ test }}</p>
    </div>
    <script>
	    // 2. 数据模型
	    var data = { test: 'Hello World' };
	    // 3. 关联视图与数据
	  	var vm = new Vue({
	  		el: '#app',
	  		data: data
	  	});
    </script>
</body>
```

#### 插值表达式
- 语法：`{{ 表达式 }}`
- 表达式可以是data中的`数据`，或methods中声明的`方法调用`，或`运算`符运算
- 表达式中还可以使用`过滤器`语法对值进行格式化处理
- 注意: 表达式不可以使用if、for、while等语句结构

## 指令

#### 简介
- 作用：指令就是`特殊`的HTML标签`属性`, 使用这些属性可简化我们的`DOM`操作
- 基本语法：`<div v-名称="数据"></div>`
- 完整语法：`<div v-名称:参数.修饰符="表达式"></div>`
- 特点：Vue指令都是以`v-`为前缀的特殊属性, 大部分指令都会`绑定`一些数据, 然后使用数据`控制`指令的行为

#### v-text
- 作用: 动态渲染元素`文本内容`
- 本质: 动态修改元素的`innerHtml`或`textContent`属性

###### {{}}的问题
- 为了让用户能够`第一`时间看到页面效果, 一般我们会`延缓`js的执行, 因为js执行会阻塞页面渲染
- 最常见的做法是在DOM`下面`引入js, 等待页面渲染结束后再执行
- 但是这么做之后, 如果js加载比较`缓慢`, 页面会出现插值表达式源码`闪烁`的问题

```html
<body>
    <div id="app">
  		<p>{{ test }}</p>
    </div>

    <!-- 在下面引入vue, 然后通过浏览器调试工具模拟3G网络, 就会发现闪烁问题 -->
    <script src="js/vue.js"></script>
    <script>
	    var data = { test: 'Hello World' };
	  	var vm = new Vue({
	  		el: '#app',
	  		data: data
	  	});
    </script>
</body>
```

###### v-text解决
- 如果想解决上诉问题可以考虑使用v-text指令来替代

```html
<div id="app">
	<!-- 这里的content是data数据模型中定义的属性 -->
	<span v-text="content"></span>
	<!--等同于下面-->
	<span>{{ content }}</span>
</div>
```

#### v-html
- 作用: 设置元素的`子元素`
- 本质: 动态修改元素的`innerHTML`属性

###### {{}}与v-text的问题
- 插值表达式与v-text指令会对文本中的html标签进行`转义`后输出

```html
<div id="app">
	<p v-text="content"></p>
	<p>{{ content }}</p>
</div>
<script>
  	var vm = new Vue({
  		el: '#app',
  		data: {
  			content: '<strong>我是一段加粗文本</strong>'
  		}
  	});
</script>
```

###### v-html解决
- 如果不想转义html标签, 可以就`必须`使用v-html了

```html
<div id="app">
	<p v-html="content"></p>
</div>
<script>
  	var vm = new Vue({
  		el: '#app',
  		data: {
  			content: '<strong>我是一段加粗文本</strong>'
  		}
  	});
</script>
```

#### v-cloak
- 作用：想使用{{}}又想解决闪烁, 可以使用该指令, 但是需要配合一段css
- 原理：vue在渲染视图时会自动去除元素身上的v-cloak属性，好让元素显现出来

```html
<!-- 先写一段css样式  -->
<style>
	[v-cloak] { display: none; }
</style>
<!-- 然后在使用了{{}}的父元素上添加v-cloak指令  -->
<div id="app">
	<div v-cloak>
		<h2>{{ title }}</h2>
		<article>{{ content }}</article>
	</div>
</div>
```

#### v-if
- 作用：控制元素的插入与删除

```html
<div id="app">
	<!-- 这里的exists是data数据模型中定义的属性 -->
	<div v-if="exists"></div>
</div>
```

#### v-show
- 作用：控制元素的显示隐藏

```html
<div id="app">
	<!-- 这里的isshow是data数据模型中定义的属性 -->
	<div v-if="isshow"></div>
</div>
```

#### v-for
- 作用：遍历数组或对象，也可指定遍历次数

```html
<!--  遍历数组  -->
<ul>
	<li v-for="v in list">{{ v }}</li>
	<li v-for="(v, i) in list">{{ v }}_{{ i }}</li>
</ul>
```
```html
<!--  遍历对象  -->
<ul>
	<li v-for="v in obj">{{ v }}</li>
	<li v-for="(v, k) in obj">{{ v }}_{{ k }}</li>
	<li v-for="(v, k, i) in obj">{{ v }}_{{ k }}_{{ i }}</li>
</ul>
```
```html
<!--  遍历指定次数，n从1开始，i从0开始  -->
<ul>
	<li v-for="n in 5">{{ n }}</li>
	<li v-for="(n, i) in 5">{{ n }}_{{ i }}</li>
</ul>
```

#### v-bind
- 作用：动态设置标签属性

###### 单个属性设置

```html
<div id="app">
	<!-- 动态设置src -->
	<img v-bind:src="src"></img>
</div>
<script>
  	var vm = new Vue({
  		el: '#app',
  		data: {
  			src: 'http://www.xxx.png'
  		}
  	});
</script>
```

###### 多属性设置
- 给v-bind指令赋值一个对象, 可批量设置元素属性

```html
<div id="app">
	<p v-bind="{ 'data-id': obj.id, 'data-title': obj.title }">{{ obj.msg }}</p>
</div>

<script>
  	var vm = new Vue({
  		el: '#app',
  		data: {
  			id: 10,
  			title: 'teacher',
  			msg: '为人师表'
  		}
  	});
</script>
```

###### 简写形式
- v-bind指令可以使用冒号简写

```html
<div id="app">
	<p :href="href">跳转</p>
</div>

<script>
  	var vm = new Vue({
  		el: '#app',
  		data: {
  			href: 'http://www.baidu.com'
  		}
  	});
</script>
```

###### 设置DOM属性
- 默认情况下v-bind指令是通过`setAttribute`方法来添加标签属性的
- 如果我们想添加`DOM属性`, 可以添加`.prop`修饰符

```html
<div id="app">
	<p :text-content="content"></p>
	<p :text-content.prop="content"></p>
</div>
```

#### v-on
- 作用：事件监听

###### 基本使用范例
- v-on指令专门用来给元素绑定事件, 但是绑定事件需要我们指定两个东西: 事件`类型`与事件`回调`
- 这里我们需要通过指令`参数`来设置事件类型, 指令属性`值`来设置事件回调

```html
<div id="app">
	<!-- 冒号后面的东西就是该指令的参数 -->
	<button v-on:click="clickHandler">点我</button>
</div>

<script>
  	var vm = new Vue({
  		el: '#app',
  		methods: {
  			clickHandler() {
  				console.log('按钮被点击');
  			}
  		}
  	});
</script>
```

###### 参数传递
- 如果你需要传递一些`参数`给事件回调使用, 那么可以像函数调用那样添加一对`小括号`传参

```html
<div id="app">
	<!-- $event代表事件对象 -->
	<button v-on:click="clickHandler($event, 10, 20)">点我</button>
</div>

<script>
  	var vm = new Vue({
  		el: '#app',
  		methods: {
  			clickHandler() {
  				console.log(arguments);  // 打印看看接收到的参数
  			}
  		}
  	});
</script>
```

###### 批量事件绑定
- 如果一个元素需要绑定`多个`事件, 可以通过`对象`的形式批量添加

```html
<div id="app">
	<button v-on="{ mousedown: handle1, mouseup: handle2 }">按钮</button>
</div>
```

###### 修饰符

```html
<!-- 可通过.prevent修饰符阻止默认事件，stop阻止事件冒泡，once限制触发次数-->
<a @click.prevent.stop.once="handle">按钮</a>
```

###### 简写
- 如果是单事件绑定那么可以通过@符号简写

```html
<div id="app">
	<button @click="handler">按钮</button>
</div>
```

#### v-once
- 作用：视图只渲染一次，后续不再变化，有助于优化性能

```html
<footer v-once>{{ about }}</footer>
```

#### v-pre
- 作用：跳过元素的编译，显示原始标签

```html
<span v-pre>{{ span }}</span>
```

#### v-model
- 作用：实现表单与data的双向绑定，view数据变化，model数据跟着变化，反之也一样
- 测试：可在控制台访问实例属性，并尝试修改属性，观察视图的变化

```html
<!-- .trim修饰符作用是去除首尾空格，.number是数据自动转数字 -->
<form @submit.prevent>
	<input v-model.number="user_phone" type="text"></input>
	<input v-model.trim="user_pwd" type="password"></input>
</form>
```

## 自定义指令

#### 说明
- 作用：dom处理逻辑的封装
- 注意：使用时同样需要添加v-前缀
- 分类：全局指令与局部指令

#### 定义
- 全局指令
    + `Vue.directive(name, config)`
    + 任何Vue实例所关联的视图中都可以使用
- 局部指令
    + `new Vue({ directives: { name1: config, name2: config } })`
    + 只能在当前实例所关联的视图中使用

#### 配置项
- bind
    + 元素挂载到视图前执行, 只执行一次
- inserted
    + 元素挂载到视图后执行, 只执行一次
- update
    + 元素指令变化时执行, 可执行多次
- unbind
    + 元素从视图中卸载时执行, 只执行一次

#### 函数参数
- 定义指令时大部分是在bind与update时做操作
- 可以考虑使用简写方式，传递一个函数，在bind与update时调用
- 比如：`Vue.directive(name, fn)`

#### 示例1

```html
<div id="app">
	<input v-focus type="text" />
</div>
```

```javascript
// 全局指令
Vue.directive('focus', {
	// 当表单插入到视图中的时候自动获取焦点
	inserted: function(el, binding, vnode, oldnode) {
		el.focus();
	}
});
```

#### 示例2

```html
<div id="app">
	<p v-html="content" v-hint:strong="keyword"></p>
</div>
```

```javascript
Vue.directive('hint', function(el, binding) {
	// 指令的参数配置标签名，值配置关键字
	let tag = binding.arg || 'i',
		keyword = binding.value;

	// 元素内的文本内容，及关键字匹配正则
	let text = el.textContent,
		reg = new RegExp(keyword, 'g');

	// 关键字加亮
	el.innerHTML = text.replace(reg, function(text) {
		let style = 'red';
		return `<${tag} style="color: ${style}">${text}</${tag}>`;
	});
});
var vm = new Vue({
	el: '#app',
	data: {
		keyword: '我',
		content: '我想让自己放轻松一点，只可惜比我强的人从不这么想...'
	}
});
```

## 过滤器

#### 简介
- 作用：格式化输出模版中的数据, 其本质就是一个函数
- 注意：只能在插值表达式中使用
- 分类：全局过滤器与局部过滤器

#### 使用
- 通过管道符`|`来调用不同的过滤器
- 使用语法：`{{ value | json | uppercase | ... }}`
- 传参语法: `{{ value | date('YYYY-MM-DD') }}`

#### 定义
- 全局过滤器
    + `Vue.filter(name, fn)`
    + 任何Vue实例所关联的视图中都可以使用
- 局部过滤器
    + `new Vue({ filters: { name1: fn, name2: fn } })`
    + 只能在当前实例所关联的视图中使用

#### 基本使用
```html
<span>{{ time | formatDate }}</span>
```
```javascript
// 过滤器回调的第一个值固定为插值表达式中的初始值
Vue.filter('formatDate', function(time) {
	let date = new Date(time);
	return `${ date.getFullYear() }-${ date.getMonth() + 1 }-${ date.getDate() }`;
});
```

#### 使用参数
```html
<span>{{ time | formatDate('YYYY-MM-DD') }}</span>
```
```javascript
// 过滤器回调的第一个值固定为插值表达式中的初始值，后面为用户指定的参数
Vue.filter('formatDate', function(val, format) {

    // 先创建匹配年月日的三个不同正则
    let yReg = /YYYY/i;
    let mReg = /MM/i;
    let dReg = /DD/i;

    // 然后通过val得到相应的年月日
    let date = new Date(val);
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    let d = date.getDate();

    // 最后替换
    return format.replace(yReg, y).replace(mReg, m).replace(dReg, d);
});
```

## watch

#### 说明
- 监听值某个值的变化，然后做出响应
- watch相比beforeUpdate与updated生命周期函数更具有针对性

#### 示例
```javascript
var vm = new Vue({
	el: '#app',
	data: {
		price: 0,
		number: 0,
	},
	computed: {
		// 总价是由单价与数量动态决定的
		total: function() {
			this.total = this.price * this.number;
		}
	},
	watch: {
		// 当总价变化时，发出消息通知
		total: function(newV, oldV) {
			this.$emit('totalchange', newV, oldV);
		}
	}
});
```

## computed

#### 说明
- 如果一个属性的值受其他值的影响，那么可以把这个属性定义为计算属性
- 这里定义的属性不能在data里重复定义

#### 示例
```javascript
var vm = new Vue({
	el: '#app',
	data: {
		price: 0,
		number: 0,
	},
	computed: {
		// 总价是由单价与数量动态决定的
		total: function() {
			this.total = this.price * this.number;
		}
	}
});
```

## 组件

#### 简介
- 在软件开发当中代码`复用`是一个永恒话题, 函数、对象、插件、模块这些都是复用的表现形式
- 在现代web前端领域，组件是一种`新的`复用表现形式
- 组件本实际上就是`自定义标签`, 这个标签有自己专属的模版、样式、脚本与功能
- vue也提供了创建组件的功能, 我们完成可以自己去写一些类似于浏览器内置的select、radio、checkbox或浏览器没有的组件

## 创建组件
- vue提供了两种创建组件的方式

#### 方式一创建公共header组件
- 向自定义指令

```html
<template id="header-tpl">
	<header>
		<h1>{{ title }}</h1>
		<p>{{ msg }}</p>
	</header>
</template>
```

```javascript
Vue.component('app-header', {
	template: "#header-tpl",
	data: function() {
		return {
			title: '北京',
			msg: '这是一个神器的世界, 在这里的每时每刻, 你都会假以为自己上了天堂'
		};
	}
});
```

#### 方式二创建公共footer组件

```html
<template id="footer-tpl">
	<footer>
		<p>{{ msg }}</p>
		<address>{{ address }}</address>
	</footer>
</template>
```

```javascript
let FooterComponent = Vue.extend({
	template: "#header-tpl",
	data: function() {
		return {
			msg: '北京',
			address: '圣茜拉里路08街道28号楼48室'
		};
	}
});

Vue.component('app-footer', FooterComponent);
```

###### 一步到位
- 全局组件：`Vue.component(组件名, 配置)`
- 局部组件：`new Vue({ components: { 组件名1: 配置，组件名2：配置 } })`

###### 标准步骤
- 先获取组件构造函数：`var  com = Vue.extend(配置)`
    + 然后单独注册为全局组件：`Vue.component(组件名, com)`
    + 注册局部组件：`new Vue({ components: { 组件名1: com } })`

###### 注意事项
- template对应的模版必须使用一个根元素包裹起来
- data必须为一个函数，内部返回一个对象
- 在需要切换组件的地方使用一对component标签

## 动态组件

#### 说明
- 作用：根据条件在某个地方动态切换组件，以显示不同的效果
    + 比如Tab栏，点击导航按钮切换不同的组件，显示不一样的效果
    + 比如单页面应用，根据url的变化，切换不同的页面
- 实现：该需求可以通过v-if指令来实现，但是官网提供了更便捷的实现方式
- 语法：`<component :is="组件名称"></component>`

#### 示例
``` html
<div id="app">
	<component v-bind:is="pageName"></component>
	<button @click="pageName='v-login'">登陆</button>
	<button @click="pageName='v-register'">注册</button>
</div>
```
``` javascript
var vm = new Vue({
	el: '#app',
	data: {
		'pageName': 'v-login'
	},
	components: {
		// 登陆组件
		'v-login': {
			template: '<h1>登陆</h1>',
		},
		// 注册组件
		v-register': {
			template: '<h1>注册</h1>',
		}
	}
});
```

## 组件父子数据传递

#### 数据父传子
- 在引入组件的标签上，通过自定义属性绑定来自父的数据
- 在子组件中通过props来配置需要获取标签的那些属性值
- 只要父定义，子配置，那么子就可以使用数据了

#### 数据子传父
- 在需要的时候子通过this.$emit(eventName, data)发送消息与数据
- 父在引入子组件的标签上，通过v-on:eventName="事件回调"，来获取消息与数据
- 只要子发送，父监听，那么父就可以使用来自子的数据

## 生命周期函数
- vue提供了一系列的`生命周期`函数供我们在需要的时候使用
- 这是函数会在恰当的时机被`自动`调用

#### beforeCreate
- 实例被创建, 但`数据`还未进行观察, 实例身上也无法访问数据
- 可以认为MVVM模式中的`VM`已初始化完毕
- 这些函数内的`this`指向`当前`组件

```javascript
Vue.component('app-header', {
	template: '<header>首页</header>',
	data: function() {
        return { title: '首页' };
    },
	beforeCreate() {
	    console.log('beforeCreate');
	    console.log(this);                  // 当前组件实例
	    console.log(this.list);            // undefined
	}
});
```

#### created
- 实例被创建, 数据已经观察, 实例身上也可以访问数据了
- 可以认为MVVM模式中的`M`已初始化完毕
- 该函数使用`频率`比较高, 一般的数据`初始化`操作就写在这里, 比如发送`ajax`请求

```javascript
Vue.component('app-header', {
	template: '<header>首页</header>',
	data: function() {
        return { title: '首页' };
    },
	created() {
	    console.log('created');
	    console.log(this);                  // 实例
	    console.log(this.list);            // 首页
	}
});
```

#### beforeMount
- 模版已编译好，但未插入到页面中
- 可以认为MVVM模式中的`V`已初始化完毕

```javascript
Vue.component('app-header', {
	template: '<header>首页</header>',
	data: function() {
        return { title: '首页' };
    },
	beforeMount() {
	    console.log('beforeMount');
	    console.log(this);                  // 实例
	    console.log(this.$el);            // undefined, 视图未挂载
	}
});
```

#### mounted
- 模版已插入页面, `this.$el`属性被创建
- 项目已经`成功`运行, 从这个函数开始可以进行`DOM`操作了

```javascript
Vue.component('app-header', {
	template: '<header>首页</header>',
	data: function() {
        return { title: '首页' };
    },
	beforeMount() {
	    console.log('mounted');
	    console.log(this);                  // 实例
	    console.log(this.$el);            // header标签, 视图已挂载
	}
});
```

#### beforeUpdate
- 数据被修改, 但`视图`还未重新渲染
- 在这个函数中, 可以根据`数据`变化做进一步修改处理

```javascript
Vue.component('app-header', {
	template: '<header ref="hd" @click="changeTitle">首页</header>',
	data: function() {
        return { title: '首页' };
    },
    methods: {
        changeTitle() {
            this.title = '登陆';
        }
    },
    // 数据变化时才会被调用
	beforeUpdate() {
	    console.log('beforeUpdate');
	    console.log(this);                                 // 实例
	    console.log(this.title);                          // 登陆
	    console.log(this.$refs.hd.innerHTML); // 首页, 因为视图还未更新
	}
});
```

#### updated
- 数据被修改, `视图`也更新完毕
- 在这个函数中, 可以对更新后的视图进行`DOM`操作

```javascript
Vue.component('app-header', {
	template: '<header ref="hd" @click="changeTitle">首页</header>',
	data: function() {
        return { title: '首页' };
    },
    methods: {
        changeTitle() {
            this.title = '登陆';
        }
    },
	updated() {
	    console.log('updated');
	    console.log(this);                                   // 实例
	    console.log(this.title);                            // 登陆
	    console.log(this.$refs.hd.innerHTML);   // 登陆, 视图已更新
	}
});
```

#### beforeDestroy
- 实例销毁前执行

```html
<div id="app">
    <app-header v-if="headerIsShow"></app-header>
</div>
```

```javascript
Vue.component('app-header', {
	template: '<header ref="hd">首页</header>',
	data: function() {
        return { title: '首页' };
    },
	beforeDestroy() {
	    console.log('beforeDestroy');
	    console.log(this);                  // 实例
	    console.log(this.$refs.hd);    // header标签
	}
});

// 使用headerIsShow控制header组件的诞生与销毁
var vm = new Vue({
    el: '#app',
    data: {
        headerIsShow: true
    }
});
```

#### destroyed
- 实例销毁后执行，所有绑定都已解除
- 在这个函数中可以释放一些资源

```html
<div id="app">
    <app-header v-if="headerIsShow"></app-header>
</div>
```

```javascript
Vue.component('app-header', {
	template: '<header ref="hd">首页</header>',
	data: function() {
        return { title: '首页' };
    },
	destroyed() {
	    console.log('destroyed');
	    console.log(this);                  // 实例
	    console.log(this.$refs.hd);    // undefined
	}
});

// 使用headerIsShow控制header组件的诞生与销毁
var vm = new Vue({
    el: '#app',
    data: {
        headerIsShow: true
    }
});
```

## 过渡与动画
- vue在元素`显示隐藏`的过程中, 会触发一些`事件`, 同时还会对`类名`进行修改
- 掌握了这些事件与类名, 我们就可以`很方便`的在元素显示隐藏的过程中加入`动画`效果

#### 使用说明
- vue只提供接口服务, `不提供`具体的动画效果, 动画效果需要我们自己`手动编写`css或js实现
- 为了提高性能, vue需要我们把需要动画效果的`元素`使用内置的`transition`标签包起来

## 过渡动画
- vue在元素显示与隐藏的过程中, 会分别添加三个class供我们实现动画

#### 显示动画

###### class说明
- v-enter
    + 在元素显示前，设置动画的初始值
- v-enter-active
    + 设置显示动画时间与效果
- v-enter-to
    + 元素显示后，动画运行的最终值

###### 使用范例

```css
.v-enter {
	opacity: 0;
}
.v-enter-active {
	transition: all 1s;
}
.v-enter-to {
    opacity: 1;
}
```

```html
<div id="app">
	<transition>
	    <span v-if="isShow">小东东</span>
	</transition>
    <button @click="changeSpan">显示隐藏</button>
</div>
```

#### 隐藏动画

###### class说明
- v-leave
    + 在元素隐藏前，设置动画的初始值
- v-leave-active
    + 设置离开动画时间与效果
- v-leave-to
    + 元素隐藏后，动画运行的最终值

###### 使用范例

```css
v-leave {
    font-size: 30px;
}
.v-leave-active {
    transition: all 1s;
}
.v-leave-to {
    font-size: 10px;
}
```

```html
<div id="app">
	<transition>
	    <span v-if="isShow">小东东</span>
	</transition>
    <button @click="changeSpan">显示隐藏</button>
</div>
```

#### 自定义类名
- 默认情况下, 所有类名都是以`v-`为前缀的
- 如果`不同`元素想要不同的`动画`效果, 就需要自定义类名`前缀`了
- 自定义类名`前缀`很简单, 在`transition`标签身上添加`name`属性即可

```css
// 透明过渡
fade-leave {
    opacity: 1;
}
.fade-leave-active {
    transition: all 1s;
}
.fade-leave-to {
    opacity: 0;
}

// 滑动过渡
.slide-leave {
	margin-left: 0;
}
.slide-leave-active {
    transition: all 1s;
}
.slide-leave-to {
    margin-left: -500px;
}
```

```html
<div id="app">
	<transition name="fade">
	    <span v-if="isShow">慢慢的消逝</span>
	</transition>
	<transition name="slide">
	    <span v-if="isShow">悄悄的我走了</span>
	</transition>
    <button @click="changeSpan">显示隐藏</button>
</div>
```

## 帧动画 - animation
- 除了使用`transtion`实现过渡动画, 我们还可以使用`animation`实现帧动画
- 因为animation帧动画本身可以设置动画初始化与终点值, 所以只需设置`v-leave-active`样式就可以了

#### 范例
```css
.v-leave-active {
    animation: fade-out 2s;
}
@keyframes fade-out {
    0% {
      opacity: 1;
      color: red;
	}
    50% {
      opacity: .3;
      color: yellow;
    }
    100% {
      opacity: 0;
      color: blue;
    }
}
```

```html
<div id="app">
	<transition>
	    <span v-if="isShow">悄悄的我又走了</span>
	</transition>
    <button @click="changeSpan">显示隐藏</button>
</div>
```

## animate动画库
- 这是一个比较有名的使用`animation`实现的帧动画`库`, 里面涵盖了大部分常见的动画效果
- [官网](https://daneden.github.io/animate.css/)

#### 补充
- 因为这是个`css`动画库, 所以使用非常简单, 只需在元素身上添加`类名`即可
- 这个库的很多效果只对`块级元素`生效, 使用时需要注意

#### 范例
```html
<div id="app">
    <p class="animated bounce">我抖</p>
    <p class="animated flipOutX">我颤</p>
    <p class="animated rollOut">我抽</p>
</div>
```

#### 自定义类名&animate动画库
- transtion除了可以通过name属性修改`前缀`外, 还可以通过其他属性修改整个`类名`
- 有了这个功能, 我们就可以在元素显示隐藏时, 使用第三方`动画库`提供的效果了

#### 范例
```html
<div id="app">
	<!-- 在元素显示隐藏时使用animate动画库提供的类实现动画 -->
	<transition enter-active-class="animated bounce" leave-active-class="animated rollOut">
	    <p v-if="isShow">来回穿梭</p>
	</transition>
    <button @click="changeSpan">显示隐藏</button>
</div>
```

#### 自定义类名配置项
- enter-class
    + 动画的`第一帧`被添加, 用于设置默认值
- enter-active-class
    + 动画的`第二帧`被添加, 用于设置动画时间与缓动效果
- enter-to-class
    + 动画的`第二帧`被添加, 用于设置动画结束值
- leave-class
    + 动画的`第一帧`被添加, 用于设置默认值
- leave-active-class
    + 动画的`第二帧`被添加, 用于设置动画时间与缓动效果
- leave-to-class
    + 动画的`第二帧`被添加, 用于设置动画结束值

## 钩子函数动画
- 除了通过`css`添加动画外, vue还提供了一些钩子`函数`让我们用`js`实现动画

#### 显示范例

```html
<div id="app">
	<!-- 监听元素显示时的事件 -->
	<transition v-on:before-enter="bEnter" v-on:enter="enter" v-on:after-enter="aEnter">
	    <p v-if="isShow">来回穿梭</p>
	</transition>
    <button @click="changeSpan">显示隐藏</button>
</div>
```

```javascript
var vm = new Vue({
    el: '#app',
    data: {
        isShow: true,
        left: 0
    },
    methods: {
        change: function() {
            this.isShow = !this.isShow;
        }
    }
});
```

#### 隐藏范例

```html
<div id="app">
	<!-- 监听元素隐藏时的事件 -->
	<transition v-on:before-leave="bLeave" v-on:leave="leave" v-on:after-leave="aLeave">
	    <p v-if="isShow">来回穿梭</p>
	</transition>
    <button @click="changeSpan">显示隐藏</button>
</div>
```

```javascript
var vm = new Vue({
    el: '#app',
    data: {
        isShow: true,
        left: 0
    },
    methods: {
        change: function() {
            this.isShow = !this.isShow;
        },

        // 设置元素的初始样式
        bLeave(el) {
            el.style.marginLeft = 0;
        },

        // 编写动画过程
        // 注意1: 必须在动画结束时, 手动调用done方法, 不然元素就不会消失
        // 注意2: 为保证样式修改会实时映射到页面, 最好把计算所需的数据定义在data里, 因为data数据修改视图会强制更新
        leave(el, done) {
            var timer = setInterval(() => {
                this.left += 10;
                if(this.left >= 200) {
                    clearInterval(timer);
                    done();
                }else {
                	el.style.marginLeft = `${this.left}px`;
                }
            }, 300);
        },

        // 动画结束时, 可以在这里重置数据或样式
        aLeave(el) {
        	this.left = 0;
        }
    }
});
```

#### 事件列表
- before-enter
    + 动画执行`前`, 用于设置默认值
- enter
    + 动画执行`中`, 用于编写动画过程
- after-enter
    + 动画结束`后`, 用户重置样式
- before-leave
    + 动画执行`前`, 用于设置默认值
- leave
    + 动画执行`中`, 用于编写动画过程
- after-leave
    + 动画结束`后`, 用户重置样式

# 商品管理综合案例

## 接口

#### 获取商品列表
- 地址：http://vue.studyit.io/api/getprodlist
- 请求方式：GET
- 请求参数：无
- 返回数据格式
```json
{
	// 0代表正常，其他则异常
	status: 0,
	// 商品列表
	message: [
		{
			id: 1,
			name: '奔驰',
			ctime: '2017-08-26T08:37:18.000Z'
		},
		{
			id: 2,
			name: '宝马',
			ctime: '2017-08-25T06:32:14.000Z'
		},
		...
	]
}
```

#### 删除商品
- 地址：http://vue.studyit.io/api/delproduct/:id
- 请求方式：GET
- 请求参数：id
- 返回数据格式
```json
{
	// 0代表正常，其他则异常
	status: 0,
	// 删除结果
	message: "删除品牌数据ok"
}
```

#### 添加商品
- 地址：http://vue.studyit.io/api/addproduct
- 请求方式：POST
- 请求参数：name
- 参数格式 : FormData
- 返回数据格式
```json
{
	// 0代表正常，其他则异常
	status: 0,
	// 添加结果
	message: "添加成功"
}
```

## vue-cli

#### 说明
- Vue官网提供的脚手架生成器，可帮我们自动搭建开发环境
- vue-cli中提供了5种不同的脚手架供我们选择

#### 脚手架分类
- webpack
    + 基于webpack的开发环境，集成了代码检查、测试、热部署等功能
- webpack-simple
    + 基于webpack的简单版开发环境
- browerify
    + 基于browerify的开发环境，集成了代码检查、测试、热部署等功能
- browerify-simple
    + 基于browerify的简单版开发环境
- simple
    + 只提供解析.vue文件的普通开发环境

#### 工具安装
- 全局安装：`npm install -g vue-cli`
- 测试：`vue --version`

#### webpack脚手架使用
- 生成脚手架
    + `vue init webpack ${ 项目名称 }`
- 安装项目依赖
    + `cd ${ 项目名称 }`
    + `npm install`
- 启动开发模式
    + npm run dev
- 代码编译
    + npm run build

#### 项目结构说明
- build
    + webpack相关配置与脚本
- config
    + 配置文件，主要用于区分开发环境、测试环境、线上环境
- src
    + 项目源码及引用的资源
- static
    + 不需要webpack处理的静态资源
- test
    + 测试脚本
