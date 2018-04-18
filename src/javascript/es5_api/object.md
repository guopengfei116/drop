## 对象

#### 整体预览
| 所属对象 | 名称 | 作用 |
|       -       |    -    |    -   |
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
