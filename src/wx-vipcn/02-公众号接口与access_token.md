# 微信公众平台接口文档

[官方接口文档首页](https://mp.weixin.qq.com/wiki)

> 1. 微信提供的每个接口都有调用频次的限制。
> 2. 每个接口调用时都需要access_token凭证，这个凭证可通过公众号appID与appSecret获取。
> 3. access_token凭证有效期为2小时，过期后需要重新获取。
> 4. 接口调用必须使用80端口。
> 5. 如果接口需要区分用户，可以使用OpenID。
> 6. 如果多个公众号或应用要用户互通，可以把它们绑定在一个开放平台账户下，然后它们对同一个用户的UnionID就会相同。

## 服务方式
 
### 消息

消息会话是公众号与用户交互的基础，目前主要有如下几类消息类型，分别对应不同场景。

> 1. 群发消息：订阅号每天1次，服务号每月4次
> 2. 自动回复：粉丝发送1条消息，微信服务器收到消息，然后转发给我们服务器，我们返回1条消息给微信，微信再响应给粉丝。
> 3. 客服消息：粉丝发送1条消息，48小时内我们可以回复粉丝任意多条消息，主要用于客服场景。
> 4. 模板消息：粉丝发送1条消息，我们用提前设置好的内容模板进行回复。

### 内嵌H5页面

复杂的业务场景需要通过网页形式提示服务，比如新闻预览、商品买卖等等，这时可能需要以下东东：

> 1. 获取用户信息：OpenID无需用户同意，基本信息需要用户同意
> 2. 调用微信API：使用微信提供的JS-SDK工具包，在H5页面调用微信功能

## 开发规范

这些规范都是微信的要求，违反严重可能被封号，看看就好。

### 用户数据

1. 获取用户信息必须先获得用户同意
2. 获取到的用户信息要保密，不要随意传播

### 其它

1. 不要打点跟踪用户行为
2. 不要把网页重定向到不相干的地方
3. 内容合法，不违法社会公德
4. 与腾讯无关，不要扯近乎

## 能力与接口权限

[公众号接口调用权限官方文档](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1433401084)

未认证的订阅号与服务号，只能调用除用户相关的少许接口。

订阅号与服务号可以调用用户相关接口，但是因为服务号定位与企业，所以可调用的接口更多，主要是多了开店与支付相关的接口。

## 接口请求结果状态码

[公众号接口状态码含义官方查阅文档](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1433747234)

调用微信接口时，可能获得正确或错误的状态码，开发者可以根据状态码调试接口，排查错误。

## 获取access_token

> 1. access_token是公众号的全局唯一接口调用凭据，每个接口都需要使用它。
> 2. 所以调用公众号接口的第一步就是获取access_token，这需要用到appID和appSecret，然后调用一个独立接口获得。
> 3. 每天只能获取2000次access_token，且每个access_token有效期为2个小时，所以每获取一次开发者都需要进行妥善保存。
> 4. 存储access_token至少需要512个字符空间，每次获取到新的access_token后旧的会自动失效。

### 接口文档

我们已经了解到access_token的作用和重要性了，现在我们要尝试获取它。

- 请求方式：GET
- 请求地址：/cgi-bin/token
- 请求参数

| 参数 | 是否必填 | 描述 |
|:-----|:--------|:-----|
| grant_type | 是 | 写固定值client_credential |
| appid | 是 | 公众号ID |
| secret | 是 | 公众号凭证密钥 |

- 响应数据： JSON
- 数据示例

```json
{
    // 凭证
    "access_token": "ACCESS_TOKEN",
    // 有效时间，单位：秒
    "expires_in":  7200
}
```

### 编码

access_token的有效期目前为2个小时，需定时刷新，重复获取将导致上次获取的access_token失效，另外每天access_token的获取次数还有限制，目前是每天2000次，所以我们应该编写一个通用接口，专门负责access_token的获取与维护。

```js
const http = require('http');
const url = require('url');

// 服务器配置
const serverConfig = {
    port: 8867
};

// token缓存，因为token每天只能获取2000次，而且获取了新的旧的就会失效，所以要缓存
const tokenCache = {
    access_token: null,
    update_time: Date.now(),
    expires_in: 7200
};

// 微信接口所需参数
const wxParams = {
    appID: 'wx6526e8044b491ab8',
    appsecret: 'e43f21c9b5c1ea00b435b91102eb04b7',
    grantType: 'client_credential'
};

// wx接口
const wxAPI = {
    domain: 'https://api.weixin.qq.com',
    path: `/cgi-bin/token?grant_type=${wxParams.grantType}&appid=${wxParams.appID}&secret=${wxParams.appsecret}`
};

// 这个接口是供我们自己使用的，当我们需要access-token的时候调用
const server = http.createServer(function(req, rep) {

    // 编码与跨域设置
    rep.writeHead(200, {
        "Content-Type": "application/json;charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*"
    });

    // 路由
    if(req.method == 'GET') {
        wxAccessToken(req, rep);
    }
    // 默认返回
    else {
        rep.write(JSON.stringify({msg: '数据不存在'}));
        rep.end();
    }

})
.listen(serverConfig.port, () => {
    console.log(`Node服务已启动，监听端口为${serverConfig.port}`)
})
.on('close', () => {
    console.log(`Node${serverConfig.port}端口服务已终止`)
});

/**
 * 负责请求微信的接口获取token，返回一个Promise对象
*/
function getAccessToken() {
    return new Promise(function(resolve, reject) {

        // 请求微信接口
        http.request({
            hostname: wxAPI.domain,
            path: wxAPI.path,
            callback: rep => {
                let result = "";
                rep.on("data", chunk => result += chunk);
                res.on('end', () => {
                    try {
                        result = JSON.parse(result);
                        console.log("微信token接口调用成功，并且解析成功");
                        resolve(result);
                    } catch (e) {
                        console.log("微信token接口调用成功，但是解析失败");
                        reject(e);
                    }
                });
            }
        }).on('error', (e) => {
            console.error(`微信token接口调用失败: ${e.message}`);
            reject(e);
        });
    });
}

/**
 * 处理token获取的请求，优先有缓存里取，如果没有则通过getAccessToken方法调用微信接口取
*/
async function wxAccessToken(req, rep) {
    let repData = { code: 200, accessToken: null };

    // 有缓存，保证有值，并且时间有效
    if((Date.now() - tokenCache.update_time) / 1000 < tokenCache.expires_in && tokenCache.access_token) {
        repData.accessToken = tokenCache.access_token;
    }
    // 无缓存，得到微信新的token，同时更新缓存数据
    else {
        try{
            let result = await getAccessToken();
            Object.assign(tokenCache, result, { update_time: Date.now() });
            repData.accessToken = tokenCache.access_token;
        } catch(e) {
            repData.code = 500;
            console.log(e.message);
        }
    }

    rep.write(JSON.stringify(repData));
    rep.end();
}
```
