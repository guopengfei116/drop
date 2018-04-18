# 评论管理模块

## 第一步：页面

新建一个commets.html

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>Comments &laquo; Admin</title>
  <link rel="stylesheet" href="../assets/lib/bootstrap/css/bootstrap.css">
  <link rel="stylesheet" href="../assets/lib/font-awesome/css/font-awesome.css">
  <link rel="stylesheet" href="../assets/css/common.css">
</head>
<body>

  <div class="main">
    <div class="container-fluid">
      <div class="page-title">
        <h1>所有评论</h1>
      </div>
      <div class="page-action">
        <!-- show when multiple checked -->
        <div class="btn-batch" style="display: none">
          <button class="btn btn-info btn-sm">批量批准</button>
          <button class="btn btn-warning btn-sm">批量拒绝</button>
          <button class="btn btn-danger btn-sm">批量删除</button>
        </div>
        <ul id="pagination" class="pagination pagination-sm pull-right">
          <!-- <li><a href="#">上一页</a></li>
          <li><a href="#">1</a></li>
          <li><a href="#">2</a></li>
          <li><a href="#">3</a></li>
          <li><a href="#">下一页</a></li> -->
        </ul>
      </div>
      <table class="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th class="text-center" width="40"><input type="checkbox"></th>
            <th style="min-width:80px;">作者</th>
            <th>评论</th>
            <th width="110" class="text-center">评论在</th>
            <th class="text-center" width="90">提交于</th>
            <th width="80">状态</th>
            <th class="text-center" width="100">操作</th>
          </tr>
        </thead>
        <tbody id="dataset">
          <tr class="danger">
            <td class="text-center"><input type="checkbox"></td>
            <td>大大</td>
            <td>楼主好人，顶一个</td>
            <td>《Hello world》</td>
            <td>2016/10/07</td>
            <td>未批准</td>
            <td class="text-center">
              <a href="post-add.html" class="btn btn-info btn-xs">批准</a>
              <a href="javascript:;" class="btn btn-danger btn-xs">删除</a>
            </td>
          </tr>
          <tr>
            <td class="text-center"><input type="checkbox"></td>
            <td>大大</td>
            <td>楼主好人，顶一个</td>
            <td>《Hello world》</td>
            <td>2016/10/07</td>
            <td>已批准</td>
            <td class="text-center">
              <a href="post-add.html" class="btn btn-warning btn-xs">驳回</a>
              <a href="javascript:;" class="btn btn-danger btn-xs">删除</a>
            </td>
          </tr>
          <tr>
            <td class="text-center"><input type="checkbox"></td>
            <td>大大</td>
            <td>楼主好人，顶一个</td>
            <td>《Hello world》</td>
            <td>2016/10/07</td>
            <td>已批准</td>
            <td class="text-center">
              <a href="post-add.html" class="btn btn-warning btn-xs">驳回</a>
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
  <script src="../assets/js/comment.js"></script>
</body>
</html>
```

## 第二步：功能分析

1. 展示评论，并对评论进行分页处理
2. 修改评论状态
3. 删除评论
4. 批量修改评论状态

## 第三步：实现功能

### 3.1 展示评论

**分页的逻辑有些复杂，所以先实现把所有数据获取出来并展示**

#### 3.1.1 数据接口

在php目录下新建comments文件件，在其中新建getCommentsList.php

```php
require "../util/DBUtils.php";
header("content-type: application/json");
//不需要参数，直接查询所有的用户出来
$sql = "SELECT * FROM comments";
$data = query($sql);
echo(json_encode($data));
```

#### 3.1.2 数据渲染结构模板

```html
<script type="text/x-jquery-tmpl" id="mt">
    <tr commentid="${id}">
      <td class="text-center"><input type="checkbox"></td>
      <td>${author}</td>
      <td>${content}</td>
      <td class="text-center" >《 ${title} 》</td>
      <td class="text-center" >${created}</td>
      <td>
        {{if status==0}}
          <span>未批准</span>
        {{else status==1}}
          <span>已批准</span>
        {{else status==2}}
          <span>已驳回</span>
        {{else status==3}}
          <span>已作废</span>
        {{/if}}
      </td>
      <td class="text-center">
        {{if status==0}}
          <a href="javascript:void(0);" class="btn approve btn-info btn-xs">批准</a>
        {{else status==1}}
          <a href="javascript:void(0);" class="btn reject btn-warning btn-xs">驳回</a>
        {{else status==2}}
          <a href="javascript:void(0);" class="btn nullify btn-danger btn-xs">作废</a>
        {{/if}}
        <a href="javascript:;" class="btn del btn-danger btn-xs">删除</a>
      </td>
    </tr>
  </script>
