# 前后端分离部署遇到的跨域问题

最近做一个项目，采用了完全前后端分离的方式开发，后端主要使用java语言以及ssh框架实现；<br />

前端不同项目模块使用了不同技术，大致三类：AngularJS、VueJS、ReactJS，并且前端有自己单独的服务器进行开发与部署。<br />

因为采用前后分离的方式，所以就会设计到跨域的问题，尤其是使用了spring-security权限框架后，问题就开发变得棘手，当然对security的不熟悉也是问题难以解决的根本原因。<bt />

于是乎，网上查阅了大量资料都没有解决，迫不得已查阅源码，各种尝试，再加上网上的资料，终于得以解决，为了防止忘记解决过程，所以决定做个记录，便于以后自己查阅，也可以帮助有同样困扰的小伙伴解决问题。<br />

## 解决方案

### 一、无权限校验的解决方案

如果没有使用类似与security这样的权限框架，那么比较好办，<br />
因为spring-mvc提供了跨域的基本支持，在mvc的配置文件中进行如下配置即可。<br />

```xml
<mvc:cors>
    <!-- 设置允许跨域访问的资源路径，这里全开发 -->
    <mvc:mapping path="/**"></mvc:mapping>
</mvc:cors>
```

配置这对便签的原理就是添加了几个CORS跨越资源访问响应头，以告知浏览器允许哪些域名和请求类型进行跨越访问，<br />
这几个响应头如下，如果乐意，自己通过response对象添加响应头也是可以的。<br />

#### CORS解释

CORS是一个W3C标准，全称是”跨域资源共享”（Cross-origin resource sharing）。 
它允许浏览器向跨源服务器，发出XMLHttpRequest请求，从而克服了AJAX只能同源使用的限制。

|响应头字段名称|作用|
|-|-|
| Access-Control-Allow-Origin     |	允许访问的客户端的域名
| Access-Control-Allow-Headers    |	允许服务端访问的客户端请求头
| Access-Control-Allow-Methods    |	允许访问的HTTP请求方法
| Access-Control-Max-Age          |	用来指定预检请求的有效期(秒)，在有效期内不在发送预检请求直接请求。
| Access-Control-Allow-Credentials|	是否允许请求带有验证信息

resp.setHeader("Access-Control-Allow-Origin", allowOrigin);
        resp.setHeader("Access-Control-Allow-Methods", allowMethods);

### 二、有用户权限

如果有用户权限，那么访问部分系统资源的一定需要先登陆才可以，所以就需要利用cookie技术，把SESSION_ID写到客户端，以达到身份辨别的目的。<br />

但是跨越如果设计到了用户认证，那么上面mvc的配置就无能无力了，因为它缺失了"Access-Control-Allow-Credentials"认证，那么这时候需要我们自己出马了。<br />

设置"Access-Control-Allow-Credentials"比较麻烦，因为需要客户端和服务的双向设置，下面会附上angularJS中$http发送请求的配置，以及jquery中ajax发送请求的配置，以及java中配置时需要的注意事项。<br />

#### AngularJS

```javascript
// post请求，第二个参数是请求体数据，第三个参数是配置项，配置withCredentials为true即可
$http.post(`${url}`, data, {withCredentials: true});
// post请求，第二个参数是配置项，配置withCredentials为true即可，如果有query参数在配置项中通过params添加
$http.post(`${url}`, {withCredentials: true, params: {id: id}});
```

#### Jquery.ajax

```javascript
// 主要是配置xhrFields:{withCredentials: true}
$.ajax(`${url}?page=1&size=5`,{
    type:"post",
    data: JSON.stringify({"name": ""},
    dataType: 'json',
    contentType: 'application/json',
    xhrFields:{withCredentials: true},
    crossDomain:true,
    success:function(data, status, xhr){})
};
```

#### Java

关键点一：配置自定义过滤器

因为进行权限控制，通常会使用一些第三方框架来实现，比如我这里使用了spring-security，那么所有的请求通常就会交由框架先处理，再交由我们根据框架的结果进行业务处理。<br />

我的解决方案是在web.xml中，配置一个自定义过滤器，让所有请求先走自己的过滤器，然后在过滤器中给所有请求手动添加CORS跨域响应头。<br />

有了用户认证后，响应头有两个注意点：<br />

1. 必须设置Access-Control-Allow-Credentials响应头为true <br />
2. Access-Control-Allow-Origin不再支持多个域名配置，也不再支持*号通配符，只能设置一个域名 <br />

很显然，这样的限制也是出于安全考虑，防止跨站攻击的。<br />

关键点二：处理option请求

解决了CORS问题后，笔者还遇到了一个问题，就是客户端在进行跨越请求时，通常会先发送一个option请求，测试服务端是否支持跨域。一旦这个option请求被权限框架拦截处理，那么就意味着请求失败，因为这个option请求不会携带任何数据与认证信息。<br/>

