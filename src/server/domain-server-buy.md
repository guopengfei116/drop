# Buy Domain & Server

## 域名

微信开发时要求我们有自己的域名与服务器，域名需要自己注册并购买，价格不等，最便宜的1快钱，域名购买默认有效期1年，可以延长续约，续约费与购买钱不同，一般几十块钱一年，最长可续约**10年**，到期后可再续。

### 域名查询与购买

要购买域名，首先需要查询自己心仪的域名是否已经被别人注册，查询的网站有很多，下面以阿里云旗下万网使用举例说明。

打开万网首页进行搜索查询：[阿里万网-域名首页]<https://wanwang.aliyun.com/domain>

![万网首页](https://github.com/guopengfei116/drop/blob/master/img/server/wanwang-domain/ww-domain-index-search.png?raw=true)

在查询结果页面中，如果域名未被注册，那么可以加入购物车结账购买，购买时域名应选购`com、cn、top、xyz、shop、vip`这些常见域名，同时还要考虑不同域名的**首年价格**和**续费价格**，比如shop普通域名首年可能只需6块钱，但是续费一年要180。

![万网查询结果](https://github.com/guopengfei116/drop/blob/master/img/server/wanwang-domain/ww-domain-index-search-result.png?raw=true)

![万网订单确认](https://github.com/guopengfei116/drop/blob/master/img/server/wanwang-domain/ww-domain-order-confirm.png?raw=true)

### 二手域名市场

通过上面渠道购买的是一手域名，如果想以更低的价格随便买个域名玩玩，或者想购买那些已经被别人提前抢注而自己又需要的域名，那么可以到二手域名市场淘一淘。

[阿里-域名交易市场]<https://mi.aliyun.com/>

![域名交易市场-首页](https://github.com/guopengfei116/drop/blob/master/img/server/wanwang-domain/ww-domain-taobao.png?raw=true)

![域名交易市场-购物车](https://github.com/guopengfei116/drop/blob/master/img/server/wanwang-domain/ww-domain-taobao-shopping-cart.png?raw=true)

![域名交易市场-下单Step1](https://github.com/guopengfei116/drop/blob/master/img/server/wanwang-domain/ww-domain-taobao-order-step1.png?raw=true)

![域名交易市场-下单Step2](https://github.com/guopengfei116/drop/blob/master/img/server/wanwang-domain/ww-domain-taobao-order-step2.png?raw=true)

### 我的域名与到期续费

域名购买成功后，在阿里云后台管理的域名模块中可以找到它，阿里云除了PC-WEB端，还有手机APP可以下载使用。

![阿里云后台-域名入口](https://github.com/guopengfei116/drop/blob/master/img/server/wanwang-domain/aliyun-backend-domain-entry.png?raw=true)

![阿里云后台-域名列表](https://github.com/guopengfei116/drop/blob/master/img/server/wanwang-domain/aliyun-backend-domain-list.png?raw=true)

![阿里云后台-域名续费](https://github.com/guopengfei116/drop/blob/master/img/server/wanwang-domain/aliyun-backend-domain-renew.png?raw=true)

### 买卖自己的域名

在域名后台管理当中，可以将自己不想要的域名放到域名市场进行交易，交易的方式有很多，`一口价、议价`等等，交易成功后阿里会收取1%左右的手续费。

![阿里云后台-域名出售入口](https://github.com/guopengfei116/drop/blob/master/img/server/wanwang-domain/aliyun-backend-domain-sell1.png?raw=true)

![阿里云后台-域名出售Step1](https://github.com/guopengfei116/drop/blob/master/img/server/wanwang-domain/aliyun-backend-domain-sell2.png?raw=true)

![阿里云后台-域名出售Step2](https://github.com/guopengfei116/drop/blob/master/img/server/wanwang-domain/aliyun-backend-domain-sell3.png?raw=true)

![阿里云后台-域名出售Step3](https://github.com/guopengfei116/drop/blob/master/img/server/wanwang-domain/aliyun-backend-domain-sell4.png?raw=true)

### 域名解析

购买域名最重要的，就是配置域名解析，俗称DNS。当然，配置域名解析时，你得拥有自己的服务器及公网IP，这样才有意义。

![阿里云后台-域名解析入口](https://github.com/guopengfei116/drop/blob/master/img/server/wanwang-domain/aliyun-backend-DNS-entry.png?raw=true)

![阿里云后台-域名解析配置](https://github.com/guopengfei116/drop/blob/master/img/server/wanwang-domain/aliyun-backend-DNS-config.png?raw=true)

### 备案

配置完毕域名解析后，就可以使用域名访问你的网站了，但是不久，你就会发现自己的网站访问不了了。因为在国内，所有的网站都要进行备案，否则是不合法的。

![未备案网站](https://github.com/guopengfei116/drop/blob/master/img/server/wanwang-domain/aliyun-backend-not-filing.png?raw=true)

![阿里云-备案入口](https://github.com/guopengfei116/drop/blob/master/img/server/wanwang-domain/aliyun-backend-filing-entry.png?raw=true)

## 服务器

有了域名，还需要一台拥有公网的服务器，可以任意选择一家公司的云服务器进行购买，比如阿里云、腾讯云、百度云等等，它们会不定时发布优惠活动，有意购买的同学可以多关注一下。

除了购买云服务器，还可以在家把自己电脑当作服务器使用，但是需要向网络运营商索要一个唯一公网IP，这样才能让外界访问你的电脑。

### 云服务器购买

这里选择购买阿里云服务器作为举例，购买的云服务器不建议安装Window操作系统，因为含有图形界面，耗费内存和性能，建议选择无图形界面版的Linux，具体发行版本根据自己喜爱而定，这里选择CentoOS7。

购买时，可以根据需要定制服务器配置，也可以直接选择定制好的服务器套餐购买。

[云服务器ECS]<https://www.aliyun.com/product/ecs>

![阿里云-服务器ECS购买入口](https://github.com/guopengfei116/drop/blob/master/img/server/aliyun-server/aliyun-server-buy-entry.png?raw=true)

![阿里云-服务器套餐购买入口](https://github.com/guopengfei116/drop/blob/master/img/server/aliyun-server/aliyun-server-buy-combo.png?raw=true)

### 学生优惠

如果是学生的话还有专属优惠价，比如阿里云的云翼计划，不过现在阿里云新人只要满足24周岁以下，默认就是学生，还是很厚道的。

[阿里云翼计划]<https://promotion.aliyun.com/ntms/act/campus2018.html>

![阿里云-翼计划首页](https://github.com/guopengfei116/drop/blob/master/img/server/aliyun-server/aliyun-server-buy-student-discounts.png?raw=true)

### 推广优惠

如果不是学生，也可以走推广优惠，因为下面的推广链接是本人的，所以会有一定的返现（此刻露出邪恶的微笑），当然如果你追求性价比，购买后也可以在下方留言联系我把返现转给你，总之，不能便宜了商家（更加邪恶的微笑）。

[推广链接]<https://promotion.aliyun.com/ntms/yunparter/invite.html?userCode=qzgiyp6v>

![阿里云-推广链接页面](https://github.com/guopengfei116/drop/blob/master/img/server/aliyun-server/aliyun-server-buy-promotion.png?raw=true)
