# 个人中心模块

## 第一步：准备html页面

在pages目录下建立profile.html

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>Dashboard &laquo; Admin</title>
  <link rel="stylesheet" href="../assets/lib/bootstrap/css/bootstrap.css">
  <link rel="stylesheet" href="../assets/lib/font-awesome/css/font-awesome.css">
  <link rel="stylesheet" href="../assets/css/common.css">
</head>
<body>
  <div class="main">
    <div class="container-fluid">
      <div class="page-title">
        <h1>我的个人资料</h1>
      </div>
      <form id="userdata" class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-3 control-label">头像</label>
          <div class="col-sm-6">
            <label class="form-image">
              <input id="avatar" type="hidden" name="avatar">
              <input id="avatar-file" type="file">
              <img id="avatar-img" src="/assets/images/default.png">
              <i class="mask fa fa-upload"></i>
            </label>
          </div>
        </div>
        <div class="form-group">
          <label for="email" class="col-sm-3 control-label">邮箱</label>
          <div class="col-sm-6">
            <input id="email" class="form-control" name="email" type="type" value="w@zce.me" placeholder="邮箱" readonly>
            <p class="help-block">登录邮箱不允许修改</p>
          </div>
        </div>
        <div class="form-group">
          <label for="slug" class="col-sm-3 control-label">别名</label>
          <div class="col-sm-6">
            <input id="slug" class="form-control" name="slug" type="type" value="zce" placeholder="slug">
            <p class="help-block">https://zce.me/author/<strong>zce</strong></p>
          </div>
        </div>
        <div class="form-group">
          <label for="nickname" class="col-sm-3 control-label">昵称</label>
          <div class="col-sm-6">
            <input id="nickname" class="form-control" name="nickname" type="type" value="汪磊" placeholder="昵称">
            <p class="help-block">限制在 2-16 个字符</p>
          </div>
        </div>
        <div class="form-group">
          <label for="bio" class="col-sm-3 control-label">简介</label>
          <div class="col-sm-6">
            <textarea id="bio" name="bio" class="form-control" placeholder="Bio" cols="30" rows="6">MAKE IT BETTER!</textarea>
          </div>
        </div>
        <div class="form-group">
          <div class="col-sm-offset-3 col-sm-6">
            <input id="btn-sure" type="botton" class="btn btn-primary" role="button" value="更新">
            <a class="btn btn-link" href="password-reset.html">修改密码</a>
          </div>
        </div>
      </form>
    </div>
  </div>
  <script src="../assets/lib/jquery/jquery.js"></script>
  <script src="../assets/lib/bootstrap/js/bootstrap.js"></script>
  <script src="../assets/lib/jquery/jquery.cookie.js"></script>
  <script src="../assets/lib/layer/layer.js"></script>
  <script src="..//assets/js/commom.js"></script>
  <script src="../assets/js/profile.js"></script>
</body>
</html>

