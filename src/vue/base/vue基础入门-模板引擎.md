# vue基础入门

## 模板引擎

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
