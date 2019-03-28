# ES6新增常用API

## 数字

#### 预览
| 名称 | 宿主 | 类型 |  作用 |
|       -       |    -    |    -   |
| isInteger | Number | method | 是不是整数，小数点后为0的也算，比如2.0 |
| isNaN | Number | method | 是不是NaN |
| isFinite | Number | method | 是不是非无穷的数字 |
| parseInt | Number | method | 字符串转整数，原本全局的方法的转移 |
| parseFloat | Number | method | 字符串转浮点数，原本全局的方法的转移 |

#### 演示

- Number.isInteger
```javascript
Number.isInteger(100); // true
Number.isInteger(100.0); // true
Number.isInteger(100.1); // false
```

- Number.isNaN
```javascript
Number.isNaN(123); // false
Number.isNaN(NaN); // true
Number.isNaN("abc"); // false
Number.isNaN([ 'a', 'b', 'c' ]); // false
```

- Number.isFinite
```javascript
Number.isFinite(100); // true
Number.isFinite(Infinity); // false
Number.isFinite("100"); // false
```

- Number.parseInt
```javascript
Number.parseInt("100.123", 10); // 100
Number.parseInt("100.123", 2); // 4
Number.parseInt("100.123", 8); // 64
Number.parseInt("100.123", 16); // 256
```

- Number.parseFloat
```javascript
Number.parseFloat("100.123"); // 100.123
Number.parseFloat("10PPP0.123"); // 10
```

## 字符串

#### 预览
| 名称 | 宿主 | 类型 |  作用 |
|       -       |    -    |    -   |
| fromCodePoint | String | method | 通过Unicode码点求字符，支持大于0xFFFF编码字符 |
| codePointAt | String.prototype | method | 获取指定下标字符的Unicode码点，支持大于0xFFFF编码字符 |
| at | String.prototype | method | 获取指定下标的字符，可正确获取大于0xFFFF编码的字符 |
| includes | String.prototype | method | 是否包含指定字符串 |
| startsWith | String.prototype | method | 起始位置是否包含指定字符串 |
| endsWith | String.prototype | method | 结束位置是否包含指定字符串 |
| repeat | String.prototype | method | 重复字符串多次 |

#### 演示

- String.fromCodePoint

```javascript
String.fromCodePoint(97); // "a"
String.fromCodePoint(0x61); // "a"
String.fromCodePoint(19968); // "一"
String.fromCodePoint(0x4e00); // "一"
```

- String.prototype.codePointAt

```javascript
let str = 'ABCD一二三四';
str.codePointAt(0); // 65
str.codePointAt(4); // 19968
```

- String.prototype.at

```javascript
let str = 'ABCD一二三四';
str.at(0); // "A"
str.at(4); // "一"
```

- String.prototype.includes
    1. 要检测的字符串 { string }
	2. 起始位置 { number }

```javascript
let str = 'abcde';
str.includes('abc'); // true
str.includes('bcd'); // true
str.includes('bcd', 2); // false
```

- String.prototype.startsWith
    1. 要检测的字符串 { string }
	2. 起始位置 { number }

```javascript
let str = 'abcde';
str.startsWith('abc'); // true
str.startsWith('bcd'); // false
str.startsWith('bcd', 1); // true
```

- String.prototype.endsWith
    1. 要检测的字符串 { string }
	2. 结束位置,包头不包尾 { number }

```javascript
var str = 'abcde';
str.endsWith('cde'); // true
str.endsWith('cde', 0); // false
str.endsWith('cde', 5); // true
```

- String.prototype.repeat

```javascript
"abc".repeat(3); // "abcabc"
"123".repeat(4); // "123123123123"
```

## 数组

#### 预览
| 名称 | 宿主 | 类型 |  作用 |
|       -       |    -    |    -   |
| from | Array | method | 类数组转真数组 |
| find | Array.prototype | method | 寻找第一个符合条件的值，类似的filter方法找全部 |
| findIndex | Array.prototype | method | 寻找第一个符合条件的值的下标 |
| fill | Array.prototype | method | 重置数组中的值 |

#### 演示

- Array.from
    1. 类数组
    2. 与map功能一样的回调

```javascript
var likeArray = { 0: 'aa', 1: 'bb', 2: 'cc', length: 3 }
Array.from(likeArray); // [ 'aa', 'bb', 'cc' ]

var lis = document.querySelectorAll('li');
Array.from(lis); // [ li, li, li, ... ]

var str = 'abc';
Array.from(str); // [ 'a', 'b', 'c' ]

var nums = '123';
Array.from(nums, v => v * v); // [ 1, 4, 9 ]
```

- Array.prototype.find

```javascript
[11, 22, 33, 44].find(v => v % 2 === 0); // 22
[11, 22, 33, 44].find(v => v > 50); // undefined
```

- Array.prototype.findIndex

```javascript
[11, 22, 33, 44].find(v => v % 2 === 0); // 1
[11, 22, 33, 44].find(v => v > 50); // undefined
```

