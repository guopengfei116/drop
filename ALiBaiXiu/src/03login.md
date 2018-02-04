# 后台登录模块

## 第一步：新建页面

在server文件夹的pages目录里面，新建一个login.html页面

页面代码如下：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>Sign in &laquo; Admin</title>
  <link rel="stylesheet" href="../assets/lib/bootstrap/css/bootstrap.css">
  <link rel="stylesheet" href="../assets/css/login.css">
</head>
<body>
  <div class="login">
    <form class="login-wrap" id="login-wrap">
      <img class="avatar" src="../assets/images/default.png">
      <!-- 有错误信息时展示 -->
      <div class="alert alert-danger">
        <strong>错误！</strong> 用户名或密码错误！
      </div>
      <div class="form-group">
        <label for="email" class="sr-only">邮箱</label>
        <input id="email" type="email" name="email" class="form-control" placeholder="邮箱" autofocus >
      </div>
      <div class="form-group">
        <label for="password" class="sr-only">密码</label>
        <input id="password" type="password" name="password" class="form-control" placeholder="密码" >
      </div>
      <a id="btn-login" class="btn btn-primary btn-block" href="javascript:void(0);">登 录</a>
    </form>
  </div>
</body>
<script src="../assets/lib/jquery/jquery.js"></script>
<script src="../assets/lib/jquery/jquery.cookie.js"></script>
</html>

```

## 第二步：梳理登录业务的逻辑

```flow
s=>start: 开始
o1=>operation: 用户请求login.html页面
o2=>operation: 输入邮箱和密码，并点击登录按钮
o3=>operation: 收集邮箱和密码信息，将其发送到服务器进行验证
o4=>operation: 服务端接收到邮箱和密码，根据邮箱到数据库查询相关信息
c1=>condition: 验证邮箱是否存在
c2=>condition: 验证密码是否正确
c3=>condition: 用户状态是否激活
o5=>operation: 提示错误信息
o6=>operation: 登录成功，跳转到后台主页
e1=>end: 结束

s->o1->o2->o3->o4->c1
c1(yes)->c2
c1(no)->o5->e1
c2(yes)->c3
c2(no)->o5->e1
c3(yes)->o6->e1
c3(no)->o5->e1
```

### 思考的问题 

	1. http协议是不加密的，那么直接把邮箱和密码使用http协议发送请求好不好？
	2. 像邮箱密码这种作为登录用的信息，一般使用post请求还是使用get请求，好与坏在哪里

## 第三步：php文件的代码

```php
//可以让jQuery的ajax请求自动识别json格式，我们推荐使用json格式的方式进行数据传递
header("content-teyp: appliction/json");
//获取在请求中带回来的邮箱和密码
$email = $_POST["email"];
$password = $_POST["password"];
//判断这些数据有没有带回来，如果有才到数据库查询，没有就没必要查询了(提升性能)
if(!empty($email) && !empty($password)){
  //准备好sql语句
  $sql = "SELECT `id`,`email`,`password`,`status` FROM users WHERE `email` = '" . $email . "'";
  //连接数据库 需要的参数： 数据库主机  登录数据库的用户  密码
  $connection = mysqli_connect("127.0.0.1","root","123456");
  //选择一个数据库
  mysqli_select_db($connection,"bx15");
  //为了防止乱码，设置一下数据库的编码
  mysqli_set_charset($connection,"utf8");
  //调用查询的方法查询数据库
  $data = mysqli_query($connection,$sql);
  //此时得到的是一个数据集合，为了遍历方便，我们将其转换为数组
  $arr = array();
  while($row = mysqli_fetch_assoc($data)){
    $arr[] = $row;
  }
  //我们要求邮箱是唯一的，因此我们只需要把第一条数据拿出来对比就可以了，先把第一条数据获取出来
  $data = $arr[0];
  //判断数据是否存在，如果存在那么邮箱就是正确的
  if(!empty($data)){
    //判断密码是否正确
    if($data["password"] == $password){
      //判断该用户的状态是否已经激活
      if($data["status"] == 1){
        //此时所有的条件都成立，那么用户登录才算成功
        echo("登录成功");
        exit;
      }
    }
  }
}
 //当上述条件有某一条不成立，都不成功
  echo("登录失败");
  exit;
