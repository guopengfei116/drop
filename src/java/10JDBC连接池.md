# 数据库连接池

> 连接池是创建和管理多个连接的缓冲技术
> 需要连接时从池中获取，使用完毕后归还给池，可节省连续创建与销毁连接的开销

## 连接池简单实现

### **连接装饰类**

通常我们拿到的连接对象再使用完毕后会调用 close 方法进行销毁<br />
这里我们需要让它回归到连接池复用，所以自己实现一个连接增强类，让这个类实现 Connection 接口<br />
然后覆写 close 方法，但是 Connection 接口定义了很多方法必须都实现<br />
为了避免这个问题，我们搞一个中间模板类去实现全部方法，方法内部调用连接对象以实现的方法即可<br/>
然后我们的装饰类去继承这个中间模板类，重写 close 方法即可<br />

#### 中间模板类

```java
public class ConnectionWrapper implements Connection {
  private Connection con;

  public ConnectionWrapper(Connection con) {
    this.con = con;
  }

  @Override
  public PreparedStatement prepareStatement(String sql) throws SQLException {
    return con.prepareStatement(sql);
  }

  @Override
  ...
}
```

#### 装饰类

```java
// 实例化时需要拿到连接池与连接，将来连接调用close方法时自动归还到连接池
public class MyConnectionWrapper extends ConnectionWrapper {
  private Connection con;
  private ArrayList<Connection> conList;

  // 拿到连接和池
  public MyConnectionWrapper(Connection con, ArrayList<Connection> conList) {
    super(con);
    this.con = con;
    this.conList = conList;
  }

  @Override
  // 重写，销毁改为归还连接池
  public void close() {
    conList.add(con);
  }
}
```

### **连接池**

基于装饰类进行实现，该类对连接对象的销毁方法进行了重写，从销毁变为回收<br/>

```java
public class MyDataSource implements DataSource {
  private static final String propertiesFilePath = "config/jdbc.properties";
  private static final String driverClassName;
  private static final String url;
  private static final String username;
  private static final String password;
  private static int initial = 3;
  private ArrayList<Connection> conList = new ArrayList<Connection>();

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

    loadDriver();
  }

  // 注册驱动
  private static void loadDriver() {
    try {
      Class.forName(driverClassName);
    } catch(ClassNotFoundException e) {
      e.printStackTrace();
    }
  }

  //  构造器，初始化时创建连接放入连接池
  public MyDataSource() {
    for(int i = 1; i <= initial; i++) {
      try {
        conList.add(DriverManager.getConnection(url, username, password));
      } catch(SQLException e) {
        e.printStackTrace();
      }
    }
  }

  @Override
  // 返回增强后的连接
  public Connection getConnection() {
    return new MyConnectionWrapper(conList.remove(0), conList);
  }

  @Override
  ...
}
```

- - -

## Druid

> 阿里旗下的开源连接池产品，除了基本的缓冲技术，还提供了各种监控与性能统计 API
> Druid 可与 Spring 进行快速整合，这里只演示该产品连接池的基本使用

### **手动设参方式**

```java
Connection con = null;
PreparedStatement pst = null;

try {
  // 创建连接池，设置参数，获取一个连接
  DruidDataSource dataSource = new DruidDataSource();
  dataSource.setDriverClassName("com.mysql.jdbc.Driver");
  dataSource.setUrl("jdbc:mysql:///test");
  dataSource.setUsername("root");
  dataSource.setPassword("123456");
  con = dataSource.getConnection();

  // 预编译SQL
  String sql = "update user set name = ?  where id = ?";
  pst = con.prepareStatement(sql);
  pst.setString(1, "newName");
  pst.setString(2, 10);

  // 执行SQL
  int result = pst.executeUpdate();
  if(result > 0) {
    System.print.out("操作成功");
  }
} catch(Exception e) {
  e.printStackTrace();
} finally {
  JDBCUtil.release(pst, con);
}
```

### **配置文件方式**

properties 配置文件

```properties
driverClassName=com.mysql.jdbc.Driver
url=jdbc:mysql://localhost:3306/test
username=root
password=123456
```

实现代码

```java
Connection con = null;
PreparedStatement pst = null;

try {
  // 获取参数
  Properties properties = new Properties();
  properties.load(new FileInputStream("config/druid.properties"));

  // 创建连接池，设置参数，获取一个连接
  DataSource dataSource = DruidDataSourceFactory.createDataSource(properties);
  con = dataSource.getConnection();

  // 预编译SQL
  String sql = "update user set name = ?  where id = ?";
  pst = con.prepareStatement(sql);
  pst.setString(1, "newName");
  pst.setString(2, 10);

  // 执行SQL
  int result = pst.executeUpdate();
  if(result > 0) {
    System.print.out("操作成功");
  }
} catch(Exception e) {
  e.printStackTrace();
} finally {
  JDBCUtil.release(pst, con);
}
```

