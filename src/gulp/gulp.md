# gulp

## 简介
- 一款基于流的项目构建工具，该工具特点是灵活，并且简单易用。
- 通过gulp内置api与插件可以实现项目的自动构建与打包，比如常见的代码合并、压缩、混淆等等。

## 资源
- [官网](http://www.gulpjs.com)
- [中文网](http://www.gulpjs.com.cn)

## 安装说明
- 全局安装：`npm install -g gulp`
    + 一台机器只需全局安装一次即可
- 本地安装：`npm install gulp`
    + 每个项目都要单独安装

## 准备工作与概念
- 创建脚本文件
    + 每个项目需要创建**gulpfile.js**脚本文件，用来编写构建过程
    + 编写脚本一般会使用gulp提供的5个api
    + 还可以使用node-api与node包，gulp插件实际上就是node包
- 任务
    + gulp把项目构建时的不同工作称为任务，比如合并任务，压缩任务
    + 然后把这些不同的任务组织起来，构成强大完整的项目构建流程

## api学习

#### 使用task创建任务
- 命令行中使用gulp log命令执行log任务
- 命令行中使用gulp命令执行default任务

```javascript
// 加载本地的gulp
var gulp = require('gulp');

// 创建名为log的任务
gulp.task('log', function() {
  console.log('这是一个没有任务的任务');
});

// 创建默认任务
gulp.task('default', function() {
  console.log('默认执行的任务');
});
```

#### 使用src与dest读写文件

```javascript
// 加载本地的gulp
var gulp = require('gulp');

// 创建文件复制的任务
gulp.task('cpFile', function() {
  gulp.src('main.js')
    .pipe(gulp.dest('dist'));
});
```

#### 使用run实现任务间的互调

```javascript
// 加载本地的gulp
var gulp = require('gulp');

// 复制main.js到dist目录下
gulp.task('cpFile', function() {
  gulp.src('main.js')
    .pipe(gulp.dest('dist'));
    console.log('cpFile任务');
});

// 默认任务，里面通过run调用其他任务
gulp.task('default', function() {
  gulp.run('cpFile');
  console.log('default任务');
});
```

#### 使用watch监听文件变化

```javascript
// 加载本地的gulp
var gulp = require('gulp');

// 创建文件复制的任务
gulp.task('cpFile', function() {
  gulp.src('main.js')
    .pipe(gulp.dest('dist'));
});

// 默认任务
gulp.task('default', function() {

  // 复制文件
  gulp.run('cpFile');

  // 当文件发生变化的时候重新复制
  gulp.watch('main.js', function() {
    gulp.run('cpFile');
    console.log('js文件发生改变，重新复制');
  });
});
```

## 插件使用

#### 目录约定
- 一般使用了构建工具后，项目源代码会存放在src目录
- 通过源代码构建生成后的代码存放在dist目录

#### gulp-htmlmin
- 作用：压缩html
- 安装：`npm install gulp-htmlmin  -D`

```javascript
// 加载本地的gulp
var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');

// html压缩
gulp.task('htmlmin', function() {
  gulp.src('src/index.html')
    .pipe(htmlmin({
      collapseWhitespace: true, // 去掉空白字符
      minifyJS: true,//压缩页面JS
      minifyCSS: true,//压缩页面CSS
      removeComments: true//清除HTML注释
    }))
    .pipe(gulp.dest('dist'));
});
```

#### gulp-uglify
- 作用：压缩混淆js
- 安装：`npm install gulp-uglify  -D`

```javascript
// 加载本地的gulp
var gulp = require('gulp');
var uglify = require('gulp-uglify');

// js压缩
gulp.task('jsmin', function() {
  gulp.src('src/js/*.js', { base: 'src' }) // base配置项是为了保留src目录，但是随着后续插件的使用，可能会被改变
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});
```

#### gulp-concat
- 作用：文件内容合并
- 安装：`npm install gulp-concat  -D`

```javascript
// 加载本地的gulp
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

// // js合并压缩
gulp.task('concat', function() {
  gulp.src('src/js/*.js', { base: 'src' })
    .pipe(concat('js/build.js'))  // 合并的文件需要指定路径与文件名
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});
```

#### gulp-rename
- 作用：修改文件名
- 安装：`npm install gulp-rename  -D`

```javascript
// 加载本地的gulp
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');

// js合并压缩
gulp.task('concat', function() {
  gulp.src('src/js/*.js')
    .pipe(concat('js/build.js'))
    .pipe(uglify())
    .pipe(rename({
      dirname: 'src',   // 有了rename，就不用src的base配置了，这个更加靠谱
      prefix: 'p_',
      suffix: '.min',
    }))
    .pipe(gulp.dest('dist'));
});
```

#### gulp-clean-css
- 作用：压缩css
- 安装：`npm install gulp-clean-css  -D`

```javascript
// 加载本地的gulp
var gulp = require('gulp');
var rename = require('gulp-rename');
var cleanCss = require('gulp-clean-css');

// css压缩
gulp.task('cssmin', function() {
  gulp.src('src/css/*.css')
    .pipe(cleanCss())
    .pipe(rename({
      dirname: 'css',
      suffix: '.min',
    }))
    .pipe(gulp.dest('dist'));
});
```

#### gulp-less
- 作用：less编译
- 安装：`npm install gulp-less  -D`

```javascript
// 加载本地的gulp
var gulp = require('gulp');
var rename = require('gulp-rename');
var cleanCss = require('gulp-clean-css');
var less = require('gulp-less');

// less编译与压缩
gulp.task('less', function() {
  gulp.src('src/less/*.less')
    .pipe(less())
    .pipe(cleanCss())
    .pipe(rename({
      dirname: 'css',
      suffix: '.min',
    }))
    .pipe(gulp.dest('dist'));
});
```

## browserify
可以把CommonJS规范编写的模块进行打包，打包后的文件可运行在浏览器环境。

#### 全局安装
- 全局安装一次即可：`npm install -g browserify`
- 采用命令行的方式使用，全局安装才可使用命令

#### 使用
- 有了browserify，在编写js时通常我们会存在一个入口文件，一般称为main.js
- 这个入口文件负责require其他的脚本
- 打包下面代码: `browserify main.js -o build.js -d`
    + -o选项后面跟的是打包后的文件名
    + -d选项作用是生成sourcemap，便于在浏览器中进行源代码测试

```javascript
// a.js
module.exports = 123;
```
```javascript
// b.js
module.exports = 456;
```
```javascript
// main.js
var a = require('a.js');
var b = require('b.js');
console.log(a, b);
```

#### gulp集成
- 项目中本地安装：`npm install browserify -D`
- 因为要通过脚本的方式使用，所以本地安装
- 最后还要安装处理兼容性的包：`npm i vinyl-source-stream vinyl-buffer -D`

```javascript
// 加载本地的gulp
var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');

// CommonJS模块打包并压缩
gulp.task('js', function() {
  // 打包并生成sourcemap
  browserify('./src/js/main.js', { debug: true}).bundle()
    .pipe(source('build.js'))   // 把结果转换为Stream的vinyl对象，还需进一步转换为Buffer的vinyl对象
    .pipe(buffer()) // 转换后与gulp的src方法返回类型一致，这样就可以继续调用gulp方法与gulp插件了
    .pipe(gulp.dest('dist'));
});
```

## browser-sync
一款前端开发工具，自带文件服务器，可显著提高前端开发与调试效率。

#### 特点
- 本地文件修改后浏览器会自动更新被修改的文件，让浏览器始终显示最新结果；
- 多浏览器同时打开同一页面，在其中一个浏览器做的操作会同步到其他浏览器上，便于测试。

#### 全局安装
- 全局安装一次即可：`npm install -g browser-sync`
- 采用命令行的方式使用，全局安装才可使用命令

#### 使用
- 项目目录下运行：`browser-sync start --server --files "*.*"`
    + --files参数后面跟要被监听的文件，多个文件以逗号隔开，也可以使用星号通配符
- 运行后会启动服务器，根据提示访问服务地址即可进行项目的开发调试

#### gulp集成
- 需要本地安装：npm install browser-sync -D
- 因为要通过脚本的方式使用，所以本地安装

``` javascript
// 加载本地的gulp
var gulp = require('gulp');
var browserSync = require('browser-sync');

// 启动browser-sync，取dist作为网站根目录，
// dist下的任何文件变化都要自动刷新浏览器
gulp.task('bsSync', function() {
  browserSync.init({
    server:'./dist',
    files:['./dist/*']
  });
});
```

## 附录

#### 其他插件
- gulp-changed
    + 过滤发生变化的文件
- gulp-clean
    + 删除文件或文件夹
- gulp-replace
    + 使用正则替换文件中的内容

#### grunt
- 较早出现且比较流行的前端构建工具，不过目前逐渐被gulp与webpack取代了
- gulp的理念可以说是完全复制与grunt，然后进行了一些优化
- grunt提倡通过配置的方式组件构建流程，gulp提倡通过脚本的方式组件构建流程
- 参考文档[https://gruntjs.com]