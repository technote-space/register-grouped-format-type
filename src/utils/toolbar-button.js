const { Fragment } = wp.element;

import { GroupedControls, GroupedInspectors, ToolbarDropdown } from '../components';
import { registerMultipleClassFormatType, getFormatName } from './index';

const groups = {};
const inspectorGroups = {};
const groupSettings = {};

/**
 * @param {string} name group name
 * @param {object} setting setting
 * @returns {object} registered setting
 */
export const registerFormatTypeGroup = ( name, setting = {} ) => {
	groupSettings[ name ] = Object.assign( {}, getGroupSetting( name ), setting );
	return groupSettings[ name ];
};

/**
 * @param {string} name group name
 * @returns {{icon: string, className: (string|*), position: string, label: never, menuLabel: never}} setting
 */
const getGroupSetting = name => name in groupSettings ? groupSettings[ name ] : getDefaultSetting( name );

/**
 * @param {string} name group name
 * @returns {{icon: string, className: undefined, position: string, label: *, menuLabel: *}} setting
 */
const getDefaultSetting = name => ( {
	icon: 'admin-customizer',
	position: 'top right',
	label: name,
	menuLabel: name,
	className: undefined,
	menuClassName: undefined,
	inspectorSettings: {},
} );

/**
 * @param {string} name name
 * @param {string} title title
 * @param {string} tagName tag name
 * @param {string} className class name
 * @param {function} create create component function
 * @param {function} createInspector create inspector component function
 * @param {string} group group
 * @param {string} inspectorGroup inspector group
 * @param {{}} settings settings
 * @return {{}} registered settings
 */
export const registerGroupedFormatType = ( {
	name,
	title = name,
	tagName = 'span',
	className = name,
	create,
	createInspector,
	group = name,
	inspectorGroup = name,
	...settings
} ) => {
	if ( undefined === name || undefined === group || undefined === inspectorGroup || typeof create !== 'function' ) {
		return null;
	}

	const formatName = getFormatName( name );
	const isFirst = ! Object.keys( groups ).length;
	if ( ! ( group in groups ) ) {
		groups[ group ] = GroupedControls( group );
	}
	if ( ! ( inspectorGroup in inspectorGroups ) ) {
		inspectorGroups[ inspectorGroup ] = GroupedInspectors( inspectorGroup );
	}

	const ComponentsFill = groups[ group ].Fill;
	const InspectorsFill = inspectorGroups[ inspectorGroup ].Fill;
	return registerMultipleClassFormatType( formatName, {
		title,
		tagName,
		className,
		edit: args => {
			args.isDisabled = ! args.isActive && args.value.start === args.value.end;
			args.isDropdownDisabled = args.isDisabled && args.value.start !== undefined;

			const component = create( { args, name, formatName } );
			component.props.isActive = args.isActive;
			component.props.isDisabled = args.isDisabled;
			component.props.isDropdownDisabled = args.isDropdownDisabled;

			const inspector = typeof createInspector === 'function' ? createInspector( { args, name, formatName } ) : null;
			if ( inspector ) {
				inspector.props.isActive = args.isActive;
				inspector.props.isDisabled = args.isDisabled;
			}

			return <Fragment>
				<ComponentsFill>
					{ component }
				</ComponentsFill>
				{ inspector && <InspectorsFill>
					{ inspector }
				</InspectorsFill> }
				{ isFirst && Object.keys( groups ).map( key => ToolbarDropdown( groups[ key ].Slot, getGroupSetting( key ) ) ) }
				{ isFirst && Object.keys( inspectorGroups ).map( key => ToolbarDropdown( inspectorGroups[ key ].Slot, getGroupSetting( key ), true ) ) }
			</Fragment>;
		},
		...settings,
	} );
};
