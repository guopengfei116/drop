# Vue相关问题收集

**Vue是什么**

Vue是一套构建用户界面的渐进式框架，采用自底向上增量开发的设计，核心库只关注视图层，非常容易学习，非常容易与其他库或现有项目进行整合，可以根据需要逐步使用更高级的特性。

Vue采用单文件组件和生态系统，可开发复杂的单页应用，Vue的目标是通过尽可能简单的API实现响应的数据绑定和组合的视图组件。

**Vue特征**

1. 模板引擎
2. MVVM模式
3. 组件化
4. 指令系统
5. 虚拟DOM

**Vue特点**

1. 代码简洁：页面由HTML模板+Json数据+Vue实例构成
2. 数据驱动：自动计算属性和追踪依赖的模板表达式，自动更新DOM
3. 组件化：可复用、解耦页面结构
4. 轻量：代码量小，无其他依赖

**如何理解Vue的MVVM模式**

MVVM的含义为Model-View-ViewModel，该说法最早来自AngularJS，采用这种模式的框架，都是编写页面模板，数据模型，以及模板与数据的桥梁。

框架会自动将视图与数据进行绑定，一旦创建绑定，视图和数据将保持同步，每当数据发生变化，视图会跟着变化。

Vue的实例就是ViewModel，它是Vue运转的核心。
DOM Listeners 和 Data Bindings 是实现双向绑定的关键。DOM Listenners 监听页面所有View层DOM元素的变化，当发生变化，Model层的数据随之变化；Data Bindings 监听 Model 层的数据，当数据发生变化，View 层的 DOM 元素随之变化。

**Vue和AngularJS区别**

Vue是轻量级mvvm框架，是一个类似jQuery的工具库，功能相对较少，对项目侵入性比较小；而AngularJS是重量级mvvm框架，功能很多，对项目侵入性比较大；除此之外两者的实现原理也不一样。

Vue的双向数据绑定是基于ES5的getter/setter来实现的，而AngularJS是基于自己实现的一套模板编译规则，进行所谓的脏检查，vue则不需要。因此Vue在性能上更高效，但是只兼容IE9以上的浏览器，AngularJS兼容性更好一些。

Vue使用时需要实例化对象，通过配置的方式组织视图与数据的关系，后续的所有作用范围也都是在这个对象之下。而AngularJS是通过指令来连接视图与数据的关系，并提供了一系列模块化的功能实现业务逻辑。

**Vue和jQuery区别**

Vue的开发思想是数据驱动，通过数据来控制视图的行为，适合数据操作较多的项目。

jQuery的开发思想与最初的前端开发没有任何变化，都是直接操作DOM控制视图行为，只不过jQuery简化了原生API，并提供了很多易用的函数。

**v-show与v-if区别**

v-show和v-if都可以实现元素的显示隐藏效果。但它们的机制不同，v-show使用样式控制元素显示隐藏，v-if则是新建和删除节点，所以建议使用v-show指令，除非一定要删除元素。

**keep-alive指令作用**

它的作用是，把切换出去的组件保留在内存中，这样可以保留它的状态同时避免重新渲染。

```vue
<Component :is="Header" keep-alive></Component>
```

**如何让css只在当前组件起效**

如果采用了Vue单文件组件，那么可以在style标签中添加scoped属性，当Vue编译组件时，会给每个样式和对应的元素添加唯一的data属性，这时样式只对当前组件生效。

```vue
<style scoped></style>
```

**vue-router是什么，提供了哪些组件**

Vue生态系统中用来控制前端路由的插件，一般单页应用会使用到。常用的组件有router-link、router-view。

**如何使用路由进行路由切换**

想要进行页面跳转，就要将页面渲染到根组件，在起始配置，首先注册根组件，然后将根组件挂载到元素上。

```vue
let App = Vue.extend({root});
router.start(App, '#app');
```

**路由嵌套**

