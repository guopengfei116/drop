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
                    <el-button @click="login('ruleLoginForm')">提交</el-button>
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
            login(formName) {
                // 满足效验规则才会发送登陆请求
                this.$refs[formName].validate(result => {
                    if (result) {
                        this.$http.post(this.$api.login, this.user)
                            .then(rsp => this.$router.push('/'));
                    }else {
                        return false;
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
        &_content {
            width: 400px;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-left: -200px;
            margin-top: -165px;
            &_logo {
                text-align: center;
                padding-bottom: 10px;
            }
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

## 公共页面架构
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
            <!-- 右侧主体, 变化部分 -->
            <el-main>Main</el-main>
        </el-container>

    </el-container>
</template>

<script>
    import AsideComponent from './frame/Aside.vue';

    export default {
        components: {
            'app-aside': AsideComponent
        }
    }
</script>

<style scoped lang="less">
    .el-container {
        // 页面架构高度固定, 左侧与右侧高度独自控制
        height: 100%;

        // 左侧导航
        .el-aside {
            min-height: 100%;
            background-color: #D3DCE6;
            color: #333;
            text-align: center;
        }

        // 右侧
        .el-container {
            height: 100%;
            overflow: hidden;

            // 右侧头部
            .el-header {
                background-color: #B3C0D1;
                color: #333;
                text-align: center;
                line-height: 60px;
            }

            // 右侧主体
            .el-main {
                background-color: #E9EEF3;
                color: #333;
                text-align: center;
                line-height: 160px;
                overflow: scroll;
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

        <!-- menu -->
        <el-menu
        default-active="2"
        class="aside_menu"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
            <!-- 菜单列表, index属性要传一个唯一的标识符, 与key属性一致就可以了 -->
            <el-submenu v-for="item in menu" :key="item.title" :index="item.title">

                <!-- 标题 -->
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>{{ item.title }}</span>
                </template>

                <!-- 子菜单列表 -->
                <el-menu-item-group>
                    <el-menu-item v-for="subItem in item.submenu" :key="subItem.text" :index="subItem.text">
                        <router-link to="subItem.path">
                            <i class="el-icon-document"></i>
                            <span>{{ subItem.text }}</span>
                        </router-link>
                    </el-menu-item>
                </el-menu-item-group>

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
        },

        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style scoped lang="less">
    .aside {
        height: 100%;
        text-align: left;
        background-color: rgb(84, 92, 100);
        &_logo {
            text-align: center;
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
        <!-- 下拉菜单: command属性用来监听菜单点击事件, 回调中通过command指令值区分判断 -->
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
                this.$http.get(this.$api.logout)
                    .then(rsp => this.$router.push('/login'));
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
