# 微商城项目

## 项目创建与目录结构设计

```txt
- app
    - image
        - *.(jpg|png|git|*): 图片资源
    - api
        - index.js: 项目所需接口
    - constant
        - index.js: 项目常量数据
    - components
        - Searchbar.js: 搜索条
        - Advertisement.js: 轮播广告
        - Products.js: 商品列表
    - page
        - Home.js 首页
        - Profile.js 个人页
    - navigation
        - Main.js 入口Tab页导航
```

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

## 首页架子

App.js

```jsx
import React, {Component} from 'react';
import {
  Platform, 
  StyleSheet, 
  Text, 
  View,
  StatusBar
} from 'react-native';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>

        {/* 状态栏配置 */}
        <StatusBar
          hidden={false}
          animated={true}
          backgroundColor="#ccc"
          barStyle="light-content"
          translucent={false}
        ></StatusBar>

        {/* 搜索条 */}
        <View style={styles.searchbar}>
          <Text>搜索框</Text>
        </View>

        {/* 轮播广告 */}
        <View style={styles.advertisement}>
          <Text>广告</Text>
        </View>

        {/* 商品列表 */}
        <View style={styles.products}>
          <Text>商品列表</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  searchbar: {
    height: 40,
    backgroundColor: "green"
  },
  advertisement: {
    height: 200,
    backgroundColor: "yellow",
  },
  products: {
    flex: 1,
    backgroundColor: "blue"
  }
});
```

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

## 首页组件抽取

- 创建搜索条组件：`app/components/Searchbar.js`
- 创建轮播广告组件：`app/components/Adverticement.js`
- 创建商品列表组件：`app/components/Products.js`

### 抽取后首页代码

```jsx
import React, {Component} from 'react';
import {
  Platform, 
  StyleSheet, 
  Text, 
  View,
  StatusBar
} from 'react-native';

import Searchbar from './app/components/Searchbar';
import Adverticement from './app/components/Adverticement';
import Products from './app/components/Products';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>

        {/* 状态栏配置 */}
        <StatusBar
          hidden={false}
          animated={true}
          backgroundColor="#ccc"
          barStyle="light-content"
          translucent={false}
        ></StatusBar>

        {/* 搜索条 */}
        <Searchbar></Searchbar>

        {/* 轮播广告 */}
        <Adverticement></Adverticement>

        {/* 商品列表 */}
        <Products></Products>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});
```

### 搜索条组件

```jsx
import React, { Component } from 'react'
import { 
    Text, 
    StyleSheet, 
    View,
    TextInput,
    Button,
    Alert
} from 'react-native'

export default class Searchbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchValue: ""
        }
    }

    _changeText = (newValue) => {
        this.setState({searchValue: newValue})
    }

    _search = () => {
        Alert.alert(this.state.searchValue);
    }

    render() {
        return (
            <View style={styles.searchbar}>
                <TextInput 
                    placeholder="输入搜索关键字"
                    underlineColorAndroid="transparent"
                    value={this.state.searchval}
                    onChangeText={this._changeText}
                    style={styles.input} 
                ></TextInput>
                <Button
                    title="搜索"
                    onPress={this._search}
                    style={styles.button}
                ></Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    searchbar: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: 'center',
        paddingHorizontal: 10,
        height: 40,
    },
    input: {
        flex: 1,
        marginRight: 10,
        paddingLeft: 6,
        paddingVertical: 6,
        height: 30,
        borderWidth: 2,
        borderColor: "#ccc",
        borderRadius: 5,
        lineHeight: 12,
        fontSize: 12
    },
    button: {
        width: 40,
        height: 30,
        backgroundColor: "green"
    }
})
```

### 广告组件

版本一，使用ScrollView实现幻灯片效果

