# 设置图片轮播

## 第一步：首先准备一个页面

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>Slides &laquo; Admin</title>
  <link rel="stylesheet" href="../assets/lib/bootstrap/css/bootstrap.css">
  <link rel="stylesheet" href="../assets/lib/font-awesome/css/font-awesome.css">
  <link rel="stylesheet" href="../assets/css/common.css">
</head>
<body>
  <div class="main">
    <div class="container-fluid">
      <div class="page-title">
        <h1>图片轮播</h1>
      </div>
      <div class="row">
        <div class="col-md-4">
          <form id="slidedata">
            <h2>添加新轮播内容</h2>
            <div class="form-group">
              <label for="image">图片</label>
              <!-- show when image chose -->
              <img id="preview" class="help-block thumbnail" style="display: none">
              <input id="image" class="form-control" type="file">
              <input id="img-data" type="hidden" name="image">
            </div>
            <div class="form-group">
              <label for="text">文本</label>
              <input id="text" class="form-control" name="text" type="text" placeholder="文本">
            </div>
            <div class="form-group">
              <label for="link">链接</label>
              <input id="link" class="form-control" name="link" type="text" placeholder="链接">
            </div>
            <div class="form-group">
              <input id="btn-sure" type="button" value="添加" class="btn btn-primary">
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
                <th class="text-center">图片</th>
                <th>文本</th>
                <th>链接</th>
                <th class="text-center" width="100">操作</th>
              </tr>
            </thead>
            <tbody id="dataset">
              <!-- <tr>
                <td class="text-center"><input type="checkbox"></td>
                <td class="text-center"><img class="slide" src="../uploads/slide_1.jpg"></td>
                <td>XIU功能演示</td>
                <td>#</td>
                <td class="text-center">
                  <a href="javascript:;" class="btn btn-danger btn-xs">删除</a>
                </td>
              </tr>
              <tr>
                <td class="text-center"><input type="checkbox"></td>
                <td class="text-center"><img class="slide" src="../uploads/slide_2.jpg"></td>
                <td>XIU功能演示</td>
                <td>#</td>
                <td class="text-center">
                  <a href="javascript:;" class="btn btn-danger btn-xs">删除</a>
                </td> -->
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <script src="../assets/lib/jquery/jquery.js"></script>
  <script src="../assets/lib/bootstrap/js/bootstrap.js"></script>
  <script src="../assets/lib/jquery/jquery.tmpl.min.js"></script>
  <script src="../assets/lib/jquery/jquery.cookie.js"></script>
  <script src="../assets/lib/layer/layer.js"></script>
  <script src="../assets/js/commom.js"></script>
  <script src="../assets/js/slides.js"></script>
</body>
</html>
```

## 第二步：分析功能

1. 获取设置的轮播列表
2. 删除一个图片轮播设置
3. 添加一个图片轮播设置

## 第三步：实现功能

### 3.1 获取轮播设置功能

与之前完成的导航设置一样，图片轮播设置数据也是存储在options表里面的一个json数据，所以我们也要把json数据获取出来交给前端页面进行解析渲染。首先提供接口：

```php
require "../util/DBUtils.php";
header("content-type: application/json");
$res = array("code"=>200,"msg"=>"操作失败");
//直接查询对应key的value值
$sql = "SELECT * FROM `options` WHERE `key` = 'home_slides'";
//查询
$data = query($sql);
//返回
if($data){
  $res["code"] = 100;
  $res["msg"] = "操作成功";
  $res["data"] = json_decode($data[0]["value"]);
}
echo(json_encode($res));
```

在前端获取数据和渲染

```javascript
$.post("../php/settings/getSlidesData.php", function (res) {
  var data = res.data;
  //给每条数据一个唯一的index，方便我们删除或则新增
  for (var i = 0; i < data.length; i++) {
    data[i].index = i;
  }
  slideData = data;
  $("#dataset").empty().append($("#mt").tmpl(res.data));
});
```

### 3.2 删除操作

先给删除按钮注册点击事件

```javascript
$("#dataset").on("click",".del",function(){
  //获取要删除的数据在缓存数据里的index
  var index = parseInt($(this).parent().parent().attr("index"));
  //根据index移除要删除的数据
  slideData.splice(index,1);
  //删除不需要的index属性
  for(var i = 0 ; i < slideData.length; i++){
    delete slideData[i].index;
  }
  //发送请求到服务器同步数据
  $.post("../php/settings/updateSlideData.php",{data:JSON.stringify(slideData)},function(res){
    if(res.code == 100){
      layer.alert(res.msg,{icon: 1},function(){
        location.reload();
      });
    }
  });
});
```

需要一个同步数据的接口，这里的操作跟之前的导航设置同理，也是更新操作

```php
require "../util/DBUtils.php";
header("content-type: application/json");
$res = array("code"=>200,"msg"=>"操作失败");
$slideData = $_POST["data"];
$sql = "update options set value = '". $slideData ."' where `key` = 'home_slides'";
$data = delete($sql);
if($data){
  $res["code"] = 100;
  $res["msg"] = "操作成功";
}

echo(json_encode($res));
```

### 3.3 添加操作

添加时我们需要一张图片，所以此时先完成图片上传,图片上传的接口我们之前完成过了，这里就不重复了。

```javascript
$("#image").on("change",function(){
  //获取图片
  var file = this.files[0];
  //创建一个可以携带数据到服务器的对象
  var data = new FormData();
  data.append("file",file);
  //ajax请求
  var xhr = new XMLHttpRequest();
  xhr.open("post","../php/common/uploadFile.php",true);
  xhr.send(data);
  xhr.onreadystatechange = function(){
    if(xhr.status = 200 && xhr.readyState == 4){
      var res = JSON.parse(xhr.responseText);
      if(res.code = 100){
        //上传成功之后把数据同步
        $("#preview").attr("src",res.data).show();
        $("#img-data").val(res.data);
      }
    }
  }
});
```

接着需要在我们点击添加按钮的时候把数据同步到服务器

```javascript
//添加按钮
$("#btn-sure").on("click",function(){
  var data = serialiseFormData("#slidedata");
  slideData.push(data);
  $.post("../php/settings/updateSlideData.php",{data: JSON.stringify(slideData)},function(res){
    if(res.code == 100){
      layer.alert(res.msg,{icon: 1},function(){
        location.reload();
      });
    }
  });
});
```