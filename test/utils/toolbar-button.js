const should = require( 'should' );

import { registerGroupedFormatType, registerFormatTypeGroup, setup } from '../../src/utils';

describe( 'registerGroupedFormatType test', () => {
	it( 'should not registered format type', () => {
		registerGroupedFormatType( { name: 'test1-test1', create: null, group: 'test1' } );
		registerGroupedFormatType( {
			create: () => {
			}, group: 'test2',
		} );
		registerGroupedFormatType( {
			name: 'test2-test1', create: () => {
			},
		} );
		test.utils.hooks.formatType.should.have.length( 0 ); // eslint-disable-line no-magic-numbers
	} );
	it( 'should registered format type', () => {
		registerGroupedFormatType( {
			name: 'test1-test1', create: () => {
			}, group: 'test1',
		} );
		registerGroupedFormatType( {
			name: 'test1-test2', create: () => {
			}, group: 'test1', title: 'test1-test2-title', tagName: 'test1-test2-tag', className: 'test1-test2-class',
		} );
		registerGroupedFormatType( {
			name: 'test2-test1', create: ( { args, name } ) => {
				name.should.equal( 'test2-test1' );
				args.should.ownProperty( 'test3' );
				args.test3.should.equal( true );
			}, group: 'test2',
		} );

		test.utils.hooks.formatType.should.have.length( 3 ); // eslint-disable-line no-magic-numbers
		test.utils.hooks.formatType[ 0 ].name.should.endWith( 'test1-test1' );
		test.utils.hooks.formatType[ 0 ].setting.title.should.equal( 'test1-test1' );
		test.utils.hooks.formatType[ 0 ].setting.className.should.equal( 'test1-test1' );
		test.utils.hooks.formatType[ 0 ].setting.tagName.should.equal( 'span' );
		test.utils.hooks.formatType[ 0 ].setting.edit.should.type( 'function' );

		test.utils.hooks.formatType[ 1 ].name.should.endWith( 'test1-test2' );
		test.utils.hooks.formatType[ 1 ].setting.title.should.equal( 'test1-test2-title' );
		test.utils.hooks.formatType[ 1 ].setting.className.should.equal( 'test1-test2-class' );
		test.utils.hooks.formatType[ 1 ].setting.tagName.should.equal( 'test1-test2-tag' );

		test.utils.hooks.formatType[ 2 ].name.should.endWith( 'test2-test1' );
		test.utils.hooks.formatType[ 2 ].setting.edit( { test3: true } );
	} );
} );

describe( 'registerFormatTypeGroup test', () => {
	it( 'should registered default setting', () => {
		const group1 = registerFormatTypeGroup( 'group1' );
		group1.should.ownProperty( 'icon' );
		group1.should.ownProperty( 'position' );
		group1.should.ownProperty( 'label' );
		group1.should.ownProperty( 'menuLabel' );
		group1.should.ownProperty( 'className' );
		group1.icon.should.equal( 'admin-customizer' );
		group1.position.should.equal( 'bottom left' );
		group1.label.should.equal( 'group1' );
		group1.menuLabel.should.equal( 'group1' );
		should( group1.className ).undefined();
	} );
	it( 'should registered setting', () => {
		const group2 = registerFormatTypeGroup( 'group2', {
			icon: 'a',
			position: 'b',
			label: 'c',
			menuLabel: 'd',
			className: 'e',
		} );
		group2.icon.should.equal( 'a' );
		group2.position.should.equal( 'b' );
		group2.label.should.equal( 'c' );
		group2.menuLabel.should.equal( 'd' );
		group2.className.should.equal( 'e' );
	} );
	it( 'should override setting', () => {
		const group1 = registerFormatTypeGroup( 'group1', {
			icon: 'a',
		} );
		group1.icon.should.equal( 'a' );
	} );
} );

describe( 'setup test', () => {
	it( 'should not registered function', () => {
		should( wp.richText.registerGroupedFormatType ).undefined();
		should( wp.richText.registerFormatTypeGroup ).undefined();
	} );
	it( 'should setup once', () => {
		setup().should.equal( true );
		setup().should.equal( false );
	} );
	it( 'should registered function', () => {
		wp.richText.registerGroupedFormatType.should.type( 'function' );
		wp.richText.registerFormatTypeGroup.should.type( 'function' );
	} );
} );