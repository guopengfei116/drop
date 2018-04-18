# 设置导航菜单

## 第一：先准备一个页面

新建一个navmenus.html

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>Navigation menus &laquo; Admin</title>
  <link rel="stylesheet" href="../assets/lib/bootstrap/css/bootstrap.css">
  <link rel="stylesheet" href="../assets/lib/font-awesome/css/font-awesome.css">
  <link rel="stylesheet" href="../assets/css/common.css">
</head>
<body>

  <div class="main">
    <div class="container-fluid">
      <div class="page-title">
        <h1>导航菜单</h1>
      </div>
      <div class="row">
        <div class="col-md-4">
          <form id="nav-data">
            <h2>添加新导航链接</h2>
            <div class="form-group">
                <label for="text">图标</label>
                <input id="icon" type="hidden" name="icon">
                <div id="choose-icon">
                  <span class="fa fa-glass"></span>
                  <div class="icon-list">
                    <span class="fa fa-glass"></span>
                    <span class="fa fa-flag"></span>
                    <span class="fa fa-gavel"></span>
                    <span class="fa fa-hourglass"></span>
                    <span class="fa fa-fire"></span>
                    <span class="fa fa-diamond"></span>
                    <span class="fa fa-filter"></span>
                    <span class="fa fa-heart"></span>
                    <span class="fa fa-leaf"></span>
                    <span class="fa fa-location-arrow"></span>
                    <span class="fa fa-phone"></span>
                    <span class="fa fa-music"></span>
                    <span class="fa fa-envelope-o"></span>
                    <span class="fa fa-star"></span>
                    <span class="fa fa-film"></span>
                    <span class="fa fa-user"></span>
                  </div>
                </div>
              </div>
            <div class="form-group">
              <label for="text">文本</label>
              <input id="text" class="form-control" name="text" type="text" placeholder="文本">
            </div>
            <div class="form-group">
              <label for="title">标题</label>
              <input id="title" class="form-control" name="title" type="text" placeholder="标题">
            </div>
            <div class="form-group">
              <label for="href">链接</label>
              <input id="href" class="form-control" name="link" type="text" placeholder="链接">
            </div>
            <div class="form-group">
              <input type="button" class="btn btn-primary" value="添加" id="btn-sure">
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
                <th>文本</th>
                <th>标题</th>
                <th>链接</th>
                <th class="text-center" width="100">操作</th>
              </tr>
            </thead>
            <tbody id="dataset">
              <tr>
                <td class="text-center"><input type="checkbox"></td>
                <td><i class="fa fa-glass"></i>奇趣事</td>
                <td>奇趣事</td>
                <td>#</td>
                <td class="text-center">
                  <a href="javascript:;" class="btn btn-danger btn-xs">删除</a>
                </td>
              </tr>
              <tr>
                <td class="text-center"><input type="checkbox"></td>
                <td><i class="fa fa-phone"></i>潮科技</td>
                <td>潮科技</td>
                <td>#</td>
                <td class="text-center">
                  <a href="javascript:;" class="btn btn-danger btn-xs">删除</a>
                </td>
              </tr>
              <tr>
                <td class="text-center"><input type="checkbox"></td>
                <td><i class="fa fa-fire"></i>会生活</td>
                <td>会生活</td>
                <td>#</td>
                <td class="text-center">
                  <a href="javascript:;" class="btn btn-danger btn-xs">删除</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <script src="../assets/lib/jquery/jquery.js"></script>
  <script src="../assets/lib/bootstrap/js/bootstrap.js"></script>
  <script src="../assets/lib/layer/layer.js"></script>
  <script src="../assets/lib/jquery/jquery.tmpl.min.js"></script>
  <script src="../assets/lib/jquery/jquery.cookie.js"></script>
  <script src="../assets/js/commom.js"> </script>
