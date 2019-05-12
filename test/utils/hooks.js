require( 'should' );

import { PLUGIN_NAME } from '../../src/constant';
import { getHookName, getBlockEditRender } from '../../src/utils';

describe( 'getHookName test', () => {
	it( 'should start with plugin name', () => {
		getHookName( 'test' ).should.startWith( PLUGIN_NAME );
	} );
	it( 'should end with given name', () => {
		getHookName( 'test' ).should.endWith( 'test' );
	} );
} );

describe( 'getBlockEditRender test', () => {
	it( 'should be function type', () => {
		getBlockEditRender( () => {
		} ).should.type( 'function' );
	} );
} );
