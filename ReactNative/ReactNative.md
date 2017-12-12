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
![移动app运行模式对比](img/app_operational_mode.png)

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

## 工作岗位与职责
- 产品经理
- UI设计
- 后端程序猿
- 前端程序猿
- 测试工程狮
- 运维工程狮

## 项目流程
- 需求设计阶段 --> 主要工作人员：产品
    + 调研与需求确立
    + 估时
    + 产出需求文档与产品原型
- 美术设计阶段 --> 主要工作人员：设计
    + 估时
    + 产出ui界面
- 开发实现阶段 --> 主要工作人员：前端(web、IOS、Android、PC)、后端、测试
    + 估时
    + 前端架构，开发
    + 后端架构，开发
    + 测试用例编写
- 测试调试阶段 --> 主要工作人员：前端(web、IOS、Android、PC)、后端、测试
    + 前后端联调
    + 测试
    + bug修复
- 上线部署 --> 主要工作人员：运维、测试
    + 线上环境部署与项目上线
    + 测试，确保线上项目运行无问题
    + 如出现问题开发人员紧急修复或撤销上线延后处理

# ReactNative

## 环境搭建

#### **注册事项**
- 安装的目录结构中`不要`出现`中文`与`特殊字符`
- 如果`计算机`名称是中文改成`英文`
- 因为这些环境都依赖我们的操作系统，如果系统是被优化阉割的版本可能会安装失败

#### **环境预览**
- 参照文档 <http://reactnative.cn/docs/0.42/getting-started.html>
![预览](img/environment_config.png)

#### **Node环境**
- 下载最新的长期`稳定版本`<https://nodejs.org/en/>
- 安装完毕后，在命令行中键入 `node -v` 进行测试，显示出版本号即成功
- 在国内的话如有需要可以`修改` npm 的`下载地址`, 或在下载包的时候临时指定
    + `npm config set registry https://registry.npm.taobao.org -g`
    + `npm config set disturl https://npm.taobao.org/dist -g`

#### **Python环境**
- 安装 `2.×` 的版本的 `python`, 安装时注意勾选安装界面上的 `Add Python to path`, 自动将Python添加到`环境变量`
- 安装完毕后, 在命令行中键入 `python --version` 进行测试，显示出版本号即成功
![预览](img/python.png)

#### **Java环境**
- 下载1.8版本JDK, <http://www.oracle.com/technetwork/java/javase/overview/index.html>
- 安装完毕后, 需要手动配置环境变量<http://jingyan.baidu.com/article/f96699bb8b38e0894e3c1bef.html>
    1. 系统环境变量中新增 `JAVA_HOME` 变量，值为 `C:\Program Files\Java\jdk1.8.0_112`, 即 jdk 的`安装`根路径
    2. 修改系统环境变量 `Path`, 在 Path 之后新增 `%JAVA_HOME%\bin;%JAVA_HOME%\jre\bin`
    3. 新增 `CLASSPATH` 变量, 值为 `.;%JAVA_HOME%\lib\dt.jar;%JAVA_HOME%\lib\tools.jar`
    4. 配置完毕后保存并退出, 在命令行中分别键入`java` 与 `javac` 进行测试, 出现命令选项即配置成功

#### **Android环境**
1. 双击`installer_r24.3.4-windows.exe`安装androidSDK
![每个用户](img/android_sdk.png)

2. 进入安装目录，将`android-25`、`android-23`(react-native依赖)压缩包复制到`platforms`文件夹下，右键`解压`到当前文件夹

3. 将`platform-tools_r23.1.0-windows`压缩包复制到`安装目录`，右键`解压`到当前文件夹

4. **tools文件夹不解压覆盖也行；**~~解压`tools`，放到`tools`文件夹下~~

5. 在安装目录新建一个`build-tools`文件夹，然后将`build-tools_r23.0.1-windows.zip(react-native依赖)`、
`build-tools_r23.0.2-windows.zip(weex依赖)`和`build-tools_r23.0.3-windows.zip`压缩包复制到`build-tools`，
然后依次右键解压到当前文件夹，`解压后`的文件夹需要`修改名字`为对应的版本号`23.0.1`、`23.0.2`和`23.0.3`

