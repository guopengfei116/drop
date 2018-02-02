## 优化

#### 抽取公共js模块
- 前面我们的打包方案是无论有多少脚本, 最终都打包成一个js
- 这样做的话, 在大型项目中存在一些弊端, 就是加载速度可能会慢, 无法并发, 也无法充分使用浏览器缓存
- 所以我们这里尝试把js适当的拆分成几个不同的模块

```javascript
// 需要导入webpack
var webpack = require('webpack');

// 配置多个打包模块
entry: {
  a: path.resolve(__dirname, 'src/js/a.js'),
  b: path.resolve(__dirname, 'src/js/b.js')
},

// 配置公共模块实例1
plugins: [
    new webpack.optimize.CommonsChunkPlugin({
        name: 'common',                                            // 抽取的公共模块名称
        chunks: ['bundle', 'bundle2', 'bundle3']      // 从指定的模块中抽取公共部分
    })
}
```

// 配置公共模块实例2
plugins: [
    new webpack.optimize.CommonsChunkPlugin({
        names: ['vender1','vender2', 'vender3'],     把指定的入口打包成公共模块
    })
}
```

## 压缩混淆js

```javascript
plugins: [
    new webpack.optimize.UglifyJsPlugin()
}
```

## 抽取css

#### 安装
- `npm i extract-text-webpack-plugin -D`

#### webpack配置

```javascript
// 引入插件
var ExtractTextPlugin = require("extract-text-webpack-plugin");

// 修改css、less、sass的loader配置，使用插件来处理
module: {
    rules: [
        // css文件
        {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({//
                fallback: "style-loader",
                use: "css-loader"
            })
        },
        // less文件
        {
          test: /\.less$/,
          use: ExtractTextPlugin.extract({
               fallback: 'style-loader',
               use: ['css-loader', 'less-loader']
           })
        },
        // sass文件
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
               fallback: 'style-loader',
               use: ['css-loader', 'sass-loader']
           })
        },
    ]
}

// 配置插件
plugins: [
    new ExtractTextPlugin("[name].css")
}
```

## 压缩css

#### 安装
- `npm i optimize-css-assets-webpack-plugin -D`

```javascript
// 引入插件
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// 配置插件
plugins: [
    new OptimizeCssAssetsPlugin()
}
```