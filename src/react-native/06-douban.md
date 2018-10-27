# 豆瓣电影案例

## 项目创建与目录结构设计

使用`create-react-native-app projectName`命令创建一个项目，然后在项目中创建`src`文件夹作为源代码目录，里面创建`config`目录存放常量与配置数据，创建`components`目录存放项目组件，组件划分为公共组件与页面组件两种。

```txt
- src
    - config
        - api.js: 项目所需接口
    - components
        - common
            - Banner.js: 头部轮播图
            - Navbar.js：底部导航
        - page
            - Home.js：首页
            - find
                - Find.js：发现页
            - profile
                - Profile.js：个人页
            - book
                - BookList.js：书籍列表
                - BookDetail.js：书籍详情
            - music
                - MusicList.js：音乐列表
                - MusicDetail.js：音乐详情
            - movie
                - MovieList.js：电影列表
                - MovieDetail.js：电影详情
```

- - - - - - - - - - - - - - - - - - - - - - -

## 配置文件

### API配置文件

- 创建 `src/config/api.js` 文件，配置项目所属的接口，将来接口变化修改这里即可
- [豆瓣接口文档](https://developers.douban.com/wiki/?title=api_v2)

```js
const dbDomain = 'http://api.douban.com/v2';

export default {

    // 书籍
    book: {},

    // 音乐
    music: {},

    // 电影
    movie: {
        // 正在热映
        hot: `${dbDomain}/movie/in_theaters`,
        // 即将上映
        soon: `${dbDomain}/movie/coming_soon`,
        // top250
        top: `${dbDomain}/movie/top250`,
        // 详情
        detail: `${dbDomain}/movie/subject/` // 后面需要加电影:id路径参数
    }
    
}
```

- - - - - - - - - - - - - - - - - - - - - - -

## 公共Banner与NavBar

### Banner

- 安装 `yarn add react-native-swiper` 插件
- 删除源码中`fontFamily`样式，这个字体在原生Android中默认未安装，使用时会报错
- 创建 `src/components/common/Banner.js` 头部轮播图组件

```jsx
import React, { Component } from 'react';
const Dimensions = require('Dimensions');
const screenSize = Dimensions.get("window");
import {
    StyleSheet,
    View,
    Text,
    Button,
    Image,
    TouchableHighlight
} from 'react-native';

import Swiper from 'react-native-swiper';

export default class Banner extends Component {

    constructor(props) {
        super(props);
        this.state = {
            list: [
                {id: 1, uri: 'http://img0.imgtn.bdimg.com/it/u=1292571282,473977860&fm=27&gp=0.jpg'},
                {id: 2, uri: 'http://img1.imgtn.bdimg.com/it/u=2345964138,2156090285&fm=27&gp=0.jpg'},
                {id: 3, uri: 'http://img3.imgtn.bdimg.com/it/u=3367888536,3273349933&fm=27&gp=0.jpg'},
            ]
        };
    }

    // 进入详情页
    _pushDetail(id) {
        console.log(`进入${id}详情页`);
    }

    // 列表渲染
    _getList() {
        return (
            this.state.list.map((item, i) => {
                return (
                    <View style={styles.item} key={`key${i}`}>
                        <TouchableHighlight
                            activeOpacity={0.75}
                            underlayColor="#c1c1c1"
                            onPress={this._pushDetail.bind(this, item.id)}>
                            <Image
                                style={styles.itemImg} 
                                source={{uri: item.uri}}>
                            </Image>
                        </TouchableHighlight>
                    </View>
                )
            })
        )
    }

    // Banner高度
    _getHeight() {
        return this.props.height || 200;
    }

    render() {
        return (
            <View style={[styles.wrapper, {height: this._getHeight()}]}>
                <Swiper showsButtons={true} autoplay={true}>
                    {/* 列表渲染 */}
                    { this._getList() }
                </Swiper>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
    },
    item: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemImg: {
        width: '100%',
        height: '100%'
    }
});
```

### NavBar

- 创建 `src/components/common/Banner.js` 底部导航组件

```jsx
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableNativeFeedback
} from 'react-native';

export default function(props) {
    return (
        <View style={[styles.wrapper, props.style]}>
            <View style={styles.item}>
                <Text style={styles.itemText}>首页</Text>
            </View>

            <View style={styles.item}>
                <Text style={styles.itemText}>发现</Text>
            </View>
            <View style={styles.item}>
                <Text style={styles.itemText}>我</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: 40,
        backgroundColor: 'skyblue',
        flexDirection: 'row',
    },
    item: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    }
});
```

- - - - - - - - - - - - - - - - - - - - - - -

## Home页

- Home是应用的首页，由头部Banner轮播图、底部NavBar导航、中部九宫格构成。
- 首先导入写好的 Banner 与 Navbar 组件，然后实现中部九宫格布局。

```jsx
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableNativeFeedback
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import Banner from '../common/Banner';
import NavBar from '../common/NavBar';

export default class Home extends Component {
    render() {
        return (
            <View style={styles.wrapper}>
                <Banner></Banner>
                <View style={styles.apps}>
                    <View style={styles.appsRow}>
                        {/* 1 三个touchable组件，只有这个效果组件不影响结构与样式，其他两个影响 */}
                        <TouchableNativeFeedback activeOpacity={0.8} onPress={Actions.book}>
                            <View style={[styles.appsRowItem, {backgroundColor: 'blue'}]}>
                                <Text style={styles.appsRowItemText}>书籍</Text>
                            </View>
                        </TouchableNativeFeedback>
                        {/* 2 */}
                        <TouchableNativeFeedback activeOpacity={0.8} onPress={Actions.music}>
                            <View style={[styles.appsRowItem, {backgroundColor: 'yellow'}]}>
                                <Text style={styles.appsRowItemText}>音乐</Text>
                            </View>
                        </TouchableNativeFeedback>
                        {/* 3 */}
                        <TouchableNativeFeedback activeOpacity={0.8} onPress={Actions.movie}>
                            <View style={[styles.appsRowItem, {backgroundColor: 'green'}]}>
                                <Text style={styles.appsRowItemText}>电影</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                    <View style={styles.appsRow}>
                        <View style={[styles.appsRowItem, {backgroundColor: 'pink'}]}>
                            <Text style={styles.appsRowItemText}>同城</Text>
                        </View>
                        <View style={[styles.appsRowItem, {backgroundColor: 'skyblue'}]}>
                            <Text style={styles.appsRowItemText}>广播</Text>
                        </View>
                        <View style={[styles.appsRowItem, {backgroundColor: 'orange'}]}>
                            <Text style={styles.appsRowItemText}>相册</Text>
                        </View>
                    </View>
                    <View style={styles.appsRow}>
                        <View style={[styles.appsRowItem, {backgroundColor: 'cyan'}]}>
                            <Text style={styles.appsRowItemText}>论坛</Text>
                        </View>
                        <View style={[styles.appsRowItem, {backgroundColor: 'purple'}]}>
                            <Text style={styles.appsRowItemText}>线上活动</Text>
                        </View>
                        <View style={[styles.appsRowItem, {backgroundColor: 'hotpink'}]}>
                            <Text style={styles.appsRowItemText}>线下活动</Text>
                        </View>
                    </View>
                </View>
                <NavBar></NavBar>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        width: '100%',
        position: 'relative',
    },
    apps: {
        height: 450
    },
    appsRow: {
        flex: 1,
        flexDirection: 'row',
    },
    appsRowItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    appsRowItemText: {
        fontSize: 26
    }
})
```

- - - - - - - - - - - - - - - - - - - - - - -

## 底部导航顶级入口页

- 在 NavBar 中设定了三个顶级入口，先把他们都创建好，下一步就实现他们之间的路由切换
- 创建 `src/components/page/find/Find.js` 发现页面组件
- 创建 `src/components/page/profile/Profile.js` 个人中心页面组件

```jsx
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableNativeFeedback
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import NavBar from '../../common/NavBar';

export default class Find extends Component {

    render() {
        return (
            // 为了让底部导航定位而relative
            <View style={{flex: 1, position: 'relative'}}>
                <Text>发现</Text>
                <Text>发现</Text>
                <Text>发现</Text>
                <Text>发现</Text>
                <Text>发现</Text>
                <NavBar></NavBar>
            </View>
        )
    }

}
```

```jsx
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableNativeFeedback
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import NavBar from '../../common/NavBar';

export default class Profile extends Component {

    render() {
        return (
            // 为了让底部导航定位而relative
            <View style={{flex: 1, position: 'relative'}}>
                <Text>我的</Text>
                <Text>我的</Text>
                <Text>我的</Text>
                <Text>我的</Text>
                <Text>我的</Text>
                <NavBar></NavBar>
            </View>
        )
    }

}
```

## 集成react-native-router-flux

- 这是一个基于 react-native-navigator 开发的第三方路由插件
- [详情可查看github官方文档](https://github.com/aksonov/react-native-router-flux)
- 运行安装命令: `yarn add react-native-router-flux -S`

### 路由配置

修改根目录下的 `App.js` ，在这里进行路由配置，先配置底部导航对应的三个页面进行路由测试。

```jsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Router, Stack, Scene } from 'react-native-router-flux';

import Home from './src/components/page/Home';
import Find from './src/components/page/find/Find';
import Profile from './src/components/page/profile/Profile';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        {/* stack可以对scene进行分组，stack可以包含子stack */}
        <Stack key="root">
          {/* scene用来配置页面路由信息，key与component属性是必须的，其中key值而且必须唯一，通过key可进行页面的切换 */}
          <Scene hideNavBar key="home" component={Home}></Scene>
          <Scene hideNavBar key="find" component={Find}></Scene>
          <Scene hideNavBar key="profile" component={Profile}></Scene>
        </Stack>
      </Router>
    );
  }
}
```

### Navbar修改

- 导入 `TouchableNativeFeedback` 组件包装底部导航项，并绑定点击事件
- 导入 `Actions` 对象实现路由跳转

```jsx
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableNativeFeedback
} from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class NavBar extends Component {

    render() {
        return (
            <View style={styles.wrapper}>
                {/* 通过Actions[配置的路由key]方法实现页面跳转 */}
                <TouchableNativeFeedback onPress={Actions.home}>
                    <View style={styles.item}>
                        <Text style={styles.itemText}>首页</Text>
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={Actions.find}>
                    <View style={styles.item}>
                        <Text style={styles.itemText}>发现</Text>
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={Actions.profile}>
                    <View style={styles.item}>
                        <Text style={styles.itemText}>我</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: 50,
        backgroundColor: 'skyblue',
        flexDirection: 'row'
    },
    item: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    }
})
```

- - - - - - - - - - - - - - - - - - - - - - - -

## 九宫格对应页面路由配置

### 创建组件

- 创建 `src/components/page/book/BookList.js`
- 创建 `src/components/page/book/BookDetail.js`
- 创建 `src/components/page/music/MusicList.js`
- 创建 `src/components/page/music/MusicDetail.js`
- 创建 `src/components/page/movie/MovieList.js`
- 创建 `src/components/page/movie/MovieDetail.js`

### 路由配置

- 修改 `App.js` 根组件, 导入新模块组件，并进行路由配置

```jsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Router, Stack, Scene } from 'react-native-router-flux';

import Home from './src/components/page/Home';
import Find from './src/components/page/find/Find';
import Profile from './src/components/page/profile/Profile';

import BookList from './src/components/page/book/BookList';
import BookDetail from './src/components/page/book/BookDetail';

import MusicList from './src/components/page/music/MusicList';
import MusicDetail from './src/components/page/music/MusicDetail';

import MovieList from './src/components/page/movie/MovieList';
import MovieDetail from './src/components/page/movie/MovieDetail';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        {/* stack可以对scene进行分组，stack可以包含子stack */}
        <Stack key="root">

          {/* scene用来配置页面信息的，其中key属性是必须的，而且必须唯一，需要通过key进行页面切换 */}
          <Scene key="home" component={Home} hideNavBar></Scene>
          <Scene key="find" component={Find} hideNavBar></Scene>
          <Scene key="profile" component={Profile} hideNavBar></Scene>

          {/* 书籍路由配置 */}
          <Stack key="book" title="书籍">
            {/* scene有一个initial属性，用来指定该stack下的组件入口，入口组件可以通过Stack的key进入 */}
            {/* 将来组件的入口变化了，修改initial属性就可 */}
            <Scene initial hideNavBar key="bookList" component={BookList}></Scene>
            <Scene hideNavBar key="bookDetail" component={BookDetail}></Scene>
          </Stack>

          {/* 音乐路由配置 */}
          <Stack key="music" title="音乐">
            <Scene initial title="列表" key="musicList" component={MusicList}></Scene>
            <Scene title="详情" key="musicDetail" component={MusicDetail}></Scene>
          </Stack>
          
          {/* 电影路由配置 */}
          <Stack key="movie" hideNavBar backButtonTintColor={"skyblue"} navigationBarStyle={styles.navigationBarStyle} titleStyle={styles.navigationBarTitleStyle}>
            {/* stack拥有一个所有子组件的公共title，每个scene还拥有自己独立的子title */}
            {/* 你可以根据需要统一使用stack-title，或者隐藏stacktitle，使用独立子title */}
            {/* 或者都使用，或者都不使用 */}
            <Scene title="电影" hideTabBar={false} hideNavBar={false} key="movieList" component={MovieList}></Scene>
            <Scene title="电影详情" hideNavBar={false} leftButtonIconStyle={{color: 'blue'}} key="movieDetail" component={MovieDetail}></Scene>
          </Stack>
        </Stack>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navigationBarStyle: {
    backgroundColor: 'skyblue',
    height: 30
  },
  navigationBarTitleStyle: {
    color: 'hotpink',
  }
});
```

### 九宫格元素事件绑定

修改 Home 组件，使用Touchable组件包装里面的项，并绑定路由跳转方法

```jsx
<View style={styles.appsRow}>
    {/* 1 三个touchable组件，只有这个效果组件不影响结构与样式，其他两个影响 */}
    <TouchableNativeFeedback activeOpacity={0.8} onPress={Actions.book}>
        <View style={[styles.appsRowItem, {backgroundColor: 'blue'}]}>
            <Text style={styles.appsRowItemText}>书籍</Text>
        </View>
    </TouchableNativeFeedback>
    {/* 2 */}
    <TouchableNativeFeedback activeOpacity={0.8} onPress={Actions.music}>
        <View style={[styles.appsRowItem, {backgroundColor: 'yellow'}]}>
            <Text style={styles.appsRowItemText}>音乐</Text>
        </View>
    </TouchableNativeFeedback>
    {/* 3 */}
    <TouchableNativeFeedback activeOpacity={0.8} onPress={Actions.movie}>
        <View style={[styles.appsRowItem, {backgroundColor: 'green'}]}>
            <Text style={styles.appsRowItemText}>电影</Text>
        </View>
    </TouchableNativeFeedback>
</View>
```

- - - - - - - - - - - - - - - - - - - - - - -

## 电影列表

- 修改 `src/components/movie/movieList.js`
- 使用 `fetch` 获取电影列表`数据`进行渲染, 获取完毕后`隐藏`loading
- 导入 `ActivityIndicator` 组件, 并使用 `isLoaded` 状态控制 `loading` 的显示隐藏
- 导入 `TouchableNativeFeedback` 组件, 用于添加点击事件与效果
- 导入 `Actions` 对象, 用于页面跳转

```jsx
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableNativeFeedback,
    ActivityIndicator,
    FlatList
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import api from '../../../config/api';

export default class MovieList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            list: []
        }
    }

    // 加载电影列表数据，url使用配置对象的属性即可
    componentWillMount() {
        fetch(api.movie.hot)
            .then(res => res.json())
            .then(data => {

                // 数据拿到后，修改loading状态，存储数据列表
                this.setState({
                    isLoaded: true,
                    list: data.subjects
                })
            })
    }

    // 获取loading
    _getLoading() {
        return (
            <ActivityIndicator size="large" color="hotpink"></ActivityIndicator>
        )
    }

    // 获取电影列表
    _getList() {
        return (
            // 懒加载列表组件，用它有两个原因，1、不用的话超出屏幕的内容看不到，2、性能高
            <FlatList
                showsVerticalScrollIndicator={false}
                data={ this.state.list }
                renderItem={
                    // e.index为下标，e.item为数组中的单个元素
                    (e) => {
                       return (
                            // 路由导航时可以传递参数，但是传参要调用方法，
                            // 为了防止页面一上来就被调用，造成页面自动跳转，所以我们这里需要把调用函数包裹一层
                            <TouchableNativeFeedback key={`key${e.index}`} onPress={ ()=>Actions.movieDetail({id: e.item.id}) }>
                                <View style={styles.item}>
                                    <Image source={{uri: e.item.images.large}} style={styles.itemImg}></Image>
                                    <View style={styles.itemContent}>
                                        <Text style={styles.itemContentT}>名称：{e.item.original_title}</Text> 
                                        <Text style={styles.itemContentT}>年份：{e.item.year}</Text> 
                                        <Text style={styles.itemContentT}>类型：{e.item.genres[0]}</Text>
                                        <Text style={styles.itemContentT}>口碑：{e.item.rating.average}</Text>
                                    </View>
                                </View>
                            </TouchableNativeFeedback>
                       )
                    }
                }
            />
        )
    }

    render() {
        return (
            <View style={styles.wrapper}>
                {
                    this.state.isLoaded? this._getList(): this._getLoading()
                }
            </View>
        )
    }

}

const styles = StyleSheet.create({
    wrapper: {
        paddingHorizontal: 40,
        paddingVertical: 10,
    },
    item: {
        flexDirection: 'row',
        marginBottom: 20
    },
    itemImg: {
        width: 130,
        height: 180
    },
    itemContent: {
        marginLeft: 20,
        justifyContent: 'space-around',
    },
    itemContentT: {
        color: 'hotpink',
        fontSize: 18,
        fontWeight: 'bold',
    }
})
```

- - - - - - - - - - - - - - - - - - - - - - -

## 电影详情

- 修改 `src/components/movie/movieDetail.js`
- 使用 `fetch` 获取电影列表`数据`进行渲染, 获取完毕后`隐藏`loading
- 导入 `ActivityIndicator` 组件, 并使用 `isLoaded` 状态控制 `loading` 的显示隐藏

```jsx
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableNativeFeedback,
    ActivityIndicator,
    FlatList
} from 'react-native';

import api from '../../../config/api';

export default class MovieDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            data: {}
        }
    }

    // 请求详情数据
    componentWillMount() {
        // 调用接口，别忘了传参
        fetch(api.movie.detail + this.props.id)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    isLoaded: true,
                    data: data
                })
            });
        
    }    

    // 获取loading
    _getLoading() {
        return (
            <ActivityIndicator size="large" color="hotpink"></ActivityIndicator>
        )
    }

    // 获取电影详情
    _getData() {
        return (
            <View style={styles.wrapper}>
                <Image source={{uri: this.state.data.images.large}} style={styles.img}></Image>
                <Text>电影名称：{this.state.data.original_title}</Text>
                <Text>上映时间：{this.state.data.year}</Text>
                <Text>用户口碑：{this.state.data.rating.average}</Text>
                <Text>所属国家：{this.state.data.countries[0]}</Text>
                <Text>
                    <Text>所属类型：</Text>
                    {
                        this.state.data.genres.map((v, i) => {
                            return (
                                <Text key={`key${i}`}>{v}</Text>
                            )
                        })
                    }
                </Text>
                <Text>
                    <Text>演员列表：</Text>
                    {
                        this.state.data.casts.map((v, i) => {
                            return (
                                // 最后一个数值没有、号
                                (this.state.data.casts.length - 1) == i
                                ?
                                <Text key={`key${i}`}>{v.name}</Text>
                                :
                                <Text key={`key${i}`}>{v.name + '、'}</Text>
                            )
                        })
                    }
                </Text>
                <Text>
                    <Text>导演列表：</Text>
                    {
                        this.state.data.directors.map((v, i) => {
                            return (
                                // 最后一个数值没有、号
                                (this.state.data.directors.length - 1) == i
                                ?
                                <Text key={`key${i}`}>{v.name}</Text>
                                :
                                <Text key={`key${i}`}>{v.name + '、'}</Text>
                            )
                        })
                    }
                </Text>
                <Text>故事摘要：{this.state.data.summary}</Text>
            </View>
        )
    }

    render() {
        return (
            <View>
                {
                    this.state.isLoaded? this._getData(): this._getLoading()
                }
            </View>
        )
    }

}

const styles = StyleSheet.create({
    wrapper: {
        paddingHorizontal: 40,
        paddingVertical: 10,
        alignItems: 'center',
    },
    img: {
        width: 285,
        height: 400
    }
})
```
