# angular-route
- 这是Angular官方提供的一个独立模块，称为插件也可以
- 主要作用是通过url控制不同视图的加载，可实现单页面应用程序

## 单页面应用概念
- 单页面即网站只有一个页面框架主体
    + 网站会根据url的变化按照一定规则
    + 以ajax的方式加载不同的视图，实现页面切换效果
- 优点
    + 页面切换仅仅是局部模版的替换，响应速度会提高
    + 省去了资源的重复加载，公共视图的重复刷新，脚本的重复执行
    + 更好的实现了与后端的分离，减轻了服务端渲染模版的压力
- 缺点
    + 因为不同页面都是ajax加载的html模版片段，所以不利于SEO

#### 单页面应用演示
- 这里利用ng-include指令来演示单页面应用的概念

```html
<body ng-app="app" ng-controller="appCtrl">
  <header>公共头部</header>
  <main ng-include="pageUrl"></main>
  <footer>公共底部</footer>
  <button ng-click="changeUrl('tpl/index.html')">首页</button>
  <button ng-click="changeUrl('tpl/login.html')">登陆页</button>
  <button ng-click="changeUrl('tpl/register.html')">注册页</button>
</body>
```
```javascript
var app = angular.module('app', ['ngRoute']);
app.controller('appCtrl', ['$scope', function($scope) {
    $scope.pageUrl = 'tpl/index.html';
    $scope.changeUrl = function(url) {
      $scope.pageUrl = url;
    };
}]);
```

#### 改进
- 上面的演示案例中，页面切换是通过按钮点击发起的
- 在实际的项目中，页面的展现应该由url的变化而发起
- 问题
    + 普通的url发生改变时，浏览器会**自动**跳转到新的页面
    + 这个过程我们无法进行干预，那就无法实现单页面
- 解决
    + 当页面的hash值发生变化时，浏览器是**不会**发生页面跳转的
    + 我们可以使用$scope.$on方法监听Angular的内置事件$locationChangeStart得知这个变化
    + 然后通过$location.$$path属性取得hash中的path信息，从而给用户展示不同的视图

```html
<body ng-app="app" ng-controller="appCtrl">
  <header>公共头部</header>
  <main ng-include="pageUrl"></main>
  <footer>公共底部</footer>
</body>
```
```javascript
var app = angular.module('app', ['ngRoute']);
app.controller('appCtrl', ['$scope', '$location', function($scope, $location) {
    // $scopehash变化时根据hash中的path动态切换页面
    $scope.$on('$locationChangeStart', function() {
      switch ($location.$$path) {
        case '/index':
          $scope.pageUrl = 'tpl/index.html';
          break;
        case '/login':
          $scope.pageUrl = 'tpl/login.html';
          break;
        case '/register':
          $scope.pageUrl = 'tpl/register.html';
          break;
      }
    });
}]);
```

## 剖析

#### hash由来
- hash最初作用是，通过ID定位页面的元素，实现页面内的跳转
- 最常见的使用场景都是点击a标签，跳转到页面指定位置，这时候页面hash会跟着变化
- 除了点击a标签，我们手动在url中输入指定hash值也会自动跳转

```html
<body>
    <a href="#mother">找妈妈</a>
    <a href="#father">找爸爸</a>
    <ul>
    	<li>小蝌蚪</li>
    	<li>小蝌蚪</li>
    	<li>小蝌蚪</li>
    	<li>小蝌蚪</li>
    	<li id="mother">青蛙妈妈</li>
    	<li>小蝌蚪</li>
    	<li>小蝌蚪</li>
    	<li>小蝌蚪</li>
    	<li>小蝌蚪</li>
    	<li id="father">青蛙爸爸</li>
    	<li>小蝌蚪</li>
    	<li>小蝌蚪</li>
    	<li>小蝌蚪</li>
	</ul>
</body>
```

