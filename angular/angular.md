# Angular

## 简介
- Angular 是一款来自谷歌的开源的 web 前端框架，诞生于 2009 年，由 Misko Hevery 等人创建，后为 Google 所购。是一款优秀的前端JS框架，已经被用于 Google 的多款产品当中。
- Angular1.x 的时候被人们称为下一代 web 应用, 在2015 之前得到了广泛的应用，开发单页面应用无人能敌。
- 2015 年底 Angular2.0 发布了，这个版本是完全重写Angular, 彻底的颠覆了之前的版本，同时Angular1.x也逐渐进行淘汰阶段, 现已基本不再更新
- 目前最新的angualr版本为4.x, 马上就会发布5.x, 不过不用慌, angualr4.x 5.x都是对angular2.x的升级与优化, 属于同一个框架
- 所以Angular框架目前只有两个, 一般我们会把Angular1.x称为AngularJS, 而Angular2.x等等称为Angular

#### 新特点
- Angular 是基于 TypeScript 编写的，所以使用它我们也要学习 TypeScript , 入门门槛比较高
- Angular 相对 AngularJS 的开发方法也完全不一样, 采用的是目前比较流行的组件化架构与编写方式
- 现在的 Angular 除了web开发, 还可以进行服务器端渲染, 开发跨平台桌面应用, 跨平台的原生APP。

