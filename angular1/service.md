## 服务
- 用于封装功能的业务逻辑，以便复用
- 定义好的服务可以在控制器，过滤器，自定义指令以及其他服务中复用
- 定义服务有好几种方式，不过都大同小异

#### 说明
- 服务被依赖时只会执行一次，然后服务的返回值会被Angular缓存
- 后续其他地方在引入相同的服务时，会直接从缓存中取得服务所暴露的东西

#### factory方法
- 特点：必须要return一个返回值，否则报错
- 在使用时return什么就会得到什么
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
```

#### service方法
- 特点：面向对象写法，里面给this添加属性方法
- 在使用时会得到函数实例对象，this添加了什么就有什么
```javascript
var app = angular.module('app', []);
app.factory('storageSvic', [function() {
    this.set = function(key, data) {
	  try {
	    data = JSON.stringify(data);
	  }finally {
	    localStorage.setItem(key, data);
	  }
	};
    this.get= function(key) {
      var data = localStorage.getItem(key);
      try {
      	data = JSON.parse(data);
      }finally {
        return data;
      }
    };
};
```

#### value方法
- 特点：用来定义共享数据的，不存在业务逻辑的编写
```javascript
var app = angular.module('app', []);
app.value('data', { a: 1, b: 2 });
```

#### constant方法
- 特点：与value一样，不过语义上是定义常量的
- 通常会把那些不会改变的数据定义在这里，比如配置信息
```javascript
var app = angular.module('app', []);
app.constant('PI', 3.1415926);
```

## 内置服务
- angular使用服务的方式已经为我们封装好了很多常用功能

#### $http
- 专门用来发送http请求的服务，相当于JQ中的ajax
- 区别1：成功与失败回调通过then方法来添加
- 区别2：post请求默认发送的数据格式为JSON，如果发送formDate需要自己转

###### $http本身就是函数
```javascript
var app = angular.module('app', []);
app.controller('registerCtrl', ['$scope', '$http', function($scope, $http) {
  $http({
    url: '/xx/xxx',
    method: 'post',
    data: 'name:=小明&age=15',
    params: { pageindex: 1 },
    headers: {
      'Content-Type':  'application/x-www-form-urlencoded'
    }
  }).then(function(resp) {
		console.log(resp);
  }, function(resp) {
		console.log(resp);
  });
}]);
```

###### $http还提供了get、post等快捷方法
```javascript
$http.get(url, config).then();
$http.post(url, data, config).then();
$http.jsonp(url, config).then();
```

#### $location
- 原生location对象的封装，区别是url部分计算方式不同
- 相比location对象，他们的协议、域名、端口号是一样的
- 但是path、search、hash不同，$location是从#!后面算起的
```javascript
var app = angular.module('app', []);
app.controller('registerCtrl', ['$scope', '$location', function($scope, $location) {
	console.log($location);
}]);
```

###### $location常用属性
- $$absUrl：绝对路径，等价于location.href
- $$protocol：协议，等价于location.protocol
- $$host：主机名，等价于location.hostname
- $$port：端口，等价于location.port
- $$path：路径，从#!后面获取，?前面的东西
- $$search：查询字符串，从#!后面获取，?后面#号前面的东西，已解析为对象
- $$hash：哈希值，从#!后面获取，#号后面的东西

###### $location常用方法
- url：可同时设置path、search、hash
    + `$location.url('?a=1&b=2#123')`
- path：只设置path，添加?或者#号会自动转义
    + `$location.path('/teacher')`
- search：只设置search，无需添加?号，添加会自动转义
    + 字符串方式：`$location.search('pageindex=1')`
    + 对象配置方式：`$location.search({ pageindex: 1 })`
    + 键值方式：`$location.search('pageindex', 1)`
- hash：只设置hash，无需添加#号，添加会自动转义
    + `$location.hash('123')`

#### $timeout与$interval
- 原生的定时器改变数据后，angular是无法检测到的，造成视图不刷新
- 这两方法是对原生方法的封装，使用方式一样，就是为了解决上诉问题的
```javascript
var app = angular.module('app', []);
app.controller('registerCtrl', ['$scope', '$interval', function($scope, $interval) {
   $scope.val = 123;

   // 定时器使用
   var timerID = $interval(function() {
      $scope.val++;
   }, 500);

   // 取消定时器
   $interval.cancel(timerID);
}]);
```

#### $log
```javascript
var app = angular.module('app', []);
app.controller('registerCtrl', ['$scope', '$log', function($scope, $log) {
  var obj = {a: 1, b:2};
  // 普通log
  $log.log(obj);
  // 低级别错误log
  $log.info(obj);
  // 中级别错误log
  $log.warn(obj);
  // 高级别错误log
  $log.error(obj);
}]);
```
