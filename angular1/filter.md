## 过滤器

#### 作用
- 在视图中，同一个数据可能在不同地方，需要以不同的格式或方式进行显示
- 这种情况，我们需要在不同的地方对数据进行临时的格式转换
- 并且你要确保这些临时性的数据转换不会伤及到原数据
- 过滤器就是专门解决这类问题的

#### 创建过滤器
- 和控制器的定义方式差不多，可以配置服务依赖与一个回调
- 但是过滤器需要我们在回调中return另一个回调
    + 原因是因为外面的回调需要通过配置接收一些服务依赖
    + 里面的回调负责接收来自模版的数据，对其进行加工处理
    + 然后把处理后的结果return，最终里面的回调return什么，模版上就渲染什么
- 语法：模块.filter(name, [ 服务依赖..., function() { return callback } ])

#### 基本使用
- 模版语法：{{ value | filterName1 | filerName2 | ... }}
- 备注：可以使用|做连接符使用任意多过滤器
- 这样前一个过滤器的结果会交由下一个过滤器继续处理

```html
<body ng-app="app" ng-controller="appCtrl">
  <div>{{ date | formatDate }}</div>
</body>
```
```javascript
var app = angular.module('app', []);
app.filter('formatDate', [function() {
	// 第一个值固定为模版中的数据，后面为用户指定的参数
	return function(tplTime) {
		var date = new Date(tplTime);
		return date.getFullYear() + '_' + (date.getMonth() + 1) + '_' + date.getDate();
	};
}]);
```

#### 使用参数
- 模版语法：{{ value | filterName:'arg1':'arg2':... }}
- 备注：可以使用:做连接符添加任意多参数

```html
<body ng-app="app" ng-controller="appCtrl">
  <div>{{ date | formatDate:'MM-DD-YYYY' }}</div>
</body>
```
```javascript
var app = angular.module('app', []);
app.filter('formatDate', [function() {

	// 第一个值固定为模版中的数据，后面为用户指定的参数
	return function(tplTime, format) {

		// 分别得到模版日期对应的年月日
	    let date = new Date(tplTime);
	    let y = date.getFullYear();
	    let m = date.getMonth() + 1;
	    let d = date.getDate();

	    // 创建匹配年月日的三个不同正则
	    let yReg = /YYYY/i;
	    let mReg = /MM/i;
	    let dReg = /DD/i;

	    // 最后进行数据替换
	    return format.replace(yReg, y).replace(mReg, m).replace(dReg, d);
	};
}]);
```

#### 补充了解 - 在js中使用过滤器
- 大部分的过滤器都是在视图中使用的
- 如果你需要，也可以利用$filter服务获取到指定的过滤器关键函数，然后在js中调用

```html
<body ng-app="app" ng-controller="appCtrl">
  <div>{{ date }}</div>
</body>
```
```javascript
var app = angular.module('app', []);
app.filter('formatDate', [function() {
	return function(tplTime) {
        var date = new Date(time);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        return format.replace('YYYY', y).replace('MM', m).replace('DD', d);
	};
}]);
// 配置$filter服务依赖，$filter本身是一个方法
// 调用并传一个过滤器名称就会得到对应的过滤器函数
// 然后你就可以在js中使用你想使用的过滤器函数了
app.controller('appCtrl', ['$scope', '$filter',  function($scope, $filter) {
    var formatDateFn = $filter('formatDate');
    $scope.date = formatDateFn(Date.now(), 'DD-MM-YYYY'));
}]);
```

## 内置过滤器
- 前面我们学会了如何去创建并使用过滤器
- 实际上Angular已经帮我们内置了一些非常实用的过滤器
- 有了它们在开发中又可以省不少力气

#### currency
- 将数值格式化为货币格式
- 可指定货币符号与保留的小数点位数，默认保留2位
```html
<body ng-app="app" ng-controller="appCtrl">
    <div>{{ val | currency:'￥':'2' }}</div>
</body>
```

#### date
- 日期格式化，可以任意组合年月日时分秒以及毫秒
- 年y、月M、日d、时h、分m、秒s、毫秒sss
- 注意：因为月与分都是m，所以使用大小写进行区分
```html
<body ng-app="app" ng-controller="appCtrl">
    <div>{{ val | date:'yyyy-MM-dd hh:mm:ss:.sss' }}</div>
</body>
```

#### orderBy
- 对数组进行排序，一般配置ng-repeat使用
- 第一个参数可以指定排序规则，值可以是字符串、数组
- 第二个参数可以指定顺序，默认false从小到大，true从大到小
- 了解：第一个参数还可以是数组按优先级指定多个关键字或函数动态设置关键字

###### 普通排序
```html
<body ng-app="app" ng-controller="appCtrl">
    <ul>
      <!-- 从小到大 -->
      <li ng-repeat="v in list | orderBy ">{{ v }}</li>
    </ul>
    <ul>
      <!-- 从大到小 -->
      <li ng-repeat="v in list | orderBy:null:true ">{{ v }}</li>
    </ul>
</body>
```
```javascript
var app = angular.module('app', []);
app.controller('appCtrl', ['$scope', function($scope) {
  $scope.list = [11, 22, 33];
}]);
```

###### 按属性及优先级排序
```html
<body ng-app="app" ng-controller="appCtrl">
    <ul>
      <!-- 按年龄排序 -->
      <li ng-repeat="v in list | orderBy:'age' ">{{ v }}</li>
    </ul>
    <ul>
      <!-- 先按年龄排序，如果相等再按身高排序 -->
      <li ng-repeat="v in list | orderBy:['age', 'height'] ">{{ v }}</li>
    </ul>
</body>
```
```javascript
var app = angular.module('app', []);
app.controller('appCtrl', ['$scope', function($scope) {
  $scope.list = [
  	{ name: '小明', age: 16, height: 175 },
  	{ name: '小红', age: 15, height: 160 },
  	{ name: '小芳', age: 16, height: 165 }
  ];
}]);
```

#### filter
- 找出数组中符合规则的数据【过滤、搜索】
- 需要一个参数指定要查找的关键字，值可以是字符串、对象

###### 普通搜索
```html
<body ng-app="app" ng-controller="appCtrl">
    <ul>
      <!-- 搜索含有字符a的数据 -->
      <li ng-repeat="v in list | filter:'a' ">{{ v }}</li>
    </ul>
</body>
```
```javascript
var app = angular.module('app', []);
app.controller('appCtrl', ['$scope', function($scope) {
  $scope.list = ['aa', 'bb', 'cc', 'abc', 'cba' ];
}]);
```

###### 按属性值搜索
```html
<body ng-app="app" ng-controller="appCtrl">
    <ul>
      <!-- 搜索对象age属性值为16的数据 -->
      <li ng-repeat="v in list | filter:{age: 16} ">{{ v }}</li>
    </ul>
</body>
```
```javascript
var app = angular.module('app', []);
app.controller('appCtrl', ['$scope', function($scope) {
  $scope.list = [
  	{ name: '小明', age: 16, height: 175 },
  	{ name: '小红', age: 15, height: 160 },
  	{ name: '小芳', age: 16, height: 165 }
  ];
}]);
```

#### 其他过滤器
- number：类似于currency，只是没有货币符合
- json：将对象转为JSON字符串
- limitTo：截取数组字符串前几位或后几位
- lowercase：转小写字母
- uppercase：转大写字母
