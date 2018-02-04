# 文章管理模块

## 第一步：页面准备

在pages目录下建立一个articles.html的文件

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>Posts &laquo; Admin</title>
  <link rel="stylesheet" href="../assets/lib/bootstrap/css/bootstrap.css">
  <link rel="stylesheet" href="../assets/lib/font-awesome/css/font-awesome.css">
  <link rel="stylesheet" href="../assets/css/common.css">
</head>
<body>

  <div class="main">
    <div class="container-fluid">
      <div class="page-title">
        <h1>所有文章</h1>
        <a href="addArticle.html" class="btn btn-primary btn-xs">写文章</a>
      </div>
      <div class="page-action">
        <!-- show when multiple checked -->
        <a class="btn btn-danger btn-sm" href="javascript:;" style="display: none">批量删除</a>
        <form class="form-inline">
          <select id="categories" name="" class="form-control input-sm">
            <!-- <option value="">所有分类</option>
            <option value="">未分类</option> -->
          </select>
          <select id="status" name="" class="form-control input-sm">
            <option value="">所有状态</option>
            <option value="0">草稿</option>
            <option value="1">已发布</option>
          </select>
          <input type="button" id="queryby" class="btn btn-default btn-sm" value="筛选">
        </form>
        <ul id="pagination" class="pagination pagination-sm pull-right">
          <li><a href="#">上一页</a></li>
          <li><a href="#">1</a></li>
          <li><a href="#">2</a></li>
          <li><a href="#">3</a></li>
          <li><a href="#">下一页</a></li>
        </ul>
      </div>
      <table class="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th class="text-center" width="40"><input type="checkbox"></th>
            <th>标题</th>
            <th>作者</th>
            <th>分类</th>
            <th class="text-center">发表时间</th>
            <th class="text-center">状态</th>
            <th class="text-center" width="100">操作</th>
          </tr>
        </thead>
        <tbody id="dataset">
          <tr>
            <td class="text-center"><input type="checkbox"></td>
            <td>随便一个名称</td>
            <td>小小</td>
            <td>潮科技</td>
            <td class="text-center">2016/10/07</td>
            <td class="text-center">已发布</td>
            <td class="text-center">
              <a href="javascript:;" class="btn btn-default btn-xs">编辑</a>
              <a href="javascript:;" class="btn btn-danger btn-xs">删除</a>
            </td>
          </tr>
          <tr>
            <td class="text-center"><input type="checkbox"></td>
            <td>随便一个名称</td>
            <td>小小</td>
            <td>潮科技</td>
            <td class="text-center">2016/10/07</td>
            <td class="text-center">已发布</td>
            <td class="text-center">
              <a href="javascript:;" class="btn btn-default btn-xs">编辑</a>
              <a href="javascript:;" class="btn btn-danger btn-xs">删除</a>
            </td>
          </tr>
          <tr>
            <td class="text-center"><input type="checkbox"></td>
            <td>随便一个名称</td>
            <td>小小</td>
            <td>潮科技</td>
            <td class="text-center">2016/10/07</td>
            <td class="text-center">已发布</td>
            <td class="text-center">
              <a href="javascript:;" class="btn btn-default btn-xs">编辑</a>
              <a href="javascript:;" class="btn btn-danger btn-xs">删除</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <script src="../assets/lib/jquery/jquery.js"></script>
  <script src="../assets/lib/jquery/jquery.tmpl.min.js"></script>
  <script src="../assets/lib/layer/layer.js"></script>
  <script src="../assets/lib/bootstrap/js/bootstrap.js"></script>
  <script src="../assets/lib/jquery/jquery.cookie.js"></script>
  <script src="../assets/js/commom.js"></script>
</body>
</html>
```

## 第二：功能分析

1. 展示所有的文章，并且分页显示
2. 根据状态和分类进行查询，也要分页显示
3. 点击编辑按钮，跳转到编辑文章部分进行编辑
4. 点击删除按钮，可以把文章删除
5. 点击写文章，可以对新增一篇文章

## 第三：功能实现

### 3.1 分页显示所有文章

这个功能需要把大量数据放到一个表格里面，因此我们可以使用模板插件帮我们展示数据，要先准备好结构模板

```javascript
  <script id="mt" type="text/x-jquery-tmpl">
    <tr articleid="${id}">
      <td class="text-center"><input type="checkbox"></td>
      <td>${title}</td>
      <td>${nickname}</td>
      <td>${name}</td>
      <td class="text-center">${created}</td>
      <td class="text-center">
        {{if status==0}}
          <span>草稿</span>
        {{else status==1}}
          <span>已发布</span>
        {{/if }}
      </td>
      <td class="text-center">
        <a href="javascript:;" class="btn edit btn-default btn-xs">编辑</a>
        <a href="javascript:;" class="btn del btn-danger btn-xs">删除</a>
      </td>
    </tr>
  </script>
