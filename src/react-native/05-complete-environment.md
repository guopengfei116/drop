# Complete Environment

前面我们使用的开发环境是简易的沙盒环境，开发好的 App 需要运行在 Expo 程序内，所以用户需要先安装 Expo。

如果想要应用独立运行，那么我们需要安装一套完整的原生环境，相对而言会繁琐很多。不同的操作系统，不同的目标运行平台，环境不同。

## 完整环境说明

目前移动App应用主要由 IOS 与 Android 两大生态构成，开发 IOS 必须要用 MacOS 操作系统，开发 Android 则不受限，MacOS、Windows、Linux 皆可以。

所以如果条件允许，使用 MacOS 操作系统开发 ReactNative 是最合适的。介于绝大部分人都有 Windows 系统设备，而无 MacOS 系统设备，所以这里先以 Windows 系统为基础搭建 Android 开发环境。

- [中文网参考文档] <https://reactnative.cn/docs/getting-started.html>
- Android(Windows)：Node8.3+、ReactNativeCli、Python2、JDK8、AndroidStudio
- Android(MaxOS)：Node8.3+、ReactNativeCli、JDK8、AndroidStudio、Watchman
- Android(Linux)：Node8.3+、ReactNativeCli、JDK8、AndroidStudio
- IOS(MaxOS)：Node8.3+、ReactNativeCli、Xcode9.4+、Watchman

### 安装注释事项

凡是安装开发环境，都需要注意以下几点，防止意外错误的发生：

- 安装的软件目录中不要出现**中文**与**特殊字符**，尤其是**空格**
- 计算机名称`(控制面板\所有控制面板项\系统中设置)`不要**中文**，改成**英文**，也不要**特殊字符**

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

## Node环境

如果已经安装过Node并且是使用安装包单独安装，那么先卸载掉，然后使用nvm进行安装，好处是可以动态切换Node版本以适应不同环境的需求，目前ReactNative需要至少8.0以上的Node版本。<br />

卸载Node的时候最好把npm缓存也一起清掉，清除缓存运行`npm cache clean --force`命令就可以，Windows用户也可以在用户目录下手动删除缓存文件夹`C:\Users\UserName\AppData\Roaming\npm-cache`。<br />

大多数情况下，如果遇到`Unexpected end of JSON input while parsing near`错误，都是因为安装的包与本地Node版本不符导致的，这时候清除缓存就可解决。<br />

### **nvm**

nvm是NodeJS的版本管理工具，使用它可以在本地安装多个不同版本的NodeJS，并根据需要动态切换。安装nvm之前，需要先卸载之前单独安装过的NodeJS，在控制面板中进行卸载即可。

下载

- [mac下载]<https://github.com/creationix/nvm/releases>
- [windows下载]<https://github.com/coreybutler/nvm-windows/releases>

安装说明

windows用户下载一键安装版本`nvm-setup.zip`, 解压后傻瓜式安装即可。<br />
安装过后，在命令行窗口运行`nvm version`命令进行检测，如果显示安装的版本号，即成功。<br />

- [参考文档]<https://www.jianshu.com/p/1d80cf35abd2>

配置淘宝镜像

为了提高nvm在国内的下载速度，最好修改源镜像下载地址。首先找到nvm的安装目录，编辑settings.txt文件，添加如下配置，含义是使用淘宝镜像下载64位的node或npm，如果是32位操作系统，那么arch设为32。<br />

- [参考文档]<https://www.jianshu.com/p/253cb9003411>

```txt
arch: 64
node_mirror: http://npm.taobao.org/mirrors/node/
npm_mirror: https://npm.taobao.org/mirrors/npm/
```

nvm常用命令

- nvm install      # 安装指定版本
- nvm uninstall    # 卸载指定版本
- nvm list         # 列出已安装的版本
- nvm use          # 版本切换
- nvm on           # 启用nvm
- nvm off          # 关闭nvm
- nvm root         # nvm安装路径

### **node**

nvm安装配置成功后，接下来安装node只需一条命令即可。安装完毕后，通过use命令切换到指定版本的node，最好是官方推荐的稳定版本。然后运行`node -v`命令进行检测，只要显示出你刚刚切换的node版本，就大功告成了。<br />

安装Node的时候，如果是开发使用，建议安装稳定版本，如果是为了尝试新特性无所谓，目前Node有个规范，奇数版本为实验版本，偶数版本为稳定版本，很多开源项目在版本号制定时都会参照这种方式，需要留意一下。<br />

- [nvm安装参考文档]<https://www.jianshu.com/p/28bca6529150>
- [node官方版本查阅]<https://nodejs.org/zh-cn/>

安装

```shell
# 安装官方推荐的稳定版本
nvm install 8.11.3
nvm use 8.11.3

# 安装最新的稳定版本，体验新特性
nvm install stable
nvm list
nvm use xxx
```

