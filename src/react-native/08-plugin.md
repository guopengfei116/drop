# 第三方插件

## react-native-swiper

这是一个可实现典型的轮播效果或翻页效果插件，该插件只提供了一个组件Swiper，全部功能由该组件提供。该插件在内部对android与ios系统提供了不同的实现方式，如果是android系统才采用ViewPagerAndroid组件实现，ios系统则采用ScrollView实现。

- [github](https://github.com/leecade/react-native-swiper)
- 安装: `yarn add react-native-swiper -S`

### 使用范例

需要注意，Swiper组件的高度依赖与父元素，所以在使用时嵌套一个View标签控制Swiper展示高度。<br />

另外该库的源码使用了一个叫`Arial`的字体，模拟器中可以没有这个字体导致报错，可以修改为`normal、serif、monospace`中的任意一个字体，或者删除该样式也可以。<br />

```jsx
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import Swiper from 'react-native-swiper';

export default class SwiperTest extends Component {
  render(){
    let height = this.props.height || 200;

    return (
        <View style={[styles.wrapper, {height: height}]}>
            {/* showsButtons控制左右箭头显示，autoplay控制自动轮播 */}
            <Swiper showsButtons={true} autoplay={true}>
                <View style={[styles.item, styles.item1]}>
                    <Text style={styles.text}>Banner one</Text>
                </View>
                <View style={[styles.item, styles.item2]}>
                    <Text style={styles.text}>Banner two</Text>
                </View>
                <View style={[styles.item, styles.item3]}>
                    <Text style={styles.text}>Banner three</Text>
                </View>
            </Swiper>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 24
    },
    item: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    item1: {
        backgroundColor: '#9DD6EB',
    },
    item2: {
        backgroundColor: '#97CAE5',
    },
    item3: {
        backgroundColor: '#92BBD9',
    },
    text: {
        color: 'red',
        fontSize: 30,
        fontWeight: 'bold',
    }
});
```

### 测试

- 修改 `App.js` 根组件
- 导入`轮播图`组件并使用`测试`

```jsx
import SwiperTest from './components/SwiperTest';

export default class App extends Component {
    render() {
        return (
            <View style={styles.container}>
                <SwiperTest></SwiperTest>
                <Text>轮播图组件测试</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});
```

## scrollView实现轮播图

利用scrollView的属性，可以很容易的实现一个简易的轮播图效果。

```jsx
import React, { Component } from 'react';
import { 
    StyleSheet,  
    View,
    Text,
    Image,
    ScrollView
} from 'react-native';

const Dimensions = require('Dimensions');
const { width:screenWidth, height:screenHeight } = Dimensions.get("window");

export default class ScrollViewTest extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 0,
            timer: null
        }
    }

    autoSwipe() {
        this.state.timer = setInterval(() => {
            // 更新currentPage
            this.setState((oldVal) => {
                let currentPage = this.state.currentPage + 1;
                currentPage = currentPage > (this.props.imgList.length-1) ? 0: currentPage;
                return { currentPage };
            });
            console.log(this.state.timer)
            // 更新视图
            this.refs.scrollView.scrollTo({x: this.state.currentPage * screenWidth});
        }, 2000);
    }

    startAutoSwipe() {
        this.autoSwipe();
    }

    stopAutoSwipe() {
        clearInterval(this.state.timer);
    }

    componentDidMount() {
        this.autoSwipe();
    }

    componentWillUnmount() {
        clearInterval(this.state.timer);
    }

    render() {
        return (
            <ScrollView 
                ref="scrollView" style={[styles.swipe]} 
                horizontal={true} pagingEnabled={true} showsHorizontalScrollIndicator={false}
                onTouchStart={this.stopAutoSwipe.bind(this)} onTouchEnd={(e)=>{this.stopAutoSwipe.bind(this)}}>
                {
                    this.props.imgList.map((v, i) => {
                        return (
                            <View key={`key${i}`} style={[styles.swipeItem]}>
                                <Image style={[styles.swipeImg]} source={{uri: v}}></Image>
                            </View>
                        )
                    })
                }
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    swipe: {
        marginTop: 24,
        width: screenWidth,
        height: screenHeight
    },

    swipeItem: {
        width: screenWidth,
        height: 100
    },

    swipeImg: {
        flex: 1
    }
});
```

- - - - - - - - - - - - - - - - - - - - - - - -

## react-navigation

通常我们开发的App是由多个页面构成的，那么我们就需要一种或多种方式去管理这些页面，在Web开发中，比较常见的管理方式有：Tab栏单页嵌多内容，或者路由管理多页面切换。<br />

react-navigation便是实现这种需求的RN插件，同时它还是官方推荐使用的第三方导航插件，可实现单页多内容切换，也可以实现路由跳转。<br />

react-navigation提供了几种不同类型或者效果的导航组件，每个组件都由对应的工厂函数来创建，这些工厂函数在调用时通常都需要两个参数，第一个参数统一为路由配置对象，第二个参数则是一个个性化的配置对象，不同组件的配置项存在差异。<br />

- [官网]<https://reactnavigation.org/>
- [github]<https://github.com/react-navigation/react-navigation>

### createBottomTabNavigator

这个工厂函数可以创建一个最基本的Tab栏切换组件，通常Tab栏可切换的项是有限的，不会太多，所有大部分情况下我们会把Tab栏整体看作一个页面，管理了不同内容，或者称为子页页可以。

#### 基本使用

```jsx
import React, { Component } from "react";
import { StyleSheet, View, Text, Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';

const Home = () => {
    return (
        <View style={styles.container}>
            <Text>Home</Text>
        </View>
    );
}

const MovieList = () => {
    return (
        <View style={styles.container}>
            <Text>MovieList</Text>
        </View>
    );
}

const MovieDetail = () => {
    return (
        <View style={styles.container}>
            <Text>MovieDetail</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default createBottomTabNavigator(
    // 路由配置，key值会作为tabBar的label显示
    {
        Home,
        MovieList,
        MovieDetail, 
    }
);
```

#### 路由配置

```jsx
export default createBottomTabNavigator(
    // 路由配置
    {
        Home: {
            // 组件
            screen: Home,
            // 回调需要返回一个导航器配置对象
            navigationOptions: ({navigation, navigationOptions}) => {
                return { 
                    // 导航条中的提示文本
                    tabBarLabel: "首页",
                    // 导航条中的icon，选中与不选中状态显示不同icon
                    tabBarIcon: ({focused}) => {
                        if (focused) {
                            return (
                                <Image 
                                    style={{width: 16, height: 16}} 
                                    source={require('../public/img/12.jpg')}/>
                            );
                        } else {
                            return (
                                <Image 
                                    style={{width: 16, height: 16}} 
                                    source={require('../public/img/56.jpg')}/>
                            );
                        }
                    }
                }
            }
        },
        MovieList: {
            screen: MovieList,
            navigationOptions: ({navigation, navigationOptions}) => {
                return { "tabBarLabel": "电影列表" }
            }
        },
        MovieDetail: {
            screen: MovieList,
            navigationOptions: ({navigation, navigationOptions}) => {
                return { "tabBarLabel": "电影详情" }
            }
        }
    }
);
```

#### 静态属性配置导航选项

在配置路由时，不同页面的导航选项还可以在组件内部通过navigationOptions静态属性来配置。

```jsx
import React, { Component } from "react";
import { 
    StyleSheet, 
    View, 
    Text,
    Image
} from 'react-native';

export default class Home extends Component {
    // 可选的配置
    static navigationOptions = {
        tabBarLabel: "首页",
        tabBarIcon: ({focused}) => {
            if (focused) {
                return (
                    <Image style={styles.tabBarIcon} source={require('../public/img/12.jpg')}/>
                );
            } else {
                return (
                    <Image style={styles.tabBarIcon} source={require('../public/img/12.jpg')}/>
                );
            }
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Home</Text>
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
    tabBarIcon: {
        width: 16,
        height: 16,
    }
});
```

#### BottomTabNavigator个性配置

```jsx
export default createBottomTabNavigator(
    // 路由配置
    {
        ...
    },
    // BottomTabNavigator配置对象
    {
        // 默认页
        initialRouteName: 'Home',
        // 导航条配置
        tabBarOptions: {
            // label选中与不选中颜色
            activeTintColor: 'aqua',
            inactiveTintColor: 'black',
            // label样式
            labelStyle: {
                fontSize: 12,
                marginTop: 1,
            },
            // tabBar样式
            style: {
                backgroundColor: 'purple',
                borderTopWidth: 1,
                borderTopColor: '#ccc',
                paddingVertical: 1,
                height: 40
            },
            // 是否显示icon
            showIcon: true
        }
    }
);
```

- - - - - - - - - - - - - - - - - - - - - - - -

## createMaterialTopTabNavigator

这个tab导航组件提供了动画切换效果，可以把createBottomTabNavigator改成createMaterialTopTabNavigator即可看到效果差异，同时提供了更多的配置。

```jsx
// MaterialTopTabNavigator配置对象
{
    // 默认页
    initialRouteName: 'MovieList',
    // tabBar位置，可以设为top
    tabBarPosition: 'bottom',
    // 动画开关
    animationEnabled: true,
    swipeEnabled: true,
    tabBarOptions: {
        activeTintColor: 'aqua',
        inactiveTintColor: 'black',
        // 是否显示icon，如果显示icon就不会显示文字
        showIcon: false,
        // 设置tabBar样式
        style: {
            backgroundColor: 'purple',
            borderTopWidth: 1,
            borderTopColor: '#ccc',
            paddingVertical: 1,
            height: 40
        },
        // 设置label样式
        labelStyle: {
            fontSize: 12,
            marginTop: 1,
        }
    },
    backBehavior: 'initialRoute',
    lazy: true,
}
```

- - - - - - - - - - - - - - - - - - - - - - - -

## createStackNavigator

这个堆栈式导航组件与其他组件有大不同，因为它内部记录你的页面浏览过程，并可以向浏览器那样前进后退，实现路由控制。

Home组件，可以跳到列表页

```jsx
import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, Image, ScrollView } from 'react-native';
import Dimensions from 'Dimensions';

export default class Home extends Component {
    render() {
        return (
            <View style={[{backgroundColor: 'purple'}, styles.item]}>
                <Text>首页</Text>
                {/* push方法需要一个路由配置时的key，然后进行页面跳转，同时页面入栈 */}
                <Button title="跳转到列表页" onPress={()=>{console.log(this.props.navigation.push('List'))}}></Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
```

List组件，可以跳到首页

```jsx
import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, Image, ScrollView } from 'react-native';
import Dimensions from 'Dimensions';

export default class List extends Component {
    render() {
        return (
            <View style={[{backgroundColor: 'purple'}, styles.item]}>
                <Text>列表</Text>
                {/* 调用pop方法出栈返回上一页 */}
                <Button title="返回到首页" onPress={()=>{console.log(this.props.navigation.pop())}}></Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
```

StackNavigator组件使用

```jsx
import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, Image, ScrollView } from 'react-native';
import Dimensions from 'Dimensions';

import Home from '../stackPage/Home';
import List from '../stackPage/List';
import { createStackNavigator } from 'react-navigation';

export default createStackNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: ({navigation, navigationOptions}) => {
                return {
                    // 两个都可以设置标题，下面的优化级更高
                    title: '首页标题',    
                    headerTitle: '首页',
                }
            }
        },
        List: {
            screen: Home,
            navigationOptions: ({navigation, navigationOptions}) => {
                return {
                    headerTitle: '列表页',
                }
            }
        },
    },
    // 个性化的配置对象
    {
        initialRouteName: "Home",
    }
);
```

- - - - - - - - - - - - - - - - - - - - - - - -

## 路由控制

实际上所有的导航组件都式可以进行路由跳转的，区别是只有stackNavigation才会存储页面浏览记录，拥有栈相关的操作方法，比如push、pop等。

### 参数传递

准备两个页面，首页提供一个输入框，输入值后跳转到另一页进行展示

### stack导航组件的重绘

### Tab导航组件的重绘

### tab组件导航演示

Home组件

```jsx
import React, { Component } from "react";
import { 
    StyleSheet, 
    View, 
    Text,
    Image,
    Button
} from 'react-native';

export default class Home extends Component {
    render() {
        console.log('首页渲染');
        return (
            <View style={styles.container}>
                <Text>Home</Text>
                <Button 
                    title="跳转到列表页" 
                    onPress={()=>{this.props.navigation.navigate('MovieList')}}>
                </Button>
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
    tabBarIcon: {
        width: 16,
        height: 16,
    }
});
```

MovieList组件

```jsx
import React, { Component } from "react";
import { 
    StyleSheet, 
    View, 
    Text,
    Button
} from 'react-native';

export default class MovieList extends Component {
    render() {
        console.log('列表页渲染');
        return (
            <View style={styles.container}>
                <Text>MovieDetail</Text>
                <Button 
                    title="跳转到详情页" 
                    onPress={()=>{this.props.navigation.navigate('MovieDetail')}}>
                </Button>
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

MovieDetail组件

```jsx
import React, { Component } from "react";
import { 
    StyleSheet, 
    View, 
    Text,
    Button
} from 'react-native';

export default class MovieDetail extends Component {
    render() {
        console.log('详情页渲染');
        return (
            <View style={styles.container}>
                <Text>MovieDetail</Text>
                <Button 
                    title="返回到首页" 
                    onPress={()=>{this.props.navigation.goBack()}}>
                </Button>
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

Tab导航组件

```jsx
import React, { Component } from "react";
import { StyleSheet, View, Image } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation';

import Home from './Home';
import MovieList from './MovieList';
import MovieDetail from './MovieDetail';

export default createMaterialTopTabNavigator(

    {
        Home,
        MovieList,
        MovieDetail, 
    }
);
```

- - - - - - - - - - - - - - - - - - - - - - - -

## react-native-vector-icons

[github]<https://github.com/oblador/react-native-vector-icons#installation>

- - - - - - - - - - - - - - - - - - - - - - - -

## react-native-image-picker

该组件可以调用摄像头进行拍照，因为RN默认没有提供摄像头API，所以使用该插件需要修改原生项目进行配置，同时修改原生项目后需要重新打包安装

- [github](https://github.com/marcshilling/react-native-image-picker)
- 安装 `npm install react-native-image-picker@latest`

### 原生配置

修改android/build.gradle文件

```gradle
buildscript {
    ...
    dependencies {
        classpath 'com.android.tools.build:gradle:2.2.+' // <- USE 2.2.+ version
    }
    ...
}
```

修改android/gradle/wrapper/gradle-wrapper.properties文件

```properties
distributionUrl=https\://services.gradle.org/distributions/gradle-2.14.1-all.zip
```

修改android/app/build.gradle

```gradle
dependencies {
  compile project(':react-native-image-picker')
}
```

修改AndroidManifest.xml

```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
```

修改MainApplication.java

```java
import com.imagepicker.ImagePickerPackage;

public class MainApplication extends Application implements ReactApplication {
    @Override
    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new ImagePickerPackage(),
            // OR if you want to customize dialog style
            new ImagePickerPackage(R.style.my_dialog_style)
        );
    }
}
```

### 前端使用

```javascript
// 第1步：
import ImagePicker from 'react-native-image-picker'

//底部弹出框选项
var photoOptions = {
  title: '请选择',
  cancelButtonTitle: '取消',
  takePhotoButtonTitle: '拍照',
  chooseFromLibraryButtonTitle: '选择相册',
  quality: 0.75,
  allowsEditing: true,
  noData: false,
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
}

constructor(props) {
  super(props);
  this.state = {
    imgURL: ''
  }
}

<Button title="拍照" onPress={this.cameraAction}></Button>
<Image source={{uri: this.state.imgURL}} style={{width: 200, height: 200}}></Image>

cameraAction = () => {
  ImagePicker.showImagePicker(photoOptions, (response) => {
    console.log('response' + response);
    this.setState({
      imgURL: response.uri
    });
    if (response.didCancel) {
      return
    }
  })
}
```

### 打包

退出之前调试的App，重新运行`react-native run-android`进行打包部署，打包时会下载一些jar包，需要耐心等待。

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
备份备份备份备份备份备份备份
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

## Tab路由管理

运行`yarn add react-navigation`安装路由插件。

### Tab首页

把App.js内容复制到app/page/Home.js

### Tab个人页

创建app/page/Profile.js

```jsx
import React from "react";
import { StyleSheet, View, Text } from 'react-native';

export default MovieDetail = (props) => {
    return (
        <View style={styles.container}>
            <Text>个人信息</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
```

### Tab路由

app/page/index.js

```jsx
import React from "react";
import Home from './home'
import Profile from './profile'

export default createBottomTabNavigator(
    {
        // 路由配置，key值会作为tabBar的label显示
        Home: {
            screen: Home,
            navigationOptions: () => ({
                tabBarLabel: "首页"
            })
        },
        Profile: {
            screen: Profile,
            navigationOptions: () => ({
                tabBarLabel: "我的"
            })
        },
    }, 
    {

    }
)
```

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

## 主路由

### 商品详情页

app/page/Detail.js

```jsx
import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'

export default class Detail extends Component {

    constructor(props) {
        super(props);
        this.navigation = this.props.navigation;
        this.navigationParams = this.navigation.state.params;
    }

    _pressBack = () => {
        const {navigation} = this.props;
        navigation && navigation.pop();
    }

    render() {
        return (
        <View style={styles.container}>
            <TouchableOpacity onPress={this._pressBack}>
                <Text style={styles.back}>返回{this.navigationParams.a}</Text>
            </TouchableOpacity>
            <Text style={styles.text}> 商品详情 </Text>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
    },
    text: {
        fontSize: 20
    },
    back: {
        fontSize: 20,
        color: "yellow"
    }
})
```

### 主路由配置

App.js

```jsx
import {createStackNavigator} from 'react-navigation';
import Main from './app/page/Main';
import Detail from './app/page/Detail';

export default createStackNavigator(
  {
    main: {
      screen: Main,
      navigationOptions: ({navigation, navigationOptions}) => ({
        header: null,
      })
    },
    detail: {
      screen: Detail,
      navigationOptions: ({navigationOptions}) => ({
        title: "商品详情",
      })
    }
  }, 
  {
    initialRouteName: "main"
  }
)
```
