## 指令

#### 作用
- HTML在构建应用时存在诸多不足
- Angular通过扩展一系列的HTML属性或标签来增强HTML
- Angular内置了很多指令，也允许我们自定义指令

#### 指令的种类与使用
- 属性指令
    + 最常见使用最频繁的指令
    + 属性指令主要是为了封装重复的DOM操作
    + `<p ng-show="true">显不显示呢</p>`
- 标签指令
    + 使用频率第二的指令
    + 标签指令主要是为了抽取页面中可复用的组件
    + `<ng-view></ng-view>`
- 类名指令
    + 操作拥有特定class的元素，不常用，属性指令可替代
    + `<p class="指令名称">操作我</p>`
- 注释指令
    + 通过特定格式的注释使用，不常用，标签指令可替代
    + `<!-- directive:指令名称 -->`

#### 语法
- 和控制器的定义方式差不多，可以配置服务依赖与一个回调
- 语法：模块.directive(name, [ 服务依赖..., function() { return config } ])
- 命名规则
    + 名字必须使用驼峰式命名
    + 使用时需要通过-分隔单词，主要是标签名与属性名
- 注意：使用指令不一定需要控制器，除非要实现数据动态化

## 初识不同类型指令

#### 属性指令
- 属性指令主要是为了操作DOM，一般不会替换元素的子节点
- 这里的例子会替换元素子节点是因为实现比较简单
- 目的是为了先让大家对不同类型的指令有个基本认识

```html
<body ng-app="app">
	<div ngl-tpl></div>
</body>
```
```javascript
var app = angular.module('app', []);
app.directive('nglTpl', [function() {
  return {
    // 配置指令类型：A:属性，E:标签，C:类名，M:注释
    restrict: 'A',
    // 替换元素innerHTML
    template: '<p>我是指令模版</p>'
  };
}]);
```

#### 元素指令
- 元素指令主要是为了封装可重复使用的组件，一般都有自己的html模版

```html
<body ng-app="app">
	<ngl-tpl></ngl-tpl>
	<ngl-tpl2></ngl-tpl2>
</body>
```
```javascript
var app = angular.module('app', []);
app.directive('nglTpl', [function() {
  return {
    // 指令类型A:属性，E:标签，C:类名，M:注释
    restrict: 'E',
    // 替换元素innerHTML
    template: '<p>我是指令模版</p>'
  };
}]);
```
```javascript
var app = angular.module('app', []);
app.directive('nglTpl2', [function() {
  return {
    restrict: 'E',
    template: '<section><p>我是指令模版</p><p>我是指令模版</p><section/>',
    // 如果想把原来的元素覆盖掉，可以配置为true，
    // 设为true之后模版必须使用一个根元素包裹起来，
    // 建议设为true，防止自定义标签出现在DOM中
    replace: true
  };
}]);
```

#### 类名指令
- 不常用，了解即可

```html
<body ng-app="app">
	<div class="a ngl-tpl c"></div>
	<div class="a nglTpl c"></div>
</body>
```
```javascript
var app = angular.module('app', []);
app.directive('nglTpl', [function() {
  return {
    // 配置指令类型：A:属性，E:标签，C:类名，M:注释
    restrict: 'C',
    // 替换元素innerHTML
    template: '<p>我是指令模版</p>'
  };
}]);
```

#### 注释指令
- 不常用，了解即可
- 注意：注释指令必须配置replace为true

```html
<body ng-app="app">
	<!-- directive:ngl-tpl -->
	<!-- directive:nglTpl -->
</body>
```
```javascript
var app = angular.module('app', []);
app.directive('nglTpl', [function() {
  return {
    // 配置指令类型：A:属性，E:标签，C:类名，M:注释
    restrict: 'M',
    // 替换元素innerHTML
    template: '<p>我是指令模版</p>'
  };
}]);
```

## 案例

#### 自动焦点 - 属性指令