```jsx
import React, { Component } from 'react'
import { 
    Text, 
    StyleSheet, 
    View,
    ScrollView,
    Dimensions,
    Image
} from 'react-native'

export default class Adverticement extends Component {

  constructor(props) {
        super(props);
        this.state = {
            currentPage: 0,
            advertisements: [
                {
                    uri: require("../image/double-11.png"),
                    backgroundColor: "blue"
                },
                {
                    uri: require("../image/eyes.png"),
                    backgroundColor: "yellow"
                },
                {
                    uri: require("../image/five-year.png"),
                    backgroundColor: "pink"
                }
            ]
        }
    }

    render() {
        return (
            <View style={styles.advertisement}>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled={true}
                >
                  {
                      this.state.advertisements.map((item, index) => {
                          return (
                              <View 
                                  key={index}
                                  style={[styles.advert, item.backgroundColor]}
                              >
                                  <Image 
                                      source={item.uri}
                                      style={styles.image}>
                                  </Image>
                              </View>
                          )
                      })
                  }
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    advertisement: {
        height: 200,
        backgroundColor: "yellow",
    },
    advert: {
        width: Dimensions.get("window").width,
        height: 200
    },
    image: {
        width: "100%",
        height: "100%"
    },
})
```

版本二，幻灯片自动切换效果

```jsx
import React, { Component } from 'react'
import { 
    Text, 
    StyleSheet, 
    View,
    ScrollView,
    Dimensions
} from 'react-native'

export default class Adverticement extends Component {

    // 此处省略未作改变的代码...

    // 挂载后启动定时器
    componentDidMount() {
        this._startTimer();
    }

    // 下载后清除定时器
    componentWillUnmount() {
        this._endTimer();
    }

    _startTimer = () => {
        this.timerId = setInterval(() => {
            // 循环页码
            let nextPage = this.state.currentPage + 1;
            nextPage = nextPage >= this.state.advertisements.length? 0 : nextPage;

            // 状态更新后更新幻灯片(通过修改scrollView组件的offsetX值实现)
            this.setState({currentPage: nextPage}, () => {
                let offsetX = Dimensions.get("window").width * this.state.currentPage;
                this.refs.scrollView.scrollTo({x: offsetX, y: 0, animated: true});
            });
        }, 1500);
    }

    _endTimer = () => {
        clearInterval(this.timerId);
    }

    render() {
        return (
            <View style={styles.advertisement}>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled={true}
                    ref="scrollView"
                >
                    {/* 此处省略未作改变的代码... */}
                </ScrollView>
            </View>
        )
    }
}

// 此处省略未作改变的代码...
```

版本三，增加幻灯片指示器

```jsx
export default class Adverticement extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 0,
            circleSize: 8,
            circleMargin: 5,
            // 此处省略未作改变的代码...
        }
    }

    // 此处省略未作改变的代码...

    // 计算轮播指示器位置
    _computeIndicatorOffset = () => {
        const advertisementCount = this.state.advertisements.length;
        const indicatorWidth = (this.state.circleSize * advertisementCount)
            + (this.state.circleMargin * advertisementCount * 2);
        return {
            left: (Dimensions.get("window").width - indicatorWidth) / 2,
            bottom: 10
        };
    }

    render() {
        return (
            <View style={styles.advertisement}>
                {/* 此处省略未作改变的代码... */}
                <View 
                    style={[
                        styles.indicator, 
                        this._computeIndicatorOffset()
                    ]}
                >
                    {
                        (()=>{
                            const circleStyle = {
                                marginHorizontal: this.state.circleMargin,
                                width: this.state.circleSize,
                                height: this.state.circleSize,
                                borderRadius: this.state.circleSize / 2,
                            };
                            return this.state.advertisements.map((item, i) => {
                                const dynamicStyle = 
                                    i === this.state.currentPage
                                    ? styles.circleSelected
                                    : {};
                                return (<View key={i} style={[styles.circle, circleStyle, dynamicStyle]}></View>)
                            })
                        })()
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    // 此处省略未作改变的代码...
    indicator: {
        position: "absolute",
        flexDirection: "row"
    },
    circle: {
        backgroundColor: '#ccc',
    },
    circleSelected: {
        backgroundColor: '#fff',
    },
})
```

### 商品列表组件

版本一，商品列表

