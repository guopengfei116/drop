## 数字

#### 预览
| 名称 | 宿主 | 类型 |  作用 |
|       -       |    -    |    -   |
| MAX_SAFE_INTEGER | Number | property | js可安全表示的最大整数, 2^53次方 - 1 |
| MIN_SAFE_INTEGER | Number | property | js可安全表示的最小整数, -2^53次方 + 1 |
| isSafeInteger | Number | method | 判断一个整数在不在js可安全表示的范围内 |
| isInteger | Number | method | 是不是整数，小数点后为0的也算，比如2.0 |
| isNaN | Number | method | 是不是NaN |
| isFinite | Number | method | 是不是非无穷的数字 |
| parseInt | Number | method | 字符串转整数，原本全局的方法的转移 |
| parseFloat | Number | method | 字符串转浮点数，原本全局的方法的转移 |

#### 演示

#####  Number.isSafeInteger
1. 判断一个整数在不在准备表示的范围内
+ params: { any }
+ return: { boolean }

```javascript
Number.isSafeInteger(888);                               // true
Number.isSafeInteger(Math.pow(2, 53) - 1);     // true
Number.isSafeInteger(-Math.pow(2, 53) + 1);   // true
Number.isSafeInteger(Math.pow(2, 53));          // false
Number.isSafeInteger(-Math.pow(2, 53));         // false
```

#####  Number.isInteger
1. 判断是不是正整数
2. 小数点后为0的也算, 比如2.0
+ params: { any }
+ return: { boolean }

```javascript
Number.isInteger(100);          // true
Number.isInteger(Infinity);     // false
Number.isInteger(-Infinity);    // false
```

#####  Number.isNaN
1. 判断是不是NaN
2. 全局下的isNaN方法会先进行数值转换再判断, 这个不会
+ params: { any }
+ return: { boolean }

```javascript
Number.isNaN(123);              // false
Number.isNaN(NaN);             // true
Number.isNaN("abc");            // false
Number.isNaN([ 'a', 'b', 'c' ]);  // false
```

#####  Number.isFinite
1. 判断是不是数字, 并且非无穷
2. 全局下的isFinite方法会先进行数值转换再判断, 这个不会
+ params: { any }
+ return: { boolean }

```javascript
Number.isFinite(100);       // true
Number.isFinite(Infinity);  // false
Number.isFinite("100");    // false
```

#####  Number.parseInt
1. 将之前全局的parseInt移植到Number对象上
2. 这样设计更加合理, 逐步减少全局性方法

```javascript
Number.parseInt("100.123", 10); // 100
Number.parseInt("100.123", 2);   // 4
Number.parseInt("100.123", 8);   // 64
Number.parseInt("100.123", 16); // 256
```

#####  Number.parseFloat
1. 将之前全局的parseInt移植到Number对象上
2. 这样设计更加合理, 逐步减少全局性方法

```javascript
Number.parseFloat("100.123"); // 100.123
Number.parseFloat("10PPP0.123"); // 10
```

#### Number方法预览
![Number](./imgs/number.jpg)
