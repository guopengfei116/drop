## angular

#### module
- 创建或获取模块

```javascript
angular.module('app', []); // 2参数创建
angular.module('app'); // 1参数获取
```

#### bootstrap
- 手动启动Angular应用

```javascript
angular.bootstrap(element);
```

#### element
- 传入一个dom包装成JQLite对象，是一个简化版的JQ对象
- 功能较弱，不支持传入选择器，包装后可以使用常见的JQ方法与属性，
- 提示：如果页面中提前引入了JQuery，那么Angular会自动检测替换为JQ对象

```javascript
var $body = angular.element(document.body);
console.log($body);
```

#### lowercase
- 字符串转小写

```javascript
angular.uppercase('AbCd'); // abcd
```

#### uppercase
-  字符串转大写

```javascript
angular.uppercase('AbCd'); // ABCD
```

#### copy
- **复制**数组或对象，得到一个**新对象**
- 内部深拷贝实现
    + 深拷贝：遇到子对象递归拷贝子属性
    + 浅拷贝：遇到子对象直接拷贝对象地址

```javascript
var list = [ { name: '小芳', age: 16 }, { name: '小美', age: 16 } ];
var cloneList = angular.copy(list);
// false，是一个全新的list
console.log(cloneList === list);
// false，里面的每一个对象也是全新的
console.log(cloneList[0] === list[0]);
```

#### merge
- **合并**任意多对象的属性到一个**指定**对象身上
- merge和copy的区别是不会产生新对象，而是对旧对象的增强
- 内部也是深拷贝实现

```javascript
var o = { a: 11 };
var o1 = { b: 22 };
var o2 = { c: 33 } };
var list = [ { name: '小芳', age: 16 }, { name: '小美', age: 16 } ];
// 把其他对象的属性全拿过来
angular.merge(o, o1, o2, list);
// false，是深拷贝实现的
console.log(o[0] === list[0]);
```

#### extend
- **合并**任意多对象的**第一层**属性到一个**指定**对象身上
- 功能与merge一样，区别在于extend是浅拷贝

```javascript
var o = { a: 11 };
var o1 = { b: 22 };
var o2 = { c: 33 } };
var list = [ { name: '小芳', age: 16 }, { name: '小美', age: 16 } ];
// 把其他对象的第一层属性全拿过来
angular.extend(o, o1, o2, list);
// true，是浅拷贝实现的
console.log(o[0] === list[0]);
```

#### forEach
-  数组或对象迭代方法

```javascript
angular.forEach([11, 22, 33], function(v, i, arr) {
	console.log(v, i, arr);
});
angular.forEach({a: 11, b: 22, c: 33}, function(v, k, obj) {
	console.log(v, k, obj);
});
```
