# 移动APP
移动指的是移动设备平台, `app` 是应用 (`application`) 的缩写, 移动App就是移动设备上运行的应用程序

## 种类划分
- **WebAPP**:
    + 网页应用, 需要运行在`浏览器`环境中, `无需`安装即可使用
    + 使用纯`web`技术开发实现
    + 由`浏览器`负责UI界面的`渲染`
- **NativeAPP**:
    + 原生应用, 直接运行在移动`设备`上, 需要`安装`后使用
    + 主要采用设备`原生语言`开发实现, 利用一些新技术可使用`其他语言`实现部分功能
    + 由移动`设备`负责UI界面的`渲染`
- **HybridAPP**:
    + 混合应用, 直接运行在`移动设备`上, 需要`安装`后使用
    + 部分功能采用设备`原生语言`开发, 部分采用`web`技术开发
    + `原生`语言编写的功能由移动`设置`渲染, `web`语言编写的功能运行在App内嵌的`web容器`中(就是一个内嵌的`浏览器`)

## 运作模式
![移动app运行模式对比](https://github.com/guopengfei116/drop/blob/master/img/react-native/app_operational_mode.png?raw=true)

## 优缺点
| 对比/分类 | Web App | Native App | Hybrid App |
| :------- | :------: | :-------: | :--------: |
| 市场认可度 | 不认 | 认可 | 认可 |
| 是否要安装 | 否 | 是 | 是 |
| 开发成本 | 低 | 高 | 中 |
| 维护更新 | 低 | 高 | 中 |
|  跨平台  | 低 | 高 | 中 |
|   体验   | 差 | 高 | 中 |

# WEB技术开发框架

## 混合应用

#### Ionic
- Angular官网 <https://angular.io/>
- Ionic官网 <http://ionicframework.com/>
- Ionic中文网 <http://www.ionic.wang/>

#### Html5+
- 官网 <http://www.dcloud.io/>

#### AppCan
- 官网地址 <http://www.appcan.cn/>

#### 微信小程序
- 官网 <https://mp.weixin.qq.com/>
- 其他 <https://my.oschina.net/u/1416844/blog/759209>

## 原生App

#### ReactNative
- React官网 <https://facebook.github.io/react/>
- RN官网 <https://facebook.github.io/react-native/>
- RN中文网 <http://react-native.cn/>

#### weex
- vue官网 <https://cn.vuejs.org/>
- weex官网 <http://weex.apache.org/cn/>
- weexGithub <https://github.com/apache/incubator-weex>
