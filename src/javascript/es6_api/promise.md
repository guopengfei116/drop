## Promise
- Promise：承诺、约定的意思，主要用于异步执行流程的管理
- 它可以解决传统异步解决方案中，回调嵌套过深不利于维护的问题

#### 演示
- 假定我们有这样一个需求：某人和青梅竹马的芳芳约定，如果十年后她还没嫁，就嫁给我
- 这个需求中就含有异步逻辑的处理，芳芳要不要嫁给我需要等待10年后才会知晓
- 这里我们通过Promise来尝试实现这个需求：
    1. 使用promise管理一个10年约定
    2. 添加10年后的处理逻辑

###### 第一步
- Promise自身是一个`构造函数`，我们可以new它`创建实例`
- 然后传入一个`函数`，里面编写异步操作的代码

```javascript
let engagement = new Promise(function(yes, no) {
    // 定义10年期限，期限到后芳芳没嫁，就调yes，否则调no
    // 这里的yes与no方法是Promise实例提供给我们的
    setTimeout(function() {
        yes();
    }, 1000 * 10);
});
```

###### 第二步
- 上面的代码在10年期限到来时，并没有写处理逻辑，而是通过调用Promise实例提供的方法告知最终结果
- 因为Promise实例知道最终的结果，所以它专门提供了一个then方法让我们来添加处理逻辑

```javascript
// then接收两个回调，第一个是成功回调，第二个是失败回调(可选)
engagement.then(
  () => console.log('太开心了，芳芳终于嫁给了我'),
  () => console.log('我最终还是错过了芳芳')
);
```

###### 后续处理
- 使用Promise后你会发现我们异步操作与后续的处理逻辑是分开编写的
- 而且我们可以通过then方法多次添加后续的处理逻辑
- 即时异步操作结束了，我们还是可以调用then

```javascript
// then第一个回调固定为成功回调
engagement.then(
    () => console.log('芳芳终于嫁给我了，我要带她环游世界！')
);
// 如果只想指定失败回调，可以通过catch方法来添加
engagement.catch(
    () => console.log('我的世界开始变得暗淡无光')
);
```

#### 小结
- `创建`promise实例时传入的回调`作用`是为了接收yes与no方法
- `then`方法用来添加`成功`回调与`失败`回调,失败回调可选
- `catch`方法用来添加`失败`回调
- Promise管理异步操作的特点是实现逻辑的`解耦`, 让程序更`好维护`
- then方法后续仍可以调用，是因为每个Promise实例都有一个`状态`记录异步操作`执行的进度`，即时异步操作`结束`了，这个记录`仍然存在`
    + `pending`状态，代表正在执行异步操作，实例刚`创建`时的状态
    + `resolved`状态，代表异步代码执行完毕，调用`yes`方法后的状态
    + `rejected`状态，代表异步代码执行完毕，调用`no`方法后的状态

## 控制异步操作流程

#### 普通做法
- 通过编写嵌套的异步回调来控制代码的执行流程

```javascript
setTimeout(function() {
    console.log('第一个计时器回调执行，开启第二个');

    setTimeout(function() {
        console.log('第二个计时器回调执行，开启第三个');

        setTimeout(function() {
            console.log('第三个计时器回调执行');

        }, 2000);
    }, 2000);
}, 2000);
```

#### Promise做法
- 通过then方法的链式调用控制代码的执行流程

```javascript
// 创建一个promise实例
new Promise(function(yes, no) {
    setTimeout(function() {
        yes();
    }, 2000);
})
.then(function() {
    console.log('第一个计时器回调执行，开启第二个');
    return new Promise(function(yes, no) {
        setTimeout(function() {
            yes();
        }, 2000);
    });
})
.then(function() {
    console.log('第二个计时器回调执行，开启第三个');
    return new Promise(function(yes, no) {
        setTimeout(function() {
            yes();
        }, 2000);
    });
})
.then(function() {
    console.log('第三个计时器回调执行');
});
```

#### promise封装
- 上面例子setTimeout代码重复写了3遍
- 对于重复冗余的代码，我们可以考虑封装成一个方法，便于复用

```javascript
function timeout(time, data) {
    return new Promise(function(yes, no) {
        setTimeout(function() {
            yes(data);
        }, time);
    });
}

timeout(2000)
.then(function() {
    console.log('第一个计时器回调执行，开启第二个');
    return timeout(4000);
});
.then(function() {
    console.log('第二个计时器回调执行，开启第三个');
    return timeout(4000);
})
.then(function() {
    console.log('第三个计时器回调执行');
});
```

## Promise数据传递

#### 数据传递演示
- 调用yes与no方法时可以传递一些数据供成功与失败回调使用

```javascript
function pmsTimeout(time) {
    return new Promise(function(yes, no) {
        setTimeout(function() {
            yes('嘿!别睡了,起来嗨!');
        }, time);
    });
}

pmsTimeout(2000)
.then(function(data) {
    console.log(data);  // '嘿!别睡了,起来嗨!'
});
```

#### 封装ajax请求
- 我们把普通异步操作封装成promise版本时，可以让使用者指定数据

```javascript
function ajax(config) {
    return new Promise(function(yes, no) {
        Object.assign(config, {
            success: data => yes(data),
            error: () => no()
        });
        $.ajax(config);
    });
}

let ajaxP = ajax({ url: 'xxx' });

ajaxP.then(function(data) {
    console.log('请求成功');
    console.log(data);
})
.cache(function() {
    console.log('请求失败');
});

// 即便请求结束了,后续也可以通过then拿到数据
ajaxP.then(function(data) {
    console.log('仍然可以得到前面请求回来的数据');
    console.log(data);
})
```

#### Promise方法预览
![Promise](./imgs/promise.jpg)