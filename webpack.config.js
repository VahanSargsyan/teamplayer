const webpack = require("webpack");
const path = require("path");

const DEV = path.resolve(__dirname+"/app");
const OUTPUT = path.resolve(__dirname+"/backend/public");

const config = {
	entry: DEV + "/App.js",
	output: {
		path: OUTPUT,
		filename: "bundle.js"
	},
	devServer: {
		inline: true,
		contentBase: path.join(__dirname, 'backend', 'public'),
		historyApiFallback: true
	},
	devtool: 'inline-source-map',
	module: {
		loaders: [
			{
				test: /\.js?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015', 'react', 'stage-2']
				}
			},
			{
				test: /\.sass?$/,
				loader: [ 'style-loader', 'css-loader', 'sass-loader' ]
			},
			{
				test: /\.css?$/,
				loader: [ 'style-loader', 'css-loader' ]
			}
		]
	}
};

module.exports = config;
