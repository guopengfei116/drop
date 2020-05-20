# render

## 渲染函数

> Vue 推荐在绝大多数情况下使用模板来创建你的 HTML。然而在一些场景中，你真的需要 JavaScript 的完全编程的能力。这时你可以用**渲染函数**，它比模板更接近编译器。

我们先看一个最简单的 Vue 模板语法案例

```html
<body>
  <div id="app">
    <h1>{{ val }}</h1>
  </div>

  <script src="../vue.js"></script>
  <script>
    const vm = new Vue({
      el: '#app',
      data: {
        val: "夏天"
      }
    });
  </script>
</body>
```

然后让我们换成渲染函数试试

```html
<body>
  <div id="app"></div>

  <script src="../vue.js"></script>
  <script>
    const vm = new Vue({
      el: '#app',
      data: {
        val: "夏天"
      },
      render(createElement) {
        return createElement('h1', { style: "color: red" }, this.val)
      }
    });
  </script>
</body>
```

渲染函数无限套娃 - 构建DOM树

```html
<body>
  <script src="../vue.js"></script>

  <div id="app"></div>
  <script>
    const vm = new Vue({
      el: '#app',
      data: {
        val: "夏天"
      },
      render(createElement) {
        return createElement('h1', { style: "color: red" },
          [
            createElement("p", { id: "level1" }, this.val),
            createElement("p", { id: "level1" },
              [1,2,3,4,5].map(v => v ** v)
            ),
          ]
        )
      }
    });
  </script>
</body>
```

## 配置对象

`标签属性`设置: attrs <br/>
用于设置 `HTML attribute` 属性，值为一个由 HTML 属性构成的**对象**。

```html
<body>
  <div id="app"></div>
  <style>
    #attrs {
      font-size: 40px;
      color: skyblue;
    }
  </style>

  <script src="../vue.js"></script>
  <script>
    const vm = new Vue({
      el: '#app',
      data: {
        val: "夏天"
      },
      render(createElement) {
        return createElement('h1', {
          // 普通的 HTML attribute
          attrs: {
            id: 'attrs',
            xxx: "xxx"
          }
        }, this.val)
      }
    });
  </script>
</body>
```

`标签类`设置：class。<br/>
专为 `class` 属性设立的配置项，可接受**字符串**、**对象**，或字符串和对象组成的**数组**。

```html
<body>
  <div id="app"></div>
  <style>
    .c {
      font-size: 40px;
      color: skyblue;
    }
  </style>

  <script src="../vue.js"></script>
  <script>
    const vm = new Vue({
      el: '#app',
      data: {
        val: "夏天",
      },
      render(createElement) {
        return createElement('h1', {}, [
          // 字符串
          createElement("p", { class: "a b c" }, "p1"),
          // 对象
          createElement("p", { class: { a: true, b: true, c: false } }, "p3"),
          // 数组可嵌字符串或对象
          createElement("p", { class: ["a", "b", "c"] }, "p2"),
        ])
      }
    });
  </script>
</body>
```

`标签样式`设置：style <br/>
专门为 `style` 属性设立的配置项，可接受**字符串**、**对象**，或对象组成的**数组**。

```html
<body>
  <div id="app"></div>

  <script src="../vue.js"></script>
  <script>
    const vm = new Vue({
      el: '#app',
      data: {
        val: "夏天",
      },
      render(createElement) {
        return createElement('h1', {}, [
          // 字符串
          createElement("p", { style: "color: red; backgroundColor: pink" }, "p1"),
          // 对象
          createElement("p", { style: { color: "blue", backgroundColor: "pink" } }, "p3"),
          // 数组可嵌字符串或对象
          createElement("p", { style: [{color: "green"}, {backgroundColor: "pink"}] }, "p2")
        ])
      }
    });
  </script>
</body>
```

事件监听：on <br/>
值为eventName、eventHandler构成的映射**对象**。

```html
<body>
  <div id="app"></div>

  <script src="../vue.js"></script>
  <script>
    const vm = new Vue({
      el: '#app',
      data: {
        val: "夏天",
      },
      render(createElement) {
        return createElement('h1', {
          on: {
            click: () => {
              alert(this.val);
            }
          }
        }, this.val)
      }
    });
  </script>
</body>
```

## JSX

> 如果你写了很多 render 函数，可能会觉得套娃非常痛苦，那么 JSX 可以拯救你。<br/>
> 从字面上理解就是在 js 中编写 xml。
> JSX 官方定义是类 XML 语法的 ECMAScript 扩展。<br/>

Dome

```jsx
render() {
  return (
    <ol>
      <li>哈哈</li>
      <li>啦啦</li>
    </ol>
  );
}
```

单行注释

```jsx
render() {
  return (
    <ol>
      {
        // 单行注释
      }
      <li>哈哈</li>
      <li>啦啦</li>
    </ol>
  );
}
```

多行注释

```jsx
render() {
  return (
    <ol>
      {/** 多行注释
        1. xxx
        2. bbb
      */}
      <li>哈哈</li>
      <li>啦啦</li>
    </ol>
  );
}
```

渲染函数配置

```jsx
render() {
  return (
    <article>
      <p attrs={{ id: "xxx", class: "a b c" }}>attrs</p>
      <p class={{ a: true, b: false }}>class</p>
      <p style={{ color: "red", fontSize: "20px" }}>style</p>
      <p on={{ click: () => alert("点击事件") }}>on</p>
    </article>
  );
}
```

渲染函数JSX过多时，可以拆分成方法组合

```jsx
export default {
  name: "Jsx",

  data() {
    return {
      list: [1, 2, 3, 4]
    };
  },

  methods: {
    getUl() {
      return (
        <ul>
          {this.list.map(v => (
            <li>{v}</li>
          ))}
        </ul>
      );
    }
  },

  render() {
    return (
      <article>
        <p attrs={{ id: "xxx", class: "a b c" }}>attrs</p>
        <p class={{ a: true, b: this.show }}>class</p>
        <p style={{ color: this.color, fontSize: "20px" }}>style</p>
        <p on={{ click: () => alert("点击事件") }}>on</p>
        {/** 拆分成一个渲染列表节点的方法 */}
        {this.getUl()}
      </article>
    );
  }
};
```

### 在 Vue 中写 JSX 有几个可能会引发错误的注意事项

- 多个节点必须由一个根节点包裹，这个和 Template 写法是一样的
- 标签一定要闭合
- 数组迭代相同类型元素时需要设置唯一key值
- 使用驼峰的形式来书写样式和事件属性名

Error1: 只允许被一个标签包裹

```html
render() {
  return (
    <span>first</span>
    <ol>
      <li>哈哈</li>
      <li>啦啦</li>
    </ol>
  );
}
```

Error2: 标签未闭合

```html
render() {
  return (
    <ol>
      <li>first</li>
      <li>last</li>
    <ol>
  );
}
```

Error3: 注释未写在代码块{}中，变成文本节点输出

```html
render() {
  return (
    <ol>
      // 单行注释
      /** 多行注释 */
      <li>哈哈</li>
      <li>啦啦</li>
    </ol>
  );
}
```

Error4: 单行注释时，代码块右括号}必须换行，否则会被认为是注释的一部分，造成括号对不上引发语法错误

```html
render() {
  return (
    <ol>
      { // 单行注释 }
      <li>哈哈</li>
      <li>啦啦</li>
    </ol>
  );
}
```
