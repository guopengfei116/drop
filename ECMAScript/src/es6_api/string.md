## 字符串

#### 预览
| 名称 | 宿主 | 类型 |  作用 |
|       -       |    -    |    -   |
| fromCodePoint | String | method | 通过Unicode码点求字符，支持大于0xFFFF编码字符 |
| codePointAt | String.prototype | method | 获取指定下标字符的Unicode码点，支持大于0xFFFF编码字符 |
| at | String.prototype | method | 获取指定下标的字符，可正确获取大于0xFFFF编码的字符 |
| includes | String.prototype | method | 是否包含指定字符串 |
| startsWith | String.prototype | method | 起始位置是否包含指定字符串 |
| endsWith | String.prototype | method | 结束位置是否包含指定字符串 |
| repeat | String.prototype | method | 重复字符串多次 |

#### 演示

#####  String.fromCodePoint
1. 通过Unicode编码获取对应字符
2. es5中的fromCharCode方法加强版, 支持大于0xFFFF编码的字符
+ params: { number }
+ return: { string }

```javascript
String.fromCodePoint(97);         // "a"
String.fromCodePoint(0x61);     // "a"
String.fromCodePoint(19968);   // "一"
String.fromCodePoint(0x4e00); // "一"
```

#####  String.prototype.codePointAt
1. 获取指定下标字符的Unicode编码
2. charCodeAt的替代加强版，可正确获取大于0xFFFF的编码
3. 与fromCodePoint方法刚好相反
+ params: { number }
+ return: { number }

```javascript
let str = 'ABCD一二三四';
str.codePointAt(0);    // 65
str.codePointAt(4);    // 19968
```

#####  String.prototype.at 浏览器还不支持,忽略
1. 获取指定下标的字符
2. charAt的替代加强版，可正确获取大于0xFFFF编码的字符
+ params: { number }
+ return: { string }

```javascript
let str = 'ABCD一二三四';
str.at(0);    // "A"
str.at(4);    // "一"
```

#####  String.prototype.includes
1. 检测是否含有指定字符串，
2. 功能类似indexOf，但返回值不一样
+ params: { string, number } 要检测的字符串, 起始位置
+ return: { boolean }

```javascript
let str = 'abcde';
str.includes('abc');        // true
str.includes('bcd');       // true
str.includes('bcd', 2);   // false
```

#####  String.prototype.startsWith
1. 检测指定字符串在不在源字符串的起始位置
2. 功能类似includes，但判断条件更加苛刻
+ params: { string, number } 要检测的字符串, 起始位置
+ return: { boolean }

```javascript
let str = 'abcde';
str.startsWith('abc');        // true
str.startsWith('bcd');       // false
str.startsWith('bcd', 1);   // true
```

#####  String.prototype.endsWith
1. 检测指定字符串在不在源字符串的结束位置
2. 功能类似includes，但判断条件更加苛刻
+ params: { string, number } 要检测的字符串, 结束位置,包头不包尾
+ return: { boolean }

```javascript
let str = 'abcde';
str.endsWith('cde');        // true
str.endsWith('cde', 0);    // false
str.endsWith('cde', 5);    // true
```

#####  String.prototype.repeat
1. 重复一个字符串多次
+ params: { number } 次数
+ return: { string }

```javascript
"abc".repeat(3); // "abcabc"
"123".repeat(4); // "123123123123"
```
