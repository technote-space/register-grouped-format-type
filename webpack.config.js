const SpeedMeasurePlugin = require( 'speed-measure-webpack-plugin' );
const DuplicatePackageCheckerPlugin = require( 'duplicate-package-checker-webpack-plugin' );
const TerserPlugin = require( 'terser-webpack-plugin' );
const webpack = require( 'webpack' );
const pkg = require( './package' );
const path = require( 'path' );

const banner = `${ pkg.name } ${ pkg.version }\nCopyright (c) ${ new Date().getFullYear() } ${ pkg.author }\n@license: ${ pkg.license }`;
const externals = {
	'@wordpress/block-editor': { this: [ 'wp', 'blockEditor' ] },
	'@wordpress/components': { this: [ 'wp', 'components' ] },
	'@wordpress/core-data': { this: [ 'wp', 'coreData' ] },
	'@wordpress/data': { this: [ 'wp', 'data' ] },
	'@wordpress/dom': { this: [ 'wp', 'dom' ] },
	'@wordpress/editor': { this: [ 'wp', 'editor' ] },
	'@wordpress/element': { this: [ 'wp', 'element' ] },
	'@wordpress/i18n': { this: [ 'wp', 'i18n' ] },
	'@wordpress/is-shallow-equal': { this: [ 'wp', 'isShallowEqual' ] },
	'@wordpress/keycodes': { this: [ 'wp', 'keycodes' ] },
	'@wordpress/rich-text': { this: [ 'wp', 'richText' ] },
	'@wordpress/url': { this: [ 'wp', 'url' ] },
	lodash: 'lodash',
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
		new DuplicatePackageCheckerPlugin(),
	],
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin( {
				terserOptions: {
					compress: {
						'reduce_vars': false,
					},
					mangle: true,
					output: {
						comments: /license/i,
					},
				},
				extractComments: false,
			} ),
		],
	},
};

module.exports = ( new SpeedMeasurePlugin() ).wrap( webpackConfig );