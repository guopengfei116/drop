# 用户管理模块

## 第一步：准备用户管理的页面

在pages文件夹下建立users.html

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>Users &laquo; Admin</title>
  <link rel="stylesheet" href="../assets/lib/bootstrap/css/bootstrap.css">
  <link rel="stylesheet" href="../assets/lib/font-awesome/css/font-awesome.css">
  <link rel="stylesheet" href="../assets/css/common.css">
</head>
<body>
  <div class="main">
    <div class="container-fluid">
      <div class="page-title">
        <h1>用户</h1>
      </div>
      <div class="row">
        <div class="col-md-3">
          <form id="user-data">
            <h2>添加新用户</h2>
            <div class="form-group">
              <label for="email">邮箱</label>
              <input id="email" class="form-control" name="email" type="email" placeholder="邮箱">
            </div>
            <div class="form-group">
              <label for="slug">别名</label>
              <input id="slug" class="form-control" name="slug" type="text" placeholder="slug">
              <p class="help-block">https://zce.me/author/<strong>slug</strong></p>
            </div>
            <div class="form-group">
              <label for="nickname">昵称</label>
              <input id="nickname" class="form-control" name="nickname" type="text" placeholder="昵称">
            </div>
            <div class="form-group">
              <label for="password">密码</label>
              <input id="password" class="form-control" name="password" type="text" placeholder="密码">
            </div>
            <div class="form-group">
              <button id="btn_suer" class="btn btn-primary" type="submit">添加</button>
            </div>
          </form>
        </div>
        <div class="col-md-8">
          <div class="page-action">
            <!-- show when multiple checked -->
            <a class="btn btn-danger multiple btn-sm" href="javascript:;" style="display: none">批量删除</a>
          </div>
          <table class="table table-striped table-bordered table-hover">
            <thead>
               <tr>
                <th class="text-center" width="40"><input id="ckAll" type="checkbox"></th>
                <th class="text-center" width="80">头像</th>
                <th>邮箱</th>
                <th>别名</th>
                <th>昵称</th>
                <th>状态</th>
                <th class="text-center" width="160">操作</th>
              </tr>
            </thead>
            <tbody id="dataset">
              
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <script src="../assets/lib/jquery/jquery.js"></script>
  <script src="../assets/lib/layer/layer.js"></script>
  <script src="../assets/lib/jquery/jquery.tmpl.js"></script>
  <script src="../assets/lib/bootstrap/js/bootstrap.js"></script>
  <script src="../assets/js/commom.js"></script>
  <script src="../assets/js/users.js"></script>
</body>
</html>

```

## 第二步：功能分析

该页面中的功能有：

1. 获取所有的用户展示在页面中
2. 点击添加按钮可以新增一个用户
3. 点击修改按钮可以把某个用户的信息填充到左边的编辑区域，再点击更新按钮，可以修改用户的信息
4. 点击删除按钮可以把某个用户删除

## 第三部：实现各个功能

### 3.1 实现获取所有用户并展示在页面上的功能

这次我们先不写js，先把后台接口准备好，即先写php文件

这次的需求是把所有用户展示在页面上，那么就是直接把users表里面的所有数据查询出来，所以我们的接口只要执行查询语句返回结果即可。

在php目录下的users文件夹中建立getUsersList.php

```php
require "../util/DBUtils.php";
header("content-type: application/json");
//不需要参数，直接查询所有的用户出来
$sql = "SELECT * FROM users";
$data = query($sql);
//这里可以判断一下$data是否有数据，当然不判断也没事，因为我们就是根据简单的sql代码查询结果，假如真的一条数据也没有也是可能的，我们只要返回最终结果即可
echo(json_encode($data));
```

接口文件准备好了，就应该发送请求获取数据了，在js目录下建立users.js，先写出请求接口的代码

```javascript
$(function(){
  //获取用户列表
  $.post("../php/users/getUsersList.php", function (res) {
    console.log(res);
  });
});
```

此时数据已经拿回来了，我们如果要把这些数据按照一定的格式展示在页面上，就必须动态的创建元素，追加内容和样式，并将其添加到页面结构中，这个过程如果数据量少还比较简单，但是当数据量大了之后，我们需要做的工作就非常麻烦了。而我们的开发过程中，可以使用一些插件来帮我们快速完成效果。

### 模板插件

这里给大家介绍一款模板插件：  jquery.tmpl.js

先学习使用方法：

第一步：  先引入jquery文件

第二步： 引入jquery.tmpl.js文件

第三步： 书写模板结构

```javascript
<script id="mytmpl" type="text/x-jquery-tmpl">
    //在这里写结构模板
