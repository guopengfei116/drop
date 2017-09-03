# AngularJS

## 基本介绍

#### 简介
- Angular是一款使用js编写的前端应用框架
- 由Google员工Miško Hevery从2009 年开始着手开发，与2012年发布了1.0版本
- 该项目目前已由Google正式支持，有一个全职的开发团队持续开发和维护这个库
- 目前主要有**1.+**与**4.+**两个版本，我们学习的是**1.+**版本

#### 作用
- 既然是框架那么就是为了提高开发人员工作效率的
- 但是Angular比较适合大中型并具有大量数据操作的前端应用
- 单一页面应用程序就更适合了
- 对于小型或者DOM操作频繁的应用，用了反而会增加代码复杂度，影响开发效率

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

## 初探Angular
- 使用Angular开发时**页面视图**与**业务数据操作**天生就是分离的
- 从框架的层面上就限制了我们代码的编写方式

#### 使用模版引擎 - 表达式
- 表达式实际上就是模版引擎的一部分，用来进行**数据输出**或**基本运算**
- Angular中使用的表达式语法是两对大括号**{{ }}**
- 不过这里我们先解释如何在模版中使用表达式，关于如何输出变量后续补充
```html
<body>
   <div>{{ 1+1 }}</div>
</body>
<script>
  // 1、创造一个主模块
  var App = angular.module('app', []);
  // 2、让主模块管理body视图，这样就可以在视图中使用Angular的模版与指令等功能了
  angular.bootstrap(document.bod, ['app']);
</script>
```

#### 使用指令 - 管理视图
- Angular中把具有**特殊作用**的**标签属性**称为指令，这些指令全部以ng打头
- **ng-app**指令可以替代**angular.bootstrap**方法，指定当前视图由哪个模块管理
```html
<!-- 2、让主模块管理body视图 -->
<body ng-app="app">
   <div>{{ 10 * 10 }}</div>
</body>
<script>
  // 1、创造一个主模块
  var App = angular.module('app', []);
</script>
```

## 小试牛刀
- 在实际开发中一般不会向上面那样数据写死
- 而是请求ajax从后端获取数据，然后展示到页面中
- 要把**数据写活**就需要使用模块提供的**控制器**与**$scope**对象来完成

#### 使用控制器 - 创建与关联
- 控制器是我们编写业务逻辑的入口，在这里我们操作数据改变视图
```html
<body ng-app="app">
  <!-- 2、关联控制器，使用val变量 -->
  <div ng-controller="appCtrl">{{ val * val }}</div>
</body>
<script>
  var App = angular.module('app', []);
  // 1、App模块添加一个控制器，里面创建一个val变量
  App.controller('appCtrl', function() {
    var val = 10;
  });
</script>
```

#### 使用$scope载体 - 模版数据写活
- 但是上面的定义的变量无法在视图中使用
- 因为Angular无法获取这些变量，我们必须通过某种方式把这些值传给它
- 所以Angular提供了一个$scope对象，给这个对象添加的属性都可以在视图中访问
```html
<body ng-app="app">
  <!-- 2、关联哪个控制器就可以使用哪个控制器的$scope数据 -->
  <div ng-controller="appCtrl">{{ val * val }}</div>
</body>
<script>
  var App = angular.module('app', []);
  // 1、App模块添加一个控制器，控制器的主要作用是初始化与操作$scope
  App.controller('appCtrl', ['$scope', function($scope) {
    $scope.val = 10;
  }]);
</script>
```

#### 补充
- **一个**模块可以创建**任意多**个控制器
- 每个控制器可以关联视图中的一部分
```html
<body ng-app="app">
  <div ng-controller="appHeaderCtrl">{{ val }}</div>
  <div ng-controller="appMainCtrl">{{ val }}</div>
  <div ng-controller="appFooterCtrl">{{ val }}</div>
</body>
<script>
  var App = angular.module('app', []);
   App.controller('appHeaderCtrl', ['$scope', function($scope) {
$scope.val = '头';
   }]);
   App.controller('appMainCtrl', ['$scope', function($scope) {
$scope.val = '身体';
   }]);
   App.controller('appFooterCtrl', ['$scope', function($scope) {
$scope.val = '脚';
   }]);
</script>
```

## 常用指令
- Angular提供了一些具有特殊功能的属性与标签，并把他们称作指令
- 使用这些指令可以省去频繁的DOM操作，解放我们的双手
- 接下来我们要学习Angular常用的一些内置指令