#### hash变化
- 在h5标准中，浏览器给window对象实现了一个hashchange事件
- 当hash变化时这个事件就会触发，使用它实现单页面就方便多了
- 示例：[网易云音乐](http://music.163.com)
- angular源码中就使用了该事件监听hash变化
- 备注：如果没有该事件，我们也可以通过定时器，每隔一定时间检测url的变化

```html
<body>
	<a href="#mother">找妈妈</a>
	<a href="#father">找爸爸</a>
</body>
```
```javascript
<script type="text/javascript">
window.onhashchange = function() {
   console.log('hash变化为:' + location.hash);
};
</script>
```

## angular-route使用
- 该模块的功能可以认为是ng-include与$location的结合版
- 可以通过配置的方式自动加载模版，模版还可以配置对应的控制器
- 同时还提供了其他解析url参数的服务

#### 基本使用
- 使用这个模块，我们只需配置好规则，剩下的交给模块自动去处理
- 另外模块需要我们通过ng-view指令指定模版放置的位置
- 配置
    + 模块实例上有一个config方法，是专门用来配置的
    + 语法：`模块.config([ 依赖..., callback ])`
    + 语法和其他模块方法类似，但是不需要名字，因为这是对模块功能的配置

```html
<body ng-app="app">
  <header>公共头部</header>
  <main ng-view></main>
  <footer>公共底部</footer>
</body>
```
```javascript
// 创建主模块，并添加ngRoute依赖
var app = angular.module('app', ['ngRoute']);
// 把配置路由所需的$routeProvider依赖引入进来，然后调用依赖提供的方法进行配置
app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl: './tpl/index.html'
    })
    .when('/index', {
      redirectTo: '/'
    })
    .when('/login', {
      templateUrl: './tpl/login.html'
    })
    .when('/register', {
      templateUrl: './tpl/register.html'
    })
    .otherwise({
      templateUrl: './tpl/404.html'
    });
}]);
```

#### 添加控制器
- 编写业务逻辑或动态化数据可以配置控制器

```html
<body ng-app="app">
  <header>公共头部</header>
  <main ng-view></main>
  <footer>公共底部</footer>
</body>
```
```javascript
var app = angular.module('app', ['ngRoute']);
app.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/', {
		  templateUrl: './tpl/index.html'
		})
		.when('/login', {
		  templateUrl: './tpl/login.html',
		  controller: ['$scope', function($scope) {
		    $scope.content = '你是谁';
		  }]
		})
		.when('/register', {
		  templateUrl: './tpl/register.html',
		  controller: ['$scope', function($scope) {
		    $scope.content = '你叫啥';
		  }]
		})
		.otherwise({
		  templateUrl: './tpl/404.html',
		});
}]);
```

#### 路由参数
- 之前我们访问过这样一个接口：`/api/delproduct/:id`
- 它把路径的一部分作为参数获取，然后返回不同的数据
- 我们也可以配置这样的路由规则，最常见的场景就是不同id展示不同的信息
- 配置完毕后，我们可以通过插件提供的$routeParams服务需要获取这些参数值

```html
<body ng-app="app">
  <header>公共头部</header>
  <main ng-view></main>
  <footer>公共底部</footer>
</body>
```
```javascript
var app = angular.module('app', ['ngRoute']);
app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
		templateUrl: './tpl/index.html'
	  })
      .when('/user/list/:id', {
        templateUrl: './tpl/user_list.html',
        controller: ['$scope', '$routeParams', function($scope, $routeParams) {
          $scope.content = $routeParams.id;
        }]
      });
}]);
```

#### 路由事件

```javascript
app.controller('appCtrl', ['$scope', function($scope) {
    $scope.$on('$routeChangeStart', function() {
      console.log('跳转前');
    });
    $scope.$on('$routeChangeSuccess', function() {
      console.log('跳转后');
    });
    $scope.$on('$viewContentLoaded', function() {
      console.log('视图加载完毕');
    });
    $scope.$on('$routeChangeError', function() {
      console.log('跳转失败');
    });
}]);
```

## 汇总

#### $routeProvider
- 路由配置的服务
- when(url, config): 添加路由规则
    + config.redirectTo：重定向
    + config.template： 字符串模版
    + config.templateUrl： 模版路径
    + config.controller：模版对应的控制器
- otherwise: 路由不匹配的处理规则
    + 一般配置一个404页面

#### $routeParams
- 提取url参数的服务

#### 事件
- $routeChangeStart: 路由跳转前
- $routeChangeSuccess: 路由跳转后
- $viewContentLoaded: 视图加载完毕
- $routeChangeError: 路由跳转失败

## 事件API
- $scope上有三个事件相关的方法
- $on(e, arg1, arg2, ...): 监听事件
- $emit(eName, arg1, arg2, ...): 触发自身与所有父的自定义事件
- $broadcast(eName, arg1, arg2, ...): 触发自身与所有子的自定义事件

#### $emit

```html
<body ng-app="app">
	<main ng-controller="mainCtrl">
	    <div ng-controller="divCtrl">
	      <button ng-click="parents()">找爸爸</button>
	    </div>
  	</main>
</body>
```
```javascript
var app = angular.module('app', ['ngRoute']);
app.controller('mainCtrl', ['$scope', function($scope) {
    $scope.$on('divEvent', function(e, msg) {
      console.log(msg);
    });
}]);
app.controller('divCtrl', ['$scope', function($scope) {
    $scope.parents = function() {
      $scope.$emit('divEvent', '爸爸你在哪');
    };
}]);
```

#### $broadcast

```html
<body ng-app="app">
	<main ng-controller="mainCtrl">
	    <button ng-click="find()">找孙女</button>
	    <div ng-controller="divCtrl"></div>
  	</main>
</body>
```
```javascript
var app = angular.module('app', ['ngRoute']);
app.controller('mainCtrl', ['$scope', function($scope) {
    $scope.find = function() {
      $scope.$broadcast('mainEvent', '孙女你在哪');
    };
}]);
app.controller('divCtrl', ['$scope', function($scope) {
    $scope.$on('mainEvent', function(e, msg) {
      console.log(msg);
    });
}]);
```
