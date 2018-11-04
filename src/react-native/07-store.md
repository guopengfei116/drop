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
                ItemSeparatorComponent={this._renderSeparator}
                refreshControl={ {/*此处未做任何修改...*/} }
            ></FlatList>
        )
    }
}

// 此处未做任何修改...
```

版本三，商品之间添加分割线

```jsx
// 此处省略未修改内容...

export default class Products extends Component {
    // 此处省略未修改内容...

    // 为FlatList的子项之间添加分割线，头尾没有
    _renderSeparator = (section) => {
        return (
          <View key={section.leadingItem.id} style={styles.divider}></View>
        )
    }

    render() {
        return (
            <FlatList
                // 此处省略未修改内容...
                ItemSeparatorComponent={this._renderSeparator}
            >
            </FlatList>
        )
    }

    // 此处省略未修改内容...
}

const styles = StyleSheet.create({
    // 此处省略未修改内容...
    divider: {
        height: 1,
        marginHorizontal: 5,
        backgroundColor: "lightgray"
    },
    // 此处省略未修改内容...
})
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

打开`app/page/main/Home.js`首页，把之前`App.js`的代码全部搬过来，但是注意要修改内部导入其它组件的路径。

```jsx
// 此处代码未做任何修改...

import Searchbar from '../../components/Searchbar';
import Adverticement from '../../components/Adverticement';
import Products from '../../components/Products';

// 此处代码未做任何修改...
```

### 详情页

先简单实现`app/page/product/Detail.js`商品详情页，以便在首页点击商品列表时可以正确跳转到这里。

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

编写`app/navigation/GlobalStack.js`全局导航，首先导入我们需要的`createStackNavigator`栈导航器工厂，然后导入`Home`首页和`Detail`商品详情页进行导航。

如果配置没有问题，项目能够顺利跑起来的话，修改`initialRouteName`配置，就会看到不同的页面。

```jsx
import { createStackNavigator } from 'react-navigation';
import Home from '../../app/page/main/Home';
import ProductDetail from '../../app/page/product/Detail';

export default createStackNavigator(
  // 导航配置
  {
    home: {
      screen: Home,
      // 首页不需要header
      navigationOptions: ({navigation, navigationOptions}) => ({
        header: null,
      })
    },
    productDetail: {
      screen: ProductDetail,
      // 商品详情需要header，并且需要设置header的标题
      navigationOptions: ({navigation, navigationOptions}) => ({
        title: "商品详情",
      })
    }
  },
  // 默认启动的导航配置
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

## 处理首页与详情页的跳转

一切准备就绪，接下来我们实现`Home`和`Detail`页面之间的跳转，要实现这个跳转功能，需要使用一个关键的对象，navigation对象，这个对象默认会传递给被导航的组件，也就是说`Home`和`Detail`页面是可以拿到的，可以打印`this.props.navigation`查看该对象的功能方法。

但是我们需要修改的是`Products.js`商品列表子组件，这个组件并没有被直接配置到导航中，所以是没有`this.props.navigation`对象的，所以我们需要先手动把`Home`组件得到的导航对象传递给`Products`组件。

### 传递导航对象

修改项目下的`app/page/main/Home.js`，把来自导航的props参数传递给`Products`组件使用。

```jsx
// 此处代码未做任何修改...

render() {
    return (
        // 此处代码未做任何修改...

        {/* 商品列表 */}
        <Products {...this.props}></Products>

        // 此处代码未做任何修改...
    );
}

// 此处代码未做任何修改...
```

### 首页 to 商品详情页

修改项目下的`app/components/Products.js`，使用`Touchable`系列组件包裹商品Item，然后在点击时利用传递进来的`this.props.navigation.push`方法实现页面跳转。

push方法第一个参数是配置导航时自定义的名称，第二个参数是路由参数，这个参数可以在新跳转的页面中使用，实现跨页面的参数传递。通常我们会把某某某的id携带过去，这样新页面就可以通过id得到数据。

```jsx
// 此处代码未做任何修改...

// 跳转到详情页
_toProductDetail = (item) => {
    const { navigation } = this.props;
    navigation && navigation.push("productDetail", item.id);
}