```

### 思考的问题

1. 每次登录、获取用户列表、获取分类列表、获取文章列表等等操作是不是都要重复的连接数据库，使用sql语句对数据库进行操作？
2. 当服务端的php文件执行完毕，我们返回给浏览器的数据如何判断请求是否成功?

## 第四步：封装util代码

1. 像刚才连接数据库中使用到的数据库主机、用户名、密码、使用的数据等数据一般在项目中是不会改变的，所以我们可以专门用一个文件保存起来，以便将来要修改，只要改这个文件即可

   因此我们先建立一个util文件夹，用来放我们的公用代码

   在util文件夹里面建立一个config.php

   ```php
   	//在php中使用 define 语法来声明常量,常量一般的命名方式是全大写字母
   	//数据库主机名
       define('DB_HOST', '127.0.0.1');
       //数据库用户名
       define('DB_USER', 'root');
       //数据库密码
       define('DB_PWD', '123456');
       //数据库库名
       define('DB_NAME', 'bx1');
       //数据库编码
       define('DB_CHARSET', 'utf8');
   ```

   接着在util文件夹下面建立一个专门用于操作数据库的公用文件 —— DButil.php

   ```php
   //因为要使用config.php里面配置好的各种常量数据，所以要引入进来，在php中引入别的php文件使用require语法
   require("config.php");
   //打开数据库连接的函数
   function connect(){
     //建立连接
     $connect = mysqli_connect(DB_HOST,DB_USER,DB_PWD);
     //选择一个数据库
     mysqli_select_db($connect,DB_NAME);
     //设置编码
     mysqli_set_charset($connet,DB_CHARSET);
     //返回该建立的连接
     return $connect;
   }

   //查询数据的函数 - 查询数据需要一个sql语句，因此需要把sql语句当成参数传递进来
   function query($sql){
     //建立连接
     $connection = connect();
     //调用查询的方法
     $res = mysqli_query($connection,$sql);
     //把查询回来的数据转化为二维数组
     $data = fetch($res);
     //返回查询到的数据
     return $data;
   }

   //将数据集合转化为二维数组的函数
   function fetch($data){
     $arr = array();
     while($row = mysqli_fetch($data)){
       arr[] = $row
     }
     return $arr;
   }
   ```

此时我们在login.php中的代码就可以简化很多了

```php
//因为要使用公用代码，所以要引入该文件
require "../util/DButil.php";
//可以让jQuery的ajax请求自动识别json格式，我们推荐使用json格式的方式进行数据传递
header("content-teyp: appliction/json");
//获取在请求中带回来的邮箱和密码
$email = $_POST["email"];
$password = $_POST["password"];
//判断这些数据有没有带回来，如果有才到数据库查询，没有就没必要查询了(提升性能)
if(!empty($email) && !empty($password)){
  //准备好sql语句
  $sql = "SELECT `id`,`email`,`password`,`status` FROM users WHERE `email` = '" . $email . "'";
  //直接调用DButil.php里面的查询数据的方法
  $data = query($sql);
  //判断邮箱、密码、状态
  if(!empty($data) && $data[0]["password"] == $password && $data[0][status] == 1){
    //当条件全都满足的时候登录成功
    echo("登录成功");
    exit;
  }
}
//当条件任意一条不满足，登录失败
echo("登录失败");
exit;
```

目前来说有个问题是这样的，我们直接看返回的 "登录成功" 或者 "登录失败" 这种字眼判断请求是否成功是不推荐的，不同的请求还得判断不同的数据信息，是非常麻烦的，因此我们喜欢约定一个状态，当这个状态成立，就是请求成功，比如可以：

```php
//定义一个数组，里面主要有2个字段
$arr = array("code"=>100,"msg"=>"操作成功");
//或者
$res = array("code"=>200,"msg"=>"操作失败");
//我们约定一个code字段，当其值为100的时候表示请求是成功的，其余值也可以分别约定其意义，这个取决于大家将来的项目需求，并且有时我们又希望将一些信息带回浏览器，因此还有一个msg字段用于通知一些消息
```

此时login.php的代码修改为

```php
//因为要使用公用代码，所以要引入该文件
require "../util/DButil.php";
//可以让jQuery的ajax请求自动识别json格式，我们推荐使用json格式的方式进行数据传递
header("content-teyp: appliction/json");
//定义一个返回结果,默认是失败的，当操作成功的时候修改
$res =  array("code"=>200,"msg"=>"操作失败");
//获取在请求中带回来的邮箱和密码
$email = $_POST["email"];
$password = $_POST["password"];
//判断这些数据有没有带回来，如果有才到数据库查询，没有就没必要查询了(提升性能)
if(!empty($email) && !empty($password)){
  //准备好sql语句
  $sql = "SELECT `id`,`email`,`password`,`status` FROM users WHERE `email` = '" . $email . "'";
  //直接调用DButil.php里面的查询数据的方法
  $data = query($sql);
  //判断邮箱、密码、状态
  if(!empty($data) && $data[0]["password"] == $password && $data[0][status] == 1){
    //当条件全都满足的时候登录成功
    //echo("登录成功");
    //exit;
    //当操作成功的时候，我们可以修改$res里面的字段的值
    $res["code"] = 100;
    $res["msg"]= "登录成功";
  }
}
//当条件任意一条不满足，登录失败
//echo("登录失败");
//exit;	
//将请求结果以json的格式返回
echo(json_encode($res));
```

## 第五步：向服务端发起请求

服务端的php文件已经写好了，剩下的事情就是在点击登录按钮的时候想服务端的php文件发起请求，然后让php文件返回一个结果来判断登录是否成功。因此我们找到assets文件夹里面的js文件夹，在里面建立一个login.html专用的js文件——login.js

```javascript
//因为我们使用的是jquery来开发，所以要先有一个入口函数
$(function(){
  //找到登录按钮，注册点击事件
  $("#btn-login").on("click",function(){
    //在点击的时候，我们需要把邮箱和密码收集起来，在请求服务器的时候发送回服务器进行验证
    var email = $("#email").val();
    var password = $("#password").val();
    //向服务器发送请求，这里采用post请求，因为post请求会相对安全一些
    $.post("../php/login/login.php",{email:email,password:password},function(res){
      //判断返回的结果，其code字段是100就是登陆成功
      if(res.code==100){
        //登陆成功之后，需要跳转到index页面
        location.href = "../index.html";
      }else{
        //提示登陆失败
        $(".alert").show();
      }
    });
  });
});
```

### 思考的问题

1. 在登陆前是否需要使用正则对邮箱和密码做客户端的数据验证

### 存在的问题

此时如果我知道index.html的路径，是可以跳过登陆页面直接访问的，其原因在于http交互是无状态的，服务器不会默认记住你已经登录了，每次请求都好像是"初次见面"。那么这个登陆功能好像也就没必要了，因此我们需要对其他页面(除了login.html)进行是否登录的验证。

## 第六步：继续解决登录验证的问题

我们发现只要知道其他页面的地址，并不需要登录也可以访问，因此我们的解决办法是：

	1. 在服务端验证完邮箱、密码、状态后，将用户的id存储到服务端的session中
	2. 在浏览器端接收返回的数据时，如果登录是成功的，那么我们把用户的id存储到浏览器的cookie里面
	3. 每次访问非login.html的页面时，都从cookie中获取用户的id，如果不存在，那么说明该用户没有登陆过，直接跳转到登录页面。如果该id存在，那么需要去服务器验证该id是否在服务端的session中。

因此在login.php中需要修改一下

```php
if(!empty($data) && $data[0]["password"] == $password && $data[0][status] == 1){
    //当操作成功的时候，我们可以修改$res里面的字段的值
    $res["code"] = 100;
    $res["msg"]= "登录成功";
  	//把用户的id也一起返回给浏览器，让浏览器存储起来
  	$res["user_id"] = data[0]["id"];
  	//并且在服务端的session中存储起来，以便将来做登录验证的时候对比
  	session_start();
  	$_SESSION["user_id"] = data[0]["id"];
  }
