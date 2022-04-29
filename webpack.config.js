const HtmlPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
	mode: 'development',
	entry: './src/index.js',
	output: {
		filename: "index.js",
		path: path.resolve(__dirname,'dist')
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.tsx?$/,
				loader: "ts-loader"
			}
		]
	},
	resolve: {
		extensions: ['.js','.jsx','.ts','.tsx']
	},
	plugins: [
		new HtmlPlugin({
			title: "Webpack App",
			template: path.resolve(__dirname,'index.html')
		})
	],
	devServer: {
		port: 3333,
		hot: true,
		historyApiFallback: true
	}

}
