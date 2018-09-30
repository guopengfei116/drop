# js基础

## 1. typeof运算结果

string、number、boolean、object、undefined、sysbom

## 2. 哪些操作会引起数据类型的隐式转换

算术运算、字符串拼接、if/while判断语句、==运算符、非运算符

## 3. ===与==区别

当需要严格判断数据类型时使用===全等比较，代码更加健壮；
如果有number数据类型比较，想要把字符串自动转为数字比较，可以使用==；
如果想排除null和undefined，可以使用==。

## 4. window.onload和DOMContentLoaded区别

window.onload需要等待整个网页的资源都加载完毕后才触发，如果页面有大量图片和媒体文件，那么触发的比较慢；DOMContentLoaded是在HTML文档解析为DOM树时触发，无法等待其他资源文件的加载，触发比较快。

## 5. document.readyState有什么用

当document文档正在加载时，状态为"loading"，当文档结束渲染但在加载内嵌资源时，状态为"interactive"，并触发"DOMContentLoaded"事件，当文档全部加载完毕时，状态为"complete"，并触发"window.load"事件。

## 6. DOM文档的加载流程

- 1. 解析HTML结构
- 2. 加载外部脚本和样式文件
- 3. 解析并执行脚本代码
- 4. 构造HTML DOM模型，触发DOMContentLoaded事件
- 5. 加载图片、多媒体等外部文件
- 6. 页面加载完毕，触发window.onload事件

## 7. JS中有哪些内置函数？

Object、Array、Function、Number、String、Boolean、Date、RegExp、Error、eval

## 8. JS变量按照存储方式分为哪些类型，分别有什么特点？

值类型与引用类型。值类型在赋值时会copy一个新值赋过去；引用类型赋值时会copy对象的内存地址赋过去。

## 9. typeof null的结果是什么？

object，因为null最初是参照java语言而来的，在java中null代表空对象。

## 10.  如何理解JSON？

JSON在js中有两层含义，一：是一种数据传输格式，二：是ES5新增的一个对象，这个对象只有两个方法，stringify与parse，用于JSON数据的序列化与反序列化。

## 11. 哪些值转换布尔类型为false

NaN、0、''、""、``、null、undefined