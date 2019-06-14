/* eslint-disable no-magic-numbers */
const { select } = wp.data;

import { registerGroupedFormatType, registerFormatTypeGroup } from '../../src/helpers';
import { getFormatName } from '../../src/helpers';

describe( 'registerGroupedFormatType', () => {
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

		const commonFunc = ( { args, name } ) => {
			expect( name ).toBe( 'test2-test1' );
			expect( args ).toHaveProperty( 'test3' );
			expect( args.test3 ).toBe( true );
			return { props: {} };
		};
		const createMock = jest.fn( commonFunc );
		const createInspectorMock = jest.fn( commonFunc );
		expect( typeof registerGroupedFormatType( {
			name: 'test2-test1',
			create: createMock,
			createInspector: createInspectorMock,
			group: 'test2',
			inspectorGroup: 'test2-inspector',
			attributes: {
				style: 'color: red',
			},
			useInspectorSetting: true,
		} ) ).toBe( 'object' );

		expect( typeof registerGroupedFormatType( {
			name: 'test3-test1',
			create: () => {
			},
			title: 'test3-title',
			tagName: 'test3-tag',
			className: 'test3-class',
			inspectorGroup: 'test2-inspector',
		} ) ).toBe( 'object' );

		expect( typeof registerGroupedFormatType( {
			name: 'test4-test1',
			create: () => {
				return { props: {} };
			},
			createInspector: () => {
				return { props: {} };
			},
			group: 'test4',
			title: 'test4-test1-title',
			tagName: 'test4-test1-tag',
			className: 'test4-test1-class',
		} ) ).toBe( 'object' );

		expect( typeof registerGroupedFormatType( {
			name: 'test4-test2',
			create: () => {
				return { props: {} };
			},
			createInspector: () => {
				return { props: {} };
			},
			group: 'test4',
			title: 'test4-test2-title',
			tagName: 'test4-test2-tag',
			className: 'test4-test2-class',
		} ) ).toBe( 'object' );

		const test1 = select( 'core/rich-text' ).getFormatType( getFormatName( 'test1-test1' ) );
		const test2 = select( 'core/rich-text' ).getFormatType( getFormatName( 'test1-test2' ) );
		const test3 = select( 'core/rich-text' ).getFormatType( getFormatName( 'test2-test1' ) );
		const test4 = select( 'core/rich-text' ).getFormatType( getFormatName( 'test4-test1' ) );
		const test5 = select( 'core/rich-text' ).getFormatType( getFormatName( 'test4-test2' ) );

		expect( test5.name ).toContain( 'test4-test2' );
		expect( test5.title ).toBe( 'test4-test2-title' );
		expect( test5.className ).toBe( 'test4-test2-class' );
		expect( test5.tagName ).toBe( 'test4-test2-tag' );
		expect( typeof test5.edit( { value: {} } ) ).toBe( 'object' );

		expect( test4.name ).toContain( 'test4-test1' );
		expect( test4.title ).toBe( 'test4-test1-title' );
		expect( test4.className ).toBe( 'test4-test1-class' );
		expect( test4.tagName ).toBe( 'test4-test1-tag' );
		expect( typeof test4.edit( { value: {} } ) ).toBe( 'object' );

		expect( test3.name ).toContain( 'test2-test1' );
		const components3 = test3.edit( { test3: true, value: {} } );
		expect( test3.attributes ).toHaveProperty( 'style' );
		expect( test3.attributes.style ).toBe( 'color: red' );
		expect( typeof components3 ).toBe( 'object' );
		expect( typeof components3.props.children[ 0 ] ).toBe( 'object' );
		expect( typeof components3.props.children[ 1 ] ).toBe( 'object' );
		expect( components3.props.children[ 2 ] ).toBeNull();

		expect( test2.name ).toContain( 'test1-test2' );
		expect( test2.title ).toBe( 'test1-test2-title' );
		expect( test2.className ).toBe( 'test1-test2-class' );
		expect( test2.tagName ).toBe( 'test1-test2-tag' );
		expect( typeof test2.edit( { value: {} } ) ).toBe( 'object' );

		expect( test1.name ).toContain( 'test1-test1' );
		expect( test1.title ).toBe( 'test1-test1' );
		expect( test1.className ).toBe( 'test1-test1' );
		expect( test1.tagName ).toBe( 'span' );
		expect( typeof test1.edit ).toBe( 'function' );
		const components1 = test1.edit( { test1: true, value: {} } );
		expect( typeof components1 ).toBe( 'object' );
		expect( components1.props.children ).toHaveLength( 3 );
		expect( components1.props.children[ 0 ] ).toBeNull();
		expect( components1.props.children[ 1 ] ).toBeNull();
		expect( typeof components1.props.children[ 2 ] ).toBe( 'object' );

		expect( createMock ).toBeCalled();
		expect( createInspectorMock ).toBeCalled();
	} );
	it( 'should not registered format type', () => {
		expect( registerGroupedFormatType( {
			name: 'test1-test1',
			group: 'test1',
		} ) ).toBeNull();
	} );
} );

describe( 'registerFormatTypeGroup', () => {
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
