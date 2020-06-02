# This

在最初流行的 ES3 标准中，js 的 this 通常指向一个**对象**，但指向与`调用方式`有关，与`定义无关`，这与市场上主流语言的处理方式非常不一样，提高了其他语言应用者学习 js 的难度。

在 ES5 标准时，增加了`严格模式`，这种模式 this 不一定是对象，也可能是一个**基本数据类型**，但是 this 指向仍然与 `调用方式` 有关，这一点没有改变。

ES6标准后，引入了**箭头函数**，它比较特殊，因为它的 this 与`定义相关`，与`调用无关`，换个角度讲就是它的 this 指向是`恒定不变`的。

为了更清晰的搞清 this 指向，我们把 js 中的函数划分成"箭头函数"与"非箭头函数"两大类来`分开研究`。

但是事情远没有那么简单，因为"箭头函数"和"非箭头函数"可以`相互嵌套`包裹，this 更加多变，但是"箭头函数"的this是`恒定不变`的，"非箭头函数"是随着调用方式`动态变化`的，也就是`变数`都在"非箭头函数"上，我们只要先搞清楚它，那么"箭头函数"就非常简单了。

## 非箭头函数

再次强调，非箭头函数的 this 与**调用方式**有关，所以我们从调用方式的角度出发依次分析其 this 指向。

### 调用方式1：函数调用模式

这种模式下，this 指向`全局对象`。<br />
这种最朴实无华的一种调用模式，常见的就是定义一个函数，然后用`函数名直接调用`，就称之为`函数调用模式`。

```js
function fn() {
  console.log(this);
}
fn();
```

这种方式还有一个变体，称之为自调函数(IIFE)。

```js
(function fn() {
  console.log(this);
}());
```

### 调用方式2：方法调用模式

这种模式下，this 指向`宿主对象`。<br />
这是一种面向对象风格的调用模式，把函数定义在一个对象上(对象上的函数通常称为方法)，然后通过`对象属性方式调用`，这就是`方法调用模式`。

```js
const obj = {
  fn() {
    console.log(this);
  }
};
obj.fn();
```

### 调用方式3：构造器调用模式

这种模式下，this 指向一个`新对象`。<br />
这也是一种面向对象风格的调用模式，通过new关键字把函数当做类来使用，从而创建出一个新对象，这就是`构造器调用模式`。

```js
function Fn() {
  this.a = 1;
  this.b = 2;
  console.log(this);
}

const newObj = new Fn();
```

### 调用方式4：间接调用模式(上下文调用模式)

这种模式下，this 可以由`用户自己设定`。<br />
这种模式，需要用到 js 提供的 3 个特殊方法来实现调用，它们分别是 call、apply 和 bind。

示例：call

```js
function add(a, b) {
  console.log(this, a + b);
}
add.call({a: 1}, 10, 10);
```

示例：apply

```js
function add(a, b) {
  console.log(this, a + b);
}
add.apply({b: 2}, [20, 20]);
```

示例：bind

```js
function add(a, b) {
  console.log(this, a + b);
}

// 注意：bind返回一个新函数
const newFn = add.bind([], 30, 30);
newFn();
newFn();
```

#### 附录：三者共同点与区别

共同点：

- 都是函数共有方法
- 都可以改变函数自身this

区别：

- call与apply相近，区别在于传参方式
- bind返回一个新函数

call

- 函数.call(指定的this，实参1，实参2，...)
- 对象.方法.call(指定的this，实参1，实参2，...)

apply

- 函数.apply(指定的this，[实参1，实参2，...])
- 函数.apply(指定的this，{0: 实参1， 1：实参2， length: 2})
- 对象.方法.apply(指定的this，[实参1，实参2，...])

#### 附录：应用

借用数组方法给伪数组对象添加属性值

```js
var obj = {};
Array.protype.push.call(obj, '要添加的第一个值', '要添加的第二个值')
```

借用Obj原型上的toString方法获取对象类型

```js
var arr = [];
Object.prototype.toString.call(new Date).slice(8, -1)
```

借用父类构造函数给子类实例添加属性

```js
function Parent(name, age) {
  this.name = name;
  this.age = age;
}

function Son() {
  Parent.apply(this, arguments);
}

var p = new Son('火星人', 999);
```

apply的技巧