#### ng-bind
- 作用：类似与{{}}表达式，可以解决{{}}闪烁问题，但是会覆盖子元素
- 演示：把angular库在body下面引入，并使用调试工具模拟3G网络即可出现
```html
<body ng-app="app" ng-controller="appCtrl">
  <!-- 两者等价，只是在网络比较慢的时候上面会出现显示源码的情况 -->
  <p>{{ val }}</p>
  <p ng-bind="val">{{ val }}</p>
</body>
```

#### ng-cloak
- 作用：如果喜欢使用{{}}，又要解决闪烁问题，可以使用ng-cloak配合css实现
- 原理：Angular渲染视图时会自动去除元素身上的ng-cloak属性，好让元素显现出来
```html
<style>
  [ng-cloak] {
    display: none;
  }
</style>
<!-- 视图渲染前body为隐藏状态，body子元素中的使用{{}}变被一起隐藏掉 -->
<!-- 视图渲染时Angular会自动去除ng-cloak属性，元素变正常显示 -->
<body ng-cloak  ng-app="app" ng-controller="appCtrl">
  <p>{{ val }}</p>
  <p ng-bind="val">{{ val }}</p>
</body>
```

#### ng-if
- 作用：控制元素的插入与移除
```html
<body ng-app="app" ng-controller="appCtrl">
  <!-- 这里的isLive是$scope中定义的属性 -->
  <p ng-if="isLive1">{{ val }}</p>
  <p ng-if="isLive2">{{ val }}</p>
</body>
```

#### ng-show
- 作用：控制元素的显示隐藏
```html
<body ng-app="app" ng-controller="appCtrl">
  <!-- 这里的isShow是$scope中定义的属性 -->
  <p ng-show="isShow1">{{ val }}</p>
  <p ng-show="isShow2">{{ val }}</p>
</body>
```

#### ng-repeat
- 作用：遍历数组或对象，也可指定遍历次数
- 注意：如果遍历的值存在相等的情况会报错，需要添加track by指定唯一key
    + 因为ng-repeat会生成很多元素，数据一改变，所有元素又得重新解析渲染一遍
```html
<body ng-app="app" ng-controller="appCtrl">
  <!-- 遍历数组 -->
  <ul>
    <!--   -->
    <!-- angular为了提高性能，会对数据进行比较，如果没有改变的元素不会重复编译生成  -->
    <!-- 但是这个优化需要给每个元素指定一个唯一key，默认这个key就是遍历到的值，key是不能重复的，重复报错  -->
  	<li ng-repeat="val in list track by $index">{{ val }}</li>
  	<li ng-repeat="(i, val) in list track by i">{{ i }}:{{ val }}</li>
  </ul>
  <!-- 遍历对象 -->
  <ul>
    <li ng-repeat="val in obj">{{ val }}</li>
    <li ng-repeat="(k, val) in obj">{{ k }}:{{ val }}</li>
  </ul>
</body>
```

#### ng-class
- 作用：动态设置或控制类名
```html
<body ng-app="app" ng-controller="appCtrl">
  <!-- 一、字符串：通过$scope属性动态设置类名 -->
  <div ng-class="classes"></div>
  <!-- 二、数组：通过$scope属性精确设置类名 -->
  <div ng-class="[ className1, className2 ]"></div>
  <!-- 三、对象：通过$scope属性控制类名 -->
  <div ng-class="{ 'a': hasA: 'b': hasB, 'c': hasC }"></div>
  <div ng-class="{ 'a b c': hasClass }"></div>
  <div ng-class="{ [classes]: hasClass }"></div>
</body>
```

#### ng-事件
- 作用：元素事件绑定
- 备注：如果回调需要事件对象，传入$event即可
```html
<body ng-cloak ng-app="app" ng-controller="appCtrl">
  <p>{{ number }}</p>
  <button ng-click="add()">点击add</button>
  <button ng-mousemove="add($event)">移动add</button>
</body>
```

###### 常见事件
- ng-click：点击
- ng-dblclick：双击
- ng-mousedown：鼠标按下
- ng-mouseup：鼠标放开
- ng-mouseenter：鼠标进入
- ng-mouseleave：鼠标离开
- ng-mousemove：鼠标移动
- ng-keydown：键盘按下
- ng-keyup：键盘放开
- ng-change：值发生改变
- ng-paste：表单粘贴
- ng-copy：表单复制
- ng-cut：表单剪切
- ng-submit：表单提交

