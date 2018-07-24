# React Native Enviroment

前面我们使用的开发方式是进化过的方式，简述步骤就是，先安装一个Expo应用程序，然后使用扫一扫功能在Expo内运行我们的App，偏向传统的前端开发方式。<br />
这在之前，React Native采用的开发方式是先把写好的项目打包编译成一个独立App，然后直接安装到手机上运行，偏向传统的Native开发方式。

**环境预览**

- [参照文档] <http://reactnative.cn/docs/0.42/getting-started.html>
- ![预览](https://github.com/guopengfei116/drop/blob/master/img/react-native/environment_config.png?raw=true)

- - - - - - - - - - - - - - - - - - - - 

## 环境安装

### **Yarn与React-Native-Cli**

Yarn是Facebook提供的替代npm的工具，可以加速node模块的下载。React Native的命令行工具用于执行创建、初始化、更新项目、运行打包服务（packager）等任务。<br />

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

### **Python2**

需要注意，RN目前只支持`python2.x`版本，安装了3.x版本的需要更换。在安装python时，注意安装界面上的 `Add Python to path`选项, 勾选上会自动将Python配置到环境变量，否则需要手动配置。<br />

- ![Add Python to path](https://github.com/guopengfei116/drop/blob/master/img/react-native/python.png?raw=true)
- 安装完毕后, 在命令行中键入 `python --version` 进行测试，显示出版本号即成功

### **Java**

如果使用Android系统开发测试，那么需要安装 Java SE Development Kit (JDK)，安装后需要手动配置环境变量。打开控制面板 -> 系统和安全 -> 系统 -> 高级系统设置 -> 高级 -> 环境变量 -> 新建。环境变量配置后，需要关闭现有的命令行工具然后重新打开，新的环境变量才会生效。

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

### **Android Studio**

Android Studio是谷歌推出的Android集成开发工具，其包含了运行和测试React Native应用所需的Android SDK和模拟器。<br />
在安装时需要确定所有安装都勾选了，尤其是Android SDK和Android Device Emulator。在初步安装完成后，选择Custom进行自定义安装。其中Androoid SDK Location目录可以选择一个剩余空间比较大的磁盘存放，建议至少留有10G。<br />

#### **安装**

- ![Custom](https://reactnative.cn/static/docs/0.51/img/react-native-android-studio-custom-install-windows.png)
- ![setup](https://reactnative.cn/static/docs/0.51/img/react-native-android-studio-verify-installs-windows.png)

安装完成后，在Android Studio的欢迎界面中选择Configure | SDK Manager。

- ![welcome](https://reactnative.cn/static/docs/0.51/img/react-native-android-studio-configure-sdk-windows.png)

在SDK Platforms窗口中，选择Show Package Details，然后在Android 6.0 (Marshmallow)中勾选Google APIs、Android SDK Platform 23、Intel x86 Atom System Image、Intel x86 Atom_64 System Image以及Google APIs Intel x86 Atom_64 System Image。

- ![SDK platforms](https://reactnative.cn/static/docs/0.51/img/react-native-android-studio-android-sdk-platforms-windows.png)

在SDK Tools窗口中，选择Show Package Details，然后在Android SDK Build Tools中勾选Android SDK Build-Tools 23.0.1（必须包含有这个版本。当然如果其他插件需要其他版本，你可以同时安装其他多个版本）。然后还要勾选最底部的Android Support Repository.

- ![SDK tools](https://reactnative.cn/static/docs/0.51/img/react-native-android-studio-android-sdk-build-tools-windows.png)

#### **配置环境变量**

通过Android Studio安装的SDK路径，需要配置到ANDROID_HOME环境变量中。

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

- - - - - - - - - - - - - - - - - - - - 

## **开发方式**

### 启动模拟器

- 启动模拟器，运行adb devices命令，查看设备是否正常连接，
- 如果提示adb版本不符合，那么就需要把本地Android-sdk目录下的adb.ext复制到模拟器目录下的bin中，进行覆盖。然后重启模拟器进行尝试。

```shell
adb devices
// 连接正常的话会显示设备信息或地址信息，如：127.0.0.1:62001 device
```

### 创建项目

- 使用`命令行`工具切入一个`目录`, 保证该目录及整个`路径`中没有任何`中文`字符串，然后运行 `react-native init project-name` 命令初始化一个 `React-Native` 项目，创建时过程中需要联网`下载`依赖包，耐心等待

```shell
# 创建项目
react-native init projectName
```

### 启动js打包服务

- 在项目目录下运行`npm start`命令，在本地启动一个端口`8081`的服务器, 
- 它的作用是向移动设备提供项目最新的打包生成的bundle.js文件，每当代码变更时，该服务就会重新打包js并推送给客户端使用。

```shell
cd projectName
npm start
```

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

- - - - - - - - - - - - - - - - - - - - 

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

- - - - - - - - - - - - - - - - - - - - 

## 真机调试

### app手动安装

- 打包后的 `apk` 安装包, 可以在项目中找到，路径为 `projecrName/android/app/build/outputs/apk`，这个apk安装包可以手动安装到其它模拟器或真机中进行开发调试。
- 如果自动安装失败, 可自行把apk文件拷贝到手机存储器, 然后手动安装。

### app权限设置

- app运行时需要`悬浮框`权限，可在`设置` => `授权管理` => `应用权限管理` 中找到对应的 APP , 然后`开启`悬浮框权限。<br />

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

- - - - - - - - - - - - - - - - - - - - 

## 旧版环境安装，备份保留

### **注册事项**
- 安装的目录结构中`不要`出现`中文`与`特殊字符`
- 如果`计算机`名称是中文改成`英文`
- 因为这些环境都依赖我们的操作系统，如果系统是被优化阉割的版本可能会安装失败

### **环境预览**

- 参照文档 <http://reactnative.cn/docs/0.42/getting-started.html>
- ![预览](https://github.com/guopengfei116/drop/blob/master/img/react-native/environment_config.png?raw=true)

### **Node环境**

- 下载最新的长期`稳定版本`<https://nodejs.org/en/>
- 安装完毕后，在命令行中键入 `node -v` 进行测试，显示出版本号即成功
- 在国内的话如有需要可以`修改` npm 的`下载地址`, 或在下载包的时候临时指定
    + `npm config set registry https://registry.npm.taobao.org -g`
    + `npm config set disturl https://npm.taobao.org/dist -g`

### **React-Native-Cli与Yarn**

- `Yarn` 是 `Facebook` 推出的`包管理`工具, 可以加速 node 模块的下载, `React-Native` 脚手架安装包的时候会使用
- `React-Native-Cli` 是一款命令行工具, 用于 `React-Native` 项目的创建、初始化、更新、运行与打包
- 安装命令: `npm install yarn react-native-cli -g`
- 测试命令: `yarn -v` `react-native -v`
- 安装完毕后可以设置 `Yarn` 安装模块的`镜像`地址
    + `yarn config set registry https://registry.npm.taobao.org -g`
    + `yarn config set disturl https://npm.taobao.org/dist -g`

### **Python环境**

- 安装 `2.×` 的版本的 `python`, 安装时注意勾选安装界面上的 `Add Python to path`, 自动将Python添加到`环境变量`
- 安装完毕后, 在命令行中键入 `python --version` 进行测试，显示出版本号即成功
![预览](https://github.com/guopengfei116/drop/blob/master/img/react-native/python.png?raw=true)

### **Java环境**

- 下载1.8版本JDK, <http://www.oracle.com/technetwork/java/javase/overview/index.html>
- 安装完毕后, 需要手动配置环境变量<http://jingyan.baidu.com/article/f96699bb8b38e0894e3c1bef.html>
    1. 系统环境变量中新增 `JAVA_HOME` 变量，值为 `C:\Program Files\Java\jdk1.8.0_112`, 即 jdk 的`安装`根路径
    2. 修改系统环境变量 `Path`, 在 Path 之后新增 `%JAVA_HOME%\bin;%JAVA_HOME%\jre\bin`
    3. 新增 `CLASSPATH` 变量, 值为 `.;%JAVA_HOME%\lib\dt.jar;%JAVA_HOME%\lib\tools.jar`
    4. 配置完毕后保存并退出, 在命令行中分别键入`java` 与 `javac` 进行测试, 出现命令选项即配置成功

### **Android环境**

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

### 创建项目

- 使用`命令行`工具切入一个`目录`, 保证该目录及整个`路径`中没有任何`中文`字符串
- 然后运行 `react-native init project-name` 命令初始化一个 `React-Native` 项目
- 创建时过程中需要联网`下载`依赖包, 所以可能比较慢, 建议设置 `npm 或 yarn` 为国内镜像源

### 初始打包

- 运行 `cd project-name` 命令进入`项目`根目录
- 然后运行 `react-native run-android` 命令
- 该命令首先在本地启动一个端口`8081`的本地`服务器`, 用于向移动设备提供最新的项目打包生成的 `js` 文件
- 其次命令会打包 `android` 项目, 生成 `apk` 文件, 如果有移动设备连接了电脑, 还会自动帮你`安装`

### 手动安装

- 打包好的 `apk` 安装包, 被放置到了 `/android/app/build/outputs/apk` 目录下
- 如果没有设备连接电脑, 或自动安装失败, 可自行把 `apk` 文件`拷贝`到手机存储器, 然后手动`安装`

### 设置App权限

- `App` 安装完毕要后`执行`, 需要确保其拥有`悬浮框`权限
- 可在`设置` => `授权管理` => `应用权限管理` 中找到对应的 APP , 然后`开启`悬浮框权限
- 有些手机需要关闭优化，比如MIUI系统手机需要进入开发者模式，关闭 “MIUI优化”

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

- - - - - - - - - - - - - - - - - - - - 

## 开发

### 启动本地服务器

- 之前运行 `react-native run-android` 打包命令的时候会自动启动一个本地`服务器`用于更新 js 代码
- 如果是项目的`后续`开发, 我们只需单独运行 `react-native start` 命令重新启动`服务器`即可
- 只要启动了, 我们就可以修改 `web` 代码, 将来移动设备 `Reload` 新代码即可预览最新效果

### 设备直连

1. 准备一台 `Android` 手机, 通过数据线`连接`到电脑，设置启用`USB调试`
2. 一般的手机在`设置`中可以直接找到`开发者选项`进行开启, 如果`找不到`, 就自行百度查一下
3. 手机连接成功后运行检测命令 `adb devices` , 如果有输出设备列表与 `ID` 相关的字符串就证明连接成功了
![调试模式](https://github.com/guopengfei116/drop/blob/master/img/react-native/usb_debug.png?raw=true)
![查看连接设备](https://github.com/guopengfei116/drop/blob/master/img/react-native/adb_devices.png?raw=true)
4. 附录: 小米手机开启USB调试步骤
    + 首先进入`设置` => `我的设备` => `全部参数` => 连续`点击`MUI版本3次以上
    + 然后重新进入`设置` => `更多设置` => `开发者选项`(在无障碍下面) => 找到`USB调试`点击开启
    + 最后需要拉到底部找到`启用 MUI 优化`, 关掉重启

### 局域网连接

- 移动设备除了通过 `USB` 直连电脑调试开发, 还可以采用`无线`的方式进行调试
- 只要保证手机和电脑在同一个`局域网`, 然后摇一摇唤出调试菜单
- 点击 `Dev settings` => `Debuug server host` , 配置本地 `IP` 地址和端口号 `8081` 即可
- 如果出现这个`错误`提示, 说明配置错了: `could not connect to development server`
- ![摇一摇弹出框](https://github.com/guopengfei116/drop/blob/master/img/react-native/react_debug_server.png?raw=true)

### 调试菜单说明

- Reload: 重新加载整个页面
- Debug JS Remotely: 启动远程调试, 会自动打开chrome浏览器, 然后可在开发者工具中调试js
- Enable Live Reload: 开启自动加载, 代码变动会自动更新整个页面
- Enable Hot Reloading: 热更新, 代码变动自动的进行局部更新
- Show Perf Monitor: 打开性能监控，可查看UI与JS运行性能
- Dev Sttings: 开发调试配置

- - - - - - - - - - - - - - - - - - - - 

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
