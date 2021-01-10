const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const DIST_BUILD = path.join(__dirname, 'build');

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'bundle.js',
		path: DIST_BUILD,
	},
	plugins: [
		new webpack.ProgressPlugin(),
		new MiniCssExtractPlugin({
			filename: 'style.css'
		}),
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: "./template/index.html"
		}),
		new CssMinimizerPlugin(),
	],
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader'
				]
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader',
				]
			}
		]
	},
	devServer: {
		contentBase: DIST_BUILD,
		compress: true,
		port: 8080,
		host: '192.168.1.69',
		disableHostCheck: true,
	}
};