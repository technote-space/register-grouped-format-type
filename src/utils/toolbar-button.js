const { registerFormatType } = wp.richText;
const { Fragment } = wp.element;

import { PLUGIN_NAME } from '../constant';
import { GroupedControls, ToolbarDropdown } from '../components';

const groups = {};
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
} );

/**
 * @param {string} name name
 * @param {string} title title
 * @param {string} tagName tag name
 * @param {string} className class name
 * @param {function} create create component function
 * @param {string} group group
 * @return {boolean} result
 */
export const registerGroupedFormatType = ( {
	name,
	title = name,
	tagName = 'span',
	className = name,
	create,
	group,
} ) => {
	if ( undefined === name || undefined === group || typeof create !== 'function' ) {
		return false;
	}

	const formatName = PLUGIN_NAME + '/' + name;
	const isFirst = ! Object.keys( groups ).length;
	if ( ! ( group in groups ) ) {
		groups[ group ] = GroupedControls( group );
	}

	const { Fill } = groups[ group ];
	registerFormatType( formatName, {
		title,
		tagName,
		className,
		edit: args => {
			args.isDisabled = ! args.isActive && args.value.start === args.value.end;
			const component = create( { args, name, formatName } );
			component.props.isDisabled = args.isDisabled;
			return <Fragment>
				<Fill>
					{ component }
				</Fill>
				{ isFirst && Object.keys( groups ).map( key => ToolbarDropdown( groups[ key ].Slot, getGroupSetting( key ) ) ) }
			</Fragment>;
		},
	} );
	return true;
};

/**
 * @returns {boolean} success
 */
export const setup = () => {
	if ( wp.richText.registerGroupedFormatType ) {
		return false;
	}
	wp.richText.registerGroupedFormatType = registerGroupedFormatType;
	wp.richText.registerFormatTypeGroup = registerFormatTypeGroup;
	return true;
};
