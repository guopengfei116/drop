# AngularJS

#### 简介
- `AngularJS` 是一款使用 `javascript` 编写的前端应用`框架`
- 由 Google 员工 `Miško Hevery` 从 2009 年开始着手开发，与 `2012` 年发布了 1.0 版本
- 该项目目前已由 `Google` 正式支持，有一个全职的`开发团队`持续开发和维护这个库
- 目前 **Angular** 分为 **1.+** 与 **2.+** 两个版本，我们学习的是 **1.+** 版本

#### 作用
- 既然是`框架`那么就是为了提高开发人员`工作效率`的
- 但是 `Angular` 比较适合大中型并具有大量`数据`操作的前端应用
- `单一页面`应用程序就更适合了
- 对于小型或者 `DOM` 操作频繁的应用，用了反而会增加代码复杂度，影响开发效率

#### 特点
- **内置模块系统**
    + 这里的模块系统与**requireJS**模块类库有**很大差别**，它不是模块加载器
    + 而是帮我们**组织代码结构**的一套规范，严格限制了我们的编码方式
    + 同时多个模块可以通过依赖配置实现功能合并与共享
- **内置模版引擎**
    + 这里的模版有我们熟悉的**表达式**和**过滤器**系统，写法基本类似
    + 不同的是模版与数据的**绑定方式**不一样
- **扩展原生HTML功能**
    + 通过自定义**属性**与**标签**扩展了HTML功能，这些属性标签称为**指令**
    + 有了自定义指令基本上我们不再需要**手动**操作DOM，因为封装好了
- **数据绑定**
    + 一般的模版引擎，数据与视图的联系是**一次性**的，模版渲染到页面中俩者再无瓜葛
    + Angualr中数据与视图的联系是**永久性**的，一旦有了关联，任何时间任意一方改变都会引起另一方的变化
