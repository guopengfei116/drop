# ReactNative 快速开始

学习使用 ReactNative 最令人头疼的就是环境问题，因为大多数 Web 开发者，并不熟悉 Android 与 IOS 的开发环境，配置起来比较繁琐。当然 Android 程序员也不熟悉 IOS 环境，反之亦然，这导致很多人因为繁杂的开发环境而放弃学习或者暂时搁浅。

为了改善这个问题，一个快速的开发环境解决方案应运而生。这个方案需要两个工具：1. create-react-native-app 2. Expo。

## create-react-native-app

这是一款用来创建 ReactNative 项目的脚手架工具。特点是无需配置繁杂的 Android 或 IOS 开发环境，便可进行原生应用的开发，极大简化了环境搭建与配置的过程，很适合学习使用。

- [参考文档] <https://reactnative.cn/docs/getting-started.html>
- [替代方案] <https://facebook.github.io/react-native/docs/getting-started.html>

### 安装

```shell
# 安装
npm install -g create-react-native-app

# 检测，文档更新时最新版本2.0.2
create-react-native-app --version
```

### 使用

```shell
# 创建项目
create-react-native-app projectName

# 启动项目
cd projectName
expo start
```

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

## Expo

这是一款安装在手机上的应用，专门负责运行上述方式构建的 App，这有点像是微信里面运行的小程序。IOS 可以到 AppStore 里面搜索下载，Android 可以到 GooglePlay 里面搜索下载，也可以到 Github 里下载。

- [Github] <https://github.com/expo/expo>

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

## 真机运行

准备工作：使用`create-react-native-app`创建一个项目，然后手机安装`Expo`应用，并确保手机与开发机处于同一局域网下。

项目运行：`npm start`启动项目，打开`Expo`应用，使用里面的扫一扫功能，扫描项目启动后生成的巨大二维码，等待JS打包传输完毕，就会在手机上运行。

### IP错误问题

因为开发机可能会有多个ip地址，比如以太网IP、虚拟IP、无线局域网IP等等。当项目启动时通常会无脑的选择IP列表中的第一个，假如是以太网IP，那么就与手机所处的无线局域网不同，造成网络连接失败。

下面是这种情况的图例，项目启动时使用的是IP列表中的第一个94 IP，并没有使用无线局域网IP。<br />

