# VueRouter

## 配置项

- routes: 路由配置
- mode：导航模式，两个可选值，hash与history
- base：路由继承的根路径
- linkActiveClass：在与当前页面路由一致的link上添加class，非严格匹配，如果当前处在子路由，父link也会匹配并添加class
- linkExactActiveClass：同linkActiveClass，严格匹配，页面所处路由必须与link完全一致才会匹配并添加class
- scrollBehavior：在路由跳转时是否保存scroll值
- fallback：如果浏览器不支持history，是否自动退回到hash模式
- parseQuery：自定义query解析器
- stringifyQuery：接收queyr对象，自定义序列化函数

```js
new Router({
    routes: [{}, {}],
    mode: 'history',
    base：'goods',
    linkActiveClass: 'active',
    linkExactActiveClass: 'active-exact',
    scrollBehavior(to, from, savedPosition) {
        return savedProsition? savedPosition: {x: 0, y: 0}
    },
    parseQuery(query) {
        return query.slice(1).split('&').map(v=>v.split('=))
    },
    stringifyQuery(obj) {
        return JSON.stringify(obj);
    }
})
```

- - - - - - - - - - - - - - - - - - - - - - - - - - -

## routes配置

- path: 路径，可使用:预设路径参数
- redirect: 重定向
- props: 是否把路径参数传递给匹配的组件，可boolean|obj值|钩子
- component: 路由匹配时渲染的组件，渲染位置通过router-view设置
- components: 可通过键值的方式配置多个匹配组件，使用时只需要给router添加对应名称即可
- name: 别名，好处是可在路由跳转时通过name简称代替一长串path
- meta: 路由切换成功后传递参数
- children: 嵌套子路由，配置方式一样，理论可无限嵌套
- befoerEnter: 路由匹配后执行的守卫钩子

```js
const rouotes = [
    {
        path: '/',
        redirect: '/app'
    },
    {
        path: '/goods/:id',
        props: route => { id: route.query.id },
        component: GoodsList,
        name: 'glist',
        meta: {
            title: 'this is goods list page',
            count: 200
        },
        beforeEntre(to, from, next) {
            next()

        }
    }
]
```

- - - - - - - - - - - - - - - - - - - - - - - - - - -

## Router实例API

### 属性

- routes

### 方法

- beforeEach: 
- beforeResolve: 
- afterEach: 
- afterResolve: 

- - - - - - - - - - - - - - - - - - - - - - - - - - -

## VM与Component实例API

### 属性

- $route：路由匹配后解析的信息，类似location.href解析结果

### 方法

- push

- - - - - - - - - - - - - - - - - - - - - - - - - - -

## 内置组件

- router-view
- router-link

- - - - - - - - - - - - - - - - - - - - - - - - - - -

## Component扩展配置项

- befoerRouteEnter: 路由匹配后执行的钩子
- befoerRouteUpdate: 同一个路由规则，但不同路径参数时会触发
- beforeRouteLeave: 路由离开后执行的钩子

- - - - - - - - - - - - - - - - - - - - - - - - - - -

## 路由守卫执行顺序

- ![路由匹配时不同地方钩子执行顺序](https://github.com/guopengfei116/drop/blob/master/img/vue/base/route-guard-enter.png?raw=true)