// FlatList组件渲染列表
_renderItem = ({item, index}) => {
    return (
        <TouchableNativeFeedback onPress={this._toProductDetail.bind(this, item)}>
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
        </TouchableNativeFeedback>
    )
}

// 此处代码未做任何修改...
```

### 商品详情页 to 首页

修改的项目下的`app/page/product/Detail.js`，这里可以通过导航传递的`this.props.navigation.pop`方法实现上一页返回，如果有多次push，那么就可以多次pop，其实就是一个进栈出栈的过程。

如果要获取由上一页面传递的路由参数，通过`this.props.navigation.state.params`就可以拿到。

```jsx
// 此处代码未做任何修改...

export default class Detail extends Component {
  constructor(props) {  
    super(props);
    this.state = {
      id: props.navigation.state.params
    }
  }

  // 返回上一页
  _goBack = () => {
    const { navigation } = this.props;
    navigation.pop();
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title="返回" onPress={this._goBack}></Button>
        <Text style={styles.content}>{ `当前商品的ID为：${this.state.id}` }</Text>
      </View>
    )
  }
}

// 此处代码未做任何修改...
```

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

## 商品详情页

修改`app/page/product/Detail.js`组件。

**版本一：使用`react-native-swiper`插件实现商品图片预览**

- 安装`yarn add react-native-swiper`
- [github文档]<https://github.com/leecade/react-native-swiper>

```jsx
import React, { Component } from 'react';
import { 
    Text, 
    StyleSheet, 
    View, 
    TouchableOpacity,
    Dimensions,
    Image
} from 'react-native';
import Swiper from 'react-native-swiper';

export default class Detail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            product: {
                images: [
                    require("../../image/products/mix3/one.webp"),
                    require("../../image/products/mix3/two.webp"),
                    require("../../image/products/mix3/three.webp"),
                    require("../../image/products/mix3/four.webp"),
                    require("../../image/products/mix3/five.webp"),
                ],
            }
        }
    }

    render() {
        return (
        <View style={styles.container}>
            <View style={styles.SwiperSize}>
                <Swiper showsButtons={true} autoplay={true}>
                    {
                        this.state.product.images.map((image, index) => {
                            return (
                                <View style={styles.SwiperItem}>
                                    // enum('cover', 'contain', 'stretch', 'repeat', 'center')
                                    <Image 
                                        style={styles.SwiperImage}
                                        source={image}
                                        resizeMode="contain"
                                    />
                                </View>
                            )
                        })
                    }
                </Swiper>
            </View>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    SwiperSize: {
        width: Dimensions.get("window").width,
        height: 400
    },
    SwiperItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgb(246, 246, 246)"
    },
    SwiperImage: {
        width: "100%",
        height: "100%",
    },
})
```

**版本二：使用`Modal`组件实现全屏预览**

```jsx

```

**版本三，接口调用与loading处理**

```jsx
import React, { Component } from 'react';
import { 
    Text, 
    StyleSheet, 
    View, 
    TouchableOpacity,
    Dimensions,
    Image
} from 'react-native';
import Swiper from 'react-native-swiper';
import api from '../../api/douban';

export default class Detail extends Component {

    constructor(props) {
        super(props);
        this.navigation = this.props.navigation;
        this.navigationParams = this.navigation.state.params;
        this.state = {
            movieIds: [26741061, 26685451, 10759740, 25917789],
            isLoading: true,
            images: [
                require("../../image/products/mix3/one.webp"),
                require("../../image/products/mix3/two.webp"),
                require("../../image/products/mix3/three.webp"),
                require("../../image/products/mix3/four.webp"),
                require("../../image/products/mix3/five.webp"),
            ],
            product: {}
        }
    }

    componentDidMount() {
        fetch(api.movie.detail + this.state.movieIds[0])
            .then(res => res.json())
            .then(data => {
                // 数据拿到后，修改loading状态，存储数据列表
                this.setState({
                    isLoading: false,
                    product: data
                })
            })
    }
    
    // 获取loading组件
    _getLoading() {
        return (
            <ActivityIndicator size="large" color="hotpink"/>
        )
    }

    // 返回上一页
    _pressBack = () => {
        const {navigation} = this.props;
        navigation && navigation.pop();
    }

