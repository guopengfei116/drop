## 几何体

### 几何体 Geometry

#### parameters

#### property
- vertices 顶点
- colors 颜色
- faces 面

```javascript
let geometry = new THREE.Geometry();
geometry.vertices.push(
    new THREE.Vector3(-10, 10, 0),
    new THREE.Vector3(-10, -10, 0),
    new THREE.Vector3(-10, -10, 0)
);
```

### 立方体 CubeGeometry(long, width, height)

#### parameters

```javascript
let geometry = new THREE.CubeGeometry();
```

### 圆柱 CylinderGeometry(radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength)

#### parameters
- radiusTop 上面圆半径
- radiusBottom 下面圆半径
- height 高度
- radialSegments
- heightSegments
- openEnded
- thetaStart
- thetaLength

```javascript
let geometry = new THREE.CylinderGeometry();
```
