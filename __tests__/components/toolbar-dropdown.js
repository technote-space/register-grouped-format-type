/* eslint-disable no-magic-numbers */
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { ToolbarDropdown, GroupedControls } from '../../src/components';

const { BlockEdit, BlockFormatControls } = wp.blockEditor;
const { SlotFillProvider, Popover, ToolbarButton } = wp.components;
const { Fragment } = wp.element;
const { addFilter, removeFilter } = wp.hooks;
const { create } = wp.richText;

let filter;
beforeAll( () => {
	addFilter( 'editor.BlockEdit', 'components-test/toolbar-dropdown', BlockEdit => props => filter( BlockEdit, props ) );
} );

afterAll( () => {
	removeFilter( 'editor.BlockEdit', 'components-test/toolbar-dropdown' );
} );

describe( 'ToolbarDropdown', () => {
	const getSnapshotName = ( name, index ) => `${ name }--${ index }`;
	const setting = index => ( {
		icon: 'admin-customizer',
		position: 'top right',
		label: `test label ${ index }`,
		menuLabel: `test menu label ${ index }`,
		className: undefined,
		menuClassName: undefined,
		inspectorSettings: {},
		toolbarGroup: undefined,
		useContrastChecker: false,
	} );
	const { Fill, Slot } = GroupedControls( 'components-test' );
	const getGroupedSlots = setting  => ( [ [ { Slot, setting } ] ] );

	const createFilter = ( index, createToolbarDropdown, createComponents ) => ( BlockEdit, props ) => {
		if ( ! props.isSelected ) {
			return <BlockEdit { ...props }/>;
		}
		return <Fragment>
			<BlockEdit { ...props }/>
			{ createToolbarDropdown( setting( index ), index ) }
			{ createComponents( index ) }
		</Fragment>;
	};

	[
		{
			createComponents: () => <Fragment>
				<Fill>
					<ToolbarButton
						title={ 'ToolbarButton1' }
						isActive={ true }
						onClick={ () => {
						} }
					/>
				</Fill>
				<Fill>
					<ToolbarButton
						title={ 'ToolbarButton2' }
						isActive={ false }
					/>
				</Fill>
			</Fragment>,
			createToolbarDropdown: setting => ToolbarDropdown( getGroupedSlots( Object.assign( {}, setting, { menuClassName: 'test-menu-class' } ) ) ),
			callback: ( wrapper, index ) => {
				expect( wrapper.find( 'a' ).hostNodes() ).toHaveLength( 0 );
				expect( wrapper.find( '.editor-format-toolbar' ).hostNodes() ).toHaveLength( 1 );
				expect( wrapper.find( '.components-dropdown-button' ).hostNodes() ).toHaveLength( 1 );
				expect( wrapper.find( '.components-dropdown-button__toggle' ).hostNodes() ).toHaveLength( 1 );
				expect( wrapper.find( '.components-dropdown-button__toggle.is-active' ).hostNodes() ).toHaveLength( 1 );
				expect( wrapper.find( '.components-dropdown-menu__menu-item' ).hostNodes() ).toHaveLength( 0 );

				wrapper.find( '.components-dropdown-button__toggle.is-active' ).hostNodes().simulate( 'click' );

				expect( toJson( wrapper, { mode: 'deep' } ) ).toMatchSnapshot( getSnapshotName( 'opened-dropdown', index ) );

				expect( wrapper.find( '.components-dropdown-menu__menu-item' ).hostNodes() ).toHaveLength( 2 );
				expect( wrapper.find( '.components-dropdown-menu__menu-item.is-active' ).hostNodes() ).toHaveLength( 1 );

				wrapper.find( '.components-dropdown-menu__menu-item.is-active' ).hostNodes().simulate( 'click' );
				expect( wrapper.find( '.components-dropdown-menu__menu-item' ).hostNodes() ).toHaveLength( 0 );
			},
		},
		{
			createComponents: () => <Fragment>
				<Fill>
					<ToolbarButton
						title={ 'ToolbarButton3' }
						isActive={ true }
					/>
				</Fill>
				<Fill>
					<ToolbarButton
						title={ 'ToolbarButton4' }
						isActive={ false }
						isDisabled={ true }
					/>
				</Fill>
			</Fragment>,
			createToolbarDropdown: setting => ToolbarDropdown( getGroupedSlots( Object.assign( {}, setting, { className: 'test-class', menuLabel: undefined } ) ) ),
			callback: ( wrapper, index ) => {
				expect( wrapper.find( 'a' ).hostNodes() ).toHaveLength( 0 );
				expect( wrapper.find( '.editor-format-toolbar' ).hostNodes() ).toHaveLength( 1 );
				expect( wrapper.find( '.components-dropdown-button' ).hostNodes() ).toHaveLength( 1 );
				expect( wrapper.find( '.components-dropdown-button__toggle' ).hostNodes() ).toHaveLength( 1 );
				expect( wrapper.find( '.components-dropdown-button__toggle.is-active' ).hostNodes() ).toHaveLength( 1 );
				expect( wrapper.find( '.components-dropdown-menu__menu-item' ).hostNodes() ).toHaveLength( 0 );

				wrapper.find( '.components-dropdown-button__toggle.is-active' ).hostNodes().simulate( 'click' );

				expect( toJson( wrapper, { mode: 'deep' } ) ).toMatchSnapshot( getSnapshotName( 'opened-dropdown', index ) );

				expect( wrapper.find( '.components-dropdown-menu__menu-item' ).hostNodes() ).toHaveLength( 2 );
				expect( wrapper.find( '.components-dropdown-menu__menu-item.is-active' ).hostNodes() ).toHaveLength( 1 );

				wrapper.find( '.components-dropdown-menu__menu-item.is-active' ).hostNodes().simulate( 'click' );
				expect( wrapper.find( '.components-dropdown-menu__menu-item' ).hostNodes() ).toHaveLength( 0 );
			},
		},
		{
			createComponents: () => <Fragment>
				<Fill>
					<ToolbarButton
						title={ 'ToolbarButton5' }
						isActive={ false }
						isDisabled={ true }
					/>
				</Fill>
				<Fill>
					<ToolbarButton
						title={ 'ToolbarButton6' }
						isActive={ false }
						isDisabled={ true }
					/>
				</Fill>
			</Fragment>,
			createToolbarDropdown: setting => ToolbarDropdown( getGroupedSlots( setting ) ),
			callback: ( wrapper ) => {
				expect( wrapper.find( 'a' ).hostNodes() ).toHaveLength( 0 );
				expect( wrapper.find( '.editor-format-toolbar' ).hostNodes() ).toHaveLength( 1 );
				expect( wrapper.find( '.components-dropdown-button' ).hostNodes() ).toHaveLength( 1 );
				expect( wrapper.find( '.components-dropdown-button__toggle' ).hostNodes() ).toHaveLength( 1 );
				expect( wrapper.find( '.components-dropdown-button__toggle.is-active' ).hostNodes() ).toHaveLength( 0 );
				expect( wrapper.find( '.components-dropdown-menu__menu-item' ).hostNodes() ).toHaveLength( 0 );
			},
		},
		{
			createComponents: () => <Fragment>
				<Fill>
					<a href='http://example.com/test7'>test7</a>
				</Fill>
			</Fragment>,
			createToolbarDropdown: setting => ToolbarDropdown( getGroupedSlots( setting ) ),
			callback: ( wrapper ) => {
				expect( wrapper.find( 'a' ).hostNodes() ).toHaveLength( 1 );
				expect( wrapper.find( '.editor-format-toolbar' ).hostNodes() ).toHaveLength( 1 );
				expect( wrapper.find( '.components-dropdown-button' ).hostNodes() ).toHaveLength( 0 );
				expect( wrapper.find( '.components-dropdown-button__toggle' ).hostNodes() ).toHaveLength( 0 );
				expect( wrapper.find( '.components-dropdown-menu__menu-item' ).hostNodes() ).toHaveLength( 0 );
			},
		},
		{
			createComponents: () => <Fragment>
			</Fragment>,
			createToolbarDropdown: setting => ToolbarDropdown( getGroupedSlots( setting ) ),
			callback: ( wrapper ) => {
				expect( wrapper.find( 'a' ).hostNodes() ).toHaveLength( 0 );
				expect( wrapper.find( '.editor-format-toolbar' ).hostNodes() ).toHaveLength( 1 );
				expect( wrapper.find( '.components-dropdown-button' ).hostNodes() ).toHaveLength( 0 );
				expect( wrapper.find( '.components-dropdown-button__toggle' ).hostNodes() ).toHaveLength( 0 );
				expect( wrapper.find( '.components-dropdown-menu__menu-item' ).hostNodes() ).toHaveLength( 0 );
			},
		},
	].forEach( ( { createComponents, createToolbarDropdown, callback }, index ) => {
		it( `should render ToolbarDropdown ${ index }`, () => {
			filter = createFilter( index, createToolbarDropdown, createComponents );
			const wrapper = mount(
				<SlotFillProvider>
					<Popover.Slot/>
					<BlockFormatControls.Slot/>

					<BlockEdit
						name="core/paragraph"
						isSelected={ true }
						attributes={ ( {
							className: 'test-block-edit',
							content: create( {
								text: 'test',
								start: 0,
								end: 1,
								formats: [ [], [], [], [] ],
							} ),
						} ) }
					/>
				</SlotFillProvider>,
			);

			expect( toJson( wrapper, { mode: 'deep' } ) ).toMatchSnapshot( getSnapshotName( 'test', index ) );

			callback( wrapper, index );
		} );
	} );
} );