```

接着准备一个可以提供分页数据的接口，在php目录下建立一个articles文件件，在其中建立一个getArticlesByPage.php文件

```php
require "../util/DBUtils.php";
header("content-type: application/json");
$res = array("code"=>200,"msg"=>"操作失败");
//先查询出数据的总数
$sqlcount = "SELECT count(*) as total from articles";
$total = query($sqlcount);
$total = $total[0]["total"];
//获取当前的页码
$currentPage = $_POST["currentPage"];
//获取页面容量
$pageSize = $_POST["pageSize"];
//总共多少页
$pageCount = ceil($total/$pageSize);
//计算出要的数据的起始位置
$offsetStart = ($currentPage - 1) * $pageSize;
//sql语句
$sql = "SELECT a.*,b.nickname,c.`name` FROM articles as a LEFT JOIN users as b on b.id = a.user_id LEFT JOIN categories as c on c.id = a.category_id ";
//准备接收状态和分类的变量
$status;
$category_id;
//如果有传递状态参数过来，就获取
if(array_key_exists("status",$_POST)){
  $status = $_POST["status"];
}
//如果有传递分类参数过来，就获取
if(array_key_exists("category_id",$_POST)){
  $category_id = $_POST["category_id"];
}
//判断是否包含分类和状态查询
if(isset($status) || isset($category_id)){
  $sql .= " where ";
}
//拼接sql语句
if(isset($status)){
  $sql .= " a.status = " . $status;
}
if(isset($category_id)){
  isset($status) ? $sql .= " and " : $sql;
  $sql .= " a.category_id = " . $category_id;
}
//拼接sql语句
$sql .= "  LIMIT " . $offsetStart . "," . $pageSize;
//执行查询
$data = query($sql);
if(!empty($data)){
  $res["code"] = 100;
  $res["msg"] = "操作成功";
  $res["data"] = $data;
  $res["total"] = $total;
  $res["pageCount"] = $pageCount;
}
echo(json_encode($res));
```

数据接口有了，就应该发送请求，获取数据然后渲染到页面上了。在js目录下建立一个articles.js文件，但是由于我们是需要根据分类和状态进行查询的，所以需要先动态加载分类

```javascript
$(function () {
    //当前的页码数
    var currentPage = 1;
    //一共显示多少条数据
    var pageSize = 10;
    //显示多少个分页按钮
    var buttonCount = 5;
    //总数据数
    var total;
    var pageCount;

   pageLoadArtical();
    //封装好的加载文章数据的方法
    function pageLoadArtical() {
        //分页参数
        var data = {
            currentPage: currentPage,
            pageSize: pageSize
        };
        //根据指定分类查询的条件
        var category = $("#categories").val();
        //根据指定状态查询的条件
        var status = $("#status").val();
        //判断有没有根据分来查询
        if (category.length != 0) {
            data.category_id = category;
        }
        //判断有没有根据状态查询
        if (status.length != 0) {
            data.status = status;
        }
        //向服务器发送请求
        $.post("../php/articles/getArticlesByPage.php", data, function (res) {
            if (res.code == 100) {
                //先同步分页数据
                total = res.total;
                pageCount = res.pageCount;
                var data = res.data;
                //使用模板把数据填充到表格
                $("#dataset").empty().append($("#mt").tmpl(data));
                //分页
                //根据当前页算出开始的页码
                var start = currentPage - Math.floor((buttonCount / 2));
                if (start < 1) {
                    start = 1;
                }
                //计算出结束的页码
                var end = start + buttonCount - 1;
                if (end > pageCount) {
                    end = pageCount;
                    //重新计算开始的位置
                    start = end - buttonCount + 1;
                    if (start < 1) {
                        start = 1;
                    }
                }
                //生成分页的结构
                var html = "";
                if (currentPage != 1) {
                    html = "<li><a href='javascript:void(0);' class='page-button' page='" + (currentPage - 1) + "'>上一页</a></li>";
                }
                for (var i = start; i <= end; i++) {
                    html += "<li><a href='javascript:void(0);' class='page-button' page='" + i + "'>" + i + "</a></li>";
                }
                if (currentPage != pageCount) {
                    html += "<li><a href='javascript:void(0);' class='page-button' page='" + (currentPage + 1) + "'>下一页</a></li>";
                }
                $("#pagination").html(html);
            }
        });
    }
});
```
后来我们发现还要根据分类和状态查询，所以还得加载所有的分类

之前在完成分类管理模块的时候已经有了一个加载所有分类的接口：getCategorys.php,所以现在直接请求即可

```javascript
$.post("../php/categories/getCategories.php", function (res) {
  if (res.code == 100) {
    //先把所有的分类加载到下拉框
    var html = "<option value='' >所有分类</option>";
    for (var i = 0; i < res.data.length; i++) {
      var data = res.data[i];
      html += "<option value='" + data.id + "' >" + data.name + "</option>";
    }
    $("#categories").html(html);
    //分来加载完毕之后再加载文章数据
    pageLoadArtical();
  }
});
```

而此时我们如果想要根据分类或者状态进行筛选，就要点击筛选按钮，所以还要给筛选按钮注册点击事件

```javascript
//筛选
$("#queryby").on("click", function () {
  currentPage = 1;
  pageLoadArtical();
});
```

当我们点击分页按钮的时候也要能够刷新数据，所以还要给所有的分页按钮注册事件

```javascript
//分页的按钮点击
$("#pagination").on("click", ".page-button", function () {
  //得到当前的页面
  var index = $(this).attr("page");
  //重新加载
  currentPage = parseInt(index);
  pageLoadArtical();
});
```

### 3.2 点击删除按钮

先找到删除按钮，注册点击事件

```javascript
//删除
$("#dataset").on("click", ".del", function () {
  //获取文章的的id
  var id = $(this).parent().parent().attr("articleid");
  //请求服务器删除
  $.post('../php/articles/deleteArticle.php', {
    id: id
  }, function (res) {
    if (res.code == 100) {
      layer.alert(res.msg, {
        icon: 1
      }, function () {
        window.location.reload();
      });
    }
  });
});
```

还需要一个可以删除数据的接口： deleteArticle.php

```php
require "../util/DBUtils.php";
header("content-type: application/json");
$res = array("code"=>200,"msg"=>"操作失败");
//获取id
$id = $_POST["id"];
//拼接sql语句
$sql = "delete from articles where id = " . $id;
//执行删除操作
$data = delete($sql);

