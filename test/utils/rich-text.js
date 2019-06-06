const should = require( 'should' );

import { PLUGIN_NAME } from '../../src/constant';
import { registerMultipleClassFormatType, getFormatName } from '../../src/utils';

describe( 'registerMultipleClassFormatType test', () => {
	it( 'should not null if succeeded registration', () => {
		registerMultipleClassFormatType( 'rich-text/test1-1', {
			tagName: 'span',
			className: 'test1-1',
			title: 'test1-1',
		} ).should.not.null();
		registerMultipleClassFormatType( 'rich-text/test1-2', {
			tagName: 'span',
			className: 'test1-2 test1-22',
			title: 'test1-2',
			keywords: [ 'test1-2' ],
		} ).should.not.null();
		registerMultipleClassFormatType( 'rich-text/test1-3', {
			tagName: 'span',
			className: null,
			title: 'test1-3',
		} ).should.not.null();
	} );

	it( 'should null if invalid name', () => {
		should( registerMultipleClassFormatType( 1, {} ) ).null(); // eslint-disable-line no-magic-numbers
		should( registerMultipleClassFormatType( 'test2-2', { name: 2 } ) ).null();
		should( registerMultipleClassFormatType( 'test2-3', {} ) ).null();
		should( registerMultipleClassFormatType( '123rich-text/test2-4', {} ) ).null();
	} );

	it( 'should null if invalid tagName', () => {
		should( registerMultipleClassFormatType( 'rich-text/test3-1', {} ) ).null();
		should( registerMultipleClassFormatType( 'rich-text/test3-2', {
			tagName: 1,
		} ) ).null();
	} );

	it( 'should null if invalid className', () => {
		should( registerMultipleClassFormatType( 'rich-text/test3-1', {
			tagName: 'span',
		} ) ).null();
		should( registerMultipleClassFormatType( 'rich-text/test3-1', {
			tagName: 'span',
			className: 1,
		} ) ).null();
		should( registerMultipleClassFormatType( 'rich-text/test3-1', {
			tagName: 'span',
			className: '123test3',
		} ) ).null();
	} );

	it( 'should null if invalid title', () => {
		should( registerMultipleClassFormatType( 'rich-text/test4-1', {
			tagName: 'span',
			className: 'test4-1',
		} ) ).null();
		should( registerMultipleClassFormatType( 'rich-text/test4-2', {
			tagName: 'span',
			className: 'test4-2',
			title: '',
		} ) ).null();
		should( registerMultipleClassFormatType( 'rich-text/test4-2', {
			tagName: 'span',
			className: 'test4-2',
			title: null,
		} ) ).null();
	} );

	it( 'should null if has already registered', () => {
		should( registerMultipleClassFormatType( 'rich-text/test1-1', {} ) ).null();
		should( registerMultipleClassFormatType( 'rich-text/test5-2', {
			tagName: 'span',
			className: null,
			title: 'test5-2',
		} ) ).null();
		should( registerMultipleClassFormatType( 'rich-text/test5-3', {
			tagName: 'span',
			className: 'test1-1',
			title: 'test5-3',
		} ) ).null();
	} );

	it( 'should null if many keywords', () => {
		should( registerMultipleClassFormatType( 'rich-text/test6-1', {
			tagName: 'span',
			className: 'test6-1',
			title: 'test6-1',
			keywords: [ 'test6-1', 'test6-10', 'test6-100', 'test6-1000' ],
		} ) ).null();
	} );

} );

describe( 'getFormatName test', () => {
	it( 'should start plugin name', () => {
		getFormatName( 'test1' ).should.startWith( PLUGIN_NAME );
	} );

	it( 'should end name', () => {
		getFormatName( 'test2' ).should.endWith( 'test2' );
	} );
} );