#### 资料
- [中文官网angular2](https://angular.cn/)

## 开发环境

#### 开发工具
- Visual Studio Code(链接)[https://code.visualstudio.com/]

#### VS code 插件
- Angular Files ：在vsc中集成angular-cli工具，可界面华新建component、directove、module、routing、pipe等feature
- Auto Import：（重要）自动引入模块
- Auto Rename Tag ： html的开始和结束标签同时更新
- beautify: 代码格式化工具
- Document This: 目前vscode上最好的ts注释插件(用法ctrl+alt+d然后再Ctrl+alt+e或者d，e是全部加注释，d是对当前方法加注释)
- Path Intellisense ： 路径提醒工具，非常方便
- Settings Sync ： 通过github账号的token设置不同机子vsc设置上的同步
- TSlint ：ts语法代码质量检测
- npm :在vsc中运行npm指令
- TypeScript Toolbox ：typescript必备插件

#### 安装 nodejs
- 在终端/控制台窗口(win+R输入cmd)中运行命令 node -v 和 npm -v 来验证一下你正在运行
- 需node 6.9.x 和 npm 3.x.x 以上的版本, 老的版本可能会出现错误，更新的版本没问题

#### Angular脚手架工具 (全局只需安装一次）
- 运行命令: `npm install -g @angular/cli`
- 可使用淘宝镜像: `npm install -g @angular/cli --registry=https://registry.npm.taobao.org`
- 测试命令: `ng -v`

## 项目创建与结构说明

#### 项目创建
1. 打开 cmd 进入你要创建项目的目录
2. 运行创建项目命令: `ng new 项目名称`, 创建项目时会自动下载依赖包, 需要等待一下
3.	如果依赖安装`失败`了, `cd`进入刚刚创建的项目, 然后运行`npm install`手动安装
4. 如果仍然安装不成功, 那么`删除`node_modules文件夹, 尝试使用`cnpm install`
5. 安装成功后运行项目启动命令: `ng serve --open`

#### 目录结构介绍

###### 根目录目录结构
- e2e : 端对端的自动化测试目录，可以模拟黑河测试人员在浏览器上的测试过程, 拥有自己的tsconfig.json配置
- node_modules : 第三方依赖包目录, package.json中列举的所有第三方模块都放在其中
- src : 项目源代码目录
- .angular-cli.json ： Angular命令行工具配置文件，可以设置一系列默认值，还可以配置项目编译时要包含的那些文件
- .editorconfig : 编辑器配置文件, 确保统一的基本配置, 大多数编辑器都支持.editorconfig，参见 [http://editorconfig.org]
- .gittgnore : git忽略配置文件, 用来确保某些自动生成的文件不会被提交到源码控制系统中
- karma.conf.js : karma单元测试配置文件, 运行ng test时会用到它
- package.json : 项目描述文件，可列出该应用使用的依赖包, 还可以添加自自定义脚本
- protractor.conf.js : 端到端自动化测试配置文件, 运行ng e2e的时候会用到它
- REAADME.md : 项目说明文档
- tsconfig.json : TypeScript编译器配置文件, 用来指定ts编译时的策略
- tslint.json : tslint配置文件，用于定义ts代码统一规范, 提升编码质量, 保持风格统一

###### src目录目录结构
- app : 包含应用的组件和模块，我们要写的代码都在这个目录
- assets : 资源目录，存放图片等静态资源，构建应用时会拷贝到发布包中
- environment : Angular多环境开发配置，让我们可以在不同的环境下（开发环境，测试环境，生产环境）共用一套代码
- favicon.ico : 网站标题栏图标
- index.html：应用启动页面，构建应用时CLI会自动把所有js和css文件添加进去, 基本不用做任何处理
- main.ts：应用入口，Angular通过此文件启动应用
- polyfills.ts：导入一些库使Angular兼容不同的浏览器, 通常使用core-js和zone.js就够了
- styles.css：全局样式文件, 影响整个应用的样式集中存放在这里, 大多数情况下会在组件中使用局部样式，以利于维护
- test.ts: 单元测试的主要入口点, 它有一些你不熟悉的自定义配置，不过我们不需要编辑这里的任何东西。
- tsconfig.app.json：为Angular应用准备的ts编译配置文件, 添加第三方依赖的时候会修改这个文件
- tsconfig.spec.json：为单元测试准备的ts编译配置文件
- typings.d.ts : ts声明文件

###### src/app目录结构
- app.component.css: 根组件样式
- app.component.html: 根组件模版
- app.component.spec.ts: 根组件单元测试文件
- app.component.ts: 跟组件
- app.module.ts: 根模块, 用来引导应用如何组装并启动

###### app.module.ts文件详解
```typescript
// BrowserModule, 浏览器环境中必须引入的解析模块
import { BrowserModule } from '@angular/platform-browser';

// NgModule, 模块装饰器, 用来定义模块, 使用时需要传递一个元数据对象, 用来定义模块组成
import { NgModule } from '@angular/core';

// AppComponent, 根组件, 页面会从根组件进行渲染
import { AppComponent } from './app.component';

@NgModule({
	// 这个属性用来声明本模块的`组件 指令 管道`, 他们三者都与视图有关系, 声明后才可以使用
    declarations: [ AppComponent ],
    // 在这里指定依赖的Angular模块, 指定后才可以使用这些模块的功能, Angular模块是用来增强应用的
    imports: [ BrowserModule ],
    // 在这里指定依赖的服务, 服务是用来封装公共业务逻辑或数据处理逻辑的
    providers: [],
    // 指定根组件, 视图会从根组件进行渲染, 只有根模块才能设置该属性
    bootstrap: [AppComponent]
})
export class AppModule { }
```

## 模版引擎
- Angular集成了强大的`模板引擎`用于视图的开发, 这套引擎让我们在大部分情况下不用`手动`操作DOM
- 接下来我们就基于`脚手架`工具生成的项目进行学习, 修改的代码主要是项目的`src/app`目录

## 插值表达式
- 打开`src/app/app.component.html`文件
- 你会发现模版中含有`{{ title }}`这样的语法, 这就是插值表达式
- 它的主要作用是`数据`的输出与简单的`表达式`运算

#### 使用尝试
- 打开`src/app/app.component.ts`文件, 给AppComponent类`添加`一个实例属性

```typescript
export class AppComponent {
  title = 'app';
  site = '深圳';     // 自己添加的属性
  constructor() {}
}
```

- 然后打开`app.component.html`, 把{{ title }}插值表达式中的title`换成`site进行保存

```html
<h1>
    Welcome to {{ site }}!
</h1>
```

- 然后查看浏览器, 原本的`app`变成了`深圳`, 整个过程我们没有涉及到任何`DOM`操作
- 回想一下你之前使用过的模版引擎, 是不是觉得Angular的模版引擎很酷

#### 基本运算
- 插值表达式除了直接输出数据外, 还可以进行简单的运算, 比如下面添加的p标签
```html
  <h1>
    Welcome to {{ site }}!
  </h1>
  <p>{{ site == '深圳'? '房子太贵我要离开': '哥甚是怀念深圳蜗居的日子' }}</p>
```

## 事件绑定
- 在Angular中进行事件绑定同样无需手动获取DOM
- 我们只需要在元素身上添加`(事件)=函数`的语法即可

#### 尝试点击事件
- 在`app.component.html`文件中添加下面的`button`元素

```html
<!-- 事件绑定语法: (事件名)=函数() -->
<button (click)='clickHandler()'>点我</button>
```

- 在`app.component.ts`文件中添加对应的`clickHandler`方法

```typescript
export class AppComponent {
  title = 'app';
  site = '深圳';

  // 点击事件处理函数
  clickHandler(): void {
    console.log('按钮被点击');
  }
}
```

- 然后在浏览器中尝试点击按钮, 一个事件绑定就完成了

#### 尝试表单事件
- 有些时候在事件`触发`时我们需要拿到对应的`事件对象`
- 那么可以在模版中把`$event`变量传给函数, 下面使用input事件演示
- `注意`: 因为随着代码累加越来越多, 所以下面的代码都是新添加的代码片段

```html
<!-- 如果需要事件对象, 那么传入$event即可 -->
<input type="text" (input)='inputHandler($event)'>
```

```typescript
// 表单事件处理函数
inputHandler(e): void {
  console.log(`表单最新值为: ${e.target.value}`);
}
```

#### 数据绑定特性
- 学习了`插值`表达式与`事件`处理之后, 我们可以`见识`一下Angular的数据绑定特性了
- 修改刚刚的`inputHandler`函数为下面的样子, 然后试着在`浏览器`表单中输入值
- 你会发现属性发生`变化`时, angular会自动`更新`视图, DOM操作你又省了

```typescript
// 表单事件处理函数
inputHandler(e): void {
  this.site = e.target.value;  // 修改site属性的值
}
```

## 指令
- 前面都只是模版最基本的组成部分, `更强大`的功能莫过于指令了
- 在Angular中指令就是具有`特殊`功能的属性, 这些特殊的属性`扩展`了html的功能
- 其实上面的`事件绑定`语法就是指令的一种, 它使用了`(事件名)`这样的特殊属性

#### *ngIf
- 该指令可控制元素在DOM中的添加与移除

```html
<!-- isTure的值控制元素的添加移除 -->
<p *ngIf="isTure">控制我的添加与移除</p>
```

```typescript
export class AppComponent {
  title = 'app';
  site = '深圳';
  isTure = false;    // 使用这个值控制元素
}
```

#### 数据驱动开发思想
- 尝试在页面中`添加`一个按钮, `控制`元素的添加隐藏
- 你会发现这个业务逻辑我们`只需`修改属性即可, 维护`数据`是我们的根本, 这就是数据驱动

```html
<!-- *ngIf, isTure的值控制元素的添加移除 -->
<div>
  <p *ngIf="isTure">控制我的添加与移除</p>
  <button (click)='clickAddOrRemove()'>{{ isTure? '移除': '添加' }}</button>
</div>
```

```typescript
export class AppComponent {
  title = 'app';
  site = '深圳';
  isTure = false;    // 使用这个值控制元素

  // 点击事件, 只要修改isTure属性, 就可以控制元素的添加移除
  clickAddOrRemove(): void {
    this.isTure = !this.isTure;
  }
}
```

#### *ngFor
- 可遍历数组, 依据数据结构渲染一个列表

###### 基本使用
```html
<!-- *ngFor, 里面采用的语法是固定格式 -->
<ul>
  <li *ngFor="let city of cityList">{{ city }}</li>
</ul>
```

```typescript
export class AppComponent {
  title = 'app';
  site = '深圳';
  isTure = false;    // 使用这个值控制元素
  cityList = [
    '北京',
    '上海',
    '广州',
    '深圳'
  ];
}
```

###### 拿到数组下标
- ngFor除了可以拿到值, 还可以拿到下标

```html
<!-- *ngFor, 下面是获取下标并使用的语法 -->
<ul>
  <li *ngFor="let city of cityList; let i = index">{{ i }} : {{ city }}</li>
</ul>
```

###### 性能优化
- ngFor指令中可以通过设置`trackBy`属性来优化你的视图渲染, 属性值要求是个`函数`: https://angular.cn/api/core/TrackByFunction
- Angular内部会使用这个值作为元素的`ID`, 当数据`变化`时, 新旧ID会进行比较以判断是否有必要`重新`渲染这个元素
- 大多数情况下我们无需设置它, 如果我们渲染的数据比较`复杂`可能需要考虑一下
- PS: 这里通过修改`部分`数据, 来给大家演示当数据变化时, angular会有`选择性`的重新渲染部分元素

```html
<ul>
  <!-- *ngFor, 下面是添加trackBy的语法, trackBy要求赋值一个函数, 这里把trackByCity赋了过去 -->
  <li *ngFor="let city of cityList; let i = index; trackBy: trackByCity">{{ i }} : {{ city }}</li>
</ul>
```

```typescript
export class AppComponent {
  cityList = [
    '北京',
    '上海',
    '广州',
    '深圳'
  ];
  // trackBy函数会自动接收到ngFor遍历到的下标与item
  // 这里因为数据结构比较简单, 把下标与值拼在一起作为元素ID返回
  trackByCity(index: number, item: any) {
  	return index + '_' + item;
  }
}
```

###### trackBy简写
- 如果你的数据本身就具有ID这样的`唯一`属性, 那么你可以`省略`函数的编写
- 因为trackBy的值也可以是一个`基本数据`类型, 查看下面的代码

```html
<ul>
  <!-- 这里需要注意的是里面赋值时使用的?号, 没有它将报错 -->
  <li *ngFor="let user of userList; trackBy: user?.id">{{ user.name }}</li>
</ul>
```

```typescript
export class AppComponent {
  userList = [
    {name: '花花', age: 16, id: 10001},
    {name: '草草', age: 18, id: 10002}
    {name: '云云', age: 20, id: 10003},
    {name: '朵朵', age: 15, id: 10004}
  ];
}
```

#### ngSwitch指令组
- 有些时候我们需要根据一个变量的值来展示不同的内容
- 使用`*ngIf`可以解决我们的问题, `但是`他们看起来并不是一组, 使用ngSwitch指令组会更好
- ngSwitch指令组由`三个`不同指令构成：`[ngSwitch] *ngSwitchCase *ngSwitchDefault`
- 其中`[]`包起来的指令叫`属性`指令, 这种指令会修改DOM对象的属性
- 然后`*`号开头的指令叫`结构`指令, 这种指令会进行DOM的添加移除

```html
<!-- ngSwitch指令组，这里使用以前的site数据进行控制 -->
<!-- 其中的*ngSwitchCase因为不使用数据绑定，而是写死的字符串，所以里面的值添加单引号包裹 -->
<div [ngSwitch]='site'>
  <p *ngSwitchCase="'北京'">北京冬天有暖气</p>
  <p *ngSwitchCase="'上海'">上海冬天有空调</p>
  <p *ngSwitchCase="'深圳'">深圳冬天要裹被</p>
  <p *ngSwitchDefault>不管在哪, 只要不过冬天就好</p>
</div>
```

#### 属性指令 - 原生的DOM属性修改
- 属性指令的语法是使用[]包起来, 里面可以书写angular`扩展`的DOM属性, 也可以写`原生`DOM属性
- 下面给出的范例`都是`操作原生的DOM属性

###### innerHTML属性

```html
<!-- 使用[]属性指令语法动态修改元素的innerHTML -->
<div [innerHTML]="tpl"></div>
```

```typescript
export class AppComponent {
	title = 'app';
	tpl = `<div>
	    <h4>我是数据里的字符串模版</h4>
	    <h4>我是数据里的字符串模版</h4>
    </div>`;
}
```

###### 其他属性范例

```html
<div>
  <a [href]="aHref">点击跳转</a>
  <img [src]="imgSrc"/>
</div>
```

```typescript
export class AppComponent {
  aHref = 'http://www.baidu.com';
  imgSrc = 'http://www.baidu.com/img/bd_logo1.png';
}
```

#### container容器
- Angular不允许在一个元素上使用多个`结构性`指令(*打头的都为结构性指令)
- 那么可以通过嵌套一个`<ng-container>`标签, 给它`添加`控制指令来解决
- 这个元素在`渲染`时不会在页面上留下任何`痕迹`, 作用只是单纯的增加一些逻辑处理

###### 错误范例
- 下面使用*ngFor生成多个li标签, 但是又进一步通过*ngIf控制li标签的渲染, 最终报错

```html
<ul>
  <li *ngFor="let city of cityList; let i = index" *ngIf="i % 2 == 0">{{ i }} : {{ city }}</li>
</ul>
```

###### 解决方案

```html
<!-- 不能在一个元素上使用多个结构性指令,那么可以嵌套ng-container标签解决 -->
<ul>
  <ng-container *ngFor="let city of cityList; let i = index">
    <li *ngIf="i % 2 == 0">{{ i }} : {{ city }}</li>
  </ng-container>
</ul>
```

#### [(ngModel)] - 双向数据绑定
- 这是一个用于表单的`双向`数据绑定指令, 前面我们使用的插件表达式或指令都是`单向`的数据绑定
- 单向的特点是`数据`发生变化, `视图`跟着变化
- 但是对于`表单`元素来说, 我们希望的是表单变了数据变, 数据变了表单变

###### 准备工作
- 使用这个指令我们需要从'@angular/forms'中导入`FormsModule`模块然后配置到根模块依赖中
- 首先打开根模块`app/app.modules.ts`文件, 然后编写下面的代码

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// 导入表单模块
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule     // 把表单模块配置进来
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

###### 使用

```html
<div>
  <h2>请输入新密码</h2>
  <!-- 使用了双向数据绑定后, password的值会自动显示到表单, 表单改变时password也自动改变 -->
  <input type="text" [(ngModel)]="password">
  <span>{{ password }}</span>
</div>
```

```typescript
export class AppComponent {
	password = '默认密码';
}
```

## 特殊属性指令
- 因为元素的class与style都是复合型功能的属性
- 为了能够更精细的控制他们, Angular专门设计了特殊的指令与规则

#### class控制

###### 单个控制
- 如果只控制`一两`个class, 可以使用这种方式
- 指令语法:` [class.css类名]="表达式"`

```css
.btn-red {
    color: red;
}
```

```html
<!-- 通过isLong控制单个class的添加与移除, 这里点击按钮的时候改用直接书写表达式的方式进行值的修改 -->
<button [class.btn-red]="isLong" (click)="isLong = !isLong">点击添加移除样式</button>
```

###### 批量控制
- 如果要`批量`控制多个class, 可以使用这种方式
- 指令语法: `[ngClass]="表达式"`
- 因为这里会同时控制多个样式, 就不再编写css了, 而是通过`调试工具`查看class是否正常添加或移除

```html
<!-- 通过btnClasses控制多个class的添加与移除 -->
<button [ngClass]="btnClasses">批量添加控制class</button>
```

```typescript
export class AppComponent {
  // 批量控制按钮的class, 这里使用随机数的方式测试控制是否有效
  btnClasses = {
    a: Math.random() > 0.5,
    b: Math.random() > 0.5,
    c: Math.random() > 0.5,
    d: Math.random() > 0.5
  };
}
```

#### style控制

###### 单个控制
- 如果只控制`一两`个style样式, 可以使用这种方式
- 指令语法:` [style.样式名]="表达式"`

```html
<!-- 单个style控制 -->
<section [style.color]="sectionColor" [style.fontSize]="sectionSize">我是不一样的烟火</section>
```

```typescript
export class AppComponent {
	// 单个样式控制
	sectionColor = 'pink';
	sectionSize = '24px';
}
```

###### 批量控制
- 如果要`批量`控制多个style, 可以使用这种方式
- 指令语法: `[ngStyle]="表达式"`

```html
<!-- 多个style控制 -->
<section [ngStyle]="sectionStyle">我是不一样的烟火</section>
```

```typescript
export class AppComponent {
	// 多个样式控制
    sectionStyle = {
	    color: 'blue',
	    fontSize: '30px',
	    fontWeight: 'bold'
    };
}
```

#### 管道操作符
- 管道在AngularJS中称为过滤器, 它的作用是`格式化`数据
- 语法:`{{ 数据 | 管道函数:参数(可选) }}`, 数据与管道函数`中间`使用的符号叫管道操作符

###### 预览
- [管道API](https://angular.cn/api?type=pipe)

###### uppercase
- 大写转换

```html
<!-- 为了演示便利, 这里的Angular加了引号就是一个普通字符串, 如果不加就是数据绑定 -->
<p ngNonBindable>{{ 'Angular' | uppercase }}</p>
```

###### lowercase
- 小写转换

```html
<!-- 管道可以连续调用多个, 下面的执行过程是先转大写再转小写, 最终输出小写的angular -->
<p ngNonBindable>{{ 'Angular' | uppercase | lowercase }}</p>
```

###### number
- 数字格式化
- 可选参数: '最少整数位.最少小数位-最多小数位'
- 备注: 小数在截取时会四舍五入

```html
<div style="border: 4px solid red;">
  <!-- 至少4位整数0位小数 => 0,365 -->
  <p>{{ 365 | number: '4.0' }}</p>

  <!-- 至少1位整数4位小数, 小数至多6位 => 3.141593-->
  <p>{{ 3.14159265 | number: '1.4-6' }}</p>

  <!-- 至少1位整数4位小数, 小数至多6位 => 3.1400 -->
  <p>{{ 3.14 | number: '1.4-6' }}</p>
</div>
```

###### date
- 日期格式化

```html
<!-- 日期格式化为年月日 -->
<p>{{ currentTime | date:'yyyy-MM-dd' }}</p>
```

```typescript
export class AppComponent {
  // 日期管道测试
  currentTime = Date.now();
}
```

###### json
- 对象序列化为字符串

```html
<!-- 把之前的城市数组转为JSON输出 => [ "北京", "上海", "广州", "深圳" ] -->
<p>{{ cityList | json }}</p>
```

###### 管道链
- 可以将多个管道连接在一起，组成管道链对数据进行处理

```html
<p>{{ 'Angular' | slice:0:3 | uppercase }}</p>
```

## 组件化

#### 组件化概念
- 组件化是一种开发模块, 它把页面上每个`独立`的可视/可交互区域视为一个个组件
- 每个组件都是独立可复用的, 页面只不过是组件的容器，通过组件的自由组合形成功能完整的界面

#### 组件化好处
- 组件都是单一职责的, 每个组件实现一个功能, 基本上需求有变更只需迭代更新对应组件即可
- 组件具有高内聚低耦合的特性, 不会对其他组件造成过多干扰, 适合长久维护
- 使用组件的方式开发, 会让我们的HTML代码结构更加清晰, 提高可读性

#### 文件组织方式
- 每个组件对应一个工程目录，组件所需的各种资源都在这个目录下就近维护
- 当不需要某个组件，或者想要替换组件时，可以整个目录删除/替换

## 创建组件

#### cli工具创建
- cli工具提供了自动`创建`angular文件的命令, 可快速创建文件
- 使用工具创建时需保证`src/app/app.module.ts`文件里没有任何`注释`, 否则会有问题

###### 创建公共header组件
- 约定: `app`目录下存放页面级别组件, `app/components`目录下存放页面中的`公共`组件
- 运行命令创建header公共组件: `ng g component components/header`

###### 组件内容详解
```typescript
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
// 这个类实现了Oninit接口, 该接口定义了一个Oninit方法, 数据初始化的代码一般会写在这里, 比如发送请求获取数据
export class HeaderComponent implements OnInit {
    constructor()
    ngOnInit() {}
}
```

###### 组件的使用方式
- 每个组件定义时都有一个`selector`元数据, 元数据就是某种东西的固有特性
- 每个组件就是一个`自定义`标签, 标签名为selector元数据, 那里`使用`组件就在那里加上自定义标签即可
- 打开`app.components.html`文件, 加入下面的`html`代码然后查看浏览器效果

```html
<app-header></app-header>
```

## 父子组件通讯
-  在每个独立的组件间想互相通讯，就要使用特定的修饰符来进行组件中的通讯

#### 父传子
- 数据父传子需要两步操作

###### 第一步
- 在父组件调用子组件的时候通过`属性指令`语法传入数据
- 在父组件`app.component.html`中写入如下html代码

```html
<app-header [title]="titleData"></app-header>
```

###### 第二步
- 子组件里`导入`Input装饰器, 然后`定义`相同的属性, 使用Input装饰器进行`装饰`即可自动接收来自父的数据
- 在子组件`app/components/header.component.ts`中写入如下html代码

```typescript
import { Component, OnInit ,Input } from '@angular/core'; // 导入Input装饰器

export class HeaderComponent implements OnInit {
	// 这个属性名必须和父传递值所用的属性名一致
	// 使用Input装饰器装饰后即可接收来自父的数据
    @Input() title:string
    constructor() { }
    ngOnInit() { }
}
```

###### 测试
- 在子组件`app/components/header.component.html`中写入如下html代码

```html
<h2>头部组件, 由父组件指定的title: {{ title }}</h2>
```

###### 数据自动更新
- 当`父`里的数据发生变化时, `子`会自动接收新的值然后重新渲染视图
- 在父组件`app.component.html`中写入如下html代码, 输入文本子组件跟着更新

```html
<input type="text" [(ngModel)]="titleData">
<app-header [title]="titleData"></app-header>
```

#### 子传父 - 方式一
- 先创建一个新的组件: 'ng g component footer', 然后进行子传父练习
- 这种方式大概也是两步: 首先`父给子`传一个方法, 然后`子调用`这个方法给父传值
- 备注: 这种方式在React框架里面使用比较常见

###### 第一步
- 在父组件里定义一个`方法`, 然后调用子组件通过`属性绑定`的方式把方法传给子法

```typescript
export class AppComponent {
	parentFn(): void {
		console.log('我是来自父的方法')
	}
}
```

```html
<!-- 注意[]里面的属性名是什么, 子就用什么属性名接收 -->
<app-header [fn]="parentFn"></app-header>
```

###### 第二步
- 子组件`接收`父组件传过来的方法, 然后在`需要`的时候进行调用即可传值

```typescript
import { Component, OnInit, Input  } from '@angular/core';

export class FooterComponent implements OnInit {
    // 使用Input装饰器装饰后, 就会接收父传入的方法
    @Input() fn:any;

	// 当组件初始化完毕后就会调用自动这个方法
    ngOnInit() {
    	// 1秒后调用来自父的方法
    	setTimeou(() => {
    		this.fn();
    	}, 1000);
    }
}
```

#### 子传父 - 方式二
- 先创建一个新的组件: 'ng g component aside', 然后进行子传父练习
- 这种方式大概也是两步: 首先父`监听`子组件的一个自定义事件, 然后子里面在需要的时候`触发`这个事件进行传值
- 备注: 这种方式在Vue框架里面使用比较常见

###### 第一步
- 父组件调用子组件的时候，`绑定`一个自定义事件 ,`sonEven`就是子组件的发出的自定义事件

```html
<app-aside (sonEvent)="parentFn()"></app-aside>
```

```typescript
export class AppComponent {
	parentFn(): void {
		console.log('我是来自父的方法')
	}
}
```

###### 第二步
- 子组件里导入`Output`装饰器与`EventEmitter`事件对象
- 然后定义一个属性存储EventEmitter`实例`, 并使用Output装饰器进行`装饰`
- 然后在需要的时候向外`发射`这个属性让父接收其值

```typescript
import { Component, OnInit, Output, EventEmitter} from '@angular/core';

export class FooterComponent implements OnInit {
	// 创建EventEmitter实例, 并用output装饰器装饰
	@Output() private sonEvent = new EventEmitter<string>();

	ngOnInit() {
        // 1秒后
        setTimeout(() => {
            this.sonEvent.emit();
            console.log(123);
        }, 1000);
   }
```

## 父子通讯其他方式
 - 下面的两种方式自己阅读了解, 实际不建议这样使用, 增加了父子的耦合度

#### 父子通讯方式1
- 父组件通过`局部变量`获取子组件的引用，然后在模版里通过变量`调用`子组件的数据和方法

###### 第一步
- 父组件调用子组件的时候给子组件起个名字

```html
<app-footer #footer></app-footer>
```

###### 第二步
- 父通过子组件的名字可以在模版中直接使用其属性与方法

```html
<p>{{ footer.msg }}</p>
<button (click)='footer.fn()'>点击执行子组件的方法</button>
```

#### 父子通讯方式2
- 父组件通过`局部变量`获取子组件的引用，然后通过`ViewChild`装饰器提取子组件的属性与方法
- 接下来就可以通过js的方式调用子组件的东西了

###### 第一步
- 父组件调用子组件的时候给子组件起个名字

```html
<app-footer #footer></app-footer>
```

###### 第二步
- 父通过`ViewChild`装饰器提取子组件的属性与方法

```typescript
import { Component, ViewChild } from '@angular/core';

export class AppComponent {
	// 提取footer子组件的属性与方法到父属性footer上
	@ViewChild('footer') footer;

	ngOnInit() {
        // 父在需要的时候调用子的属性方法
        console.log(this.footer);
    }
}
```

