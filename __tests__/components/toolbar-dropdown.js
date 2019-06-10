/* eslint-disable no-magic-numbers */
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { ToolbarDropdown, GroupedControls } from '../../src/components';

const { BlockEdit, BlockFormatControls, InspectorControls } = wp.blockEditor;
const { SlotFillProvider, Popover, ToolbarButton } = wp.components;
const { Fragment } = wp.element;
const { addFilter } = wp.hooks;
const { create } = wp.richText;

describe( 'ToolbarDropdown test', () => {
	it( 'should render ToolbarDropdown', () => {
		const { Fill: ComponentsFill1, Slot: ComponentsSlot1 } = GroupedControls( 'components-test1' );
		const { Fill: ComponentsFill2, Slot: ComponentsSlot2 } = GroupedControls( 'components-test2' );
		const { Fill: ComponentsFill3, Slot: ComponentsSlot3 } = GroupedControls( 'components-test3' );
		const { Fill: ComponentsFill4, Slot: ComponentsSlot4 } = GroupedControls( 'components-test4' );
		const { Slot: ComponentsSlot5 } = GroupedControls( 'components-test5' );
		const { Fill: InspectorsFill1, Slot: InspectorsSlot1 } = GroupedControls( 'inspectors-test1' );
		const { Fill: InspectorsFill2, Slot: InspectorsSlot2 } = GroupedControls( 'inspectors-test2' );
		const setting = {
			icon: 'admin-customizer',
			position: 'top right',
			label: 'test label',
			menuLabel: 'test menu label',
			className: undefined,
			menuClassName: undefined,
			inspectorSettings: {},
		};

		addFilter( 'editor.BlockEdit', 'components-test/toolbar-dropdown', BlockEdit => props => {
			if ( ! props.isSelected ) {
				return <BlockEdit { ...props }/>;
			}
			return <Fragment>
				<BlockEdit { ...props }/>
				{ ToolbarDropdown( ComponentsSlot1, Object.assign( {}, setting, { menuClassName: 'test-menu-class' } ), false ) }
				{ ToolbarDropdown( ComponentsSlot2, Object.assign( {}, setting, { className: 'test-class', menuLabel: undefined } ), false ) }
				{ ToolbarDropdown( ComponentsSlot3, setting, false ) }
				{ ToolbarDropdown( ComponentsSlot4, setting, false ) }
				{ ToolbarDropdown( ComponentsSlot5, setting, false ) }
				{ ToolbarDropdown( InspectorsSlot1, setting, true ) }
				{ ToolbarDropdown( InspectorsSlot2, setting, true ) }

				<ComponentsFill1>
					<ToolbarButton
						title={ 'ToolbarButton1' }
						isActive={ true }
						onClick={ () => {
						} }
					/>
				</ComponentsFill1>
				<ComponentsFill1>
					<ToolbarButton
						title={ 'ToolbarButton2' }
						isActive={ false }
					/>
				</ComponentsFill1>

				<ComponentsFill2>
					<ToolbarButton
						title={ 'ToolbarButton3' }
						isActive={ true }
					/>
				</ComponentsFill2>
				<ComponentsFill2>
					<ToolbarButton
						title={ 'ToolbarButton4' }
						isActive={ false }
						isDisabled={ true }
					/>
				</ComponentsFill2>

				<ComponentsFill3>
					<ToolbarButton
						title={ 'ToolbarButton5' }
						isActive={ false }
						isDisabled={ true }
					/>
				</ComponentsFill3>
				<ComponentsFill3>
					<ToolbarButton
						title={ 'ToolbarButton6' }
						isActive={ false }
						isDisabled={ true }
					/>
				</ComponentsFill3>

				<ComponentsFill4>
					<a href='http://example.com/test7'>test7</a>
				</ComponentsFill4>

				<InspectorsFill1>
					<a href='http://example.com/test8'>test8</a>
				</InspectorsFill1>
				<InspectorsFill1>
					<a href='http://example.com/test9'>test9</a>
				</InspectorsFill1>

				<InspectorsFill2>
					<ToolbarButton
						title={ 'ToolbarButton10' }
						isDisabled={ true }
					/>
				</InspectorsFill2>
			</Fragment>;
		} );

		const wrapper = mount(
			<SlotFillProvider>
				<Popover.Slot/>
				<BlockFormatControls.Slot/>
				<InspectorControls.Slot/>

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

		expect( toJson( wrapper ) ).toMatchSnapshot();

		expect( wrapper.find( 'a' ).hostNodes() ).toHaveLength( 3 );
		expect( wrapper.find( '.editor-format-toolbar' ).hostNodes() ).toHaveLength( 4 );
		expect( wrapper.find( '.components-dropdown-button' ).hostNodes() ).toHaveLength( 3 );
		expect( wrapper.find( '.components-dropdown-button__toggle' ).hostNodes() ).toHaveLength( 3 );
		expect( wrapper.find( '.components-dropdown-button__toggle.is-active' ).hostNodes() ).toHaveLength( 2 );
		expect( wrapper.find( '.components-dropdown-menu__menu-item' ).hostNodes() ).toHaveLength( 0 );

		wrapper.find( '.components-dropdown-button__toggle.is-active' ).hostNodes().at( 0 ).simulate( 'click' );

		expect( toJson( wrapper ) ).toMatchSnapshot( 'opened-dropdown' );

		expect( wrapper.find( '.components-dropdown-menu__menu-item' ).hostNodes() ).toHaveLength( 2 );
		expect( wrapper.find( '.components-dropdown-menu__menu-item.is-active' ).hostNodes() ).toHaveLength( 1 );

		wrapper.find( '.components-dropdown-menu__menu-item.is-active' ).hostNodes().simulate( 'click' );
		expect( wrapper.find( '.components-dropdown-menu__menu-item' ).hostNodes() ).toHaveLength( 0 );

		wrapper.find( '.components-dropdown-button__toggle.is-active' ).hostNodes().at( 1 ).simulate( 'click' );
		wrapper.find( '.components-dropdown-menu__menu-item.is-active' ).hostNodes().simulate( 'click' );
	} );
} );