```html
<body ng-app="app" ng-controller="appCtrl">
  <input type="text" ngl-focus/>
</body>
```
```javascript
var app = angular.module('app', []);
app.directive('nglFocus', [function() {
  return {
    restrict: 'A',
    // 第一个参数为元素可使用的$scope对象
    // 第二个参数为JQLite包装过的dom对象
    // 第三个参数为元素身上的属性集合
    link: function($scope, $ele, attrs) {
      console.log(arguments);
      $ele[0].focus();
    }
  };
}]);
```

#### 拖拽 - 属性指令

```html
<body ng-app="app">
  <button ngl-drag>移动</button>
</body>
```
```javascript
var app = angular.module('app', []);
app.directive('nglDrag', [function() {
  return {
    restrict: 'A',
    link: function($scope, $ele, attrs) {
      var $document = angular.element(document);
      var initLeft = 0, initTop = 0, startX, startY;

	  // 鼠标按下监听事件
      $ele.on('mousedown', function(event) {
        event.preventDefault();

        // 元素添加定位属性
        $ele.css('position', 'relative');

        // 获取元素移动前的left与top值
        initLeft = parseInt($ele.css('left')) || 0;
        initTop = parseInt($ele.css('top')) || 0;

        // 记录鼠标按下的坐标
        startX = event.pageX;
        startY = event.pageY;

        // 监听鼠标移动及放开事件
        $document.on('mousemove', move);
        $document.on('mouseup', up);
      });

      // 元素最终值 = 移动前的值 + 移动的距离
      function move(event) {
        $ele.css({
          left:  initLeft + event.pageX  - startX + 'px',
          top: initTop + event.pageY - startY + 'px'
        });
      }

	  // 鼠标离开解除事件
      function up() {
        $document.off('mousemove', move);
        $document.off('mouseup', up);
      }
    }
  };
}]);
```

#### 丑陋时钟 - 元素指令
- 封装好的元素指令与其他指令一样可以复用
- 补充：如果自定义标签被覆盖，那么上面定义的属性会移植到模版根元素上

```html
<body ng-app="app">
  <ngl-clock></ngl-clock>
  <ngl-clock style="color: red"></ngl-clock>
</body>
```
```javascript
var app = angular.module('app', []);
app.directive('nglClock', [function() {
  return {
    restrict: 'E',
    template: '<section></section>',
    replace: true,
    link: function($scope, $ele, attrs) {

      // 样式
      $ele.css({
        display: 'inline-block',
        backgroundColor: 'skyblue'
      });

      // 每秒刷新时间
      var timerId = setInterval(function() {
        $ele.html(new Date().toLocaleString());
      }, 1000);

      // 如果使用了定时器，最好监听元素的销毁事件，
      // 销毁时取消定时器，否则会造成资源的浪费。
      $ele.on('$destroy', function() {
        clearInterval(timerId);
      });
    }
  };
}]);
```

#### 丑陋时钟操作数据实现 - 元素指令
- 时钟案例主要是操作数据，所以可以使用我们之前的方式实现

```html
<body ng-app="app">
  <ngl-clock></ngl-clock>
</body>
```
```javascript
var app = angular.module('app', []);
app.directive('nglClock', ['$interval', function($interval) {
  return {
    restrict: 'E',
    template: '<section>{{ time | date:"当天时间:hh:mm:ss"  }}</section>',
    replace: true,
    link: function($scope, $ele, attrs) {

      // 样式
      $ele.css({
        display: 'inline-block',
        backgroundColor: 'skyblue'
      });

      // 修改数据自动刷新视频
      $scope.time = new Date();
      var timerId = $interval(function() {
        $scope.time = new Date();
      }, 1000);

      // 元素的销毁取消定时器，否则会造成资源浪费。
      $ele.on('$destroy', function() {
        $interval.cancel(timerId);
      });
    }
  };
}]);
```

