## 对象

#### 属性方法简洁表示

- 引用变量定义属性方法
```javascript
let a = 10;
let b = 20;
let fn = function(){};
let obj = { a, b, fn };
console.log(obj);
```

- 方法定义 （改造闭包缓存例子）
```javascript
let obj = {
	fn1: function() {
		console.log('传统写法');
	},
	fn2() {
		console.log('简洁写法');
	}
};
obj.fn1();
obj.fn2();
```

#### 属性名支持表达式

- 引用变量值

```javascript
let key = 'name';
let obj = {
	[ key ]: '小美';
};
console.log(obj);
```

- 表达式计算值

```javascript
let key = 'name';
let obj = {
	[ 'my' + key ]: '小美',
};
console.log(obj);
```

- 对象特性预览
![对象](./imgs/object.jpg)