    render() {
        return (
        <View style={styles.container}>
            <View style={styles.SwiperSize}>
                <Swiper showsButtons={true} autoplay={true}>
                    {
                        this.state.images.map((image, index) => {
                            return (
                                <View style={styles.SwiperItem}>
                                    <Image 
                                        style={styles.SwiperImage}
                                        source={image}
                                        resizeMode="contain"
                                    />
                                </View>
                            )
                        })
                    }
                </Swiper>
            </View>
            <TouchableOpacity onPress={this._pressBack}>
                <Text style={styles.back}>返回{this.navigationParams && this.navigationParams.a}</Text>
            </TouchableOpacity>
            <Text style={styles.text}> 商品详情 </Text>
        </View>
        )
    }
}
```

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

## createBottomTabNavigator的使用

现在我们要给首页底部添加TabBar按钮，实现tab点击页面切换效果。`createBottomTabNavigator`就是`react-navigation`插件给我们提供的解决方案。可以认为这个导航组件提供了一个容器，可以把几个页面聚合在一起，并且以TabBar的形式进行切换。

一个很重要的特性是，不同的导航之间可以互相嵌套。这样的话我们就可以把TabBar导航组件看作是一个复合页面，然后配置到我们前面创建的全局堆栈导航组件中，并配置为默认首页，完美融入我们的导航体系。

### 创建个人页

为了让Tab导航能够管理更多页面，我们创建`app/page/main/Profile.js`个人信息页，这是承载一些个人信息的页面，将来会和`Home`首页一起由`Tab导航`组件承载，通过TabBar切换。

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

创建`app/navigation/MainTab.js`，导入`createBottomTabNavigator`工厂以及`Home`和`Profile`受控制页面。

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
    }
)
```

### stack导航修改

修改`app/navigation/GlobalStack.js`，在这里我们导入刚刚创建的Tab导航组件，把它看作一个子页面进行配置，这样我们就可以控制什么时候进入Tab首页，什么时候切换到其它页。

```jsx
import { createStackNavigator } from 'react-navigation';
import Home from '../../app/page/main/Home';
import ProductDetail from '../../app/page/product/Detail';
import MainTabNavigator from './MainTab';

export default createStackNavigator(
    // 导航配置
    {
      main: {
        screen: MainTabNavigator,
        navigationOptions: ({navigation, navigationOptions}) => ({
          header: null,
        })
      },
      // 此处代码未做任何改动...
    },
    {
      initialRouteName: "main"
    }
)
```

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

## 提升初始页面控制权

### 堆栈导航包装成工厂函数

修改的项目下`app/navigation/GlobalStack.js`，把之前的代码改成一个工厂函数，可以指定默认路由，最后返回堆栈导航组件。

```jsx
// 此处代码未做任何修改...

// 注意：导出的是一个函数
export default function(initialRouteName = "main") {
  return createStackNavigator(
    {
      main: {
        screen: MainTabNavigator,
        navigationOptions: () => ({
          header: null  
        })
      },
      // 此处代码未做任何修改...
    },
    {
      initialRouteName
    }
  )
}
```

### 根组件

修改的项目下的`App.js`，调用改造后的工厂函数，传入那个入口，默认就渲染那个入口。

```jsx
import navigatorFactory from './app/navigation/GlobalStack';

// APP入口配置
const root = "main";
export default navigatorFactory(root);
```

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

## 新增首屏海报

创建`app/page/entry/index.js`，在这里我们使用`ViewPagerAndroid`组件实现该功能，但是这个组件只能在Android手机有效，如果是ios的话可以使用`TabBarIOS`组件或者之前的导航插件，但是需要隐藏底部tab。

**版本一：实现基本效果**

