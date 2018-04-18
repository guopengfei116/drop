# js面向对象与高级代码案例复习

## 基础复习

#### 数据类型与typeof
```javascript
typeof 123 // 'number'
typeof 'abc' // 'string'
typeof false // 'boolean'
typeof undefiend // 'undefiend'
typeof function(){} // 'function'
typeof null // 'object'
typeof [] // 'object'
typeof new Date() // 'object'
```

#### 基本数据类型与引用数据类型赋值特点

###### 基本数据类型
```
var a = 123;
var b = a;
a = 321;
console.log(a === b); // false
```

``` 引用数据类型1
var a = { name: '宅男' };
var b = a;
a = { name: '腐女' };
console.log(b.name); // 宅男，修改了a变量的引用不会影响b变量的引用
```

``` 引用数据类型2
var a = { name: '宅男' };
var b = a;
a.name = '腐女';
console.log(b.name); // 腐女，修改a对象里面的属性就是修改b里面的属性
```

#### 函数
    + 被赋值、传参
    + 调用时接收各种形参，返回各种结果

#### ==判断

###### NaN系列 ==> 所有结果为false，包括自己
```javascript
NaN == NaN  // false
NaN == false // false
NaN == [] // false
```

###### null与undefined系列 ==> 他俩相等， 他俩与其他的不相等
```javascript
null == undefined // true
null == null // true
undefined == undefined // true
null == false // false
null == 0 // false
undefined == false // false
undefined == [] // false
```

###### 对象系列 ==> 比较地址
```javascript
[] == [] // false，不是同一个
{} == {} // false，不是同一个
var o = {};
var o2 = o;
o == o2 // true，是同一个
```

###### 对象与字符串系列 ==> 对象转成字符串后比较
```javascript
({}) == '[object Object]' // true
[] == '[object Array]' // false，因为数组转字符串优先调用属于自己的toString
[] == ''  // true
[1,2,3] == '1,2,3' // true
```

###### 数字布尔与其他 ==> 全部转换为数字后比较
```javascript
0 == false  // true
1 == true  // true
0 == [] // true 因为空数组转换数字为0
1 == [1] // true 
1 == [1,1] // false 因为数组转换为NaN了
0 == null // false 因为null、undefined与其他都为false，是固定的
```

## 面向对象

#### 构造函数与原型

###### 开发中常见写法一
```javascript
// 构造函数，也可以认为是类
function Tab(titleSelector, boxSelector) {
	// 实例的属性可能需要额外加工
	this.nTitiles = document.querySelectorAll(titleSelector);
	this.nBoxs = document.querySelectorAll(boxSelector);
}
// 直接.的方式依次给原型扩充方法
Tab.prototype.on = function() {
	var _this = this;
	for(var i = 0, len = this.nTitles.length; i < len; i++) {
		this.nTitles[i].onclick = function() {
			_this.changBox();
		};
	}
};
Tab.prototype.changBox = function() {
	console.log('显示隐藏对应的box');
};
```

###### 开发中常见写法二
```javascript
function Person(name, age) {
	// 实例的属性有些不需要加工，直接拿来赋给实例即可
	this.name = name;
	this.age = age;
}
// 可以被覆写
Person.prototype = {
	run: function(){},
	eat: function(){}
};
```

###### 开发中常见写法三
```javascript
function Dog(name, age) {
	this.name = name;
	this.age = age;
}
// extend可以同时把多个对象的属性与方法copy给第一个对象
var o1 = {}, o2 = {};
$.extend(Dog.prototype, {}, {}, o1, o2);
```

#### this

###### 函数调用模式
> 函数名调用与自调，this都指向window
```javascript
// 函数调用 
fuction fn(){ 
	console.log(this); 
}
fn(); 
// 自调
(function() {
	console.log(this);
})();
```

###### 方法调用模式
> 对象.方法名调用 || 对象[方法名]调用 || 对象.对象.方法名调用，this指向宿主对象
```javascript
var outObj = {
	inObj: {
		fn: function() {
			console.log(this);
		},
		2: function() {
			console.log(this);
		}
	}
};
outObj.inObj.fn();
outObj.inObj['2']();
```

