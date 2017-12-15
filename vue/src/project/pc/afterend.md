## 登陆页
- 修改 `src/component/login/Login.vue`
- [使用表单组件](http://element-cn.eleme.io/#/zh-CN/component/form)

```vue
<template>
    <div class="login">
        <!-- 居中的容器 -->
        <div class="login_container">

            <!-- Logo -->
            <div class="login_container_logo">
                <img src="../../img/logo.png" alt="logo">
            </div>

            <!-- Form表单: 如果需要表单效验与重置功能, 需要设置model属性为整个表单数据 -->
            <el-form class="login_container_form" :model="user" :rules="loginFormRules"
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
                    <el-button type="primary" @click="login('ruleLoginForm')">提交</el-button>
                    <el-button @click="resetForm('ruleLoginForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
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
                },
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
                        this.$http.post(apiConfig.login, this.user)
                            .then(rsp => alert(rsp.data.message.realname));
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
        &_container {
            width: 400px;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-left: -200px;
            margin-top: -165px;
            text-align: center;
            &_logo {
                padding-bottom: 10px;
            }
            &_form {
                padding: 30px 10px 10px;
                border: 1px solid hsla(0,0%,100%,.2);
                border-radius: 10px;
            }
        }
    }
</style>
```
