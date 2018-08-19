## 微信接口配置

拥有服务器后，需要与微信进行认证才能与微信服务器进行通信开发。认证方式是，我们按照微信公众号的要求编写一个接口，然后在公众号web页面中找到`服务器配置`，配置接口url与一个自定义token，让微信调用我们的接口完成认证。

1. clone服务器仓库
2. 使用NodeJS编写认证接口（接口使用任何语言实现都可以）
3. 在服务器上拉取代码并运行
4. 在微信公众平台上进行接口配置，认证测试

```js
const http = require('http');
const url = require('url');
const crypto = require('crypto');

// 服务器配置
const serverConfig = {
    port: 8866
};

// 微信公众测试号
const wxAppInfo = {
    appID: 'wx6526e8044b491ab8',
    appsecret: 'e43f21c9b5c1ea00b435b91102eb04b7',
    token: 'gpf_wx_token'
};

// 这个接口是供wx服务器认证时使用的，由wx那边调用
const server = http.createServer(function(req, rep) {

    // 设置响应的数据与编码格式，这里返回一个普通文本即可
    rep.setHeader('Content-Type', "text/plain;charset=utf-8");

    // 路由
    if(req.method == 'GET') {
        wxAuthentication(req, rep);
    }
    // 默认返回
    else {
        rep.write("你不是微信");
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
 * 微信server认证:
 * 1 将 token timestamp nonce 三个参数进行字典序排序
 * 2 将 三个参数字符串拼接成一个字符串进行sha1加密
 * 3 将加密后的字符串与signature进行进行对比，如果相同，则返回echostr参数
 * 4 在公众号web页面配置接口url与token，微信就会调用接口进行验证
*/
function wxAuthentication(req, rep) {
    let urlInfo = url.parse(req.url, true);
    let urlQuery = urlInfo.query;

    console.log(urlQuery);
    
    // 接口微信传递的4个参数
    let signature = urlQuery.signature;
    let timestamp = urlQuery.timestamp;
    let nonce = urlQuery.nonce;
    let echostr = urlQuery.echostr;

    // 将 token timestamp nonce 三个参数进行字典序排序并用sha1加密
    let str = [wxAppInfo.token, timestamp, nonce].sort().join('');
    let strSha1 = crypto.createHash('sha1').update(str).digest('hex');

    console.log(`自己加密后的字符串为：${strSha1}`);
    console.log(`微信传入的加密字符串为：${signature}`);
    console.log(`两者比较结果为：${signature == strSha1}`);
    
    // 签名对比，相同则按照微信要求返回echostr参数值
    if(signature == strSha1) {
        rep.write(echostr);
    }else {
        rep.write("你不是微信");
    }

    rep.end();
}
```

- - - - - - - - - - - - - - - - - - - - - - - - - - - - -

## 接口权限与返回码说明

- [公众号接口调用权限说明]<https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1433401084>
- [公众号接口返回码说明]<https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1433747234>
- [公众号接口域名说明]<https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1465199793_BqlKA>

- - - - - - - - - - - - - - - - - - - - - - - - - - - - -

## 获取access_token

> access_token是公众号的全局唯一接口调用凭据，公众号调用各接口时都需使用access_token。开发者需要进行妥善保存。access_token的存储至少要保留512个字符空间。access_token的有效期目前为2个小时，需定时刷新，重复获取将导致上次获取的access_token失效。

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

**token接口**

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

- - - - - - - - - - - - - - - - - - - - - - - - - - - - -

## xml2j

这是一个XML解析类库，当我们的服务器认证通过，access_token能够获取，就可以正式进入公众号开发了。我们主要的工作是编写后端与微信的服务器进行通信，在通信当中，微信传给我们的数据格式为xml，也要求我们返回xml，所以先简单了解一个xml解析的类库。

**XML转对象**

```js
let parseString = require("xml2js").parseString;

let xml = "<xml><ToUserName><![CDATA[toUser]]></ToUserName></xml>";

parseString(xml, {explicitArray : false, trim: true}, (err, result) => {
    console.log(err);
    console.log(result);
});
```

