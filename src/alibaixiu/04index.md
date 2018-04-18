# index页面

## 第一步：准备html页面

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>Dashboard &laquo; Admin</title>
  <link rel="stylesheet" href="assets/lib/bootstrap/css/bootstrap.css">
  <link rel="stylesheet" href="assets/lib/font-awesome/css/font-awesome.css">
  <link rel="stylesheet" href="assets/css/index.css">
</head>
<body>

  <div class="main">
    <nav class="navbar">
      <button class="btn btn-default navbar-btn fa fa-bars"></button>
      <ul class="nav navbar-nav navbar-right">
        <li><a id="profile" href="pages/profile.html"><i class="fa fa-user"></i>个人中心</a></li>
        <li><a id="logout" href="pages/login.html"><i class="fa fa-sign-out"></i>退出</a></li>
      </ul>
    </nav>
    <div class="container-fluid">    
      <iframe id="inner-frame" src="pages/welcom.html" frameborder="0"></iframe>
    </div>
  </div>

  <div class="aside">
    <div class="profile">
      <img class="avatar" src="assets/images/default.png">
      <h3 class="name">布头儿</h3>
    </div>
    <ul class="nav">
      <li class="active">
        <a href="pages/welcom.html"><i class="fa fa-dashboard"></i>仪表盘</a>
      </li>
      <li>
        <a href="#menu-posts" class="collapsed" data-toggle="collapse">
          <i class="fa fa-thumb-tack"></i>文章<i class="fa fa-angle-right"></i>
        </a>
        <ul id="menu-posts" class="collapse">
          <li><a href="pages/articles.html">所有文章</a></li>
          <li><a href="pages/addArticle.html">写文章</a></li>
          <li><a href="pages/categories.html">分类目录</a></li>
        </ul>
      </li>
      <li>
        <a href="pages/comments.html"><i class="fa fa-comments"></i>评论</a>
      </li>
      <li>
        <a href="pages/users.html"><i class="fa fa-users"></i>用户</a>
      </li>
      <li>
        <a href="#menu-settings" class="collapsed" data-toggle="collapse">
          <i class="fa fa-cogs"></i>设置<i class="fa fa-angle-right"></i>
        </a>
        <ul id="menu-settings" class="collapse">
          <li><a href="pages/navmenus.html">导航菜单</a></li>
          <li><a href="pages/slides.html">图片轮播</a></li>
          <li><a href="pages/settings.html">网站设置</a></li>
        </ul>
      </li>
    </ul>
  </div>

  <script src="assets/lib/jquery/jquery.js"></script>
  <script src="assets/lib/jquery/jquery.cookie.js"></script>
  <script src="assets/lib/bootstrap/js/bootstrap.js"></script>
  <script src="assets/js/commom.js"></script>
  <script src="assets/js/index.js"></script>
</body>
</html>
```

## 第二步：功能分析

1.    页面的左上角，需要实时加载用户的头像和昵称
2.    页面的左边，需要点击不同的导航菜单的时候，让右边变成不同的内容
3.    页面的右上角，点击个人中心会让右边的内容变成个人中心页面
4.    页面的右上角，点击退出可以让用户注销登录

## 第三步：准备index.html页面专用的js——index.js

1. 页面左上角有用户的头像和昵称，所以先把用户的头像和昵称获取出来

   ```javascript
   $(function(){
     //加载用户的信息
       // 根据id获取用户的头像
       var userid = $.cookie("user_id");
       $.post("php/users/getUserInfo.php",{id:userid},function(res){
           if(res.code== 100){
             var data = res.data;
             //设置用户的信息
             $(".profile .avatar").attr("src",data.avatar);
             $(".profile .name").text(data.nickname);
           }
       });
   });
   ```

2. 需要一个专门给index.html获取用户信息的 getUserInfo.php ,需要思考一个问题，怎么知道当前的用户是哪个用户？在用户的数据表里面，我们可以唯一确定一条数据的就是主键：id，所以我们得根据id来对用户的信息进行获取。在php文件夹下新建一个users的文件夹，用来专门管理有关用户模块的操作。在users文件夹下新建一个 getUserInfo.php文件

   ```php
   //getUserInfo.php的代码
   //因为要查询数据库，所以先引入该文件
   require "../util/DBUtils.php";
   header("Content-Type: application/json");
   $res = array("code"=>200,"msg"=>"操作失败");
   //获取id
   $id = $_POST["id"];
   //sql语句 - 根据id查找用户信息
   $sql = "select * from users where id=" . $id;
   //查询
   $data = query($sql);
   //判断是否有数据
   if(!empty($data)){
     $res["code"] = 100;
     $res["msg"] = "操作成功";
     $res["data"] = $data[0];
   }
   //返回用户信息
   echo(json_encode($res));
   ```

3. 点击左边的每个导航栏，可以跳转到对应的内容页面

   ```javascript
   //index.js里面补充的代码
   //每个导航菜单的点击操作 -- 这里的原理是：
   //1 点击每个导航里面的a标签，让右边的iframe跳转到指定的地址，这个地址刚好存储在每个导航的a标签里面
   //2 父级菜单是不需要跳转的，所以要排除掉父级菜单
   $(".aside a").on("click",function(){
     //判断一下，只有当不是父级菜单的时候才控制iframe跳转
     if($(this).parent().children().size() <= 1){
       $("#inner-frame").attr("src",$(this).attr("href"));
       return false;
     }
   });
   ```

4. 默认情况下，iframe标签的大小是不会随着我们页面的修改而修改的，所以需要在我们页面的大小改变的时候针对性的修改iframe的大小

   ```javascript
   //让iframe和容器随着页面的宽高改变s
   function resizeFun(){
     var w = $(".container-fluid").innerWidth();
     var h = $(window).innerHeight() - 90;
     $("#inner-frame").width(w);
     $("#inner-frame").height(h);
   }
   resizeFun();
   $(window).on("resize",resizeFun);
   ```

5. 右上角的个人中心操作--跳转到个人中心

   ```javascript
   //个人中心
   $("#profile").on("click",function(){
     $("#inner-frame").attr("src",$(this).attr("href"));
     return false;
   });
   ```

6. 右上角的退出操作

   ```javascript
    //退出
   $("#logout").on("click",function(){
     //清除cookie
     $.cookie("user_id",null);
     var href = $(this).attr("href");
     //把退出的行为通知给服务器，让服务器把session中的id给注销掉
     $.post("../php/login/logout.php",function(res){
       if(res.code == 100){
         location.href = href;
       }
     });

     return false;
   })
   ```

   所以此时还要一个logout.php,同样在php目录的login文件夹下建立logout.php文件

   ```php
   //自动解析json
   header("Content-Type: application/json");
   $res = array("code"=>100,"msg"=>"操作成功");
   //开启session
   session_start();
   //清空session
   unset($_SESSION["user_id"]);
   echo(json_encode($res));
   ```

   ​