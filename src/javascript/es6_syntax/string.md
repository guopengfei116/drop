## 反引号字符串
> 新增的字符串定义方式, 使用一对\`\`反引号包裹定义

#### 多行字符串

```javascript
let str = `第一行第一行
	第二行第二行`;
console.log(str);
```

#### 模版字符串

```javascript
// 可以访问变量、调用函数、及各种表达式运算
let mei = {
	name: '小美',
	age: 16
};
let str = `${ mei.name }今年${ mei.age }了，
	还有${ 30 - mei.age }年他就30了`;
console.log(str);
```
