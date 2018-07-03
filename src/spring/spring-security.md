# Spring-Security

## 问题记录
context在spring-security认证过程中可用，认证之后就会被清掉。

## form-login属性详解

form-login是spring security命名空间配置登录相关信息的标签,它包含如下属性： 

1. login-page 自定义登录页url,默认为/login 
2. login-processing-url 登录请求拦截的url,也就是form表单提交时指定的action 
3. default-target-url 默认登录成功后跳转的url 
4. always-use-default-target 是否总是使用默认的登录成功后跳转url 
5. authentication-failure-url 登录失败后跳转的url 
6. username-parameter 用户名的请求字段 默认为userName 
7. password-parameter 密码的请求字段 默认为password 
8. authentication-success-handler-ref 指向一个AuthenticationSuccessHandler用于处理认证成功的请求,不能和default-target-url还有always-use-default-target同时使用 
9. authentication-success-forward-url 用于authentication-failure-handler-ref 
10. authentication-failure-handler-ref 指向一个AuthenticationFailureHandler用于处理失败的认证请求 
11. authentication-failure-forward-url 用于authentication-failure-handler-ref 
12. authentication-details-source-ref 指向一个AuthenticationDetailsSource,在认证过滤器中使用