```jsx
import React, { Component } from 'react'
import { 
    Text, 
    StyleSheet, 
    View,
    FlatList,
    Image
} from 'react-native'

export default class Products extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [
                {
                    id: "1",
                    title: "小米MIX3",
                    subTitle: "滑盖手机，咔咔咔",
                    image: ""
                },
                {
                    id: "2",
                    title: "华为Mate20",
                    subTitle: "黑科技，牛逼牛逼",
                    image: ""
                },
                {
                    id: "3",
                    title: "魅族",
                    subTitle: "漂亮无需多言",
                    image: ""
                },
                {
                    id: "4",
                    title: "锤子",
                    subTitle: "漂亮的不像实力派",
                    image: ""
                },
                {
                    id: "5",
                    title: "三星",
                    subTitle: "我的电池绝对靠谱",
                    image: ""
                },
                {
                    id: "6",
                    title: "苹果",
                    subTitle: "我的价格是真的不贵",
                    image: ""
                }
            ]
        }
    }

    // 生成FlatList的每一项
    _renderItem = ({item, index}) => {
        return (
            <View style={styles.item}>
                <Image 
                    source={item.uri}
                    style={styles.image}>
                </Image>
                <View style={styles.content}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.subTitle}>{item.subTitle}</Text>
                </View>
            </View>
        )
    }

    // 为FlatList的每一项生成唯一key
    _keyExtractor = (item, index) => {
        return item.id;
    }

    render() {
        return (
            <FlatList
                data={this.state.products}
                renderItem={this._renderItem}
                keyExtractor={this._keyExtractor}
            ></FlatList>
        )
    }
}

const styles = StyleSheet.create({
    products: {
        flex: 1,
        backgroundColor: "blue"
    },
    item: {
        flexDirection: 'row',
        justifyContent: "center",
        alignContent: 'center',
        marginHorizontal: 10,
        marginTop: 10,
        height: 60,
    },
    image: {
        marginRight: 10,
        width: 50,
        height: 50,
        backgroundColor: "green"
    },
    content: {
        flex: 1
    },
    title: {
        lineHeight: 28,
        fontSize: 16,
        color: "#000"
    },
    subTitle: {
        lineHeight: 18,
        fontSize: 12,
        color: "#ccc"
    }
})
```

版本二，添加下拉刷新功能

```jsx
import React, { Component } from 'react';
import { 
    Text, 
    StyleSheet, 
    View,
    FlatList,
    Image,
    RefreshControl,
} from 'react-native';

export default class Products extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isRefreshing: false,
            products: [...]
        }
    }

    // 此处省略未作改变的代码...

    // 下拉刷新取出新商品
    _renderRefreshContrl = () => {
        this.setState({isRefreshing: true});
        setTimeout(() => {
          const newProducts = Array.from(Array(10)).map((v, i) => ({
            id: "" + i,
            title: `新商品${i+1}`,
            subTitle: `新描述${i+1}`,
            image: require("../image/eyes.png"),
          }));
          this.setState({isRefreshing: false, products: newProducts});
        }, 2000);
    }

    render() {
        return (
            <FlatList
                data={this.state.products}
                renderItem={this._renderItem}
                keyExtractor={this._keyExtractor}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={this._renderRefreshContrl}
                        title="正在刷新"
                        colors={["red", "yellow"]}
                        progressBackgroundColor="blue"
                        progressViewOffset={50}/>
                }
            ></FlatList>
        )
    }
}
```

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

## 页面导航

现在我们的首页功能基本开发完毕，接下来要添加其它页面，那么势必就会存在页面之间的跳转，那么如何管理这些页面就是我们首要解决的问题，这里我们采用由官方推荐的第三方导航插件`react-navigation`来解决我们的问题。

既然是非内置插件，那么我们首先得安装它，运行命令：`yarn add react-navigation`。

### 项目结构调整

引入了导航插件，那么就意味着接下来会有更多的页面功能需要实现，为了让项目结构更清晰，让页面管理更容易梳理，我们需要重新设计一下项目目录结构。

主要是新增了`navigation`目录，并创建了`navigation/GlobalStack.js`组件。

再然后是新增了`page`目录，并添加了`page/main`与`page/product`子目录。
`page/main`里放置的都是入口页面，就是App打开时进入的页面，一般是个可Tab切换的多页面控件，目前我们没有Tab功能，只有一个`page/main/Home.js`首页。
`page/product`里放置的都是商品相关的页面，目前我们只有一个`Detail.js`详情页。