```

#### 3.1.3 js文件

在js目录下新建一个comments.js

```javascript
$(function(){
  //请求评论数据
  $.post("../php/comments/getCommnetsList.php",{},function(res){
    //将数据已模板的形式填充到表格
    $("#dataset").empty().append($("#mt").tmpl(res));
  });
});
```

至此，数据已经都在页面上了。

**谈谈分页的必要**

​	评论这种数据，不像后台系统的用户，后台系统的用户一般不会太多，可以分页，也可以不分页，取决于用户的数量。但是评论数据，一般是非常多的，可能有成千上万条，每次查询都查询成千上万条的数据，对服务器和数据库都是不友好的，管理员在查看的时候也不方便，因此我们对于数据量非常大的数据都会采用分页显示的方式处理。

### 3.2 数据分页

#### 首先梳理下分页的逻辑

先看看分页的样子

![](imgs/pagination.png)

也就是说我们要生成这样一个结构，当用户点击不同的页码或者上一页下一页的时候我们会查询对应的数据展示。

```javascript
//分页需要哪些要素：
//1 数据的总量  2 每页展示多少条数据 3 一共分成多少页 4 分页按钮一共有几个 5 当前是第几页
var total,        pageSize,          pageCount,       buttonCount,    currentPage
//其中数据总量是数据库提供的
//每页展示多少数据是我们自己决定的
//一共分成多少页 =  Math.ceil(数据总量 / 每页显示的数据量);
//一共显示多少个分页按钮是我们自己绝对顶的
//当前是第几页取决于用户点击的页码，默认一开始是第1页
//假设： 每页显示10条数据，分页按钮显示5个，默认当前是第1页
pageSize = 10;
buttonCount = 5;
currentPage = 1;
total = getFromServer();//从服务器获取,假设是998
pageCount = Math.ceil(total / pageSize);
//根据当前页计算出开始的页码
//假设当前是第3页，那么开始应该是第1页 => 1=3-2 => 开始 = 当前 - Math.floor(总按钮数 / 2)
var start = currentPage - Math.floor(buttonCount / 2);
//如果开始的页面小于1了，也不行，强制设置开始页码为1
if(start < 1){
  start = 1;
}
//根据开始的页码计算出结束的页码
//假设开始页码是第1页，结束页码为5 => 5=1+4 => 结束 = 开始 + (按钮总数 - 1)
var end = start + (buttonCount - 1);
//如果结束页码比总页数还大了也不行，强制设定为最大页码数
if(end > pageCount){
  end = pageCount;
  //但是如果强制设定之后，会导致按钮个数减少
  //假设最多有10页，当前是第9页，那么计算出来的开始页码是 9-2 = 7
  //计算出来的结束页码是 7+4=11，超出了最大页码数会被强制设定为10
  //但是这样一来会导致开始是7，结束是10，即最终显示的页码： 7,8,9,10 只有4个，所以得重新计算出开始的位置
  start = end - (buttonCount - 1);
  //经过这么一计算 start = 10 - 4 = 6 ，最终显示的按钮： 6,7,8,9,10
}
//生成分页结构
var html = "";
//当前页如果是1，没有上一页
if (currentPage != 1) {
  html += "<li><a href='javascript:void(0);' class='page-button' page='" + (currentPage - 1) + "'>上一页</a></li>";
}
for (var i = start; i <= end; i++) {
  html += "<li><a href='javascript:void(0);' class='page-button' page='" + i + "'>" + i + "</a></li>";
}
//当前页如果是最后一页，没有下一页
if (currentPage != pageCount) {
  html += "<li><a href='javascript:void(0);' class='page-button' page='" + (currentPage + 1) + "'>下一页</a></li>";
}
//把结构添加都分页结构的位置
$("#pagination").html(html);
```

下面就是需要去服务器获取数据的部分，新建一个getCommentsByPage.php

```php
require "../util/DBUtils.php";
header("content-type: application/json");
$res = array("code"=>200,"msg"=>"操作失败");
//先获取评论数据的总条数
$total = query("SELECT count(*) as total from comments");
$total = $total[0]["total"];
//要从浏览器那里得到一个浏览器端在页面上显示的数据条数
$pageSize = $_POST["pageSize"];
//以及当前是第几页
$currentPage = $_POST["currentPage"];
//计算出总共有多少页数据
$pageCount = ceil($total / $pageSize);
//计算出要从数据库中获取数据的下标
$offsetStart = ($currentPage - 1) * $pageSize;
//拼接sql语句
$sql = "SELECT a.*,b.title from comments as a LEFT JOIN articles as b ON a.article_id = b.id LIMIT ". $offsetStart ."," . $pageSize;
//根据sql语句查询数据
$data = query($sql);
//返回结果
if(!empty($data)){
  $res["code"] = 100;
  $res["msg"] = "操作成功";
  $res["data"] = $data;
  $res["total"] = $total;
  $res["pageCount"] = $pageCount;
}
echo(json_encode($res));
```

至此，数据接口准备完毕，在comments.js中需要重新写获取数据的代码

```javascript
//comments.js
$(function(){
  //各种参数
  var currentPage = 1;
  var pageSize = 10;
  var buttonCount = 5;
  var total;
  var pageCount;
  //手动调用一次，让一开始在页面加载完毕之后也能得到数据
  pageLoadComments();
  //把请求数据的方法封装起来，因为每次点击分页按钮获取数据添加到结构中的逻辑是一样的
  function pageLoadComments(){
    var data = {
      currentPage: currentPage,
      pageSize: pageSize
    };
	//发送请求
    $.post("../php/comments/getCommentsByPage.php", data, function (res) {
      if (res.code == 100) {
        total = res.total;
        pageCount = res.pageCount;
        var data = res.data;
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
  //分页按钮的点击事件
  $("#pagination").on("click",".page-button",function(){
    var index = $(this).attr("page");
    currentPage = parseInt(index);
    pageLoadComments();
  });
});
```

### 3.3 修改评论数据首先需要

首先需要找到在表格中批准、驳回等操作按钮，注册点击事件

```javascript
$("#dataset").on("click",".nullify,.reject,.approve",function(){
        //获取操作
        var opt = $(this).attr("opt");
        //获取id
        var id = $(this).parent().parent().attr("commentid");
        //把操作发送到服务器，让服务器进行对应的操作
        $.post("../php/comments/updateComnentsById.php",{id:id,opt:opt},function(res){
            var icon = res.code == 100 ? 1 : 0;
            if(res.code == 100){
                layer.alert(res.msg,{icon:icon},function(index){
                    layer.close(index);
                    pageLoadComments();
                });
            }
        });
    });
```

这个地方的处理思路是：

​	每个按钮中的opt属性保存了对应的操作，把这个操作带回服务器，在服务端判断是什么操作，修改对应的评论的status，因此在comments目录下建立updateComnentsById.php文件

```php
require "../util/DBUtils.php";
header("content-type: application/json");
$res = array("code"=>200,"msg"=>"操作失败");

$id = $_POST['id'];
$opt = $_POST["opt"];
$statu = 0;
//根据$opt可以知道要改成什么样的状态
switch($opt){
    //批准
  case "approve":
    $statu = 1;
    break;
    //驳回操作
  case "reject":
    $statu = 2;
    break;
    //废除操作
  case "nullify":
    $statu = 3;
    break;
}
//拼接sql语句
$sql = "update comments set `status`=" . $statu . " where id = " . $id;
//执行sql语句
$data = delete($sql);
if($data){
  $res["code"] = 100;
  $res["msg"] = "操作成功";
}
echo(json_encode($res));
```

