## 材质

### 线条材质 LineBasicMaterial(parameters)
- parameters 定义材质外观的对象

#### parameters
- color
    + 线条颜色, 采用16进制表示, 默认白色
- lineWidth
    + 线条宽度, 默认1单位
- linecap
    + 线帽样式, 默认圆角
- linejoin
    + 两线交点样式, 默认圆角
- vertexColors
    + 线条材质是否使用顶点颜色, 是的话线条会以渐变方式进行渲染
- fog
    + 线条材质是否受全局雾效影响

```javascript
let material = new THREE.LineBasicMaterial()
```

### 网格材质 MeshLambertMaterial(parameters)
- parameters 定义材质外观的对象

```javascript
let material = new THREE.MeshLambertMaterial()
```