npm淘宝镜像配置

node安装后，npm就跟着一起被安装了，为了提供国内的下载速度，同样把npm的源镜像地址改为淘宝的，在命令行窗口中运行如下命令进行配置。<br />

- [参考文档]<https://www.jianshu.com/p/253cb9003411>

```shell
# 配置
npm config set registry https://registry.npm.taobao.org
npm config set disturl https://npm.taobao.org/dist

# 检测
npm config get registry
npm config get disturl
```

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

## Yarn 与 React Native Cli

Yarn 是 Facebook 公司开发的用以替代 npm 的包管理工具，可以提供更快的下载速度和更优的管理方式。ReactNativeCli 则用于执行创建、初始化、更新项目、运行打包服务（packager）等任务。<br />

安装

```shell
npm install -g yarn react-native-cli

# 检测
yarn -v
react-native -v
```

镜像配置

```shell
yarn config set registry https://registry.npm.taobao.org --global
yarn config set disturl https://npm.taobao.org/dist --global

# 检测
yarn config get registry
yarn config get disturl
```

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

## Python2

需要注意，RN目前只支持`python2.x`版本，安装了3.x版本的需要更换。在安装python时，注意安装界面上的 `Add Python to path`选项, 勾选上会自动将Python配置到环境变量，否则需要手动配置。<br />

