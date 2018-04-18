## 理解react组件化思想
- 尝试使用原生js的方式封装一个组件，以理解react的开发思想
- 这里就拿tab案例中的导航部分来举例

#### 原始方式实现
- 这种方式编写代码有如神助，分分钟搞定
- 但是这种方式写完的代码复用性差，可维护性与扩展性也比较低

```jsx
<body>
    <ul class="tab" id="tab-menu" style="margin: 150px auto;">
        <li class="tab-item active">国际大牌<span>◆</span></li>
        <li class="tab-item">国妆名牌<span>◆</span></li>
        <li class="tab-item">清洁用品<span>◆</span></li>
        <li class="tab-item">男士精品</li>
    </ul>

    <script>
      var lis = document.querySelectorAll('li');
      for(var i = 0, len = lis.length; i < len; i++) {
        lis[i].onclick = function() {
          for(var i = 0, len = lis.length; i < len; i++) {
            lis[i].className = 'tab-item';
          }
          this.className = 'tab-item active';
        };
      }
    </script>
</body>
```

#### 对象封装
- 如果想在其他地方复用上面的代码，不想通过copy的方式造成冗余，就需要封装一下了
- 这里我们采用面向对象的方式进行封装
    1. 编写构造函数
    2. 原型添加一个render方法，把页面的html封装起来，免于结构上的copy
    3. 原型添加一个handler方法，用于封装DOM相关的操作代码
- 封装后，通过创建实例的方式进行调用，达到代码复用的目的

```jsx
function TabNav() {}
TabNav.prototype = {

	// 获取渲染所需的html
	render: function() {
	  return  '<ul class="tab" id="tab-menu" style="margin: 150px auto;">' +
	    '<li class="tab-item active">国际大牌<span>◆</span></li>' +
	    '<li class="tab-item">国妆名牌<span>◆</span></li>' +
	    '<li class="tab-item">清洁用品<span>◆</span></li>' +
	    '<li class="tab-item">男士精品</li>' +
	  '</ul>';
	},

	// DOM操作处理
	handler: function() {
	  var lis = document.querySelectorAll('li');
	  for(var i = 0, len = lis.length; i < len; i++) {
	    lis[i].onclick = function() {
	      for(var i = 0, len = lis.length; i < len; i++) {
	        lis[i].className = 'tab-item';
	      }
	      this.className = 'tab-item active';
	    };
	  }
	}
};
```

```jsx
// 创建实例，在指定的地方进行渲染，并进行事件绑定
var tabNav = new TabNav();
document.querySelector('#app').innerHTML = tabNav.render();
tabNav.handler();
```

#### 数据定制化
- 这个组件封装后可以提高复用减少冗余，但是还有一些不足
- 比如导航按钮的文本是写死的，如果使用者可以任意指定就更好了
    1. 构造函数中给实例添加一个props属性，让使用者传递数据
    2. 然后通过props数据把render中的html结构写活
- 其他地方不用做任何处理，改造后的组件复用性更强了，可维护性也有了一定提升

```jsx
function TabNav(props) {
    this.props = props;
}

TabNav.prototype = {

    // 获取渲染所需的html
    render: function() {
      var html = '<ul class="tab" id="tab-menu" style="margin: 150px auto;">';
      for(var i = 0, len = this.props.navList.length; i < len; i++) {
        if(i == 0) {
          html += '<li class="tab-item active">' + this.props.navList[i] + '<span>◆</span></li>';
        }else {
          html += '<li class="tab-item">' + this.props.navList[i] + '<span>◆</span></li>';
        }
      }
      html += '</ul>';
      return html;
    },

    // DOM操作处理
    handler: function() {
      var lis = document.querySelectorAll('li');
      for(var i = 0, len = lis.length; i < len; i++) {
        lis[i].onclick = function() {
          for(var i = 0, len = lis.length; i < len; i++) {
            lis[i].className = 'tab-item';
          }
          this.className = 'tab-item active';
        };
      }
    }
};
```

