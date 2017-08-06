# socket

## 简介
- 一个网络通信协议
- 使用该协议前后端可以实现双向通讯
- html5提供了响应的api可以完成该通信

## 后端使用
```javascript
const express = require('express');
const socketIO = require(socket.io);

let app = express();
let server = app.listen(8888, () => console.log('走你'));

let io = socketIO.listen(server);
io.sockets.on('conection', function(socket) {
	// emit用来向客户端发送自定义消息
	socket.emit('news', { hello: 'world' });
	// on用来监听来自客户端的消息
	socket.on('haha', function(data) {
		console.log('收到客户端发来的haha消息');
	});
	// 当用户离开时，自动触发该事件
	socket.on('disconnect', function () {
	   io.sockets.emit('拜拜');
	});
});
```

## 前端使用