所以，除了添加CORS响应头，我们还应该在过滤器中进行判断，如果是option请求的话，那么直接返回给客户端200，不要走权限框架的任何逻辑与处理。<br />

经过这样的处理过后，客户端发送的option请求就有了正确的响应，并且因为添加了CORS响应头，所以客户端认为服务端支持跨域访问，可以正常发送诸如post, put等其他请求了。<br />

同时因为客户端和服务的都设置了Credentials为true，那么客户端就可以向服务端正常传递cookie信息，自此客户端就可以访问那些需要用户登陆或权限的资源了。<br />

##### 过滤器代码

```java
public class CorsFilter implements Filter {
    // 允许跨域访问的头信息
    private static String[] allowHeaders = {
            "WithCredentials",
            "Cookie",
            "Host",
            "Accept-Language",
            "Accept",
            "Accept-Encoding",
            "CrossDomain",
            "Content-Type",
            "Authorization",
            "X-Requested-With",
            "X-File-Name",
            "Cache-Control",
            "Access-Control-Allow-Origin",
            "Access-Control-Allow-Headers",
            "Access-Control-Allow-Methods",
            "*"
    };
    // 允许跨域访问的请求类型
    private static String allowMethods = "POST, GET, OPTIONS, DELETE ,PUT";
    // 允许跨域访问的域名
    private static String allowOrigin = "http://localhost:9527";

    /**
     * 添加跨域响应头
     * */
    protected void addCorsHeader(HttpServletResponse resp) {
        // 允许跨域资源访问
        resp.setHeader("Access-Control-Allow-Origin", allowOrigin);
        resp.setHeader("Access-Control-Allow-Methods", allowMethods);
        String headers = Arrays.toString(allowHeaders);
        resp.setHeader("Access-Control-Allow-Headers", headers.substring(0, headers.length() - 1).substring(1));

        // 允许跨域携带认证信息
        resp.setHeader("Access-Control-Allow-Credentials", "true");
        resp.setHeader("XDomainRequestAllowed", "1");
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) servletRequest;
        HttpServletResponse resp = (HttpServletResponse) servletResponse;

        addCorsHeader(resp);

        // options请求,添加跨域响应头后直接返回200
        if("OPTIONS".equals(req.getMethod())) {
            resp.getWriter().write("success!");
            return;
        }

        // 查看获取的到cookie
        Cookie[] cookies = req.getCookies();
        if(cookies != null) {
            for (Cookie cookie : cookies) {
                System.out.println(cookie.getName() + ":" + cookie.getValue());
            }
        }else {
            System.out.println("没有获取到任何cookie");
        }

        System.out.println("-----------------------------------自定义过滤器放行前logger-----------------------------------");
        filterChain.doFilter(servletRequest, servletResponse);
        System.out.println("-----------------------------------自定义过滤器结束-----------------------------------");
    }
}
```

关键点三：处理认证失败逻辑

以为看见代码就大功告成了？想太多！<br />

通过前面的配置，能够正常访问资源是有提前的，就是你需要先通过security提供的登陆页面进行登陆！因为这样客户端cookie才会存储SESSION_ID...<br />
是不是很无语，我也是啊!-_-!，接下来笔者还遇到了更无语的情况，待我慢慢道来。<br />

如果你没有通过security提供的登陆页面进行登陆，那么接下来需要权限的跨域请求都会失败，这是很显而易见的。<br />
但可恶的是security对与无权访问的资源会进行302重定向到登陆页，因为项目是前后分离的，请求全部是ajax异步的，所以浏览器并不会进行页面跳转，而是同样以异步的方式请求登陆页面，获取登陆页面的html数据，然后居然正常传递给了前端的回调函数....<br />

因为笔者使用了AngularJS这样的数据响应式框架，并夹杂了一些处理逻辑，拿到错误的数据进行渲染，组件渲染出现异常，重新初始化，然后触发了新的请求，又因为权限不足被重定向，就这样发生了请求死循环。<br />

接下来就是寻找解决办法，一个很容易想到的就是在前端进行判断，因为前端用了不同的技术，抽取统一的处理方式有很多工作要做，所以就想从后端入手，改变默认的重定义处理逻辑，最终找到了，下面附上测试成功的代码。<br />

```xml
<!-- 自定义入口点 -->
<bean id="authenticationEntryPoint" class="***.***.CustomAuthenticationEntryPoint"></bean>

<!-- 配置入口点 -->
<security:http use-expressions="false" entry-point-ref="authenticationEntryPoint">
    .....此处省略配置
</security:http>
```

```java
/**
 * 自定义认证入口点，如果用户未登陆或登陆失效，那么就会进入该入口进行处理，默认302重定向到登陆页，这里改为401
 * */
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException e) throws IOException, ServletException {

        // 响应数据编码与格式
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json; charset=utf-8");

        // 错误提示
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("success", false);
        jsonObject.put("message", "用户认证失败");

        // 返回401
        response.sendError(401, jsonObject.toJSONString());
        response.getWriter().flush();
    }
}
```

