# builtIn Components

### Image

- 作用相当于 `html` 的 `img` 标签用于承载图片
- 组件通过 `source` 属性设置图片地址
- <https://reactnative.cn/docs/image.html>
- <http://reactnative.cn/docs/0.50/images.html#content>

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

### refreshControl

此组件需要配合使用在`ScrollView`和`FlatList`列表组件中，从而实现下拉刷新的功能，同时下拉刷新的效果在不同平台下是不同的。

```jsx
<FlatList 
    data={this.state.list}
    renderItem={this._renderItem}
    refreshControl={<RefreshControl
        refreshing={this.state.isRefreshing}
        onRefresh={this._renderRefreshContrl}
        title="dff"
        colors={["red", "yellow"]}
        progressBackgroundColor="blue"
        progressViewOffset={50}
    />}>
</FlatList>
```

### Picker

一个列表选择器，在Android当中有对话框和下拉菜单两种形态，IOS中只有对话框形态。

```jsx
import React from "react";
import { 
    StyleSheet, 
    View, 
    Text,
    Picker,
} from 'react-native';

export default class Profile extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            language: "",
            languageOptions: [
                "javascript",
                "java",
                "python",
                "php",
                "c++",
                "golang"
            ]
        }
    }

    _onPickerValueChange = (language) => {
        this.setState({language});
    }

    render() {
        return (
            <View style={styles.container}>
                {/* mode默认为dialog，Android平台下可以改为dropdown形式 */}
                <Picker
                    style={styles.picker}
                    mode="dropdown"
                    selectedValue={this.state.language}
                    onValueChange={this._onPickerValueChange}>
                    {
                        this.state.languageOptions.map((language) => {
                            return (
                                <Picker.Item 
                                    key={language}
                                    label={language} 
                                    value={language}>
                                </Picker.Item>
                            )
                        })
                    }
                </Picker>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    picker: {
        width: 200,
        height: 20,
        backgroundColor: "skyblue",
        color: "red",
    }
});
```

### Slider

这是一个范围选择器。

```jsx
import React from "react";
import { 
    StyleSheet, 
    View, 
    Text,
    Slider,
} from 'react-native';

export default class Profile extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            sliderValue: 2,
        }
    }

    _onSliderValueChange = (sliderValue) => {
        this.setState({sliderValue});
    }

    render() {
        return (
            <View style={styles.container}>
                <Slider
                    style={styles.slider}
                    value={this.state.sliderValue}
                    minimumValue={0}
                    maximumValue={10}
                    step={1}
                    minimumTrackTintColor="blue"
                    maximumTrackTintColor="red"
                    onValueChange={this._onSliderValueChange}
                />
                <Text>Slider值：{ this.state.sliderValue }</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slider: {
        width: 200
    }
});
```

### Switch

用来进行两个状态的切换，俗称开关。

```jsx
import React from "react";
import { 
    StyleSheet, 
    View, 
    Text,
    Switch
} from 'react-native';

export default class Profile extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isOn: false,
        }
    }

    _onSwitchValueChange = (isOn) => {
        this.setState({isOn});
    }

    render() {
        return (
            <View style={styles.container}>
                <Switch
                    style={styles.switch}
                    value={this.state.isOn}
                    onValueChange={this._onSwitchValueChange}
                    trackColor={{true: "blue", false: "black"}}
                    thumbColor={this.state.isOn? "skyblue" : "gray"}
                />
                <Text>Switch值：{ this.state.isOn }</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
```

### Modal

```jsx
import React from "react";
import { 
    StyleSheet, 
    View, 
    Text,
    Modal,
    Alert,
    Button
} from 'react-native';

export default class Profile extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
        }
    }

    // Modal显示时按下返回按钮时的回调
    _onModalRequestClose = () => {
        this._setModalVisible(false);
        Alert.alert("模态框已关闭");
    }

    // Modal显示隐藏
    _setModalVisible = (visible) => {
        this.setState({modalVisible: visible});
    }

    render() {
        return (
            <View style={styles.container}>
                {/* animationType: slide底部滑入，fade淡入淡出，none没有动画 */}
                <Modal
                    visible={this.state.modalVisible}
                    transparent={false}
                    animationType="slide"
                    onRequestClose={this._onModalRequestClose}
                >
                    <View>
                        <Text>Hello</Text>
                        <Button 
                            title="关闭"
                            onPress={()=>this._setModalVisible(false)}
                        />
                    </View>
                </Modal>
                <Button 
                    title="查看详情" 
                    onPress={()=>this._setModalVisible(true)}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
```

### WebView

此组件就是一个内置的手机浏览器，可以用来开发网页。

```jsx
import React, { Component } from 'react'
import { 
  Text, 
  StyleSheet, 
  View,
  WebView,
  Dimensions,
} from 'react-native';

export default class MyWebView extends Component {

  state = {
    url: { uri: "https://www.baidu.com/" },
  }

  render() {
    return (
      <View style={styles.container}>
        <WebView style={styles.web} source={this.state.url}></WebView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  web: {
    flex: 1,
    width: Dimensions.get("window").width
  }
})
```
