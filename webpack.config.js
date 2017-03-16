var path = require('path');
var webpack = require('webpack');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

module.exports = {
	context: path.resolve('./src'),
	entry: './ts/index.ts',
	output: {
		path: path.resolve('./dist/'),
		filename: 'js/bundle.js',
		//filename: 'js/[name]-[hash].js',
		publicPath: '/'
	},
	module: {
		resolve: {
			extensions: [".tsx", ".ts", ".js"]
		},
		devtool: 'source-map',
		loaders: [{
			test: /\.js$/,
			loader: 'babel',
			exclude: /node_modules/,
			query: {
				presets: ['es2015']
			}
		}, {
			test: /\.tsx?$/,
			loader: 'ts-loader',
			exclude: /node_modules/,
		}, {
			test: /\.html$/,
			loader: 'html'
		}, {
			test: /\.scss$/,
			loaders: ["style", "css", "sass"]
		}, {
			test: /\.css$/,
			loaders: ["style", "css"]
		}, {
			test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			loader: "url-loader?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]"
		}, {
			test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			loader: "file?name=fonts/[name].[ext]"
		}, {
			test: /\.(jpe?g|png|gif)$/,
			loader: 'file?name=img/[name].[ext]'
		}]
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			template: './index.html'
		}),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
		}),
		new BrowserSyncPlugin({
			server: {
				baseDir: ['dist']
			},
			port: 3000,
			host: 'localhost',
			open: true
		}),
		new SWPrecacheWebpackPlugin({
			cacheId: 'pwa-boilerplate',
			filename: 'service-worker.js',
			maximumFileSizeToCacheInBytes: 4194304,
			minify: true,
			runtimeCaching: [{
				handler: 'cacheFirst',
				urlPattern: /[.]mp3$/,
			}],
		}),
		new CopyWebpackPlugin([{
			from: './manifest.json'
		}, {
			from: './manifest.webapp'
		}, {
			from: './robots.txt'
		}, {
			from: './favicon.ico'
		}, {
			from: './img/**/*',
			to: './'
		}])
	],
}