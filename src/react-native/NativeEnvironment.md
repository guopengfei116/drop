# NativeEnvironment

凡是安装开发环境，都需要注意以下几点，防止意外错误的发生：

- 安装的软件目录中不要出现**中文**与**特殊字符**，尤其是**空格**
- 计算机名称`(控制面板\所有控制面板项\系统中设置)`不要**中文**，改成**英文**，也不要**特殊字符**
- 因为这些环境都依赖我们的操作系统，如果系统是被优化阉割的版本可能会安装失败

## 环境预览

- [参照文档] <http://reactnative.cn/docs/0.42/getting-started.html>
- ![预览](https://github.com/guopengfei116/drop/blob/master/img/react-native/environment_config.png?raw=true)

## Node环境

- - - - - -

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

## React-Native快速开发环境

学习使用React-Native最令人头疼的就是环境问题，因为大多数web开发者，并不熟悉Android与IOS的开发环境，配置起来也比较繁琐，同时Android程序员也不熟悉IOS环境，IOS程序员也不熟悉Android环境，导致了很多人因为环境而放弃学习，为了解决这个问题，所以产生了所谓的快速开发环境。

### **create-react-native-app**

这是目前官网推荐的React-Native开发工具，特点是无需配置繁杂的Android或IOS开发环境便可进行RN原生应用的开发，简化了环境搭建与配置，非常方便，很适合新人和拥有多台办公设备的程序员使用。

- [参考文档]<https://facebook.github.io/react-native/docs/getting-started.html>

安装

```shell
# 安装
npm install -g create-react-native-app

# 检测
create-react-native-app --version
```

### **模拟器**

有了开发环还需要一款手机作为运行环境，除了使用真机外，还可以使用模拟器软件进行替代。Window平台下官方推荐使用一款叫Genymotion的Android模拟器，该模拟器依赖VirtualBox虚拟机，需要创建账号登陆后才能使用，除此以外也可以使用国内模拟器，国内模拟器比较多，有夜神、雷电、MuMu等。<br />

- [Genymotion]<https://www.genymotion.com/>
- [夜神]<https://www.yeshen.com/>
- [雷电]<https://www.yeshen.com/>
- [MuMu]<http://mumu.163.com/baidu/>

### **开发调试**

开发环境`create-react-native-app`与运行环境`真机或模拟器`准备好之后，就可以开始RN开发了。首先打开模拟器，然后通过下面的命令创建并运行项目，CRNA会自动在模拟器中安装Expo软件，并在此APP中运行我们的项目，这种方式有点类似与微信小程序，即我们的应用运行在一个APP容器中。<br />

```shell
# 项目创建与运行
create-react-native-app projectName
cd projectName
npm start
```

除了使用模拟器外，也可以通过真机运行应用，但是需要先手动去Google或Apple应用商店下载Expo软件，然后应用软件的扫一扫功能，扫描npm start执行后显示的巨大二维码即可，前提条件是必须保证真机与URL在同一局域网内才可以正常打开。<br />

### **错误提示(红屏和黄屏)**

RN代码运行时会把错误分为红屏和黄屏两种，红屏会以全屏红色显示在应用中，导致程序无法正常运行，红屏通常是编码错误导致的，必须修复。<br />
黄屏代表警告，会显示在应用下方，不影响程序运行，不修复也可以，警告可以通过代码禁止。<br />
红屏和黄屏只在debug版本中才会显示，在rellease版本中不会。一般情况下，通过RN红屏中的错误提示信息，就可以定位问题，如果是语法等常见运行错误，RN也会给出错误代码所在位置与行数，所以出现红屏一定要阅读描述信息。<br />

```javascript
// 频闭黄色警告，参数为一个数组：数组中的字符串就是要屏蔽的警告的开头的内容。
YellowBox.ignoreWarnings(['Warning: ']);

// 手动触发红屏和警告
console.error("严重错误");
console.warn("警告");
```

### **调试菜单**

React-Native开发调试没有本地代码方便，但也是可以调的，在调试菜单中可以进行开发调试相关的配置。调试菜单只在debug版本中可以被调出，如果是模拟器环境，Windows平台按window+m可调出，Mac平台按commond+m可调出，如果是真机，摇一摇就可以调出调试菜单。<br />

![调试菜单预览](https://note.youdao.com/yws/public/resource/6a301213468716d4d839ca93f6b26025/xmlnote/5F7D6A3BB20945BE8C521606F0DD0C76/6915)

## React-Native开发与打包环境

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
- [环境变量配置参考文档]<http://jingyan.baidu.com/article/f96699bb8b38e0894e3c1bef.html>

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

### **开发步骤**

#### 模拟器

启动模拟器，运行adb devices命令，查看设备是否正常连接，如果提示adb版本不符合，那么就需要把本地Android-sdk目录下的adb.ext复制到模拟器目录下的bin中，进行覆盖。然后重启模拟器进行尝试。

```shell
adb devices
// 连接正常的话会显示设备信息或地址信息，如：127.0.0.1:62001 device
```

#### 创建项目

使用`命令行`工具切入一个`目录`, 保证该目录及整个`路径`中没有任何`中文`字符串，然后运行 `react-native init project-name` 命令初始化一个 `React-Native` 项目，创建时过程中需要联网`下载`依赖包，耐心等待

```shell
# 创建项目
react-native init projectName
```

#### 启动服务

在项目目录下运行`npm start`命令，在本地启动一个端口`8081`的服务器, 它的作用是向移动设备提供项目最新的打包生成的bundle.js文件，每当代码变更时，该服务就会重新打包js并推送给客户端使用。

```shell
cd projectName
npm start
```

#### 打包运行

在项目目录下运行 `react-native run-android` 命令便会打包 `android` 项目, 生成 `apk` 文件, 然后自动安装到Android设备并运行。打包后的 `apk` 安装包, 可以在项目中找到，路径为 `projecrName/android/app/build/outputs/apk`，这个apk安装包可以手动安装到其它模拟器或真机中进行开发调试。

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

#### 真机运行

真机可以手动安装apk开发调试或者通过usb接口连接本机调试，但是需要USB启用调试模式，并通过命令 `adb devices`检测设备是否正常连接。<br />
另外应用在运行可能还需要`悬浮框`权限，可在`设置` => `授权管理` => `应用权限管理` 中找到对应的 APP , 然后`开启`悬浮框权限。<br />

![usb调试](https://github.com/guopengfei116/drop/blob/master/img/react-native/usb_debug.png?raw=true)

局域网连接

- 移动设备除了通过 `USB` 直连电脑调试开发, 还可以采用`无线`的方式进行调试
- 只要保证手机和电脑在同一个`局域网`, 然后摇一摇唤出调试菜单
- 点击 `Dev settings` => `Debuug server host` , 配置本地 `IP` 地址和端口号 `8081` 即可
- 如果出现这个`错误`提示, 说明配置错了: `could not connect to development server`
- ![摇一摇弹出框](img/react_debug_server.png)

调试菜单说明

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