```
## 第二步：功能分析

1. 当页面加载完毕的时候，需要把当前登录的用户的部分信息(头像/邮箱/别名/昵称/简介)加载过来，渲染到页面上
2. 用户点击头像的时候，可以上传一张图片，修改到页面上
3. 当用户点击更新的时候，可以把修改过的信息同步到数据库
4. 点击修改密码的是偶，可以跳转到修改密码页面

## 第三步：实现各个功能

### 3.1 加载用户的原始数据

需要在页面加载完毕的时候把用户的数据加载过来，所以的有一个提供请求数据的接口，而之前在完成index.html的时候我们已经有了一个可以获取用户数据的接口: getUserInfo.php ,所以我们只要在js里面直接访问这个接口即可。

现在准备js，在assets目录下的js文件夹里，建立一个 profile.js

```javascript
$(function(){
  //把存储在cookie里的id先获取出来
  var id = $.cookie("user_id");
  //根据id获取user数据
  $.post("../php/users/getUserInfo.php",{id:id},function(res){
    //获取成功
    if(res.code == 100){
      //把数据填充到页面对应的表单控件里
      var data = res.data;
      //修改的是用户的图片数据
      $("#avatar-img").attr("src",location.origin+"/"+data.avatar);
      //还要把图片的路径存储到一个hidden控件上
      $("#avatar").val(data.avatar);
      $("#email").val(data.email);
      $("#slug").val(data.slug);
      $("#nickname").val(data.nickname);
      $("#bio").val(data.bio);
    }
  });
});
```

### 3.2 点击用户的头像以上传头像图片 

在profile.js里面添加代码

```javascript
//上传头像
$("#avatar-file").on("change",function(){
  //获取上传的文件
  var file = this.files[0];
  //创建一个formData对象，该对象是专门用来装上传给服务器的数据的
  var data = new FormData();
  data.append("file",file);
//jquery里面的ajax方法不支持文件上传，所以我们得自己写一个ajax上传
  var xhr = new XMLHttpRequest();
  xhr.open("post","../php/common/uploadFile.php",true);
  xhr.send(data);
  xhr.onreadystatechange = function(){
    if(xhr.status == 200 && xhr.readyState == 4){
      var res = JSON.parse(xhr.responseText);
      //当请求返回的时候，把数据同步到页面上
      $("#avatar-img").attr("src",location.origin+"/"+ res.data);
      $("#avatar").val(res.data);
    }
  }
});
```

此时需要服务端有一个接收用户上传图片的接口，而这个上传文件的功能我们不仅仅是在这里要用，在其他模块也会使用，所以我们也要把这个功能的代码在服务端公用起来，因此在php目录下建立一个common文件夹，在里面建立一个uploadFile.php文件

```php
//引入dbutil文件
require "../util/DBUtils.php";
$res = array("code"=>200,"msg"=>"操作失败");
//获取上传的文件
$file = $_FILES["file"];
//获取上传文件的后缀名
$ext = explode(".",$file["name"]);
$ext = end($ext);
//因为每次上传的文件可能重名，所以我们把上传过来的文件重新命名
$filename = "" . time() . "" . rand(10000,99999) . "." . $ext;
//判断上传文件的目录是否存在
if(!file_exists("../../uploads")){
  mkdir("../../uploads");
}
//拼接路径
$path = "/uploads/" . $filename;
//把上传的文件保存到指定的目录
$data = move_uploaded_file($file["tmp_name"],"../../uploads/" . $filename);
//如果保存成功，把数据返回
if($data){
  $res["code"] = 100;
  $res["msg"] = "操作成功";
  $res["data"] = $path;
}
//返回数据
echo(json_encode($res));
```

### 3.3 更新用户数据

在profile.js里面给更新按钮注册事件

```javascript
//找到更新按钮，注册点击事件
$("#btn-sure").on("click",function(){
  //每次获取数据都要获取比较多的数据，写起来比较麻烦，封装到common.js里面，直接调用
  var data = serialiseFormData("#userdata");
  //在服务端是要根据id来更新数据的，所以在向服务端传递数据的时候要把id加上
  data.id = id;
  $.post("../php/users/updateUser.php",data,function(res){
    if(res.code == 100){
      layer.alert(res.msg,{icon: 1},function(index){
        //更新到侧边栏
        $(".avatar",parent.document).attr("src",data.avatar);
        $(".name",parent.document).attr("src",data.nickname);
        layer.close(index);
      });
    }
  });
});
```

收集表单数据的代码是根据name属性来收集的，如果字段比较多的时候比较麻烦，所以我们把该过程封装到common.js里面作为公用代码

在common.js里面添加如下代码

```javascript
//收集表单数据的方法
function serialiseFormData(selector){
    var obj = {};
  //根据表单里面的带有name属性的元素收集数据
    $(selector+ " [name]").each(function(i,e){
        var key = $(e).attr("name");
        var value = $(e).val();
        obj[key] = value;
    });
    return obj;
}
```

此时还差一个可以更新数据库的updateUser.php ，在php目录下，的users文件夹里建立updateUser.php

```php
require "../util/DBUtils.php";
header("content-type: application/json");
$res = array("code"=>"200","msg"=>"更新失败");
//此时需要把数据更新到数据库，因此需要连接数据库和执行sql语句
//1 连接数据库
$connection = mysqli_connect("127.0.0.1","root","123456");
//2 选择数据库
mysqli_select_db($connection,"bx1");
//3 设置编码
mysqli_set_charset($connection,'utf8');
//4 准备好sql语句 - sql语句是把传递回来的键值对拼接到一起的，所以拼接起来比较麻烦
//4.1 我们最后的语句格式应该是： update 表名 set 字段=内容,字段=内容 where id = id
//4.2 而这些key都是从浏览器那边获取过来的在$_POST集合里面
//4.3 按照这个格式拼接sql语句
$sql = "update users set ";
foreach($_POST as $key=>$value){
  //$key里面就是我们所需要的字段
  $sql .= "`" . $key . "`='" . $val . "',"; 
}
//5 拼接起来的字符串后面会多一个逗号，要去掉
$sql  = substr($sql,0,-1);
//6 拼接条件
$sql .= " where id=" . $_POST["id"];
//7 执行sql语句
$data = mysqli_query($sql);
if($data){
  $res["code"] = 100;
  $res["msg"] = "更新成功！！！";
}
//返回数据
echo(json_encode($res));
```

#### 思考：

更新数据的过程，除了用户需要更新之外，分类模块、文章模块等是不是也会涉及到？

## 第四步：把更新操作也封装到DButil.php

在DButtl.php里添加如下代码

```php
//用于更新数据的方法
function update($table,$data,$id){
  //1 连接数据库
  $con = connect();
  //2 遍历数组拼接sq语句 -- 更新的sql格式： updata 表名 set 字段=值,字段=值 where id = 值
  $sql = 'update '. $table . " set ";
  foreach ($data as $key => $value) {
    $sql .= "`" . $key . "`='" . $value ."',";
  }
  // 把后面的  ',  多余的字符去掉
  $sql = substr($sql,0,-1);
  //拼接id判断
  $sql .= " where id = " . $id;
  //3 执行sql语句
  $res = mysqli_query($con,$sql);
  return $res;
}
```

## 第五步：调用公用代码执行逻辑

在把更新的数据库操作封装起来之后，updateUser.php的代码可以简化

```php
require "../util/DBUtils.php";
header("content-type: application/json");
$res = array("code"=>"200","msg"=>"更新失败");
//获取id
$id = $_POST["id"];
//直接调用公用代码
$data = update("users",$_POST,$id)
if($data){
  $res["code"] = 100;
  $res["msg"] = "更新成功！！！";
}
//返回数据
echo(json_encode($res));
```

## 第六步：继续实现剩下的功能

### 6.1点击修改密码跳转到修改密码页面

修改密码我们直接给的是一个a标签，所以只要直接点击就可以跳转到修改密码的页面，此时需要一个修改密码的页面

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>Password reset &laquo; Admin</title>
  <link rel="stylesheet" href="../assets/lib/bootstrap/css/bootstrap.css">
  <link rel="stylesheet" href="../assets/lib/font-awesome/css/font-awesome.css">
  <link rel="stylesheet" href="../assets/css/common.css">
</head>
<body>
  <div class="main">
    <div class="container-fluid">
      <div class="page-title">
        <h1>修改密码</h1>
      </div>
      <form class="form-horizontal">
        <div class="form-group">
          <label for="old" class="col-sm-3 control-label">旧密码</label>
          <div class="col-sm-7">
            <input id="old" class="form-control" type="password" placeholder="旧密码">
          </div>
        </div>
        <div class="form-group">
          <label for="password" class="col-sm-3 control-label">新密码</label>
          <div class="col-sm-7">
            <input id="password" class="form-control" type="password" placeholder="新密码">
          </div>
        </div>
        <div class="form-group">
          <label for="confirm" class="col-sm-3 control-label">确认新密码</label>
          <div class="col-sm-7">
            <input id="confirm" class="form-control" type="password" placeholder="确认新密码">
          </div>
        </div>
        <div class="form-group">
          <div class="col-sm-offset-3 col-sm-7">
            <input type="button" id="btn-sure" class="btn btn-primary" value="修改密码">
          </div>
        </div>
      </form>
    </div>
  </div>
  <script src="../assets/lib/jquery/jquery.js"></script>
  <script src="../assets/lib/bootstrap/js/bootstrap.js"></script>
  <script src="../assets/lib/jquery/jquery.cookie.js"></script>
  <script src="../assets/lib/layer/layer.js"></script>
  <script src="../assets/js/passwordreset.js"></script>
</body>
</html>
```

