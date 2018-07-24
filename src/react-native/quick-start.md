# Quick Start

## 环境安装说明

凡是安装开发环境，都需要注意以下几点，防止意外错误的发生：

- 安装的软件目录中不要出现**中文**与**特殊字符**，尤其是**空格**
- 计算机名称`(控制面板\所有控制面板项\系统中设置)`不要**中文**，改成**英文**，也不要**特殊字符**

- - - - - - - - - - - - - - - - - - - - - - - -

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

- - - - - - - - - - - - - - - - - - - - - - - -

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

- - - - - - - - - - - - - - - - - - - - - - - -

## 开发方式

### **模拟器开发调试**

开发环境`create-react-native-app`与运行环境`模拟器`准备好之后，就可以开始RN开发了。首先打开模拟器，然后通过下面的命令创建并运行项目，CRNA会自动在模拟器中安装Expo软件，并在此APP中运行我们的项目，这种方式有点类似与微信小程序，即我们的项目最终是运行在一个叫Expo的App当中。<br />

```shell
# 项目创建与运行
create-react-native-app projectName
cd projectName
yarn start
```

### **真机开发调试**

除了使用模拟器外，也可以通过真机运行应用，但是需要先手动去Google或Apple应用商店下载Expo软件，然后应用软件的扫一扫功能，扫描npm start执行后显示的巨大二维码即可，前提条件是必须保证真机与URL在同一局域网内才可以正常打开。<br />

因为本机可能会有多个ip地址，比如以太网IP、无线局域网IP等等，那么npm start命令启动时通常无脑的选择第一个，假如选择了以太网IP，那么就与wifi连接的手机不在同一局域网，比如下面的情况，最终使用的是第一个94端IP。<br />

