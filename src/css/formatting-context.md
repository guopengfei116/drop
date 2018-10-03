# Formatting Context

格式化上下文，简称FC。是CSS2.1规范中的一个概念。指页面中的一个渲染区域，并且拥有一套渲染规则，它决定了其子元素如何定位，以及与其他元素的相互关系和作用。

FC有很多种，在CSS2.1中定义了BFC(block-level box)，IFC(inline-level box)，CSS3中增加了FFC(flex-level box)和GFC(grid-level box)。

默认情况下，html根元素会构成一个BFC上下文环境，所有的子元素按照BFC的环境规则进行绘制。我们也可以通过改变某个子元素的属性，从而构建出新的FC，那么新FC的子元素就会按照新的规则进行绘制。

总结就是：FC是一个绘制环境，规定了各种绘制规则；FC可以嵌套Child-FC，从而产生新的独立的绘制环境；FC有很多种，不同的FC有不同的绘制规则。

## BFC

块级格式化上下文，它指一个独立的块级渲染区域，这个区域内的块级盒子将按照特定的渲染规则来约束布局，且与区域外部无关。

### BFC的生成

BFC是一块渲染区域，这个区域有多大，在哪里，由生成BFC的元素决定，CSS2.1中规定满足下列CSS声明之一的元素便会生成BFC。

1. 根元素
2. float值不为none
3. position值为absolute或fixed
4. 不是块级盒的块级包含块(inline-block、table-cell、table-caption)
5. overflow值不为visible

### BFC渲染规则

- 内部的Box会在垂直方向上一个接一个的放置，俗称独占一行
- 垂直方向上的距离由margin决定
- 属于同一个BFC的两个相邻Box的垂直margin会发生重叠
- 每个元素的左外边距与包含块的左边界相接触(从右向左的排版则相反)，浮动元素也如此
- BFC区域不会与float元素重叠
- 计算BFC区域高度时，浮动子元素也参与计算
- BFC就是一个独立的容器，容器里面的子元素不会影响到外面元素，反之亦然
- 只有普通流种的块级盒才会参与BFC布局，使用float、position创建了新BFC的块级盒子则不会
