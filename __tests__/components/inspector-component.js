/* eslint-disable no-magic-numbers */
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { InspectorComponent, GroupedControls } from '../../src/components';

const { BlockEdit, InspectorControls } = wp.blockEditor;
const { SlotFillProvider, ToolbarButton } = wp.components;
const { Fragment } = wp.element;
const { addFilter, removeFilter } = wp.hooks;
const { create } = wp.richText;

let filter;
beforeAll( () => {
	addFilter( 'editor.BlockEdit', 'components-test/inspector-component', BlockEdit => props => filter( BlockEdit, props ) );
} );

afterAll( () => {
	removeFilter( 'editor.BlockEdit', 'components-test/inspector-component' );
} );

describe( 'InspectorComponent', () => {
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

	const createFilter = ( index, createToolbarDropdown, createComponents ) => ( BlockEdit, props ) => {
		if ( ! props.isSelected ) {
			return <BlockEdit { ...props }/>;
		}

		return <Fragment>
			<BlockEdit { ...props }/>
			{ createToolbarDropdown( Slot, setting( index ), index ) }
			{ createComponents( Fill, index ) }
		</Fragment>;
	};

	[
		{
			createComponents: Fill => <Fragment>
				<Fill>
					<a href='http://example.com/test1'>test1</a>
				</Fill>
				<Fill>
					<a href='http://example.com/test2'>test2</a>
				</Fill>
			</Fragment>,
			createToolbarDropdown: ( Slot, setting ) => InspectorComponent( Slot, Object.assign( {}, setting, {
				inspectorSettings: { className: 'inspector-test' },
				useContrastChecker: true,
				additionalInspectors: [
					() => <div className='additional-inspector-test1'>test1</div>,
					() => <div className='additional-inspector-test2'>test2</div>,
				],
			} ), {} ),
			callback: ( wrapper ) => {
				expect( wrapper.find( '.components-panel__body.inspector-test' ).hostNodes() ).toHaveLength( 1 );
				expect( wrapper.find( '.components-panel__body.inspector-test.is-opened' ).hostNodes() ).toHaveLength( 1 );
				expect( wrapper.find( 'a' ).hostNodes() ).toHaveLength( 2 );
				expect( wrapper.find( '.additional-inspector-test1' ).hostNodes() ).toHaveLength( 1 );
				expect( wrapper.find( '.additional-inspector-test2' ).hostNodes() ).toHaveLength( 1 );
			},
		},
		{
			createComponents: Fill => <Fragment>
				<Fill>
					<a href='http://example.com/test3'>test3</a>
				</Fill>
				<Fill>
					<a href='http://example.com/test4'>test4</a>
				</Fill>
			</Fragment>,
			createToolbarDropdown: ( Slot, setting ) => InspectorComponent( Slot, Object.assign( {}, setting, {
				className: 'inspector-test',
				inspectorSettings: { className: 'inspector-test', initialOpen: false },
			} ), {} ),
			callback: ( wrapper ) => {
				expect( wrapper.find( '.components-panel__body.inspector-test' ).hostNodes() ).toHaveLength( 1 );
				expect( wrapper.find( '.components-panel__body.inspector-test.is-opened' ).hostNodes() ).toHaveLength( 0 );
				expect( wrapper.find( 'a' ).hostNodes() ).toHaveLength( 0 );
			},
		},
		{
			createComponents: Fill => <Fragment>
				<Fill>
					<ToolbarButton
						title={ 'ToolbarButton1' }
						className={ 'test1' }
						isDisabled={ true }
					/>
				</Fill>
			</Fragment>,
			createToolbarDropdown: ( Slot, setting ) => InspectorComponent( Slot, Object.assign( {}, setting, {
				inspectorSettings: { className: 'inspector-test' },
			} ), {} ),
			callback: ( wrapper ) => {
				expect( wrapper.find( '.components-panel__body.inspector-test' ).hostNodes() ).toHaveLength( 0 );
				expect( wrapper.find( '.test1' ).hostNodes() ).toHaveLength( 0 );
			},
		},
	].forEach( ( { createComponents, createToolbarDropdown, callback }, index ) => {
		it( `should render InspectorComponent ${ index }`, () => {
			filter = createFilter( index, createToolbarDropdown, createComponents );
			const wrapper = mount(
				<SlotFillProvider>
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

			expect( toJson( wrapper, { mode: 'deep' } ) ).toMatchSnapshot( getSnapshotName( 'test', index ) );

			callback( wrapper, index );
		} );
	} );
} );
