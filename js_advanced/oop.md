#  js面向对象

## 概念

#### 对象
- 任何事物都可以看作是对象。

#### 面向对象与面向过程的概念
- 面向过程
    + 凡是自己亲力亲为，自己按部就班的解决现有问题。
- 面向对象
    + 自己充当一个指挥者的角色，指挥更加专业的对象帮我解决问题。
- 联系
    + 面向对象仍然离不开面向过程，可以认为它是对面向过程更高一层的封装。

## 创建对象的方式

#### 字面量形式
```javascript
var p = {};
p.name = '中国人';
p.age = '500';
```

#### 构造函数形式 ==> 复用性更强
```javascript
function Person(name, age) {
	this.name = name;
	this.age = age;
}
var p = new Person('中国人', 500);
var p2 = new Person('中国人2', 500);
```

## 构造函数

#### 概念
- 如果一个函数配合new关键字创建对象，那么这个函数也叫构造函数
    + 构造函数与普通函数本质上是一样的
    + 编写构造函数时，首字母通常会大写，但不是必须的(类似变量驼峰命名法)

#### 返回值特点
- 如果构造函数没有return语句，那么new它，得到一个新实例
- 如果构造函数return了一些基本类型数据，那么new它，得到一个新实例
- 如果构造函数return了一个对象，那么new它，得到return的对象

## 类与实例的概念

#### 类
- 类是对一些具有相同特征与特性事物的抽象描述
    + 比如动物类的定义是比较抽象的，它抽取了动物与动物之间的相同特征。
    + 同样植物类、哺乳动物类、人类的定义也都是比较抽象的，也是提取他们的共同特征而形成的定义，这就是类。
    + 在js中，可以把构造函数看作是类

#### 实例
- 实实在在的具体事物就是某个类的实例。
    + 比如我家的旺财，是狗类的实例
    + 我的弟弟妹妹，是人类的实例
    + 在js中，通过构造函数创建的对象就是实例

#### 联系
- 如果把类看作是模子，实例则是模子印出来的东西。

#### 对象类型
- 对象的类型就是其构造函数的名字
    + 比如数组是Array类型的对象，日期是Date类型的对象
    + Array和Date就是其构造函数的名字
    + 那么通过Person创建一个实例，那么这个实例就是Person类型的对象。

## 类成员&实例成员的概念
- 类成员(静态成员)
    + 添加给类自己的属性与方法
- 实例成员
    + 添加给实例自己的属性与方法
    + 原型上供实例使用的属性与方法

## 原型
- 原型是一个对象，它的属性可以供其他对象共享
    + js中有很多原型对象，基本每个对象都有属于自己的原型
    + 原型对象的存在可以大大的节省内存开销

#### 原型的使用
- 每个构造函数都有一个prototype属性，可以给其赋值
- 然后通过构造函数创建的实例就可以共享其属性与方法

#### 创建对象时内在的4个步骤
- 创建一个新实例(本质上就是开辟了一块内存空间)
- 设置新对象的原型
    + 给新实例设置__proto__属性值
    + 这个值与构造函数的prototype属性有关
    + 赋值过程相当于这样：新实例.__proto__ = 构造函数.prototype
- 执行构造函数，执行时设置其this指向新实例
- 返回新实例的地址

#### 对象的属性访问规则
- 优先从自身查找
- 找不到就去原型找
- 还找不到继续去原型的原型找
- 直到终点，终点也没有返回undefined

#### 对象的属性赋值
- 给一个对象的属性赋值
- 如果之前没有该属性那么就是新增，有就是修改
- 对象的属性赋值只影响自己，不会对其他对象和原型对象造成影响

## 面向对象的书写过程
- 根据需求提取解决该问题所需的对象
    + 比如我要逛街，需要一个导购，需要一个保镖，需要一个女朋友
- 编写每一个对象所对应的构造函数
    + 构造函数可以重复性创建实例，因为我可能需要多个保镖
    + function Person() {}