</body>
</html>
```

## 第二：功能分析

1. 显示所有的导航菜单
2. 删除某个导航菜单
3. 新增一个导航菜单

## 第三：实现功能

### 3.1 获取所有的导航菜单

首先值得声明的是，这个功能必须先看数据库。数据库中，不再是单独使用一张表来存储所有的导航菜单，一是因为导航菜单一般在当初设计产品或者开发过程中的时候就定下来了，很少开发完成之后再修改，二则因为导航菜单一般不多，没必要新建一个表来存储。所以注意观察，在options表中，key为 ‘nav_menus’ 的value 列 就是关于导航菜单的json格式数据。因此我们在展示导航菜单列表的时候要把它拆分开来显示。首先来完成sql语句的书写：

```mysql
select `value` from options where `key` = 'nav_menus'
```

也就是说获取数据的接口非常简单，只要把这个json数据发给前台，让前台在前端进行拆解即可

```php
//getNavMenus.php
require "../util/DBUtils.php";
header("content-type: application/json");
$res = array("code"=>200,"msg"=>"操作失败");
//获取关于导航设置的sql语句
$sql = "SELECT * FROM `options` WHERE `key` = 'nav_menus'";
//执行查询
$data = query($sql);
if($data){
  $res["code"] = 100;
  $res["msg"] = "操作成功";
  $res["data"] = json_decode($data[0]["value"]);
}
echo(json_encode($res));
```
准备好接口之后就可以在前台直接请求数据了。

```javascript
//请求服务器关于导航配置的数据
$.post("../php/settings/getNavData.php",function(res){
  var data = res.data;
  //这里为什么要加多一个index,因为我们现在无法根据id操作数据了，只能自己手动添加一个唯一标识来完成。
  for(var i = 0; i < data.length ; i++){
    data[i].index = i;
  }
  //缓存到全局变量里面，后面修改的时候要用到--一定要缓存到全局数据，不然我们到时候添加和删除的时候无法同步数据
  navData = data;
  //使用模板展示数据
  $("#dataset").empty().append($("#mt").tmpl(res.data));
});
```

此时用到模板引擎，而模板引擎的结构我们可以这么写

```html
<script id="mt" type="text/x-jquery-tmpl">
    <tr index=${index}>
      <td class="text-center"><input type="checkbox"></td>
      <td><i class="${icon}"></i>${text}</td>
      <td>${title}</td>
      <td>${link}</td>
      <td class="text-center">
        <a href="javascript:;" class="btn del btn-danger btn-xs">删除</a>
      </td>
    </tr>
</script>
```

### 3.2 删除导航配置

要删除导航配置，首先给删除按钮注册点击事件

```javascript
$("#dataset").on("click",".del",function(){
  //得到要删除的数据对应的索引
  var index = parseInt($(this).parent().parent().attr("index"));
  //把对应的数据从缓存数据中移除
  navData.splice(index,1);
  //index这个字段在服务器里面是不要的，因此先把这个字段移除
  for(var i = 0 ; i < navData.length; i++){
    delete navData[i].index;
  }
  //把缓存的导航配置更新到服务器
  $.post("../php/settings/updateNavData.php",{data:JSON.stringify(navData)},function(res){
    if(res.code == 100){
      layer.alert(res.msg,{icon: 1},function(){
        location.reload();
      });
    }
  });
});
```

此时需要在后端准备一个借口来更新数据。其实说是删除操作，但是因为我们存储在数据库的时候只有一个json数据，而不是根据id删除某个数据，所以其实是跟新操作。

```php
//updateNavData.php
require "../util/DBUtils.php";
header("content-type: application/json");
$res = array("code"=>200,"msg"=>"操作失败");
//根据data获取到从浏览器传递回来的数据
$navData = $_POST["data"];
//更新的语句
$sql = "update options set value = '". $navData ."' where `key` = 'nav_menus'";
//执行更新操作
$connect = connect();
$data = mysqli_query($connect,$sql);
if($data){
  $res["code"] = 100;
  $res["msg"] = "操作成功";
}
echo(json_encode($res));
```

### 3.3 新增一个导航配置

新增操作需要在点击图标的时候可有选择一个新的图标，而原理是我们每个图标都是一个class而已。所以我们要做的事情就是在点击的时候把图标的class同步到图标按钮上。

```javascript
//选择一个图标
$("#choose-icon").on("click",function(){
  $(".icon-list").toggle();
});
//点击不同的小图标的时候，更新到选择图标的位置
$(".icon-list>span").on("click",function(){
  //直接获取当前点击的小图标的样式
  var newCls = $(this).attr("class");
  //先移除原来的，再更新新的样式
  $("#choose-icon>span").removeAttr("class").addClass(newCls);
  //把结果保存起来
  $("#icon").val(newCls);
});
```

而现在在点击添加操作的时候需要把数据同步到服务器，所以给添加按钮注册一个点击事件

```javascript
$("#btn-sure").on("click",function(){
var data = serialiseFormData("#nav-data");
//把收集起来的数据追加到缓存数据里
navData.push(data);
//更新到服务器
  $.post("../php/settings/updateNavDate.php",{data:JSON.stringify(navData)},function(res){
    if(res.code == 100){
      layer.alert(res.msg,{icon: 1},function(){
      	location.reload();
      });
    }
  });
});
```