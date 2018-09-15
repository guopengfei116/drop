# Vue API

Vue实例可以初始化多个，在开发当中是否可以给每一个功能模块使用一个Vue实例，实现功能热插拔，随意移植、拆分的好处。

## 实例成员

### 属性

- $el: 视图挂载节点
- $data: 配置项中的data
- $props: 来自父组件的数据，组件特有属性
- $render: 配置项中的render
- $options: 配置项
- $children: 子元素
- $refs: dom与组件引用
- $isServer: 是否服务端
- $parent: 父组件引用
- $slots: slot元素引用
- $scopedSlots: 指定了作用域的slot元素引用

### 方法

- $watch
- $on
- $emit
- $set
- $delete
- $forceUpdate
- $nextTick
- $destroy
- $createElement

**$watch**

监听data数据变化，第一个参数为data中定义的属性，第二个为回调，返回一个可取消数据监听的方法。

```js
const unWatch = 
vm.$watch('dataProperty', (newValue, oldValue) => {
    console.log(`${newValue}-${oldValue}`);
})

// 1秒后取消监听
setTimeout(() => unWatch(), 1000);
```

**$on与$emit**

自定义事件方法，$on用来监听事件，$emit用来触发事件。

```js
vm.$on('ready', (...args) => {
    console.log(`${args[0]} - ${args[1]}`);
})

vm.$emit('ready', '米饭', '鸡肉')
```

**$set**

对象新增的属性是没有getter、setter的，数据变化无法被劫持，使用$set方法给对象新增属性可以解决此问题。

```js
vm.$set(vm.obj, 'newProperty', 'value');
```

**$delete**

使用delete运算符删除对象属性，不会触发setter，使用$delete方法删除可以解决此问题。

```js
vm.$delete(vm.obj, 'deleteProperty');
```

**$forceUpdate**

强制触发视图更新

```js
vm.$forceUpdate()
```

**$nextTick**

确保回调在视图更新时执行。通常情况下，当我们修改数据后，视图不会马上更新，如果你需要在数据更新，并且视图也更新的时候执行一些逻辑，那么可以使用这个函数。

```js
vm.$data.a++;
vm.$nextTick(() => {
    console.log(vm.$refs.nodeA.innerText);
})
```

**$destroy**

销毁实例，主要是解除事件监听和数据劫持。

```js
vm.$destroy()
```

- - - - - - - - - - - - - - - - - - - - - - - - - - -

## 静态成员

### 属性

- 

### 方法

- set: 同vm.$set
- delete: 同vm.$delete
- component
- directive
- extend
- mixin

- - - - - - - - - - - - - - - - - - - - - - - - - - -

## 生命周期

- beforeCreate
- created
- beforeMount
- render
- mounted
- beforeUpdate
- updated
- activated
- deactivated
- beforeDestroy
- destroyed
- renderError
- errorCaptured

### 初始化

在这个阶段中，$el属性还没有被赋值，无法进行dom操作。<br />
在beforeCreate阶段修改数据不会更新视图；created时进行数据的修改才会更新视图。

**beforeCreate**

```js
beforeCreate() {
    console.log(this.$el);   // undefined
    console.log(this.$data); // 
}
```

**created**

```js
beforeCreate() {
    console.log(this.$el);   // undefined
    console.log(this.$data); // Object
}
```

### 挂载与初始渲染

在这个阶段，可以使用$el属性，但是挂载前$el是旧的dom，挂载后$el是新替换的dom。

注意：在服务端渲染时，是不会执行这个阶段钩子的。

**beforeMount**

```js
beforeCreate() {
    console.log(this.$el);   // 视图更新前的dom根节点
}
```

**render**

这个函数我们可以自己编写，如果不编写Vue会自动把template编译成render函数，每次更新视图时都会调用。

```js
render(c) {
    return c('div', { className: 'a b c' }, 'children')
}
```

**mounted**

```js
beforeCreate() {
    console.log(this.$el);   // 视图更新后的dom根节点
}
```

### 数据更新与迭代渲染

- befoerUpdate
- updated

### 组件激活

- activated
- deactivated

### 组件销毁

- beforeDestroy
- destroyed

### 错误捕获

**renderError**

捕获当前组件的render错误，可以指定错误后如何渲染视图。

```js
renderError(c, err) {
    return c('div', {}, err.stack)
}
```

**errorCaptured**

捕获当前组件及子组件的错误，会向上冒泡传递。

```js
errorCaptured(c, err) {
    console.log(err.stack)
}
```

- - - - - - - - - - - - - - - - - - - - - - - - - - -

## 内置组件

- transition
- component