- 抽取对象所需的属性
    + 就是该对象应该拥有的特征，比如人有名称、年龄、性别、四肢、双眼。
    + function Person(name) { this.name = name; }
- 抽取对象所需的方法
    + 就是该对象应该拥有的特性，比如人会学习创造，狗会看门逗你笑
    + Person.prototype.study = function(){};
- 根据写好的构造函数创建实例，调用属性方法解决实际需求
    + 就是调度实例干事
    + var p = new Person(); p.study();

## 歌曲管理案例

#### 过程版
```javascript
// 用来存储歌曲的歌曲列表数组
var songList = [];

// 添加歌曲，传入要添加的歌曲对象
function add(song) {
	// 保证song是对象的情况下才添加
	typeof song === 'object' && song !== null && songList.push(song);
}

// 删除歌曲，传入要删除的歌曲名称
function del(name) {
	// 借助getIndex方法计算删除歌曲的下标，
	// 为防止误删，所以只有当下标存在时才做删除操作
	var index = getIndex(name);
	index !== undefined && songList.splice(index, 1);
}

// 查找歌曲，传入要查找的歌曲名称
function search(name) {
	// 借助getIndex方法计算搜索歌曲的下标，然后返回对应歌曲
	var index = getIndex(name);
	return songList[index];
}

// 修改找歌曲，传入要修改的歌曲名称与新的歌手
function modify(name, newSinger) {
	// 借助getIndex方法计算修改歌曲的下标，
	// 为防止修改时报错，所以只有当下标存在时才做修改操作
	var index = getIndex(name);
	index !== undefined && (songList[index].singer = newSinger);
}

// 获取指定歌曲的下标
function getIndex(name) {
	// 遍历实例的songList属性，得到里面存储的每一个歌曲对象，
	// 然后使用形参与每个歌曲对象的name属性相比较，
	// 如果歌曲name相同则返回该歌曲所在songList的下标，
	// 如果没有相关歌曲，那么返回函数的默认返回值undefined
	for(var i = 0, len = songList.length; i < len; i++) {
		if(songList[i].name === name) {
			return i;
		}
	}
}
```

#### 对象版
```javascript
// 歌曲管理构造函数(类) ==> 创造实例
function SongManage(songList) {
	// 给实例添加songList歌曲列表属性存储歌曲
	// 如果对方没有传参，那么赋一个空数组默认值
	this.songList = songList || [];
}

// 原型 ==> 让实例共享属性方法
// 这里的方法，将来哪个实例调用，就操作哪个实例的songList，所以使用this.songList
SongManage.prototype = {

	// 添加歌曲
	add: function(song) {
		typeof song === 'object' && song !== null && this.songList.push(song);
	},

	// 删除歌曲 
	del: function(name) {
		var index = this.getIndex(name);
		index !== undefined && this.songList.splice(index, 1);
	},

	// 查找歌曲
	search: function(name) {
		var index = this.getIndex(name);
		return this.songList[index];
	},

	// 修改歌曲
	modify: function(name, newSinger) {
		var index = this.getIndex(name);
		index !== undefined && (this.songList[index].singer = newSinger);
	},

	// 获取指定歌曲下标
	getIndex: function(name) {
		for(var i = 0, len = this.songList.length; i < len; i++) {
			if(this.songList[i].name === name) {
				return i;
			}
		}
	}
};
```

#### 小结
- 面向过程中的变量在面向对象中变成了属性
- 面向过程中的函数在面向对象中变成了原型的方法
- 改为面向对象后全局变量减少了，复用性更强了

## 面向对象与面向过程优缺点

#### 面向对象
+ 缺点
    - 通常比面向过程消耗内存，因为有很多实例要存储
    - 前期开发比较缓慢，但是复用性强，后期开发与维护进度会逐渐加快
