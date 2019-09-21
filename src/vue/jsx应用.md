# Vue 中 Jsx 使用初探

## 应用背景

> 想到了 Vue 的一个问题，就是在组件中使用的数据，先要交给 Vue 管理，比如下面的代码，但是交给 Vue 管理的数据，都是响应式的，被Vue做了监听，那么就会占有计算资源。但是我现在要渲染的数据是常量的，不会改变也不需要响应，能不能去掉呢？然后我就想到了 jsx。

### 发现问题

> CRM-PC 项目中有些 select、radio 或 checkbox 内容是常量的，但技术上未作抽取，而是数据分散在每个页面单独处理。

加上更新疏漏，以及测试疏忽，导致不同模块页面下同样功能的 select、radio、checkbox 选项可能不一致的问题。

### 解决方案

> 改进计划是先整理收集这些常量的表单选项，然后统一定义，并做成唯一业务组件，提高项目健壮性，也方便维护。

### JSX使用

## 实施

1. 在 vue 中使用 jsx 需要使用官方提供的两个包 babel 插件 babel-helper-vue-jsx-merge-props 和 babel-plugin-transform-vue-jsx。

```shell
npm i transform-vue-jsx -D
```

2. 修改 .babelrc 配置文件，在插件中加上 transform-vue-jsx。

```json
{
  ...
  "plugins": ["transform-runtime", "transform-vue-jsx"],
  ...
}
```

