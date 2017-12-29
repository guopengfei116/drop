## 导入全局样式
- 把已经写好的网站样式文件 `css` 目录放入到 `src` 当中
- 把准备好的图片放入到 `src/img` 目录中

## 公共头部组件
- 创建 `src/component/frame/Header.vue`
- 因为 `Header 组件`是 `App 组件`的公共架构部分, 所以把它创建在根组件所在目录的 `/frame` 里

#### 静态布局
- 这里直接使用已经布好局的头部 html 片段

```vue
<template>
    <div id="header" class="header">
        <div class="head-top">
            <div class="section">
                <div class="left-box">
                    <span>vue2.0单页应用</span>
                    <a target="_blank" href="#"></a>
                    <a target="_blank" href="#"></a>
                </div>
                <div id="menu" class="right-box">
                    <a href="/login.html">登录</a>
                    <a href="/register.html">注册</a>
                    <strong>|</strong>
                    <!--<a href="/content/contact.html"><i class="iconfont icon-phone"></i>联系我们</a>
                    <a href="/cart.html"><i class="iconfont icon-cart"></i>购物车(<span id="shoppingCartCount"><script type="text/javascript" src="/tools/submit_ajax.ashx?action=view_cart_count"></script></span>)</a>-->
                </div>
            </div>
        </div>
        <div class="head-nav">
            <div class="section">
                <!-- <div class="logo">
                    <a href="/index.html"><img width="230px" height="70px" src="/templates/main/images/logo.png" /></a>
                </div>-->
                <div id="menu2" class="nav-box menuhd">
                    <ul>
                        <li class="index">
                            <a href="/index.html">
                                首页
                            </a>
                        </li>
                        <li class="news">
                            <a href="/news.html">
                                学员问题汇总
                            </a>
                        </li>
                        <li class="photo">
                            <a href="/photo.html">
                                重难点专区
                            </a>
                        </li>
                        <!--<li class="goods"><a href="">就业阶段</a></li>-->
                        <li class="video">
                            <a href="/video.html">
                                前端常用功能
                            </a>
                        </li>
                        <li class="down">
                            <a href="/down.html">
                                资源下载
                            </a>
                        </li>
                        <li>
                            <a target="_blank" href="/admin/index.aspx">
                                问题提交
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="search-box">
                    <div class="input-box">
                        <input id="keywords" name="keywords" type="text" onkeydown="if(event.keyCode==13){SiteSearch('/search.html', '#keywords');return false};" placeholder="输入关健字" x-webkit-speech="">
                    </div>
                    <a href="javascript:;" onclick="SiteSearch('/search.html', '#keywords');">
                        <i class="iconfont icon-search"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>
```

