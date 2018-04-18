# Emment
> Emmet 的前身叫 Zen coding
> 它使用仿 css 选择器的语法来生成代码，大大提高了 HTML/CSS 代码编写的速度，并支持多种编辑器

## HTML

#### 初始化
- HTML4严格模式
  + `html:4s`
- XHTML过渡模式
  + `html:xt`
- HTML5模式
  + `!`
  + `html:5`

```html
# HTML4
html:4s + Tab

# XHTML
html:xt + Tab

# HTML5
html:5 + Tab

# HTML5
! + Tab
```

#### 标签属性
- 标签ID
  + `div#ID`
- 标签Class
  + `button.a.b.c`
- 标签属性
  + `input[type=text][value=演示]`
- 标签文本
  + `p{段落}`

```html
# div#main
<div id="main"></div>

# button.a.b.c
<button class="a b c"></button>

# input[type=text][value=演示]
<input type="text" value="演示">

# p{段落}
<p>段落</p>
```

#### 标签结构
- 兄弟
  + `span+i+span`
- 后代
  + `form>button`
- 上级结构
  + `div>p^section`

```html
# span{朋友}+i{兄弟}+span{哥们}
<span>朋友</span>
  <i>兄弟</i>
<span>哥们</span>

# form>button[type=submit]{提交}
<form action="">
  <button type="submit">提交</button>
</form>

# div>p{朋友啊朋友}^section{你可曾想起了我}
<div>
  <p>朋友啊朋友</p>
</div>
<section>你可曾想起了我</section>
```

#### 批量
- 重复
  + `ul>li*n`
- 分组
  + (ul>li{$}*2)*2
  + (.foo>h1)+(.bar>h2)

```html
# ul>li{$}*3
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
</ul>

# (ul>li{$}*2)*2
<ul>
  <li>1</li>
  <li>2</li>
</ul>
<ul>
  <li>1</li>
  <li>2</li>
</ul>

# (.foo>h1)+(.bar>h2)
<div class="foo">
  <h1></h1>
</div>
<div class="bar">
  <a href=""></a>
</div>
```

## CSS
