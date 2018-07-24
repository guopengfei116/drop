# 样式

## StyleSheet

* 所有RN中的样式都必须用这个Api创建
* 所有样式名称都必须是驼峰命名
* RN中所有的组件默认display属性都是flex，而且主轴方向是column
* 每个元素可以通过数组设置多种样式，如果遇到相同的样式，后面样式的优先级大于前面

```jsx
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});
```

## 盒子模型

在RN中的元素同样拥有盒子模型：宽高、内边距、边框、外边距。<br />

需要注意在RN中的样式大小不需要单位，同时没有css的复合样式，比如border、background、font，在RN中border宽度、颜色、圆角等样式需要一个一个设置，background和font也一样。<br />

关于padding与margin，在css中可以赋予多个值来设置四边不一样的大小，在RN中只能给定一个值，指定相同的大小，如果四边大小不一样，就需要按照方向一个一个设置。同时RN也提供了paddingHorizontal、marginHorizontal、paddingVertical、marginVertical同时设置左右和上下两个方向的值。<br />

另外补充一下，在设置字体时，Android内建的有这么几个: normal、serif、monospace<br />

```jsx
import React, { Component } from "react";
import { StyleSheet, View, Text } from 'react-native';

export default class StyleBoxTest extends Component {
    render() {
        return (
            <View style={styles.container}>
                {/* 通过margin和父盒子产生距离 */}
                <View style={styles.box}>
                    {/* 文本受到了父盒子padding的影响 */}
                    <Text>内容</Text>
                </View>
            </View>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        width: 500,
        height: 500,
        backgroundColor: "blue"
    },
    box: {
        width: 300,
        height: 300,
        paddingHorizontal: 10,
        paddingVertical: 80,
        backgroundColor: "red",
        borderWidth: 10,
        borderRadius: 10,
        borderColor: "yellow",
        margin: 30,
        marginLeft: 50
    }
});
```

## 弹性布局

ReactNative中组件默认采用flex弹性布局，使用flex可以使其在可利用的空间中动态地扩张或收缩，
ReactNative中的flex工作原理和web上的CSS基本一致，当然也存在少许差异。首先是默认值不同：flexDirection的默认值是column而不是row，而flex也只能指定一个数字值。

### 主轴方向

采用flex弹性布局的容器，子元素有横纵两种排列方式，在ReactNative中默认是纵向的，也就是说默认元素呈纵向排列，如果有需要也可以通过`flexDireaction`样式进行修改。

```jsx
export default class FlexDirectionTest extends Component {
    render() {
        return (
            <View>
                {/* 默认情况下元素纵向排列 */}
                <View>
                    <View><Text>123</Text></View>
                    <View><Text>456</Text></View>
                </View>
                {/* 改为横向排列 */}
                <View style={styles.row}>
                    <View><Text>123</Text></View>
                    <View><Text>456</Text></View>
                </View>
            </View>
        );
    }
}

let styles = StyleSheet.create({
    row: {
        // flexDirection: row row-reverse column column-reverse
        flexDirection: "row",
    }
});
```

### 弹性宽高

一般而言我们会使用flex:1来指定某个组件扩张以撑满所有剩余的空间。如果有多个并列的子组件使用了flex:1，则这些子组件会平分父容器中剩余的空间。如果这些并列的子组件的flex值不一样，则谁的值更大，谁占据剩余空间的比例就更大。

```jsx
export default class FlexSizeTest extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.one}></View>
                <View style={styles.two}></View>
                <View style={styles.three}></View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    // 父容器必须有大小子元素才能分配宽高
    container: {
        flex: 1,
    },
    one: {
        flex: 1,
        backgroundColor: "red"
    },
    two: {
        flex: 2,
        backgroundColor: "green"
    },
    three: {
        flex: 3,
        backgroundColor: "blue"
    }
});
```

### 弹性宽高补充

组件能够撑满剩余空间的前提是其父容器的尺寸不为零。如果父容器既没有固定的width和height，也没有设定flex，则父容器的尺寸为零。其子组件如果使用了flex，也是无法显示的。<br />
在一个组件中，如果父容器设置方向为纵，那么子元素必须设置高度或flex占比，否则盒子无大小。<br />
在一个组件中，如果父容器设置方向为横，那么子元素必须设置宽度或flex占比，否则盒子无大小。<br />

```jsx
export default class FlexSize2Test extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.one}></View>
                <View style={styles.two}></View>
                <View style={styles.three}>
                    <View style={styles.threeOne}></View>
                    <View style={styles.threeTwo}></View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row"
    },
    // 如果父容器设置方向为横，那么子元素必须设置宽度或flex，否则盒子无大小
    one: {
        flex: 1,
        backgroundColor: "red"
    },
    two: {
        width: 200,
        backgroundColor: "green"
    },
    three: {
        flex: 3,
        backgroundColor: "blue",
    },
    // 如果父容器设置方向为纵，那么子元素必须设置高度或flex占比，否则盒子无大小。
    threeOne: {
        flex: 1,
        backgroundColor: "yellow"
    },
    threeTwo: {
        height: 300,
        backgroundColor: "orange"
    }
});
```

### 元素对其方式

元素对其方式就是元素相对于父元素的位置，默认情况下元素在纵轴的最上边，横轴的最左边，不过通过样式可以改变元素在父容器的位置。

```style
// 主轴对其方式
justifyContent: flex-start flex-end center space-between space-around

// 交叉轴对其方式
alignItems: flex-start flex-end center stretch
```

```jsx
export default class FlexAlignTest extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.one}></View>
                <View style={styles.two}></View>
                <View style={styles.three}></View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: 500,
        justifyContent: "center",
        alignItems: "center"
    },
    one: {
        height: 100,
        width: 100,
        backgroundColor: "red"
    },
    two: {
        height: 100,
        width: 100,
        backgroundColor: "green"
    },
    three: {
        height: 100,
        width: 100,
        backgroundColor: "blue"
    }
});
```

## feach

RN提供了和web标准一致的网络请求API，XMLHttpRequest与Fetch，Fetch用起来将对比较容易，且支持Promise，所以一般会选用Fetch。

```jsx
// 豆瓣电影top250: http://api.douban.com/v2/movie/top250
// 豆瓣电影详情: http://api.douban.com/v2/movie/top250/movie/subject/:id
```

发起一个get请求

```jsx
fetch('http://api.douban.com/v2/movie/top250')
.then((response) => console.log(response));
```

发起一个post请求，并携带参数，需要使用Fetch第二个options参数

```jsx
fetch('http://api.douban.com/v2/movie/top250', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({a:1, b:2})
})
.then((response) => console.log(response));
```

fetch返回的Promise对象，添加的成功回调拿到的是response对象，里面的数据默认是文本，一般我们请求回来的数据是json对象，
可以使用response对象提供的json方法转换，该转换方法同样返回一个Promise对象，所以一般我们需要两次then，在第二个then里拿到对象数据。

```jsx
fetch('http://api.douban.com/v2/movie/top250')
.then((response) => response.json())
.then((responseJson) => {
    console.log(responseJson);
})
.catch((error) => {
    console.error(error);
});
```
