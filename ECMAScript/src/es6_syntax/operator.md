## 运算符

#### ... (rest运算符, 扩展运算符, 多值运算符)
> 可把多个值合成一个数组, 也可把真伪数组拆解为多个值

- 用在函数形参定义 - 升级版arguments

```javascript
function fn(a, b, ...s) {
	console.log(s);                     // [3, 4, 5, 6]
	console.log(arguments);     // [1, 2, 3, 4, 5, 6]
}
fn(1, 2, 3, 4, 5, 6);
```

- 用在函数调用传参 - 取代apply

```javascript
let nums = [55, 33, 66, 11];
console.log(Math.min.apply(null, nums))   // 11
console.log(Math.min(...nums))                  // 11
```

- 用在数组定义 - 可合并数组

```javascript
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
let arr3 = [7, 8, 9];
let arr4 = [ ...arr1, ...arr2, ...arr3 ];
console.log(arr4);
```

- 用在解构赋值 - 把多个值合成一个数组

```javascript
let arr = [ 11, 22, 33, 44 ];
let [ a, ...b ] = arr;
console.log(a, b);      // 11, [ 22, 33, 44 ]
```
