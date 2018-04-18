# 分类管理模块

## 第一：准备页面

先准备一个要展示数据的页面，在pages目录下建立一个categories.html文件

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>Categories &laquo; Admin</title>
  <link rel="stylesheet" href="../assets/lib/bootstrap/css/bootstrap.css">
  <link rel="stylesheet" href="../assets/lib/font-awesome/css/font-awesome.css">
  <link rel="stylesheet" href="../assets/css/common.css">
</head>
<body>
  <div class="main">
    <div class="container-fluid">
      <div class="page-title">
        <h1>分类目录</h1>
      </div>
      <div class="row">
        <div class="col-md-3">
          <form id="cat-data">
            <h2>添加新分类目录</h2>
            <div class="form-group">
              <label for="name">名称</label>
              <input id="name" class="form-control" name="name" type="text" placeholder="分类名称">
            </div>
            <div class="form-group">
              <label for="slug">别名</label>
              <input id="slug" class="form-control" name="slug" type="text" placeholder="slug">
              <p class="help-block">https://zce.me/category/<strong>slug</strong></p>
            </div>
            <div class="form-group">
              <button id="btn-suer" class="btn btn-primary" type="submit">添加</button>
            </div>
          </form>
        </div>
        <div class="col-md-8">
          <div class="page-action">
            <!-- show when multiple checked -->
            <a class="btn btn-danger btn-sm" href="javascript:;" style="display: none">批量删除</a>
          </div>
          <table class="table table-striped table-bordered table-hover">
            <thead>
              <tr>
                <th class="text-center" width="40"><input type="checkbox"></th>
                <th>名称</th>
                <th>Slug</th>
                <th class="text-center" width="100">操作</th>
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
  <script src="../assets/lib/bootstrap/js/bootstrap.js"></script>
  <script src="../assets/lib/jquery/jquery.tmpl.js"></script>
  <script src="../assets/lib/jquery/jquery.cookie.js"></script>
  <script src="../assets/lib/layer/layer.js"></script>
  <script src="../assets/js/commom.js"></script>
</body>
</html>

```

## 第二：功能分析

1. 获取所有的分类展示在页面上
2. 点击添加按钮可以添加一个分类
3. 点击编辑按钮可以把对应的分类信息填充到左边的表单，点击更新可以修改已有分类的信息
4. 点击删除可以删除分类

## 第三：功能实现

### 3.1 获取所有的分类展示

先在服务端提供一个加载所有分类数据的接口，在php目录下新建一个category文件夹，在其中新建一个getCategories.php文件

```php
require "../util/DBUtils.php";
header("content-type: application/json");
$res = array("code"=>200,"msg"=>"操作失败");
//获取数据的sql语句
$sql = "SELECT * FROM categories";
//执行查询
$data = query($sql);

if(!empty($data)){
  $res["code"] = 100;
  $res["msg"] = "操作成功";
  $res["data"] = $data;
}

echo(json_encode($res));
```

数据接口有了，要发送请求请求数据

在js目录下新建一个categories.js，在里面使用模板插件对数据进行展示

```javascript
//一开始就要加载所有的分类数据
$.post("../php/categories/getCategories.php",function(res){
  if(res.code == 100){
    $("#myTmpl").tmpl(res.data).appendTo($("#dataset"));
  }
});
```

所以需要的模板结构为：

```html
<script id="myTmpl" type="text/x-jquery-tmpl" >
    <tr categoryid="${id}">
      <td class="text-center"><input type="checkbox"></td>
      <td>${name}</td>
      <td>${slug}</td>
      <td class="text-center">
        <a href="javascript:;" class="btn edit btn-info btn-xs">编辑</a>
        <a href="javascript:;" class="btn del btn-danger btn-xs">删除</a>
      </td>
    </tr>
  </script>
```

### 3.2 添加分类操作

在点击添加操作的时候添加分类，所以要找到添加按钮注册点击事件

```javascript
//categories.js
//添加新的分类操作
    $("#btn-suer").on("click",function(){
      var data = serialiseFormData("#cat-data");
      //添加的逻辑
      var data = serialiseFormData("#cat-data");
      //向服务区器发送请求添加数据
      $.post("../php/categories/addCategory.php",data,function(res){
        var icon = res.code == 100 ? 1 : 0;
        layer.alert(res.msg, {
          icon: icon
        }, function () {
          if (res.code === 100) {
            window.location.reload();
          }
        });
      });
      return false;
    });
