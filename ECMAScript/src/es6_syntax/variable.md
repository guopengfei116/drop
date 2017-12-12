## let与const
> 这是两个新的关键字, 用于替代旧的变量定义方式

#### let
- 作用：
    + 替代var关键字定义变量
- 特点：
    + 不允许重复声明
    + 块级作用域
    + 没有预解析
    + 存在暂时性死区
    + 全局变量不再是window属性

#### const
- 作用：
    + 定义常量
- 特点：
    + 不允许重复声明
    + 块级作用域
    + 没有预解析
    + 存在暂时性死区
    + 全局变量不再是window属性
    + 定义时必须赋值，同时不允许修改

#### 特点演示

###### 不允许重复声明

```javascript
// SyntaxError，在语法分析时就报错
let a = 10;
let a = 20;
```

```javascript
function fn(arg) {
	let arg;
}
fn(10); // SyntaxError
```

###### 块级作用域

```javascript
{
	let a = 10;
	console.log(a); // 10
}
console.log(a);  // ReferenceError
```

###### 没有预解析

```javascript
console.log(a);  // ReferenceError
let a = 10;
```

###### 存在暂时性死区
- 即在某作用域内如果存在let、const声明的变量常量
- 如果在声明前使用它们就报错，也不会从上级作用域中查找

```javascript
let a = 10;
{
	console.log(a);  // ReferenceError
	let a = 20;
}
```

###### 全局变量不再是window属性

```javascript
let a 10;
console.log(a); // 10
console.log(window.a); // undefined
```

###### 常量的值不允许修改

```javascript
const NAME = '地球';
NAME = '火星';  // TypeError
```

###### const定义常量时必须一起赋值

```javascript
const NAME;  // SyntaxError;
```

#### 使用场景

###### 防止变量污染

```javascript
let i = 10;
for(let i = 0; i < 3; i++) {
	console.log(i);
}
console.log(i); // 10
```

###### 帮助预防潜在错误

```javascript
console.log(a + b); // RefrenceError
let a = 10;
let b = 20;
```

###### 常量特性

```javascript
// 常量命名规则: 字母全部大写, 多单词使用_分隔
const PI = 3.1415926;
PI = 2.1415926;  // TypeError
```

#### let特性总结
![let](./imgs/let.jpg)

#### const特性总结
![const](./imgs/const.jpg)