if($data){
$res["code"] = 100;
$res["msg"] = "操作成功";
}

echo(json_encode($res));
```

## 第四：新增文章

点击写文章导航栏，会跳转到一个新的页面，所以的先准备一个新页面：addArticle.html

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>Add new post &laquo; Admin</title>
  <link rel="stylesheet" href="../assets/lib/bootstrap/css/bootstrap.css">
  <link rel="stylesheet" href="../assets/lib/font-awesome/css/font-awesome.css">
  <link rel="stylesheet" href="../assets/css/common.css">
</head>
<body>

  <div class="main">
    <div class="container-fluid">
      <div class="page-title">
        <h1>写文章</h1>
      </div>
      <form class="row" id="articledata">
        <div class="col-md-9">
          <div class="form-group">
            <label for="title">标题</label>
            <input id="title" class="form-control input-lg" name="title" type="text" placeholder="文章标题">
          </div>
          <div class="form-group">
            <label for="content">标题</label>
            <textarea id="content" class="form-control input-lg" name="content" cols="30" rows="10" placeholder="内容"></textarea>
          </div>
        </div>
        <div class="col-md-2">
          <div class="form-group">
            <label for="slug">别名</label>
            <input id="slug" class="form-control" name="slug" type="text" placeholder="slug">
            <p class="help-block">https://zce.me/post/<strong>slug</strong></p>
          </div>
          <div class="form-group">
            <label for="feature">特色图像</label>
            <!-- show when image chose -->
            <img class="help-block thumbnail" style="display: none">
            <input id="feature" class="form-control" type="file">
            <input type="hidden" name="feature" id="featuredata">
          </div>
          <div class="form-group">
            <label for="category">所属分类</label>
            <select id="category" class="form-control" name="category_id">
              <!-- <option value="1">未分类</option>
              <option value="2">潮生活</option> -->
            </select>
          </div>
          <div class="form-group">
            <label for="created">发布时间</label>
            <input id="created" class="form-control" name="created" type="datetime-local">
          </div>
          <div class="form-group">
            <label for="status">状态</label>
            <select id="status" class="form-control" name="status">
              <option value="0">草稿</option>
              <option value="1">已发布</option>
            </select>
          </div>
          <div class="form-group">
            <button id="btn-sure" class="btn btn-primary" type="submit" opt="add">保存</button>
          </div>
        </div>
      </form>
    </div>
  </div>

  <script src="../assets/lib/jquery/jquery.js"></script>
  <script src="../assets/lib/layer/layer.js"></script>
  <script src="../assets/lib/bootstrap/js/bootstrap.js"></script>
  <script src="../assets/lib/jquery/jquery.cookie.js"></script>
  <script src="../assets/js/commom.js"></script>
  <script src="../assets/js/addArticle.js"></script>
</body>
</html>
```

在点击保存按钮的时候，会把所有的数据发送到服务器进行保存，因此找到保存按钮注册点击事件，这是一个新的页面，此时需要新建一个新的js： addArticle.js

