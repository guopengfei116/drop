## Map
- 新增的构造函数, 可创建新的`数据结构`, 结构类似与对象, 特点是`key值`可以为`对象`

#### 预览
| 名称 | 宿主 | 类型 |  作用 |
|       -       |    -    |    -   |
| size | Map | property | 集合成员数量 |
| set | Set.prototype | method | 通过key,value形式添加新值 |
| get | Set.prototype | method | 通过key取值 |
| delete | Set.prototype | method | 通过key删除值 |
| has | Set.prototype | method | 是否存在某个key |
| clear | Set.prototype | method | 清空所有值 |
| forEach | Set.prototype | method | 遍历值 |

#### 演示

#####  size

```javascript
let numMap = new Map([
    [new Date(), 100],
    [{}, 200]
]);
numMap.size  // 2
```

#####  set与get

```javascript
let obj = { name: '张三', age: 21 };

let map = new Map();
map.set(obj, '我不认识李四');
map.get(obj)   // '我不认识李四'
```

#####  delete

```javascript
let fibs = [1, 1, 2, 3, 5, 8];

let map = new Map();
map.set(fibs, '这是');
map.delete([1, 1, 2, 3, 5, 8]);  // false
map.delete(fibs);                  // true
```

#####  has

```javascript
let date = new Date();

let map = new Map();
numSet.has(date);  // false
numSet.set(date, '明月几时有,把酒问青天');
numSet.has(date);  // true
```

#####  clear

```javascript
let numMap = new Map([
    [new Date(), 100],
    [{}, 200]
]);
numMap.clear()  // {}
```

#####  forEach
    1. 用来接收值的回调 { function }
    2. 回调中的this指向  { any }

```javascript
let numMap = new Map([
    [new Date(), 100],
    [{}, 200]
]);
numMap.forEach((v, k) => console.log(v, k));
```

#####  支持for of

```javascript
let numMap = new Map([
    [new Date(), 100],
    [{}, 200]
]);

for(let v of numMap) {
    console.log(v);          // 100, 200
}
```

#### Map方法预览
![Map](./imgs/map.jpg)
