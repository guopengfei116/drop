## 解构赋值
> 按照一定的模式，从数组和对象中提取值，然后对变量进行赋值

#### 数组解构

###### 完全解构

```javascript
let arr = [10, 20, 30];
let [ a, b, c ] = arr;
console.log(a); // 10
console.log(b); // 20
console.log(c); // 30
```

###### 部分解构

```javascript
let [ a, , c ] = [10, 20, 30];
console.log(a); // 10
console.log(c); // 30
```

###### 特殊值

```javascript
let [ a, b, c ] = [10, [ 20, 21, 22 ], {a: 1, b: 2}];
console.log(a); // 10
console.log(b); // [ 20, 21, 22 ]
console.log(c); // {a: 1, b: 2}
```

###### 深层解构

```javascript
let [ a, [b1, b2] ] = [10, [ 20, 21, 22 ], 30];
console.log(a); // 10
console.log(b1); // 20
console.log(b2); // 21
```

###### 解构缺失

```javascript
let [ a, b ] = [10];
console.log(a); // 10
console.log(b); // undefined
```

###### 默认值

```javascript
let [ a = 'aa', b = 'bb' ] = [10];
console.log(a); // 10
console.log(b); // bb
```

#### 对象解构

###### 完全解构

```javascript
let { a, b, c } = { a: 10, b: 20, c: 30 };
console.log(a); // 10
console.log(b); // 20
console.log(c); // 30
```

###### 部分解构

```javascript
let { a, c } = { a: 10, b: 20, c: 30 };
console.log(a); // 10
console.log(c); // 30
```

###### 特殊值

```javascript
let { a, b, c } = { a: 10, b: [20, 21, 22], c: { c1: 30, c2: 31 } };
console.log(a); // 10
console.log(b); // [20, 21, 22]
console.log(c); // { c1: 30, c2: 31 }
```

###### 深层解构1

```javascript
let { b: [ b1, b2 ], c: { c1, c2 } } = { a: 10, b: [20, 21], c: { c1: 30, c2: 31 } };
console.log(b);   // RefrenceError
console.log(b1); // 20
console.log(b2); // 21
console.log(c);   // RefrenceError
console.log(c1); // 30
console.log(c2); // 31
```

###### 深层解构2

```javascript
// 对象深层解构时前面的引导符不算变量，如有需要，需单独解构
let { c, c: { c1, c2 } } = { a: 10, b: [20, 21], c: { c1: 30, c2: 31 } };
console.log(c);   // { c1: 30, c2: 31 }
console.log(c1); // 30
console.log(c2); // 31
```

###### 解构缺失

```javascript
let { a, b } = { a: 10 };
console.log(a); // 10
console.log(b); // undefined
```

###### 默认值

```javascript
let { a = 'aa', b = 'bb' } = { a: 10 };
console.log(a); // 10
console.log(b); // bb
```

###### 重起变量名

```javascript
let { a: myA } = { a: 10 };
console.log(myA); // 10
console.log(a);      // ReferenceError
```

#### 使用场景

###### 变量交换

```javascript
let a = 10, b = 20, c = 30;
// 注意这里a b c已经声明了,就不用再声明了
[a, b, c] = [ b, c, a ];
console.log(a, b, c);
```

###### 提取对象中值

```javascript
let ajaxResponseData = {
	code: 200,
	msg: '成功',
	result: {
		name: '车',
		info: '各种车',
		list: ['兰博基尼', '法拉利']
	}
};

// 解构提取result中info与list的值
let { result: { info, list } } = ajaxResponseData;
console.log(info);
console.log(list);
```

###### 函数返回多个值（本质还是提取对象中的值）

```javascript
function fn() {
	let obj = {};
	return {
		get: function(key){
			return obj[key];
		},
		set: function(key, val){
			obj[key] = val;
		}
	};
}

// 解构fn的返回值
let { get, set } = fn();
set('fib', [1, 1, 2, 3, 5, 8, 13]);
get('fib');
```

#### 解构特点总结
![解构赋值](./imgs/jiegou.jpg)