</script>
```

假设现在有这样的一个数据结构

```javascript
var data = [
  {id: 1 , name : "李狗蛋" ,age: 16},
  {id: 2 , name : "张翠花" ,age: 17},
  {id: 3 , name : "赵铁柱" ,age: 20}
];
```

如果我们要以表格的形式把这个数据展示出来，正常的html结构应该是这样的

```html
<table>
  <thead>
    <tr>
      <th>id</th>
      <th>name</th>
      <th>age</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>李狗蛋</td>
      <td>16</td>
    </tr>
    <tr>
      <td>2</td>
      <td>张翠花</td>
      <td>17</td>
    </tr>
    <tr>
      <td>3</td>
      <td>赵铁柱</td>
      <td>20</td>
    </tr>
  </tbody>
</table>
```

我们会发现：tbody里面的每一行都是我们要根据数据生成的，如果要使用jquery.tmpl模板插件，书写模板也非常简单，只要把一行的结构复制出来

```html
<script id="mytmpl" type="text/x-jquery-tmpl">
    <tr>
      <td>1</td>
      <td>李狗蛋</td>
      <td>16</td>
    </tr>
</script>
```

接着把需要动态修改的地方修改成对应属性名的固定格式：  ${属性名} ，例如：

```html
<script id="mytmpl" type="text/x-jquery-tmpl">
    <tr>
      <td>${id}</td>
      <td>${name}</td>
      <td>$age</td>
    </tr>
</script>
```

接着调用tmpl模板插件提供的方法来生成结构

```html
<script>
  var data = [
    {id: 1 , name : "李狗蛋" ,age: 16},
    {id: 2 , name : "张翠花" ,age: 17},
    {id: 3 , name : "赵铁柱" ,age: 20}
  ];
  //thml就是使用模板插件生成的结构，只要把结构放到指定的位置即可
  var html = $("#mytmpl").tmpl(data);
  //该例子中我们应该把结构放到tbody里面
  $("tbody").append(html);
</script>
```

这样就可以直接生成想要的结构，不必要自己写复杂的结构了。

### 将模板插件运用到项目中来

我们需要将数据展示出来的结构是这样的

```html
<tr>
  <td class="text-center">
    <input class="cks" type="checkbox">
  </td>
  <td class="text-center">
    <img class="avatar" src="头像图片路径">
  </td>
  <td>邮箱</td>
  <td>别名</td>
  <td>昵称</td>
  <td>
    <span class="text-success">状态</span>
  </td>
  <td class="text-center">
    <input type="button" class="btn btn-success btn-xs" value="禁用">
    <input type="button" class="btn edit btn-default btn-xs" value="编辑">
    <input type="button" class="btn del btn-danger btn-xs" value="删除"> </td>
</tr>
```

所以如果将其转化为模板应该是这样的

```html
<script id="mytmpl" type="text/x-jquery-tmpl">
    <tr>
      <td class="text-center">
        <input class="cks" type="checkbox">
      </td>
      <td class="text-center">
        <img class="avatar" src="${avatar}">
      </td>
      <td>${email}</td>
      <td>${slug}</td>
      <td>${nickname}</td>
      <td>
      <span class="text-success">${status}</span>
    </td>
    <td class="text-center">
      <input type="button" class="btn btn-success btn-xs" value="禁用">
      <input type="button" class="btn edit btn-default btn-xs" value="编辑">
      <input type="button" class="btn del btn-danger btn-xs" value="删除"> </td>
  </tr>
