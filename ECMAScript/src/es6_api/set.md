## Set
#####  新增的构造函数, 可创建新的`数据结构`, 结构类似与数组, 特点是`值唯一`

#### 预览
| 名称 | 宿主 | 类型 |  作用 |
|       -       |    -    |    -   |
| size | Set | property | 集合成员数量 |
| add | Set.prototype | method | 添加某个值 |
| delete | Set.prototype | method | 删除某个值 |
| has | Set.prototype | method | 是否存在某个值 |
| clear | Set.prototype | method | 清空所有值 |
| forEach | Set.prototype | method | 遍历值 |

#### 演示

#####  size

```javascript
let numSet = new Set([2, 4, 6, 2, 4, 6]);  // { 2, 4, 5 }
numSet.size  // 3
```

#####  add

```javascript
let numSet = new Set([2, 4, 6]);
numSet.add(4);  // { 2, 4, 6 }
numSet.add(8)   // { 2, 4, 6, 8 }
```

#####  delete

```javascript
let numSet = new Set([10, 20, 30]);
numSet.delete(10);  // { 20, 30 }
```

#####  has

```javascript
let numSet = new Set([10, 20, 30]);
numSet.has(20);  // true
numSet.has(50);  // false
```

#####  clear

```javascript
let numSet = new Set([10, 20, 30]);
numSet.clear();  // {}
```

#####  forEach
    1. 用来接收值的回调 { function }
    2. 回调中的this指向  { any }

```javascript
let numSet = new Set([10, 20, 30]);
numSet.forEach(v => console.log(v));
```

#####  支持for of

```javascript
let numSet = new Set([10, 20, 30]);

for(let v of numSet) {
    console.log(v);          // 10, 20, 30
}
```

#####  合并数据并去重

```javascript
let arr1 = [ 1, 3, 5 ];
let arr2 = [ 5, 7, 9 ];
new Set([ ...arr1, ...arr2 ]);  // { 1, 3, 5, 7, 9 }
```

#####  下标取值

```javascript
let set = new Set([1, 3, 5, 1, 3, 5]);
let arr = [...set];    // 先转为数组, 再按照下标取值
```

```javascript
let set = new Set([1, 3, 5, 1, 3, 5]);
let arr = Array.from(set)    // 也可以通过数组from方法转数组
```

#### Set方法预览
![Set](./imgs/set.jpg)

