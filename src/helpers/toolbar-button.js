const { Fragment } = wp.element;

import { GroupedControls, GroupedInspectors, ToolbarDropdown, InspectorComponent } from '../components';
import { registerMultipleClassFormatType, getFormatName } from './index';

const formatNames = {};
const groups = {};
const inspectorGroups = {};
const groupSettings = {};
const useInspectorSettings = {};

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
	toolbarGroup: undefined,
	useContrastChecker: false,
	additionalInspectors: [],
} );

/**
 * @returns {Array.<Array.<object>>} grouped slots
 */
const getToolbarGroupedSlots = () => {
	const grouped = {};
	Object.keys( groups ).forEach( key => {
		const setting = getGroupSetting( key in useInspectorSettings ? useInspectorSettings[ key ] : key );
		const toolbarGroup = setting.toolbarGroup;
		if ( ! ( toolbarGroup in grouped ) ) {
			grouped[ toolbarGroup ] = [];
		}
		grouped[ toolbarGroup ].push( { Slot: groups[ key ].Slot, setting } );
	} );
	return Object.values( grouped );
};

/**
 * @param {string} name name
 * @param {string} title title
 * @param {string} tagName tag name
 * @param {string} className class name
 * @param {function|undefined} create create component function
 * @param {function|undefined} createInspector create inspector component function
 * @param {string|undefined} group group
 * @param {string|undefined} inspectorGroup inspector group
 * @param {object} settings settings
 * @return {object|null} registered settings
 */
export const registerGroupedFormatType = ( {
	name,
	title = name,
	tagName = 'span',
	className = name,
	create,
	createInspector,
	group = name,
	inspectorGroup,
	...settings
} ) => {
	if ( undefined === name ) {
		return null;
	}

	const formatName = getFormatName( name );
	if ( formatName in formatNames ) {
		return null;
	}

	const isFirst = ! Object.keys( formatNames ).length;
	formatNames[ formatName ] = formatName;

	if ( settings && 'useInspectorSetting' in settings && settings.useInspectorSetting && inspectorGroup ) {
		useInspectorSettings[ group ] = inspectorGroup;
	}

	return registerMultipleClassFormatType( formatName, {
		title,
		tagName,
		className,
		edit: onEdit( name, formatName, group, inspectorGroup, create, createInspector, isFirst ),
		...settings,
	} );
};

/**
 * @param {string} name name
 * @param {string} formatName format name
 * @param {string|undefined} group group
 * @param {string|undefined} inspectorGroup inspector group
 * @param {function|undefined} create create component function
 * @param {function|undefined} createInspector create inspector component function
 * @param {boolean} isFirst is first?
 * @returns {function(*=): *} component
 */
const onEdit = ( name, formatName, group, inspectorGroup, create, createInspector, isFirst ) => args => {
	args.isDisabled = ! args.isActive && args.value.start === args.value.end;
	args.isDropdownDisabled = args.isDisabled && args.value.start !== undefined;

	const component = createComponent( create, group, args, name, formatName );
	const inspector = createComponent( createInspector, inspectorGroup, args, name, formatName );

	return <Fragment>
		{ createComponentFill( group, component ) }
		{ createInspectorFill( inspectorGroup, inspector ) }
		{ createSlot( isFirst, args ) }
	</Fragment>;
};

/**
 * @param {function} createFunction create function
 * @param {string|undefined} group group
 * @param {object} args args
 * @param {string} name name
 * @param {string} formatName format name
 * @returns {null|*} component
 */
const createComponent = ( createFunction, group, args, name, formatName ) => {
	const component = !! group && typeof createFunction === 'function' ? createFunction( { args, name, formatName } ) : null;
	if ( component ) {
		component.props.isActive = args.isActive;
		component.props.isDisabled = args.isDisabled;
		component.props.isDropdownDisabled = args.isDropdownDisabled;
		component.props.formatName = formatName;
	}
	return component;
};

/**
 * @param {string|undefined} group group
 * @param {object} component component
 * @param {object} groups groups
 * @param {function} createFillSlotFunction create fill slot function
 * @returns {null|*} fill
 */
const createFill = ( group, component, groups, createFillSlotFunction ) => {
	if ( ! group || ! component ) {
		return null;
	}

	if ( ! ( group in groups ) ) {
		groups[ group ] = createFillSlotFunction( group );
	}
	const Fill = groups[ group ].Fill;
	return <Fill>
		{ component }
	</Fill>;
};

/**
 * @param {string|undefined} group group
 * @param {object} component component
 * @returns {*} fill
 */
const createComponentFill = ( group, component ) => createFill( group, component, groups, GroupedControls );

/**
 * @param {string|undefined} inspectorGroup inspector group
 * @param {object} component component
 * @returns {*} fill
 */
const createInspectorFill = ( inspectorGroup, component ) => createFill( inspectorGroup, component, inspectorGroups, GroupedInspectors );

/**
 * @param {boolean} isFirst is first?
 * @param {object} args args
 * @returns {null|*} slot
 */
const createSlot = ( isFirst, args ) => isFirst ? <Fragment>
		{ ToolbarDropdown( getToolbarGroupedSlots() ) }
	{ Object.keys( inspectorGroups ).map( key => InspectorComponent( inspectorGroups[ key ].Slot, getGroupSetting( key ), args ) ) }
</Fragment> : null;
