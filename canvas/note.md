# day8 -- canvas
- canvas是h5新增的一个特性，可以让我们在浏览器上绘制图形或者对已有图形进行编辑操作。
- canvas有两个标准，一个是2d图形的标准，一个是3d图形的标准。
- 2d标准下目前使用canvas制作图表、图片在线编辑、小游戏、小动画比较多（不过小游戏、小动画使用css3制作的也不少）
- 3d标准下目前使用canvas会制作一些3d游戏、3d模型预览

## canvas入门

### 路径
- 路径就是对将来要绘制图形的一个轮廓上的规划
- 路径就好比我要进行环球旅游，那么我需要先本上计划一条旅游路线，
这条路线就可以看作是canvas中的路径，最后我按照这条路线旅游，可以看作是canvas中的描边路径与填充路径。

### canvas开发必备前奏
- 要在浏览器中使用canvas技术，需要借用一个canvasDOM元素才可以，有了这个元素就相当于按照了PS
- 有了canvasDOM仅仅是安装了PS，要想绘制图形或者编辑图形还需要打开这个canvas(获取canvas的绘图环境)

## canvasDOM的API

### canvasDOM元素的作用
- 用来获取绘图环境（就相当于要编辑图片，必须先安装一个对应的软件，canvasDOM就是这个软件）
- 用来展示绘图效果（要把绘制好的图像显式到页面中，必须要把canvasDOM添加到页面上的任意位置）

### 属性
- cvs.width
    + 可以用来获取或者设置画布宽
- cvs.height
    + 可以用来获取或者设置画布高
    
### 方法
- cvs.getContext('2d' || 'webgl')
    + 获取绘图环境(也叫绘图上下文)

## 绘图环境的API

### 属性
- ctx.strokeStyle
    + 设置描边色
    + 可以设置任何css支持的颜色表示方式
    + 除了可以设置颜色，还可以设置为渐变或图片模式
- ctx.fillStyle
    + 设置填充色
    + 可以设置任何css支持的颜色表示方式
    + 除了可以设置颜色，还可以设置为渐变或图片模式
- ctx.lineWidth
    + 设置线条宽度
    + 不需要加任何单位
- ctx.lineCap = 'butt' || 'round' || 'square'
    + 设置线帽样式
    + butt为默认值
    + round为圆头，半径为线宽一半
    + square为线的两段各延长线宽的一半
- ctx.lineJoin = 'miter' || 'round' || 'bevel'
    + 设置两条线的交点样式
    + miter为默认为，交点尖尖处理
    + round为圆头
    + bevel为斜面
- ctx.textAlign = 'start' || 'left' || 'center' || 'right' || 'end'
    + 设置文字水平对其方式
    + start与left等价
    + right与end等价
- ctx.textBaseline = 'top' || 'hanging' || 'middle' || 'alphabetic' || 'ideographic' || 'bottom'
    + 设置文字垂直对其方式
    + 常用的4个属性为：top、middle、alphcbetic、bottom
 
### 方法
- ctx.moveTo(x, y)
    + 设置路径的起点
- ctx.lineTo(x, y)
    + 从当前路径的结束点到指定点(如果没有结束点，那就从起点开始)，画一条路径
- ctx.stroke()
    + 根据当前页面中的路径进行描边
- ctx.fill()
    + 根据当前页面中的路径进行填充
- ctx.beginPath()
    + 清除当前路径，重新开辟新路径
- ctx.closePath()
    + 当前路径起点与结束点相连，简称闭合路径
- ctx.clearRect(startX, startY, width, height)
    + 清除画布
- ctx.rect(startX, startY, width, height)
    + 画矩形路径
    + 要展示效果，必须手动描边或者填充
- ctx.strokeRect(startX, startY, width, height)
    + 直接绘制一个描边矩形
    + 不会产生任何路径
- ctx.fillRect(startX, startY, width, height)
    + 直接绘制一个填充矩形
    + 不会产生任何路径
- ctx.setLineDash(Array)
    + 设置虚线样式
    + 传入的数组长度无限
    + 如果传入的数组长为偶数，那么整个虚线的样式中最基本的单位长度就为该长度
    + 如果传入的数组长为奇数，那么整个虚线的样式中最基本的单位长度就为该长度的两倍
- ctx.getLineDash()
    + 获取虚线样式
- ctx.arc(圆心x,圆心y,半径,起始弧度,结束弧度,是否逆时针画(可选))
    + 该方法画的是弧路径，要展示效果必须手动描边或填充
    + 该方法还有一个特点，就是会先在当前路径的结束点到弧的起点连一条线，在画弧
- ctx.strokeText(文字，x，y，限制最大占用宽(可选))
    + 绘制中空文字
    + 最后一个参考只是限制最大宽，超过会缩小，没超过不会拉伸
- ctx.fillText(文字，x，y，限制最大占用宽(可选))
    + 绘制实心文字
    + 最后一个参考只是限制最大宽，超过会缩小，没超过不会拉伸
- ctx.measureText(文字)
    + 该方法返回一个对象，目前该对象只有一个width属性
    + width属性代表按照当前的字体样式绘制文字所要占用的宽度
- ctx.isPointInPath(x, y)
    + 判断传入的坐标点，在不在当前页面的路径内
- ctx.save()
    + 备份当前状态
    + 可以备份多次
- ctx.restore()
    + 取出最近一次备份的状态，作为当前状态使用
- ctx.drawImage(3参数 || 5参数 || 9参数)
    + 3参数(图像资源, 绘制到画布的x轴坐标，绘制到画布的y轴坐标)
    + 5参数(图像资源, 绘制到画布的x轴坐标，绘制到画布的y轴坐标，绘制的宽，绘制的高)
    + 9参数(图像资源, clipX，clipY，clipW，clipH， cvsX，cvsY，cvsW，cvsH)
- ctx.translate(x, y)
    + 平移坐标系
    + 平移是在当前基础上继续平移，会累加
    + 平移不会影响已经绘制好的图形
- ctx.rotate(radian)
    + 旋转坐标系
    + 旋转是在当前基础上继续旋转，会累加
    + 旋转不会影响已经绘制好的图形
- ctx.scale(xRatio, yRatio)
    + 按照指定比例缩放坐标系
    + 缩放是在当前基础上缩放旋转，会累加
    + 缩放不会影响已经绘制好的图形

## 非零环绕原则
