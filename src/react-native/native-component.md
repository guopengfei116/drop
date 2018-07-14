# React-Native-Component

- 在 `React Native` 中你需要使用官方提供的`组件`进行应用构建
- 因为是开发`原生`应用, 我们的代码最终会`转为`原生组件的方式渲染, 所以不能在RN中使用 `html` `web` 标签

View
---

视图容器，作用相当于 `html` 的 `div` 标签，它是创建UI所需的最基础组件，支持Flexbox布局、样式、触摸事件，它可以放到其它视图中，也可以包含任意多个任意子视图。<br />
- [文档详情]<http://reactnative.cn/docs/0.50/view.html#content>

Text
---

文本容器，作用相当于 `html` 的 `span` 标签，为什么不是 `p` 标签呢，一会演示。Text标签支持嵌套、触摸事件。在RN中，文本必须放置到Text中才可以被渲染，否则报错。<br />
- [文档详情]<http://reactnative.cn/docs/0.50/text.html#content>

文本布局

Text采用的是文本布局，多个子文本在渲染时会折叠合并在一起，如果把View理解成块级元素，那么Text就可以理解为行内元素。<br />

```jsx
<Text>
  <Text>First part and </Text>
  <Text>second part</Text>
</Text>
```

样式继承

在RN中，父文本的样式可以传递给后代文本，也就是样式继承。但是除了文本之外其它组件都无法继承样式。<br />

```jsx
<View style={{fontSize: 30}}>
  <Text style={{fontWeight: 'bold'}}>
      I am bold
    <Text style={{color: 'red'}}>
      and red
    </Text>
  </Text>
</View>
```

Image
---

- 作用相当于 `html` 的 `img` 标签用于承载图片
- 组件通过 `source` 属性设置图片地址
- <http://reactnative.cn/docs/0.50/images.html#content>
- <http://reactnative.cn/docs/0.50/image.html#content>

###### 载入本地图片
- `require` 方法里面必须传入一个`静态字符串`
- 里面不能写`表达式`, 比如字符串拼接, 同时图片名称也不允许以`数字`开头

```jsx
{/* 正确 */}
<Image source={require('./img/icon.png')} />

{/* 错误 */}
<Image source={require('./' + 'img/icon.png')} />

{/* 错误 */}
<Image source={require('123.png')} />
```

###### 载入网络图片
- `动态`载入的图片需要手动设置`宽高`, 否则无法显示
- 如果某些网站的图片载入失败尝试换一个域名图片试试

```jsx
{/* 正确 */}
<Image
	source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
	style={{width: 400, height: 400}}
/>

{/* 错误 */}
<Image source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}} />
```

###### 载入网络图片
- 如果想`写活`地址, 必须定义一个`对象`赋值

```jsx
let imgObj = {uri: 'http://facebook.github.io/react/img/logo_og.png'};
{/* 正确 */}
<Image source={ imgObj } style={{width: 400, height: 400}} />

{/* 错误 */}
let imgUri = 'http://facebook.github.io/react/img/logo_og.png'
<Image source={{uri: imgUri}} />
```

#### Button
- 作用相当于 `html` 的 `button` 标签用于触发点击
- 需要通过 `title` 属性设置按钮内的文本内容, 通过 `onPress` 属性监听按钮的点击事件
- <http://reactnative.cn/docs/0.50/button.html>

```jsx
<Button title="点我吧" onPress={ this.clickHandler }></Button>
```

#### TextInput
- 作用相当于 `html` 的 `input` 标签用于输入文本
- 需要通过 `value` 属性文本内容, 通过 `onChangeText` 属性监听文本的变化事件
- <http://reactnative.cn/docs/0.50/textinput.html#content>

```jsx
export default class Home extends Component {
	state = {
    	text: '默认值'
    }

    upText(text) {
	    this.setState({
	      text: text
	    });
    }

    render() {
    	return (
      		<View style={styles.container}>
      			<Text style={styles.welcome}>{ this.state.text }</Text>
    			<TextInput value={ this.state.text } onChangeText={ this.upText } />
	    	</View>
	    );
    }
```

#### ScrollView
- 默认情况下, `超出`屏幕的内容是看不到的, 不像浏览器环境下会自动添加`滚动条`
- 如果需要滚动, 可以使用这个`组件`把要相应的内容`包裹`起来, 被包裹的内容就会处于`滚动条`中
- <http://reactnative.cn/docs/0.50/scrollview.html#content>

#### ActivityIndicator
- 展示一个小圆形的`loading`
- 通过属性 `animating` 控制显示隐藏, `color` 设置颜色
- <http://reactnative.cn/docs/0.50/activityindicator.html#content>

```jsx
<ActivityIndicator animating={ this.state.isShow }></ActivityIndicator>
```