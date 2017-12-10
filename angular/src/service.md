# Angular

## 服务

#### 什么是服务
- 在Angular中, 以`组件`为中心的进行开发, 如果组件中存在公共的`逻辑处理`, 那么可以抽取为一个`服务`(都是js逻辑, 没有模版与样式)
- 所以服务就是一段复用性很强的`纯`逻辑代码，最常见的服务比如Http请求, Cookie操作, Storage操作, 数据格式转换, 排序处理等等

#### 使用服务的好处
- 与大部分的技术解决方案一样, 可以提高程序的复用性, 减少冗余代码, 提高可维护性, 增加代码质量等等
- 如果说`函数`是代码复用的形式, `对象`是比函数高一维度的复用形式, 那么`Angular服务`是比对象再高一维度的复用表现形式

#### 文件组织
- Angular一个服务一般由`一个`文件构成, 所以每个服务不用单独建立文件夹
- 一般会在项目中建立一个`专门`用来存放服务的`总`文件夹, 与Angular的其他功能文件进行区分
- 如果服务`比较多`, 那么可以再建立`子`文件夹, 对服务的`种类`进行进一步划分

## 创建服务
- cli工具提供了自动`创建`各种angular文件的命令, 用于快速生成文件

#### 创建文件
- 约定: 在`app`目录下创建一个`service`目录作为所有服务的根目录
- 运行命令创建storage服务: `ng g service service/storage`

#### 编码实现
- 因为`localStorage`在前端应用比较多, 所以我们尝试`封装`一下它, 让它变得更好用
- localStorage在存取值的时候必须为`字符串`，而我们大部分情况下存储的都是`复杂`数据类型
- 所以在使用时通常要进行数据格式`转换`, 转换时可能还要进行`错误`处理，我们就把这个过程进行封装

```typescript
import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

	// 封装setItem
  set(key: string, data: any): void {
  	// 先尝试把val序列化为字符串
  	// 如果成功了就存储成功的值, 否则原物存储
    try {
      data = JSON.stringify(data);
    }finally {
      localStorage.setItem(key, data);
    }
  }

	// 封装getItem
  get(key: string): any {
  	// 先从本地取出字符串值, 然后尝试解析为js对象
  	// 如果成功了就返回成功的值, 否则原物返回
    let data = localStorage.getItem(key);
    try {
      data = JSON.parse(data);
    }finally {
      return data;
    }
  }

	// 封装removeItem
  remove(key: string): void {
    localStorage.removeItem(key);
  }

	// 封装clear
  clear(key: string): void {
    localStorage.clear();
  }
}
```

#### 注册服务
- 使用Angular服务与组件一样需要先进行`注册`, 因为cli工具没有自动注册, 所以需要我们自己来
- 打开`app.module.ts`文件, 导入刚刚创建的服务, 然后配置到`providers`里面

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// 导入服务, 注意导入的名称别写错
import { StorageService } from './service/storage.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    StorageService   // 服务在这里进行配置
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

#### 使用服务
- 注册好的组件在`html`中通过标签使用, 而服务是在`ts`中使用的, 大概有如下两步
- 第一步: 打开需要使用服务的组件`app.component.ts`, 然后导入`StorageService`
- 第二步: 在构造器中使用`简写`方式定义一个属性, `类型`为StorageService
    + 这样写Angular会`自动`帮我们创建StorageService`实例`并赋值给storage属性

```typescript
import { Component } from '@angular/core';
import { StorageService } from './service/storage.service';  // 导入服务

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

	// 给实例添加storage属性, 类型为StorageService,
	// 然后Angular会自动帮我们创建StorageService实例并赋值给storage属性
	constructor(public storage: StorageService) {
		console.log(this.storage);      // 打印的是实例
		this.storage.set('test', 123);    // 使用测试
	}
}
```

## 依赖注入
- 在Angular中使用服务, 不建议我们`手动`实例化服务
- 而是在`构造器`上声明所需的服务类型, 然后由Angular`自动`进行实例化并传入赋值
- 这是Angular采用的一种程序`设计模式`, 称为依赖注入

#### 依赖注入好处
- Angular中全局注册的服务是`单例`的, 就是说Angular会`缓存`第一次创建的服务实例
- 然后让我们在多个地方使用, 这样`可以`节省内存与实例化过程的开销, `还可以`在必要时共享数据

