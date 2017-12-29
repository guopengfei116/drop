## 登陆页
- 修改 `src/component/login/Login.vue`
- [表单组件文档](http://element-cn.eleme.io/#/zh-CN/component/form)

```vue
<template>
    <div class="login">
        <!-- 居中的容器 -->
        <div class="login_content">

            <!-- Logo -->
            <div class="login_content_logo">
                <img src="../../img/logo.png" alt="logo">
            </div>

            <!-- Form表单: 如果需要表单效验与重置功能, 需要设置model属性为整个表单数据 -->
            <el-form class="login_content_form" :model="user" :rules="loginFormRules"
                status-icon ref="ruleLoginForm" label-width="70px" label-position="left" >

                <!-- 用户名: 表单效验与重置, 需要设置prop属性为表单字段 -->
                <el-form-item label="用户名" prop="uname">
                    <!-- 用户名输入框: 这里的v-model记得关联表单字段 -->
                    <el-input type="password" v-model="user.uname" auto-complete="off"></el-input>
                </el-form-item>

                <!-- 密码: 表单效验与重置, 需要设置prop属性为表单字段 -->
                <el-form-item label="密码" prop="upwd">
                    <!-- 密码输入框: 这里的v-model记得关联表单字段 -->
                    <el-input type="password" v-model="user.upwd" auto-complete="off"></el-input>
                </el-form-item>

                <!-- 按钮 -->
                <el-form-item>
                    <el-button @click="submitForm('ruleLoginForm')">提交</el-button>
                    <el-button @click="resetForm('ruleLoginForm')">重置</el-button>
                </el-form-item>
            </el-form>

        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                // 该数据将来提交给后端接口, 所以字段名必须与接口文档描述一致
                user: {
                    uname: "admin",
                    upwd: "123456"
                },
                // 表单校验规则
                loginFormRules: {
                    uname: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { pattern: /\w{4,18}/, message: '长度在 4 到 18 个字符, 且只能为字母或数字', trigger: 'blur' }
                    ],
                    upwd: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { pattern: /.{6,18}/, message: '长度在 6 到 18 个字符', trigger: 'blur' }
                    ]
                }
            };
        },

        methods: {
            // 登陆
            login() {
                // 登陆成功后
                // 1 判断status是否为0, 不为0给出错误提示
                // 2 如果为0, 说明登陆成功, 本地localStorage存储后端返回的用户信息
                // 3 跳转到后台管理首页
                this.$http.post(this.$api.login, this.user)
                    .then(rsp => {
                        let {status, message} = rsp.data; // 解构赋值的方式提取两个属性
                        if(status == 0) {
                            localStorage.setItem('user', JSON.stringify(message)); // 需要转换为字符串存储
                            this.$router.push('/');
                        }else {
                            alert('哥们你确实逗我呢!')
                        }
                    });
            },

            // 点击提交按钮, 先做表单校验, 校验通过后才可登陆
            submitForm(formName) {
                this.$refs[formName].validate((result) => {
                    if(result) {
                       this.login();
                    }else {
                        alert('哥们你逗我呢!')
                    }
                });
            },

            // 重置表单
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped lang="less">
    .login {
        height: 100%;
        background-color: rgb(38, 124, 183);

        // 使盒子处于页面中间偏上的位置
        &_content {
            width: 400px;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-left: -200px;
            margin-top: -170px;

            // logo居中
            &_logo {
                text-align: center;
                padding-bottom: 10px;
            }

            // form表单添加背景与圆角边框
            &_form {
                padding: 30px 10px 10px;
                background-color: #fff;
                border: 1px solid hsla(0,0%,100%,.2);
                border-radius: 10px;
            }
        }
    }
</style>
```

## 后台管理页面架构
- 创建 `src/component/admin/Admin.vue`
- 这个组件是`后台管理系统`的架构, 在这里实现`公共`的左侧与头部组件
- 对于`不同`的页面内容`部分`, 将来通过`路由`动态切换不同组件进行渲染
- [布局容器组件文档](http://element-cn.eleme.io/#/zh-CN/component/container)

```vue
<template>
    <el-container>

        <!-- 左侧 -->
        <el-aside width="200px">
            <!-- 左侧导航, 公共部分 -->
            <app-aside></app-aside>
        </el-aside>

        <!-- 右侧 -->
        <el-container>
            <!-- 右侧头部, 公共部分 -->
            <el-header>Header</el-header>

            <!-- 右侧主体, 变化部分, 将来要通过子路由控制 -->
            <el-main>Main</el-main>
        </el-container>

    </el-container>
</template>

<script>
    // 导入公共的左侧与头部组件, 需要注册才能使用
    import AsideComponent from './frame/Aside.vue';
    import HeaderComponent from './frame/Header.vue';

    export default {

        // 注册子组件, key为组件名称(将=使用时的标签名称), value为未注册的组件
        components: {
            'app-aside': AsideComponent,
            'app-header': HeaderComponent,
        }
    }
</script>

<style scoped lang="less">
    // 页面架构高度固定, 左侧与右侧高度独自控制
    .el-container {
        height: 100%;

        // 左侧导航
        .el-aside {
            height: 100%;
            background-color: #D3DCE6;
            color: #333;
        }

        // 右侧
        .el-container {
            height: 100%;

            // 右侧头部
            .el-header {
                background-color: #B3C0D1;
                color: #333;
                line-height: 60px;
            }

            // 右侧主体
            .el-main {
                background-color: #E9EEF3;
                color: #333;
            }
        }
    }
</style>
```

## 公共左侧导航
- 创建 `src/component/admin/frame/Aside.vue`
- 因为 `aside 组件`是 `admin 组件`的公共架构部分, 所以把它创建在 `admin/frame` 里
- [导航菜单组件文档](http://element-cn.eleme.io/#/zh-CN/component/menu)

```vue
<template>
    <div class="aside">

        <!-- logo -->
        <div class="aside_logo">
            <img src="../../../img/logo.png" alt="logo">
        </div>

        <!-- nav: default-active属性用来设置默认打开的菜单 -->
        <el-menu default-active="2" class="aside_menu"
            background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">

            <!-- subnav: key属性需要一个唯一值用于for循环渲染时性能优化, index属性同样需要一个唯一值用于展开导航列表 -->
            <el-submenu v-for="item in menu" :key="item.title" :index="item.title">

                <!-- nav_title -->
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>{{ item.title }}</span>
                </template>

                <!-- nav_item -->
                <el-menu-item v-for="subItem in item.submenu" :key="subItem.text" :index="subItem.text">
                    <!-- 每个子title都是一个a链接, 可以点击, 所以使用router-link, 记得设置to属性 -->
                    <router-link :to="subItem.path">
                        <i class="el-icon-document"></i>
                        <span>{{ subItem.text }}</span>
                    </router-link>
                </el-menu-item>

            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                menu: [
                    { title: '学员问题', submenu:
                        [
                            { text: '内容管理', path: '/' },
                            { text: '类别管理', path: '/' },
                            { text: '评论管理', path: '/' },
                        ]
                    },
                    { title: '前端技术', submenu:
                        [
                            { text: '内容管理', path: '/' },
                            { text: '类别管理', path: '/' },
                            { text: '评论管理', path: '/' },
                        ]
                    },
                    { title: '难点答疑', submenu:
                        [
                            { text: '内容管理', path: '/' },
                            { text: '类别管理', path: '/' },
                            { text: '评论管理', path: '/' },
                        ]
                    },
                    { title: '资源下载', submenu:
                        [
                            { text: '内容管理', path: '/' },
                            { text: '类别管理', path: '/' },
                            { text: '评论管理', path: '/' },
                        ]
                    },
                    { title: '商品管理', submenu:
                        [
                            { text: '内容管理', path: '/' },
                            { text: '类别管理', path: '/' },
                            { text: '评论管理', path: '/' },
                        ]
                    },
                    { title: '订单管理', submenu:
                        [
                            { text: '订单列表', path: '/' },
                        ]
                    },
                ]
            }
        }
    }
</script>

<style scoped lang="less">
    // 让导航列表撑满屏幕
    .aside {
        height: 100%;
        text-align: left;
        background-color: rgb(84, 92, 100);

        // logo居中显示
        &_logo {
            text-align: center;
        }

        // 去掉导航展开时右边的1像素边框
        .el-menu {
            border-right: 0;

            // 去掉导航列表的最小宽度限制
            &-item {
                min-width: 0;
            }
        }
    }
</style>
```

## 公共右侧头部
- 创建 `src/component/admin/frame/Header.vue`
- 因为 `header 组件`也是 `admin 组件`的公共架构部分, 所以把它也创建在 `admin/frame` 里
- [下拉菜单组件文档](http://element-cn.eleme.io/#/zh-CN/component/dropdown)

```vue
<template>
    <div class="header">
        <!-- 下拉菜单: command属性用来监听菜单点击事件, 事件回调里会收到被点击菜单的标识符 -->
        <el-dropdown @command="handleCommand">

            <!-- 菜单标题 -->
            <span class="el-dropdown-link">
                <span>你好, {{ username }}</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
            </span>

            <!-- 菜单列表 -->
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>修改密码</el-dropdown-item>
                <!-- 记得设置command指令值, 不然无法区分点击的是那个菜单 -->
                <el-dropdown-item command="logout">注销</el-dropdown-item>
            </el-dropdown-menu>

        </el-dropdown>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                username: 'admin'
            }
        },

        methods: {
            // 注销
            logout() {
                // 注销成功后
                // 1 清除localStorage存储的用户信息
                // 2 跳转到登陆页
                this.$http.get(this.$api.logout)
                    .then(rsp => {
                        localStorage.removeItem('user');
                        this.$router.push('/login');
                    });
            },

            // 下拉菜单控制器
            handleCommand(command) {
                switch (command) {
                    case 'logout':
                        this.logout();
                        break;
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .header {
        text-align: right;
    }
</style>
```

## 商品模块路由配置
- 商品模块`属于`admin的一部分, 所以相关组件在`admin目录`中创建
- 同时商品模块也会配置成`admin`组件的`子路由`

#### 创建商品相关组件
- 商品内容列表 `src/component/admin/goods/content/GoodsContentList.vue`
- 商品内容添加 `src/component/admin/goods/content/GoodsContentAdd.vue`
- 商品内容编辑 `src/component/admin/goods/content/GoodsContentEdit.vue`
- 商品分类列表 `src/component/admin/goods/category/GoodsContentList.vue`
- 商品分类添加 `src/component/admin/goods/category/GoodsContentAdd.vue`
- 商品分类编辑 `src/component/admin/goods/category/GoodsContentEdit.vue`
- 商品评论列表 `src/component/admin/goods/comment/GoodsContentList.vue`
- 商品评论编辑 `src/component/admin/goods/comment/GoodsContentEdit.vue`
![目录结构预览](./imgs/small/afterend/goods_directory_structure.png);

#### 创建商品路由配置文件
- 创建 `src/js/router/goods.js`
- 该模块向外`导出`商品路由配置对象

```javascript
// 商品管理模块组件
import GoodsContentListComponent from '../component/admin/goods/content/GoodsContentList.vue';
import GoodsContentAddComponent from '../component/admin/goods/content/GoodsContentAdd.vue';
import GoodsContentEditComponent from '../component/admin/goods/content/GoodsContentEdit.vue';
import GoodsCategoryListComponent from '../component/admin/goods/category/GoodsCategoryList.vue';
import GoodsCategoryAddComponent from '../component/admin/goods/category/GoodsCategoryAdd.vue';
import GoodsCategoryEditComponent from '../component/admin/goods/category/GoodsCategoryEdit.vue';
import GoodsCommentListComponent from '../component/admin/goods/comment/GoodsCommentList.vue';
import GoodsCommentEditComponent from '../component/admin/goods/comment/GoodsCommentEdit.vue';

module.exports = [
    // 商品管理
    { name: "gctl", path: "goods/content/list", component: GoodsContentListComponent },
    { name: "gcta", path: "goods/content/add", component: GoodsContentAddComponent },
    { name: "gcte", path: "goods/content/edit", component: GoodsContentEditComponent },

    // 商品分类管理
    { name: "gcgl", path: "goods/category/list", component: GoodsCategoryListComponent },
    { name: "gcga", path: "goods/category/add", component: GoodsCategoryAddComponent },
    { name: "gcge", path: "goods/category/edit", component: GoodsCategoryEditComponent },

    // 商品评论管理
    { name: "gcml", path: "goods/comment/list", component: GoodsCommentListComponent },
    { name: "gcme", path: "goods/comment/edit", component: GoodsCommentEditComponent },
];
```

#### 商品路由配置
- 修改 `src/js/router/index.js`
- `导入`商品模块相关路由配置, 然后配置成`admin`组件的`子路由`

```javascript
// 导入子路由商品模块的配置
import goodsRouterConfig from './goods.js';

// 导出路由配置
export default {
    routes: [
        // 后台管理
        { path: "/", redirect: "/admin" },
        { name: "a", path: "/admin", component: AdminComponent,
            // 子路由
            children: [
                // 商品模块
                ...goodsRouterConfig
            ]
        },

        // 账号管理
        { name: "l", path: "/login", component: LoginComponent },
        { name: "r", path: "/register", component: RegisterComponent },
    ]
};
```

#### 更新左侧导航
- 修改 `src/component/admin/frame/Aside.vue`
- 更新`menu`导航数据里的`path`

```vue
<script>
    export default {
        data() {
            return {
                menu: [
                    { title: '学员问题', submenu:
                        [
                            { text: '内容管理', path: '/admin/student/content/list' },
                            { text: '类别管理', path: '/admin/student/category/list' },
                            { text: '评论管理', path: '/admin/student/comment/list' },
                        ]
                    },
                    { title: '前端技术', submenu:
                        [
                            { text: '内容管理', path: '/admin/web/content/list' },
                            { text: '类别管理', path: '/admin/web/category/list' },
                            { text: '评论管理', path: '/admin/web/comment/list' },
                        ]
                    },
                    { title: '难点答疑', submenu:
                        [
                            { text: '内容管理', path: '/admin/difficulty/content/list' },
                            { text: '类别管理', path: '/admin/difficulty/category/list' },
                            { text: '评论管理', path: '/admin/difficulty/comment/list' },
                        ]
                    },
                    { title: '资源下载', submenu:
                        [
                            { text: '内容管理', path: '/admin/assets/content/list' },
                            { text: '类别管理', path: '/admin/assets/category/list' },
                            { text: '评论管理', path: '/admin/assets/comment/list' },
                        ]
                    },
                    { title: '商品管理', submenu:
                        [
                            { text: '内容管理', path: '/admin/goods/content/list' },
                            { text: '类别管理', path: '/admin/goods/category/list' },
                            { text: '评论管理', path: '/admin/goods/comment/list' },
                        ]
                    },
                    { title: '订单管理', submenu:
                        [
                            { text: '订单列表', path: '/admin/order/content/list' },
                        ]
                    },
                ]
            }
        }
    }
</script>
```

## 登陆状态校验
- 目前用户在`未登录`状态下可直接通过url`打开`后台管理`页面`, 这显然是`不合理`的行为, 所以需要进行处理

#### 不同页面处理逻辑
![守卫逻辑分析](./imgs/small/login_verify.png/)

#### 编写路由守卫
- 创建 `src/js/router/guard.js`
- 该模块向外`导出`一个`路由守卫`函数, 在`切换页面`时进行登陆`校验`处理

```javascript
import axios from 'axios';
import apiConfig from '../js/api_config.js';

// 导出一个全局的路由守卫对象
export default function(to, from, next) {

    // 实现步骤:
    // 1. 请求接口判断当前是否处于登陆状态(也可以通过cookie判断)
    // 2. 通过to对象的name属性得知用户去往的页面
    // 2.1 如果去往登陆页面
    // 2.2 已登陆 -> 自动跳转到首页 -> 调next('/')
    // 2.3 未登陆 -> 允许访问 -> 调next()
    // 3.1 如果去往非登陆页面
    // 3.2 已登陆 -> 允许访问 -> 调next()
    // 3.3 未登陆 -> 自动跳转到登陆页 -> 调next('/login')
    axios.get(apiConfig.isLogin).then(rsp => {
        let logined = rsp.data.code == 'logined';

        // 去往登陆页
        if(to.name === 'l') {
            if(logined) {
                next('/');
            }else {
                next();
            }
        }

        // 去往非登陆页
        if(to.name !== 'l') {
            if(logined) {
                next();
            }else {
                next('/login');
            }
        }

    });
};
```

#### 启动路由守卫
- 修改 `src/mian.js`
- `导入`路由`守卫`函数, 然后通过路由实例的`beforeEach`方法`启动`守卫

```javascript
// 2.1 导入根组件
import AppComponent from './component/App.vue';

// 2.2 导入路由配置与路由守卫, 创建路由实例
import routerConfig from './router';
import routerGuard from './router/guard.js';
let vueRouter = new VueRouter(routerConfig);
vueRouter.beforeEach(routerGuard);

// 3.1 导入配置后的axios与api, 并注入到Vue原型中
import axios from './js/axios_config.js';
import api from './js/api_config.js';
Vue.prototype.$http = axios;
Vue.prototype.$api = api;

// 渲染根组件, 启动项目
new Vue({
    el: '#app',
    render: c => c(AppComponent),
    router: vueRouter
});
```

## 商品内容列表
- 修改 `src/component/admin/goods/content/GoodContentList.vue`
- [面包屑导航那组件文档](http://element-cn.eleme.io/#/zh-CN/component/breadcrumb)
- [表格组件文档](http://element-cn.eleme.io/#/zh-CN/component/table)
- [分页组件文档](http://element-cn.eleme.io/#/zh-CN/component/pagination)

```vue
<template>
    <div class="goods-list">
        <!-- 面包屑导航 -->
        <section class="main_breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>商品管理</el-breadcrumb-item>
                <el-breadcrumb-item>商品内容</el-breadcrumb-item>
                <el-breadcrumb-item>内容列表</el-breadcrumb-item>
            </el-breadcrumb>
        </section>

        <!-- 按钮组 -->
        <section class="main_btns">
            <div>
                <el-button size="small" plain icon="el-icon-check">全选</el-button>
                <el-button size="small" plain icon="el-icon-plus"
                    @click="$router.push({name: 'gcta'})">新增</el-button>
                <el-button size="small" plain icon="el-icon-delete">删除</el-button>
            </div>
            <div>
                <el-input v-model="query.searchvalue" @blur="getGoodsList" size="small"
                    prefix-icon="el-icon-search" placeholder="请输入内容"></el-input>
            </div>
        </section>

        <!-- Table表格: data属性为要渲染的列表数据 -->
        <el-table :data="goodsList" ref="multipleTable" tooltip-effect="dark" height="400"
            style="width: 100%; line-height: 24px; text-align: center;">
            <!-- 多选框 -->
            <el-table-column type="selection" width="55"></el-table-column>

            <!-- 商品数据列表: prop属性为列表数据里的字段名称 -->
            <el-table-column label="标题" prop="title"></el-table-column>
            <el-table-column label="类别" prop="categoryname" width="100"></el-table-column>
            <el-table-column label="库存" prop="stock_quantity" width="100"></el-table-column>
            <el-table-column label="市场价" prop="market_price" width="100"></el-table-column>
            <el-table-column label="销售价" prop="sell_price" width="100"></el-table-column>

            <!-- 商品状态: 里面的template标签可以放置任意html结构 -->
            <el-table-column label="状态" width="100">
                <template slot-scope="scope">
                    <!-- v-bind:class可以通过数组批量设置class -->
                    <i :class="['el-icon-picture', scope.row.is_slide? 'active': '']"></i>
                    <i :class="['el-icon-upload2', scope.row.is_top? 'active': '']"></i>
                    <i :class="['el-icon-star-on', scope.row.is_hot? 'active': '']"></i>
                </template>
            </el-table-column>

            <!-- 编辑商品 -->
            <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                    <router-link :to="{name:'gcte', params: {id: scope.row.id}}">编辑</router-link>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页: current-page展示当前页, totle用来设置数据总量然后动态计算分页  -->
        <!-- 分页: current-change监听页变化, size-change监听每页数据变量  -->
        <el-pagination
            :current-page="query.pageIndex"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="10"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            :total="totalcount"
            layout="total, sizes, prev, pager, next, jumper"
            background>
        </el-pagination>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                // 商品列表接口所需的查询字符串
                query: {
                    pageIndex: 1,
                    pageSize: 10,
                    searchvalue: '',
                },
                // 商品列表数据
                goodsList: [],
                // 数据总量
                totalcount: 0
            };
        },

        methods: {
            // 获取商品列表数据
            getGoodsList() {
                this.$http.get(this.$api.gsList, { params: this.query })
                    .then(rsp => {
                        this.goodsList = rsp.data.message;
                        this.totalcount = rsp.data.totalcount;
                    });
            },

            // 修改当前页
            handleCurrentChange(pageIndex) {
                this.query.pageIndex = pageIndex;
                this.getGoodsList();
            },

            // 修改每页数量
            handleSizeChange(pageSize) {
                this.query.pageSize = pageSize;
                this.getGoodsList();
            }
        },

        created() {
            this.getGoodsList();
        }
    }
</script>

<style scoped>
    .goods-list {
        padding-bottom: 60px;
    }
</style>
```

## 商品内容添加
- 修改 `src/component/admin/goods/content/GoodContentAdd.vue`
- [select选择器组件文档](http://element-cn.eleme.io/#/zh-CN/component/select)
- [switch开关组件文档](http://element-cn.eleme.io/#/zh-CN/component/switch)
- [upload上传组件文档](http://element-cn.eleme.io/#/zh-CN/component/upload)

#### 基本实现

```vue
<template>
    <div class="edit">
        <!-- 面包屑导航 -->
        <section class="main_breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>商品管理</el-breadcrumb-item>
                <el-breadcrumb-item>商品内容</el-breadcrumb-item>
                <el-breadcrumb-item>内容编辑</el-breadcrumb-item>
            </el-breadcrumb>
        </section>

        <!-- Form表单: 如果需要表单效验与重置功能, 需要设置model属性为整个表单数据 -->
        <!-- Form表单项: 表单效验与重置, 需要设置prop属性为表单字段 -->
        <el-form :model="editForm" :rules="editFormRules" ref="editForm"
            label-width="100px" label-position="left" class="edit_form">
            <el-form-item label="内容标题" prop="title">
                <el-input v-model="editForm.title" size="small"></el-input>
            </el-form-item>
            <el-form-item label="副标题" prop="sub_title">
                <el-input v-model="editForm.sub_title" size="small"></el-input>
            </el-form-item>
            <el-form-item label="所属类比" prop="category_id">
                <el-select v-model="editForm.category_id" size="small" placeholder="请选择所属类比">
                    <el-option v-for="item in categoryList" :label="item.title" :value="item.category_id" :key="item.category_id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否发布">
                <el-switch v-model="editForm.status"></el-switch>
            </el-form-item>
            <el-form-item label="状态设置">
                <el-switch v-model="editForm.is_slide" active-text="轮播图"></el-switch>
                <el-switch v-model="editForm.is_top" active-text="置顶"></el-switch>
                <el-switch v-model="editForm.is_hot" active-text="推荐"></el-switch>
            </el-form-item>
            <el-form-item label="封面上传">
                上传
            </el-form-item>
            <el-form-item label="附件上传">
                上传
            </el-form-item>
            <el-form-item label="商品货号" prop="goods_no">
                <el-input v-model="editForm.goods_no" size="small"></el-input>
            </el-form-item>
            <el-form-item label="库存数量" prop="stock_quantity">
                <el-input v-model="editForm.stock_quantity" size="small"></el-input>
            </el-form-item>
            <el-form-item label="市场价格" prop="market_price">
                <el-input v-model="editForm.market_price" size="small"></el-input>
            </el-form-item>
             <el-form-item label="销售价格" prop="sell_price">
                <el-input v-model="editForm.sell_price" size="small"></el-input>
            </el-form-item>
            <el-form-item label="摘要信息" prop="desc">
                <el-input type="textarea" v-model="editForm.zhaiyao" size="small"></el-input>
            </el-form-item>
            <el-form-item label="详细信息" prop="desc">
                <el-input type="textarea" v-model="editForm.content" size="small"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('editForm')">立即创建</el-button>
                <el-button @click="resetForm('editForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                // 当前编辑商品的ID
                id: this.$route.params.id,

                // 所属分类列表
                categoryList: [
                    {
                        "category_id":"98",
                        "title":"前端常用功能",
                        "sort_id":2000,
                        "class_layer":1,
                        "parent_id":0
                    },
                    {
                        "category_id":"99",
                        "title":"延迟加载(懒加载)",
                        "sort_id":2001,
                        "class_layer":2,
                        "parent_id":76
                    }
                ],

                // 表单数据
                editForm: {
                    title: "",
                    sub_title: "",
                    category_id: "",
                    goods_no: "",
                    stock_quantity: 0,
                    market_price: 0,
                    sell_price: 0,
                    status: false,
                    is_slide: false,
                    is_top: false,
                    is_hot: false,
                    zhaiyao: "",
                    content: "",
                    imgList: [],
                    fileList: []
                },

                // 表单校验规则
                editFormRules: {
                    title: [
                        { required: true, message: '请输入内容标题', trigger: 'blur' },
                    ],
                    sub_title: [
                        { required: true, message: '请输入副标题', trigger: 'blur' },
                    ],
                    category_id: [
                        { required: true, message: '请选择所属分类', trigger: 'blur' },
                    ],
                    goods_no: [
                        { required: true, message: '请输入商品货号', trigger: 'blur' },
                    ],
                    stock_quantity: [
                        { required: true, message: '请输入库存数量', trigger: 'blur' },
                    ],
                    market_price: [
                        { required: true, message: '请输入市场价格', trigger: 'blur' },
                    ],
                    sell_price: [
                        { required: true, message: '请输入销售价格', trigger: 'blur' },
                    ],
                    zhaiyao: [
                        { required: true, message: '请输入摘要信息', trigger: 'blur' },
                    ],
                    content: [
                        { required: true, message: '请输入详细信息', trigger: 'blur' },
                    ],
                }
            };
        },
        methods: {
            // 获取商品信息
            getGoods() {
                this.$http.get(this.$api.gsDetail + this.id, this.editForm)
                    .then(rsp => this.editForm = rsp.data.message);
            },

            // 商品编辑
            goodsEdit() {
                this.$http.post(this.$api.gsEdit + this.id, this.editForm)
                    .then(rsp => this.$alert(rsp.data.message));
            },

            // 先做表单校验, 通过后再调接口提交数据
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.goodsEdit();
                    }
                });
            },

            // 重置
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },

        created() {
            this.getGoods();
        }
    }
</script>

<style scoped lang="less">
    .edit {
        &_form {
            width: 500px;
            padding: 20px 10px 0;
        }
    }
</style>
```

#### 集成富文本插件
- [富文本插件官网](https://surmon-china.github.io/vue-quill-editor/)
- [富文本插件github](https://github.com/surmon-china/vue-quill-editor)

###### 安装
- 命令: `npm i vue-quill-editor -S`

###### 使用
- `导入`富文本`样式`与`组件`, 然后注册成`子组件`使用

```vue
<template>
    <el-form-item label="详细信息" prop="content">
        <quill-editor v-model="editForm.content"></quill-editor>
    </el-form-item>
</template>

<script>
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'
    import { quillEditor } from 'vue-quill-editor'

    export default {
      components: {
        quillEditor
      }
    }
</script>
```