- Array.prototype.fill
    1. 重置默认值 { any }
    2. 起始位置 { number }
    3. 结束位置,包头不包尾 { number }

```javascript
var arr = new Array(5);
arr.fill(1); // [ 1, 1, 1, 1, 1 ]
arr.fill(10, 2, 4); // [ 1, 1, 20, 20, 1 ]
```

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

- Object.is

```javascript
Object.is(123, "123");  // false
Object.is(-0, 0);  // false
Object.is(NaN, NaN);  // true
```

- Object.assign
    1. 目标对象
    2. 被拷贝对象

```javascript
var o1 = { a: 1, b: 2 };
var o2 = { c: 3, d: 4 };
Object.assign(o1, o2); // o1 => { a:1, b: 2, c:3, d: 4 }
```

- Object.keys`ES5`

```javascript
var obj = { a: 11, b: 22, c: 33 };
Object.keys(obj); // [ 'a', 'b', 'c' ]
```

- Object.values

```javascript
var obj = { a: 11, b: 22, c: 33 };
Object.values(obj); // [ 11, 22, 33 ]
```

- Object.entries

```javascript
var obj = { a: 11, b: 22, c: 33 };
Object.entries(obj); // [ [ 'a', 11 ], [ 'b', 22 ], ['c', 33] ]
```

- Object.getPrototypeOf

```javascript
var arr = [];
Object.getPrototypeOf(arr);  // Array.prototype
```

- Object.setPrototypeOf

```javascript
var arr = [];
Object.setPrototypeOf(arr, { a: 11, b: 22 });
arr.a        // 11
arr.slice  // undefined
```

## Set
- 新增的构造函数，用于创建新数据结构的集合对象，特点是值唯一

#### 预览
| 名称 | 宿主 | 类型 |  作用 |
|       -       |    -    |    -   |
| size | Set | method | 集合成员数量 |
| add | Set.prototype | method | 添加某个值 |
| delete | Set.prototype | method | 删除某个值 |
| has | Set.prototype | method | 是否存在某个值 |
| clear | Set.prototype | method | 清空所有值 |
| forEach | Set.prototype | method | 遍历值 |

#### 演示

- size

```javascript
var numSet = new Set([2, 4, 6, 2, 4, 6]);  // { 2, 4, 5 }
numSet.size  // 3
```

- add

```javascript
var numSet = new Set([2, 4, 6]);
numSet.add(4);  // { 2, 4, 6 }
numSet.add(8)   // { 2, 4, 6, 8 }
```

- delete

```javascript
var numSet = new Set([10, 20, 30]);
numSet.delete(10);  // { 20, 30 }
```

- has

```javascript
var numSet = new Set([10, 20, 30]);
numSet.has(20);  // true
numSet.has(50);  // false
```

- clear

```javascript
var numSet = new Set([10, 20, 30]);
numSet.clear();  // {}
```

- forEach
    1. 用来接收值的回调 { function }
    2. 回调中的this指向  { any }

```javascript
var numSet = new Set([10, 20, 30]);
numSet.forEach(v => console.log(v));
```

- 合并数据并去重

```javascript
var arr1 = [ 1, 3, 5 ];
var arr2 = [ 5, 7, 9 ];
new Set([ ...arr1, ...arr2 ]);  // { 1, 3, 5, 7, 9 }
```

## Promise
- Promise：承诺、约定的意思，主要用于异步执行流程的管理
- 它可以解决传统异步解决方案中，回调嵌套过深不利于维护的问题

#### 演示
- 假定我们有这样一个需求：某人和青梅竹马的芳芳约定，如果十年后她还没嫁，就嫁给我
- 这个需求中就含有异步逻辑的处理，芳芳要不要嫁给我需要等待10年后才会知晓
- 这里我们通过Promise来尝试实现这个需求：
    1. 使用promise管理一个10年约定
    2. 添加10年后的处理逻辑

###### 第一步
- Promise自身是一个`构造函数`，我们可以new它`创建实例`
- 然后传入一个`函数`，里面编写异步操作的代码

```javascript
var engagement = new Promise(function(yes, no) {
	// 定义10年期限，期限到后芳芳没嫁，就调yes，否则调no
	// 这里的yes与no方法是Promise实例提供给我们的
	setTimeout(function() {
		yes();
	}, 1000 * 10);
});
```

###### 第二步
- 上面的代码在10年期限到来时，并没有写处理逻辑，而是通过调用Promise实例提供的方法告知最终结果
- 因为Promise实例知道最终的结果，所以它专门提供了一个then方法让我们来添加处理逻辑

```javascript
// then接收两个回调，第一个是成功回调，第二个是失败回调(可选)
engagement.then(
  () => console.log('太开心了，芳芳终于嫁给了我'),
  () => console.log('我最终还是错过了芳芳')
);
```

