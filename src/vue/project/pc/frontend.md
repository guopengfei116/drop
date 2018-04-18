## 准备工作

#### 导入全局样式
- 把已经写好的网站样式放入到 `src/css` 目录中
- 在 `main.js` 中进行导入

#### 加入图片资源
- 把准备好的图片放入到 `src/img` 目录中

#### 加入JQ插件资源
- 把准备好的JQ插件放入到 `src/lib` 目录中
- 说明: 这些插件无法通过npm安装, 都是在网上进行搜索然后下载得到的

## 组件结构设计

#### 创建组件

#### 配置路由

## 登陆

#### 功能分析

#### 功能实现

## 登陆权限校验

#### 业务逻辑分析

#### 功能实现

## 商城主体结构

#### 功能分析

#### 头部组件实现
- 编写 `src/component/store/common/Header.vue`

```vue
```

#### 底部组件实现
- 编写 `src/component/store/common/Footer.vue`

```vue
```

## 商品列表

#### 功能分析

#### ProductTop实现
- 该组件由`三块功能`构成, 他们所需的数据来自`同一接口`, 所以先拿到`数据`, 然后依次编写`模版`
- 其中左侧的`分类列表`数据需要`递归渲染`, 所以`创建`一个对应的递归组件 `SubCates.vue`

```vue
<script>
    import SubCates from './SubCates'

    export default {
        data() {
            return {
                all: {
                    catelist: [],    // 分类列表数据
                    sliderlist: [],  // 轮播图列表数据
                    toplist: [],     // 置顶商品列表数据
                }
            }
        },

        methods: {
            // 获取全部数据
            getData() {
                this.$http.get(this.$api.goodsTop).then(res => {
                    this.all = res.data.message;
                });
            }
        },

        created() {
            this.getData();
        },

        components: {
            appCategory,
        }
    };
</script>
```

##### 左侧分类列表

```vue
<div class="banner-nav">
    <ul>
        <li v-for="item in all.catelist" :key="item.id">
            <h3>
                <i class="iconfont icon-arrow-right"></i>
                <!-- 顶级分类 -->
                <span>{{ item.title }}</span>
                <!-- 子级分类 -->
                <p>
                    <span v-for="subitem in item.subcates" :key="subitem.id">{{ subitem.title }}</span>
                </p>
            </h3>

            <div class="item-box">
                <dl>
                    <!-- 顶级分类 -->
                    <dt>
                        <a href="/goods/40.html">{{ item.title }}</a>
                    </dt>
                    <!-- 子级分类 -->
                    <dd>
                        <!-- 这里遍历到的subitem可能还会有自己的subcates, 并且可能无限 -->
                        <!-- <a v-for="subitem in item.subcates" :key="subitem.id" href="/goods/43.html">{{ subitem.title }}</a> -->
                        <!-- 如果有无限层, 我们只能尝试封装一个单独的组件, 因为只有组件才能递归调用自己, 普通元素不行 -->
                        <!-- 我们把起始的一层列表数据传递过去, 让它渲染 -->
                        <!-- 然后该组件还会判断每一层数据是否有下一级, 如果有那么调用自己继续渲染, 直接没有下一级 -->
                        <app-category :list="item.subcates"></app-category>
                    </dd>
                </dl>
            </div>
        </li>
    </ul>
</div>
```

##### 中间轮播图

```vue
<div class="banner-img">
    <el-carousel trigger="click" height="341px">
          <el-carousel-item v-for="item in all.sliderlist" :key="item.id">
            <img style="height: 100%;" :src="item.img_url" draggable="false">
          </el-carousel-item>
    </el-carousel>
</div>
```

##### 右侧置顶列表

```vue
<ul class="side-img-list">
    <li v-for="(item, index) in all.toplist" :key="item.id">
        <div class="img-box">
            <label>{{ index + 1 }}</label>
            <img :src="item.img_url">
        </div>
        <div class="txt-box">
            <router-link :to="{ name: 'goodsDetail', params: { id: item.id } }">{{ item.title }}</router-link>
            <span>{{ item.add_time }}</span>
        </div>
    </li>
</ul>
```

#### ProductMain实现

