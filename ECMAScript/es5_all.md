# ECMAScript5

## 字符串扩展

#### 预览
| 名称 | 所属对象 | 作用 |
|       -       |    -    |    -   |
| charAt | Stirng.prototype | 返回指定下标的字符 |
| charCodeAt | Stirng.prototype | 返回指定下标元素的Unicode编码 |
| trim | Stirng.prototype | 去除首尾空白字符 |

#### 演示

- charAt
```javascript
var str = 'abcdef';
str.charAt(3);    // 'd'
```

- charCodeAt
```javascript
var str = 'abcdef';
str.charCodeAt( str.indexOf('c') );    // 99
```

- trim
```javascript
var str = ' lala ';
str.trim();    // 'lala'
```

## 数组扩展

#### 整体预览
| 所属对象 | 名称 | 作用 |
|       -       |    -    |    -   |
| Array|isArray | 检测对象是不是数组 |
| Array.prototype | indexOf | 返回给定元素索引，没有返回-1，正序遍历 |
| Array.prototype | lastIndexOf | 返回给定元素索引，没有返回-1，倒序遍历 |
| Array.prototype | forEach | 遍历数组 |
| Array.prototype | map | 原数组通过一定规则映射出新数组 |
| Array.prototype | filter | 找出符合条件的元素 |
| Array.prototype | every | 测试元素是否全部符合规则,有一个false就结束测试 |
| Array.prototype | some | 测试有没有元素符合规则,有一个true就结束测试 |
| Array.prototype | reduce | 通过多个值求出一个值，正序遍历 |
| Array.prototype | reduceRight | 通过多个值求出一个值，倒序遍历 |

#### 静态成员

- isArray

#### 实例成员

- indexOf

- lastIndexOf

- forEach

- map

- filter

- every

- some

- reduce

- reduceRight

## 对象扩展

#### 整体预览
| 所属对象 | 名称 | 作用 |
| Object | create | 创建拥有指定原型与属性的对象 |
| Object | keys | 获取所有可枚举的自有属性 |
| Object | getOwnPropertyNames | 获取所有的自有属性 |
| Object | getPrototypeOf | 获取对象的原型 |
| Object | preventExtensions | 禁止添加新属性 |
| Object | seal | 禁止添加删除属性，禁止修改属性特性 |
| Object | freeze | 禁止添加删除修改属性，禁止对象的任何改变 |
| Object | isExtensible | 是否可以添加新属性 |
| Object | isSealed | 不能添加删除属性？ |
| Object | isFrozen | 不能添加删除修改属性？ |
| Object | defineProperty | 定义或修改一个属性 |
| Object | defineProperties | 批量定义或修改属性 |
| Object | getOwnPropertyDescriptor | 获取一个自有属性的描述符 |
| Object | getOwnPropertyDescriptors | 获取全部自有属性的描述符 |

#### 静态成员

- Object.create()
    + @作用：创建对象，可自由设置对象的继承结构
    + @参数：
        1. ｛Object｝|| ｛null｝
```javascript
var proto = { v: 77 };
var obj = Object.create(proto);
obj.__proto__ === proto; // true
```

- Object.keys()
    + @作用：获取对象可枚举的自有属性
    + @参数：
        1. ｛Object｝
```javascript
Object.prototype.test = 'test';
var obj = { a: 1, b: 2 };
Object.keys(obj); // [ 'a', 'b' ]
Object.keys(Boolean.prototype); // [ ]
```

- Object.getOwnPropertyNames()
    + @作用：获取对象的自有属性
    + @参数：
        1. ｛Object｝
```javascript
Object.prototype.test = 'test';
var obj = { a: 1, b: 2 };
Object.getOwnPropertyNames(obj); // [ 'a', 'b' ]
Object.getOwnPropertyNames(Boolean.prototype); // [ 'constructor', 'toString', 'valueOf' ]
```

- Object.getPrototypeOf()
    + @作用：获取对象的原型
    + @参数：
        1. ｛Object｝
```javascript
var arr = [];
Object.getPrototypeOf(arr); // Array.prototype
```

- Object.preventExtensions()
    + @作用：禁止对象添加属性（不可扩展状态）
    + @参数：
        1. ｛Object｝
```javascript
var obj = {a: 1};
Object.preventExtensions(obj);
obj.b = 2; // 添加失败 {a:1}
```

- Object.seal()
    + @作用：禁止对象添加、删除属性（不可变化状态）
    + @参数：
        1. ｛Object｝
```javascript
var obj = {a: 1};
Object.seal(obj);
obj.b = 2; // 添加失败 {a: 1}
delete obj.a; // 删除失败 {a: 1}
```

- Object.freeze()
    + @作用：禁止对象添加、删除、修改属性（冻结状态）
    + @参数：
        1. ｛Object｝
```javascript
var obj = {a: 1};
Object.freeze(obj);
obj.b = 2; // 添加失败 {a: 1}
delete obj.a; // 删除失败 {a: 1}
obj.a = 100; // 修改失败 {a: 1}
```

