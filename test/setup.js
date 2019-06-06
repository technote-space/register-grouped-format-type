const Mousetrap = require( 'mousetrap' );
const lodash = require( 'lodash' );
global.Mousetrap = Mousetrap;
global.window.lodash = lodash;
global.window.matchMedia = () => ( {
	matches: true, addListener: () => {
	},
} );
global.window.console.error = () => {
};

const richText = require( '@wordpress/rich-text' );
const element = require( '@wordpress/element' );
const components = require( '@wordpress/components' );
const editor = require( '@wordpress/editor' );
const data = require( '@wordpress/data' );
const url = require( '@wordpress/url' );

global.wp = {
	richText,
	element,
	components,
	editor,
	data,
	url,
};

