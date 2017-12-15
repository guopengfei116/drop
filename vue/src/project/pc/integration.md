## 集成vue-router
- why? 页面的切换由前端来控制, 需要前端路由插件来完成

#### 安装
- 命令: `npm i vue-router -S`

#### 创建测试组件
- 首页组件 `src/component/home/Home.vue`
- 登陆组件 `src/component/login/Login.vue`
- 注册组件 `src/component/register/Register.vue`

#### 编写路由配置
- 创建 `src/router/router.js`, 专门配置路由
- 此模块最终向外`导出`整个路由`配置`, 供外界使用

```javascript
// 导入受路由控制的组件
import HomeComponent from '../component/home/Home.vue';
import LoginComponent from '../component/login/Login.vue';
import RegisterComponent from '../component/register/Register.vue';

// 导出路由配置
export default {
    routes: [
        // 首页路由配置
        { path: "/", redirect: "/home" },
        { name: "h", path: "/home", component: HomeComponent },

        // 新闻路由配置
        { name: "l", path: "/login", component: LoginComponent },
        { name: "r", path: "/register", component: RegisterComponent }
    ]
};
```

#### 启用路由
- 在 `src/main.js` 中导入`路由插件`, 使用 `use` 方法启用
- 然后再导入`路由配置` , 配置 `router` 选项

```javascript
// 1.1 导入第三方库
import Vue from 'Vue';
import VueRouter from 'vue-router';

// 1.2 启动Vue插件
Vue.use(VueRouter);

// 2.1 导入根组件
import AppComponent from './component/App.vue';

// 2.2 导入路由配置
import routerConfig from './router';

// 挂载根组件, 启动应用
new Vue({
    el: '#app',
    render: c => c(AppComponent),
    router: new VueRouter(routerConfig)
});
```

#### 测试
- 修改 `src/component/app.vue`
- 使用 `router-view` 标签进行路由占位

```vue
<template>
  <main>
    <router-view></router-view>
  </main>
</template>
```

## 集成axios与api配置
- why? 每个页面的`数据`都是动态的, 需要调用`接口`, 所以要集成 `http` 请求库

#### 安装
- 命令: `npm i axios -S`

#### 配置api
- 创建 `src/js/api_config.js`, 用于`存储接口`地址
- 因为接口有很多, 且不容易记忆, 所以我们创建这个模块存储它
- 该模块对外`导出`一个对象, `key` 为接口名称, `value` 为接口地址

```javascript
// 导出域名
export const domain = 'http://157.122.54.189:9095';

// 默认导出整个接口配置
export default {
    // 账号管理
    login: `/admin/account/login`,                               // 登陆
    logout: `/admin/account/logout`,                          // 登出
    islogin: `/admin/account/islogin`,                         // 是否登陆状态

    // 类别管理
    ctList: `/admin/category/getlist/`,                          // 获取分类列表, 需要参数: tablename
    ctDetail: `/admin/category/getcategorymodel/`,    // 获取分类详情, 需要参数: cateID
    ctEdit: `/admin/category/edit/`,                             // 编辑分类, 需要参数: cateID
    ctAdd: `/admin/category/add/`,                            // 添加分类, 需要参数: tablename

    // 文章管理
    atList: `/admin/article/getlist/`,                        // 获取文章列表, 需要参数: tablename, 需要查询: pageIndex 与 pageSize
    atCate: `/admin/article/getcategorylist/`,         // 获取文章的分类列表, 需要参数: tablename
    atDetail: `/admin/article/getarticle/`,               // 获取文章详情, 需要参数: tablename 与 atID
    atEdit: `/admin/article/edit/`,                          // 编辑文章, 需要参数: tablename 与 atID
    atDdd: `/admin/category/add/`,                      // 添加文章, 需要参数: tablename
    atDel: `/admin/category/del/`,                        // 删除文章, 需要参数: tablename 与 atID

    // 文章上传
    atImg: `/admin/article/uploadimg`,                 // 上传文章图片
    atFile: `/admin/article/uploadfile`                    // 上传文章附件

    // 商品管理
    gsList: `/admin/goods/getlist/`,                       // 获取商品列表, 需要查询: pageIndex 与 pageSize 与 searchvalue
    gsDetail: `/admin/goods/getgoodsmodel/`,    // 获取商品详情, 需要参数: gsID
    gsEdit: `/admin/goods/edit/`,                         // 编辑商品, 需要参数: gsID
    gsAdd: `/admin/goods/add/`,                         // 添加商品
    gsDel: `/admin/goods/del/`,                           // 删除商品, 需要参数: gsID

    // 订单管理
    odList: `/admin/order/getorderlist`,                // 获取订单列表, 需要查询: pageIndex 与 pageSize 与 orderstatus 与 vipname
    odDetail: `/admin/order/getorderdetial/`       // 获取订单详情, 需要参数: odID
    odEdit: `/admin/order/updateorder/`             // 编辑订单
}
```

