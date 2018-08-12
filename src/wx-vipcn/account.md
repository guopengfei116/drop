# 公众号申请

**申请公众账户**

通过微信公众平台注册一个账户，[公众平台地址]<https://mp.weixin.qq.com/>，可使用自己的qq或者微信注册，注册时会让你选择一个类型，其中`订阅号`和`服务号`都属于公众号，区别是订阅号针对个人用户使用，服务号针对企业用户使用，服务号注册时需要企业证书，并且可以调用支付接口，我们这里只能选择申请订阅号。

- ![订阅号与服务号选取与区别介绍](https://github.com/guopengfei116/drop/blob/master/img/wx-vipcn/register_type_select.png?raw=true)

- ![公众号信息设置](https://github.com/guopengfei116/drop/blob/master/img/wx-vipcn/register_info_setting.png?raw=true)

- ![公众号后台管理，可视化操作](https://github.com/guopengfei116/drop/blob/master/img/wx-vipcn/visual_operation.png?raw=true)

**成为开发者**

默认情况下，运营人员通过后台管理页面即可完成进行粉丝管理，公众号各种功能的配置。但是对于开发者而言，可以通过编码调用api实现同样的功能，还可以融入自身的业务。

- ![开发者基本配置入口](https://github.com/guopengfei116/drop/blob/master/img/wx-vipcn/base_settings_entry.png?raw=true)

- ![成为开发者](https://github.com/guopengfei116/drop/blob/master/img/wx-vipcn/base_settings_developer.png?raw=true)

- ![开发者ID与密钥](https://github.com/guopengfei116/drop/blob/master/img/wx-vipcn/base_settings_id_secret.png?raw=true)

- ![扫一扫验证身份](https://github.com/guopengfei116/drop/blob/master/img/wx-vipcn/base_settings_secret_sys.png?raw=true)

**配置URL白名单**

成为开发者后，要调用公众api，需要附件一个access_token信息，这个token也需要调用api获取，但是为了保证安全性，需要配置能够调用该api的服务器IP，只有该IP下的服务器才能调用接口获取token。

- ![token获取IP白名单](https://github.com/guopengfei116/drop/blob/master/img/wx-vipcn/base_settings_token_ip.png?raw=true)

- [IP白名单官方说明]<https://mp.weixin.qq.com/cgi-bin/announce?action=getannouncement&key=1495617578&version=1&lang=zh_CN&platform=2>

**服务器配置**

- [服务器配置官方指南]<https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421135319>

**设置JS接口域名**

要调用这些api，微信要求我们配置自己的服务器与域名，以保证api调用的安全性。

- ![配置JS接口安全域名](https://github.com/guopengfei116/drop/blob/master/img/wx-vipcn/visual_operation.png?raw=true)

- - - - - - - - - - - - - - - - - - - - - - - - - - - -

## 开发者测试账号

- [测试账户使用参考文档]<https://blog.csdn.net/hzw2312/article/details/69664485>

### 接口配置信息 - 简化版的服务器配置

- [接口配置信息官方指南]<https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421135319>