#### 集成jQuery导航插件
- [插件介绍与下载](http://www.jq22.com/jquery-info5332)
- 把下载好的`插件`放入网站的 `lib` 目录下, 这里专门`放置`那些`无法`用 `npm` 安装的`第三方包`

```vue
<script>
    // 导入jquery插件样式与jquery自身
    import '../../../lib/hover-nav/css/style.css';
    import $ from 'jquery';

    export default {

        // 在组件渲染后的钩子函数里使用jquery及插件
        mounted() {
            $("#menu2 li a").wrapInner( '<span class="out"></span>' );
            $("#menu2 li a").each(function() {
                $( '<span class="over">' +  $(this).text() + '</span>' ).appendTo( this );
            });

            $("#menu2 li a").hover(function() {
                $(".out",   this).stop().animate({'top':    '48px'},    300); // move down - hide
                $(".over",  this).stop().animate({'top':    '0px'},     300); // move down - show

            }, function() {
                $(".out",   this).stop().animate({'top':    '0px'},     300); // move up - show
                $(".over",  this).stop().animate({'top':    '-48px'},   300); // move up - hide
            });
        }
    }
</script>
```

## 公共面包屑导航组件
- 创建 `src/component/frame/Breadcrumb.vue`

#### 静态布局
- 这里直接使用已经布好局的头部 html 片段

```vue
<template>
    <div class="section">
        <div class="location">
            <span>当前位置：</span>
            <a href="/index.html">首页</a> &gt;
            <a href="/goods.html">购物商城</a>
        </div>
    </div>
</template>
```

## 商品模块路由配置
- 创建 `src/component/goods/GoodsHome.vue`
- 创建 `src/component/goods/detail/GoodsDetail.vue`
- 创建 `src/component/goods/list/GoodsList.vue`

#### 路由配置
- 修改 `src/router/index.js`;

```javascript
import GoodsHomeComponent from '../component/goods/GoodsHome.vue';
import GoodsDetailComponent from '../component/goods/detail/GoodsDetail.vue';
import GoodsListComponent from '../component/goods/list/GoodsList.vue';

// 导出路由配置
export default {
    routes: [
        // 商品模块
        { path: '/goods', component: GoodsHomeComponent },
        { path: '/goods/detail', component: GoodsDetailComponent },
        { path: '/goods/list', component: GoodsListComponent },
    ]
};
```

## 商品首页

#### 静态模版

```vue
<template>
    <div>
        <!-- 商品头部区域 -->
        <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <!--类别菜单-->
                    <div class="left-220" style="margin:0;">
                        <div class="banner-nav">
                            <ul>
                                <!--此处声明下面可重复循环-->

                                <li>
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>手机数码</span>
                                        <p>

                                            手机通讯 摄影摄像 存储设备

                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <!--如有三级分类，此处可循环-->
                                        <dl>
                                            <dt>
                                                <a href="/goods/40.html">手机数码</a>
                                            </dt>
                                            <dd>

                                                <a href="/goods/43.html">手机通讯</a>

                                                <a href="/goods/44.html">摄影摄像</a>

                                                <a href="/goods/45.html">存储设备</a>

                                            </dd>
                                        </dl>
                                    </div>
                                </li>

                                <li>
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>电脑办公</span>
                                        <p>

                                            电脑整机 外设产品 办公打印

                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <!--如有三级分类，此处可循环-->
                                        <dl>
                                            <dt>
                                                <a href="/goods/41.html">电脑办公</a>
                                            </dt>
                                            <dd>

                                                <a href="/goods/46.html">电脑整机</a>

                                                <a href="/goods/47.html">外设产品</a>

                                                <a href="/goods/48.html">办公打印</a>

                                            </dd>
                                        </dl>
                                    </div>
                                </li>

                                <li>
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>影音娱乐</span>
                                        <p>

                                            平板电视 音响DVD 影音配件

                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <!--如有三级分类，此处可循环-->
                                        <dl>
                                            <dt>
                                                <a href="/goods/42.html">影音娱乐</a>
                                            </dt>
                                            <dd>

                                                <a href="/goods/49.html">平板电视</a>

                                                <a href="/goods/50.html">音响DVD</a>

                                                <a href="/goods/51.html">影音配件</a>

                                            </dd>
                                        </dl>
                                    </div>
                                </li>

                            </ul>
                        </div>
                    </div>
                    <!--/类别菜单-->

                    <!--幻灯片-->
                    <div class="left-705">
                        <div class="banner-img">
                            <div id="focus-box" class="focus-box">
                                <ul class="slides">
                                    <li class="" style="width: 100%; float: left; margin-right: -100%; position: relative; opacity: 0; display: block; z-index: 1;">
                                        <a href="/goods.html">
                                            <img src="/templates/main/images/focus_1.png" draggable="false">
                                        </a>
                                    </li>
                                    <li style="width: 100%; float: left; margin-right: -100%; position: relative; opacity: 1; display: block; z-index: 2;" class="flex-active-slide">
                                        <a href="/goods.html">
                                            <img src="/templates/main/images/focus_2.png" draggable="false">
                                        </a>
                                    </li>
                                </ul>
                                <ol class="flex-control-nav flex-control-paging">
                                    <li>
                                        <a class="">1</a>
                                    </li>
                                    <li>
                                        <a class="flex-active">2</a>
                                    </li>
                                </ol>
                            </div>

                        </div>
                    </div>
                    <!--/幻灯片-->

                    <!--推荐商品-->
                    <div class="left-220">
                        <ul class="side-img-list">

                            <li>
                                <div class="img-box">
                                    <label>1</label>
                                    <img src="/upload/201504/20/thumb_201504200314272543.jpg">
                                </div>
                                <div class="txt-box">
                                    <a href="/goods/show-98.html">奔腾（BNTN） 380功放+纽约至尊 套装家庭影院</a>
                                    <span>2015-04-20</span>
                                </div>
                            </li>

                            <li>
                                <div class="img-box">
                                    <label>2</label>
                                    <img src="/upload/201504/20/thumb_201504200258403759.jpg">
                                </div>
                                <div class="txt-box">
                                    <a href="/goods/show-97.html">三星（SAMSUNG）UA40HU5920JXXZ 40英寸4K超高清</a>
                                    <span>2015-04-20</span>
                                </div>
                            </li>

                            <li>
                                <div class="img-box">
                                    <label>3</label>
                                    <img src="/upload/201504/20/thumb_201504200242250674.jpg">
                                </div>
                                <div class="txt-box">
                                    <a href="/goods/show-95.html">惠普（HP）LaserJet 2035商用黑白激光打印机（黑色）</a>
                                    <span>2015-04-20</span>
                                </div>
                            </li>

                            <li>
                                <div class="img-box">
                                    <label>4</label>
                                    <img src="/upload/201504/20/thumb_201504200239192345.jpg">
                                </div>
                                <div class="txt-box">
                                    <a href="/goods/show-94.html">金士顿（Kingston） DataTraveler SE9 32GB 金属U盘</a>
                                    <span>2015-04-20</span>
                                </div>
                            </li>

                        </ul>
                    </div>
                    <!--/推荐商品-->
                </div>
            </div>
        </div>

        <!-- 商品列表 -->
        <div class="section">

            <!--子类-->
            <div class="main-tit">
                <h2>手机数码</h2>
                <p>

                    <a href="/goods/43.html">手机通讯</a>

                    <a href="/goods/44.html">摄影摄像</a>

                    <a href="/goods/45.html">存储设备</a>

                    <a href="/goods/40.html">更多
                        <i>+</i>
                    </a>
                </p>
            </div>
            <!--/子类-->
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">

                        <li>
                            <a href="/goods/show-91.html">
                                <div class="img-box">
                                    <img src="/upload/201504/20/thumb_201504200214471783.jpg">
                                </div>
                                <div class="info">
                                    <h3>尼康(Nikon)D3300套机（18-55mm f/3.5-5.6G VRII）（黑色）</h3>
                                    <p class="price">
                                        <b>¥3180.00</b>元</p>
                                    <p>
                                        <strong>库存 10</strong>
                                        <span>市场价：
                                            <s>3150.00</s>
                                        </span>
                                    </p>
                                </div>
                            </a>
                        </li>

                        <li>
                            <a href="/goods/show-90.html">
                                <div class="img-box">
                                    <img src="/upload/201504/20/thumb_201504200154277661.jpg">
                                </div>
                                <div class="info">
                                    <h3>佳能（Canon） EOS 700D 单反套机</h3>
                                    <p class="price">
                                        <b>¥4799.00</b>元</p>
                                    <p>
                                        <strong>库存 98</strong>
                                        <span>市场价：
                                            <s>5099.00</s>
                                        </span>
                                    </p>
                                </div>
                            </a>
                        </li>

                        <li>
                            <a href="/goods/show-89.html">
                                <div class="img-box">
                                    <img src="/upload/201504/20/thumb_201504200119256512.jpg">
                                </div>
                                <div class="info">
                                    <h3>小米（Mi）小米Note 16G双网通版</h3>
                                    <p class="price">
                                        <b>¥2299.00</b>元</p>
                                    <p>
                                        <strong>库存 58</strong>
                                        <span>市场价：
                                            <s>2699.00</s>
                                        </span>
                                    </p>
                                </div>
                            </a>
                        </li>

                        <li>
                            <a href="/goods/show-88.html">
                                <div class="img-box">
                                    <img src="/upload/201504/20/thumb_201504200059017695.jpg">
                                </div>
                                <div class="info">
                                    <h3>苹果Apple iPhone 6 Plus 16G 4G手机（联通三网版）</h3>
                                    <p class="price">
                                        <b>¥5780.00</b>元</p>
                                    <p>
                                        <strong>库存 198</strong>
                                        <span>市场价：
                                            <s>6388.00</s>
                                        </span>
                                    </p>
                                </div>
                            </a>
                        </li>

                        <li>
                            <a href="/goods/show-87.html">
                                <div class="img-box">
                                    <img src="/upload/201504/20/thumb_201504200046589514.jpg">
                                </div>
                                <div class="info">
                                    <h3>华为（HUAWEI）荣耀6Plus 16G双4G版</h3>
                                    <p class="price">
                                        <b>¥2195.00</b>元</p>
                                    <p>
                                        <strong>库存 60</strong>
                                        <span>市场价：
                                            <s>2499.00</s>
                                        </span>
                                    </p>
                                </div>
                            </a>
                        </li>

                    </ul>
                </div>
            </div>
        </div>

    </div>
</template>
```

## 商品详情

#### 静态模版
- [在线获取](http://157.122.54.189:8998/down/show-140.html)


```vue
<template>
    <div>
        <!-- 导航栏 -->
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a>
                <a href="/goods/42/1.html">商品详情</a>

            </div>
        </div>

        <!-- 商品详情 -->
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <!--页面左边-->
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <!--商品图片-->
                            <div class="pic-box">

                            </div>
                            <!--/商品图片-->

                            <!--商品信息-->
                            <div class="goods-spec">
                                <h1>奔腾（BNTN） 380功放+纽约至尊 套装家庭影院</h1>
                                <p class="subtitle">送美诗特TA20无线话筒1套+自拍神器杆！ DTS解码数字功放 HDMI、光纤、同轴多组输入输出 USB、蓝牙播放功能</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">SD6583245641</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥5880.00</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em class="price" id="commoditySellPrice">¥4880.00</em>
                                        </dd>
                                    </dl>
                                </div>

                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <input id="commodityChannelId" type="hidden" value="2">
                                                <input id="commodityArticleId" type="hidden" value="98">
                                                <input id="commodityGoodsId" type="hidden" value="0">
                                                <input id="commoditySelectNum" type="text" maxlength="9" value="1" maxvalue="10" onkeydown="return checkNumber(event);">
                                                <a class="add" onclick="addCartNum(1);">+</a>
                                                <a class="remove" onclick="addCartNum(-1);">-</a>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">10</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div class="btn-buy" id="buyButton">
                                                <button class="buy" onclick="cartAdd(this,'/',1,'/shopping.html');">立即购买</button>
                                                <button class="add" onclick="cartAdd(this,'/',0,'/cart.html');">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>

                            </div>
                            <!--/商品信息-->
                        </div>

                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <!--选项卡-->
                            <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                <ul>
                                    <li>
                                        <a class="selected" href="javascript:;">商品介绍</a>
                                    </li>
                                    <li>
                                        <a href="javascript:;" class="">商品评论</a>
                                    </li>
                                </ul>
                            </div>
                            <!--/选项卡-->

                            <!--选项内容-->
                            <div class="tab-content entry" style="display:block;">
                                内容
                            </div>

                            <div class="tab-content" style="display: block;">
                                <!--网友评论-->
                                <div class="comment-box">
                                    <!--取得评论总数-->
                                    <form id="commentForm" name="commentForm" class="form-box" url="/tools/submit_ajax.ashx?action=comment_add&amp;channel_id=2&amp;article_id=98">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" name="submit" type="submit" value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </form>
                                    <ul id="commentList" class="list-box">
                                        <p style="margin:5px 0 15px 69px;line-height:42px;text-align:center;border:1px solid #f7f7f7;">暂无评论，快来抢沙发吧！</p>
                                        <li>
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>匿名用户</span>
                                                    <span>2017/10/23 14:58:59</span>
                                                </div>
                                                <p>testtesttest</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>匿名用户</span>
                                                    <span>2017/10/23 14:59:36</span>
                                                </div>
                                                <p>很清晰调动单很清晰调动单</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <!--放置页码-->
                                    <div class="page-box" style="margin:5px 0 0 62px">
                                        <div id="pagination" class="digg">
                                            <span class="disabled">« 上一页</span>
                                            <span class="current">1</span>
                                            <span class="disabled">下一页 »</span>
                                        </div>
                                    </div>
                                    <!--/放置页码-->
                                </div>

                                <!--/网友评论-->
                            </div>

                        </div>

                    </div>
                    <!--/页面左边-->

                    <!--页面右边-->
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">

                                    <li>
                                        <div class="img-box">
                                            <a href="/goods/show-98.html">
                                                <img src="/upload/201504/20/thumb_201504200314272543.jpg">
                                            </a>
                                        </div>
                                        <div class="txt-box">
                                            <a href="/goods/show-98.html">奔腾（BNTN） 380功放+纽约至尊 套装家庭影院</a>
                                            <span>2015-04-20</span>
                                        </div>
                                    </li>

                                    <li>
                                        <div class="img-box">
                                            <a href="/goods/show-97.html">
                                                <img src="/upload/201504/20/thumb_201504200258403759.jpg">
                                            </a>
                                        </div>
                                        <div class="txt-box">
                                            <a href="/goods/show-97.html">三星（SAMSUNG）UA40HU5920JXXZ 40英寸4K超高清</a>
                                            <span>2015-04-20</span>
                                        </div>
                                    </li>

                                    <li>
                                        <div class="img-box">
                                            <a href="/goods/show-95.html">
                                                <img src="/upload/201504/20/thumb_201504200242250674.jpg">
                                            </a>
                                        </div>
                                        <div class="txt-box">
                                            <a href="/goods/show-95.html">惠普（HP）LaserJet 2035商用黑白激光打印机（黑色）</a>
                                            <span>2015-04-20</span>
                                        </div>
                                    </li>

                                    <li>
                                        <div class="img-box">
                                            <a href="/goods/show-94.html">
                                                <img src="/upload/201504/20/thumb_201504200239192345.jpg">
                                            </a>
                                        </div>
                                        <div class="txt-box">
                                            <a href="/goods/show-94.html">金士顿（Kingston） DataTraveler SE9 32GB 金属U盘</a>
                                            <span>2015-04-20</span>
                                        </div>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>
                    <!--/页面右边-->
                </div>
            </div>
        </div>
    </div>
</template>
```

#### 集成放大镜插件
- [插件介绍与下载](http://157.122.54.189:8998/video/show-116.html)
- 把下载好的`插件`放入网站的 `lib` 目录下, 这里专门`放置`那些`无法`用 `npm` 安装的`第三方包`

## 商品列表

#### 静态模版

```vue
<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a>
                &nbsp;&gt;&nbsp;
                <a href="/goods/40/1.html">手机数码</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper clearfix">
                <div class="screen-box">
                    <!--分类-->
                    <dl>
                        <dt>分类：</dt>
                        <dd>

                            <a href="/goods/0.html">全部</a>

                            <a class="selected" href="/goods/40.html">手机数码</a>

                            <a href="/goods/41.html">电脑办公</a>

                            <a href="/goods/42.html">影音娱乐</a>

                        </dd>
                    </dl>
                    <!--/分类-->
                </div>

            </div>
        </div>

        <div class="section">
            <div class="wrapper clearfix">
                <ul class="img-list">
                    <!--取得一个分页DataTable-->

                    <li>
                        <a href="/goods/show-91.html">
                            <div class="img-box">

                                <div class="abs-txt">推荐</div>

                                <img src="/upload/201504/20/thumb_201504200214471783.jpg">
                            </div>
                            <div class="info">
                                <h3>尼康(Nikon)D3300套机（18-55mm f/3.5-5.6G VRII）（黑色）</h3>
                                <p class="price">
                                    <b>¥3180.00</b>元</p>
                                <p>
                                    <strong>库存 10</strong>
                                    <span>市场价：
                                        <s>3150.00</s>
                                    </span>
                                </p>
                            </div>
                        </a>
                    </li>

                </ul>

                <!--页码列表-->
                <div class="page-box" style="margin:15px 0 0;">
                    <div class="digg"></div>
                </div>
                <!--/页码列表-->
            </div>

        </div>
    </div>
</template>
```