6. 在安装目录中，新建`extras`文件夹，在`extras`文件夹下新建`android`文件夹
将`android_m2repository_r40.zip`与`support_r23.2.1.zip`压缩包复制到这个`android`文件夹，右键解压到当前文件夹

7. 配置安装环境变量：在系统环境变量中新建`ANDROID_HOME`变量，值为SDK安装目录,
然后在Path中新增 `;%ANDROID_HOME%\tools;%ANDROID_HOME%\platform-tools;`

#### **React-Native-Cli与Yarn**
- `Yarn` 是 `Facebook` 推出的`包管理`工具, 可以加速 node 模块的下载, `React-Native` 脚手架安装包的时候会使用
- `React-Native-Cli` 是一款命令行工具, 用于 `React-Native` 项目的创建、初始化、更新、运行与打包
- 安装命令: `npm install yarn react-native-cli -g`
- 测试命令: `yarn -v` `react-native -v`
- 安装完毕后可以设置 `Yarn` 安装模块的`镜像`地址
    + `yarn config set registry https://registry.npm.taobao.org -g`
    + `yarn config set disturl https://npm.taobao.org/dist -g`

## 环境测试与APP打包

#### 创建项目
- 使用`命令行`工具切入一个`目录`, 保证该目录及整个`路径`中没有任何`中文`字符串
- 然后运行 `react-native init project-name` 命令初始化一个 `React-Native` 项目
- 创建时过程中需要联网`下载`依赖包, 所以可能比较慢, 建议设置 `npm 或 yarn` 为国内镜像源
- ![初始化成功](img/bundle_success_init.png)

#### 初始打包
- 运行 `cd project-name` 命令进入`项目`根目录
- 然后运行 `react-native run-android` 命令
- 该命令首先在本地启动一个端口`8081`的本地`服务器`, 用于向移动设备提供最新的项目打包生成的 `js` 文件
- 其次命令会打包 `android` 项目, 生成 `apk` 文件, 如果有移动设备连接了电脑, 还会自动帮你`安装`
- ![启动服务器](img/bundle_success_server.png)
- ![打包成功](img/bundle_success_build.png)

#### 手动安装
- 打包好的 `apk` 安装包, 被放置到了 `/android/app/build/outputs/apk` 目录下
- 如果没有设备连接电脑, 或自动安装失败, 可自行把 `apk` 文件`拷贝`到手机存储器, 然后手动`安装`

#### 设置App权限
- `App` 安装完毕要后`执行`, 需要确保其拥有`悬浮框`权限
- 可在`设置` => `授权管理` => `应用权限管理` 中找到对应的 APP , 然后`开启`悬浮框权限

#### 测试运行
- App 权限设置完毕后, 关掉重新启动, 便会看到一个`欢迎`界面
- ![欢迎页面](img/react_welcome.png)
- 也可以`摇一摇`手机, 唤起调试菜单, 点击第一个选项 `Reload`重新加载 `js` 执行
- ![摇一摇弹出框](img/react_yaoyiyao.png)
- ![本地重新打包](img/bundle_success_reload.png)

## 常见打包失败问题
- 参考资料 <http://www.open-open.com/lib/view/open1477469117948.html>
- 参考资料 <http://reactnative.cn/docs/0.50/running-on-device-android.html#content>

#### 无法获取桥接
- 提示: `Could not get BatchedBridge, make sure your bundle is packaged correctly`
- 确保 `android/app/src/main/` 目录下有 `assets` 文件夹, 如果没有, 手动创建一个
- 然后在命令行工具中切入到项目根目录
- 执行命令: `react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/`

#### 缺少许可
- **Windows脚本**
    + `mkdir "%ANDROID_HOME%\licenses"`
    + `echo |set /p="8933bad161af4178b1185d1a37fbf41ea5269c55" > "%ANDROID_HOME%\licenses\android-sdk-license"`
