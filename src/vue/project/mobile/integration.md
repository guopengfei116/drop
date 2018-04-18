## 集成mint-ui
- 我们采用一个`Vue`组件库`mint-ui`来辅助项目开发
- [官方文档](http://mint-ui.github.io/docs/#/zh-cn2)

#### 安装
- 命令: `npm i mint-ui -S`

#### 启用
- 在`src/js/main.js`中导入`mint-ui`与mint-ui下的`全局样式`
- 然后调用`use`方法启用插件

```javascript
// 1.1 导入第三方类库
import Vue from 'vue';
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';

// 1.2 启用vue插件
Vue.use(MintUI);

// 2.1 导入根组件
import App from '../component/App.vue';

// 2.2 挂载根组件, 启动应用
new Vue({
    el: '#app',
    render(cNode) {
        return cNode(App);
    },
    // router: new VueRouter(routerConfig)
});
```

#### 实现页面头部
- 在`src/component/App.vue`中使用mintUi的`Header`组件来实现

```vue
<template>
  <main>
    <mt-header fixed title="小本买卖" slot="right"></mt-header>
  </main>
</template>
```

## 集成mui
- 这是一个`原生js`编写的`UI`组件库, 这里我们采用它提供的`样式`来进行布局
- [官方文档](http://dev.dcloud.net.cn/mui/)

#### 安装
- 命令: `npm i https://github.com/dcloudio/mui.git -S`

#### 样式导入
- 在`src/js/main.js`中导入`mui`中的`全局样式`

```javascript
// 1.1 导入第三方类库
import Vue from 'vue';
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import 'mui/dist/css/mui.css';
```

#### 实现页面底部
- 在`src/component/App.vue`中使用mui的`tab bar`组件来实现

```vue
<template>
  <main>
    <!-- 页面公共头部 -->
    <mt-header fixed title="小本买卖"></mt-header>

    <!-- 页面公共底部 -->
    <nav class="mui-bar mui-bar-tab">
        <router-link to="/" class="mui-tab-item">
            <span class="mui-icon mui-icon-home"></span>
            <span class="mui-tab-label">首页</span>
        </router-link>
        <router-link to="/goods/list" class="mui-tab-item">
            <span class="mui-icon mui-icon-extra mui-icon-extra-gift"></span>
            <span class="mui-tab-label">商品购买</span>
        </router-link>
        <router-link to="/shopcart" class="mui-tab-item">
            <span class="mui-icon mui-icon-extra mui-icon-extra-express">
                <span class="mui-badge">0</span>
            </span>
            <span class="mui-tab-label">购物车</span>
        </router-link>
        <router-link to="/settings" class="mui-tab-item">
            <span class="mui-icon mui-icon-gear"></span>
            <span class="mui-tab-label">设置</span>
        </router-link>
    </nav>
  </main>
</template>
```

## 封装公共ui插件
- 我们实现的页面`头部`与`底部`是可以复用的, 将来还会有很多可`复用`的功能要实现
- 我们可以把他们`封装`成一个个单独的组件, 最后把他们`组装`成一个vue`插件`

#### 提取公共header组件
- 创建src/component/common/header.vue

```vue
<template>
    <header>
        <mt-header fixed title="小买卖"></mt-header>
        <i></i>
    </header>
</template>

<style scoped>
header i{
    display: block;
    height: 40px;
}
</style>
```

#### 提取公共footer组件
- 创建src/component/common/footer.vue

```vue
<template>
    <footer>
        <nav class="mui-bar mui-bar-tab">
            <router-link class="mui-tab-item" to="/index">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="mui-tab-item" v-bind:to="{ name: 'gl' }">
                <span class="mui-icon mui-icon-extra mui-icon-extra-gift"></span>
                <span class="mui-tab-label">商品购买</span>
            </router-link>
            <router-link class="mui-tab-item" v-bind:to="{ name: 'sc' }">
                <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
                    <span class="mui-badge">0</span>
                </span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link class="mui-tab-item" to="/settings">
                <span class="mui-icon mui-icon-gear"></span>
                <span class="mui-tab-label">设置</span>
            </router-link>
        </nav>
        <i></i>
    </footer>
</template>

<style scoped>
i {
    display: block;
    height: 50px;
}
</style>
```

#### 编写插件
- 创建src/component/common/index.js
- 然后`导入`所有公共组件, 在`install`方法中把他们注册成`全局`组件

```javascript
// 导入所有公共组件
import HeaderComponent from './header.vue';
import FooterComponent from './footer.vue';

// 导出插件配置, 该配置要求提供一个install方法, 这个方法会被注入Vue
// 需要我们调用Vue的filter component directive等方法进行功能扩展
export default {
    install(Vue) {
        // 把导入的组件注册为全局组件
        Vue.component('app-header', HeaderComponent);
        Vue.component('app-footer', FooterComponent);
    }
}
```

#### 启用插件
- 在`src/js/main.js`中导入自己封装的公共ui插件
- 然后调用`use`方法启用插件

```javascript
// 1.1 导入第三方类库
import Vue from 'vue';
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import 'mui/dist/css/mui.css';
import Common from '../component/common';

// 1.2 启用vue插件
Vue.use(MintUI);
Vue.use(Common);
```

#### 使用
- 在`src/component/App.vue`中使用`app-header`与`app-footer`实现页面头部与底部布局

```vue
<template>
  <main>
    <app-header></app-header>
    <app-footer></app-footer>
  </main>
</template>
```

## 集成vue-router
- why? 我们需要使用`路由`来动态`替换`页面`中间`部分的组件

#### 安装
- 命令: `npm i vue-router -S`

#### 预先编写路由配置
- 创建`src/router/router.js`
- 配置`linkActiveClass`定制底部导航`焦点`样式
- 配置`routes`控制组件的替换

```javascript
// 导入受路由控制的组件
import HomeComponent from '../component/home/home.vue';
import NewsListComponent from '../component/news/news_list.vue';
import NewsDetailComponent from '../component/news/news_detail.vue';

// 导出路由配置
export default {
    linkActiveClass: 'mui-active',
    routes: [

        // 首页路由配置
        { path: "/", redirect: "/index" },
        { name: "i", path: "/index", component: HomeComponent },

        // 新闻路由配置
        { name: "nl", path: "/news/list", component: NewsListComponent },
        { name: "nd", path: "/news/detail/:id", component: NewsDetailComponent }
    ]
};
```

#### 启用
- 在src/js/main.js中导入`路由插件`与`路由配置`
- 然后调用`use`方法启用插件, 并配置`router`选项

```javascript
// 1.1 导入第三方类库
import Vue from 'vue';
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import 'mui/dist/css/mui.css';
import Common from '../component/common';
import VueRouter from 'vue-router';

// 1.2 启用vue插件
Vue.use(MintUI);
Vue.use(Common);
vue.use(VueRouter);

// 2.1 导入路由配置
import routerConfig from '../router/router.js';

// 2.2 导入组件
import App from '../component/App.vue';

// 3 挂载根组件, 启动应用
new Vue({
    el: '#app',
    render(cNode) {
        return cNode(App);
    },
    router: new VueRouter(routerConfig)
});
```

#### 测试

###### 创建组件
- 把`路由`配置的三个`组件`分别创建出来
- src/component/home/home.vue
- src/component/news/news_list.vue
- src/component/news/news_detail.vue

###### 使用router-view占位标签
- 修改src/component/App.vue

```vue
<template>
  <main>
    <app-header></app-header>
    <router-view></router-view>
    <app-footer></app-footer>
  </main>
</template>
```

## 集成axios
- why? 接下来编写的每个页面`数据`都需要发送`http请求`来获取

#### 安装
- 命令: `npm i axios -S`

#### 编写api配置文件
- 接口有很多且不容易`记忆`, 所以我们专门创建一个`配置`文件, 里面以`对象`的形式存储所有接口地址
- 创建`src/js/api_config.js`

```javascript
const domain = 'http://vue.studyit.io/api';

export default {
    // 获取轮播图的接口
    getLunbo: `${domain}/getlunbo`,

    // 新闻相关接口
    getNL: `${domain}/getnewslist`,
    getND: `${domain}/getnew/`,                // 接口需要新闻id参数(/getnew/:id)
};
```

#### 注入vue实例
- 在`mian.js`中把接口配置对象`注入`到vue实例方便使用

```javascript
// 2.1 导入配置
import routerConfig from '../router'       // 自动找到index.js引入
import apiConfig from './api_config.js'

// 2.2 扩展实例成员
Vue.prototype.axios = axios;               // 把axios库放置到原型, 组件实例即可直接调用axios对象
Vue.prototype.api = apiConfig;           // 把api配置放置到原型, 组件实例即可直接调用api对象

// 2.3 导入根组件
import AppComponent from '../component/App.vue';

// 2.4 渲染根组件, 启动项目
new Vue({
    el: '#app',
    render(createNode) {
        return createNode(AppComponent);
    },
    router: new VueRouter(routerConfig)
});
```
