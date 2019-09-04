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
global.wpMock = {
	blockEditor: {
		getColorObjectByColorValue: () => false,
	},
	element: {
		useRef: () => ( {
			current: {
				contains: () => false,
				focus: () => 0,
				getBoundingClientRect: () => ( { width: 0, height: 0 } ),
				parentNode: {
					getBoundingClientRect: () => ( { width: 0, height: 0, left: 0, right: 0, top: 0, bottom: 0 } ),
				},
				querySelectorAll: () => ( [] ),
			},
		} ),
	},
};
global.window.lodash.debounce = fn => {
	function debounced() {
		return fn();
	}

	debounced.cancel = jest.fn();
	debounced.flush = jest.fn();
	return debounced;
};

jest.mock( '@wordpress/block-editor', () => ( {
	...jest.requireActual( '@wordpress/block-editor' ),
	getColorObjectByColorValue: ( colors, value ) => global.wpMock.blockEditor.getColorObjectByColorValue( colors, value ),
} ) );
jest.mock( '@wordpress/element', () => ( {
	...jest.requireActual( '@wordpress/element' ),
	useRef: ( colors, value ) => global.wpMock.element.useRef( colors, value ),
} ) );

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
