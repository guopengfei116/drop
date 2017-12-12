## 数组

#### 预览
| 名称 | 宿主 | 类型 |  作用 |
|       -       |    -    |    -   |
| from | Array | method | 类数组转真数组 |
| find | Array.prototype | method | 寻找第一个符合条件的值，类似的filter方法找全部 |
| findIndex | Array.prototype | method | 寻找第一个符合条件的值的下标 |
| fill | Array.prototype | method | 重置数组中的值 |

#### 演示

#####  Array.from
1. 将类数组转为真数组
+ params: { ArrayLike, Function } 类数组, 回调
+ return: { Array }

```javascript
let likeArray = { 0: 'aa', 1: 'bb', 2: 'cc', length: 3 }
Array.from(likeArray);                       // [ 'aa', 'bb', 'cc' ]

let lis = document.querySelectorAll('li');
Array.from(lis);                                 // [ li, li, li, ... ]

let str = 'abc';
Array.from(str);                                 // [ 'a', 'b', 'c' ]

let nums = '123';
Array.from(nums, v => v * v);           // [ 1, 4, 9 ]
```

#####  Array.prototype.find
1. 找到第一个符合条件的值, 没有为undefined
2. filter方法找所有值，find只找一个值
+ params: { Function }
+ return: { any }

```javascript
[11, 22, 33, 44].find(v => v % 2 === 0);     // 22
[11, 22, 33, 44].find(v => v > 50);               // undefined
```

#####  Array.prototype.findIndex
1. 找到第一个符合条件的下标, 没有为undefined
+ params: { Function }
+ return: { number }

```javascript
[11, 22, 33, 44].find(v => v % 2 === 0);       // 22
[11, 22, 33, 44].find(v => v > 50);                 // undefined
```

#####  Array.prototype.fill
1. 重置数组中的元素, 通常用于设置数组的初始值
+ params: { any, number, number } 元素, 起始位置, 结束位置,包头不包尾
+ return: { Array } 原数组

```javascript
let arr = new Array(5);
arr.fill(1);                    // [ 1, 1, 1, 1, 1 ]
arr.fill(10, 2, 4);          // [ 1, 1, 10, 10, 1 ]
```

#### Array方法预览
![Array](./imgs/array.jpg)
