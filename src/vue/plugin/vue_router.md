## vue-router

#### 作用
- 专为vue开发SPA单页应用时所提供的插件
- 能够让我们可以使用前端路由控制组件的渲染

#### 基本原理
- 普通的页面跳转都是由后端来控制的
- 我们可以修改浏览器地址栏的url，或者修改location.href值，向服务器发送请求切换页面
- 如果我们仅仅修改url中的hash值，浏览器是不会向页面发出请求的
- vue-router的运作原理就是利用hash的变化实现组件的动态切换，达到切换页面效果的目的
- vue-router内部使用了hash与H5两种方式

## 基本使用
```html
<div id="app">
    <header></header>
    <!-- 占位标签，路由变化时会动态切换组件，作用类似与component标签 -->
    <router-view></router-view>
    <footer></footer>
</div>
```
```javascript
// 全局登陆组件
let LoginComponent = {
    template: '<h4>登陆</h4>'
};
// 全局注册组件
let RegisterComponent = {
    template: '<h4>注册</h4>'
});
// 实例
var vm = new Vue({
    el: '#app',
    // 路由配置
    router: new VueRouter({
        routes: [
            { path: '/login', component: LoginComponent },
            { path: '/register', component: RegisterComponent }
        ]
    })
});
```

## 路由实例与路由对象

#### 说明
- 配置了路由之后，在vue实例与组件身上会被注入两个对象$router与$route
- $router为new VueRouter()得到的实例，里面记录了路由配置信息，并提供了一些方法供我们调用
- $route为页面hash值解析后的一个对象，有点类似于node中`url.parser(req.url)`的返回结果

#### $route常用属性
- 注意：下面的属性都是对页面location.hash值进行的解析提取，不是location.href
- fullPath：完整路径，包含query与hash
- path：纯路径
- query：查询字符串解析后得到的对象
- params：路径参数解析后得到的对象
- name：当前路由配置的name属性

#### 使用路由参数
```javascript
// 全局详情组件
var comDetails = Vue.extend({
    template: '<article>详情</article>',
    created: function() {
        let id = this.$route.params.id;
        console.log(this.$route, id);
    }
});
// 实例
var vm = new Vue({
    el: '#app',
    // 路由配置
    router: new VueRouter({
        routes: [
            { path: '/details/:id', component: 'v-details' }
        ]
    })
});
```

## 跳转页面

#### 标签跳转
- 如果要通过点击页面元素实现页面跳转可以使用router-link标签
- router-link标签最终会被替换为普通的a标签，但router-link标签使用更灵活
- 写法1：`<router-link to="/login?keyword=1122">演示</router-link>`
- 写法2：`<router-link :to="{ path: '/login', query: { keyword: 1122 } }">演示</router-link>`
- 写法3：`<router-link :to="{ name: 'go', query: { keyword: 1122 } }">演示</router-link>`

#### 示例
```html
<div id="app">
    <header>
        <router-link to="/login?a=1">登陆-路径</router-link>
        <router-link :to="{ name: 'go', query: {b: 2} }">登陆-别名</router-link>
    </header>
    <!-- 占位标签，路由变化时会动态切换组件，作用类似与component标签 -->
    <router-view></router-view>
    <footer></footer>
</div>
```
```javascript
// 全局登陆组件
Vue.component('v-login', {
    template: '<h4>登陆</h4>'
});
// 实例
var vm = new Vue({
    el: '#app',
    // 路由配置
    router: new VueRouter({
        routes: [
            { name: 'go', path: '/login', component: 'v-login' }
        ]
    })
});
```

#### js跳转
- 如果向通过js来实现页面跳转可以使用$router.push方法
- 写法1：`$router.push('/login')`
- 写法2：`$router.push({path:'/login', query:{aa:11}})`
- 写法3：`$router.push({name:'details', params:{id:1}, query:{aa:11}})`

#### 示例
```javascript
// 实例
var vm = new Vue({
    el: '#app',
    method: {
        to: function(path) {
            this.$router.push(path);
        }
    },
    // 路由配置
    router: new VueRouter({
        routes: [
            { path: '/login', component: 'v-login' },
            { name: 'details', path: '/details/:id', component: 'v-details' },
        ]
    })
});
vm.$router.push('/login');
vm.$router.push({path:'/login', query:{aa:11}});
vm.$router.push({name:'details', params:{id:1}, query:{aa:11}});
```

#### 重定向
```javascript
new VueRouter({
    routes: [
        // 访问根路径时重定向到index
        { path: '/', redirect: '/index' }
        // 也可以使用名字进行重定向
        { path: '/', redirect: { name: 'i' } },
        { path: '/index', component: IndexComt },
    ]
})
```

## 监听路由变化
```javascript
new Vue({
    el: '#app',
    watch: {
        $route: function(to, from) {
            console.log(`${from.path}跳转到了${to.path}`);
        }
    },
    // 路由配置
    router: router
});
```

## 嵌套路由

#### 说明
- 项目中有时候会出现组件嵌套组件的情况
- 这些子组件也要根据url进行动态切换，那么就需要嵌套配置
- 注意：嵌套配置时子路由path自动继承父路由path的path，配置时不要在前面加'/'

#### 示例
```javascript
let Compt1 = Vue.extend({
    template: '<p>子组件1</p>'
});
let Compt2 = Vue.extend({
    template: '<p>子组件2</p>'
});
let ComptContent = Vue.extend({
    template: `
    <div>
        <p>父级组件</p>
        <router-view></router-view>
    </div>`
});
// 路由配置
let router = new VueRouter({
    routes: [
        { path: '/page', component: ComptContent,
          children: [
            { path: 'one', component: Compt1 },
            { path: 'two', component: Compt2 }
          ]
        }
    ]
});
// 实例
var vm = new Vue({
    el: '#app',
    router: router
});
```
