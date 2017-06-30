var path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/app.js',
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'js/[name].js'
	},
	plugins: [
		new htmlWebpackPlugin({
			template: './src/index.html',
			filename: 'index.html',
			inject: 'body'
		})
	],
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				include: path.resolve(__dirname, 'crs'),
				exclude: path.resolve(__dirname, 'node_modules'),
				query: {
					presets: ['es2015'],
					plugins: ['transform-runtime']
				}
			},
			{
				test: /\.css$/,
				// 这个顺序是倒叙的，需要注意
				loader: 'style-loader!css-loader'
				// 这里不要配置include与exclude，可能发生错误
			}
		]
	}
};
