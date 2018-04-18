## 严格模式

#### 整体预览
| 简述 | 表现 | 作用 |
|       -       |    -    |    -   |
| 变量声明 | 未声明的变量不允许使用，ReferenceError | 防止出乎意料的变量定义 |
| 函数this | 函数调用模式下this为undefined | 指向更为合理 |
| call&apply&bind | this的指向可以设为任意数据类型 | 表现更加简单明了 |
| eval作用域 | eval里声明的变量不再污染外面的作用域 | 防止变量覆盖等意外错误，提高性能 |
| arguments与参数解耦 | 修改任意一方的值都不会造成交叉感染 | 代码运行更加合理 |
| 禁用with | 使用with语句报SyntaxError | 提高代码执行效率 |
| 禁用八进制 | 使用0开头或\0开头定义八进制数将报SyntaxError | 提高代码执行效率 |
| 属性参数重名 | 出现属性重名或参数重名将报SyntaxError | 提高代码安全性 |
| 禁用arguments.callee与函数.caller | 使用报TypeError | 提高代码安全性 |
| 特殊标识符 | eval、arguments不能作为标识符使用 | 提高代码安全性 |
| 保留字标识符 | static、private、public、interface、package、protected、yield、implements不能作为标识符使用 | 为以后着想 |
