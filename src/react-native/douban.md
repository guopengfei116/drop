# 豆瓣电影列表案例

## scrollView

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
