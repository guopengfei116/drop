## Angular4.x中的路由

#### 什么是路由
- 在web开发中，路由是指根据URL找到能处理这个URL的程序或模块。
- 比如在www.http://baidu.com/login中, /login就是当前url的路由

#### Angula4.x在项目中配置路由
1. 新建home、news、newscontent三个组件
`ng g component home`
`ng g component news`
`ng g component newscontent`

2. 新建app-routing.module.ts ,并在app-routing.module.ts中引入模块
```typescript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
```

3. app-routing.module.ts中引入刚刚创建的三个组件
```typescript
import { HomeComponent } from './home/home.component';
import { NewsComponent } from './news/news.component';
import { NewscontentComponent } from './newscontent/newscontent.component';
```

4. app-routing.module.ts中配置组件
```typescript
const routes: Routes = [ //路由组件是一个数组，每一个配置项为一个对象，分别有path(路径)，compontent(组件)等属性
    {path: 'home', component: HomeComponent},
    {path: 'news', component: NewsComponent},
    {path: 'newscontent/:id', component: NewscontentComponent},
    { path: '', redirectTo: '/home', pathMatch: 'full' } //重定向，如果用户打开路径为''的时候自动重定向到home组件下；
    ];
```
    > path 不用以'/'开头

5. app-routing.module.ts中配置模块 暴露模块
```typescript
@NgModule({
     imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
```

6. 在app.module.ts 引入刚才定义的路由
`import { AppRoutingModule } from './app-routing.module';`

7. app.module.ts里面的import注册这个路由模块
```typescript
imports: [
    BrowserModule,
    AppRoutingModule
    ]
```

8. 找到app.component.html根组件模板，配置router-outlet显示动态加载的路由
```html
<h1>
    <a routerLink="/home">首页</a>
    <a routerLink="/news">新闻</a>
</h1>
<router-outlet></router-outlet>
```
    > `router-outlet`是一个容器，显示当前路径的页面内容
    > `router-link`相当于`a`标签，使页面跳转，路由变换

#### Angular  默认跳转路由
```typescript
//匹配不到路由的时候加载的组件 或者跳转的路由
{ path: '**', /*任意的路由*/
  redirectTo:'home'
}
```
- 任意路由加载不到时都跳转到/home下


#### Angular routerLinkActive设置routerLink默认选中路由
- 使用angular来做单页应用程序肯定有一个被激活的路由。在这里，angular给我们当前激活路由提供了一个class类，我们可以通过设置这个class的样式来显示

```html
<h1>
    <a routerLink="/home" routerLinkActive="active">首页</a>
    <a routerLink="/news" routerLinkActive="active">新闻</a>
</h1>
```
```html
.active{
    color:red;
    }
```

#### 路由的动态传值
1. 配置动态路由
```typescript
const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'news', component: NewsComponent},
    {path: 'newscontent/:id', component: NewscontentComponent}, // id是不固定的，所以当一个参数传过去
    { path: '', redirectTo: '/home', pathMatch: 'full' }
];
```
2. 获取动态路由的值
```typescript
import { Router, ActivatedRoute, Params } from '@angular/router'; //引入路由模块
constructor( private route: ActivatedRoute) {}
ngOnInit() {
    console.log(this.route.params);
    this.route.params.subscribe(data=>this.id=data.id); //通过subscribe方法订阅路由参数
    }
```

#### 路由的js跳转
1. 引入路由模块
`import { Router } from '@angular/router';`

2. 初始化
```typescript
export class HomeComponent implements OnInit {
    constructor(private router: Router) { }
    ngOnInit() { } goNews(){
     this.router.navigate(['/news']); }//页面初始化的时候跳转到/news路由对应的页面下
}
```

3.路由跳转
`this.router.navigate(['/news', hero.id]);`


#### 父子路由
- 路由下面还有衍生的路由
```typescript
//父子路由配置如下
{ path: 'news', component:NewsComponent,
    children: [
        { path:'newslist', component:NewslistComponent },
        { path:'newsadd', component:NewsaddComponent }
    ]
}
```
    > 父子路由要在父路由组件中定义`router-outlet`