- Object.isExtensible()
    + @作用：是否可以添加新属性（可扩展状态）
    + @参数：
        1. ｛Object｝
```javascript
var obj1 = {}, obj2 = {}, obj3 = {}, obj4 = {};
Object.preventExtensions(obj1);
Object.seal(obj2);
Object.freeze(obj3);
Object.isExtensible(obj1); // false
Object.isExtensible(obj2); // false
Object.isExtensible(obj3); // false
Object.isExtensible(obj4); // true
```

- Object.isSealed()
    + @作用：不能添加删除属性？（不可变化状态）
    + @参数：
        1. ｛Object｝
```javascript
// preventExtensions操作
var obj = {a: 1}, emptyObj = {};
Object.preventExtensions(obj);
Object.preventExtensions(emptyObj);
Object.isSealed(obj); // false，不能加新属性，但a属性可删除
Object.isSealed(emptyObj); // true，不能加新属性，没有属性可删除
```
```javascript
// seal操作
var obj = {a: 1}, emptyObj = {};
Object.seal(obj);
Object.seal(emptyObj);
Object.isSealed(obj); // true，不能加新属性，属性不可删除
Object.isSealed(emptyObj); // true，不能加新属性，属性不可删除
```
```javascript
// freeze操作
var obj = {a: 1}, emptyObj = {};
Object.freeze(obj);
Object.freeze(emptyObj);
Object.isSealed(obj); // true，不能加新属性，属性不可删除
Object.isSealed(emptyObj); // true，不能加新属性，属性不可删除
```

- Object.isFrozen()
    + @作用：不能添加删除修改属性？（冻结状态）
    + @参数：
        1. ｛Object｝
```javascript
// preventExtensions操作
var obj = {a: 1}, emptyObj = {};
Object.preventExtensions(obj);
Object.preventExtensions(emptyObj);
Object.isFrozen(obj); // false，不能加新属性，但a属性可删除可修改
Object.isFrozen(emptyObj); // true，不能加新属性，没有属性可删除可修改
```
```javascript
// seal操作
var obj = {a: 1}, emptyObj = {};
Object.seal(obj);
Object.seal(emptyObj);
Object.isFrozen(obj); // false，不能添加删除属性，但a属性可修改
Object.isFrozen(emptyObj); // true，不能添加删除属性，没有属性可修改
```
```javascript
// freeze操作
var obj = {a: 1}, emptyObj = {};
Object.freeze(obj);
Object.freeze(emptyObj);
Object.isFrozen(obj); // true，不能添加删除修改属性
Object.isFrozen(emptyObj); // true，不能添加删除修改属性
```

- defineProperty

- defineProperties

- getOwnPropertyDescriptor

- getOwnPropertyDescriptors

## 函数扩展

#### 整体预览
| 所属对象 | 名称 | 作用 |
|       -       |    -    |    -   |
| Function.prototype | bind | 返回一个绑定了this与实参的函数副本 |

#### 实例成员

- bind

## 日期扩展

#### 整体预览
| 所属对象 | 名称 | 作用 |
|       -       |    -    |    -   |
| Date | now | 返回当前时间到1970的毫秒值 |
| Date.prototype | toJSON | 本地模式格式化日期 |

#### 静态成员

- now

#### 实例成员

- toJSON

## JSON新增对象

#### 整体预览
| 所属对象 | 名称 | 作用 |
|       -       |    -    |    -   |
| JSON | parse | JSON（反序列化）转为对象 |
| JSON | stringify | 对象（序列化）转为JSON |

#### 静态成员

- parse

- stringify

## 严格模式

#### 整体预览
| 简述 | 表现 | 作用 |
|       -       |    -    |    -   |
| 变量声明 | 未声明的变量不允许使用，ReferenceError | 防止出乎意料的变量定义 |
| 函数this | 函数调用模式下this为undefined | 指向更为合理 |
| call&apply&bind | this的指向可以设为任意数据类型 | 表现更加简单明了 |
| eval作用域 | eval里声明的变量不再污染外面的作用域 | 防止变量覆盖等意外错误，提高性能 |
| arguments与参数解耦 | 修改任意一方的值都不会造成交叉感染 | 代码运行更加合理 |
| 禁用with | 使用with语句报SyntaxError | 提高代码执行效率 |
| 禁用八进制 | 使用0开头或\0开头定义八进制数将报SyntaxError | 提高代码执行效率 |
| 属性参数重名 | 出现属性重名或参数重名将报SyntaxError | 提高代码安全性 |
| 禁用arguments.callee与函数.caller | 使用报TypeError | 提高代码安全性 |
| 特殊标识符 | eval、arguments不能作为标识符使用 | 提高代码安全性 |
| 保留字标识符 | static、private、public、interface、package、protected、yield、implements不能作为标识符使用 | 为以后着想 |