关键点四：处理授权失败逻辑

当用户未登陆或登陆失效时，会到入口点进行处理，但是当用户已登陆，然后无权限访问某资源时，就需要不同的处理。

```xml
<!--自己编写的授权失败处理类-->
<bean id="accessDeniedHandler" class="com.loulan.manage.security.CustomAccessDeniedHandler"></bean>

<security:http use-expressions="false" entry-point-ref="authenticationEntryPoint">
    <!-- 配置拒绝访问资源的处理器 --> 
    <security:access-denied-handler ref="accessDeniedHandler"></security:access-denied-handler>
</security:http>
```

```java
/**
 * 自定义授权失败处理器，当用户已经登陆，但是没有权限访问某资源时在这里进行处理
 * */
public class CustomAccessDeniedHandler extends AccessDeniedHandlerImpl implements AccessDeniedHandler {

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException e) throws IOException, ServletException {

        // 响应数据编码与格式
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json; charset=utf-8");

        // 错误提示
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("success", false);
        jsonObject.put("message", "您没有权限访问该资源");

        // 返回403
        response.sendError(403, jsonObject.toJSONString());
        response.getWriter().flush();
    }
}
```

关键点五：跨域登陆

终于到达最后一个要解决的问题了，我们的问题是在前端通过ajax的方式实现用户登陆，这个问题一旦解决那么就一路畅通无阻啦，哈哈O(∩_∩)O，只可惜的是现在还没有找到好的解决方案，不过倒是有了部分解决方案与点子。<br />

首先要解决的第一个问题是，security提供的登陆接口，无论是登陆成功还是失败，都会进行页面重定向，而我们需要的是返回json数据。<br />
那么就需要我们自己编写成功失败处理器，并进行配置，下面会附上配置与处理器代码。<br />

本以为解决了所有问题的我，发现了一个致命问题，就是登陆成功后客户端依然无法访问需要权限的资源，经过排查，原来是服务端无法向客户端写入cookie！ 什么？ 上面不是解决了吗！！！不是的，上面只是解决了服务端读客户端cookie的问题，但是服务端无法向客户端写入cookie，也就是说可读不可以写，也就是说跨域登陆无效！<br />

不过法子还是有的，那就是客户端登陆成功后，服务端通过响应头把sessionId传给客户端保存，然后客户端请求时再以同样的方式把sessionId传回来。
然后服务端还需要自己维护一个session容器，用于保存session对象，然后通过sessionID再获取，经测试这种方案行得通。<br />

那么只剩最后一个问题目前还没有解决，就是如何把这个session对象传给spring-security进行使用，或者自己实现登陆接口，利用该session对象进行权限验证，经过前面的调研应该是行得通的，可能比较麻烦，坑可能会比较多，等着我的好消息...，当然你要是有解决方案欢迎下方评论 <br />

```xml
<security:http use-expressions="false" entry-point-ref="authenticationEntryPoint">
    <security:form-login
        always-use-default-target="false"
        authentication-success-handler-ref="authenticationSuccessHandler"
        authentication-failure-handler-ref="authenticationFailureHandler"
    />
</security:http>
```

```java
public class AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    /**
     * Description: 如果是ajax请求则返回JSON，否则走默认的302重定向成功页面的处理方式
     * 返回的json数据结构：{"authorities":[{"authority":"ROLE_USER"}],"username":"feifei", "success": true, "msg": "登陆成功"}
     * */
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication auth) throws IOException, ServletException {

        // 响应数据编码与格式
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json; charset=utf-8");

        // 因为跨越无法set-cookie，所以通过响应头把sessionID传给客户端，并把session对象保存到自己的容器中
        String sessionId = request.getSession().getId();
        response.setHeader("JSESSIONID", sessionId);
        AuthenticationUserSessionContext.addSession(request.getSession());

        // 返回数据
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("authorities", auth.getAuthorities());
        jsonObject.put("username", auth.getName());
        jsonObject.put("success", true);
        jsonObject.put("message", "登陆成功");

        response.getWriter().print(jsonObject.toJSONString());
        response.getWriter().flush();
    }

}
```

```java
public class AuthenticationFailureHandler extends SimpleUrlAuthenticationFailureHandler {

    /**
     * Description: 如果是ajax请求则返回JSON，否则走默认的302重定向错误页面的处理方式
     * 返回的json数据结构：{"authorities":[],"username":"", "success": false, "msg": "账户或密码错误"}
     * */
    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {

        // 响应数据编码与格式
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json; charset=utf-8");

        // 返回数据
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("authorities", new ArrayList<>());
        jsonObject.put("username", "");
        jsonObject.put("success", false);
        jsonObject.put("message", exception.getCause() != null? exception.getCause(): "账户或密码错误");
        
        response.getWriter().print(jsonObject.toJSONString());
        response.getWriter().flush();
    }
}
```