```jsx
// 创建实例，在指定的地方进行渲染，并进行事件绑定
var tabNav = new TabNav();
document.querySelector('#app').innerHTML = tabNav.render();
tabNav.handler();
```

#### 同一页面可复用
- 上面的代码已经很不错了，但是有个缺陷，就是同一个页面无法创建两个实例，你可以试试
- 造成这样的原因是，在dom获取上产生了冲突
- 我们这里可以通过一个特殊方法解决这个问题
    1. 添加一个可把html字符串解析为dom的方法
    2. render函数中通过该方法把html解析为dom，存储到实例this身上，然后返回
    3. 然后修改handler方法，从实例this身上开始获取子元素进行操作
- 后续使用的时候需要注意，实例的render返回的是dom不是html字符串了，所以要把innerHTML更换为appendChild
- 另外之前由于dom创建的原因，需要使用者手动调用handler方法，现在dom成了自动创建，可以把handler调用封装到render中

```jsx
function TabNav(props) {
    this.props = props;
}

TabNav.prototype = {

    // 把html字符串解析为DOM
    parseHTML: function(html) {
      var tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      return tempDiv.children[0];
    },

    // 获取渲染所需的html
    render: function() {

      // 拼接html
      var html = '<ul class="tab" id="tab-menu" style="margin: 150px auto;">';
      for(var i = 0, len = this.props.navList.length; i < len; i++) {
        if(i == 0) {
          html += '<li class="tab-item active">' + this.props.navList[i] + '<span>◆</span></li>';
        }else {
          html += '<li class="tab-item">' + this.props.navList[i] + '<span>◆</span></li>';
        }
      }
      html += '</ul>';

      // 解析DOM并返回
      this.el = this.parseHTML(html);   // dom解析
      this.handler();                             // dom事件绑定与处理
      return this.el;                              // 返回dom
    },

    // DOM操作处理
    handler: function() {
      var lis = this.el.querySelectorAll('li');
      for(var i = 0, len = lis.length; i < len; i++) {
        lis[i].onclick = function() {
          for(var i = 0, len = lis.length; i < len; i++) {
            lis[i].className = 'tab-item';
          }
          this.className = 'tab-item active';
        };
      }
    }
};
```

```jsx
var tabNav = new TabNav({ navList: ['国际大牌', '国妆名牌', '清洁用品', '男士精品'] });
document.querySelector('#app').appendChild(tabNav.render());

var tabNav2 = new TabNav({ navList: [11, 22, 33, 44] });
document.querySelector('#app2').appendChild(tabNav2.render());
```

#### 状态控制组件行为
- 现在的组件已经非常好了，但是如果这个组件的功能再复杂一些，代码中会混杂着难以维护的dom操作
- 比较好的方式是通过状态管理组件的行为，拆分业务逻辑与dom操作，修改状态，更新视图
- 这里我们把抽取一个focusIndex状态来记录组件的行为，同时为了方便管理，所有的状态都放到state对象中
    1. 在构造函数中给实例添加state对象，目前只有一个focusIndex属性，用于控制nav的焦点
    2. 然后封装一个统一的修改状态方法setState，目的是状态修改后视图也要更新刷新
    3. 把handler方法中直接修改dom的className代码变更成修改状态

