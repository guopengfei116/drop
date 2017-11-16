## Angular4.x get post以及 jsonp请求数据

#### app.module.ts注册HTTP JSONP服务

###### 引入HttpModule 、JsonpModul
- 普通的HTTP请求需要HttpModule模块
- JSONP方式请求需要引入JsonpModul模块
`import { HttpModule, JsonpModule } from '@angular/http';`

###### HttpModule 、JsonpModule依赖注入
- 在app.modules.ts 的imports中引入HttpModule 、JsonpModule两个模块；
```typescript
@NgModule({
    declarations: [ AppComponent, HomeComponent, NewsComponent, NewscontentComponent ],
    imports: [ BrowserModule, FormsModule, HttpModule, JsonpModule, AppRoutingModule ],
    providers: [StorageService,NewsService],
    bootstrap: [AppComponent]
})
 export class AppModule { }
```


#### 通过 Http、Jsonp请求数据

- 在需要请求数据的地方引入 Http
`import {Http,Jsonp} from "@angular/http";`


- 构造函数内申明：
`constructor(private http:Http,private jsonp:Jsonp) { }`

- 对应的方法内使用http请求数据
- get请求
```typescript
this.http.get("http://www.xxx.com/appapi.php?a=100&catid=20&page=1")
        .subscribe(
             function(data){ console.log(data); },
             function(err){ console.log('失败'); }
            );
```

- jsonp请求
```typescript
this.jsonp.get("http://www.xxx.com/appapi.php?a=100&catid=20&page=1&callback=JSONP_CALLBACK")
        .subscribe(
             function(data){ console.log(data); },
             function(err){ console.log('失败'); }
        );
```

- post请求，post请求过程稍微复杂点，因为要声明请求头
1. 引入Headers、Http模块
`import {Http,Jsonp,Headers} from "@angular/http";`

2. 实例化Headers
`private headers = new Headers({'Content-Type': 'application/json'});`

3. post提交数据
```typescript

this.http .post('http://xxx/api/test', JSON.stringify({username: 'admin'}), {headers:this.headers})
            .subscribe(
                function(res){ console.log(res.json()); }
            );
```

##  Angular4.x get post以及 jsonp请求数据,使用Rxjs
#### 什么是Rxjs
- RxJS是一种针对异步数据流编程工具，或者叫响应式扩展编程；可不管如何解释RxJS其目标就是异步编程，Angular引入RxJS为了就是让异步可控、更简单。

#### 引入Http模块Jsonp模块，以及rxjs
    > 大部分RxJS操作符都不包括在Angular的Observable基本实现中，基本实现只包括Angular本身所需的功能。
    > 如果想要更多的RxJS功能，我们必须导入其所定义的库来扩展Observable对象， 以下是这个模块所需导入的所有RxJS操作符：
1. 引入Http 、Jsonp、RxJs 模块
```typescript
import {Http,Jsonp} from "@angular/http";
import {Observable} from "rxjs";
import "rxjs/Rx";
```
    > 这种import 'rxjs/Rx'语法，它缺少了花括号中的导入列表：{...}。
    > 这是因为我们并不需要操作符本身，这种情况下，我们所做的其实是导入这个库，加载并运行其中的脚本， 它会把操作符添加到Observable类中。

2. 构造函数内申明：
`constructor(private http:Http,private jsonp:Jsonp) { }`

3. get请求
```typescript
this.http.get("http://www.xxx.com/appapi.php?a=100&catid=20&page=1")
         .map(
             res => res.json()
         ) .subscribe( function(data){ console.log(data); } );
```

4. Jsonp请求
```typescript
this.jsonp.get("http://www.xxx.com/appapi.php?a=100&catid=20&page=1&callback=JSONP_CALLBACK")
    .map(res => res.json())
    .subscribe( function(data){ console.log(data);} );
```

 > http.get 方法中返回一个Observable对象，我们之后调用RxJS的map操作符对返回的数据做处理。