```vue
<template>
    <div>
        <!-- 商品按组展示 -->
        <div class="section" v-for="item in goodsList" :key="item.level1cateid">

            <!-- 分类标题 -->
            <div class="main-tit">
                <h2>{{ item.catetitle }}</h2>
                <p>
                    <router-link v-for="subitem in item.level2catelist" :key="subitem.subcateid" to="">
                        {{ subitem.subcatetitle }}
                    </router-link>
                    <router-link to="">更多<i>+</i></router-link>
                </p>
            </div>

            <!-- 商品列表 -->
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">
                        <li v-for="subitem in item.datas">
                            <router-link :to="{ name: 'goodsDetail', params: { id: subitem.artID } }">
                                <div class="img-box">
                                    <img :src="subitem.img_url">
                                </div>
                                <div class="info">
                                    <h3>{{ subitem.artTitle }}</h3>
                                    <p class="price">
                                        <b>{{ subitem.sell_price }}</b>元</p>
                                    <p>
                                        <strong>库存 {{ subitem.stock_quantity }}</strong>
                                        <span>市场价：
                                            <s>{{ subitem.market_price }}</s>
                                        </span>
                                    </p>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                goodsList: []
            }
        },

        methods: {
            // 获取全部数据
            getData() {
                this.$http.get(this.$api.goodsContent).then(res => {
                    this.goodsList = res.data.message;
                });
            }
        },

        created() {
            this.getData();
        },
    };
</script>
```

## 商品详情

#### 功能分析

