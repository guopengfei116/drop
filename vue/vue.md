# Vue.js

## 基本介绍

#### 简介
- Vue框架，是作者**尤雨溪**在google工作期间所研发并开源的
- 在初期主要了为了解决自身问题，后随着使用者的增多逐渐名气越来越大
- 促使Vue的持续发展，最终成为目前功能完善健壮的web开发框架，并足以支持起大型项目的开发
- 虽然Vue是开源项目，但大部分的工作仍由作者自己完成，工作量不言而喻
- 还好目前Vue得到了不少公司与个人的长期赞助，所以目前作者专职与Vue的开发，保证Vue的可持续发展

#### 特点
- Vue初期借鉴了很多来自AngularJS的语法，有AngularJS基础对于Vue的学习会比较轻松
- 相比其他MVVM框架，轻巧并且更容易上手
- 渐进式增强，可根据自己的需要逐步使用Vue生态圈提供的其他功能

#### 官网与资源
- [官网](https://cn.vuejs.org)
- [github](https://github.com/vuejs/vue)

## 入门

#### Vue中的MVVM
- Vue采用MVVM的设计模式进行代码的组织与编写
- 所以使用Vue开发通常会先在页面中创建一个Vue视图的根节点
- 然后创建一个Data数据对象，用于承载或声明Web应用所需的数据模型
- 最后创建一个Vue实例，该实例用于关联View与Data，处理业务逻辑
    + 创建Vue实例，需要一些配置项，其中el用来关联视图，data用来关联数据

#### 基本写法
```html
<body>
	<!-- 1. 视图编写 -->
    <div id="app">
    	<!-- 这里通过插值表达式语法可直接访问数据值，还可做一些其他运算 -->
  		<p>{{ test }}</p>
    </div>
    <script src="js/vue.js"></script>
    <script>
	    // 2. 数据模型
	    var data = { test: 'Hello World' };
	    // 3. 视图模型
	  	var vm = new Vue({
	  		el: '#app',
	  		data: data
	  	});
    </script>
</body>
```

#### 插值表达式
- 语法：{{ 表达式 }}
- 表达式可以是data中声明的属性，或methods中声明的方法调用，或运算符运算
- 表达式不可以使用if、for、while等语句结构
- 表达式中还可以使用过滤器语法对值进行复杂处理
- 问题：页面可能出现闪烁插值表达式源码的情况，可配合v-cloak指令来解决

## 指令

#### 简介
- 作用：DOM处理，数据渲染
- 特征：指令是带有v-前缀的特殊属性
- 语法：v-指令名称:指令参数.修饰符="表达式"
- 特点：当数据变化时视图根据所用指令做出相应的变化

#### v-text
- 作用：更新元素的innerHtmltextContent
```html
<!-- 这里的content是data数据模型中定义的属性 -->
<span v-text="content"></span>
<!--等同于下面-->
<span>{{ content }}</span>
```

#### v-html
- 作用：更新元素的innerHtml
```html
<!-- 这里的content是data数据模型中定义的属性 -->
<span v-html="content"></span>
```

#### v-cloak
- 作用：在Vue渲染视图前隐藏元素，需要配合css样式才会生效
- 原理：vue在替换视图时会自动去除元素身上的v-cloak属性，好让元素显现出来
```html
<!-- 这里的content是data数据模型中定义的属性 -->
<style>
	[v-cloak] { display: none; }
</style>
<div v-cloak>
	<h2>{{ title }}</h2>
	<article>{{ content }}</article>
</div>
```

#### v-if
- 作用：控制元素的插入与删除
```html
<!-- 这里的exists是data数据模型中定义的属性 -->
<div v-if="exists"></div>
```

#### v-show
- 作用：控制元素的显示隐藏
```html
<!-- 这里的isshow是data数据模型中定义的属性 -->
<div v-if="isshow"></div>
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
- 作用：动态设置属性值
```html
<!-- 利用遍历得到的下标给li标签添加data-index自定义属性 -->
<ul>
	<li v-for="(v, i) in list" v-bind:data-index="i">{{ v }}</li>
</ul>
```
```html
<!-- 批量添加属性 -->
<p v-bind="{ 'data-id': obj.id, 'data-title': obj.title }">{{ obj.content }}</p>
```
```html
<!-- 单属性设置可使用简写形式 -->
<img :src="'http://xxx.com' + img.path"></img>
```
```html
<!-- 可通过.prop修饰符，指明Vue设置属性的方式由setAttribute转为普通方式 -->
<p :text-content="content"></p>
<p :text-content.prop="content"></p>
```

#### v-on
- 作用：添加事件监听
```html
<!-- 添加点击事件 -->
<button v-on:click="handle">按钮</button>
```
```html
<!-- 可调用传参，可传入$event获取事件对象 -->
<button v-on:click="handle(true, $event, 'str')">按钮</button>
```
```html
<!-- 批量事件绑定 -->
<button v-on="{ mousedown: handle1, mouseup: handle2 }">按钮</button>
```
```html
<!-- 单事件绑定可使用简写形式 -->
<button @click="handle">按钮</button>
```
```html
<!-- 可通过.prevent修饰符阻止默认事件，stop阻止事件冒泡，once限制触发次数-->
<a @click.prevent.stop.once="handle">按钮</a>
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
    + 指令与元素绑定时调用，只会调用一次
- inserted
    + 元素被插入到节点时调用，只会调用一次
- update
    + 元素或值更新时调用
- unbind
    + 所在元素卸载时调用，只会调用一次

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
Vue.directive('focus', {
	inserted: function(el, binding, vnode, oldnode) {
		el.focus();
	}
});
```

#### 示例2
```html
<div id="app">
	<p v-hint:strong="keyword" v-html="content"></p>
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

#### 说明
- 作用：项目中经常会对数据进行处理，可以把处理逻辑封装成过滤器使用
- 使用语法：{{ value | filter1 | filter2(arg1, arg2) | ... }}
- 注意：只能在插值表达式中使用
- 分类：全局过滤器与局部过滤器

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

## 组件

#### 简介
- 代码复用是软件开发不可避免的一个话题
- 函数、对象、插件、模块都是复用的表现形式
- 在web前端领域，WebComponents提供了一种新的思路，自定义标签
- 一个自定义标签拥有自己的模版、样式、脚本，并实现一个完成功能
- 这有点类似于浏览器内置的select、radio、checkbox组件
- vue便提供了类似的组件系统

#### 定义

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

#### 说明
- vue在内部的执行流程中，提供了相对应的生命周期函数配置接口
- 如果配置了这些函数，那么它们会在恰当的时机被vue自动调用

#### 生命周期函数
- beforeCreate
    + 刚初始化好实例，还未进行数据观察、事件绑定
    + 可以认为vm部分已准备好
- created
    + 实例已准备好，还未进行模版的编译解析
    + 可以认为vm、m部分已准备好
- beforeMount
    + 模版已编译好，还未插入到页面中
    + 可以认为vm、m、v都已准备好
- mounted
    + 模版已插入页面
    + 可以认为项目跑起来了
- beforeUpdate
    + 修改数据，但视图还没重新渲染
- updated
    + 视图已重新渲染
- beforeDestroy
    + 实例销毁前，什么都没有做
- destroyed
    + 实例销毁后，所有绑定都解除，子实例也被销毁

## 过渡动画

#### 说明
- vue框架本身并没有提供任何样式和动画效果
- vue过渡系统仅仅提供了方便我们加入动画效果的接口
- 具体的动画效果还需要我们自己去写

#### 使用
- 首先使用transition标签把要过渡的元素包起来
- 包起来后vue会检测那些元素设置了trasnsition或者animation样式
- 如果设置了，那么vue会在这个元素显式隐藏的生命周期中对元素进行一些处理
    + 添加对应的生命周期class
    + 提供对应的生命周期函数

#### 生命周期
- 注意：这些样式只在元素显示隐藏的生命周期中有效
- .xx-enter
    + 在元素显示前，设置动画的初始值
- .xx-enter-to
    + 元素显示后，动画运行的最终值
- .xx-leave
    + 在元素隐藏前，设置动画的初始值
- .xx-leave-to
    + 元素隐藏后，动画运行的最终值

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
