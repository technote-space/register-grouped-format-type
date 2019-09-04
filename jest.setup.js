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
const coreData = require( '@wordpress/core-data' );
const data = require( '@wordpress/data' );
const dom = require( '@wordpress/dom' );
const editor = require( '@wordpress/editor' );
const element = require( '@wordpress/element' );
const hooks = require( '@wordpress/hooks' );
const i18n = require( '@wordpress/i18n' );
const isShallowEqual = require( '@wordpress/is-shallow-equal' );
const keycodes = require( '@wordpress/keycodes' );
const richText = require( '@wordpress/rich-text' );
const url = require( '@wordpress/url' );

global.wp = {
	blockLibrary,
	blockEditor,
	components,
	coreData,
	data,
	dom,
	editor,
	element,
	hooks,
	i18n,
	isShallowEqual,
	keycodes,
	richText,
	url,
};

blockLibrary.registerCoreBlocks();

hooks.removeAllFilters( 'editor.BlockEdit' );
