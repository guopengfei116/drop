## async函数
- 使用它可以以书写同步代码的方式控制Promise执行流程
- 同步代码阅读起来清晰简单, promise配合async函数使用简直无敌了

#### 定时器例子
- 下面的例子使用async函数来控制多个定时器的顺序执行

```javascript
function timeout(time) {
    return new Promise(function(yes, no) {
        setTimeout(function() {
            yes();
        }, time);
    });
}

// await关键字会等待后面的语句执行完毕后继续向下执行,直到遇到下一个await关键字
async function test() {
    await timeout(1000);
    console.log('1秒后我才会执行');

    await timeout(2000);
    console.log('我要等待上面的代码执行成功后我才执行');

    await timeout(3000);
    console.log('以同步方式编写异步代码真是太爽了');
}

// 调用test异步函数, 体验异步编程幸福生活
test();
```

#### async数据接收
- 下面范例中使用的fetch方法是浏览器新的标准, 用于发送ajax请求
- fetch特点是简单好用, 同时调用fetch方法会得到一个promise实例, 可通过then添加成功回调

```javascript
async function ajax(url) {
    // await关键字还有一个特点, 它可以返回原本需要then才能拿到的数据
    let response = await fetch(url);
    let data =  response.ok && await response.json();
    console.log('可以在这里使用data数据了');
}

// 开启幸福生活
ajax('xxx.json');
```

#### async对于promise执行失败的处理

- 准备工作: 装一个总是执行失败的promise函数, 以此学习如何处理失败

```javascript
function timeout(time) {
    return new Promise(function(yes, no) {
        setTimeout(function() {
            no();
        }, time);
    });
}
```

- 方式1: try catch语句

```javascript
async function test(time) {
    try {
        await timeout(time);
        console.log('成功');
    }catch(e) {
        console.log('失败');
    }
}

test(2000);
```

- 方式2: async方法返回的promise

```javascript
async function test(time) {
    await timeout(time);
    console.log('成功');
}

// async函数调用后会返回一个promise,可以调用then或catch添加成功失败回调
test(3000).catch(() => console.log('失败'));
```

- 方式3: catch方法 - 这种方法会在promise执行失败后仍然向下执行

```javascript
async function test(time) {
    await timeout(time).catch(() => console.log('失败'));
    console.log('成功');
}

test(1000);
```

#### async函数返回值

```javascript
async function test(time) {
    await new Promise((yes, no) => yes());
    return 123;
}

test()
.then(data => console.log(data));  // then成功回调可接收async函数的返回值
```

## 复习promise与async应用
- `jQuery` 当中有个 `animate` 动画函数, 在使用时经常会`嵌套`很多`回调`
- 这里使用 `promise` 与 `async` 的方式来进行使用, 以复习巩固

#### 纯promise

```javascript
function animate(selector, style, time) {
  return new Promise(function(yes, no) {
    $(selector).animate(style, time, () => { yes() });
  });
}

animate('div', { width: 300 }, 2000)
.then(() => { animate('div', { height: 300 }, 1000) })
.then(() => { animate('div', { marginLeft: 500 }, 2000) })
.then(() => { animate('div', { marginTop: 300 }, 1000) })
.catch(() => alert('发生了未知错误, 动画执行失败了'));
```

#### promise结合async

```javascript
function animate(selector, style, time) {
  return new Promise(function(yes, no) {
    $(selector).animate(style, time, () => { yes() });
  });
}

(async function() {
    await animate('div', { width: 300 }, 2000);
    await animate('div', { height: 300 }, 1000);
    await animate('div', { marginLeft: 500 }, 2000);
    await animate('div', { marginTop: 300 }, 1000);
    alert('动画执行完毕!');
}())
.catch(() => alert('发生了未知错误, 动画执行失败了'));
```