#### 放大镜插件
- [插件介绍与下载](http://157.122.54.189:8998/video/show-116.html)
- 把下载好的`插件`放入网站的 `lib` 目录下, 这里专门`放置`那些`无法`用 `npm` 安装的`第三方包`

```vue
<template>
    <div class="magnifier" id="magnifier1">
        <div class="magnifier-container">
            <div class="images-cover"></div>
            <!--当前图片显示容器-->
            <div class="move-view"></div>
            <!--跟随鼠标移动的盒子-->
        </div>
        <div class="magnifier-assembly">
            <div class="magnifier-btn">
                <span class="magnifier-btn-left">&lt;</span>
                <span class="magnifier-btn-right">&gt;</span>
            </div>
            <!--按钮组-->
            <div class="magnifier-line">
                <ul class="clearfix animation03">
                    <li v-for="item in imglist" :key="item.id">
                        <div class="small-img">
                            <img :src="item.original_path" />
                        </div>
                    </li>
                </ul>
            </div>
            <!--缩略图-->
        </div>
        <div class="magnifier-view"></div>
        <!--经过放大的图片显示容器-->
    </div>
</template>

<script>
     // 导入jQuery放大镜插件, 该插件依赖与jQuery变量, 所以我们在它的源代码里import了一下
    import '@/lib/imgzoom/css/magnifier.css';
    import '@/lib/imgzoom/js/magnifier.js';

    // 导入$, 接下来要调用插件方法
    import $ from 'jquery';

    export default {
        props: ['imglist'],

        // 监听imglist的变化, 每次变化都要重新的初始化放大镜插件
        // 官方文档: https://cn.vuejs.org/v2/api/#vm-nextTick
        watch: {
            imglist() {
                this.$nextTick(function () {
                    var _magnifier = $().imgzoon({
                        magnifier : "#magnifier1",//最外层的大容器
                        width : 370,//承载容器宽
                        height : 370,//承载容器高
                        moveWidth : null,//如果设置了移动盒子的宽度，则不计算缩放比例
                        zoom : 5//缩放比例
                    });
                });
            }
        }
    };
</script>
```

#### 商品信息

```vue
<template>
    <!-- 商品信息 -->
    <div class="goods-spec">
        <h1>{{ goodsinfo.title }}</h1>
        <p class="subtitle">{{ goodsinfo.sub_title }}</p>
        <div class="spec-box">
            <dl>
                <dt>货号</dt>
                <dd id="commodityGoodsNo">{{ goodsinfo.goods_no }}</dd>
            </dl>
            <dl>
                <dt>市场价</dt>
                <dd>
                    <s id="commodityMarketPrice">¥{{ goodsinfo.market_price }}</s>
                </dd>
            </dl>
            <dl>
                <dt>销售价</dt>
                <dd>
                    <em class="price" id="commoditySellPrice">¥{{ goodsinfo.sell_price }}</em>
                </dd>
            </dl>
        </div>

        <div class="spec-box">
            <dl>
                <dt>购买数量</dt>
                <dd>
                    <div class="stock-box">
                        <!-- elementUI的计数器组件: max最大数量为库存, v-model关联一个数据 -->
                        <el-input-number v-model="goodsCount"
                            :min="1" :max="goodsinfo.stock_quantity" size="small" label="购买数量">
                        </el-input-number>
                    </div>
                    <span class="stock-txt">
                            <span>库存</span>
                    <em id="commodityStockNum">{{ goodsinfo.stock_quantity }}</em>件
                    </span>
                </dd>
            </dl>
            <dl>
                <dd>
                    <div class="btn-buy" id="buyButton">
                        <button class="buy">立即购买</button>
                        <button class="add" @click="addShopcart">加入购物车</button>
                    </div>
                </dd>
            </dl>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['goodsinfo'],

        data() {
            return {
                // 关联+-按钮的购买数量
                goodsCount: 1
            }
        },

        methods: {
            // 加入购物车
            // 通过commit方法累加商品购买记录
            addShopcart() {
                this.$store.commit('addShopcartData', {
                    id: this.$route.params.id,
                    val: this.goodsCount
                });
            }
        },

        watch: {
            // url发生变化, 重置商品数量
            $route() {
                this.goodsCount = 1;
            }
        }
    };
</script>
```

#### 右侧特效列表

```vue
<template>
    <ul class="side-img-list">
        <li v-for="(item, index) in list" :key="item.id">
            <div class="img-box">
                <label>{{ index + 1 }}</label>
                <img :src="item.img_url">
            </div>
            <div class="txt-box">
                <router-link :to="{ name: 'goodsDetail', params: { id: item.id } }">{{ item.title }}</router-link>
                <span>{{ item.add_time }}</span>
            </div>
        </li>
    </ul>
</template>

<script>
    export default {
        props: ['list']
    }
</script>
```

#### 评论

```vue
<template>
    <!-- 对所有页面开发的公共评论组件 -->
    <div class="comment-box">

        <!--发表评论, 监听提交事件, 并阻止默认的浏览器刷新提交, 转为ajax手动提交 -->
        <form id="commentForm" name="commentForm" class="form-box" @submit.prevent="subComment">
            <div class="avatar-box">
                <i class="iconfont icon-user-full"></i>
            </div>
            <div class="conn-box">
                <div class="editor">
                    <textarea v-model="commentContent" id="txtContent" name="txtContent" sucmsg=" "
                        datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                    <span class="Validform_checktip"></span>
                </div>
                <div class="subcon">
                    <button id="btnSubmit" name="submit" type="submit" class="submit">提交评论</button>
                    <span class="Validform_checktip"></span>
                </div>
            </div>
        </form>

        <!-- 评论列表 -->
        <ul id="commentList" class="list-box">
            <!-- 没有评论时的提示信息 -->
            <p v-if="!commentList.length" style="margin:5px 0 15px 69px;line-height:42px;text-align:center;border:1px solid #f7f7f7;">
                暂无评论，快来抢沙发吧！
            </p>

            <!-- 具体评论 -->
            <li v-for="(item, i) in commentList" :key="i">
                <div class="avatar-box">
                    <i class="iconfont icon-user-full"></i>
                </div>
                <div class="inner-box">
                    <div class="info">
                        <span>{{ item.user_name }}</span>
                        <span>{{ item.user_ip }}</span>
                        <span>{{ item.add_time | date }}</span>
                    </div>
                    <p>{{ item.content }}</p>
                </div>
            </li>
        </ul>

        <!--放置页码-->
        <div class="page-box" style="margin:5px 0 0 62px">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="query.pageIndex"
                :page-sizes="[4, 6, 8, 10]"
                :page-size="query.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalcount" background>
            </el-pagination>
        </div>
        <!--/放置页码-->
    </div>
</template>

<script>
    export default {
        // 获取评论列表时所需的 模块名称 与 文字ID
        props: ['tablename', 'artID'],

        data() {
            return {
                // 关联表单的评论文本
                commentContent: '',

                // 评论列表数据
                commentList: [],

                // 获取评论列表时所需的查询字符串, 将来通过elementUI的分页组件来动态控制它们的值
                query: {
                    pageIndex: 1,
                    pageSize: 4
                },

                // 评论总数
                totalcount: 0
            }
        },

        methods: {
            // 修改页码
            handleCurrentChange(page) {
                this.query.pageIndex = page;
                this.getCommentList();
            },

            // 修改每页数量
            handleSizeChange(size) {
                this.query.pageSize = size;
                this.getCommentList();
            },

            // 获取评论列表
            getCommentList() {
                // 记得加上参数与查询, 其中get的第二个参数为一个配置对象, 可以设置请求头等信息
                this.$http
                .get(
                    this.$api.commentList + this.tablename + '/' + this.artID,
                    { params: this.query }
                )
                .then(rsp => {
                    this.commentList = rsp.data.message;
                    this.totalcount = rsp.data.totalcount;
                });
            },

            // 提交评论
            subComment() {
                // 记得加上参数与查询, 其中post的第二个参数为提交的数据
                this.$http.post(
                    this.$api.comment + this.tablename + '/' + this.artID,
                    { commenttxt: this.commentContent }
                ).then(rsp => {

                    // 评论成功的提示
                    this.$message({
                        message: '恭喜你，发表成功',
                        type: 'success'
                    });

                    // 评论成功后应该更新整个评论列表, 我们这里直接手动创建一条评论对象,
                    // unshift到评论列表的最前面, 这样省去了一个接口的请求
                    this.commentList.unshift({
                        user_name: '匿名用户',
                        user_ip: '127.0.0.1',
                        add_time: new Date(),
                        content: this.commentContent
                    });
                    this.commentContent = '';
                });
            }
        },

        watch: {
            // 监听ID的变化, 从而更新不同ID下的评论列表
            artID() {
                this.getCommentList();
            }
        },

        created() {
            this.getCommentList();
        }
    };
</script>
```

#### 商品详情

```vue
<template>
    <div>
        <!-- 导航栏 -->
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <router-link :to="{ name: 'goodsList' }">首页</router-link>&gt;
                <router-link to="">商品详情</router-link>
            </div>
        </div>

        <!-- 商品详情 -->
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">

                    <!--页面左边-->
                    <div class="left-925">

                        <!-- 商品图片预览与详细信息 -->
                        <div class="goods-box clearfix">
                            <div class="pic-box">
                                <detail-img :imglist="all.imglist"></detail-img>
                            </div>
                            <detail-info :goodsinfo="all.goodsinfo"></detail-info>
                        </div>

                         <!-- 商品介绍与评论 -->
                        <detail-main></detail-main>
                    </div>

                    <!--页面右边-->
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <app-slide :list="all.hotgoodslist"></app-slide>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import AppSlide from './common/Slide'
    import DetailImg from './common/DetailImg'
    import DetailInfo from './common/DetailInfo'
    import DetailMain from './common/DetailMain'

    export default {
        data() {
            return {
                id: this.$route.params.id,
                all: {
                    goodsinfo: [],        // 商品信息
                    imglist: [],               // 轮播图列表
                    hotgoodslist: [],    // 热销列表
                }
            }
        },

        methods: {
            // 获取全部数据
            getData() {
                this.$http.get(this.$api.goodsDetail + this.id).then(res => {
                    this.all = res.data.message;
                });
            }
        },

        created() {
            this.getData();
        },

        // 如果是同一个路由规则下批量的url发生变化, 那么不会触发路由页面的更换
        // 但是$route对象会记录新的url参数等信息, 我们可以监听$route对象, 来得知同一个路由规则下的url变化
        watch: {
            $route() {
                this.id = this.$route.params.id;  // 修改为最新的id
                this.getData();                               // 重新请求数据更新页面内容
            }
        },

        components: {
            AppSlide,
            DetailImg,
            DetailInfo,
            DetailMain
        }
    };
</script>
```

## 购物车

#### 功能分析

#### 列表展示

#### 数量加减与删除

#### 总数总价

#### 全选按钮

#### 立即结算

## 收货信息

#### 功能分析

#### 商品列表渲染

#### 总数总价

#### 表单提交

## 支付界面

####  功能分析

####  功能实现

## 支付

####  功能分析

####  功能实现

## 支付成功

####  功能分析

####  功能实现


























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