+ 优点
    - 变量的管理比较清晰，可读性较高
    - 因为代码与对象间的职责比较清晰，所以后期可维护性和可扩展性也比较高
    - 复用性更强

#### 面向过程
+ 缺点
    - 变量混乱，可读性较差
    - 通常有新需求出现，代码改动比较大，所以可维护性和可扩展性比较差
+ 优点
    - 开发迅速，只要能解决当前问题即可

## 面向对象3大特征
- 封装性
    + 对象可以把很多属性与方法集中在一起管理，就是js的封装性。
- 继承性
    + 对象可以使用其原型对象的属性与方法，就是js的继承性。
- 多态性
    + js没有多态。如果非要说，那么对象形态、继承关系可以随时被改变，可以认为是js的多态性。

## 原型其他

#### 谁有prototype与__proto__
- 每个函数都有prototype属性
- 每个对象都有__proto__属性
- 函数比较特殊，即是函数又是对象，所以prototype与__proto__都有

#### prototype与__proto__联系
- prototype是构造函数的属性，用来指定实例继承谁
- __proto__是对象的属性，用来指定自己继承谁
- 通常情况下，实例.__proto__ === 构造函数.prototype

#### 如何得到一个对象继承的原型
- 通过__proto__属性（但是它是非标准属性，不建议开发中使用）
- 通过constructor属性得到对象的构造函数，再访问其prototype得到原型

## 原型常见书写方式

#### 1、默认原型
```javascript
function P() {}
P.prototype.fun = function(){};
var p = new P();
```

#### 2、置换原型
```javascript
function P() {}
P.prototype = {
	constructor: P,
	fun: function(){}
};
var p = new P();
```

#### 3、extend复制扩展
```javascript
function P() {}
extend(P.prototype, {}, {
	fun: function(){}
}, {
	fun2: function(){}
});
var p = new P();
```

#### 4、Object.create
```javascript
var proObj = {
	fun: function(){}
};
var p = Object.create(proObj);
```

#### 实现属性复制函数封装
```javascrpt
function extend() {
	var target = arguments[0];
	for(var i = 1, len = arguments.length; i < len; i++) {
		for(var key in arguments[i]) {
			target[key] = arguments[i][key];
		}
	}
	return target;
}
```

#### 类成员与实例成员
- 类成员(静态成员)
    + 添加给类自己的属性与方法
- 实例成员
    + 添加给实例自己的属性与方法
    + 原型上供实例使用的属性与方法

## 原型链

#### 概念
- 一个对象继承的所有由__proto__属性串联在一起的对象，称为该对象的原型链。

#### 对象原型链的研究方案
- 先通过__proto__得到对象的原型
- 然后访问这个原型的constructor属性，确定该原型的身份
- 然后继续按照上诉两个步骤，往上研究原型，最终就得到了对象的原型链。

#### 规律与常见对象原型链结构
- 原型链的终点统一是Object.prototype
- 对象的原型和该对象的类型有关
    + 比如Person的实例，原型是Person.prototype
    + 比如Animal的实例，原型是Animal.prototype
    - []的原型链结构
        + [] ==> Array.prototype ==> Object.prototype ==> null
    - {}的原型链结构
        + {} ==> Object.prototype ==> null
    - /abc/的原型链结构
        + /abc/ ==> RegExp.prototype ==> Object.prototype ==> null
    - Person的原型链结构
        + Person ==> Function.prototype ==> Object.prototype ==> null
    - Function的原型链结构
        + Function ==> Function.prototype ==> Object.prototype ==> null
    - Object的原型链结构
       + Object ==> Function.prototype ==> Object.prototype ==> null
- 构造函数默认的prototype，它统一都继承Object.prototype
    + 比如Person.prototype，原型是Object.prototype
    + 比如Animal.prototype，原型是Object.prototype
- 通过这个规则，可以自由猜想出任意一个实例所有的原型
    + 比如Book的实例，其原型结构为： Book实例 ==> Book.protoype ==> Object.prototype ==> null

