# Vue执行原理 - Web端

## 目录结构

**src**

```text
compiler: 编译相关
core：核心代码
platforms：跨平台支持
server：服务端渲染
sfc：vue文件解析
shared：共享代码
```

**cimpliler**

```text

```

**core**

```text
```

**platforms**

```text
```

**server**

```text
```

**sfc**

```text
```

**shared**

```text
```

## Vue初始化

Vue构造器定义在`src/core/instance/index.js`，在这里通过一系列Mixin方法给Vue原型混入了一些核心API，分别定义在init、state、render、events、lifecycle、render几个模块。

然后在`src/core/index.js`文件中，对其进行了二次增强，在Vue.config属性中添加了一些配置，在Vue.options中添加了内置指令与组件，并在原型中定义了基础的$mout方法。

最后在web端代码入口`src/platforms/web/runtime/index.js`中，根据运行平台的特性对Vue进行了第三次扩展，并根据运行环境增强了$mout方法的逻辑。

## 实例化过程

当我们`new Vue`时，会执行Vue原型上的_init方法，这有点像jQuery，然后在init中对传入进来的配置项进行合并，然后初始化生命周期，事件中心，渲染，数据，最后调用$mout方法进行挂载，Vue需要判断是否存在Vue.$options.el属性，以确保挂载位置。

## 挂载

我们调用的$mout方法是根据平台特性增强过的，它执行时，会先确保挂载的位置不是body、html，防止覆盖造成其他dom节点的丢失。然后判断是否存在render方法，不存在则把el或template字符串编译成render方法，最后调用原始的$mount方法进行挂载。

原始的$mount方法的核心逻辑是，调用vm._render方法生成虚拟节点，然后创建Watcher实例，Watcher在初始化时会调用vm._update方法渲染成真实DOM，然后监听数据变化，重复调用vm_update方法更新DOM。

函数最后判断为根节点的时候会设置vm.isMounted为true，表示这个实例已经挂载了，同时执行mounted钩子函数。

## 渲染

vm._update是实例原型上的方法，用来更新虚拟节点。实际上_update会复用vm._render方法生成虚拟节点，最终又调用了createElement方法得到的VNode。

VNode定义在`src/core/vdom/vnode.js`中，核心思想是用js对象模拟真实DOM，定义了一些DOM的关键属性，比如标签名，属性，数据，子节点等；除此之外还定义了一些Vue所需的特殊属性。总体而言，VNode要比真实Node轻量级很多。

VNode从诞生到渲染成真实DOM需要经过create、diff、patch等操作，其中create就是通过createElement方法所创建，然后通过update方法渲染，update方法渲染时为了跨平台，会调用patch方法给DOM添加不同的属性、功能与映射逻辑。

## 