# Vue.js
> 作者：尤雨溪

## 简介

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

## vue-cli
> vue官网提供的一套vue开发脚手架，该脚手架可以帮我们自动搭建开发环境。

#### 作用
- 生成目录结构
- 开发调试
- 单元测试
- 代码部署

#### 安装
- 安装
    + npm install -g vue-cli
- 测试
    + vue --version

#### 使用
- 创建项目
    + vue init webpack 项目名称
- 安装依赖
    + npm install
- 运行项目
    + npm run dev

#### 项目文件说明
- 