- **Linux脚本**
    + `mkdir "$ANDROID_HOME/licenses"`
    + `echo -e "\n8933bad161af4178b1185d1a37fbf41ea5269c55" > "$ANDROID_HOME/licenses/android-sdk-license"`
![缺少许可截图与解决方案](img/bundle_error_license.jpg)

#### 连接超时
![连接超时截图与解决方案](img/bundle_error_timeout.jpg)

## 开发

#### 启动本地服务器
- 之前运行 `react-native run-android` 打包命令的时候会自动启动一个本地`服务器`用于更新 js 代码
- 如果是项目的`后续`开发, 我们只需单独运行 `react-native start` 命令重新启动`服务器`即可
- 只要启动了, 我们就可以修改 `web` 代码, 将来移动设备 `Reload` 新代码即可预览最新效果

#### 设备直连
1. 准备一台 `Android` 手机, 通过数据线`连接`到电脑，设置启用`USB调试`
2. 一般的手机在`设置`中可以直接找到`开发者选项`进行开启, 如果`找不到`, 就自行百度查一下
3. 手机连接成功后运行检测命令 `adb devices` , 如果有输出设备列表与 `ID` 相关的字符串就证明连接成功了
![调试模式](img/usb_debug.png)
![查看连接设备](img/adb_devices.png)
4. 附录: 小米手机开启USB调试步骤
    + 首先进入`设置` => `我的设备` => `全部参数` => 连续`点击`MUI版本3次以上
    + 然后重新进入`设置` => `更多设置` => `开发者选项`(在无障碍下面) => 找到`USB调试`点击开启
    + 最后需要拉到底部找到`启用 MUI 优化`, 关掉重启

#### 局域网连接
- 移动设备除了通过 `USB` 直连电脑调试开发, 还可以采用`无线`的方式进行调试
- 只要保证手机和电脑在同一个`局域网`, 然后摇一摇唤出调试菜单
- 点击 `Dev settings` => `Debuug server host` , 配置本地 `IP` 地址和端口号 `8081` 即可
- 如果出现这个`错误`提示, 说明配置错了: `could not connect to development server`
- ![摇一摇弹出框](img/react_debug_server.png)

#### 调试菜单说明
- Reload: 重新加载整个页面
- Debug JS Remotely: 启动远程调试, 会自动打开chrome浏览器, 然后可在开发者工具中调试js
- Enable Live Reload: 开启自动加载, 代码变动会自动更新整个页面
- Enable Hot Reloading: 热更新, 代码变动自动的进行局部更新
- Dev Sttings: 开发调试配置

#### 开发初体验
- 在项目根目录下有个 `index.js` , 它是项目的`入口`文件, 负责注册根组件
- 根目录下有个 `App.js` , 是默认生成的`根组件`, 我们在 APP 上看到的`欢迎界面`就是这个组件实现的
- 尝试修改 `App.js` 中的文本内容, 然后手机摇一摇 `Reload` 查看即可看到修改内容

```jsx
export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          你是我的了!
        </Text>
        <Text style={styles.instructions}>
          哈哈, 开心不?
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
      </View>
    );
  }
}
```

#### 根组件代码解读

```jsx
// 导包
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

// Platform.select方法会根据运行环境得到配置的内容
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

// 导出根组件, 组件的定于语法与之前学习的一样
export default class App extends Component {
  render() {
    return (
      // 返回的视图需要使用View组件包裹, 作用相当于Div标签
      <View style={styles.container}>

  		{/* 文本内容使用Text组件包裹, 作用相当于P标签 */}
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>

      </View>
    );
  }
}

// 定义样式, 这里的尺寸大小无需加单位, 元素可以通过数组引用多个样式, 后面的样式优先级比前面的高
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
```

## 内置组件
- 在 `React Native` 中你需要使用官方提供的`组件`进行应用构建
- 因为是开发`原生`应用, 我们的代码最终会`转为`原生组件的方式渲染, 所以你不会看到任何以 `html` 标签命名的组件