###### 后续处理
- 使用Promise后你会发现我们异步操作与后续的处理逻辑是分开编写的
- 而且我们可以通过then方法多次添加后续的处理逻辑
- 即时异步操作结束了，我们还是可以调用then

```javascript
// 只传入成功回调
engagement.then(
	() => console.log('芳芳终于嫁给我了，我要带她环游世界！')
);
// 如果只想指定失败回调，可以通过catch方法来添加
engagement.catch(
	() => console.log('我的世界开始变得暗淡无光')
);
```

#### 小结
- 使用Promise管理异步操作，`异步逻辑`与`结果处理`是分开编写的，这有利于我们程序的`解耦`，让程序更`好维护`
- then方法后续仍可以调用，是因为每个Promise实例都有一个`状态`记录异步操作`执行的进度`，即时异步操作`结束`了，这个记录`仍然存在`
    + `pending`状态，代表正在执行异步操作，实例刚`创建`时的状态
    + `resolved`状态，代表异步代码执行完毕，调用`yes`方法后的状态
    + `rejected`状态，代表异步代码执行完毕，调用`no`方法后的状态

## 控制异步操作流程

#### 普通做法
- 通过编写嵌套的异步回调来控制代码的执行流程

```javascript
setTimeout(function() {
	console.log('第一个计时器回调执行，开启第二个');

	setTimeout(function() {
		console.log('第二个计时器回调执行，开启第三个');

		setTimeout(function() {
			console.log('第三个计时器回调执行');

		}, 2000);
	}, 2000);
}, 2000);
```

#### Promise做法
- 通过then方法的链式调用控制代码的执行流程

```javascript
// 创建一个promise实例，用于控制第二个计时器的执行
new Promise(function(yes, no) {
	setTimeout(function() {
		console.log('第一个计时器回调执行，开启第二个');
		yes();
	}, 2000);
})
// 第二个执行，并创建返回一个新的promise实例，用于控制第三个计时器的执行
.then(function() {
	return new Promise(function(yes, no) {
		setTimeout(function() {
			console.log('第二个计时器回调执行，开启第三个');
			yes();
		}, 2000);
	});
})
// 第三个执行，如没第四个，就不用再返回新的promise实例控制后续执行了
.then(function() {
	setTimeout(function() {
		console.log('第三个计时器回调执行');
	}, 2000);
});
```

## Promise封装与传参

#### 封装promise版本的定时器
- 如果同一件异步操作将来可能多次使用，可以考虑封装一个方法，便于复用

```javascript
function pmsTimeout(time, data) {
	return new Promise(function(yes, no) {
		setTimeout(function() {
			yes(data);
		}, time);
	});
}

pmsTimeout(2000)
.then(function() {
	console.log('通过then方法来添加定时器的回调逻辑，实现解耦');
});

pmsTimeout(4000)
.then(function() {
	console.log('封装后使用方便不少');
});
```

#### 数据传递
- 另外yes与no方法还可以传递一些参数给then中的回调

```javascript
function pmsTimeout(time) {
	return new Promise(function(yes, no) {
		setTimeout(function() {
			yes('给小伙来个士力架');
		}, time);
	});
}

pmsTimeout(2000)
.then(function(data) {
	console.log(data);  // '给小伙来个士力架'
});
```

#### 进阶
- 我们把普通异步操作封装成promise版本时，可以让使用者指定数据

```javascript
function pmsTimeout(time, data) {
	return new Promise(function(yes, no) {
		setTimeout(function() {
			yes(data); // 用户传什么我就给then回调什么
		}, time);
	});
}

pmsTimeout(2000, '老大')
.then(function(data) {
	console.log(`${ data }没钱吃饭`);
	return pmsTimeout(3000, '老二');
})
.then(function(data) {
	console.log(`${ data }没钱穿衣`);
	return pmsTimeout(4000, '老三');
})
.then(function(data) {
	console.log(`${ data }个长不大`);
});
```

## async`ES7`
- 使异步操作变得更加简洁清晰
- 使用它控制Promise执行流程，简直没谁了

#### 顺序执行定时器

```javascript
function pmsTimeout(time, data) {
	return new Promise(function(yes, no) {
		setTimeout(function() {
			yes(`Hello ${ data }`); // 数据小做处理
		}, time);
	});
}

async function asyncTimeout() {
	let data = null;

	data = await pmsTimeout(1000, '大娃');
	console.log(data);

	data = await pmsTimeout(2000, '二娃');
	console.log(data);

	data = await pmsTimeout(3000, '三娃');
	console.log(data);

	data =await pmsTimeout(4000, '四娃');
	console.log(data);
}

// 开启幸福生活
asyncTimeout();
```

#### 顺序进行数据请求

```javascript
async function asyncFetch() {
	var response = null, data = null;

	response = await fetch('abc.json');
	data =  response.ok && await response.json();
	console.log(data);

	response = await fetch('react.js');
	data = response.ok && await response.text();
	console.log(data);
}

// 开启幸福生活
asyncFetch();
```