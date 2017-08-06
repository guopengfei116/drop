# express

## 简介

#### 作用
- 为node.js开发web应用而生的框架
- 封装了各种http服务相关的处理
- 可以快速搭建一个完整功能的网站

#### 特点
- 简洁、灵活
- 沿用了原来的node核心api，比如res.end，res,write这些仍然可以使用
- 提供了各种中间件来进行功能扩展

#### 官网与资源
- [express官网](http://expressjs.com/)
- [中文官网](http://www.expressjs.com.cn/)

## 入门

#### 安装
- npm install express -S

#### webAPI
```javascript
'use strict';
const express = require('express');

// 创建一个express-web应用，
// 这个app实际上就是咱们传入http.createServer那个回调
// 只不过express对这个函数做了各种增强和封装，方便我们使用
let app = express();

// 请求处理(也叫路由)
app.get('/', (req, resp) => {
	resp.end('Hello World!');
});

// 开启http服务
app.listen(8888, () => console.log('走你!'));
```

#### 文件服务器
```javascript
'use strict';
const express = require('express');

// 创建express-web应用
let app = express();

// 放开public目录下的文件访问
app.use(express.static('public'));

// 开启http服务
app.listen(8888, () => console.log('雄起!'));
```

## express中的请求与响应对象

#### 说明
- express对处理请求的request与responese对象进行了增强
- 比如之前提取请求中查询字符串的值
    + 通常会先使用url.parse方法解析请求url，然后再使用
    + 而express已经在内部解析好了
    + 并把解析后的结果附加在了querst对象身上，拿来使用即可
- 再比如之前响应JSON数据给客户端
    + 通过会先设置`Content-Type: application/json charset=utf-8`响应头
    + 然后使用JSON.parse方法序列化数据并返回
    + 而express在responese对象身上封装了相应的方法，拿来使用即可

#### req常用属性方法
| 方法名称 | 类型 | 作用 |
|       -       |    -    |    -    |
| app | 属性 | express应用 |
| hostname | 属性 | 域名 |
| ip | 属性 | ip地址 |
| params | 属性 | 路径中的参数，根据定义方式为对象或数组 |
| path | 属性 | 路径，不包含查询字符串 |
| query | 属性 | 查询字符串解析后的对象 |
| get | 方法 | 获取指定请求头 |

#### resp
| 方法名称 | 类型 | 作用 |
|       -       |    -    |    -    |
| app | 属性 | express应用 |
| end | 方法 | 原生node提供的结束响应方法 |
| json | 方法 | 发送JSON数据 |
| jsonp | 方法 | 以JSONP方式发送数据 |
| send | 方法 | 发送各种类型的数据 |
| download | 方法 | 传送文件给客户端下载文件 |
| sendFile | 方法 | 传送文件给客户端，根据类型自动添加Content-Type |
| render | 方法 | 渲染视图模板然后发送 |
| redirect | 方法 | 请求重定向 |
| sendStatus | 方法 | 设置响应状态代码，并将其以字符串形式作为响应体的一部分发送 |
| append | 方法 | 追加响应头 |
| set | 方法 | 批量追加响应头 |

## 中间件

#### 含义
- 客户端发起http请求，后端收到后要经过一系列的处理，最后返回消息给前端
- 中间对请求的一系列分析处理可以拆分为多个逻辑单元，每个单元就可以看作是一个中间件。

#### 用来添加中间件的方法
- app.use(fn)
    + 任意请求任意路径都会经过fn中间件处理，用来添加强大功能的中间件
- app.all(pathname, fn)
    + 任意请求，指定路径，才会经过fn中间件处理，用来添加中等功能的中间件
- app.get(pathname, fn)
    + get请求，指定路径，才会经过fn中间件处理，用作普通请求处理
- app.post(pathname, fn)
    + post请求，指定路径，才会经过fn中间件处理，用作普通请求处理

#### 执行过程
- 在请求处理时，express会按照中间件添加的顺序依次执行
- 每个中间件回调会接收三个参数req,resp,next
    + req：获取请求信息的对象
    + resp：处理返回内容的对象
    + next：只有调用了才会执行下一个中间件
- 一个中间件如果没有调用resp.end这类方法，一定要调用next让下一个中间件继续处理
- 如果所有的中间件都没有调用resp.end这类方法，那么express会返回404给客户端

#### 补充
- 中间件通常指的是处理请求能力比较强的函数
- 传入use与all方法的函数通常会对请求或响应做公共统一处理，为下一个中间件提供技术支持，所以它们一般被看作是中间件
- 而传入get与post等其它方法的函数，通常只关注应该响应什么消息给客户端，所以他们一般不被看作是中间件，一般称为路由

## 商品管理改造

#### 代码更新内容
- 以express的方式开启http服务
    + 修改app.js
- 使用express内置的static中间件实现客户端对静态文件的访问
    + `app.use(express.static('./public'));`
    + 上面一句代码就实现了需求，而afterend/controller/file.js可以淘汰删掉了

#### app.js
```javascript
'use strict';
const express = require('express');
const goodsHandler = require('./afterend/controller/goods.js');

// 创建express-web应用
let app = express();

// 静态文件处理，由内置的static中间件来完成处理
app.use(express.static('./node_modules'));
app.use(express.static('./public'));
app.use(express.static('./frontend'));

// 所有/api\/goods打头的请求都会交由goodsHandlerapi这个函数处理，
// 这个函数处理了商品的获取、添加、删除、搜索等操作，属于功能比较强的中间件，
// 如果goodsHandlerapi中间件没有对请求做出相应，那么理应调用next让下一个中间件来处理
app.all(/^\/api\/goods\/.*/, goodsHandler);

// 开启http服务
app.listen(8888, () => console.log('node is running'));
```

## 路由

#### 由来
- 之前的代码已经把商品相关的处理代码独立为一个单独模块便于维护
- 但是这样做有个缺陷，无法使用诸如app.get这类封装好的好用又简洁方法
- 路由中间件就是为了解决这个问题而生的

#### 使用模型
```javascript
// 子模块goods.js
'use strict';
const express = require('express');

// 创建路由对象， 路由对象拥有添加中间件的use、all、get、post这样方法
// 因此可以把路由看作是app的一个子应用
let router = express.Router();
router.use(fn);
router.get('/api/goods/list', fn);

// 对外暴露出去
module.exports = router;
```
```javascript
// 主模块app.js
'use strict';
const express = require('express');
const goods = require('./afterend/controller/goods.js');
let app = express();

// 以/api/goods/打头的请求会交由goods中间件来处理
app.all('/api/goods/*', goods);
```

## 商品管理升级改造

#### 改造内容
- 有了路由中间件后之前编写的goods.js就可以采用新的方式进行url与method判断处理了
    + 使用use与all方法添加一些通用的请求处理
    + 使用get与post方法做具体的数据响应
- 使用了中间件后，处理请求时得到的req与resp对象就是express新增过的对象了
    + 使用req.query属性来获取解析好的查询字符串对象
    + 使用resp.set方法批量追加设置响应头
    + 使用resp.json方法返回JSON数据

#### goods.js
```javascript
'use strict';
const express = require('express');
const url = require('url');
const querystring = require('querystring');

// 路由对象
let router = express.Router();

// 数据库对象
let storeDB = require('../model/store_db.js');
let ObjectID = require('mongodb').ObjectID;

// 统一设置响应头
router.use(function(req, resp, next) {
	resp.set({
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "*"
	});
	next();
});

// 获取商品列表
router.get('/api/goods/list', function(req, resp) {
	let sortObj = null;
	if(req.query.keycode) {
		sortObj = {
			[urlObj.query.keycode]: +req.query.order
		};
	};
	storeDB(db => {
		db.collection('goods').find().sort(sortObj).toArray()
		.then(data => {
			resp.write(JSON.stringify(data));
			resp.end();
		});
	});
});

// 删除商品
router.get('/api/goods/delete', function(req, resp) {
	storeDB(db => {
		let obj = { '_id': ObjectID(req.query.id) };
		db.collection('goods').remove(obj)
		.then(() => {
			return db.collection('goods').find().toArray();
		})
		.then(data => {
			resp.write(JSON.stringify(data));
			resp.end();
		});
	});
});

// 搜索商品
router.get('/api/goods/search', function(req, resp) {
	let reg = new RegExp(req.query.keycode);
	storeDB(db => {
		db.collection('goods').find({ name: reg }).toArray()
		.then((data) => {
			resp.write(JSON.stringify(data));
			resp.end();
		});
	});
});

// 添加歌曲
router.post('/api/goods/add', function(req, resp) {
	let data = '';
	req.on('data', (chunk) => {
		data += chunk;
	});
	req.on('end', () => {
		data = querystring.parse(data);
		storeDB(db => {
			db.collection('goods').insert(data)
			.then(() => {
				return db.collection('goods').find().toArray();
			})
			.then(data => {
				resp.write(JSON.stringify(data));
				resp.end();
			});
		});
	});
});

module.exports = router;
```

## 第三方中间件

#### body-parser
- npm install body-parser -S安装
- 用于解析客户端请求体中的数据内容
- 解析好的数据通过resp.body属性获取

#### multer
- npm install multer -S安装
- 用于文件上传的处理
- 配置好之后客户端上传的文件会自动存储到指定位置

#### cookie-parser
- npm install cookie-parser -S安装
- 用于解析客户端请求头中的cookie信息
- 解析好的cookie以对象的形式存放在resp.cookies属性中

## 商品管理升级改造

#### 改造内容
- 使用body-parser中间件处理客户端提交过来的请求体数据
- 使用之后，再处理添加商品的post请求时，通过resp.body即可拿到处理后的请求数据

#### app.js变化后的代码片段
```javascript
'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const goods = require('./afterend/controller/goods.js');

// 创建应用，添加中间件
let app = express();
app.use(bodyParser.urlencoded({ extended: false }));
```

#### goods.js变化后的代码片段
```javascript
// 添加商品接口处理
router.post('/api/goods/add', function(req, resp) {
	storeDB(db => {
		db.collection('goods').insert(req.body)
		.then(() => {
			return db.collection('goods').find().toArray();
		})
		.then(data => {
			resp.json(data);
		});
	});
});
```

## 文件上传

#### html表单
```html
<form action="/file_upload" method="post" enctype="multipart/form-data">
    <input type="file" name="avatar">
    <button type="submit"></botton>
</form>
```

#### 基本实现
```javascript
const express = require('express');
const multer = require('multer');

// 上传的图片放置到/public/upload目录下
let upload = multer({dest: './public/upload'});
let app = express();

// 上次一张图片，字段名为avatar，通过rep.file来获取文件的信息
app.post('/file_upload', upload.single('avatar'), (rep, resp) => {
	console.log(rep.file);
});

app.listen(8888, () => console.log('走你'));
```

#### 文件名配置
``` javascript
const express = require('express');
const path = require('path');
const multer = require('multer');

// 动态设定地址与文件名
var storage = multer.diskStorage({
	// 上传的图片放置到/public/upload目录下
    destination: function (req, file, cb) {
        cb(null, './public/upload');
    },
    // 以时间戳的方式重新生成文件名，防止重复造成的文件覆盖丢失
    filename: function (req, file, cb) {
    	let pathObj = path.parse(file.originalname);
        cb(null, Date.now() + pathObj.ext);
    }
});
var upload = multer({ storage: storage })
let app = express();

// 上次一张图片，字段名为avatar，通过rep.file来获取文件的信息
app.post('/file_upload', upload.single('avatar'), (rep, resp) => {
	console.log(rep.file);
});

app.listen(8888, () => console.log('走你'));
```

#### file对象成员
| 方法名称 | 类型 | 作用 |
|       -       |    -    |    -    |
| fieldname | 属性 | 表单提交的字段名 |
| originalname | 属性 | 文件原有名称 |
| destination | 属性 | 保存路径 |
| filename | 属性 | 文件保存时的新名称 |
| path | 属性 | destination+filename构成的完整路径 |
| mimetype | 属性 | 文件的mime类型 |
| size | 属性 | 文件大小(字节) |
| encoding | 属性 | 文件编码 |
| buffer | 属性 | 未设置destination时文件会以buffer的形式存在内存当中 |

#### 前端异步上传文件
```html
<section>
	<form id="upload" action="/file_upload" method="post" enctype="multipart/form-data">
	    <input id="file-input" type="file" name="img">
	    <input type="text" name="name">
	    <button type="submit">上传</button>
	</form>
	<img id="preview" src="" alt="图片预览" />
</section>
<script>
	$('#upload').on('submit', function() {

		// ajax发送formData数据，需要注意processData与contentType必须配置false
		$.ajax({
			url: '/file_upload',
			type: 'post',
			data: new FormData(this),
			processData: false, // 告诉jq不要转换数据格式
			contentType: false, // 告诉jq不要修改请求内容的头信息
			success: function(data) {
				// 上传成功后进行预览
				$('#preview').attr('src', data.path);
			}
		});

		// 阻止默认的提交事件
		return false;
	});
</script>
```