#### 丑陋时钟控制器实现 - 元素指令
- 在自定义指令中有一个controller配置项，功能与使用和以前一样
- 对于非DOM操作的业务逻辑，Angular建议我们放在controller当中
- 现在这种写法，就是把咱们之前的视图与控制器使用一个指令封装在了一起，以便复用
- 注意：这里因为使用了定时器，要获取元素监听销毁事件，所以给根标签加了个class

```html
<body ng-app="app">
  <ngl-clock></ngl-clock>
</body>
```
```javascript
var app = angular.module('app', []);
app.directive('nglClock', ['$interval', function($interval) {
  return {
    restrict: 'E',
    template: '<section class="clock">{{ time | date:"当天时间:hh:mm:ss"  }}</section>',
    replace: true,
    link: function($scope, $ele, attrs) {
      $ele.css({
        display: 'inline-block',
        backgroundColor: 'skyblue'
      });
    },
    controller: ['$scope', function($scope) {

      // 修改数据自动刷新视频
      $scope.time = new Date();
      var timerId = $interval(function() {
        $scope.time = new Date();
        console.log(1)
      }, 1000);

      // 元素的销毁取消定时器，否则会造成资源浪费。
      $('.clock').on('$destroy', function() {
        $interval.cancel(timerId);
      });
    }]
  };
}]);
```

#### 小结
- 服务是为了封装可复用的业务逻辑
- 指令是为了封装可复用的dom操作或视图组件
- 如果是dom操作，封装为属性指令
- 如果是视图组件，封装为元素指令

## 指令作用域
- 这里作用域指的是指令可使用的$scope
- 相信大家对指令使用的$scope来自哪里会有不少疑惑，下面就探究探究

#### 默认情况
- 默认情况下指令自己没有单独的$scope
- 在它里面使用的是父级$scope，这样容易出现误操作

```html
<body ng-app="app" ng-controller="appCtrl">
	<!-- 预期显示的10，结果被自定义指令给改写了 -->
	<p>{{ val }}</p>
	<ngl-counter></ngl-counter>
</body>
```
```javascript
var app = angular.module('app', []);
app.controller('appCtrl', ['$scope', function($scope) {
   $scope.val = 10;
}]);
app.directive('nglCounter', [function() {
  return {
    restrict: 'E',
    template: '<p ng-click="add()">{{ val }}</p>',
    controller: ['$scope', function($scope) {
      $scope.val = 0;
      $scope.add = function() {
        $scope.val++;
      };
    }]
  };
}]);
```

#### 配置单独作用域
- 如果不想和父作用域有任何瓜葛，可通过scope配置项来指定独立作用域
- 配置：`scope: {}`

```javascript
var app = angular.module('app', []);
app.controller('appCtrl', ['$scope', function($scope) {
   $scope.val = 10;
}]);
app.directive('nglCounter', [function() {
  return {
  	scope: {},
    restrict: 'E',
    template: '<p ng-click="add()">{{ val }}</p>',
    controller: ['$scope', function($scope) {
      $scope.val = 0;
      $scope.add = function() {
        $scope.val++;
      };
    }]
  };
}]);
```

#### 单独作用域继承父作用域
- 如果不想修改父作用域的数据，但是又想访问父作用域的数据，也可以
- 配置：`scope: true`

```javascript
var app = angular.module('app', []);
app.controller('appCtrl', ['$scope', function($scope) {
   $scope.val = 10;
}]);
app.directive('nglCounter', [function() {
  return {
  	scope: true,
    restrict: 'E',
    template: '<p ng-click="add()">{{ val }}</p>',
    controller: ['$scope', function($scope) {
	  // 对象在取值时自己没有就会去继承的对象身上找,就找到了父$scope,
	  // 但是对象在赋值时自己没有就新增，有则修改，是不会修改继承对象的。
      $scope.add = function() {
        $scope.val++;
      };
    }]
  };
}]);
```

#### 小结
- 在创建自定义指令时，最好使用独立作用域
- 优先配置scope：{}，其次配置scope：true
