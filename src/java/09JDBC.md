# JDBC

> Java 数据库连接 (Java Data Base Connectiity) 技术是一种用于执行 SQL 语句的 Java API，<br />
> 可以为多种关系数据库提供统一访问，是一套操作数据类的接口规范。

## 作用

- 数据库厂商有很多，如果要用 Java 连接这些数据库，就需要根据不同数据库的特点编写对应的驱动程序，
- 为了让这些驱动程序使用方式一致，就有了 JDBC 规范。
- 通常情况下驱动程序一般由数据库厂商自己提供，以便让自己的产品支持更多语言，占有市场。

- - -

## 基本使用

以 Mysql 为例

### **导入驱动包**

导入要连接的数据库驱动 jar 包，一般会放置到 lib 目录下，然后 build path

### **注册驱动**

告诉JVM使用哪个数据库驱动程序

- JDBC 规范定义驱动接口 java.sql.Driver
- JDBC 提供了工具类 DriverManager，有个 registerDriver 方法用来注册驱动，传入 Driver 实现类即可注册

#### Mysql举例

```java
// 方式一
// Driver 类内部的静态代码块会自动注册驱动，这样相当与驱动被注册了两次
import java.sql.DriverManager;
DriverManager.registerDriver(new com.mysql.jdbc.Driver());

//  方式二
// 避免驱动被注册两次
try {
  Class.forName("com.mysql.jdbc.Driver");
}catch (ClassNotFoundException e) {
  e.printStackTrace();
}
```

### **连接数据库**

- JDBC 规定 url 由三部分组成，每个部分中间使用冒号分隔
- 第一部分固定为 jdbc
- 第二部分为数据库名称
- 第三部分由数据库厂商规定

```java
import java.sql.DriverManager;

String url = "jdbc:mysql://localhost:3306/mydb"
String username = "root";
String password = "123456";
Connection con = DriverManager.getConnection(url, username, password);
```

### **获取执行平台**

通过连接对象获取能执行SQL语句的对象

```java
import java.sql.Statement;
Statement st = con.createStatement();
```

### **执行SQL**

如果是查询语句那么得到一个结果集，如果是增删改那么得到数据变化数量

#### executeUpdate

执行 insert update delete 语句，返回被修改数据的数量

```java
String sql = "inset into tableName values(null, xx, xx)";
num count = st.executeUpdate(sql);

// 是否成功
if (num > 0) {
  System.out.print("操作成功");
}
```

#### executeQuery

执行 select 语句，返回结果集

```java
import java.sql.ResultSet;
String sql = "select * from tableName";
ResultSet rs = st.executeUpdate(sql);

// 读取结果数据
while (rs.next()) {
  System.out.print(rs.getInt("id"));
  System.out.print(rs.getString("username"));
}
```

### **释放资源**

释放各种内存，最好是先得到的后关闭，后得到的先关闭

```java
import java.sql.SQLException;

// 释放结果集
if (rs != null) {
  try {
    rs.close();
  } catch (SQLException e) {
    e.printStackTrace();
  }
}

// 释放执行器
if (st != null) {
  try {
    st.close();
  } catch (SQLException e) {
    e.printStackTrace();
  }
}

// 释放连接
if (con != null) {
  try {
    con.close();
  } catch (SQLException e) {
    e.printStackTrace();
  }
}
```

- - -

## 防止 SQL 注入

> SQL 注入是指用户恶意输入一些具有特殊含义的 SQL 代码，以扰乱程序正常运行
> 通过 SQL 注入可绕过一些安全检查，以及窃取重要数据

### **测试用例**

```java
// 通过错误的密码成功拿到用户信息
getUserInfo("'root' or '1=1'", "'xxx'");   // 利用或运算
getUserInfo("'root'", "'xxx' or '1=1'");   // 利用或运算
getUserInfo("'root' -- ", "'xxx'");           // 利用SQL注释
```

### **可被注入**

- 先通过字符串拼接得到完整的 SQL 语句，然后再执行
- 这样在拼接的时候如果不做限制，那么很容易被注入恶意的 SQL 脚本

```java
public ResultSet getUserInfo(username, password) {
  // 预设SQL语句
  String sql = "select * from user where username =" + username + "and password =" + password;

  //  获取SQL执行器
  Class.forName("com.mysql.jdbc.Driver");
  Statement st = DriverManager.getConnection().createStatement();

  // 返回查询结果
  return st.executeQuery(sql);
}
```

### **不可被注入**

- PrepareStatement 接口提供了 SQL 预编译功能，可以提前设定 SQL 执行模式或模板
- 然后后续补充 SQL 中的变化数据即可，这些数据不会被当作 SQL 语句执行

```java
public ResultSet getUserInfo(username, password) {
  // 预设SQL语句
  String sql = "select * from user where username =" + username + "and password =" + password;

  //  获取SQL预编译执行器
  Class.forName("com.mysql.jdbc.Driver");
  PrepareStatement pst = DriverManager.getConnection().prepareStatement(sql);

  // 设置SQL参数
  pst.setString(1, username);
  pst.setString(2, password);

  // 返回查询结果
  return pst.executeQuery();
}
```

- - -

## 批处理

> 每次执行1条语句比较繁琐也比较慢，JDBC 允许批量执行，但查询语句除外

