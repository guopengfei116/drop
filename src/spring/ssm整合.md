# SSM整合

SSH整合指的是基于Spring、SpringMVC、Mybatis三大框架搭建开发环境。

## 搭建过程

- 准备代码测试环境
- 使用spring并确保能够独立运行
- 使用springmvc并确保能够独立运行
- 融合spring与springmvc，让spring管理的对象能在springmvc中进行调用
- 使用mybatis并确保能够独立运行
- 融合spring与mybatis，让spring创建sqlSessionFactory，并把该工厂创建的mapper类融入spring容器进行管理

### 准备代码测试环境

1. 新建一个maven项目，配置pom.xml，导入所有依赖包

```xml
# spring系列
org.springframework > spring-core
org.springframework > spring-context
org.springframework > spring-beans
org.springframework > spring-expression
org.springframework > spring-aop
org.springframework > spring-aspects
org.springframework > spring-jdbc
org.springframework > spring-tx
org.springframework > spring-web
org.springframework > spring-webmvc

# 
```

2. 创建一张数据库表，将来测试mybatis

```sql
create table user(
id int primary key auto_increment,
name varchar(40),
money float
)ENGINE=InnoDB character set utf8 collate utf8_general_ci;
insert into account(name,money) values('小明',1000);
insert into account(name,money) values('小花',1000);
insert into account(name,money) values('小王',1000);
```

3. 编写实体类对象

```java
package cn.me.model;

public class User {
    private Integer id;
    private String name;
    private Float money;

    getters、setters...;
}
```

4. 编写持久层对象

```java
package cn.me.dao;
import ...;

public interface UserDao {
    List<User> findAllUsers();
    void saveUser(User user);
}
```

```java
package cn.me.dao.impl;
import ...;

public class UserDaoImpl implements UserDao {
    ...;
}
```

5. 编写业务层对象

```java
package cn.me.service;
import ...;

public interface UserService {
    List<User> findAllUsers();
    void saveUser(User user);
}
```

```java
package cn.me.service.impl;
import ...;

public class UserServiceImpl implements UserService {
    private UserDao userDao;
    
    public List<User> findAllUsers() {
        return userDao.findAllUsers();
    }

    public void saveUser(User user) {
        userDao.saveUser(user);
    }
}
```

6. 编写jsp页面，用以测试springmvc以及ssm整合后的效果

```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
    <head>
        <title>账户列表jsp页面</title>
    </head>
    <body>
        <table>
            <tr>
                <th>账户Id</th>
                <th>账户名称</th>
                <th>账户金额</th>
            </tr>
            <c:forEach items="${userList}" var="user">
                <tr>
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.money}</td>
                </tr>
            </c:forEach>
        </table>
    </body>
</html>
```

### 使用spring并确保能够独立运行

1. 编写spring配置文件

```xml
<beans xmlns...>
    <!-- 让spring检测并管理dao与service对象 -->
    <context:component-scan base-package="cn.me.dao"/>
    <context:component-scan base-package="cn.me.service"/>
</beans>
```

2. 改造持久层实现类

```java
package cn.me.dao.impl;
import ...;

@Repository("userDao")
public class UserDaoImpl implements UserDao {
    ...;
}
```

3. 改造业务层实现类

```java
package cn.me.service.impl;
import ...;

@Service("userService")
public class UserServiceImpl implements UserService {
    @Autowired
    private UserDao userDao;
    
    public List<User> findAllUsers() {
        return userDao.findAllUsers();
    }

    public void saveUser(User user) {
        userDao.saveUser(user);
    }
}
```

4. 测试

```java
package cn.me.test;
import ...;

public class SpringTest {
    public static void main(String[] args) {
        ApplicationContext context = new ClassPathXmlApplicationContext("classpath:spring/bean.xml");
        UserService userService = (UserService) context.getBean("userService");
        List<User> list = userService.findAllAccounts();
    }
}
```

### 使用springmvc并确保能够独立运行

1. 编写springmvc配置文件

```xml
<beans xmlns...>
    <!-- 让spring检测并管理controller对象 -->
    <context:component-scan base-package="cn.me.controller"/>"/>

    <!--注解驱动方式配置处理器映射器和处理器适配器-->
    <mvc:annotation-driven/>

    <!--配置视图解析器-->
    <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
        <property name="prefix" value="/WEB-INF/jsp/"/>
        <property name="suffix" value=".jsp"/>
    </bean>
</beans>
```

2. 在web.xml中配置spring提供的servlet

```xml
<web-app xmlns...>
    <servlet>
        <servlet-name>ssm</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        
        <!-- spring提供的Servler默认会加载WEB-INF下的xxx-servlet.xml配置文件, 并且一个servlet对应一个配置文件 -->
        <!-- 这里通过init-param标签自定义了spring-servlet的配置文件的地址 -->
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>classpath:spring/springmvc.xml</param-value>
        </init-param>

        <!-- 大于等于0表示在web容器启动的时候加载，小于0的时候在第一次请求时加载 -->
        <load-on-startup>1</load-on-startup>
    </servlet>

    <servlet-mapping>
        <servlet-name>ssn</servlet-name>
        <url-pattern>/</url-pattern>
    </servlet-mapping>
</web-app>
```

3. 添加表现层控制器

```java
package cn.me.controller;
import ...;

@Controller
public class UserController {
    private UserService userService;

    @RequestMapping("/user-list")
    public ModelAndView list() {
        // 老方式获取userService
        ApplicationContext context = new ClassPathXmlApplicationContext("classpath:bean.xml");
        UserService userService = (UserService) context.getBean("userService");
        List<User> userList = userService.findAllUsers();

        // 响应数据和视图
        ModelAndView mv = new ModelAndView();
        mv.setObject("userList", userList);
        mv.setViewName("user-list");
        return mv;
    }
}
```

4. 通过tomcat测试jsp能否正常打开

### 融合spring与springmvc，让spring管理的对象能在springmvc中进行调用

因为spring容器与springmvc容器是分离的，所以无法在UserController中通过注解注入userService。 <br />
有个最简单的方式是把原spring里的配置迁移到springmvc配置中，全部让springmvc容器进行管理。<br />
不过这样做的话这些对象便无法脱离springmvc单独调用，失去了一些灵活性，所以换个官方提供的方式。<br />
