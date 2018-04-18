## 语句

#### for of
> 新的循环语句, 可遍历数组得到里面的每个值, 也可以遍历Set与Map以及内置的类数组的对象

- 遍历Array

```javascript
let arr = ['a', 'b', 10, 20];
for(let v of arr) {
	console.log(v);   // 'a', 'b', 10, 20
}
```

- 遍历String

```javascript
let str = 'abc'
for(let v of str ) {
  console.log(v);   // 'a', 'b', 'c'
}
```

- 遍历Set

```javascript
let set = new Set([1, 2, 3, 3, 4, 4])
for(let v of set) {
  console.log(v);   // 1, 2, 3, 4
}
```
