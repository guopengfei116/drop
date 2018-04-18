## 对象

#### 预览
| 名称 | 宿主 | 类型 |  作用 |
|       -       |    -    |    -   |
| is | Object | method | 全等运算符的方法实现，但NaN与NaN相等，-0与+0不等 |
| assign | Object | method | 对象浅拷贝 |
| keys | Object | method | 获取自身所有可枚举的key |
| values | Object | method | 获取自身所有可枚举的value |
| entries | Object | method | 获取自身所有可枚举的key与value |
| getPrototypeOf | Object | method | 获取对象继承的原型 |
| setPrototypeOf | Object | method | 设置对象继承的原型 |

#### 演示

#####  Object.is

```javascript
Object.is(123, "123");  // false
Object.is(-0, 0);  // false
Object.is(NaN, NaN);  // true
```

#####  Object.assign
1. 把后面N个对象的属性复制到第一个对象身上
2. 该方法为浅拷贝
+ params: { Object, ...Object } 目标对象, 被拷贝对象
+ return: { Object } 第一个对象

```javascript
let o1 = { a: 1, b: 2 };
let o2 = { c: 3, d: 4 };
Object.assign(o1, o2);  // { a:1, b: 2, c:3, d: 4 }
```

#####  Object.keys`ES5`
1. 获取自身可枚举的属性
+ params: { Object } 目标对象
+ return: { Array }

```javascript
let obj = { a: 11, b: 22, c: 33 };
Object.keys(obj);       // [ 'a', 'b', 'c' ]
```

#####  Object.values
1. 获取自身可枚举的属性值
+ params: { Object } 目标对象
+ return: { Array }

```javascript
let obj = { a: 11, b: 22, c: 33 };
Object.values(obj); // [ 11, 22, 33 ]
```

#####  Object.entries

```javascript
let obj = { a: 11, b: 22, c: 33 };
Object.entries(obj);    // [ [ 'a', 11 ], [ 'b', 22 ], ['c', 33] ]
```

#####  Object.getPrototypeOf

```javascript
let arr = [];
Object.getPrototypeOf(arr);  // Array.prototype
```

#####  Object.setPrototypeOf

```javascript
let arr = [];
Object.setPrototypeOf(arr, { a: 11, b: 22 });
arr.a        // 11
arr.slice  // undefined
```