路由嵌套会将其他组件渲染到该组件内，这不会造成整个页面的变化与跳转。路由嵌套的配置方式是在VueRouter中使用children属性配置子路由，使用router-view组件作为嵌套组件渲染的占位符。

```vue

```

```vue
<div id="app">
    <!-- 路由匹配到组件会替换这里 -->
    <router-view/>
</div>
```

**active-class是哪个组件的属性**

vue-router模块中router-link组件的属性，用来设置link点击后的效果。

**如何定义动态路由参数，以及如何获取**

在路由配置的path路径上，通过`:params`的形式进行设置，并通过router对象的params进行获取。

```vue
```

```vue
```

**vue-router有哪些导航钩子**

全局导航钩子

```js
// 跳转前进行判断拦截
router.beforeEach((to, from, next) => {})
```

组件内钩子

```js
```

单独路由独享组件

```js
```

**如何在vue.cli中使用scss**

1. 用npm下载对应loader：sass-loader、css-loader、node-sass
2. 在build目录中找到webpack.base.config.js，在extends属性中国添加一个扩展.scss
3. 然后配置一个module属性，新的工具可能不需要，只要安装了scss依赖，就被会自动配置。
4. 在组件的style标签上通过lang属性进行标识

```vue
<style scoped lang="scss"></style>
```

**mint-ui听过没有，用过哪些组件**

这是饿了么团队基于Vue开发的移动端UI组件库。使用方式有两种，可import样式和入口js，然后vue.use(MintUI)全局引入，然后就可以使用里面提供的各种组件；也可以在某个组件当中按需引入：`import { Toast } from 'mint-ui'`。

Toast弹窗组件，mint-header标题组件，mint-swiper轮播图组件等。

**简述v-model**

vue中实现双向数据绑定过的指令，通常应用在表单元素上，实际上也可以应用在拥有value属性的节点上。

**axios是什么**

axios是一个基于promise的http类库，可用在web和nodeJS当中，在web中它封装了XMLHttpRequst对象，在Node中封装了http模块，可发送请求、拦截请求、取消请求，数据转换，支持Promise API。

**vuex是什么**

Vue生态系统中的状态管理库。Vue本身对于状态管理比较弱，在组件关系复杂的情况下数据维护困难，vuex提供了单独的数据仓库，会使复杂关系组件之间的数据共享和传递变得更容易。

**如何创建自定义指令**

全局指令定义通过Vue.directive方法，有两个参数，一个是指令名称，一个是函数；局部指令定义通过实例或组件directives配置项定义，参数相同，作用域不同。

**自定义指令有哪些钩子函数**

bind：绑定事件触发
inserted：节点插入的时候触发
update：组件内相关更新

钩子函数接收的参数有：el、binding

**Vue双向数据绑定原理**

Vue采用数据劫持+发布订阅模式的方式实现数据响应。使用Object.defineProperty方法劫持各个属性的getter、setter操作，在数据变动时发布消息给订阅者，触发相应的监听回调。

具体步骤：

1. 对需要observe的数据进行递归遍历，给对象所有的属性和子属性都加上getter、setter，当给某个属性赋值时，就会触发它的setter方法，这样就监听到了数据变化。

2. complie解析模板指令，将模板中的变量体婚成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，更新视图。

3. Watcher是Observer和Compile之间通信的桥梁，主要做的事情是：1. 在自身实例化时往属性订阅器dep里面添加自己 2. 自身必须有一个update方法 3. 待属性变动 dep.notice() 通知时，能调用自身的 update 方法触发 Compile 中绑定的回调，

4. MVVM 作为数据绑定的入口，整合 Observer、Compile 和 Watcher 三者，通过 Observer 来监听自己的 model 数据变化，通过 Compile 来解析编译模板指令，最终利用 Watcher 搭起 Observer 和 Compile 之间的通信桥梁，达到数据变化 -> 视图更新，视图交互变化(input) -> 数据更新的双向绑定效果。

**对Vue生命周期的理解**

