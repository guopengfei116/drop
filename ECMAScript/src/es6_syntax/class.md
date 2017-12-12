## class类
- 简述：
    + 提供了与传统面向对象语言相似的写法，减少其他程序员的学习门槛。
    + 在功能上相比es5基本没有什么区别。
- 特点：
    + 只能配合new关键字创建实例
    + 类名不会预解析
    + 类原型上的属性名可以使用表达式
    + 类原型上的属性默认是不可枚举的

#### 语法

##### 类的定义

```javascript
class Person {

	// 以前的构造函数
	constructor(name, age, gender) {
		this.name = name;
		this.age = age;
		this.gender = gender;
	};

	// 以前原型上的方法
	say() {
		console.log(`${ this.name }今年${ this.age }岁了`);
	};

};

// 使用方式一样
let xiaoming = new Person('小明', 14, '男');
xiaoming.say();
```

##### 静态方法
- 静态方法属于`类自己`,通过`类名.方法名`调用
- 注意这里 `static` 关键字`只能`作用于方法,`不能`作用于属性

```javascript
class Person {

	constructor() {
		Person.total++ ||  (Person.total = 1);
	};

	// 统计总人口,
	static getTotal() {
		return Person.total;
	};

};

let p1 = new Person;
let p2 = new Person;
console.log(Person.getTotal()); // 2
```

##### 继承特性1 - 实例成员继承
- 通过extends关键字实现继承
- 如果子类有构造器,必须添加super()调用父类构造器
- 继承后子类实例便可使用父类实例的属性与方法

```javascript
class Animal {

	constructor(name, age, gender) {
		this.name = name;
		this.age = age;
		this.gender = gender;
	};

	eat() {
		console.log('都得吃啊！');
	};

};

class Person extends Animal {

	constructor(name, age, gender) {
		super(name, age, gender);
	};

	say() {
		console.log(`${ this.name }今年${ this.age }岁了`);
	};

};
let xiaoming = new Person('小明', 14, '男');
xiaoming.eat();
xiaoming.say();
```

##### 继承特性2 - 静态成员继承

```javascript
class Animal {

	static test() {
		console.log('来自父类的静态方法');
	};

};
class Person extends Animal {};
Person.test();
```

#### 本质

##### 类本质上还是一个函数

```javascript
class Person {};
typeof Person; // function
```

##### 类中的实例方法都定义在了原型中

```javascript
class Person {
	eat() {
		console.log('吃吃吃');
	};
};
Person.prototype;
```

##### 类中的静态方法都定义在了自身

```javascript
class Person {
	static getTotal() {
		console.log('70亿');
	};
};
Person;
```

##### 继承原理

```javascript
class Animal {
	eat() {
		console.log('都得吃啊！');
	}

	static sleep() {
		console.log('睡');
	}
};

class Dog extends Animal {}

// 实现原理
Dog.prototype 继承 Animal.prototype,即子类原型 ==> 父类原型
Dog 继承 Animal,即子类 ==> 父类
```
