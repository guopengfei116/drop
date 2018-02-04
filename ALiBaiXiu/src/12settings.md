# 网站设置模块

## 第一：准备页面结构

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>Settings &laquo; Admin</title>
  <link rel="stylesheet" href="../assets/lib/bootstrap/css/bootstrap.css">
  <link rel="stylesheet" href="../assets/lib/font-awesome/css/font-awesome.css">
  <link rel="stylesheet" href="../assets/css/common.css">
</head>
<body>

  <div class="main">
    <div class="container-fluid">
      <div class="page-title">
        <h1>网站设置</h1>
      </div>
      <form id="setting-data" class="form-horizontal">
        <div class="form-group">
          <label for="site_logo" class="col-sm-2 control-label">网站图标</label>
          <div class="col-sm-6">
            <label class="form-image">
              <input id="logo" type="file">
              <input id="logo-data" name="site_logo" type="hidden">
              <img id="site-logo" src="/assets/images/logo.png">
              <i class="mask fa fa-upload"></i>
            </label>
          </div>
        </div>
        <div class="form-group">
          <label for="site_name" class="col-sm-2 control-label">站点名称</label>
          <div class="col-sm-6">
            <input id="site_name" name="site_name" class="form-control" type="type" placeholder="站点名称">
          </div>
        </div>
        <div class="form-group">
          <label for="site_description" class="col-sm-2 control-label">站点描述</label>
          <div class="col-sm-6">
            <textarea id="site_description" name="site_description" class="form-control" placeholder="站点描述" cols="30" rows="6"></textarea>
          </div>
        </div>
        <div class="form-group">
          <label for="site_keywords" class="col-sm-2 control-label">站点关键词</label>
          <div class="col-sm-6">
            <input id="site_keywords" name="site_keywords" class="form-control" type="type" placeholder="站点关键词">
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">评论</label>
          <div class="col-sm-6">
            <div class="checkbox">
              <label><input id="comment_status" name="comment_status" type="checkbox" checked>开启评论功能</label>
            </div>
            <div class="checkbox">
              <label><input id="comment_reviewed" name="comment_reviewed" type="checkbox" checked>评论必须经人工批准</label>
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="col-sm-offset-2 col-sm-6">
            <input id="btn-sure" type="button" value="保存设置" class="btn btn-primary">
          </div>
        </div>
      </form>
    </div>
  </div>

  <script src="../assets/lib/jquery/jquery.js"></script>
  <script src="../assets/lib/bootstrap/js/bootstrap.js"></script>
  <script src="../assets/lib/layer/layer.js"></script>
  <script src="../assets/lib/jquery/jquery.cookie.js"></script>
  <script src="../assets/js/commom.js"></script>
  <script src="../assets/js/settings.js"></script>
</body>
</html>

```

## 第二：功能分析

1.  获取原来的网站设置信息填充到表单
2. 修改更新网站设置

## 第三：功能实现

### 3.1 获取原有的网站设置

在页面一开始加载的时候就要获取数据填充到表单

```javascript
$.post("../php/settings/getSettingData.php",function(res){
  if(res.code == 100){
    var tempData = res.data;
    //将数组转化为对象
    var data = {};
    for(var i =0; i<tempData.length;i++){
      var temp = tempData[i];
      for(var key in temp){
        if(key == "key"){
          data[temp[key]] = temp["value"];
        }
      }
    }
    //根据对象的键值对填充数据
    $("#site-logo").attr("src",data.site_logo);
    $("#logo-data").val(data.site_logo);
    $("#site_name").val(data.site_name);
    $("#site_description").val(data.site_description);
    $("#site_keywords").val(data.site_keywords);
    $("#comment_status").val(data.comment_status);
    $("#comment_reviewed").val(data.comment_reviewed);
  }
});
```

我们观察数据表结构，这个设置是根据不同的key存储不同的值来决定网站的设置不同的，所以我们在获取的时候要一次性获取出所有的key，根据不同的key来组合成对象，才能直接点出属性和值来填充数据，而我们在接口上考虑的就是把所有数据都要拿出来，不要遗漏任何东西，所以在这接口反而容易些

```php
require "../util/DBUtils.php";
header("content-type: application/json");
$res = array("code"=>200,"msg"=>"操作失败");
$sql = "SELECT * from `options`";
$data = query($sql);
if(!empty($data)){
  $res["code"] = 100;
  $res["msg"] = "操作成功";
  $res["data"] = $data;
}
echo(json_encode($res));
```

记得在前端根据不同的key来组合成对象

### 3.2 修改网站设置

在点击保存操作的时候把数据收集起来发送到服务器

```javascript
//修改按钮的点击事件
$("#btn-sure").on("click",function(){
  var data = serialiseFormData("#setting-data");
  $.post("../php/settings/updateSettingData.php",data,function(res){
    var icon = res.code == 100 ? 1 : 0;
    if(res.code == 100){
      layer.alert(res.msg,{icon:icon});
    }
  });
});
```

在这里我们直接把所有的键值对以对象的形式发送到服务端了，因此服务端接收到的是一个对象，但是我们在数据表里面要更新的是多行数据，所以在接口重要遍历该对象来进行更新

```php
require "../util/DBUtils.php";
header("content-type: application/json");
$res = array("code"=>200,"msg"=>"操作失败");
//需要一个一个的更新数据数据，因此要遍历数组多次更新
$flag = true;
//数据结构要求我们必须一个一个的更新，所以要遍历更新
foreach($_POST as $key=>$val){
  $sql = 'UPDATE `options` SET `value`="' . $val . '" WHERE `key`="' . $key . '"';
  $data = delete($sql);
  if(!$data){
    $flag = false;
  }
}
//只有当全都操作成功，返回true
if($flag){
  $res["code"] = 100;
  $res["msg"] = "操作成功";
}
echo(json_encode($res));
```