- ![Add Python to path](https://github.com/guopengfei116/drop/blob/master/img/react-native/python.png?raw=true)
- 安装完毕后, 在命令行中键入 `python --version` 进行测试，显示出版本号即成功

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

## Java

如果使用 Android 系统开发测试，那么需要安装 `Java SE Development Kit (JDK)`，安装后需要手动配置环境变量。打开`控制面板 -> 系统和安全 -> 系统 -> 高级系统设置 -> 高级 -> 环境变量 -> 新建`。环境变量配置后，需要关闭现有的命令行工具然后重新打开，新的环境变量才会生效。

- [下载页面]<http://www.oracle.com/technetwork/java/javase/downloads/index.html>
- [环境变量配置参考文档]<https://jingyan.baidu.com/article/d45ad148ba5ab169552b80d3.html>

```shell
# 1. 创建 JAVA_HOME 环境变量，值为 jdk 的安装根路径，默认 C:\Program Files\Java\jdk1.8.0_112
# 2. 编辑 Path 环境变量，在 Path 中加入 %JAVA_HOME%\bin;%JAVA_HOME%\jre\bin，如果是Win10一个一个添加即可
# 3. 创建 CLASSPATH 变量, 值为 .;%JAVA_HOME%\lib\dt.jar;%JAVA_HOME%\lib\tools.jar
# 4. 配置完毕后保存并退出, 然后运行下面命令进行检测
java -version
javac -version
```

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

## Android Studio

Android Studio 是谷歌推出的 Android 集成开发工具，我们要使用它安装管理 Android SDK 以及官方的模拟器。

在安装时需要确定所有安装都勾选了，尤其是 Android SDK 和 Android Device Emulator。

在初步安装完成后，选择 Custom 进行自定义安装。其中 Androoid SDK Location 目录可以选择一个剩余空间比较大的磁盘存放，建议至少留有10G。

### 安装

- ![Custom](https://reactnative.cn/static/docs/0.51/img/react-native-android-studio-custom-install-windows.png)

- ![setup](https://reactnative.cn/static/docs/0.51/img/react-native-android-studio-verify-installs-windows.png)

安装完成后，在Android Studio的欢迎界面中选择Configure | SDK Manager。

- ![welcome](https://reactnative.cn/static/docs/0.51/img/react-native-android-studio-configure-sdk-windows.png)

在SDK Platforms窗口中，选择Show Package Details，然后在Android 6.0 (Marshmallow)中勾选Google APIs、Android SDK Platform 23、Intel x86 Atom System Image、Intel x86 Atom_64 System Image以及Google APIs Intel x86 Atom_64 System Image。

- ![SDK platforms](https://reactnative.cn/static/docs/0.51/img/react-native-android-studio-android-sdk-platforms-windows.png)

在SDK Tools窗口中，选择Show Package Details，然后在Android SDK Build Tools中勾选Android SDK Build-Tools 23.0.1（必须包含有这个版本。当然如果其他插件需要其他版本，你可以同时安装其他多个版本）。然后还要勾选最底部的Android Support Repository.

- ![SDK tools](https://reactnative.cn/static/docs/0.51/img/react-native-android-studio-android-sdk-build-tools-windows.png)

### 配置环境变量

通过 Android Studio 安装的 SDK 路径，需要配置到 ANDROID_HOME 环境变量中。

![ANDROID_HOME](https://reactnative.cn/static/docs/0.51/img/react-native-android-sdk-environment-variable-windows.png)

还可以把Android SDK的tools和platform-tools目录添加到PATH变量中，这样就可以在终端中运行一些Android工具，例如adb devices或android avd等。

![path](https://reactnative.cn/static/docs/0.51/img/react-native-android-tools-environment-variable-windows.png)

### adb工具

adb安装在Android-sdk路径下的platform-tools目录，这个工具是电脑与Android设备进行通信的通用命令行工具，有几个常用命令需要了解，将来打包调试的时候需要保证本机的adb版本需要与模拟器的adb一致，如果不一致可以复制本机的adb.ext然后覆盖掉模拟器中的版本。

- adb version        # 版本
- adb devices        # 列出连接到本机的Android设备与状态
- adb start-server  # 启动adb服务
- adb kill-server    # 关闭adb服务

```shell
adb version
// 第一行显示的信息：Android Debug Bridge version 1.0.40
// 其中40就代表adb的版本，将来可能把copy这个版本的adb工具覆盖掉模拟器版本
```

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

## 环境测试

### 启动模拟器

- 启动模拟器，运行adb devices命令，查看设备是否正常连接，
- 如果提示adb版本不符合，那么就需要把本地Android-sdk目录下的adb.ext复制到模拟器目录下的bin中，进行覆盖。然后重启模拟器进行尝试。

```shell
// 连接正常的话会显示设备信息或地址信息，如：127.0.0.1:62001 device
adb devices

// 如果没有发现设备，那么需要手动进行连接，夜神模拟器端口62001，MUMU模拟器端口7555
adb connect 127.0.0.1:7555
```

### 创建项目

创建项目的时候，保证项目所在目录没有中文与空格，然后运行命令创建项目，创建的过程中需要联网下载依赖包，需要耐心等待。

```shell
# 创建项目，项目名称自由定义
react-native init projectName
```

### 启动js打包服务

- 在项目目录下运行`yarn start`命令，默认会启动一个`8081`端口的js打包传输服务，它的作用是向移动设备提供项目最新的打包生成的bundle.js文件，每当代码变更时，该服务就会重新打包js并推送给客户端使用。
- **注意**：因为8081端口已经被adb工具占用了，所以我们需要手动换一个端口好。

**端口检测**

```shell
// 查看8081端口占用情况与pid
netstat -aon | findstr 8081

// 通过pid查阅程序名称，即可知道是谁占用了8081端口
tasklist | findstr 上条命令得到的pid
```

**启动服务**

```shell
// 切入项目目录
cd projectName

// 启动服务，并指定端口
yarn start --prot 8888
```

**服务检测**

服务启动之后，我们可以通过浏览器测试js是否可以正常得到，url如下：
`http://192.168.12.1:9999/index.bundle?platform=android`

### app安装与运行

- 在项目目录下运行`react-native run-android`命令便会打包`android`项目, 生成`apk`文件, 然后自动安装到Android设备并运行。

```shell
react-native run-android
// 最后看到BUILD SUCCESSFUL提示就代表打包成功
```

接下来设备会自动启动应用，如果显示如下界面就代表一切正常可以开发调试了。<br />
![成功运行](https://github.com/guopengfei116/drop/blob/master/img/react-native/react_welcome.png?raw=true)

打包中途打包失败了，记得看提示信息，可能是网络问题，一般会提示timed out，那么重拾或者找个网络环境好的，手机热点也可以。

![timed out](https://github.com/guopengfei116/drop/blob/master/img/react-native/bundle_error_timeout.jpg?raw=true)

也可能会提示找不到android-sdk目录，那么需要手动创建一个配置文件放置到projectName/android/local.properties。

```properties
# 配置sdk所在目录
sdk.dir=G:\\Android-sdk
```

### 开启悬浮框权限

在开发中可能会需要调出调试菜单，为了菜单能够正常弹出，需要开启悬浮框权限。

具体操作：在`设置` => `授权管理` => `应用权限管理` 中找到应用 App, 然后开启悬浮框权限。

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

## 开发初体验

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

**根组件代码解读**

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

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

## 真机运行

### 创建项目

- 使用`命令行`工具切入一个`目录`, 保证该目录及整个`路径`中没有任何`中文`字符串
- 然后运行 `react-native init project-name` 命令初始化一个 `React-Native` 项目
- 创建时过程中需要联网`下载`依赖包, 所以可能比较慢, 建议设置 `npm 或 yarn` 为国内镜像源

### 初始打包

- 运行 `cd project-name` 命令进入`项目`根目录
- 然后运行 `react-native run-android` 命令
- 该命令首先在本地启动一个端口`8081`的本地`服务器`, 用于向移动设备提供最新的项目打包生成的 `js` 文件
- 其次命令会打包 `android` 项目, 生成 `apk` 文件, 如果有移动设备连接了电脑, 还会自动帮你`安装`

### app手动安装

打包后的 `apk` 安装包, 可以在项目中找到，路径为 `projecrName/android/app/build/outputs/apk`，这个apk安装包可以手动安装到其它模拟器或真机中进行开发调试。

如果没有设备连接电脑, 或自动安装失败, 可自行把 `apk` 文件`拷贝`到手机存储器, 然后手动`安装`。

### app权限设置

在开发中可能会需要调出调试菜单，为了菜单能够正常弹出，需要开启悬浮框权限。

具体操作：在`设置` => `授权管理` => `应用权限管理` 中找到应用 App, 然后开启悬浮框权限。

有些手机需要关闭优化，比如 MIUI 系统手机需要进入开发者模式，关闭"MIUI优化"。

### 连接方式

手机直连

- 准备一台Android手机, 通过数据线连接到电脑，设置启用USB调试
- 一般的手机在设置中可以直接找到开发者选项进行开启, 部分手机开启的位置可能不同，根据需要自行百度一下
- 手机连接成功后运行检测命令adb devices,如果有输出设备列表与ID相关的字符串就证明连接成功了
- 附录: 小米手机开启USB调试步骤
    + 首先进入`设置` => `我的设备` => `全部参数` => 连续`点击`MUI版本3次以上
    + 然后重新进入`设置` => `更多设置` => `开发者选项`(在无障碍下面) => 找到`USB调试`点击开启
    + 最后需要拉到底部找到`启用 MUI 优化`, 关掉重启

![usb调试](https://github.com/guopengfei116/drop/blob/master/img/react-native/usb_debug.png?raw=true)

局域网连接

- 移动设备除了通过 `USB` 直连电脑调试开发, 还可以采用`无线`的方式进行调试
- 只要保证手机和电脑在同一个`局域网`, 然后摇一摇唤出调试菜单
- 点击 `Dev settings` => `Debuug server host` , 配置本地 `IP` 地址和端口号 `8081` 即可
- 如果出现这个`错误`提示, 说明配置错了: `could not connect to development server`
- ![摇一摇弹出框](img/react_debug_server.png)

### 测试运行

- App 权限设置完毕后, 关掉重新启动, 便会看到一个`欢迎`界面
- ![欢迎页面](https://github.com/guopengfei116/drop/blob/master/img/react-native/react_welcome.png?raw=true)
- 也可以`摇一摇`手机, 唤起调试菜单, 点击第一个选项 `Reload`重新加载 `js` 执行
- ![摇一摇弹出框](https://github.com/guopengfei116/drop/blob/master/img/react-native/react_yaoyiyao.png?raw=true)

## 常见打包失败问题

- 参考资料 <http://www.open-open.com/lib/view/open1477469117948.html>
- 参考资料 <http://reactnative.cn/docs/0.50/running-on-device-android.html#content>

### 无法获取桥接

- 提示: `Could not get BatchedBridge, make sure your bundle is packaged correctly`
- 确保 `android/app/src/main/` 目录下有 `assets` 文件夹, 如果没有, 手动创建一个
- 然后在命令行工具中切入到项目根目录
- 执行命令: `react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/`

### 缺少许可

- **Windows脚本**
    + `mkdir "%ANDROID_HOME%\licenses"`
    + `echo |set /p="8933bad161af4178b1185d1a37fbf41ea5269c55" > "%ANDROID_HOME%\licenses\android-sdk-license"`
- **Linux脚本**
    + `mkdir "$ANDROID_HOME/licenses"`
    + `echo -e "\n8933bad161af4178b1185d1a37fbf41ea5269c55" > "$ANDROID_HOME/licenses/android-sdk-license"`
![缺少许可截图与解决方案](https://github.com/guopengfei116/drop/blob/master/img/react-native/bundle_error_license.png?raw=true)

### 连接超时

![连接超时截图与解决方案](https://github.com/guopengfei116/drop/blob/master/img/react-native/bundle_error_timeout.jpg?raw=true)

### 后续开发项目启动

- 之前运行 `react-native run-android` 打包命令的时候会自动启动一个本地`服务器`用于更新 js 代码
- 如果是项目的`后续`开发, 我们只需单独运行 `react-native start` 命令重新启动`服务器`即可
- 只要启动了, 我们就可以修改 `web` 代码, 将来移动设备 `Reload` 新代码即可预览最新效果

### 调试菜单说明

- Reload: 重新加载整个页面
- Debug JS Remotely: 启动远程调试, 会自动打开chrome浏览器, 然后可在开发者工具中调试js
- Enable Live Reload: 开启自动加载, 代码变动会自动更新整个页面
- Enable Hot Reloading: 热更新, 代码变动自动的进行局部更新
- Show Perf Monitor: 打开性能监控，可查看UI与JS运行性能
- Dev Sttings: 开发调试配置