#### ng-model
- 通常网站会有一些需要用户填写并提交数据的表单，这个指令处理表单就是神器
- 作用：表单与数据双向绑定，任意一方的值发生改变另一方跟着变
```html
<body ng-app="app" ng-controller="appCtrl">
  <input type="text" ng-model="val" />
  <input type="text" ng-model="val" />
  <h1>{{ val }}</h1>
</body>
```

#### ng-include
- 通过ajax的方式引入一段html作为子元素
- 注意：重复加载同一个模版只会请求一次，因为Angular会自动缓存
```html
<body ng-app="app" ng-controller="appCtrl">
  <header ng-include="tpl/header.tpl"></header>
  <section ng-include="tpl/section.tpl"></section>
  <section ng-include="tpl/section.tpl"></section>
  <footer ng-include="tpl/footer.tpl"></footer>
</body>
```

## 特殊属性指令

#### ng-src
- 作用：主要是为了解决原生属性在配合Angular使用时存在的bug
- 比如这样写`<img src="{{ imgUrl }}" />`
    + 浏览器首先会发起一个'{{ imgUrl }}'请求
    + 当DOM解析完毕后，Angular才会把imgUrl替换成正确的值
    + 这时候浏览器才会发起正确请求展示img
- 不足之处：访问$scope的属性，必须使用{{ }}表达式，不能直接使用属性名
```html
<body ng-app="app" ng-controller="appCtrl">
  <!-- 一、如果不使用ng指令，那么浏览器会额外发起多余的{{ imgUrl }}请求 -->
  <img ng-src="{{ imgUrl }}" />
</body>
```

#### ng-href
- 作用：主要是为了解决原生属性在配合Angular使用时存在的bug
- 不足之处：访问$scope的属性，必须使用{{ }}表达式，不能直接使用属性名
```html
<body ng-app="app" ng-controller="appCtrl">
  <!-- 预防a标签点击时造成的页面刷新 -->
  <a ng-href=""></a>
  <!-- 预防Angular解析未完成时，点击跳转到错误的url -->
  <a ng-href="{{ skipUrl }}"></a>
</body>
```

## 跃跃欲试
- 使用Angular需要改变我们开发应用的思维模式
- 从以往的DOM操作转为数据操作，DOM交由Angular的指令去操作

#### 加法计算器
```html
<body ng-app="app" ng-controller="appCtrl">
  <input type="number" ng-model="val1" />
  <span>+</span>
  <input type="number" ng-model="val2" />
  <button ng-click="add()">=</button>
  <input type="number" ng-model="sum" />
</body>
```
```javascript
var App = angular.module('app', []);
App.controller('appCtrl', ['$scope', function($scope) {
  $scope.val1 = 0;
  $scope.val2 = 0;
  $scope.sum = 0;
  $scope.add = function() {
    this.sum = this.val1 + this.val2;
  };
}]);
```

#### 用户注册 - 主要功能实现
- 创建模块与控制器，关联视图
- 初始化表单数据，使用ng-model实现双向绑定
- 注册按钮事件绑定，点击时进行数据效验，给出不同提示
```javascript
var app = angular.module('app', []);
app.controller('registerCtrl', ['$scope', function($scope) {

  $scope.user = {
    name: '',
    pwd: '',
    repeat_pwd: '',
    isAgree: false,
    msg: ''
  };

  $scope.register = function() {

    if(this.user.name.trim() == '') {
      this.user.msg = '请输入用户名！';
      return;
    }

    if(this.user.pwd.trim() == '') {
      this.user.msg = '请输入密码！';
      return;
    }

    if(this.user.pwd.trim() !== this.user.repeat_pwd.trim()) {
      this.user.msg = '两次密码输入不一致！';
      return;
    }

    if(!this.user.isAgree) {
      this.user.msg = '您未同意注册协议！';
      return;
    }

    // 打印最终结果
    console.log(this.user);
  };
}]);
```

#### 用户注册 - 数据存储
- 注册验证通过后，按照常理我们应该请求接口把用户信息存储起来
- 但是我们没有对应的接口，为了实现同样的功能
- 所以我们利用localStorage把数据存储到本地以模拟接口的数据存取功能
- 用户每次注册通过时，我们先读取本地数据，然后判断该用户是否已注册
- 如已注册给出提示，未注册则保存数据