![ipconfig](https://github.com/guopengfei116/drop/blob/master/img/react-native/ipconfig.png?raw=true)

![expo-service](https://github.com/guopengfei116/drop/blob/master/img/react-native/expo_service.png?raw=true)

如果发生这种情况，先`Ctrl+C`停掉项目，设置一个环境变量，然后再重启项目即可。

- [参考解决方案] <https://github.com/react-community/create-react-native-app/blob/d01ddabb634532200629c6d17f920eb856fa6416/react-native-scripts/template/README.md#environment-variables>
- [参考解决方案] <https://github.com/react-community/create-react-native-app/issues/270>

```shell
# 设置环境变量
set REACT_NATIVE_PACKAGER_HOSTNAME=my-custom-ip-address-or-hostname

# 重启项目
npm start
```

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

## 开发初体验

在项目根目录下有个 `App.js` , 这是应用的`根组件`, 我们手机上看到的`内容`就是这个组件实现的。

```jsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// 导出根组件, 组件的定于语法与之前学习的一样
export default class App extends React.Component {
  render() {
    return (
        // 返回的视图需要使用View组件包裹, 作用相当于Div标签
        <View style={styles.container}>
            {/* 文本内容使用Text组件包裹, 作用相当于P标签 */}
            <Text>Open up App.js to start working on your app!</Text>
        </View>
    );
  }
}

// 样式定义
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```

### 修改内容

我们可以尝试修改 `App.js` 中的文本内容, 保存后APP就会自动更新

1. 如果自动更新失败，也可以`摇一摇`手机或模拟器, 调出调试菜单，点击 `Reload` 选项手动触发更新
2. 如果有adb工具，也可以直接在命令行中运行`adb shell input keyevent 82`来发送菜单键命令调出菜单

### 给文本添加样式

我们也可以给文本添加一些样式，但是这里的样式有一些注意事项

1. 通过 `StyleSheet.create` API 进行样式的定义
2. CSS 尺寸大小无需加任何单位，只有数值与百分比两种书写形式
3. 绝大部分样式没有简写形式，只能逐个定义，比如font、background、border等
4. 定义好的样式，需要通过组件的style属性进行绑定，通过数组可以引用多组定义的样式, 后面的优先级比前面的高

### 错误提示 - 红屏和黄屏

在开发时，如果代码运行错误，通常会有两种情况：1. 全屏红色报错 2. 底部黄色警告。<br />
红屏通常是由错误编码导致，必须修复才能正常运行；黄屏通常是不规范写法或者建议信息，不影响程序运行，可以通过代码关掉警告。

如果出现了红屏报错，一般情况下，根据报错信息就可以定位问题，修复后即可恢复正常。
但是也有可能遇到 RN 不开心的时候，你的应用会直接奔溃，并没有错误提示，这时候可以重新启动重试或者诊断刚刚编写的代码。

#### 报错相关代码

```javascript
// 频闭黄色警告，参数为一个数组：数组中的字符串就是要屏蔽的警告的开头的内容。
YellowBox.ignoreWarnings(['Warning: ']);

// 手动触发红屏和警告
console.error("严重错误");
console.warn("警告");
```

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

## 调试菜单

React-Native开发调试没有本地代码方便，但也是可以调的，在调试菜单中可以进行开发调试相关的配置。调试菜单只在debug版本中可以被调出，如果是模拟器环境，Windows平台按window+m可调出，也可能是F1或F2，Mac平台按commond+m可调出，或者发送`adb shell input keyevent 82`指令。如果是真机，摇一摇就可以调出调试菜单。<br />

![调试菜单预览](https://note.youdao.com/yws/public/resource/6a301213468716d4d839ca93f6b26025/xmlnote/5F7D6A3BB20945BE8C521606F0DD0C76/6915)

调试菜单说明

- Reload: 重新加载整个页面
- Debug JS Remotely: 启动远程调试, 会自动打开chrome浏览器, 然后可在开发者工具中调试js
- Enable Live Reload: 开启自动加载, 代码变动会自动更新整个页面
- Enable Hot Reloading: 热更新, 代码变动自动的进行局部更新
- Dev Sttings: 开发调试配置

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

## 内置组件

- 在 `React Native` 中你需要使用官方提供的`组件`进行应用构建
- 因为是开发`原生`应用, 我们的代码最终会`转为`原生组件的方式渲染, 所以你不会看到任何以 `html` 标签命名的组件
- [官方文档] <https://facebook.github.io/react-native/docs/getting-started>

### View

视图容器，作用相当于 `html` 的 `div` 标签，它是创建UI所需的最基础组件，支持Flexbox布局、样式、触摸事件，它可以放到其它视图中，也可以包含任意多个任意子视图。

- View组件内不能书写文本，子元素默认纵向排列
- <https://reactnative.cn/docs/view/>

```jsx
import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

export default class ViewTest extends Component {
    render() {
        return (
            {/* View标签相当于div，可以相互嵌套 */}
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

文本容器，作用相当于 `html` 的 `span` 标签。Text标签也支持嵌套、触摸事件。在RN中，文本必须放置到Text中才可以被渲染，否则报错。

- 注意: 除了Text外, 别的组件内都不能包含文本
- <https://reactnative.cn/docs/text/>

#### 组件嵌套

Text采用的是文本布局，多个子文本在渲染时会折叠合并在一起，如果把View理解成块级元素，那么Text就可以理解为行内元素。<br />

```jsx
import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

export default class TextTest extends Component {
    render() {
        return (
            // Text组件也允许相互嵌套，子Text会在一行显示，效果类似与行内元素
            <Text>
                <Text>饿了吗</Text>
                <Text>美图</Text>
            </Text>
        );
    }
}
```

#### 样式继承

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

#### 特殊现象

```jsx
render() {
    return (
        // View的子元素默认是纵向排列的，即便放置的是Text内行元素也是这样
        // 那么因为View默认采用的是flex布局，方向为纵向
        <View>
            <Text>啦啦啦</Text>
            <Text>我是卖报的小画家</Text>
            <Text>我是行内元素，一行显示！！！</Text>
        </View>
    )
}
```

### Button

作用相当于 `html` 的 `button` 标签，可监听点击事件，与用户交互。

- 通过 `onPress` 属性监听点击事件
- 通过 `title` 属性设置按钮文字, 且类型必须是字符串，其他类型或不设都会报错
- <http://reactnative.cn/docs/0.50/button.html>

```jsx
import React, { Component } from "react";
import { StyleSheet, View, Text, Button, Alert } from "react-native";

export default class ButtonTest extends Component {

    constructor(props) {
        super(props);
        this.state = {
            count: 0
        };
    }

    // 事件函数执行时，为了让this指向组件实例，可以使用箭头函数
    // 也可以在绑定的时候使用bind绑定this，但是每次render都会生成新函数，不太好
    _counter = () => {
        this.setState({num: ++this.state.count});
    }

    render() {
        return (
            <View>
                <Text>{this.state.count}</Text>
                {/* 注意onPress的驼峰命名法，必须使用title设置文本 */}
                <Button onPress={this._counter()} title="点我+1"></Button>
            </View>
        )
    }
}
```
