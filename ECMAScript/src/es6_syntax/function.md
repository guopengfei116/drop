## 函数

#### 函数形参的定义

- 设置默认值

```javascript
// 具有默认值的形参最好定义在后面
function fn(a = 10, b = 20) {
	console.log(a + b);
}
fn();
fn(100);
fn(100, 200);
```

- 参数解构赋值

```javascript
function fn({a, b}) {
	console.log(a + b);
}
fn({a: 11, b: 22});
```

- ...形参定义
    1. 把函数剩余的参数存储到数组中
    2. 该语法定义的形参可以替代arguments
    3. 只有最后一个形参才能这样写

```javascript
function total(...nums) {
	return nums.reduce(function(prevResult, current) {
		return prevResult + current;
	});
}
total(11, 22, 33, 44);  // 110
```

#### 箭头函数
- 简述：
    + 使用=>定义函数。
- 特点：
    + this固定指向上级this，不再和调用方式有关
    + 不能作为构造函数使用
    + 不能使用arguments，可使用...语法代替
- 语法：
   + 形参 => 代码体

- 基本用法

```javascript
let add = (a, b) => {
	return a + b;
};
console.log(add(11, 22));
```

- 一个形参可省略小括号

```javascript
let add = a => {
	return a + 22;
};
console.log(add(11));
```

- 一句代码可省略大括号，并自动return执行结果

```javascript
let add = a => a + 22;
add(11);
```

- 使用例子

```javascript
let arr = [ 1, 2, 3, 4 ];
let newArr = arr.map(v => v * v);
console.log(newArr);
```

- this固定指向上级this

```javascript
function Tab() {
	this.tabBtn = document;
	this.tabBox = document.body;
}
Tab.prototype = {
	on: function() {
		this.tabBtn.onclick = () => {
			console.log(this);
			this.tabBox.style.backgroundColor = 'blue';
		};
	}
};
new Tab().on();
```

- 不能作为构造函数使用

```javascript
let Person = (name, age) => {
	this.name = name;
	this.age = age;
};
let p = new Person();
```

- 不能使用arguments对象

```javascript
let fn = () => console.log(arguments);
fn(1, 2, 3);
```

- 函数相关特性预览
![函数](./imgs/function.jpg)
