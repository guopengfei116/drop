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
		rules: [
			{
				test: /\.js$/,
				use: [
					{loader: 'babel-loader', options: {presets: ['es2015']}}
				],
				include: /src/,
				exclude: /(node_modules)|(bower_components)/
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader',
					{loader: 'postcss-loader', options: {
						plugins: function() {
							return [
								require('autoprefixer')()
							];
						}
					}}
				],
				include: /src/
			},
			{
				test: /\.less$/,
				use: [
					'style-loader',
					'css-loader',
					{loader: 'postcss-loader', options: {
						plugins: function() {
							return [
								require('autoprefixer')()
							];
						}
					}},
					'less-loader'
				],
				include: /src/
			},
			{
				test: /\.html$/,
				use: 'html-loader'
			},
			{
				test: /\.tpl$/,
				use: 'ejs-loader'
			}
		]
	},
//  webpack 1.+ 配置
//	module: {
//		loaders: [
//			{
//				test: /\.js$/,
//				loader: 'babel-loader',
//				include: path.resolve(__dirname, 'crs'),
//				exclude: path.resolve(__dirname, 'node_modules'),
//				query: {
//					presets: ['es2015'],
//					plugins: ['transform-runtime']
//				}
//			},
//			{
//				test: /\.css$/,
//				loaders: [
//					'style-loader',
//					'css-loader?importLoaders=1',
//					'postcss-loader'
//				]
//			}
//		]
//	},
//	postcss: function() {
//		return [
//			require('autoprefixer')({})
//		]
//	}
};