- - -

## C3P0

> Apache 基金会下的开源 JDBC 连接池，实现了数据源和 JNDI 绑定
> 支持 JDBC3 规范和 JDBC2 的标准扩展，在 Hibenate 与 Spring 项目中都有使用

### **手动设参方式**

```java
Connection con = null;
PreparedStatement pst = null;

try {
  // 创建连接池，设置参数，获取一个连接
  ComboPooledDataSource dataSource = new ComboPooledDataSource();
  dataSource.setDriverClass("com.mysql.jdbc.Driver");
  dataSource.setJdbcUrl("jdbc:mysql:///test");
  dataSource.setUser("root");
  dataSource.setPassword("123456");
  con = dataSource.getConnection();

  // 预编译SQL
  String sql = "update user set name = ?  where id = ?";
  pst = con.prepareStatement(sql);
  pst.setString(1, "newName");
  pst.setString(2, 10);

  // 执行SQL
  int result = pst.executeUpdate();
  if(result > 0) {
    System.print.out("操作成功");
  }
} catch(Exception e) {
  e.printStackTrace();
} finally {
  JDBCUtil.release(pst, con);
}
```

### **配置文件方式**

xml 配置文件

```xml
<?xml version="1.0" encoding="utf-8" ?>
<c3p0-config>
  <default-config>
    <property name="driverClass">com.mysql.jdbc.Driver</property>
    <property name="jdbcUrl">jdbc:mysql:///test</property>
    <property name="user">root</property>
    <property name="password">123456</property>

    <property name="initialPoolSize">5</property>
    <property name="minPoolSize">5</property>
    <property name="maxPoolSize">20</property>
  </default-config>
</c3p0-config>
```

实现代码

```java
Connection con = null;
PreparedStatement pst = null;

try {
  // 创建连接池，设置参数，获取一个连接
  // 创建实例时，默认会去类所在的包下找 c3p0-config.xml 配置文件
  ComboPooledDataSource dataSource = new ComboPooledDataSource();
  con = dataSource.getConnection();

  // 预编译SQL
  String sql = "update user set name = ?  where id = ?";
  pst = con.prepareStatement(sql);
  pst.setString(1, "newName");
  pst.setString(2, 10);

  // 执行SQL
  int result = pst.executeUpdate();
  if(result > 0) {
    System.print.out("操作成功");
  }
} catch(Exception e) {
  e.printStackTrace();
} finally {
  JDBCUtil.release(pst, con);
}
```

## 基于连接池二次封装

> 连接池一般只需要一个，所以内部会自动创建，并提供一个获取连接的方法
> 同时对资源释放操作进行了封装，方便用户使用

```java
public class JDBCUtil {
  private static final ComboPooledDataSource dataSource = new ComboPooledDataSource();

  // 获取池
  public static DataSource getDataSource() {
    return dataSource;
  }

  // 获取连接
  public static Connection getConnection() {
    return dataSource.getConnection();
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

## 基于连接池封装工具类

### **测试用例**

```java
Connection con = null;
PreparedStatement pst = null;
MyDataSource dataSource = null;

try {
  // 创建连接池，获取一个连接
  con = JDBCUtil.getConnection();

  // 预编译SQL
  String sql = "update user set name = ?  where id = ?";
  pst = con.prepareStatement(sql);
  pst.setString(1, "newName");
  pst.setString(2, 10);

  // 执行SQL
  int result = pst.executeUpdate();
  if(result > 0) {
    System.print.out("操作成功");
  }
} catch(Exception e) {
  e.printStackTrace();
} finally {
  JDBCUtil.release(pst, con);
}
```

- - -

### **实现**

```java
public class JDBCUtil {
  // 创建连接池
  private static final ComboPooledDataSource dataSource = new ComboPooledDataSource();

// 获取连接
  public static Connection getConnection() throws SQLException {
    return dataSource.getConnection();
  }

  // 获得连接池
  public static DataSource getDataSource() {
    return dataSource;
  }

  // 释放资源
  public static void release(Statement st, Connection con) {
    if (st != null) {
      try {
        st.close();
      } catch (SQLException e) {
        e.printStackTrace();
      }
    }

    if (con != null) {
      try {
        con.close();
      } catch (SQLException e) {
        e.printStackTrace();
      }
    }
  }

  // 释放资源重载
  public static void release(ResultSet rs, Statement st, Connection con) {
    if (rs != null) {
      try {
        rs.close();
      } catch (SQLException e) {
        e.printStackTrace();
      }
    }

    release(st, con);
  }
}
```