```jsx
import React, { Component } from 'react'
import { 
  Text, 
  StyleSheet, 
  View,
  ViewPagerAndroid,
  StatusBar,
  Image,
  Dimensions,
} from 'react-native';

export default class index extends Component {

  state = {
    posters: [
      require("../../image/entry/shiyiyue.png"),
      require("../../image/entry/shiyiyuedong.png"),
      require("../../image/entry/daojishi.png"),
    ]
  }

  render() {
    return (
      <View style={styles.container}>
        {/* 隐藏状态栏 */}
        <StatusBar hidden={true}/>

        {/* 宣传海报 */}
        <ViewPagerAndroid style={styles.container}>
          {
            this.state.posters.map((poster, index) => {
              return (
                <View style={styles.container} key={index}>
                  <Image style={styles.poster} source={poster}></Image>
                </View>
              )
            })
          }
        </ViewPagerAndroid>

        {/* 跳过按钮 */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get("window").width,
  },
  poster: {
    width: "100%",
    height: "100%",
  },
})
```

**版本二：实现倒计时跳过按钮**

```jsx
import React, { Component } from 'react'
import { 
  Text, 
  StyleSheet, 
  View,
  ViewPagerAndroid,
  StatusBar,
  Image,
  Dimensions,
} from 'react-native';

export default class index extends Component {

  state = {
    isAllowLeave: false,
    isAllowLeaveTime: 2,
    posters: [
      require("../../image/entry/shiyiyue.png"),
      require("../../image/entry/shiyiyuedong.png"),
      require("../../image/entry/daojishi.png"),
    ]
  }

  // 在这里我们用timeout-loop的方式每秒倒计时-1，当时间为0时，结束loop
  componentDidMount() {
    (function loop() {
      // 时间为0，用户可以离开，停止loop
      if (this.state.isAllowLeaveTime <= 0) {
        this.setState({isAllowLeave: true});
        return;
      }

      // 倒计时，loop
      setTimeout(() => {
        this.setState({isAllowLeaveTime: this.state.isAllowLeaveTime - 1});
        loop.call(this);
      }, 1000);
    }).call(this);
  }

  render() {
    return (
      <View style={styles.container}>
        {/* 隐藏状态栏 */}
        <StatusBar hidden={true}/>

        {/* 宣传海报 */}
        <ViewPagerAndroid style={styles.container}>
          {
            this.state.posters.map((poster, index) => {
              return (
                <View style={styles.container} key={index}>
                  <Image style={styles.poster} source={poster}></Image>
                </View>
              )
            })
          }
        </ViewPagerAndroid>

        {/* 跳过按钮 */}
        <View style={[styles.leaveButton, this.state.isAllowLeave? styles.leaveButtonActive : ""]}>
          <Text style={[styles.leaveText, this.state.isAllowLeave? styles.leaveTextActive : ""]}>
            <Text>跳过</Text>
            <Text>({this.state.isAllowLeaveTime}s)</Text>
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get("window").width,
  },
  poster: {
    width: "100%",
    height: "100%",
  },
  leaveButton: {
    justifyContent: "center",
    alignContent: "center",
    position: "absolute",
    left: (Dimensions.get("window").width - 150) / 2,
    bottom: 50,
    width: 150,
    height: 40,
    backgroundColor: "rgba(200, 200, 200, 0.7)",
    borderRadius: 6,
    // Android不生效
    shadowColor: "black",
    shadowOpacity: 0.8,
    shadowRadius: 6,
    shadowOffset: { width:2, height:2 }
  },
  leaveButtonActive: {
    backgroundColor: "rgba(72, 72, 72, 0.9)"
  },
  leaveText: {
    textAlign: "center",
    fontSize: 24,
    color: "rgb(144, 144, 144)",
  },
  leaveTextActive: {
    color: "#fff",
    fontWeight: "bold"
  }
})
```

**版本三：实现不留痕迹跳转**

