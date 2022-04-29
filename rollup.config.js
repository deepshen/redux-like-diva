import path from 'path'
import common from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import clear from 'rollup-plugin-clear'
import ts from 'rollup-plugin-typescript2'


export default {
	input: './lib/index.ts',
	output: {
		file: 'dist/index.js',
		format: 'umd',
		name: 'reduxDva'
	},
	external: ['redux','react','react-redux'],
	plugins: [
		clear({
			targets: ['dist'],
			watch: true
		}),
		resolve({

		}),
		common({
			include:['node_modules']
		}),
		babel({
			exclude: ['node_modules'],
			presets: ['@babel/env']
		}),
		ts({
			tsconfig: path.resolve(__dirname,'tsconfig.json'),
			extensions: ['.js','.ts','.tsx']
		})
	],

}
