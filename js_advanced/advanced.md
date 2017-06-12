# js高级

## 作用域

#### 概念
- 变量的有效范围。

#### 全局变量
- 在全局都有效的变量。
- 定义方式：函数外定义。
- 生命周期：从定义开始，到页面被卸载结束。

#### 局部变量
- 只在局部有效的变量。
- 定义方式：函数内定义。
- 生命周期：一般情况下，是从定义开始，到函数执行完毕结束。

#### 函数作用域
- 只有函数才可以产生新的作用域
- 只有函数可以限定变量的有效范围

#### 块级作用域 ==> js没有
- 凡是代码块就可以产生新的作用域
- 凡是代码块就可以限定变量的有效范围

#### 词法作用域(静态作用域) 
- 说的是变量的查找规则，特点是变量查找与函数定义有关，与调用无关
    + 先在当前作用域查找
    + 找不到就去定义该函数的作用域找
    + 一直找到全局作用域为止，全局也没有则报错

#### 作用域的产生
- 函数可以被多次重复调用，调用一次就会产生一个新的作用域。

#### 作用域链
- 函数在定义的时候，将来它执行时的上级作用域就被确定好了，上级作用域可能还有上级，函数所有的上级作用域称之为作用域链。
- 一个函数作用域可以访问的所有上级作用域，称为它的作用域链。

#### 垃圾回收机制原则
- 一个对象没有被其他变量或者属性引用，那么就会被释放。
    + 同时还要保证该对象能够被使用，对于那些无法使用，又存在循环引用的对象，也会被释放。
- 一个局部变量没有被其他函数引用，那么就会被释放。

#### 注意：有一个容易搞混，又没有什么联系的知识点，这里强调一下
- 函数内的this，与函数的定义无关，与调用有关。
```javascript
var obj = {
	fn: function() { console.log(this) };
};
var fn = obj.fn;

// 同一个fn，三种调用方式，this分别不同
obj.fn(); // obj
fn();     // window
new fn(); // fn实例
```
- 变量的查找，与函数的定义有关，与调用无关。
```javascript
function fn() {
	console.log(a); // 报错，自己找不到，去定义fn的全局找，所以这里和fn的定义有关，与fn的调用无关。
}
(function() {
	var a = 10;
	fn();
})();
```

## 闭包

#### 概念
- 在js中访问了自由变量的函数就是闭包

#### 自由变量
- 函数可访问的外部局部变量，称之为该函数的自由变量

#### 特点
- 闭包的自由变量生命周期会被拉长，与闭包的生命周期进行了捆绑

#### 计数器案例
```javascript
function getCounter() {
    var total = 0;
    return {
        add: function() {
            total++;
        },
        get: function() {
            return total;
        }
    };
};
var counter = getCounter();
counter.add();
counter.get();
var counter2 = getCounter();
counter2.add();
counter2.get();
```

#### 缓存操作
```javascript
var cache = (function() {
    var cache = {};
    return {
        set: function(key, val) {
            cache[key] = val;
        },
        get: function(key) {
            return cache[key];
        }
    };
}());
cache.set('张锐', '中国人');
cache.get('张锐');
```

#### for循环i面试题
```javascript
var arr = ['第一句话', '第二句话', '第三句话'];
for(var i = 0, len = arr.length; i < len; i++) {
    setTimeout(function(i) {
        return function() {
            console.log(arr[i]);
        }
    }(i), 1000 * i + 1000);
}
```

## 预解析
- 可以理解为js解析引擎在逐行执行代码前，对一些特殊代码的预先执行。
- 预解析过后代码才会从上到下逐行执行，但是预解析时已经定义的变量与函数，是不会重复定义的。
- 预解析的本质就是变量对象初始化。

#### 预解析做了两件事情
+ 1、变量声明提升：检测到变量声明那就率先进行声明
+ 2、函数声明提升：检测到函数声明也率先进行声明

#### 预解析的特点
- 在变量声明之前访问它不会报错
- 在函数声明之前调用它不会报错

#### 变量声明区分
- 使用通过var定义的变量，才属于变量声明
    + 例如：var a; 属于变量声明。
    + 例如：b = 10; 不属于变量声明。
- var关键字可以通过逗号连续声明多个变量
    + 例如：var a, b, c = 20, d = 30; 
    + a,b,c,d全部属于声明。
- var关键字在声明变量的时候，可以给其赋值，如果赋值表达式中含有一些变量，这些变量不属于变量声明。
    + 例如：var a = b = 10; 
    + 其中a属于变量声明，b不属于。

#### 函数声明区分
- 在js中，函数声明式写法比较单一，好区分。
    + 要么定义在全局
    + 要么定义在另一个函数主体内

#### 预解析相关细节
- js预解析分全局预解析与局部预解析，区别在于局部预解析在函数调用时发生。
- 变量声明重名 -- 最终只留一个
```javascript
	console.log(a); // 预解析后值保留一个变量a，值为undefined
	var a = 1;
	var a = 2;
```
- 函数声明重名 -- 保留后面的函数
```javascript
	console.log(test); // 预解析后test为打印2的函数
	function test(){ console.log(1) }
	function test(){ console.log(2) }
```
- 变量与函数重名 -- 保留函数
```javascript
	console.log(test); // 预解析后test值为函数
	var test = 10;
	function test(){}
	var test = 20;
```

#### 函数执行时形参会优先执行
- 形参定义与赋值优先于变量与函数声明。
```javascript
(function(a) {
	console.log(a);  // a函数
	var a = 200;
	function a(){}
	console.log(a);  // 200
}(100));
```

