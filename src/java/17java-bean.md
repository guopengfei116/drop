# JavaBean

在开发当中，有很多表示不同数据模型的类，为了提供公共的接口操作这些类，有了JavaBean规范<br />
简单说就是将需要操作的数据封装为一个类，并提供操作方法，就是一个非标准的 JavaBean

## 标准规范

- 类使用公共进行修饰
- 提供私有修饰的成员成员
- 为成员变量提供公共getter与setter方法
- 提供公共无参构造

- - -

## BeanUtils

Apache Commons 组件库中的一个组件，对常见的 JavaBean 操作需求进行了封装<br />
BeanUtils 工具包依赖与 logging 包，在使用时需要一起导入<br />

### **getProperty**

获取属性值，底层通过 getter 方法实现<br />
static String getProperty(Object bean, String name)

```java
Person p = new Person("关羽", 100);
String name = BeanUtils.getProperty(p, "name");
System.out.println(name);   // 关羽
```

### **setProperty**

修改属性值，底层通过 setter 方法实现<br />
static void setProperty(Object bean, String name, Object value)

```java
Person p = new Person("关羽", 100);
BeanUtils.setProperty(p, "name", "张飞");
System.out.println(p);        // Person [name=张飞, age=100]
```

### **populate**

批量修改属性值，底层通过 setter 方法实现<br />
static void populate(Object bean, Map properties)

```java
// 测试数据
Map<String, Object> props = new HashMap<String, Object>();
props.put("name", "刘备");
props.put("age", 111);

// 批量修改
Person p = new Person("关羽", 100);
BeanUtils.populate(p, props);
System.out.println(p);        // Person [name=刘备, age=111]
```

- - -

## 自己实现 BeanUtils

自己实现没有完全按照规范来，内部直接操作成员变量实现获取与修改

### **测试用例**

```java
Person p = new Person("关羽", 88);

// 测试数据源
Map<String, Object> map = new HashMap<String, Object>();
map.put("name", "张飞");
map.put("age", 99);

// 调用封装方法批量修改
MyBeanUtils.populate(p, map);
System.out.println(p);                    // Person [name=张飞, age=99]

// 测试数据源
ArrayList<String> propNames = new ArrayList<String>();
propNames.add("name");
propNames.add("age");

// 调用封装方法批量获取
ArrayList<Object> values = MyBeanUtils.getPropertys(p, propNames);
System.out.println(values);            // [张飞, 99]
```

### **实现**

```java
public class BeanUtils {
  private BeanUtils() {}

  //  获取1个属性值
  public static Object getProperty(Object bean, String name) throws ReflectiveOperationException {
    Class clazz = bean.getClass();
    Field f = clazz.getDeclaredField(name);
    f.setAccessible(true);
    return f.get(bean);
  }

  // 获取多个属性值
  public static ArrayList<Object> getPropertys(Object bean, ArrayList<String> propNames) throws ReflectiveOperationException {
    ArrayList<Object> values = new ArrayList<Object>();
    for (String propName : propNames) {
      values.add(getProperty(bean, propName));
    }
    return values;
  }

  // 修改1个属性值
  public static void setProperty(Object bean, String  name, Object value) throws ReflectiveOperationException  {
    Class clazz = bean.getClass();
    Field f = clazz.getDeclaredField(name);
    f.setAccessible(true);
    f.set(bean, value);
  }

  // 修改多个属性值
  public static void populate(Object bean, Map<String, Object> map) throws ReflectiveOperationException {
    Class clazz = bean.getClass();
    for (Entry<String, Object> entry : map.entrySet()) {
      setProperty(bean, entry.getKey(), entry.getValue());
    }
  }
}
```
