const Mousetrap = require( 'mousetrap' );
global.Mousetrap = Mousetrap;
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

global.wp = {
	richText,
	element,
	components,
	editor,
	data,
};