```txt
- app
    |-- image                                 *图片资源
    |-- api                                    接口
        └── index.js:                          模块入口
    |-- constant                              *常量
        └── index.js:                          模块入口
    |-- components                            *公共组件
        └── Searchbar.js:                      搜索条                
        └── Advertisement.js:                  幻灯片广告
        └── Products.js:                       商品列表      
    |-- navigation                            *导航配置
        └── GlobalStack.js                     全局堆栈导航
    |-- page                                  *页面容器
        |-- main                               *入口模块页面
            └── Home.js                         首页
        |-- product                            *商品模块页面
            └── Detail.js                       详情页
```

### 首页

我们把之前`App.js`的代码全部搬过来，但是注意要修改内部导入其它组件的路径。

```jsx
// 此处代码未做任何修改...

import Searchbar from '../../components/Searchbar';
import Adverticement from '../../components/Adverticement';
import Products from '../../components/Products';

// 此处代码未做任何修改...
```

### 详情页

商品对应的详情页，点击首页的商品列表，便会跳转到这里。

```jsx
import React, { Component } from 'react';
import { 
    Text, 
    StyleSheet, 
    View, 
    TouchableOpacity 
} from 'react-native';

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
                <Text style={styles.back}>返回{this.navigationParams && this.navigationParams.a}</Text>
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

### 全局导航

我们在这里把`Home`首页和`Detail`详情页分别导入进来，然后进行导航配置。
如果配置没有问题，项目能够顺利跑起来的话，修改`initialRouteName`配置，就会看到不同的页面。

```jsx
import { createStackNavigator } from 'react-navigation';
import Home from '../../app/page/main/Home';
import Detail from '../../app/page/product/Detail';

export default createStackNavigator(
  // 导航配置
  {
    home: {
      screen: Home,
      navigationOptions: ({navigation, navigationOptions}) => ({
        header: null,
      })
    },
    detail: {
      screen: Detail,
      navigationOptions: ({navigation, navigationOptions}) => ({
        title: "商品详情",
      })
    }
  },
  // 默认页面
  {
    initialRouteName: "home"
  }
)
```

### App.js

我们以及把`App.js`的代码移植了出去，现在我们这里只需做个搬运工，把全局导航组件抛出即可。

```jsx
import GlobalStackNavigator from './app/navigation/GlobalStack';
export default GlobalStackNavigator;
```

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

## 把导航入口交由App根组件控制

### 全局导航组件

修改的项目下`app/navigation/GlobalStack.js`，把之前的代码改成一个工厂函数，传入导航入口，然后再返回相应的导航组件。

```jsx
// 此处代码未做任何修改...

export default function(initialRouteName) {
  return createStackNavigator(
    {
      home: {
        screen: Home,
        navigationOptions: ({navigation, navigationOptions}) => ({
          header: null,
        })
      },
      detail: {
        screen: Detail,
        navigationOptions: ({navigation, navigationOptions}) => ({
          title: "商品详情",
        })
      }
    },
    {
      initialRouteName
    }
  );
}
```

### 根组件

修改的项目下的`App.js`

```jsx
import GlobalStackNavigator from './app/navigation/GlobalStack';
export default (GlobalStackNavigator("home"));
```

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

## 处理首页与详情页的跳转

### 修改商品列表

修改的项目下的`app/page/main/Home.js`，点击列表中的商品进行页面跳转。

```jsx

```

### 修改详情页

修改的项目下的`app/page/product/Detail.js`，点击返回按钮返回上一页。

```jsx

```

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

## 具有Tab切换功能的入口页

### 新增个人主页

创建`app/page/main/Profile.js`，这是承载一些个人信息的页面。

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

### Tab导航

创建`app/navigation/MainTab.js`。

我们要求，App进入的首页下方要有一个Tab栏，可以进行几个页面间的切换，那么我们就需要创建一个Tab导航组件，这有别与我们前面创建的stack导航组件。

```jsx
import { createBottomTabNavigator } from 'react-navigation';
import Home from '../../app/page/main/Home';
import Profile from '../../app/page/main/Profile'

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

### 全局stack导航

我们可以把这个Tab导航组件设计为stack导航的子页面，只不过这个子页面比较特殊，它是一个嵌套的导航，这样我们可以控制什么时候进入tab入口，什么时候切换到其它页面。

