## 正则

#####  flags
1. 返回正则表达式的修饰符
2. es5新增了source属性可获取正文

```javascript
let reg = /abc/gi;
reg.flags;              // gi
reg.source;           // abc
```

## Math

#####  trunc
1. 舍去小数取整
+ return: { number }

```javascript
var float = 3.1415;
Math.trunc(float);      // 3
```

#####  sign
1. 判断数据转为数字后, 值为正负还是零
+ return: { number } 正为1，负为-1，或者0与-0

```javascript
var num = 3;
Math.sign(num);      // 1
```

#####  hypot
1. 求平方和的平方根
+ return: { number }

```javascript
// 利用勾股定理求直角三角形斜边长
Math.hypot(3, 4);   // 5
```