```

在login.js中也需要把获取到的用户id存储到cookie里面，而该项目中我们使用了一个  jquery.cookie.js的插件，使用该插件来帮助我们操作cookie存储数据，因此在login.html中需要引入该插件

```html
<script src="../assets/lib/jquery/jquery.cookie.js"></script>
```

而在login.js中我们也需要把id存储到cookie里面，修改如下

```javascript
$.post("../php/login/login.php",{email:email,password:password},function(res){
      //判断返回的结果，其code字段是100就是登陆成功
      if(res.code==100){
        //先把用户的id存储到cookie里面
        $.cookie("user_id",res.user_id,{path:'/'});
        //登陆成功之后，需要跳转到index页面
        location.href = "../index.html";
      }else{
        //提示登陆失败
        $(".alert").show();
      }
}
```

而在我们访问其他页面的时候，就需要根据存储在cookie里面的id，到服务端验证是否已经登录过了，而这个过程是很多个页面都要用到的，因此也是公用代码，我们把这个验证登录的代码封装到 common.js里面

```javascript
//common.js
//验证是否已经登录的函数
function checkLogin(){
    var userid = $.cookie("user_id");
  //如果userid不存在，那么没有登录过，跳转到登录页面
  if(userid === null || userid == undefined){
    window.location.href = "http://server.bx15.com/pages/login.html";
    return;
  }
  //如果userid存在，那么还要去服务器验证该id是否在服务器的session里面
  $.post("http://server.bx15.com/php/login/checkLogin.php",{user_id:userid},function(res){
    if(res.code !== 100){
      //没有登录，如果没有登录自动跳转到登录页面
      window.location.href = "http://server.bx15.com/pages/login.html";
    }
  });
}
//调用一次，验证登录
checkLogin();
```

所以此时我们还需要一个checkLogin.php

```php
//自动解析json
    header("Content-Type: application/json");
    $res = array("code"=>200,"msg"=>"没有登录信息");
    //开启session
    session_start();
    //查找session数据
    if(isset($_SESSION["user_id"]) && $_SESSION["user_id"] == $_POST["user_id"]){
        $res["code"] = 100;
        $res["msg"] = "已经登录";
    }
    echo(json_encode($res));
```

此时，只要在任意需要验证登录的页面调用common.js，那么就可以保证如果没有登录的情况下，是不能直接访问页面的。