</script>
```

所以此时只要在usres.js里面修改代码

```javascript
$(function(){
  //获取用户列表
  $.post("../php/users/getUsersList.php", function (res) {
    //使用模板插件将结构快速渲染到页面上
    $("#mytmpl").tmpl(res).appendTo("#dataset");
  });
});
```

用户数据已经能够展示在页面上来，问题是status属性(字段)是数字，我们给用户看到的应该是文字，比如："已激活" 或 "已禁用" 之类的。别着急，模板插件早就想到了。

在模板插件中是允许做逻辑判断的，语法如下：

```html
<script id="tmpl" type="text/x-jquery-tmpl">
	{{if 属性==值}}
		//if成立时输出的结构，例如:
		已激活
	{{else 属性==值}}
		//else相当于是我们js里的  else if 所以不用再写一次if，这中间放else成立时出现的结构，例如：
		已禁用
	{{/if }}
</script>
```

所以项目中的模板应该为：

```html
<script id="mytmpl" type="text/x-jquery-tmpl">
    <tr>
            <td class="text-center"><input class="cks" type="checkbox"></td>
            <td class="text-center"><img class="avatar" src="${avatar}"></td>
            <td>${email}</td>
            <td>${slug}</td>
            <td>${nickname}</td>
            <td>
              {{if status==0}}
              <span class="text-warning">未激活</span>
              {{else status==1}}
              <span class="text-success">已激活</span>
              {{else status==2}}
              <span class="text-danger">已禁用</span>
              {{else status==3}}
              <span class="text-muted">已废弃</span>
              {{/if}}
            </td>
            <td class="text-center">
            	<input type="button" class="btn btn-success btn-xs" value="禁用">
                <input type="button" class="btn edit btn-default btn-xs" value="编辑">
                <input type="button" class="btn del btn-danger btn-xs" value="删除">
            </td>
    </tr>
</script>
```

**综合考虑一个问题** ：当我们点击编辑或者删除的时候，怎么知道要删除或者要编辑的是哪个用户？

​	可以唯一确定一个用户数据的，是该用户的id，而在页面中有这么多的用户数据，怎么知道哪个才是我想要修改或者删除的？

​	解决办法：把用户的id存在和用户对应的行上，所以我们模板还得改：

```html
<script id="mytmpl" type="text/x-jquery-tmpl">
    <tr userid="${id}">
            <td class="text-center"><input class="cks" type="checkbox"></td>
            <td class="text-center"><img class="avatar" src="${avatar}"></td>
            <td>${email}</td>
            <td>${slug}</td>
            <td>${nickname}</td>
            <td>
              {{if status==0}}
              <span class="text-warning">未激活</span>
              {{else status==1}}
              <span class="text-success">已激活</span>
              {{else status==2}}
              <span class="text-danger">已禁用</span>
              {{else status==3}}
              <span class="text-muted">已废弃</span>
              {{/if}}
            </td>
            <td class="text-center">
            	<input type="button" class="btn btn-success btn-xs" value="禁用">
                <input type="button" class="btn edit btn-default btn-xs" value="编辑">
                <input type="button" class="btn del btn-danger btn-xs" value="删除">
            </td>
    </tr>