```javascript
//保存操作
$("#btn-sure").on("click", function () {
  var data = serialiseFormData("#articledata");
  data.user_id = $.cookie("user_id");
  //这是添加操作
  $.post("../php/articles/addArticle.php", data, function (res) {
    if (res.code == 100) {
      layer.alert(res.msg, {
        icon: 1
      });
    }
  });
  return false;
});
```

但是保存的数据里面，有分类，有图片路径，其中分类是需要从服务端加载的，图片是需要上传的，所以还要先加载分类和上传图片

```javascript
//addArticle.js
//先加载所有的分类
    $.post("../php/categories/getCategories.php", function (res) {
        if (res.code == 100) {
            var html = "";
            for (var i = 0; i < res.data.length; i++) {
                var data = res.data[i];
                html += "<option value='" + data.id + "'>" + data.name + "</option>";
            }
            $("#category").html(html);
        }
    });
    //上传 图片
    $("#feature").on("change", function () {
        var _that = this;
        var data = new FormData();
        data.append("file", this.files[0]);

        //jq的ajax不支持文件上传，自己写一个
        var xhr = new XMLHttpRequest();
        xhr.open("post", "../php/common/uploadFile.php");
        xhr.send(data);

        xhr.onreadystatechange = function () {
            if (xhr.status == 200 && xhr.readyState == 4) {

                var res = JSON.parse(xhr.responseText);
                if (res.code == 100) {
                    $(_that).prev().attr("src", location.origin + res.data).show();
                    $("#featuredata").val(res.data);
                }
            }
        }

    });
```

那么到目前为止，就只需要一个可以保存数据的接口了，新建一个addArtical.php文件

```php
require "../util/DBUtils.php";
header("content-type: application/json");

$res = array("code"=>200,"msg"=>"操作失败");
//调用插入方法插入数据
$data = insert("articles",$_POST);

if($data){
  $res["code"] = 100;
  $res["msg"] = "操作成功";
}

echo(json_encode($res));
```

## 第五：编辑功能

在articles.html页面，每个文章都有编辑功能，我们会发现，编辑功能需要修改的东西跟添加的时候需要的东西是一样的，所以我们希望在点击编辑的时候，希望能把数据填充到addArticle.html页面，此时需要使用url传递参数的方式进行，在articles.js里面添加如下代码：

```javascript
//编辑
$("#dataset").on("click", ".edit", function () {
  var articleid = $(this).parent().parent().attr("articleid");
  //获取到id，跳转到编辑
  location.href = "addArticle.html" + "?id=" + articleid;
});
```

//这样就可以在addArticle.html这边从url上得到要修改的文章的id，从而进行数据获取，需要将获取分类的代码做如下修改

```javascript
//先加载所有的分类
$.post("../php/categories/getCategories.php", function (res) {
  if (res.code == 100) {
    var html = "";
    for (var i = 0; i < res.data.length; i++) {
      var data = res.data[i];
      html += "<option value='" + data.id + "'>" + data.name + "</option>";
    }
    $("#category").html(html);
    //通过地址上的参数获取要编辑的用户的id
    var articleid = location.search.substring(1).split("=")[1];
    //如果有id，那么就是编辑操作，先到服务器获取数据
    if (articleid != undefined) {
      $.post("../php/articles/getArticleById.php", {
        id: articleid
      }, function (res) {
        if (res.code == 100) {
          //填充数据 
          $("#title").val(res.data.title);
          $("#content").val(res.data.content);
          $("#slug").val(res.data.slug);
          $("#featuredata").val(res.data.feature);
          $(".thumbnail").attr("src", res.data.feature).show();
          $("#category").val(res.data.category_id);
          res.data.created = res.data.created.replace(" ", "T");
          $("#created").val(res.data.created);
          $("#status").val(res.data.status);
        }
      });
    }
  }
});
```

然后在点击保存的时候把数据修改到服务端，但是又因为跟我们新增文章的时候点的是同一个按钮，因此得做判断，什么时候是添加，什么时候是修改

```javascript
//保存操作
$("#btn-sure").on("click", function () {
  var data = serialiseFormData("#articledata");
  data.user_id = $.cookie("user_id");
  //通过地址是否包含id来判断是添加文章还是修改文章
  var articleid = location.search.substring(1).split("=")[1];
  if (articleid != undefined) {
    //更新操作需要文章的id
    data.id = articleid;
    //有id，是更新操作
    $.post("../php/articles/updateAticle.php",data,function(res){
      if (res.code == 100) {
        layer.alert(res.msg, {
          icon: 1
        });
      }
    });
  } else {
    //这是添加操作
    $.post("../php/articles/addArticle.php", data, function (res) {
      if (res.code == 100) {
        layer.alert(res.msg, {
          icon: 1
        });
      }
    });
  }
  return false;
});
```