#### View
- 作用相当于 `html` 的 `div` 标签用于结构布局
- <http://reactnative.cn/docs/0.50/view.html#content>

#### Text
- 作用相当于 `html` 的 `p` 标签用于文本段落
- 注意: 除了Text外, 别的组件内都不能包含文本
- <http://reactnative.cn/docs/0.50/text.html#content>

#### Image
- 作用相当于 `html` 的 `img` 标签用于承载图片
- 组件通过 `source` 属性设置图片地址
- <http://reactnative.cn/docs/0.50/images.html#content>
- <http://reactnative.cn/docs/0.50/image.html#content>

###### 载入本地图片
- `require` 方法里面必须传入一个`静态字符串`
- 里面不能写`表达式`, 比如字符串拼接, 同时图片名称也不允许以`数字`开头

```jsx
{/* 正确 */}
<Image source={require('./img/icon.png')} />

{/* 错误 */}
<Image source={require('./' + 'img/icon.png')} />

{/* 错误 */}
<Image source={require('123.png')} />
```

###### 载入网络图片
- `动态`载入的图片需要手动设置`宽高`, 否则无法显示
- 如果某些网站的图片载入失败尝试换一个域名图片试试

```jsx
{/* 正确 */}
<Image
	source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
	style={{width: 400, height: 400}}
/>

{/* 错误 */}
<Image source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}} />
```

###### 载入网络图片
- 如果想`写活`地址, 必须定义一个`对象`赋值

```jsx
let imgObj = {uri: 'http://facebook.github.io/react/img/logo_og.png'};
{/* 正确 */}
<Image source={ imgObj } style={{width: 400, height: 400}} />

{/* 错误 */}
let imgUri = 'http://facebook.github.io/react/img/logo_og.png'
<Image source={{uri: imgUri}} />
```

#### Button
- 作用相当于 `html` 的 `button` 标签用于触发点击
- 需要通过 `title` 属性设置按钮内的文本内容, 通过 `onPress` 属性监听按钮的点击事件
- <http://reactnative.cn/docs/0.50/button.html>

```jsx
<Button title="点我吧" onPress={ this.clickHandler }></Button>
```

#### TextInput
- 作用相当于 `html` 的 `input` 标签用于输入文本
- 需要通过 `value` 属性文本内容, 通过 `onChangeText` 属性监听文本的变化事件
- <http://reactnative.cn/docs/0.50/textinput.html#content>

```jsx
export default class Home extends Component {
	state = {
    	text: '默认值'
    }

    upText(text) {
	    this.setState({
	      text: text
	    });
    }

    render() {
    	return (
      		<View style={styles.container}>
      			<Text style={styles.welcome}>{ this.state.text }</Text>
    			<TextInput value={ this.state.text } onChangeText={ this.upText } />
	    	</View>
	    );
    }
```

#### ScrollView
- 默认情况下, `超出`屏幕的内容是看不到的, 不像浏览器环境下会自动添加`滚动条`
- 如果需要滚动, 可以使用这个`组件`把要相应的内容`包裹`起来, 被包裹的内容就会处于`滚动条`中
- <http://reactnative.cn/docs/0.50/scrollview.html#content>

#### ActivityIndicator
- 展示一个小圆形的`loading`
- 通过属性 `animating` 控制显示隐藏, `color` 设置颜色
- <http://reactnative.cn/docs/0.50/activityindicator.html#content>

```jsx
<ActivityIndicator animating={ this.state.isShow }></ActivityIndicator>
```

# 豆瓣电影列表案例