当我们点击修改密码页面的修改密码按钮的时候，应该验证一下新密码是否一致，然后向服务器发送更新请求,此时需要一个专门用于修改密码页面的js文件 —— passwordreset.js

```javascript
$(function(){
  //修改按钮注册点击事件
    $("#btn-sure").on("click",function(){
      //获取必要数据
        var id = $.cookie("user_id");
        var old = $("#old").val();
        var pwd = $("#password").val();
        var con = $("#confirm").val();
        //判断新密码和确认密码是否一致
        if(pwd !== con){
            layer.alert("两次输入的新密码不一致，请重新输入！",{icon: 1});
            return;
        }
        //发送请求到服务器进行对比更新
        $.post("../php/users/updatePassword.php",{id:id,old:old,newPwd:pwd},function(res){
          //告诉用户提示信息  
          layer.alert(res.msg);
        },"json");
    });
});
```

此时还需要一个可以操作修改数据库的php文件——php目录的users文件夹里新建一个updatePassword.php

```php
require "../util/DBUtils.php";
header("content-type: application/json");
$res = array("code"=>200,"msg"=>"操作失败");
//获取数据
$id = $_POST["id"];
$old = $_POST["old"];
$new = $_POST["newPwd"];

//先对比原来的密码是否正确
//先查询出原来的密码
$sql1 = "select `password` from users where id=" . $id;
$data1 = query($sql1);
//先判断数据是否存在
if(!empty($data1)){
  //判断旧的密码是否正确
  if($data1[0]["password"] == $old){
    //如果旧的密码正确，那么对密码进行更新
    $sql2 = "update users set `password`='" . $new . "' where id=" . $id ;
    $connect = connect();
    $data2 = mysqli_query($connect,$sql2);
    if($data2){
      $res["code"] = 100;
      $res["msg"] = "修改成功";
    }
  }
  else{
    //密码不正确
    $res["msg"] = "旧密码不正确，请重新输入";
  }
}

echo(json_encode($res));
```