```jsx
/**
  * 改造步骤：
  * 1、添加一个focusIndex状态，给个初始值，通过这个值可以控制nav默认的焦点
  * 2、改变DOM操作的做法，把点击直接修改DOM替换为修改数据
  * */
function TabNav(props) {
    this.props = props;
    this.state = {
      focusIndex: 0
    }
}

TabNav.prototype = {

    // 把html字符串解析为DOM
    parseHTML: function(html) {
      var tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      return tempDiv.children[0];
    },

    mount: function(component, wrap) {
      wrap.appendChild(component.render());
    },

    // 修改状态，修改后刷新视图
    setState: function(upState) {

      // 更新状态
      for(var key in upState) {
        this.state[key] = upState[key];
      }

      // 以新的状态重绘DOM
      var oldEl = this.el // 旧DOM
      this.el = this.render(); // 新DOM
      oldEl.parentNode && oldEl.parentNode.replaceChild(this.el, oldEl); // 新旧替换
    },

    // 获取渲染所需的html
    render: function() {

      // 拼接html
      var html = '<ul class="tab" id="tab-menu" style="margin: 150px auto;">';
      for(var i = 0, len = this.props.navList.length; i < len; i++) {
        if(i == this.state.focusIndex) {
          html += '<li class="tab-item active">' + this.props.navList[i] + '<span>◆</span></li>';
        }else {
          html += '<li class="tab-item">' + this.props.navList[i] + '<span>◆</span></li>';
        }
      }
      html += '</ul>';

      // 返回解析好的DOM对象
      this.el = this.parseHTML(html);
      this.handler();
      return this.el;
    },

    // DOM操作处理
    handler: function() {
      var _this = this;
      var lis = this.el.querySelectorAll('li');

      for(var i = 0, len = lis.length; i < len; i++) {
        lis[i].index = i;
        lis[i].onclick = function() {
          _this.setState({
            focusIndex: this.index
          })
        };
      }
    }
};
```

```jsx
// 创建实例，在指定的地方进行渲染，并进行事件绑定
var tabNav = new TabNav({ navList: ['国际大牌', '国妆名牌', '清洁用品', '男士精品'] });
tabNav.mount(tabNav, document.querySelector('#app'));

var tabNav2 = new TabNav({ navList: [11, 22, 33, 44] });
tabNav2.mount(tabNav2, document.querySelector('#app2'));
```

###### 模式抽取

```jsx
function Component() {}
Component.prototype = {

    // 把html字符串解析为DOM
    parseHTML: function(html) {
      var tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      return tempDiv.children[0];
    },

    mount: function(component, wrap) {
      wrap.appendChild(component.render());
    },

    // 修改状态，修改后刷新视图
    setState: function(upState) {
      // 更新状态
      for(var key in upState) {
        this.state[key] = upState[key];
      }

      // 以新的状态重绘DOM
      var oldEl = this.el // 旧DOM
      this.el = this.render(); // 新DOM
      oldEl.parentNode && oldEl.parentNode.replaceChild(this.el, oldEl); // 新旧替换
    }
};


function TabNav(props) {
    this.props = props;
    this.state = {
      focusIndex: 0
    }
}

TabNav.prototype = {

    // 获取渲染所需的html
    render: function() {

      // 拼接html
      var html = '<ul class="tab" id="tab-menu" style="margin: 150px auto;">';
      for(var i = 0, len = this.props.navList.length; i < len; i++) {
        if(i == this.state.focusIndex) {
          html += '<li class="tab-item active">' + this.props.navList[i] + '<span>◆</span></li>';
        }else {
          html += '<li class="tab-item">' + this.props.navList[i] + '<span>◆</span></li>';
        }
      }
      html += '</ul>';

      // 返回解析好的DOM对象
      this.el = this.parseHTML(html);
      this.handler();
      return this.el;
    },

    // DOM操作处理
    handler: function() {
      var _this = this;
      var lis = this.el.querySelectorAll('li');

      for(var i = 0, len = lis.length; i < len; i++) {
        lis[i].index = i;
        lis[i].onclick = function() {
          _this.setState({
            focusIndex: this.index
          })
        };
      }
    }
};
TabNav.prototype.__proto__ = Component.prototype;
```

```jsx
// 创建实例，在指定的地方进行渲染，并进行事件绑定
var tabNav = new TabNav({ navList: ['国际大牌', '国妆名牌', '清洁用品', '男士精品'] });
tabNav.mount(tabNav, document.querySelector('#app'));

var tabNav2 = new TabNav({ navList: [11, 22, 33, 44] });
tabNav2.mount(tabNav2, document.querySelector('#app2'));
```
