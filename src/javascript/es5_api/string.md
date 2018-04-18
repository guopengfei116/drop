## 字符串

#### 预览
| 名称 | 所属对象 | 作用 |
|       -       |    -    |    -   |
| charAt | Stirng.prototype | 返回指定下标的字符 |
| charCodeAt | Stirng.prototype | 返回指定下标元素的Unicode编码 |
| trim | Stirng.prototype | 去除首尾空白字符 |

#### 演示

- charAt
```javascript
var str = 'abcdef';
str.charAt(3);    // 'd'
```

- charCodeAt
```javascript
var str = 'abcdef';
str.charCodeAt( str.indexOf('c') );    // 99
```

- trim
```javascript
var str = ' lala ';
str.trim();    // 'lala'
```