#### 配置axios
- 创建  `src/axios_config.js`
- 对 `axios` 进行一些`配置`, 然后`导出`配置后的 `axios`

```javascript
// 导入axios与接口域名
import axios from 'axios';
import { domain } from './api_config.js';

// 配置默认域名, 这样请求的时候就不用在url里加域名了
axios.defaults.baseURL = domain;

// 我们是跨域请求的接口, 默认不会携带cookie等信息, 后端需要这些信息来判断登陆状态, 所以要设为true
axios.defaults.withCredentials=true;

// 导出配置后的axios
export default axios;
```

#### vue中注入axios
- 修改 `src/main.js`
- 因为 `axios` 不是 `vue` 插件, 那个模块`使用`它, 必须先在那个模块里进行`导入`
- 为了使用方便, 我们把 `axios` 加到 `vue` 的`原型`中, 这样组件的`实例`就可以通过 `this` 来调用它了

```javascript
// 3.1 导入配置后的axios, 并注入到Vue的原型中, 将来在实例通过this.$http调用
import axios from './js/axios_config.js';
Vue.prototype.$http = axios;

// 渲染根组件, 启动项目
new Vue({
    el: '#app',
    render(createNode) {
        return createNode(AppComponent);
    },
    router: new VueRouter(routerConfig)
});
```

#### 测试
- 修改 `src/component/login/login.vue`
- 在这里调用`登陆`与`登陆判断`接口进行测试

```vue
<template>
    <div>
        <button @click="login">登陆</button>
        <button @click="isLogin">登陆检测</button>
    </div>
</template>

<script>
    import apiConfig from '../../js/api_config.js';

    export default {
        data() {
            return {
                user: {
                    uname: "admin",
                    upwd: "123456"
                }
            };
        },

        methods: {
            // 登陆
            login() {
                this.$http.post(apiConfig.login, this.user)
                    .then(rsp => alert(rsp.data.message.realname));
            },

            // 判断是否已登陆
            isLogin() {
                this.$http.get(apiConfig.islogin)
                    .then(rsp => alert(rsp.data.code));
            }
        }
    }
</script>
```

## 集成element-ui
- 我们采用一个 `Vue` 组件库 `element-ui` 来辅助项目开发
- [官方文档](http://element.eleme.io/#/zh-CN)

#### 安装
- 命令: `npm i element-ui -S`

#### 启用
- 修改 `src/js/main.js`, 在这里导入`element-ui` 与`样式`文件
- 然后使用 `use` 方法启用即可使用 `element-ui` 提供的各种`组件`

```javascript
// 1.1 导入第三方库
import Vue from 'Vue';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'

// 1.2 启动Vue插件
Vue.use(VueRouter);
Vue.use(ElementUI);

// 2.1 导入根组件
import AppComponent from './component/App.vue';

// 2.2 导入路由配置
import routerConfig from './router';

// 3.1 导入配置后的axios, 并注入到Vue原型中
import axios from './js/axios_config.js';
Vue.prototype.$http = axios;

// 渲染根组件, 启动项目
new Vue({
    el: '#app',
    render: c => c(AppComponent),
    router: new VueRouter(routerConfig)
});
```

#### webpack配置
- `element-ui` 里的样式文件会引用两种`字体`文件: `woff` 与 `ttf`
- 我们需要在 `webpack.config.js` 文件里添加对应配置, 否则打包会报错

```javascript
module: {
    rules: [
        // 打包引用的静态资源文件
        {
            test: /\.(png|jpg|gif|jpeg|svg|woff|ttf)$/,
            use: [
                // 指定小于10kb的图片才转为base64编码打包
                {loader: 'url-loader', options: {limit: 10240}}
            ]
        },
    ]
}
```

#### 测试
- 修改 `src/component/home/Home.vue`
- 随便找个 `element-ui` 组件进行`测试`, 这里使用了一个`日期组件`

```vue
<template>
    <div>
        <h1>首页</h1>
        <el-date-picker
            v-model="value"
            align="right"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions">
        </el-date-picker>
    </div>
</template>

<script>
    import apiConfig from '../../js/api_config.js';

    export default {
        data() {
            return {
                value: '',
                pickerOptions: {
                    // 大于今天的日期不能选
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    }
                }
            };
        }
    }
</script>
```

## 集成normalize.css与全局样式
- 我们需要这个类库让浏览器的默认样式保持一致
- [官方文档](http://necolas.github.io/normalize.css/)

#### 安装
- 命令: `npm i normalize.css -S`

#### 全局样式
- 创建 `src/less/index.less`, 该文件用于设置全局样式

```less
html, body, main {
    min-height: 100%;
    height: 100%;
}
```

#### 使用默认样式与全局样式
- 修改 `src/js/main.js`, 在这里导入`normalize.css` 与 `index.less` 即可

```javascript
// 1.1 导入第三方库
import Vue from 'Vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'normalize.css';

// 1.2 启动Vue插件
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(ElementUI);

// 1.3 导入全局样式
import './less/index.less';
```