- ![ipconfig]](https://github.com/guopengfei116/drop/blob/master/img/react-native/ipconfig.png?raw=true)
- ![expo-service]](https://github.com/guopengfei116/drop/blob/master/img/react-native/expo_service.png?raw=true)

遇到这种情况，可以通过设置REACT_NATIVE_PACKAGER_HOSTNAME环境变量，手动配置IP地址：在cmd窗口中运行如下命令

```dos
set REACT_NATIVE_PACKAGER_HOSTNAME=ip地址
```

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

调试菜单说明

- Reload: 重新加载整个页面
- Debug JS Remotely: 启动远程调试, 会自动打开chrome浏览器, 然后可在开发者工具中调试js
- Enable Live Reload: 开启自动加载, 代码变动会自动更新整个页面
- Enable Hot Reloading: 热更新, 代码变动自动的进行局部更新
- Dev Sttings: 开发调试配置

- - - - - - - - - - - - - - - - - - - - - - - -

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

- - - - - - - - - - - - - - - - - - - - - - - -

## 内置组件

- 在 `React Native` 中你需要使用官方提供的`组件`进行应用构建
- 因为是开发`原生`应用, 我们的代码最终会`转为`原生组件的方式渲染, 所以你不会看到任何以 `html` 标签命名的组件
- [官方文档]<https://facebook.github.io/react-native/docs/getting-started>

### View

- 视图容器，作用相当于 `html` 的 `div` 标签，它是创建UI所需的最基础组件，支持Flexbox布局、样式、触摸事件，它可以放到其它视图中，也可以包含任意多个任意子视图。
- <http://reactnative.cn/docs/0.50/view.html#content>

```jsx
import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

export default class ViewTest extends Component {
    render() {
        return (
            {/* View标签相当于div，可以嵌套 */}
            <View style={style.container}>
                <View>
                    <Text>React Native</Text>
                </View>
                <View>
                    <Text>使用React编写</Text>
                    <Text>使用JSX编写</Text>
                </View>
            </View>
        );
    }
}

// 注意border、background等样式不能简写，必须一个一个的设置属性
let style = StyleSheet.create({
    container: {
        width: 300,
        padding: 10,
        borderStyle: "dashed",
        borderWidth: 2,
        borderColor: "red",
        borderRadius: 2,
    },
    text: {
        fontSize: 20,
        color: "yellow",
    }
});
```

### Text

- 文本容器，作用相当于 `html` 的 `span` 标签，为什么不是 `p` 标签呢，一会演示。Text标签支持嵌套、触摸事件。在RN中，文本必须放置到Text中才可以被渲染，否则报错。
- 注意: 除了Text外, 别的组件内都不能包含文本
- <http://reactnative.cn/docs/0.50/text.html#content>

文本布局

Text采用的是文本布局，多个子文本在渲染时会折叠合并在一起，如果把View理解成块级元素，那么Text就可以理解为行内元素。<br />

```jsx
import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

export default class TextTest extends Component {
    render() {
        return (
            // 可以嵌套
            <Text>
                {/* 文本节点是span版本的p标签，行内元素，下面文字会合并在一行 */}
                <Text>饿了吗</Text>
                <Text>美图</Text>
            </Text>
        );
    }
}
```

**文本样式**

在RN中，父文本的样式可以传递给后代文本，也就是样式继承。但是除了文本之外其它组件都无法继承样式。<br />

```jsx
render() {
    return (
        <Text style={style.rootText}>
            <Text>饿了吗</Text>
            <Text>美图</Text>
            {/* 文本样式继承 */}
            <Text>
                <Text>滴滴外卖</Text>
            </Text>
        </Text>
    );
}

let style = StyleSheet.create({
    rootText: {
        fontSize: 20,
        color: "blue",
        lineHeight: 24
    }
});
```

### Image

- 作用相当于 `html` 的 `img` 标签用于承载图片
- 组件通过 `source` 属性设置图片地址
- <http://reactnative.cn/docs/0.50/images.html#content>
- <http://reactnative.cn/docs/0.50/image.html#content>

#### 载入本地图片

- 本地图片通过`require`方法导入
- 之前的版本中require方法必须传入`静态字符串`，不能使用表达式和字符串拼接, 也就是写死，同时图片名称也不允许以`数字`开头，现在的新版本已经修复了这两个bug

```jsx
import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';

export default class ImageTest extends Component {
    render() {
        let pic = {
            uri: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=645293140,2005760885&fm=173'
        };
        let imgBasePath = "../public/img/";
        return (
            <View >
                {/* 通过source属性设置图片地址，通过require方法载入本地图片 */}
                <Image style={styles.img} source={require('../public/img/12.jpg')}/>
                
                {/* 在之前的版本中，图片路径必须是静态的，不能写表达式，现在可以了 */}
                <Image style={styles.img} source={require(imgBasePath + '12.jpg')} />
                
                {/* 在之前的版本中，图片名称也不能以数字开头，现在也可以了 */}
                <Image style={styles.img} source={require('./56.jpg')} />
            </View>
        )
    }
}

let styles = StyleSheet.create({
    img: {
        width: 55,
        height: 55
    }
});
```

#### 载入网络图片

- 如果是通过uri载入的网络图片，必须要设置宽高，否则无法显示
- 如果某些网站的图片载入失败尝试换一个域名图片试试

```jsx
export default class ImageTest extends Component {
    render() {
        let pic = {
            uri: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=645293140,2005760885&fm=173'
        };
        let imgBasePath = "../public/img/";
        return (
            <View >
                {/* 没有宽高，图片不会显示 */}
                <Image source={pic} />

                {/* 设置宽高，图片正常显示 */}
                <Image source={pic} style={{width:200, height: 100}} />
            </View>
        )
    }
}
```

#### 批量载入网络图片

- 之前如果想`写活`地址, 必须定义一个`对象`赋值
- `<Image source={对象} />`
- 现在更加灵活，只需要把uri写活就可以
- `<Image source={{uri: 变量}} />`

```jsx
import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';

export default class ImageTest extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                {
                    this.props.imgs && this.props.imgs.map((uri, i) => {
                        return <Image key={`key${i}`} source={{uri: uri}} style={{width:200, height: 100}} />;
                    })
                }
            </View>
        )
    }
}
```

### Button

- 作用相当于 `html` 的 `button` 标签用于触发点击
- 按钮需要通过 `title` 属性设置文本内容, 值必须为字符串，其他数值或者不设都会报错
- 按钮通过 `onPress` 属性监听点击事件
- <http://reactnative.cn/docs/0.50/button.html>

```jsx
import React, { Component } from "react";
import { StyleSheet, View, Text, Button, Alert } from "react-native";

export default class ButtonTest extends Component {

    constructor(props) {
        super(props);
        this.state = {
            num: 1
        };
    }

    onPressHandler() {
        this.setState({num: ++this.state.num});
    }

    render() {
        return (
            <View>
                <Text>{this.state.num}</Text>
                <Button onPress={() => {this.onPressHandler()}} title="点我+1"></Button>
            </View>
        )
    }
}
```

### TextInput

- 作用相当于 `html` 的 `input` 标签用于输入文本
- 需要通过 `value` 属性指定文本内容, 通过 `onChangeText` 属性监听文本的变化事件
- <http://reactnative.cn/docs/0.50/textinput.html#content>

```jsx
import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';

export default class TextInputTest extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '默认值'
        }
    }

    render() {
        return (
            <View>
                {/* 模拟双向数据绑定 */}
      			<Text>{ this.state.text }</Text>
                <TextInput value={ this.state.text } onChangeText={(text) => this.setState({text})} />
                <Text>{ this.state.text }</Text>
    			<TextInput placeholder="请输入密码" onChangeText={(text) => this.setState({text})} />
	    	</View>
        );
    }
}
```

### Alert

```jsx
import React, { Component } from "react";
import { StyleSheet, View, Text, Button, Alert } from "react-native";

export default class AlertTest extends Component {

    onPressHanlder() {
        Alert.alert(
            // 标题
            '温馨提示',
            // 内容
            '您的餐凉了，要不要热一下',
            // 配置一个按钮是确定，两个按钮是取消与确定，三个按钮是稍后再试、取消与确定
            [
              {text: '再等一会', onPress: () => console.log('先聊会天')},
              {text: '算了', onPress: () => console.log('凉着吃吧')},
              {text: '好的', onPress: () => console.log('热的好吃')},
            ],
            // 点击屏幕关闭
            { cancelable: false }
        );
    }

    render() {
        return (
            <Button onPress={()=>{this.onPressHanlder()}} title="点我弹框"></Button>
        )
    }
}
```

### Dimensions

有时候我们需要设置元素大小为屏幕的大小，在Web开发中可以使用%百分比单位，但是RN并不支持这种单位，这时候我们可以使用RN内置的`Dimensions`对象API方法动态获取屏幕宽高然后进行设置。

```jsx
const Dimensions = require('Dimensions');
const screenSize = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        width: screenSize.width,
        height: screenSize.height
    }
});
```

### ScrollView

- 默认情况下, `超出`屏幕的内容是看不到的, 不像浏览器环境下会自动添加`滚动条`
- 如果需要滚动, 可以使用这个`组件`把要相应的内容`包裹`起来, 被包裹的内容就会处于`滚动条`中
- 滚动的过程中，可以通过onScroll绑定回调，每帧最多调用一次回调
- <http://reactnative.cn/docs/0.50/scrollview.html#content>

**基本使用**

ScrollView使用非常简单，只需要把标签内容通过ScrollView组件包裹起来即可。

```jsx
return (
    <ScrollView>
        <View style={styles.container} onScroll={() => {this.onScrollHandler()}}>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Changes you make will automatically reload.</Text>
            <Text>Shake your phone to open the developer menu1.</Text>
            <ViewTest></ViewTest>
            <ViewTest></ViewTest>
            <ViewTest></ViewTest>
            <ViewTest></ViewTest>
            <ViewTest></ViewTest>
            <ViewTest></ViewTest>
            <ViewTest></ViewTest>
            <TextTest></TextTest>
            <ImageTest imgs={imgs}></ImageTest>
            <ButtonTest></ButtonTest>
            <TextInputTest></TextInputTest>
            <AlertTest></AlertTest>
        </View>
    </ScrollView>
);
```

**简易Swiper**

我们可以利用ScrollView的几个特殊属性来实现一个简易的Swiper。

```jsx
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView
} from 'react-native';

const Dimensions = require('Dimensions');
const screenSize = Dimensions.get("window");

export default class ScrollViewSwiper extends Component {

    // 获取渲染列表
    getList() {
        const backgroundList = ["orange", "purple", "pink", "aqua"];
        return backgroundList.map((color, i) => {
            return (
                <View
                    key={ `key${i}` } 
                    style={ [styles.swipeItem, {backgroundColor: color}] }>
                    <Text>{ color }</Text>
                </View>
            )
        });
    }

    render() {
        return (
            // horizontal属性可设置列表水平排列，
            // pagingEnabled属性能够让列表一页一页切换，
            // showsHorizontalScrollIndicator属性控制滚动条显示隐藏
            <ScrollView
                style={styles.swipe}
                horizontal={ true }
                pagingEnabled={ true }
                showsHorizontalScrollIndicator={ false }>
                { this.getList() }
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    swipe: {
        marginTop: 24,
    },
    swipeItem: {
        width: screenSize.width,
        height: 200
    }
});
```

### FlatList

```jsx
import React, { Component } from "react";
import { StyleSheet, View, Text, FlatList } from 'react-native';

export default class FlatListTest extends Component {
    render() {
        return (
            <View>
                <FlatList
                    data={[
                        {key: 'Devin'},
                        {key: 'Jackson'},
                        {key: 'James'},
                        {key: 'Joel'},
                        {key: 'John'},
                        {key: 'Jillian'},
                        {key: 'Jimmy'},
                        {key: 'Julie'},
                    ]}
                    renderItem={(e) => <Text style={styles.item}>{e.index + ":" + e.item.key}</Text>}
                />
            </View>
        );
        
    }
}

const styles = StyleSheet.create({
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
});
```

### ActivityIndicator

- 展示一个小圆形的`loading`
- 通过属性 `animating` 控制显示隐藏, `color` 设置颜色
- <http://reactnative.cn/docs/0.50/activityindicator.html#content>

```jsx
import React, { Component } from "react";
import { StyleSheet, ActivityIndicator } from "react-native";

export default class ActivityIndicatorTest extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShow: true
        }
    }

    render() {
        return (
            <ActivityIndicator animating={this.state.isShow} color="green" size="large"></ActivityIndicator>
        );
    }
}
```

### 触控系列组件

在需要捕捉用户点击操作时，可以使用`Touchable`开头的一系列组件。这些组件通过onPress属性设置点击事件的处理函数。当在本组件上按下手指并且抬起手指时也没有移开到组件外时，此函数会被调用。Touchable组件最大的特点是附带反馈效果。

```jsx
import React, { Component } from 'react';
import { 
    StyleSheet, 
    View, 
    Image,
    Text, 
    TouchableHighlight, 
    TouchableOpacity, 
    TouchableNativeFeedback 
} from 'react-native';
import StyleBoxTest from './StyleBoxTest';

export default class TouchableGroupTest extends Component {

    opacityHandler() {
        console.log("透明按钮");
    }

    HighlighrHandler() {
        console.log("高亮按钮");
    }

    FeedbackHandler() {
        console.log("原生反馈按钮");
    }

    render() {
        return (
            <View>
                {/* 透明效果，支持多个子节点 */}
                <TouchableOpacity 
                    activeOpacity={0.5} 
                    onPress={this.opacityHandler.bind(this)}>
                    <View style={styles.base}>
                        <Text style={styles.baseFont}>透明按钮</Text>
                    </View>
                </TouchableOpacity>

                {/* 透明与底色两种效果，只支持一个子节点，可以用一个View再包装多个子节点 */}
                {/* 可以包裹图片，点击时加深背景 */}
                <TouchableHighlight
                    activeOpacity={0.5} 
                    underlayColor="#c1c1c1"
                    onPress={this.HighlighrHandler.bind(this)}>
                    <View style={styles.base}>
                        <Image source={require("./56.jpg")} style={{width:300,height:100}} resizeMode="stretch"></Image>
                    </View>
                </TouchableHighlight>

                {/* 使用原生状态渲染反馈效果，比如涟漪，只能放置一个view子组件 */}
                {/* 效果有三个可选方法：SelectableBackground、SelectableBackgroundBorderless、Ripple(color)*/}
                <TouchableNativeFeedback 
                    background={TouchableNativeFeedback.SelectableBackground()}
                    onPress={this.FeedbackHandler.bind(this)}>
                    <View style={styles.base}>
                        <Text style={styles.baseFont}>原生按钮</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    base: {
        margin: 10,
        width: 300,
        height: 100,
        borderRadius: 5,
        backgroundColor: 'green',
        justifyContent: 'center',
    },
    baseFont: {
        color: "orange",
        textAlign: "center",
        lineHeight: 50
    }
});
```