#### 使用不用管依赖注入吗
- 如果你的项目规模不大, 也不需共享数据, 不需缓存实例, 不需其他更高级的好处, 那么完全`可以`!
- 当然也有一些人认为Angular里的很多东西有点设计过度了, 如果不想使用依赖注入, 那么是`无需`在根模块进行注册的
- 我们要做的就是: `定义`服务类, 然后在需要的地方`导入`并使用
- 注意: 对于Angular内置的服务, 我们还是得使用依赖注入的方式

## HTTP
- 在Angular4的时候官方提供了单独的@angular/http模块
- 不过刚刚发布的Angular5官方推荐更简单易用的替代产品@angular/common/http模块

#### 配置
- 要使用http模块的东西, 必须先进行配置
- 打开`app.module.ts`文件, 导入`HttpClientModule`模块, 然后配置到`providers`里面

```typescript
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    HttpClientModule
  ]
})
export class AppModule { }
```

#### 使用范例
- 打开`app.component.ts`文件, 导入发送客户端请求的`HttpClient`类
- 然后在构造器中使用`简写`方式定义一个http属性, `类型`为HttpClient
    + 这样写Angular会`自动`帮我们创建HttpClient`实例`并赋值给http属性

```typescript
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // 导入HttpClient类

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	// 定义http属性, Angular会自动创建HttpClient实例
	constructor(private http: HttpClient) {
  		console.log(this.http);  // 打印测试一下
  	}
}
```

###### get请求
- angular使用了`rxjs`库进行异步编程中的数据处理, 所以调用http相关方法会得到一个`Observable`实例(观察者模式类)
- 然后调用`toPromise`方法就可以转成我们熟悉的`Promise`实例, 通过`then`或`catch`添加成功失败回调
- 补充: 如果不转成Promise实例, 我们也可以直接Observable实例的subscribe方法添加成功与失败回调

```typescript
import { HttpClient } from '@angular/common/http';

export class AppComponent {
	constructor(private http: HttpClient) {

		// 调用get方法发送请求, 然后调用toPromise方法转成Promise实例
	    // 接下来就按照Promise的API添加成功或失败处理函数
	    this.http.get('http://vue.studyit.io/api/getprodlist').toPromise()
	    .then(
	      (data) => console.log(data),
	      (err) => console.log(err)
	    );

	    // 或者直接调用subscribe方法
	    this.http.get('http://vue.studyit.io/api/getprodlist')
	    .subscribe(
	      (data) => console.log(data),
	      (err) => console.log(err)
	    );

  	}
}
```

###### post请求
- post请求发送的数据一般会分为`两种`数据格式
- 如果是`json`数据格式的话比较方便, 直接调用传个`对象`即可
- 如果是`formData`数据格式的话比较麻烦, 需要导入`HttpHeaders`然后设置`请求头`, 还需要自己`转换`数据格式

```typescript
import { HttpClient, HttpHeaders } from '@angular/common/http';

export class AppComponent {
	constructor(private http: HttpClient) {

		// post请求, 发送json格式数据
    	// 注意!: 我们演示的这个接口不支持json数据格式, 所以会添加失败, 大家把这个请求方式记下来以备后患
	    this.http.post('http://vue.studyit.io/api/addproduct', {name: '飞机'}).toPromise()
	    .then(
	      (data) => console.log(data),
	      (err) => console.log(err)
	    );

		// post请求, 发送formData格式数据
    	// 我们的接口需要的就是formData数据格式, 所以这里可以添加成功
    	// 注意!: 这里使用的HttpHeaders需要在上面引入后才能使用
	    const postFormDataConfig = { headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'}) };
	    this.http.post('http://vue.studyit.io/api/addproduct', 'name=火车', postFormDataConfig).toPromise()
	    .then(
	      (data) => console.log(data),
	      (err) => console.log(err)
	    );

  	}
}
```

# 商品管理综合案例

## 接口

#### 获取商品列表
- 地址：http://vue.studyit.io/api/getprodlist
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
- 地址：http://vue.studyit.io/api/delproduct/:id
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
- 地址：http://vue.studyit.io/api/addproduct
- 请求方式：POST
- 请求参数：name
- 参数格式 : FormData
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

#### 创建项目
[创建步骤](./imgs/project01.png)

#### 公共header组件布局

#### 公共footer组件布局