/* eslint-disable no-magic-numbers */
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { GroupedControls } from '../../src/components';

const { BlockEdit } = wp.blockEditor;
const { SlotFillProvider } = wp.components;
const { Fragment } = wp.element;
const { addFilter, removeFilter } = wp.hooks;
const { create } = wp.richText;

const createTest = ( targetName, createSlot, getCases ) => {
	let filter;
	beforeAll( () => {
		addFilter( 'editor.BlockEdit', 'components-test/components-test', BlockEdit => props => filter( BlockEdit, props ) );
	} );

	afterAll( () => {
		removeFilter( 'editor.BlockEdit', 'components-test/components-test' );
	} );

	describe( targetName, () => {
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
			additionalInspectors: [],
		} );
		const { Fill, Slot } = GroupedControls( 'components-test' );

		const createFilter = ( index, createToolbarDropdown, createComponents ) => ( BlockEdit, props ) => <Fragment>
			<BlockEdit { ...props }/>
			{ createToolbarDropdown( setting( index ), index ) }
			{ createComponents( index ) }
		</Fragment>;

		getCases( Fill, Slot, getSnapshotName ).forEach( ( { createComponents, createToolbarDropdown, callback }, index ) => {
			it( `should render ${ targetName } ${ index }`, () => {
				filter = createFilter( index, createToolbarDropdown, createComponents );
				const wrapper = mount(
					<SlotFillProvider>
						{ createSlot() }

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
};

export default createTest;
