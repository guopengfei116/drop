## 场景

### 透视相机 PerspectiveCamera(fov, aspect, near, far)
- 特点是近大远小

#### parameters
- fov 视角
- aspect 宽高比
- near 最小可见距离
- far 最大可见距离

```javascript
let camera = new THREE.PerspectiveCamera(45, width/height, 1, 1000);

camera.position.x = 0; // 距离原点x轴位置
camera.position.y = 0; // 距离原点y轴位置
camera.position.z = 0; // 距离原点z轴位置

camera.up.x = 0;
camera.up.y = 0;
camera.up.z = 0;

camera.lookAt = {
    x: 0,    // 相机中心点距离原点x轴位置
    y: 0,    // 相机中心点距离原点y轴位置
    z: 0     // 相机中心点距离原点z轴位置
};
```