</script>
```

至此，用户数据展示完成。

### 3.2 点击按钮添加用户

找到添加按钮注册点击事件

```javascript
//users.js
$("#btn_suer").on("click", function () {
  //收集用户的数据
  var data = serialiseFormData("#user-data");
  //向服务端发送添加用户的请求
  $.post("../php/users/addUser.php", data, function (res) {
      //如果请求成功，name提示用户并把数据更新到表格里
      if (res.code === 100) {
        //关于更新表格，最简答的做法就是直接刷新当前页面，因为刷新之后就会从新请求所有的数据，重新生成表格
        window.location.reload();
        //另一种做法是把数据手动添加到表格中
      });
  });
  return false;
});
```

此时需要一个可接收数据并把用户数据保存起来的php文件——在php目录的users文件夹下建立一个addUser.php

```php
require "../util/DBUtils.php";
header("content-type: application/json");
$res = array("code"=>200,"msg"=>"添加用户失败");
//邮箱不允许重复
$email = $_POST["email"];
$sql = "SELECT COUNT(*) FROM users WHERE email ='" . $email . "'";
//执行sql语句
$count = query($sql);
$count = $count[0]["COUNT(*)"];
if($count > 0){
  //不能重复添加同一个邮箱的用户
  $res["msg"] = "该邮箱的用户已经存在，不能重复添加";
}else{
  //执行添加的操作
  //1.建立连接
  $connect = connection();
  //2 形成sql语句
  //2.1 sql语句应该是这样的格式： insert into 表名 (字段1,字段2) values(值1,值2) 
  //2.2 字段和值都是从浏览器带过来的数据，存在 $_POST 数组里面
  //2.3 所以需要把数据拼接成sql语句
  //2.3.1 先获取所有的字段和值
  $keys = array_keys($_POST);
  $vals = array_values($_POST);
  //2.3.2 拼接到一起
  $sql = "insert into users ("`. implode("`,`",$keys) ."`) values('". implode("','",$vals) ."'')";
  //3 执行sql代码
  $data = mysqli_query($connect,$sql);
  if($data){
    $res["code"] = 100;
    $res["msg"] = "添加成功";
  }
}
echo(json_encode($res));
```

**思考** ：添加操作是不是其他模块也会有？是否也可以封装成公共代码？

​	将插入操作封装到DBUtil.php

```php
//用于插入数据的方法
function insert($table,$arr){
  //1 连接数据库
  $con = connect();
  //2 获取数组中的所有的key和value
  $keys = array_keys($arr);
  $values = array_values($arr);
  //3 拼接sql语句
  $sql = "insert into ". $table ." (`". implode("`,`", $keys) ."`) values('". implode("','", $values) ."')";

  //4 执行sql语句
  $res = mysqli_query($con,$sql);
  //5 返回执行结果
  return $res;
}
```

所以addUser.php里的代码可以简化为：

```php
//addUser.php
require "../util/DBUtils.php";
header("content-type: application/json");
$res = array("code"=>200,"msg"=>"添加用户失败");
//邮箱不允许重复
$email = $_POST["email"];
$sql = "SELECT COUNT(*) FROM users WHERE email ='" . $email . "'";
//执行sql语句
$count = query($sql);
$count = $count[0]["COUNT(*)"];
if($count > 0){
  //不能重复添加同一个邮箱的用户
  $res["msg"] = "该邮箱的用户已经存在，不能重复添加";
}else{
  //执行添加的操作
  $data = insert("users",$_POST);
  if($data){
    $res["code"] = 100;
    $res["msg"] = "添加成功";
  }
}
echo(json_encode($res));
```

### 3.3 点击修改按钮修改用户数据的功能

该功能需要的操作：

1. 点击编辑按钮，把对应的用户数据填充到左边，并修改左边的按钮文本为更新
2. 点击更新按钮，把修改好的数据更新到服务端
3. 在服务端的php文件中接收数据，更新到数据库

所以此时在users.js中需要修改的代码为：

```javascript
//给编辑按钮注册点击事件
$("#dataset").on("click", ".edit", function () {
  //获取存储在tr上的用户id
  var id = $(this).parent().parent().attr("userid");
  var _that = this;
  // 根据id去获取该用户的信息--因为有可能你页面上的数据不是最新的，要去数据库里获取最新的
  $.post("../php/users/getUserInfo.php", {
    id: id
  }, function (res) {
    var data = res.data;
    //把最新的数据填充到左边的位置
    $("#email").val(data.email);
    $("#slug").val(data.slug);
    $("#password").val(data.password);
    $("#nickname").val(data.nickname);
    //把要修改的用户的id也存放起来，方便在提交修改的时候获取传递到服务器
    $("#user-data").attr("userid",id);
    //把标题和按钮的文本修改
    $("#user-data h2").text("修改用户");
    $("#btn_suer").text("更新");
    //提示用户在右边进行修改
    layer.tips("请在左边用户信息处进行修改",_that,{tips:[4,"#000"]});
  });
});

