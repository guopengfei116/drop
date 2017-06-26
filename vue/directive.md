## 指令

###### v-text
- 作用：更新元素的textContent。
```html
<span v-text="msg"></span>
<!--等同于下面-->
<span>{{ msg }}</span>
```

###### v-html
- 作用：更新元素的innerHtml。
```html
<span v-html="html"></span>
```

###### v-show
- 作用：根据值的真假，控制元素是否显示。

###### v-if
- 作用：根据值的真假，控制元素是否创建。

###### v-for
- 作用：遍历数组或者对象。
```html
<!--遍历数组-->
<div v-for="item in items">
  {{ item.text }}
</div>
```
