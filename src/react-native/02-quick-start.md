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

## 错误提示 - 红屏和黄屏

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

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

## 调试菜单

React-Native开发调试没有本地代码方便，但也是可以调的，在调试菜单中可以进行开发调试相关的配置。调试菜单只在debug版本中可以被调出，如果是模拟器环境，Windows平台按window+m可调出，Mac平台按commond+m可调出，如果是真机，摇一摇就可以调出调试菜单。<br />

![调试菜单预览](https://note.youdao.com/yws/public/resource/6a301213468716d4d839ca93f6b26025/xmlnote/5F7D6A3BB20945BE8C521606F0DD0C76/6915)

调试菜单说明

- Reload: 重新加载整个页面
- Debug JS Remotely: 启动远程调试, 会自动打开chrome浏览器, 然后可在开发者工具中调试js
- Enable Live Reload: 开启自动加载, 代码变动会自动更新整个页面
- Enable Hot Reloading: 热更新, 代码变动自动的进行局部更新
- Dev Sttings: 开发调试配置

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