```jsx
import { createStackNavigator } from 'react-navigation';
import MainTab from './MainTab';
import Home from '../../app/page/main/Home';
import Detail from '../../app/page/product/Detail';

export default function(initialRouteName) {
  return createStackNavigator(
    {
      main: {
        screen: MainTab,
        navigationOptions: ({navigation, navigationOptions}) => ({
          header: null,
        })
      },
      // 此处代码未做任何改动...
    },
    {
      initialRouteName
    }
  );
}
```

### 配置新的入口

打开App想看到的是带有Tab导航的入口页，那么修改`App.js`根组件中的入口名称即可。

```jsx
// 此处代码未做任何改动...
export default (GlobalStackNavigator("main"));
```

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

## 首页完整代码

```jsx
import React from "react";
import { 
  Platform, 
  Dimensions, 
  StyleSheet, 
  Text, 
  View, 
  StatusBar, 
  ScrollView, 
  TextInput, 
  Button, 
  FlatList,
  TouchableNativeFeedback,
  Alert,
  Image,
  RefreshControl
} from 'react-native';

const width = Dimensions.get("window").width;
const circleSize = 8;
const circleMargin = 5;

export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0,
      searchText: "xxx",
      isRefreshing: false,
      advertisements: [
        {
          title: "美女",
          backgroundColor: "orange",
          image: require("../../img/double-11.png")
        },
        {
          title: "豪车",
          backgroundColor: "purple",
          image: require("../../img/eyes.png")
        },
        {
          title: "美景",
          backgroundColor: "skyblue",
          image: require("../../img/five-year.png")
        }
      ],
      products: [
        {key: 'Devin', data: {
          image: require("../../img/eyes.png"),
          title: "商品1",
          subTitle: "描述1"
        }},
        {key: 'Jackson', data: {
          image: require("../../img/eyes.png"),
          title: "商品2",
          subTitle: "描述2"
        }},
        {key: 'James', data: {
          image: require("../../img/eyes.png"),
          title: "商品3",
          subTitle: "描述3"
        }},
        {key: 'Joel', data: {
          image: require("../../img/eyes.png"),
          title: "商品4",
          subTitle: "描述4"
        }},
        {key: 'John', data: {
          image: require("../../img/eyes.png"),
          title: "商品5",
          subTitle: "描述5"
        }},
        {key: 'Jillian', data: {
          image: require("../../img/eyes.png"),
          title: "商品6",
          subTitle: "描述6"
        }},
        {key: 'Jimmy', data: {
          image: require("../../img/eyes.png"),
          title: "商品7",
          subTitle: "描述7"
        }},
        {key: 'Julie', data: {
          image: require("../../img/eyes.png"),
          title: "商品8",
          subTitle: "描述8"
        }},
      ]
    }
  }

  componentDidMount() {
    this._startTimer()
  }

  componentWillUnmount() {
    this._endTimer();
  }

  _startTimer() {
    this.timer = setInterval(() => {
      let nextPage = this.state.currentPage + 1;
      nextPage = nextPage < 3? nextPage : 0;
      this.setState({currentPage: nextPage});

      const offsetX = width * nextPage;
      this.refs.scrollView.scrollTo({x: offsetX, y: 0, animated: true})
    }, 2000);
  }

  _endTimer() {
    clearInterval(this.timer);
  }

  _scrollBeginDrag = () => {
    this._endTimer();
  }

  _scrollEndDrag = () => {
    this._startTimer();
  }

  _renderItem = ({item}) => {
    return (
      <TouchableNativeFeedback onPress={() => {
        const {navigation} = this.props;
        navigation && navigation.push("detail", {a:"传参"})
      }}>
        <View style={styles.productRow}>
          <Image style={styles.productImage} source={item.data.image}></Image>
          <View style={styles.productText}>
            <Text style={styles.productTitle}>{item.data.title}</Text>
            <Text style={styles.productSubtitle}>{item.data.subTitle}</Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    );
  }

  _renderSeparator = ({index}) => {
    return (
      <View key={index} style={styles.divider}></View>
    )
  }

  _renderRefreshContrl = () => {
    this.setState({isRefreshing: true});
    setTimeout(() => {
      const newProducts = Array.from(Array(10)).map((v, i) => ({
        key: ""+i,
        data: {
          image: require("../../img/eyes.png"),
          title: `新商品${i+1}`,
          subTitle: `新描述${i+1}`
        }
      }));
      this.setState({isRefreshing: false, products: newProducts});
    }, 2000);
  }

  render() {

    // 计算轮播指示器位置
    const advertisementCount = this.state.advertisements.length;
    const indicatorWidth = circleSize * advertisementCount
      + circleMargin * advertisementCount * 2;
    const indicatorOffsetX = (width - indicatorWidth) / 2; 

    return (
      <View style={styles.container}>
        {/* 状态栏背景色和透明只在Android中有效 */}
        <StatusBar 
          barStyle="light-content" 
          backgroundColor="#eee"
          translucent={false}>
        </StatusBar>
        {/* 搜索条 */}
        <View style={styles.searchBar}>
          <TextInput 
            style={styles.searchBar_input} 
            underlineColorAndroid="transparent"
            onChangeText={text => {
              this.setState({searchText: text});
              console.log(text);
            }}
            placeholder="搜索商品">
          </TextInput>
          <Button 
            style={styles.searchBar_button} 
            color="#841584"
            onPress={() => {
              Alert.alert(`搜索内容:${this.state.searchText}`);
            }}
            title="搜索">
          </Button>
        </View>
        {/* 轮播广告 */}
        <View style={styles.advertisement}>
          <ScrollView 
            ref="scrollView" 
            onScrollBeginDrag={this._scrollBeginDrag}
            onScrollEndDrag={this._scrollEndDrag}
            horizontal={true} 
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}>
            {
              this.state.advertisements.map((item, i) => {
                return (
                  <TouchableNativeFeedback key={i}>
                    <Image 
                      source={item.image}
                      style={[styles.advertisement_item, {
                        backgroundColor: item.backgroundColor
                      }]}>
                    </Image>
                  </TouchableNativeFeedback>
                )
              })
            }
          </ScrollView>
          <View style={[
            styles.indicator, {
              left: indicatorOffsetX
            }
          ]}>
            {
              this.state.advertisements.map((item, i) => {
                const dynamicStyle = 
                  i === this.state.currentPage
                  ? styles.circleSelected
                  : {};
                return (<View key={i} style={[styles.circle, dynamicStyle]}></View>)
              })
            }
          </View>
        </View>
        {/* 商品列表 */}
        <View style={styles.products}>
          {/* 默认情况下每行都需要提供一个不重复的 key 属性。你也可以提供一个keyExtractor函数来生成 key。 */}
          <FlatList 
            data={this.state.products}
            renderItem={this._renderItem}
            onRefresh={this._renderRefreshContrl}
            refreshing={this.state.isRefreshing}
            ItemSeparatorComponent={this._renderSeparator}>
            {/* refreshControl={<RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._renderRefreshContrl}
              title="正在刷新"
              colors={["red", "yellow"]}
              progressBackgroundColor="blue"
              progressViewOffset={50}
            />}> */}
          </FlatList>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    flexDirection: "row",
    padding: 4,
    marginTop: 24,
    height: 40,
    backgroundColor: "#eee"
  },
  searchBar_input: {
    flex: 1,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: "gray",
    marginRight: 6,
    paddingLeft: 10
  },
  searchBar_button: {
    color: "white",
  },
  advertisement: {
    height: 180,
    backgroundColor: "green"
  },
  advertisement_item: {
    width: width,
    height: "100%",
    backgroundColor: "red",
  },
  indicator: {
    position: "absolute",
    top: 160,
    flexDirection: "row"
  },
  circle: {
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize / 2,
    backgroundColor: '#ccc',
    marginHorizontal: circleMargin
  },
  circleSelected: {
    backgroundColor: '#fff',
  },
  products: {
    flex: 1,
    backgroundColor: "#eee"
  },
  productRow: {
    flexDirection: "row",
    alignItems: 'center',
    height: 60
  },
  productImage: {
    alignSelf: 'center',
    marginHorizontal: 10,
    width: 40,
    height: 40
  },
  productText: {
    flex: 1,
    marginVertical: 10,
  },
  productTitle: {
    flex: 3,
    fontSize: 16
  },
  productSubtitle: {
    flex: 2,
    fontSize: 14,
    color: "#ccc"
  },
  divider: {
    height: 1,
    marginHorizontal: 5,
    backgroundColor: "lightgray"
  }
});
```

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