- apply可以把真数组或者伪数组平铺，然后传递给函数。
- 利用这个特征，可以很方便的对数组或伪数组进行传递操作。

利用apply方法特性平铺数组传递值

```js
// apply拆分数组或伪数组值依次传递给函数
var arr = [1, 10, 20, 40];
Math.max.apply(null, arr)
```

call与apply补充

- 如果不传参 ==> this指向window
- 传null ==> this指向window
- 传undefined ==> this指向window
- 传123 ==> this指向123的包装类型对象(Number对象)
- 传'abc' ==> this指向'abc'的包装类型对象(String对象)
- 传true ==> this指向true的包装类型对象(Boolean对象)
- 传对象 ==> this指向传入的对象

## 测试

```js
function fn() {
  console.log(this);
}
const obj = {
  fn: fn
};
fn();      // 全局对象
obj.fn();  // obj
```

```js
function fn() {
  console.log(this);
}
const obj = {
  fn: fn
};

new fn();       // fn的新实例
new obj.fn();   // fn的新实例
```

```js
function fn() {
  console.log(this);
}
const obj = {
  fn: fn
};

fn.call([1]);         // [1]
obj.fn.call([2]);     // [2]
new obj.fn.call([3]); // fn的新实例
```

总结：

- 看到了new关键字，那么函数的this就是自身实例
- 看到了call、apply、bind，那么函数的this就是第一个参数。
- 最后就剩下函数调用与方法调用了，自己肉眼区分。

## 严格模式

- ES5新增的一个特性，使用该特性可以让js以一种新的模式运行js脚本。
- 该模式下可以强制我们抛弃那些不推荐不友好的写法
- 该模式下可以让js之前的一些设计不太合理的api表现的合理一些
- 该模式下可以让js拥有一些新的特性，比如ES6/ES7规范中定义的某些语法，必须在严格模式下才有效

#### 严格模式的分类
- 全局模式
    + 在全局代码的最上面书写一句话'use strict';
    + 使用该模式，所有的代码都按照严格模式执行
- 局部模式
    + 在函数内部的最上面书写一句话'use strict';
    + 使用该模式，只有该函数内的代码才会按照严格模式执行

#### 需要记住的几条严格模式规则
- 定义变量必须使用var
- 函数调用模式this为undefined
- 真正实现了call谁this就为谁

严格模式下，变化一，函数调用模式this不再是全局对象，而是未定义。

```js
"use strict";

function fn() {
  console.log(this);
}
fn();
```

变化二，this可以指向任意值，包括基本数据类型

```js
function fn1() {
  console.log(this);
}

function fn2() {
  "use strict";
  console.log(this);
}

fn1.call(1); // es3 this一定是对象，所以this是1的包装类型Nunber(1)
fn2.call(1); // es5 this可以任意，this就是1
```

## 箭头函数

没有自己的this，与定义时的词法环境相关，简单讲就是箭头函数一定义，this就被确定了，无法通过其他方式改变。

顺便补充一点，箭头函数不能当做构造器使用，也就是说不能 new 箭头函数；主要是因为箭头函数内的 this 无法指向新实例，那么构造函数原有的作用也就没有了，所以最终js禁掉了new箭头函数。

全局箭头函数：

```js
// 这个函数定义在全局环境，所以内部this就是全局this
const fn = () => {
  console.log(this);
}
const obj = {
  fn: fn
};

fn();        // window
obj.fn();    // window
fn.call([]); // window
new fn();    // 报错
```

函数嵌套箭头函数：

```js
function add(a, b) {
  console.log(this);
  const fn = () => console.log(this, a + b);
  fn(); // 箭头函数内的this与add执行时的this一样
}

add(1, 2);                 // window
({ add }).add(10, 20);     // { add }
add.call(Array, 100, 200); // Array
new add(1000, 2000);       // add的实例
```

函数嵌套箭头函数：

```js
function getFn() {
  console.log(this);
  return () => console.log(this); // 箭头函数内的this与getFn执行时的this一样
}

//函数调用模式，getFn内的this指向window，那么其内部定义的箭头函数this也指向window
const arrowFn = getFn();

arrowFn();               // window
({ arrowFn }).arrowFn(); // window
arrowFn.call(Array);     // window
new arrowFn();           // 报错，箭头函数不能new
```
