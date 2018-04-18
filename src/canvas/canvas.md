# Canvas
> canvas是HTML5提供的一个用于展示绘图效果的标签。
图像最终通过javascript来进行绘制。
canvas最早是苹果提出的一个方案，现在所有的现代浏览器都已实现。

## 使用场景
- 游戏
- 数据可视化
- 广告特效

## canvas入门

#### 一、创建canvas
```javascript
// 方式1
var cvs = document.createElement('canvas'); // 动态创建canvas标签
cvs.width = 500; // 设置画布大小
cvs.height = 300;
document.body.appendChild(cvs); // 把标签添加到指定元素中
```
```javascript
// 方式2
<-- 直接在HTML结构中书写标签,通过width/height属性设置画布大小 -->
<canvas id="cvs" width="500" height="300"></canvas> 
var cvs = document.querySelector('#cvs');
```

#### 二、获取绘图上下文对象
> canvas元素本身是没有绘图能力的，
需要调用getContext方法获取一个绘图上下文对象
```javascript
// 获取到的对象身上拥有各种绘制路径、图形的API。
var ctx = cvs.getContext('2d');
console.log(ctx);
```

#### 三、在10，10点绘制一个宽高各100的矩形
```
ctx.moveTo(10, 10); // 设置路径起始
ctx.lineTo(110, 10); // 添加4条矩形子路径
ctx.lineTo(110, 110);
ctx.lineTo(10, 110);
ctx.lineTo(10, 10);
ctx.stroke(); // 根据路径描边，最终canvas元素中会展示绘制效果
```

## 相关概念

#### 路径

#### 状态
