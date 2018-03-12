# js语法相关面试图

## 连续赋值题目

```javascript
var o = { a: 1 };
var o2 = { b: 10 };
o.x = o = o2;
o.x // undefined
```