## 运算符与方法

#### in -- 运算符
- 作用：判断能否使用某个属性（包含继承的属性）
- 语法：属性名 in 对象
- 返回值：boolean

#### hasOwnProperty -- 方法
- 作用：判断一个属性是不是自己的（不包含继承的属性）
- 语法：对象.hasOwnProperty(属性名)
- 返回值：boolean

#### 关于for in遍历的补充
- for in可以遍历对象继承的属性，不过一些内置的属性是不可遍历的。

#### delete -- 运算符
- 作用：删除对象的属性
- 语法：delete 对象.属性名 || delete 对象[属性名]
- 返回值：boolean

#### instanceof -- 运算符
- 作用：判断一个对象的原型链中是否含有某个构造函数的prototype
- 语法：对象 instanceof 构造函数
- 返回值：boolean

#### Function -- 内置构造函数
- 作用：创建函数实例
- 语法：new Function(形参1，形参2，...，代码体)
- 返回值：新创建的函数实例
- 特点：能够把字符串当做js脚本执行

#### eval -- 内置的全局函数
- 作用：执行字符串代码
- 语法：eval(字符串代码)

## 函数四种调用模式
> 谨记：函数调用时，内部的this的值和这个函数定义无关，和运行(调用)有关。

### 1、函数调用模式 ==> 函数名()
这种方式调用，函数运行时内部的this指向全局对象window。

### 2、方法调用模式 ==> 对象.函数名()
这种方式调用，函数运行时内部的this指向调用该函数的对象。
(dom中事件绑定的函数，就是这种调用方式，所以this指向对应的dom对象)

### 3、构造函数调用模式 ==> new 构造函数()
这种方式调用，函数运行时内部的this指向新创建的实例对象。

### 4、上下文调用模式(间接调用模式) 
1. 函数名.call(this, arg1, arg2);
2. 函数名.apply(this, [arg1, arg2]);
这种方式调用，函数运行时内部的this指向call或apply传入的第一个参数；
如果没有传第一个参数，或者第一个参数为null、undefined，那么this统一指向window。

### call和apply
> 函数调用call和apply，实际上是间接调用自己;
例如fn.call()，表面上看是调用call方法，
实际上连fn自己也被调用了，和fn()直接调用的区别是，this变了。
- 都来自Function.prototype，所以所有的函数都可以使用。
- 相同之处是都可以改变函数this的指向
- 不同之处是传参的方式

### call和apply方法借用的原理
- 如果一个方法内部操作的是this，那么我们就可以通过call或apply指定该方法this，
this改变成谁，那么该方法最终操作的就是谁。
- 如果一个方法内部没有操作this，那么是无法借用的。

### apply的技巧
- apply可以把真数组或者伪数组平铺，然后传递给函数。
- 利用这个特征，可以很方便的对数组或伪数组进行传递操作。

### call和apply使用技巧

1. toString使用
var dateType = Object.prototype.toString.call(date).slice(8, -1);
var dateType = ({}).toString.call(date).slice(8, -1);  // 等价于上面

2. 借用数组的push方法，来操作arguments(arguments不能直接使用数组的方法)
Array.prototype.push.call(arguments, 1);
[].pop.call(arguments);

3. 通过伪数组获取一个真数据(获取后，伪数组不会被改变。本质上，是把伪数组中的数据存到一个真数组里面了)
var argArr = [].slice.call(arguments);

4. 属性继承(借用父类构造函数，来给子类的实例添加属性，相当于复用了父类中的代码)
```
// 人类
function Person(name, age) {
    this.name = name;
    this.age = age;
}
// 学生类
function Student(name, age) {
    // 因为所有的学生，都是人类，所以人类的属性学生一定有，
    // 为了代码复用，所以有如下代码
    //Person.call(this, name, age);  
    Person.apply(this, arguments);  // 上下两种方式等价
}
var stud = new Student();
```