###### 构造器调用模式
> 这种调用模式在前面两种的基础上多了一个new关键字，this指向新实例
```javascript
function fn() {
	console.log(this);
}
new fn();
```

#### 原型链
```javascript
function Dog() {}
var erHa = new Dog();
```
- 常见对象的原型链结构
    + erHa ==> Dog.prototype ==> Object.prototype ==> null
    + Array ==> Function.prototype ==> Object.prototype ==> null
    + Function ==> Function.prototype ==> Object.prototype ==> null
    + Object ==> Function.prototype ==> Object.prototype ==> null
    + new Function ==> Function.prototype ==> Object.prototype ==> null
    + [] ==> Array.prototype ==> Object.prototype ==> null
    + {} ==> Object.prototype ==> null
    + Math ==> Object.prototype ==> null
    + JSON ==> Object.prototype ==> null

## js高级

#### 作用域
```javascript
// 函数作用域 ==> 核心：只有函数可以产生新的作用域
if(false) {
	var a = 1;
}
(function () {
	var b = 2;
})();
console.log(a); // undefined
console.log(b); // 报错
```

```javascript
// 词法作用域 ==> 核心：当前作用域内没有去定义该函数的作用域查找
var a = 1;
function fn() {
	console.log(a); // 1
}
(function () {
	var a = 100;
	fn();
})();
```

#### 预解析
```javascript
console.log(a);  // alert2函数
var a = 1;
function a() { alert(1); }
var a = 2;
function a() { alert(2); }
```

#### 代码的执行过程
- 从实际执行分析
   + 每一段脚本执行时先进入全局运行环境
   + 该运行环境中this为window
   + 变量对象里面存储着各种全局变量与函数声明
   + 然后逐行执行，在全局运行环境中，如果出现了函数调用，那么就会进入对应的函数运行环境
   + 进入函数运行环境中，会给其添加this，其调用方式值不同
   + 然后会给其添加变量对象，里面存储着各种形参、局部变量、局部函数声明
   + 最后还会记录可访问的上级变量对象
   + 当运行环境初始化完毕后，代码才会逐行执行
   + 每个函数调用完毕后，会尝试释放对应的运行环境，不过可能会存在其他引用阻止释放，比如闭包。

- 从代码的表象上看分为如下两个阶段
    + 预解析
    + 逐行执行
```javascript
console.log(a);  // alert2函数
var a = 1;
console.log(a); // 1
function a() { alert(1); }
console.log(a); // 1
var a = 2;
console.log(a); // 2
function a() { alert(2); }
var a = function() { alert(3); }
console.log(a); // alert3函数
```

#### call与apply

###### 使用场景1，伪数组借用数组方法
```javascript
var obj = {
	0: 'aaaaaa',
	length: 1
};
[].push.apply(obj, ['bbbbbb', 'cccccc', 'dddddd']);
```

###### 使用场景2，借用Object.prototype.toString获取对象的类型
```javascript
var data1 = [];
var data2 = /abc/;
console.log(({}).toString.call(data1).slice(8, -1));
console.log(({}).toString.call(data2).slice(8, -1));
```

###### 使用场景3，构造函数借用
```javascript
function Animal(name, age, sex) {
	this.name = name;
	this.age = age;
	this.sex = sex;
}
function Person(name, age, sex) {
	// 下面两种写法都OK，如果使用arguments，千万注意形参顺序要保持一致
	Animal.call(this, name, age, sex);
	Animal.apply(this, arguments);
}
```

#### 闭包

###### 计数器
```javascript
function getCount() {
	var number = 0;
	return {
		get: function() {
			return number;
		},
		set: function() {
			number++;
		}
	};
}
// 第一个计数器
var count = getCount();
count.set();
count.set();
console.log(count.get());
// 第二个计数器
var count2 = getCount();
count2.set();
console.log(count2.get());
```

