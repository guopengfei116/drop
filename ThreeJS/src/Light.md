## 光源

### 方向光源 DirectionalLight(color, intensity)

#### parameters
- color: 颜色
- intensity: 强度

```javascript
let light = new DirectionalLight(0xFFFFFF, 1.0);
```

### 环绕光源 AmbientLight(color, intensity)

#### parameters
- color: 颜色
- intensity: 强度

```javascript
let light = new AmbientLight(0xFFFFFF, 1.0);
```

#### 点光源 PointLight(color, intensity, distance, decay)

#### parameters
- color: 颜色
- intensity: 强度
- distance: 距离
- decay: 衰弱

```javascript
let light = new PointLight(0xFFFFFF, 1.0);
```