#### 函数表达式的名称
```javascript
	// 函数fnName的名字在外面无法访问，但是可以在函数内访问，
	// 相当于自己的一个局部变量，值为自己的引用。
	var fn = function fnName(){
		console.log(fnName);  // 里面可以访问
	};
	console.log(fnName);   // 外面访问报错
```

## 函数的四种调用模式

#### this的特点
- 谨记：函数中的this，与调用方式有关，与定义无关
- 容易引起混乱的另一特性：函数中变量的查找，与定义有关，与调用无关

#### 函数调用模式
- 调用方式：函数名() || (function(){}()) 
- this指向： window

#### 方法调用模式
- 调用方式：对象.方法名() || 对象[方法名]() || 祖对象.父对象.子对象.方法名()
- this指向： 宿主对象，最后一个对象

#### 构造器调用模式
- 调用方式：new 构造函数() || new 对象.构造函数() 
- this指向：new出来的新实例

#### 间接调用模式(上下文调用模式)
- 调用方式：函数.call() || 对象.函数.call() || 函数.apply() || 对象.函数.apply()
- this指向：call与apply的第一个参数谁this指向谁

## call与apply
- 这是来自Function.prototype的两个方法，供所有函数使用
- call与apply的作用都是为了改变函数执行时this的指向
- call与apply的区别在于传参的方式

#### call
    + 函数.call(指定的this，实参1，实参2，...)
    + 对象.方法.call(指定的this，实参1，实参2，...)

#### apply
    + 函数.apply(指定的this，[实参1，实参2，...])
    + 函数.apply(指定的this，{0: 实参1， 1：实参2， length: 2})
    + 对象.方法.apply(指定的this，[实参1，实参2，...])

#### call和apply方法借用原理与使用范例
- 只有内部操作this的方法才可借用

###### 借用原理演示
```javascript
// 给数组添加打印值的公共方法
Array.prototype.conVal = function() {
	for(var i = 0, len = this.length; i < len; i++) {
		console.log(this[i]);
	}
}
// 借用数组方法打印伪数组中的值
var obj = { 0: 'a', 1: 'b', length: 2 };
[].conVal.call(obj);
```

###### 借用数组方法给伪数组对象添加属性值
```javascript
var obj = {};
Array.protype.push.call(obj, '要添加的第一个值', '要添加的第二个值')
```

###### 借用Obj原型上的toString方法获取对象类型
```javascript
var arr = [];
Object.prototype.toString.call(new Date).slice(8, -1)
```

###### 借用父类构造函数给子类实例添加属性
```javascript
function Parent(name, age) {
	this.name = name;
	this.age = age;
}
function Son() {
	Parent.apply(this, arguments);
}
var p = new Son('火星人', 999);
```

#### apply的技巧
- apply可以把真数组或者伪数组平铺，然后传递给函数。
- 利用这个特征，可以很方便的对数组或伪数组进行传递操作。

###### 利用apply方法特性平铺数组传递值
```javascript
// apply拆分数组或伪数组值依次传递给函数
var arr = [1, 10, 20, 40];
Math.max.apply(null, arr)
```

#### call与apply补充
- 如果不传参 ==> this指向window
- 传null ==> this指向window
- 传undefined ==> this指向window
- 传123 ==> this指向123的包装类型对象(Number对象)
- 传'abc' ==> this指向'abc'的包装类型对象(String对象)
- 传true ==> this指向true的包装类型对象(Boolean对象)
- 传对象 ==> this指向传入的对象

## ES5数组新增的3个方法

#### forEach
- 作用：帮我们遍历数组，每遍历到一个值，就会调用一次回调，把这个值与它的下标传递过去
- 语法：数组.forEach(function(v, i){ console.log('使用forEach帮我们遍历好的值与下标') })
- 返回值：undefined

#### map 
- 作用：可以用来代替forEach，但是map可以接收回调的返回值，最终通过一组数据映射为回调返回的另外一组数据
- 语法：var mapArr = 数组.map(function(v, i){ return v * v })
- 返回值：回调所有的返回值组成的新数组

#### filter
- 作用：可以用来代替forEach，但是还可以过滤数组中的值
- 语法：var filterArr = 数组.filter(function(v, i){ if(v % 2 ==0){ return true; } })
- 返回值：所有返回回调返回true的对应值组成的新数组

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

#### 其他
- 不能使用with语句
- 废除函数.caller与arguments.callee
- eval拥有了单独的作用域
- ......

# 扩展可选内容

## 递归


## 设计模式

#### 沙箱模式
- 使用某种方式，防止一些代码对外界环境造成潜在影响，这类代码就可以认为是沙箱模式
- 在js中，最简单的沙箱模式写法，就是使用一个自调函数把某块代码进行封装，可以防止全局变量污染

#### 工厂模式
- 凡是调用一个函数，函数返回一个对象，那么这个函数就可以认为是一个工厂。
- 在js中，一般的工厂都是把new对象的过程进行了一个封装。

#### 单例模式
- 只要让某种类型的实例，只能存在一个，实现这种需求的代码就是单例模式
- 在js中，JSON与Math对象就被设计为单例模式，我们不能够创建第二个这种类型的对象。

#### 观察者模式 -- 发布订阅模式
- 只要某事件发生后，会自动执行预设好的回调，那么实现这种需求的代码就是观察者模式
- 观察者模式可以认为就是自定义事件
- 观察者模式通常使用的场景是这样的：某对象做了某件事，其他对象做出相应的一个响应

## bind
- ES5提供了一个新的可以改变函数this指向的新函数
- 作用：通过某函数得到一个绑定了固定this的新函数，这个新函数可以是旧函数的clone版本
- 语法：var bindFn = 函数.bind(this)
- 返回值：绑定了this的函数