###### 缓存
```javascript
function getCache() {
	var cache = {};
	return function(key, val) {
		var argLen = arguments.length;
		if(argLen === 1) {
			return cache[key];
		}else if(argLen === 2) {
			cache[key] = val;
		}
	};
}
// 缓存1
var cache = getCache();
cache('fib', [1, 1, 2, 3, 5, 8, 13]);
cache('power2', [2, 4, 8, 16, 32, 64, 128]);
console.log(cache('fib'));
// 缓存2
var cache2 = getCache();
cache2('1', 'html');
cache2('2', 'css');
cache2('3', 'javascript');
console.log(cache2('2'));
```

###### for循环i面试题
```javascript
var arr = ['第一句话', '第二句话', '第三句话', '第四句话'];
for(var i = 0, len = arr.length; i < len; i++) {
	// 自调函数随着for循环一遍遍执行，把i不同的值分别放入了不同的运行环境内
	(function(i) {
		setTimeout(function() {
			// 该回调函数引用了外面自调函数的i，所以外面的i无法释放
			console.log(arr[i]);
		}, (i + 1) * 1000);
	})(i);
}
```

#### 递归

###### 阶乘
```javascript
function factorial(n) {
	if(n === 1) {
		return 1;
	}else {
		return factorial(n - 1) * n;
	}
}
```

###### 等差
```javascript
function diference(m, n) {
	if(n === 1) {
		return 1;
	}else {
		return diference(m, n - 1) + m;
	}
}
```

###### 求幂
```javascript
function power(m, n) {
	if(n === 0) {
		return 1;
	}else {
		return power(m, n - 1) * m;
	}
}
```

###### 斐波那契数列
```javascript
function fibnacci(n) {
	if(n === 0 || n === 1) {
		return 1;
	}else {
		return fibnacci(n - 1) + fibnacci(n - 2);
	}
}
```

###### 缓存优化斐波那契数列
```javascript
var fibCache = [];
function fibnacci(n) {
	// 缓存中没有该值，先存
	if(!fibCache[n]) {
		if(n === 0 || n === 1) {
			fibCache[n] = 1;
		}else {
			fibCache[n] = fibnacci(n - 1) + fibnacci(n - 2);
		}
	}
	return fibCache[n];
}
```

###### 缓存优化斐波那契数列 -- 闭包形式
```javascript
var fibnacci = (function() {
	var fibCache = [];
	return function (n) {
		// 缓存中没有该值，先存
		if(!fibCache[n]) {
			if(n === 0 || n === 1) {
				fibCache[n] = 1;
			}else {
				fibCache[n] = fibnacci(n - 1) + fibnacci(n - 2);
			}
		}
		return fibCache[n];
	}
})();
```

###### 获取页面所有元素1
```javascript
var nodes = [];
(function getNodes(node) {
	nodes.push(node);
	var child = node.children;
	if(child) {
		for(var i = 0, len = child.length; i < len; i++) {
			getNodes(child[i]);
		}
	}
})(document.documentElement);
```

###### 获取页面所有元素2
```javascript
function getNodes(nodes, startI) {
	if(!nodes) {
		nodes = [ document.documentElement ];
		startI = 0;
	}
	
	for(var i = startI, len = nodes.length; i < len; i++) {
		nodes.push.apply(nodes, nodes[i].children);
	}
	
	// 如果发现没有新的子元素添加，那么就结束递归
	// 否则获取新增子元素的子元素
	if(len === nodes.length) {
		return nodes;
	}else {
		return getNodes(nodes, len);
	}
}
```

###### 统计页面元素的种类
```javascript
var total = (function() {
	var nodes = document.querySelectorAll('*');
	var obj = { length: 0 };
	// 遍历所有节点，以节点名为key给对象添加属性，
	// 充分利用对象key唯一的特征进行属性的判断，
	// 每成功添加一个属性length自增一次，最终统计出节点的数量
	for(var i = 0, len = nodes.length; i < len; i++) {
		if(!obj[nodes[i].nodeName]) {
			obj[nodes[i].nodeName] = true;
			obj.length++;
		}
	}
})();			
```