## 集成react-native-swiper
- 这是一个基于 `react-native` 开发的第三方轮播图组件库
- [详情可查看github官方文档](https://github.com/leecade/react-native-swiper)

#### 安装
- 命令: `yarn add react-native-swiper -S`

#### 封装自用公共组件
- 创建 `src/component/common/swiper.js` 公共组件
- 然后 `copy` 官方的`示例`代码进行测试
- 注意: 因为这个组件为子组件, 对于 `Swiper` 组件而言, 其`父组件`必须设有`高度`才可正常运行

```jsx
// 根据官方文档导入相关组件与函数
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import Swiper from 'react-native-swiper';

//  showsButtons属性可用来控制左右箭头显示与隐藏, height设置高度, autoplay控制自动播放
export default class Home extends Component {
    render() {
        return (
            <Swiper style={styles.wrapper} showsButtons={true} height={160}>
                <View style={styles.slide1}>
                    <Text style={styles.text}>Hello Swiper</Text>
                </View>
                <View style={styles.slide2}>
                    <Text style={styles.text}>Beautiful</Text>
                </View>
                <View style={styles.slide3}>
                    <Text style={styles.text}>And simple</Text>
                </View>
            </Swiper>
        );
    }
}

var styles = StyleSheet.create({
    wrapper: {},
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
    },
    image:{
        width:'100%',
        height:'100%'
    }
});
```

#### 测试
- 修改 `App.js` 根组件
- 导入`公共轮播图`组件并使用`测试`

```jsx
import AppSwiper from './src/component/common/swipe.js';

export default class App extends Component {
    render() {
        return (
            <View style={styles.container}>
                <AppSwiper></AppSwiper>
                <Text>轮播图组件测试</Text>
            </View>
        );
    }
}
```

## 轮播图数据动态化

#### 接口配置文件
- 创建 `src/js/api_config.js` 接口配置文件
- [豆瓣接口文档](https://developers.douban.com/wiki/?title=api_v2)

```js
const domain = 'http://vue.studyit.io/api';
const dbDomain = 'http://api.douban.com/v2';

export default {
    // 轮播图
    getLunbo: `${domain}/getlunbo`,

    // 豆瓣电影正在热映
	doubanHot: 'http://api.douban.com/v2/movie/in_theaters',

	// 豆瓣电影即将上映
	doubanSoon: `${dbDomain}/movie/coming_soon`,

	// 豆瓣电影top250
	doubanTop: `${dbDomain}/movie/top250`,

	// 豆瓣电影详情
    doubanDetail: `${dbDomain}/movie/subject/` // 后面需要加电影id参数
};
```

#### 轮播图组件修改

```jsx
import Swiper from 'react-native-swiper';
import apiConfig from '../../js/api_config.js';

export default class AppSwiper extends Component {

    constructor(props) {
        super(props)
        this.state = {
            lunbos: [],
            imgUrl: {uri: 'http://ofv795nmp.bkt.clouddn.com/vuelogobanner1.jpg'}
        }
    }

    // 给每个对象里面添加uri属性, 以便设置给Image组件
    transformLunbos(lunbos) {
        return lunbos.message.map(item => {
            item.uri = item.img;
            return item;
        });
    }

    componentWillMount() {
        // 请求轮播图数据
        fetch(apiConfig.getLunbo)
            .then(rsp => rsp.json())
            .then(lunbos => {
                this.setState({
                    lunbos: this.transformLunbos(lunbos)
                });
            }
        );
    }

    render() {
        return (
            <View style={{height: 200}}>
                <Swiper showsButtons={true} height={160} autoplay={true}>
                    {
                        this.state.lunbos.map(item => {
                            return (
                                <View style={styles.slide} key={item.uri}>
                                    <Image style={{height:'100%', width:'100%'}} source={item}></Image>
                                </View>
                            );
                        })
                    }
                </Swiper>
            </View>
        );
    }
}
```

## 首页导航按钮

```jsx
<View style={{flexDirection:'row', justifyContent:'space-around',
    height: 40, backgroundColor: 'skyblue', alignItems: 'center'}}>
    <Text>首页</Text>
    <Text>电影</Text>
    <Text>关于</Text>
</View>
```

## 集成react-native-router-flux
- 这是一个基于 react-native 开发的第三方路由库
- [详情可查看github官方文档](https://github.com/aksonov/react-native-router-flux)

#### 安装
- 运行命令: `yarn add react-native-router-flux -S`

#### 使用
- 创建 `src/component/index/index.js` 首屏页面组件, 把 `App.js` 根组件的代码 `Copy` 过去
- 然后`重新`编写 `App.js` 根组件, 主要代码是利用`路由`组件控制其他页面的展示

```jsx
import React, { Component } from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux';

import AppIndex from './src/component/index';

// 定义并导出组件
export default class App extends Component {
    render() {
        return (
            <Router>
                <Stack key="root">
                    <Scene key="index" component={ AppIndex } hideNavBar={ true } title={'index'}></Scene>
                </Stack>
            </Router>
        );
    }
}
```

## 路由其他页面

#### 创建三个页面组件
- 创建 `src/component/home/index.js`
- 创建 `src/component/movie/index.js`
- 创建 `src/component/about/index.js`

```jsx
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

// 三个页面组件模版
export default class (AppHome | AppMovie | AppAbout) extends Component {
    render() {
        return (
            <View>
                <Text>(首页 | 电影 | 关于)</Text>
            </View>
        );
    }
}
```

#### 增加路由配置
- 修改 `App.js` 根组件, 导入新页面进行`路由`配置

```jsx
import React, { Component } from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux';

// 导入页面组件
import AppIndex from './src/component/index';
import AppHome from './src/component/home';
import AppMovie from './src/component/movie';
import AppAbout from './src/component/about';

// 定义并导出组件
export default class App extends Component {
    render() {
        return (
            <Router>
                <Stack key="root">
                	{/* 路由配置, initial用于设置默认展示的页面, key是路由的名称将来要通过这个key进行组件切换 */}
                    <Scene key="index" component={ AppIndex } hideNavBar={ true } initial={true} ></Scene>
                    <Scene key="home" component={ AppHome } hideNavBar={ false }  title={ '首页' }></Scene>
                    <Scene key="movie" component={ AppMovie } hideNavBar={ false } title={ '电影' }></Scene>
                    <Scene key="about" component={ AppAbout } hideNavBar={ false } title={ '关于' }></Scene>
                </Stack>
            </Router>
        );
    }
}
```

#### 首屏导航实现
- 修改 `src/component/index/index.js` 首屏页面组件

```jsx
import AppSwiper from '../common/swipe.js';       // 轮播图组件
import { Actions } from 'react-native-router-flux';  // 路由插件提供的操作对象

export default class AppIndex extends Component {
    render() {
        return (
            <View style={styles.container}>
                <AppSwiper></AppSwiper>
                <View style={{flexDirection:'row', justifyContent:'space-around',
                    height: 40, backgroundColor: 'skyblue', alignItems: 'center'}}>
                    <Text onPress={ Actions.home }>首页</Text>
                    <Text onPress={ Actions.movie }>电影</Text>
                    <Text onPress={ Actions.about }>关于</Text>
                </View>
            </View>
        );
    }
}
```

## 电影列表
- 修改 `src/component/movie/index.js`
- 使用 `hasLoading` 状态控制 `loading` 的展示隐藏, 默认展示
- 使用 `fetch` 获取电影列表`数据`进行渲染, 获取完毕后`隐藏` loading

```jsx
import React, { Component } from 'react';
import { Text, View, ActivityIndicator, ScrollView, Image } from 'react-native';
import apiConfig from '../../js/api_config.js';

// 定义并导出组件
export default class App extends Component {

    constructor() {
        super();
        this.state = {
            hasLoading: true,
            movieList: []
        };
    }

    componentWillMount() {
        // 获取热映列表
        fetch(apiConfig.doubanHot)
            .then(rsp => rsp.json())
            .then(data => {
                this.setState({
                    hasLoading: false,
                    movieList: data.subjects
                })
            });
    }

    render() {
        return (
            <View style={{paddingTop: 60}}>
                {
                    this.state.hasLoading === true
                    ?
                        // loading
                        <ActivityIndicator size='large' color={'red'}></ActivityIndicator>
                    :(
                        // 电影列表
                        <ScrollView>
                            {
                                this.state.movieList.map(item => {
                                    return (
                                        <View style={{paddingLeft: 10, paddingRight: 10, flexDirection: 'row', marginBottom: 2}}>
                                            <Image style={{width:80, height:120}} source={{uri: item.images.small}}></Image>
                                            <View style={{justifyContent:'space-around', marginLeft: 10, fontSize: 20}}>
                                                <Text>电影名称: {item.title}</Text>
                                                <Text>上映年份: {item.year}</Text>
                                                <Text>电影评分: {item.rating.average||0}</Text>
                                            </View>
                                        </View>
                                    );
                                })
                            }
                        </ScrollView>
                    )
                }
            </View>
        );
    }
}
```

## 电影详情

#### 初始页面
- 创建 `src/component/movie/detail/index.js`

#### 路由配置
- 修改 `App.js` 根组件, 导入新页面进行`路由`配置

```jsx
import AppIndex from './src/component/index';
import AppHome from './src/component/home';
import AppMovie from './src/component/movie';
import AppMovieDetail from './src/component/movie/movie_detail';
import AppAbout from './src/component/about';

<Stack key="root">
    <Scene key="index" component={ AppIndex } hideNavBar={ true } initial={true} ></Scene>
    <Scene key="home" component={ AppHome } hideNavBar={ false } title={ '首页' }></Scene>
    <Scene key="movie" component={ AppMovie } hideNavBar={ false } title={ '电影' }></Scene>
    <Scene key="movieDetail" component={ AppMovieDetail } hideNavBar={ false } title={ '电影详情' }></Scene>
    <Scene key="about" component={ AppAbout } hideNavBar={ false } title={ '关于' }></Scene>
</Stack>
```

#### 电影列表导航功能
- 导入 `TouchableOpacity` 组件, 用于添加点击事件与效果
- 导入 `Actions` 对象, 用于切换页面

```jsx
import { ..., TouchableOpacity } from 'react-native'; // 多导入一个TouchableOpacity组件
import { Actions } from 'react-native-router-flux';    // 导入Actions对象

// 渲染电影列表
<ScrollView>
    {
        this.state.movieList.map(item => {
            return (
            	// 使用该组件包裹每个电影, 监听点击事件跳转到电影详情页, 并把id作为参数传过去
                <TouchableOpacity onPress={() => { Actions.movieDetail({id: item.id}) }}>
                    <View>...</View>
                </TouchableOpacity>
            );
        })
    }
</ScrollView>
```

#### 电影详情页实现

```jsx
import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import apiConfig from '../../js/api_config.js';

export default class AppMovieDetail extends Component {

    constructor() {
        super();
        this.state = {
            hasLoading: true,
            movieDetail: {}
        };
    }

    componentWillMount() {
        // 获取电影详情
        fetch(apiConfig.doubanDetail + this.props.id)
            .then(rsp => rsp.json())
            .then(data => {
                this.setState({
                    hasLoading: false,
                    movieDetail: data
                })
            });
    }

    render() {
        return (
            <View style={{paddingTop: 60}}>
            {
                    this.state.hasLoading === true
                    ?
                        // 渲染loading
                        <ActivityIndicator size='large' color={'red'}></ActivityIndicator>
                    :(
                        <View>
                            <Text>{this.state.movieDetail.title}</Text>
                            <Image style={{width: '100%', height: 300}}
                                source={{uri: this.state.movieDetail.images.large}}></Image>
                            <Text>{this.state.movieDetail.summary}</Text>
                        </View>
                    )
            }
            </View>
        );
    }
}
```

## 相关文章
+ [React Native 小米（红米）手机安装失败、白屏 Failed to establish session 解决方案](http://blog.csdn.net/u011240877/article/details/51983262)
+ [React Native Android 初次试用遇到的各种坑](http://lib.csdn.net/article/reactnative/48721)
+ [Redux 中文文档](http://www.redux.org.cn/)
+ [electron](https://electron.atom.io/)
+ [RN正式打包](http://www.cnblogs.com/franson-2016/p/6920805.html)