```jsx
import React, { Component } from 'react'
import { 
  Text, 
  StyleSheet, 
  View,
  ViewPagerAndroid,
  StatusBar,
  Image,
  Dimensions,
  TouchableNativeFeedback,
} from 'react-native';

export default class index extends Component {

  state = {
    isAllowLeave: false,
    isAllowLeaveTime: 3,
    posters: [
      require("../../image/entry/shiyiyue.png"),
      require("../../image/entry/shiyiyuedong.png"),
      require("../../image/entry/daojishi.png"),
    ]
  }

  // 在这里我们用timeout-loop的方式每秒倒计时-1，当时间为0时，结束loop
  componentDidMount() {
    (function loop() {
      // 时间为0，用户可以离开，停止loop
      if (this.state.isAllowLeaveTime <= 0) {
        this.setState({isAllowLeave: true});
        return;
      }

      // 倒计时，loop
      setTimeout(() => {
        this.setState({isAllowLeaveTime: this.state.isAllowLeaveTime - 1});
        loop.call(this);
      }, 1000);
    }).call(this);
  }

  // 离开，跳转到首页
  _leave = () => {
    if (!this.state.isAllowLeave) return;
    const navigation = this.props.navigation;
    navigation.replace("main");
  }

  render() {
    return (
      <View style={styles.container}>
        {/* 隐藏状态栏 */}
        <StatusBar hidden={true}/>

        {/* 宣传海报 */}
        <ViewPagerAndroid style={styles.container} initialPage={0}>
          {
            this.state.posters.map((poster, index) => {
              return (
                <View style={styles.container} key={index}>
                  <Image style={styles.poster} resizeMode="cover" source={poster}></Image>
                </View>
              )
            })
          }
        </ViewPagerAndroid>

        {/* 跳过按钮，这里因为View使用了定位，所以不能使用其它两个touchable组件，因为他们俩会有自己的组件层，不一样能够覆盖住定位的元素 */}
        <TouchableNativeFeedback onPress={this._leave}>
          <View style={[styles.leaveButton, this.state.isAllowLeave? styles.leaveButtonActive : ""]}>
            <Text style={[styles.leaveText, this.state.isAllowLeave? styles.leaveTextActive : ""]}>
              <Text>跳过</Text>
              {
                !this.state.isAllowLeave? <Text>({this.state.isAllowLeaveTime}s)</Text> : ""
              }
            </Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    )
  }
}
```

**补充：直接在View监听触摸响应事件**

```jsx
import React, { Component } from 'react'
import { 
  Text, 
  StyleSheet, 
  View,
  Image,
  ViewPagerAndroid,
  Dimensions,
  StatusBar,
} from 'react-native';

export default class One extends Component {

  state = {
    isAllowLeave: false,
    isAllowLeaveTime: 3,
    posters: [
      require("../../image/entry/shiyiyue.png"),
      require("../../image/entry/shiyiyuedong.png"),
      require("../../image/entry/daojishi.png"),
    ]
  }

  componentDidMount() {
    (function loop() {
      // 到时间为0的时候允许用户跳过
      if(this.state.isAllowLeaveTime <= 0) {
        this.setState({isAllowLeave: true});
        return;
      }
      // 倒计时
      setTimeout(() => {
        const isAllowLeaveTime = this.state.isAllowLeaveTime - 1;
        this.setState({isAllowLeaveTime});
        loop.call(this);
      }, 1000);
    }).call(this);
  }

  // 控制按钮是否应该响应触屏事件
  _hasResponder = () => {
    return this.state.isAllowLeave;
  }

  // 跳出入场海报
  _leave = () => {
    this.props.navigation.replace(this.props.nextRouteName || "main");
  }

  // 渲染海报Item
  _renderPosterItem = () => {
    return this.state.posters.map((poster, index) => {
      return (
        <View key={index}>
          <Image
            style={styles.poster} 
            resizeMode="stretch"
            resizeMethod="scale"
            source={poster}>
          </Image>
        </View>
      )
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {/* 隐藏状态栏 */}
        <StatusBar hidden={true}/>

        {/* 首屏海报 */}
        <ViewPagerAndroid style={styles.container} initialPage={0}>
          { this._renderPosterItem() }
        </ViewPagerAndroid>
        
        {/* 跳过按钮 */}
        <View
            style={[styles.leaveButton, this.state.isAllowLeave && styles.leaveButtonActive]}
            onStartShouldSetResponder={this._hasResponder}
            onResponderGrant={this._leave}
            color="red">
            <Text style={[styles.leaveText, this.state.isAllowLeave && styles.leaveTextActive]}>
              <Text>跳过</Text>
              {
                !this.state.isAllowLeave
                && <Text>{'(' + this.state.isAllowLeaveTime + 's)'}</Text>
              }
            </Text>
          </View>
      </View>
    )
  }
}
```
