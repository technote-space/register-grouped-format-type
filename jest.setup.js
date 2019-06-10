import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure( {
	adapter: new Adapter(),
	snapshotSerializers: [ 'enzyme-to-json/serializer' ],
} );

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

const blockLibrary = require( '@wordpress/block-library' );
const blockEditor = require( '@wordpress/block-editor' );
const components = require( '@wordpress/components' );
const data = require( '@wordpress/data' );
const editor = require( '@wordpress/editor' );
const element = require( '@wordpress/element' );
const hooks = require( '@wordpress/hooks' );
const richText = require( '@wordpress/rich-text' );
const url = require( '@wordpress/url' );

global.wp = {
	blockLibrary,
	blockEditor,
	components,
	data,
	editor,
	element,
	hooks,
	richText,
	url,
};

blockLibrary.registerCoreBlocks();