```

所以现在还需要一个可以接受请求的php文件——addCategory.php

```php
require "../util/DBUtils.php";
header("content-type: application/json");
$res = array("code"=>200,"msg"=>"操作失败");
//调用的是DBUtil.php里面封装好的方法
$data = insert("categories",$_POST);
if($data){
  $res["code"] = 100;
  $res["msg"] = "操作成功";
}

echo(json_encode($res));
```

### 3.3 编辑功能

在点击编辑按钮的时候，需要把数据先填充到左边的表单，所以得先发送请求到服务端请求数据，所以要有一个数据接口，这个php文件我们就命名为： getCategoryById.php

```php
require "../util/DBUtils.php";
header("content-type: application/json");
$res = array("code"=>200,"msg"=>"操作失败");
//根据id查询的sql语句
$sql = "SELECT * from categories WHERE id='". $_POST["id"] ."'";
//执行查询
$data = query($sql);

if(!empty($data)){
$res["code"] = 100;
$res["msg"] = "操作成功";
$res["data"] = $data[0];
}

echo(json_encode($res));
```

此时需要给编辑按钮注册点击事件

```javascript
//点击编辑按钮
$("#dataset").on("click",".edit",function(){
//根据id去服务器获取分类的数据
var id = $(this).parent().parent().attr("categoryid");
console.log();
$.post("../php/categories/getCategoryById.php",{id:id},function(res){
if(res.code == 100){
//把获取到的数据放到对应的
$("#cat-data").attr("categoryid",res.data.id);
$("#name").val(res.data.name);
$("#slug").val(res.data.slug);
//文本
$("#cat-data h2").text("修改分类目录");
$("#btn-suer").text("修改");
}
});
});
```

在点击编辑按钮的时候，已经把获取的数据填充到了左边的表单里面，同时把添加按钮变成了更新按钮，所以在点击更新按钮的时候应该把数据提交到服务端进行修改,因为和新增的时候点击的是同一个按钮，所以应该是修改的之前的添加按钮的代码

```javascript
$("#btn-suer").on("click",function(){
  var data = serialiseFormData("#cat-data");
  if($(this).text() == "添加"){
    //添加的逻辑
    var data = serialiseFormData("#cat-data");
    //向服务区器发送请求添加数据
    $.post("../php/categories/addCategory.php",data,function(res){
      var icon = res.code == 100 ? 1 : 0;
      layer.alert(res.msg, {
        icon: icon
      }, function () {
        if (res.code === 100) {
          window.location.reload();
        }
      });
    });
  }else {
    //编辑的逻辑
    data.id = $("#cat-data").attr("categoryid");
    $.post("../php/categories/updateCategory.php",data,function(res){
      var icon = res.code == 100 ? 1 : 0;
      layer.alert(res.msg, {
        icon: icon
      }, function () {
        if (res.code === 100) {
          window.location.reload();
        }
      });
    });
  }
  return false;
});
```

在服务端还需要一个可以接收数据并修改分类数据的接口：updateCategory.php

```php
    require "../util/DBUtils.php";
    header("content-type: application/json");
    $res = array("code"=>200,"msg"=>"操作失败");
    //根据id修改信息，所以先得到id
    $id = $_POST["id"];
    //调用更新方法更新
    $data = update("categories",$_POST,$id);

    if($data){
        $res["code"] = 100;
        $res["msg"] = "操作成功";
    }

    echo(json_encode($res));
```

### 3.4 点击删除分类

找到删除按钮注册点击事件

```javascript
//点击删除按钮
$("#dataset").on("click",".del",function(){
  var _that = this;
  layer.confirm('确定要删除该分类吗？', {icon: 3, title:'您正在删除数据'}, function(i){
    //关闭提示框
    layer.close(i);
    //获取id
    var id = $(_that).parent().parent().attr("categoryid");
    //发送请求到服务器删除数据
    $.post("../php/categories/deleteCategory.php",{id,id},function(res){
      if(res.code == 100){
        if(res.code == 100){
          layer.alert(res.msg,{icon:1},function(){
            window.location.reload();
          });
        }else{
          layer.alert(res.msg,{icon:0});
        }
      }
    });
  });
});
```

还需要一个可以调用的删除数据的接口：deleteCategory.php

```php
require "../util/DBUtils.php";
header("content-type: application/json");
$res = array("code"=>200,"msg"=>"操作失败");
//根据id删除，先得到id
$id = $_POST["id"];
//根据id删除数据的sql语句
$sql = "DELETE FROM categories WHERE id='" . $id . "'";
//调用删除方法删除数据
$data = delete($sql);

if($data){
  $res["code"] = 100;
  $res["msg"] = "删除成功";
}

echo(json_encode($res));
```