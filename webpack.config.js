const SpeedMeasurePlugin = require( 'speed-measure-webpack-plugin' );
const smp = new SpeedMeasurePlugin();
const webpack = require( 'webpack' );
const pkg = require( './package' );
const path = require( 'path' );

const banner = `${ pkg.name } ${ pkg.version }\nCopyright (c) ${ new Date().getFullYear() } ${ pkg.author }\nLicense: ${ pkg.license }`;
const externals = {
	'@wordpress/components': { this: [ 'wp', 'components' ] },
	'@wordpress/data': { this: [ 'wp', 'data' ] },
	'@wordpress/editor': { this: [ 'wp', 'editor' ] },
	'@wordpress/element': { this: [ 'wp', 'element' ] },
};

const webpackConfig = {
	context: path.resolve( __dirname, 'src' ),
	entry: './index.js',
	output: {
		path: path.resolve( __dirname, 'build' ),
		filename: 'index.js',
		library: [ 'Technote', 'Gutenberg' ],
		libraryTarget: 'umd',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
		],
	},
	externals,
	plugins: [
		new webpack.BannerPlugin( banner ),
	],
};

module.exports = smp.wrap( webpackConfig );