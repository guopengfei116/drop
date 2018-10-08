# Brower Cache

浏览器缓存可以把用户访问过的资源临时保存在本地磁盘，以便在重复访问时提速。

1. 对于用户而言，可以减少网络传输，减少等待时间，提高用户体验；
2. 对于服务器而言，减少请求量，减少输出宽带，节省资源开销。

## HTTP关于缓存相关的字段

### Expires 与 Cache-Control

当客户端向服务端请求静态文件时，响应头中可包含两个关键属性：Expires 和 Cache-Control，它俩都应用在响应头中。

Expires设置资源有效期，属于HTTP/1.0规范；Cache-Control是一个复合性的属性，由多个键值对配置项组成，其中有一个max-age配置项可用来设置资源的有效时间(秒)，是HTTP/1.1规范；max-age优先级高于Expires。

### Etag/If-None-Match 与 Last-Modifed/If-Modifed-Since

除了两个直接和cache有关的属性外，还有这两对和cache存在间接关系的属性，它们在使用时需要严格区分请求与响应，Etag 和 Last-Modifed 用在响应头，If-None-Match 和 If-Modifed-Since 用在请求头。

Etag/If-None-Match的默认值是对文件的索引、大小、最后修改时间进行Hash后得到的，也可以按照自己的规则设置任何值。Last-Modifed/If-Modifed-Since的值为资源文件的最后修改时间。

### 作用

前两个用来控制缓存的有效时间，浏览器通过它来判断是否需要发出HTTP请求；
后两个用来验证网页的有效性，服务端用它来验证这个文件是否需要重新返回。

Last-Modifed的精度是秒，如果在一秒钟内文件进行了多次修改，那么Last-Modifed就会不准确，
因此，HTPP/1.1利用Entity Tag提供更严谨的验证，另外Entity Tag的计算如果过于复杂和频繁，
那么势必会增加服务器计算资源的开销。

## Expires 与 Last-Modified(或Etag) 组合使用

运行原理与下面是一样的。

## Cache-Control 与 Last-Modified(或Etag) 组合使用

这是两个不同的响应头，其中 Last-Modifed 只有配合 Cache-Control 才有实际价值，
一般我们通过会通过 Cache-Control 设置资源的有效时间，通过 Last-Modified 记录资源的最后修改时间，然后就可以使用浏览器的缓存了。

### 首次请求

1. 用户使用浏览器第一次发出对某资源的请求
2. 浏览器会先查询临时文件目录，发现没有cache，于是向server发出请求
3. server收到请求，返回资源，并添加响应头 Cache-Control: max-age=1000，Last-Modified: Mon, Oct 08 2018 10:50:24 GMT。
4. 浏览器收到响应，解析并展示内容的同时，在临时文件目录以"资源全路径"为key进行缓存。

### 第二次请求（有效时间内）

1. 距离第一次请求不到1000秒，浏览器再次请求该资源
2. 浏览器查询临时文件目录发现有cache，检查max-age发现未过期，直接读取响应给用户，HTTP状态为Cache

### 第三次请求（超过有效时间）

1. 距离第一次请求超过1000秒，浏览器再次请求该资源
2. 浏览器查询临时文件目录发现有cache，检查max-age发现已过期，但是有Last-Modified，
于是添加请求头 "If-Modifed-Since: 修改时间" 发送给server
3. server收到请求，发现有 If-Modifed-Since，于是和被请求资源的最后修改时间进行对比。
如果不一样，说明资源已被修改，则响应新的资源，并添加新的 Last-Modified，HTTP状态为200；
如果一样，说明资源未修改，则返回不带响应体的信息，HTTP状态为304，让浏览器继续使用cache，有效时间重新计算。

## 浏览器对不同行为的缓存策略

有时候使用了缓存，但是会发现浏览器还是重新向server发起了请求，那是因为在实际应用中，
浏览器对不同的操作行为（地址栏回车、刷新、链接跳转、JS脚本等），会有区别对待。

### 普通跳转

普通跳转浏览器会按照上面的缓存策略运行，常见的有：A链接跳转，location.href跳转，window.open跳转。

### 刷新(F5)

这种情况下，即便资源未过期，浏览器也会发送请求，但是会携带If-Modifed-Since或If-None-Match请求头，如果server返回了304，那么就会使用缓存。

备注：有的浏览器会当作普通跳转来处理，比如chrome，每次刷新，很多请求仍然是200(from xxx cache)。

### 强刷(Ctrl+F5)

这种情况下，浏览器会当作新资源去请求，效果和无缓存一样，返回200。

## 常用META标签禁用缓存的方法

```html
<meta http-equiv="Pragma" content="no-cache"/>
<meta http-equiv="Expires" content="0"/>
<meta http-equiv="Cache-Control" content="no-cache"/>
```