### **混合操作**

混合操作使用 Statement 执行器对象，存在注入漏洞，最好是写死的数据操作，用于初始化工作

```java
// 增删改各种SQL语句
String[] sqls = {
  "create database example",
  "use example",
  "create table user (id int primary key auto_increment, name varchar(20))",
  "insert into user values (null, 'aa')",
  "insert into user values (null, 'bb')",
  "insert into user values (null, 'cc'), (null, 'dd')",
  "update user set name = 'BB' where id = 2",
  "delete from user where id = 3",
  "drop table user",
  "drop database example"
};

//  添加批处理
for (String sql: sqls) {
  st.addBatch(sql);
}

// 执行批处理，返回每条语句操作数据的数量
int[] results = st.executeBatch(); // [1, 0, 0, 1, 1, 2, 1, 1, 0, 0]
st.clearBatch();
```

### **单一操作**

单一语种操作可以使用 PrepareStatement 预编译对象，不存在注入漏洞

```java
// 预设SQL语句
String sql = "insert into user values (null, ?)";

// 预编译SQL
PrepareStatement pst = con.prepareStatement(sql);

// 添加批处理
for (int i = 1; i <= 1000; i++) {
  pst.setString(1, "name" + i);
  pst.addBatch();
}

// 执行批处理
int[] results =pst.executeBatch(); // [1, 0, 0, 1, 1, 2, 1, 1, 0, 0];
pst.clearBatch();
```

- - -

## 工具类封装

```java
public class JDBCUtil {
  private static final String propertiesFilePath;
  private static final String driverClassName;
  private static final String url;
  private static final String username;
  private static final String password;

  //  从配置文件中读取信息
  static {
    Properties prop = new Properties();
    try {
      prop.load(new FileInputStream(propertiesFilePath));
    } catch (IOException e) {
      e.printStackTrace();
    }

    driverClassName = prop.getProperty("driverClassName");
    url = prop.getProperty("url");
    username = prop.getProperty("username");
    password = prop.getProperty("password");
  }

  // 注册驱动
  public static void loadDriver() {
    try {
      Class.forName(driverClassName);
    } catch(ClassNotFoundException e) {
      e.printStackTrace();
    }
  }

  // 获取连接对象
  public static Connection getConnection() {
    Connection con = null;
    try {
      loadDriver();
      con = DriverManager.getConnection();
    } catch(Exception e) {
      e.printStackTrace();
    }

    return con;
  }

  // 释放资源
  public static void release(Statement st, Connection con) {
    if(st != null) {
      try {
        st.close();
      } catch(SQLException e) {
        e.printStackTrace();
      }
    }

    if(con != null) {
      try {
        con.close();
      } catch(SQLException e) {
        e.printStackTrace();
      }
    }
  }

  // 释放资源
  public static void release(ResultSet rs, Statement st, Connection con) {
    release(st, con);

    if(rs != null) {
      try {
        rs.close();
      } catch(SQLException e) {
        e.printStackTrace();
      }
    }
  }
}
```

- - -

## 事务

> 业务逻辑上的一组操作，用以实现某个功能，具有原子性；
> 所以这些操作必须全部执行成功，如果有一个失败，那么整体都应该给失败

### **API**

| 名字 | 返回值 | 描述 |
|   -    |     -      |    -    |
| setAutoCommit | void | 设置自动提交 |
| commit              | void | 提交 |
| rollback              | void | 回滚 |

### **使用**

```java
try {
  // 获取数据库连接
  con = JDBCUtil.getConnect();

  // 关闭自动提交
  con.setAutoCommit(false);

  // 预编译sql
  String sql = "update user set money = ? where id = ?"
  pst = con.prepareStatement(sql);

  // 完成一个事务操作
  pst.setDouble(1, -100);
  pst.setInt(1, 10);
  pst.executeUpdate();

  pst.setDouble(1, 100);
  pst.setInt(1, 20);
  pst.executeUpdate();

  // 手动提交
  con.committ();
}
// 如果事务执行失败，那么回滚数据
catch(Exception e) {
  try {
    con.rollback();
  } catch(SQLException e1) {
    e.printStackTrace();
  }
}
// 释放资源
finally {
  JDBCUtil.release(pst, con);
}
```

- - -

## 总结

### JDBC 查询步骤

1. 加载驱动
2. 创建连接
3. 定义sql
4. 创建Statement对象
5. 设置参数
6. 执行sql
7. 处理结果集
8. 关闭资源

```java
Connection con = null;
PreparedStatement psmg = null;
ResultSet rs = null;

// DriverManager.registerDriver(new com.mysql.jdbc.Driver());
// 通过反射加载驱动，变成字符串，可从配置文件中读取，避免写死
Class.forName("com.mysql.jdbc.Driver");

con = DriverManager.getConnection("jdbc:mysql://localhost:3306/cust", "root", "13456");

String sql = "select * from ?";

psmt = con.prepareStatement(sql);

psmt.setString(1, "customer");

rs = psmt.executeQuery();

while(rs.next()) {
  System.out.println(rs.getInt("cust_id") + "" + rs.getString("cust_name"));
}

if(rs != null) con.close();
if(psmt != null) psmt.close();
if(con != null) con.close();
```
