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

# ReactNative

## 环境搭建

#### **注册事项**
- 安装的目录结构中`不要`出现`中文`与`特殊字符`
- 如果`计算机`名称是中文改成`英文`
- 因为这些环境都依赖我们的操作系统，如果系统是被优化阉割的版本可能会安装失败

#### **环境预览**
- 参照文档 <http://reactnative.cn/docs/0.42/getting-started.html>
- ![预览](https://github.com/guopengfei116/drop/blob/master/img/react-native/environment_config.png?raw=true)

#### **Node环境**
- 下载最新的长期`稳定版本`<https://nodejs.org/en/>
- 安装完毕后，在命令行中键入 `node -v` 进行测试，显示出版本号即成功
- 在国内的话如有需要可以`修改` npm 的`下载地址`, 或在下载包的时候临时指定
    + `npm config set registry https://registry.npm.taobao.org -g`
    + `npm config set disturl https://npm.taobao.org/dist -g`

#### **React-Native-Cli与Yarn**
- `Yarn` 是 `Facebook` 推出的`包管理`工具, 可以加速 node 模块的下载, `React-Native` 脚手架安装包的时候会使用
- `React-Native-Cli` 是一款命令行工具, 用于 `React-Native` 项目的创建、初始化、更新、运行与打包
- 安装命令: `npm install yarn react-native-cli -g`
- 测试命令: `yarn -v` `react-native -v`
- 安装完毕后可以设置 `Yarn` 安装模块的`镜像`地址
    + `yarn config set registry https://registry.npm.taobao.org -g`
    + `yarn config set disturl https://npm.taobao.org/dist -g`

#### **Python环境**
- 安装 `2.×` 的版本的 `python`, 安装时注意勾选安装界面上的 `Add Python to path`, 自动将Python添加到`环境变量`
- 安装完毕后, 在命令行中键入 `python --version` 进行测试，显示出版本号即成功
![预览](https://github.com/guopengfei116/drop/blob/master/img/react-native/python.png?raw=true)

#### **Java环境**
- 下载1.8版本JDK, <http://www.oracle.com/technetwork/java/javase/overview/index.html>
- 安装完毕后, 需要手动配置环境变量<http://jingyan.baidu.com/article/f96699bb8b38e0894e3c1bef.html>
    1. 系统环境变量中新增 `JAVA_HOME` 变量，值为 `C:\Program Files\Java\jdk1.8.0_112`, 即 jdk 的`安装`根路径
    2. 修改系统环境变量 `Path`, 在 Path 之后新增 `%JAVA_HOME%\bin;%JAVA_HOME%\jre\bin`
    3. 新增 `CLASSPATH` 变量, 值为 `.;%JAVA_HOME%\lib\dt.jar;%JAVA_HOME%\lib\tools.jar`
    4. 配置完毕后保存并退出, 在命令行中分别键入`java` 与 `javac` 进行测试, 出现命令选项即配置成功

#### **Android环境**
1. 双击`installer_r24.3.4-windows.exe`安装androidSDK
![每个用户](https://github.com/guopengfei116/drop/blob/master/img/react-native/android_sdk.png?raw=true)

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

## 环境测试与APP打包

#### 创建项目
- 使用`命令行`工具切入一个`目录`, 保证该目录及整个`路径`中没有任何`中文`字符串
- 然后运行 `react-native init project-name` 命令初始化一个 `React-Native` 项目
- 创建时过程中需要联网`下载`依赖包, 所以可能比较慢, 建议设置 `npm 或 yarn` 为国内镜像源

#### 初始打包
- 运行 `cd project-name` 命令进入`项目`根目录
- 然后运行 `react-native run-android` 命令
- 该命令首先在本地启动一个端口`8081`的本地`服务器`, 用于向移动设备提供最新的项目打包生成的 `js` 文件
- 其次命令会打包 `android` 项目, 生成 `apk` 文件, 如果有移动设备连接了电脑, 还会自动帮你`安装`

#### 手动安装
- 打包好的 `apk` 安装包, 被放置到了 `/android/app/build/outputs/apk` 目录下
- 如果没有设备连接电脑, 或自动安装失败, 可自行把 `apk` 文件`拷贝`到手机存储器, 然后手动`安装`

#### 设置App权限
- `App` 安装完毕要后`执行`, 需要确保其拥有`悬浮框`权限
- 可在`设置` => `授权管理` => `应用权限管理` 中找到对应的 APP , 然后`开启`悬浮框权限
- 有些手机需要关闭优化，比如MIUI系统手机需要进入开发者模式，关闭 “MIUI优化”

#### 测试运行
- App 权限设置完毕后, 关掉重新启动, 便会看到一个`欢迎`界面
- ![欢迎页面](https://github.com/guopengfei116/drop/blob/master/img/react-native/react_welcome.png?raw=true)
- 也可以`摇一摇`手机, 唤起调试菜单, 点击第一个选项 `Reload`重新加载 `js` 执行
- ![摇一摇弹出框](https://github.com/guopengfei116/drop/blob/master/img/react-native/react_yaoyiyao.png?raw=true)

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
![缺少许可截图与解决方案](https://github.com/guopengfei116/drop/blob/master/img/react-native/bundle_error_license.png?raw=true)

#### 连接超时
![连接超时截图与解决方案](https://github.com/guopengfei116/drop/blob/master/img/react-native/bundle_error_timeout.jpg?raw=true)

## 开发

#### 启动本地服务器
- 之前运行 `react-native run-android` 打包命令的时候会自动启动一个本地`服务器`用于更新 js 代码
- 如果是项目的`后续`开发, 我们只需单独运行 `react-native start` 命令重新启动`服务器`即可
- 只要启动了, 我们就可以修改 `web` 代码, 将来移动设备 `Reload` 新代码即可预览最新效果

#### 设备直连
1. 准备一台 `Android` 手机, 通过数据线`连接`到电脑，设置启用`USB调试`
2. 一般的手机在`设置`中可以直接找到`开发者选项`进行开启, 如果`找不到`, 就自行百度查一下
3. 手机连接成功后运行检测命令 `adb devices` , 如果有输出设备列表与 `ID` 相关的字符串就证明连接成功了
![调试模式](https://github.com/guopengfei116/drop/blob/master/img/react-native/usb_debug.png?raw=true)
![查看连接设备](https://github.com/guopengfei116/drop/blob/master/img/react-native/adb_devices.png?raw=true)
4. 附录: 小米手机开启USB调试步骤
    + 首先进入`设置` => `我的设备` => `全部参数` => 连续`点击`MUI版本3次以上
    + 然后重新进入`设置` => `更多设置` => `开发者选项`(在无障碍下面) => 找到`USB调试`点击开启
    + 最后需要拉到底部找到`启用 MUI 优化`, 关掉重启

#### 局域网连接
- 移动设备除了通过 `USB` 直连电脑调试开发, 还可以采用`无线`的方式进行调试
- 只要保证手机和电脑在同一个`局域网`, 然后摇一摇唤出调试菜单
- 点击 `Dev settings` => `Debuug server host` , 配置本地 `IP` 地址和端口号 `8081` 即可
- 如果出现这个`错误`提示, 说明配置错了: `could not connect to development server`
- ![摇一摇弹出框](https://github.com/guopengfei116/drop/blob/master/img/react-native/react_debug_server.png?raw=true)

#### 调试菜单说明
- Reload: 重新加载整个页面
- Debug JS Remotely: 启动远程调试, 会自动打开chrome浏览器, 然后可在开发者工具中调试js
- Enable Live Reload: 开启自动加载, 代码变动会自动更新整个页面
- Enable Hot Reloading: 热更新, 代码变动自动的进行局部更新
- Dev Sttings: 开发调试配置

## 打包正式版

1、产生签名的key

该过程会用到keytool密钥和证书管理工具，在项目的主目录（不是android文件夹）中执行：

```shell
// 生成签名key，注意记下你的密钥和存储密码，后面配置文件需要使用
keytool -genkey -v -keystore my-release-key.keystore -alias 自己起的别名 -keyalg RSA -keysize 2048 -validity 10000

// 将keystore文件移动至android/app/文件夹
move my-release-key.keystore android/app/
```

2、修改android/gradle.properties文件，增加如下配置

```properties
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=自己起的别名
MYAPP_RELEASE_STORE_PASSWORD=存储密码
MYAPP_RELEASE_KEY_PASSWORD=密钥
```

3、修改android/app/build.gradle文件，增加如下签名配置

```gradle
android { 
  signingConfigs { 
    release { 
        storeFile file(MYAPP_RELEASE_STORE_FILE) 
        storePassword MYAPP_RELEASE_STORE_PASSWORD 
        keyAlias MYAPP_RELEASE_KEY_ALIAS 
        keyPassword MYAPP_RELEASE_KEY_PASSWORD 
    } 
  }
  buildTypes { 
    release { 
      signingConfig signingConfigs.release 
    } 
  }
}
```

4、打包

```
// 在android/app/build/outputs/apk/文件夹中生产可以发布的app-release.apk文件
cd android
gradlew assembleRelease
```