**对象转XML**

```js
let xml2js = require('xml2js');

// 数据
let obj = { name: "pgf", age: 16 };

// 转换
let builder = new xml2js.Builder();
let xml = builder.buildObject(obj);

console.log(xml);
```

**返回微信xml的方式**

因为xml2j类库转换后的xml不符合微信的要求，所以我们封装一个方法，动态拼接xml字符串，以满足微信接口通信的要求。

```js
// 模拟转换数据为xml，然后返回给微信
function getXml(data, backTime){
    var backXML = `
            <xml>
                <ToUserName><![CDATA[${data.FromUserName}]]></ToUserName>
                <FromUserName><![CDATA[${data.ToUserName}]]></FromUserName>
                <CreateTime>${backTime}</CreateTime>
                <MsgType><![CDATA[text]]></MsgType>
                <Content><![CDATA[${data.content}]]></Content>
            </xml>
        `
    return backXML;
};

let wxXML = getXml({
    FromUserName: 'gpf', 
    ToUserName: 'huangjiahui', 
    backTime: Date.now(), 
    content: "感谢这么晚的陪伴"
});

console.log(wxXML);
```

- - - - - - - - - - - - - - - - - - - - - - - - - - - - -

## 消息处理案例

- [消息管理官方文档]<https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140453>

**Node服务**

```js
const http = require('http');
const url = require('url');
const crypto = require('crypto');
const messageHandler = require('./message');

const serverConfig = {
    port: 8866
};

const server = http.createServer(function(req, rep) {

    // 设置响应数据的编码格式
    rep.setHeader('Content-Type', "text/xml;charset=utf-8");

    if(req.method == 'POST') {
        messageHandler(req, rep);
    }
    else {
        // 默认返回
        rep.write(JSON.stringify({msg: '数据不存在'}));
        rep.end();
    }

});

server.listen(serverConfig.port, () => console.log(`Node服务已启动，监听端口为${serverConfig.port}`) );
server.on('close', () => console.log(`Node${serverConfig.port}端口服务已终止`) );
```

**消息处理**

```js
let xml2js = require("xml2js");
let parseString = xml2js.parseString;

export default function(req, rep) {
    let xml = "";

    req.on("data", chunk => xml += chunk);

    req.on("end", () => {
        parseString(xml, {explicitArray : false, trim: true}, (err, data) => {
            if(err) {
                console.log(err);
            }else {
                // 处理接收到的消息
                let handler = getHandler(data.xml.MsgType);
                let sendData = handler(data);

                // 返回消息
                let sendXML = getXml(sendData, Date.now());
                req.sendData(sendXML);
            }
        })
    })
}

// 返回的xml模板
function getXml(data, backTime){
    var backXML = `
            <xml>
                <ToUserName><![CDATA[${data.FromUserName}]]></ToUserName>
                <FromUserName><![CDATA[${data.ToUserName}]]></FromUserName>
                <CreateTime>${backTime}</CreateTime>
                <MsgType><![CDATA[text]]></MsgType>
                <Content><![CDATA[${data.content}]]></Content>
            </xml>
        `
    return backXML;
};

// 根据数据类型返回对应处理器
function getHandler(type) {
    if(type == 'event') {
        return eventHandler;
    }else if(type == 'text') {
        return textHandler;
    }else if(type == 'image') {
        return imageHandler;
    }else if(type == 'voice') {
        return voiceHandler;
    }else if(type == 'video') {
        return videoHandler;
    }else if(type == 'shortvideo') {
        return videoHandler;
    }else if(type == 'location') {
        return videoHandler;
    }else if(type == 'link') {
        return videoHandler;
    }
}

function eventHandler() {

}

function textHandler() {
    
}

function imageHandler() {
    
}

function voiceHandler() {
    
}

function videoHandler() {
    
}

function shortvideoHandler() {
    
}

function locationHandler() {
    
}

function linkHandler() {
    
}
```
