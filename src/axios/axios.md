## axios
- 一个前后端通用的http请求库
- 在浏览器环境中使用XMLHttpRequest对象, Node中使用http模块

#### 入门
- 在浏览器环境中导入库, 然后使用库暴露的全局变量axios发送请求

###### get请求
- 成功回调接收一个`response`对象, 要拿到请求回来的数据, 需要通过`respone.data`来取
- 函数调用会返回一个`Promise`实例, 通过then或catch添加成功失败回调

```javascript
axios.get('http://vue.studyit.io/api/getprodlist')   // 得到一个Promise实例,
.then((rep) => console.log(rep.data))                   // 得到response对象, 通过data属性拿数据
.catch((err) => console.log(err))                           // 得到错误描述对象
```

###### post请求

```javascript
axios.get('http://vue.studyit.io/api/getprodlist')   // 得到一个Promise实例, 通过then或catch添加成功失败回调
.then((rep) => console.log(rep.data))                   // 得到response对象, 通过data属性拿数据
.catch((err) => console.log(err))                           // 得到错误描述对象
```

## 语法

#### axios(config)
```javascript
// 类似与jQ的ajax方法
axios({
    url: '',
    method: 'post',
    data: {}
}).then()
```

#### axios.method()
```javascript
// 类似与jQ的get、post方法
axios.get(url, config)
axios.post(url, data, config)
axios.delete(url, config)
axios.head(url, config)
axios.put(url, data, config)
axios.patch(url, data, config)
```

#### 特点
- 可以拦截请求与响应，或取消请求，或进行统一的请求配置与处理

## 使用

#### get请求
```javascript
let config = {
    params: { pageindex: 1 }
};
axios.get('/news/list', config)
    .then(rep => {
        console.log(rep.data);
    });
```

#### post请求
```javascript
let data = {
    user_name: 'self',
    user_pwd: 111111
};
axios.post('/login', data)
    .then(rep => {
        console.log(rep.obj);
    });
```

## 默认配置
```javascript
let config = {
  url:'/user',
  method:'get' //default
  baseURL:'https://some-domain.com/api/',
  transformRequest:[function(data){}],
  headers: {'X-Requested-With':'XMLHttpRequest'},
  params: {
    ID:12345
  },
  ...
};
axios.defaults = Object.as
```