//添加或者更新按钮的点击事件
$("#btn_suer").on("click", function () {
  //收集用户的数据
  var data = serialiseFormData("#user-data");
  //需要根据按钮的文本判断是添加功能还是更新功能
  if ($(this).text() == "添加") {
    $.post("../php/users/addUser.php", data, function (res) {
      //如果请求成功，name提示用户并把数据更新到表格里
      if (res.code === 100) {
        //关于更新表格，最简答的做法就是直接刷新当前页面，因为刷新之后就会从新请求所有的数据，重新生成表格
        window.location.reload();
        //另一种做法是把数据手动添加到表格中
      });
    });
  }else{
    //更新数据的时候会比添加数据多一个键： id，因为服务器要根据id修改用户的信息
    data.id = $("#user-data").attr("userid");
    //向服务器提交修改
    $.post("../php/users/updateUser.php",data,function(res){
      if(res.code == 100){
        layer.alert("更新完成",{icon:1},function(){
          window.location.reload();
        });
      }else{
        layer.alert("更新失败",{icon:0});
      }
    });
  }
  return false;
});
```

需要一个可以更新用户信息的php文件：updateUser.php

```php
require "../util/DBUtils.php";
header("content-type: application/json");
$res = array("code"=>"200","msg"=>"更新失败");
//调用更新的方法
$data = update("users",$_POST,$_POST["id"]);
//更新的结果
if($data){
  $res["code"] = 100;
  $res["msg"] = "更新成功！！！";
}

echo(json_encode($res));
```

### 3.4 删除用户操作

给删除按钮注册点击事件

```javascript
//users.js
 //删除操作
$("#dataset").on("click",".del",function(){
  var _that = this;
  layer.confirm('确定要删除该用户吗？', {icon: 3, title:'您正在删除数据'}, function(i){
    //关闭提示框
    layer.close(i);
    //获取id
    var id = $(_that).parent().parent().attr("userid");
    //发送请求到服务器删除数据
    $.post("../php/users/deleteUser.php",{id,id},function(res){
      if(res.code == 100){
        if(res.code == 100){
          layer.alert("删除成功",{icon:1},function(){
            window.location.reload();
          });
        }else{
          layer.alert("更新失败",{icon:0});
        }
      }
    });
  });
});
```

在服务端需要一个php文件进行删除操作——deleteUser.php

```php
require "../util/DBUtils.php";
header("content-type: application/json");
$res = array("code"=>"200","msg"=>"删除失败");
//获取用户的id
$id = $_POST["id"];
//准备操作数据库的sql语句
$sql = "DELETE FROM users WHERE id='" . $id . "'";
//删除用户数据
//1 建立连接
$connect = connect();
//2 执行sql语句
$data = mysqli_query($sql);
if($data){
  $res["code"] = 100;
  $res["msg"] = "删除成功";
}

echo(json_encode($res));
```

**再次思考** ：其他模块是否也有删除操作？删除操作是否也可以封装?

​	把删除操作也封装到DBUtil.php

```php
//用于删除数据的方法
function delete($sql){
  //1 连接数据库
  $con = connect();
  //2 执行删除的语句
  $res = mysqli_query($con,$sql);
  return $res;
}
```

deleteUser.php的代码就可以再次简化

```php
require "../util/DBUtils.php";
header("content-type: application/json");
$res = array("code"=>"200","msg"=>"删除失败");
//获取用户的id
$id = $_POST["id"];
//准备操作数据库的sql语句
$sql = "DELETE FROM users WHERE id='" . $id . "'";
//删除用户数据
$data = delete($sql);
if($data){
  $res["code"] = 100;
  $res["msg"] = "删除成功";
}

echo(json_encode($res));
```