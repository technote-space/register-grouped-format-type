const { select } = wp.data;
import { PLUGIN_NAME } from '../../src/constant';

import { registerGroupedFormatType, registerFormatTypeGroup } from '../../src/helpers';

describe( 'registerGroupedFormatType test', () => {
	it( 'should not registered format type', () => {
		//noinspection JSCheckFunctionSignatures
		expect( registerGroupedFormatType( {
			create: () => {
			},
			group: 'test2',
		} ) ).toBeNull();
	} );
	it( 'should registered format type', () => {
		expect( typeof registerGroupedFormatType( {
			name: 'test1-test1',
			group: 'test1',
		} ) ).toBe( 'object' );
		expect( typeof registerGroupedFormatType( {
			name: 'test1-test2',
			create: () => {
			},
			group: 'test1',
			title: 'test1-test2-title',
			tagName: 'test1-test2-tag',
			className: 'test1-test2-class',
		} ) ).toBe( 'object' );
		expect( typeof registerGroupedFormatType( {
			name: 'test2-test1',
			create: ( { args, name } ) => {
				expect( name ).toBe( 'test2-test1' );
				expect( args ).toHaveProperty( 'test3' );
				expect( args.test3 ).toBe( true );
				return { props: {} };
			},
			createInspector: ( { args, name } ) => {
				expect( name ).toBe( 'test2-test1' );
				expect( args ).toHaveProperty( 'test3' );
				expect( args.test3 ).toBe( true );
				return { props: {} };
			},
			group: 'test2',
			inspectorGroup: 'test2-inspector',
			attributes: {
				style: 'color: red',
			},
		} ) ).toBe( 'object' );
		expect( typeof registerGroupedFormatType( {
			name: 'test3-test2',
			create: () => {
			},
			title: 'test3-title',
			tagName: 'test3-tag',
			className: 'test3-class',
			inspectorGroup: 'test2-inspector',
		} ) ).toBe( 'object' );
		expect( typeof registerGroupedFormatType( {
			name: 'test2-test1',
			create: ( { args, name } ) => {
				expect( name ).toBe( 'test2-test1' );
				expect( args ).toHaveProperty( 'test3' );
				expect( args.test3 ).toBe( true );
				return { props: {} };
			},
			createInspector: ( { args, name } ) => {
				expect( name ).toBe( 'test2-test1' );
				expect( args ).toHaveProperty( 'test3' );
				expect( args.test3 ).toBe( true );
				return { props: {} };
			},
			group: 'test2',
			inspectorGroup: 'test2-inspector',
			attributes: {
				style: 'color: red',
			},
		} ) ).toBe( 'object' );

		const test1 = select( 'core/rich-text' ).getFormatType( PLUGIN_NAME + '/test1-test1' );
		const test2 = select( 'core/rich-text' ).getFormatType( PLUGIN_NAME + '/test1-test2' );
		const test3 = select( 'core/rich-text' ).getFormatType( PLUGIN_NAME + '/test2-test1' );

		expect( test1.name ).toContain( 'test1-test1' );
		expect( test1.title ).toBe( 'test1-test1' );
		expect( test1.className ).toBe( 'test1-test1' );
		expect( test1.tagName ).toBe( 'span' );
		expect( typeof test1.edit ).toBe( 'function' );
		test1.edit( { test1: true, value: {} } );

		expect( test2.name ).toContain( 'test1-test2' );
		expect( test2.title ).toBe( 'test1-test2-title' );
		expect( test2.className ).toBe( 'test1-test2-class' );
		expect( test2.tagName ).toBe( 'test1-test2-tag' );

		expect( test3.name ).toContain( 'test2-test1' );
		test3.edit( { test3: true, value: {} } );
		expect( test3.attributes ).toHaveProperty( 'style' );
		expect( test3.attributes.style ).toBe( 'color: red' );
	} );
} );

describe( 'registerFormatTypeGroup test', () => {
	it( 'should registered default setting', () => {
		const group1 = registerFormatTypeGroup( 'group1' );
		expect( group1 ).toHaveProperty( 'icon' );
		expect( group1 ).toHaveProperty( 'position' );
		expect( group1 ).toHaveProperty( 'label' );
		expect( group1 ).toHaveProperty( 'menuLabel' );
		expect( group1 ).toHaveProperty( 'className' );
		expect( group1.icon ).toBe( 'admin-customizer' );
		expect( group1.position ).toBe( 'top right' );
		expect( group1.label ).toBe( 'group1' );
		expect( group1.menuLabel ).toBe( 'group1' );
		expect( group1.className ).toBeUndefined();
	} );
	it( 'should registered setting', () => {
		const group2 = registerFormatTypeGroup( 'group2', {
			icon: 'a',
			position: 'b',
			label: 'c',
			menuLabel: 'd',
			className: 'e',
		} );
		expect( group2.icon ).toBe( 'a' );
		expect( group2.position ).toBe( 'b' );
		expect( group2.label ).toBe( 'c' );
		expect( group2.menuLabel ).toBe( 'd' );
		expect( group2.className ).toBe( 'e' );
	} );
	it( 'should override setting', () => {
		const group1 = registerFormatTypeGroup( 'group1', {
			icon: 'a',
		} );
		expect( group1.icon ).toBe( 'a' );
	} );
} );