```javascript
var app = angular.module('app', []);
app.controller('registerCtrl', ['$scope', function($scope) {

  $scope.user = {
    name: '',
    pwd: '',
    repeat_pwd: '',
    isAgree: false,
    msg: ''
  };

  $scope.register = function() {

    if(this.user.name.trim() == '') {
      this.user.msg = '请输入用户名！';
      return;
    }

    if(this.user.pwd.trim() == '') {
      this.user.msg = '请输入密码！';
      return;
    }

    if(this.user.pwd.trim() !== this.user.repeat_pwd.trim()) {
      this.user.msg = '两次密码输入不一致！';
      return;
    }

    if(!this.user.isAgree) {
      this.user.msg = '您未同意注册协议！';
      return;
    }

    // 获取本地数据
    var userList = JSON.parse(localStorage.getItem('userList')) || [];

    // 用户名效验
    for(var i = 0, len = userList.length; i < len; i++) {
      if(userList[i].name == this.user.name) {
        this.user.msg = '用户名已存在';
        return;
      }
    }

    // 通过效验则存储
    userList.push({name: this.user.name, pwd: this.user.pwd});
    localStorage.setItem('userList', JSON.stringify(userList));
    this.user.msg = '注册成功！';
  };
}]);
```

## 服务
- 一些通用性的功能应该封装到服务中，以便复用
- 定义好的服务可以在控制器中，过滤器中，自定义指令中以及其他服务中使用
- 定义服务有好几种方式，不过都大同小异，这里使用factory方法来定义服务

#### 封装user服务
- 把用户操作抽取出来，以便复用
- user服务提供三个方法
    + 1、获取用户列表
    + 2、判断用户是否已存在
    + 3、添加新用户

```javascript
var app = angular.module('app', []);
app.factory('userSvic', [function() {
    return {

        // 从localStorage中提取数据
        getUserList: function() {
            return JSON.parse(localStorage.getItem('userList')) || [];
        },

        // 遍历用户列表，与传过来的name比较判断,
        // 如果已注册，返回true，否则返回undefined
        isRegistered: function(name) {
            var userList = this.getUserList();
            for(var i = 0, len = userList.length; i < len; i++) {
                if(userList[i].name === name) {
                    return true;
                }
            }
        },

        // 把新的user对象添加到userList中，然后使用localStorage存储
        addUser: function(user) {
            var userList = this.getUserList();
            userList.push(user);
            localStorage.setItem('userList', JSON.stringify(userList));
        }

    };
}]);
```

#### 封装storage服务
- 因为localStorage存取值都必须是字符串，所以在使用时会有数据转换过程
- 转换时可能还要处理因数据格式导致的转换错误，可以把这个过程进行封装

```javascript
var app = angular.module('app', []);
app.factory('storageSvic', [function() {
  return {
    set: function(key, data) {
      try {
        data = JSON.stringify(data);
      }finally {
        localStorage.setItem(key, data);
      }
    },
    get: function(key) {
      var data = localStorage.getItem(key);
      try {
      	data = JSON.parse(data);
      }finally {
        return data;
      }
    }
  };
}]);
```

# 商品管理综合案例

## 接口

#### 获取商品列表
- 地址：http://139.199.192.48:8888/api/getprodlist
- 请求方式：GET
- 请求参数：无
- 返回数据格式
```json
{
	// 0代表正常，其他则异常
	status: 0,
	// 商品列表
	message: [
		{
			id: 1,
			name: '奔驰',
			ctime: '2017-08-26T08:37:18.000Z'
		},
		{
			id: 2,
			name: '宝马',
			ctime: '2017-08-25T06:32:14.000Z'
		},
		...
	]
}
```

#### 删除商品
- 地址：http://139.199.192.48:8888/api/delproduct/:id
- 请求方式：GET
- 请求参数：id
- 返回数据格式
```json
{
	// 0代表正常，其他则异常
	status: 0,
	// 删除结果
	message: "删除品牌数据ok"
}
```

#### 添加商品
- 地址：http://139.199.192.48:8888/api/addproduct
- 请求方式：POST
- 请求参数：name
- 返回数据格式
```json
{
	// 0代表正常，其他则异常
	status: 0,
	// 添加结果
	message: "添加成功"
}
```

## 实现

#### 商品列表
#### 删除商品
#### 添加商品
#### 搜索商品
#### 列表排序
