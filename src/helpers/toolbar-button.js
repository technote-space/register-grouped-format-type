const { Fragment } = wp.element;

import { GroupedControls, GroupedInspectors, ToolbarDropdown, InspectorComponent } from '../components';
import { registerMultipleClassFormatType, getFormatName } from './rich-text';

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
export const registerFormatTypeGroup = (name, setting = {}) => {
	groupSettings[ name ] = Object.assign({}, getGroupSetting(name), setting);
	return groupSettings[ name ];
};

/**
 * @param {string} name group name
 * @returns {{icon: string, position: string, label: string, className: undefined, menuClassName: undefined, inspectorSettings, toolbarGroup, useContrastChecker, additionalInspectors}} setting
 */
const getGroupSetting = name => name in groupSettings ? groupSettings[ name ] : getDefaultSetting(name);

/**
 * @param {string} name group name
 * @returns {{icon: string, position: string, label: string, className: undefined, menuClassName: undefined, inspectorSettings, toolbarGroup, useContrastChecker, additionalInspectors}} setting
 */
const getDefaultSetting = name => ({
	icon: 'admin-customizer',
	position: 'top right',
	label: name,
	className: undefined,
	menuClassName: undefined,
	inspectorSettings: {},
	toolbarGroup: undefined,
	useContrastChecker: false,
	additionalInspectors: [],
});

/**
 * @returns {Array.<Array.<object>>} grouped slots
 */
const getToolbarGroupedSlots = () => {
	const grouped = {};
	Object.keys(groups).forEach(key => {
		const setting = getGroupSetting(key in useInspectorSettings ? useInspectorSettings[ key ] : key);
		const toolbarGroup = setting.toolbarGroup;
		if (!(toolbarGroup in grouped)) {
			grouped[ toolbarGroup ] = [];
		}
		grouped[ toolbarGroup ].push({ Slot: groups[ key ].Slot, setting });
	});
	return Object.values(grouped);
};

/**
 * @param {string} name name
 * @param {string} title title
 * @param {string} tagName tag name
 * @param {string} className class name
 * @param {function?} create create component function
 * @param {function?} createInspector create inspector component function
 * @param {string?} group group
 * @param {string?} inspectorGroup inspector group
 * @param {object} settings settings
 * @return {object|null} registered settings
 */
export const registerGroupedFormatType = ({
	name,
	title = name,
	tagName = 'span',
	className = name,
	create,
	createInspector,
	group = name,
	inspectorGroup,
	...settings
}) => {
	if (undefined === name) {
		return null;
	}

	const formatName = getFormatName(name);
	if (formatName in formatNames) {
		return null;
	}

	const isFirst = !Object.keys(formatNames).length;
	formatNames[ formatName ] = formatName;

	if (settings && 'useInspectorSetting' in settings && settings.useInspectorSetting && inspectorGroup) {
		useInspectorSettings[ group ] = inspectorGroup;
	}

	return registerMultipleClassFormatType(formatName, {
		title,
		tagName,
		className,
		edit: onEdit(name, formatName, group, inspectorGroup, create, createInspector, isFirst, settings),
		...settings,
	});
};

/**
 * @param {string} formatName format name
 * @param {object} args args
 * @returns {object} format state
 */
export const getFormatState = (formatName, args) => {
	const isActive = args.isActive || !args.value.activeFormats || args.value.activeFormats.map(format => format.type).includes(formatName);
	const isDisabled = !isActive && args.value.start === args.value.end;
	return {
		isDisabled,
		isDropdownDisabled: isDisabled && args.value.start !== undefined,
	};
};

/**
 * @param {string} name name
 * @param {string} formatName format name
 * @param {string|undefined} group group
 * @param {string|undefined} inspectorGroup inspector group
 * @param {function|undefined} create create component function
 * @param {function|undefined} createInspector create inspector component function
 * @param {boolean} isFirst is first?
 * @param {object} settings settings
 * @returns {function(*=): *} component
 */
const onEdit = (name, formatName, group, inspectorGroup, create, createInspector, isFirst, settings) => args => {
	const newArgs = Object.assign({}, args, getFormatState(formatName, args));
	const component = createComponent(create, group, newArgs, name, formatName, settings);
	const inspector = createComponent(createInspector, inspectorGroup, newArgs, name, formatName, settings);

	return <Fragment>
		{createComponentFill(group, component)}
		{createInspectorFill(inspectorGroup, inspector)}
		{createSlot(isFirst, newArgs)}
	</Fragment>;
};

/**
 * @param {function} createFunction create function
 * @param {string|undefined} group group
 * @param {object} args args
 * @param {string} name name
 * @param {string} formatName format name
 * @param {object} settings settings
 * @returns {null|*} component
 */
const createComponent = (createFunction, group, args, name, formatName, settings) => {
	const component = !!group && typeof createFunction === 'function' ? createFunction({ args, name, formatName }) : null;
	if (component) {
		return Object.assign({}, component, {
			props: Object.assign({}, component.props, {
				isActive: args.isActive,
				isDisabled: args.isDisabled,
				isDropdownDisabled: args.isDropdownDisabled,
				formatName: formatName,
				propertyName: settings.propertyName,
			}),
		});
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
const createFill = (group, component, groups, createFillSlotFunction) => {
	if (!group || !component) {
		return null;
	}

	if (!(group in groups)) {
		groups[ group ] = createFillSlotFunction(group);
	}
	const Fill = groups[ group ].Fill;
	return <Fill>
		{component}
	</Fill>;
};

/**
 * @param {string|undefined} group group
 * @param {object} component component
 * @returns {*} fill
 */
const createComponentFill = (group, component) => createFill(group, component, groups, GroupedControls);

/**
 * @param {string|undefined} inspectorGroup inspector group
 * @param {object} component component
 * @returns {*} fill
 */
const createInspectorFill = (inspectorGroup, component) => createFill(inspectorGroup, component, inspectorGroups, GroupedInspectors);

/**
 * @param {boolean} isFirst is first?
 * @param {object} args args
 * @returns {null|*} slot
 */
const createSlot = (isFirst, args) => isFirst ? <Fragment>
	{ToolbarDropdown(getToolbarGroupedSlots())}
	{Object.keys(inspectorGroups).map((key, index) => InspectorComponent(inspectorGroups[ key ].Slot, getGroupSetting(key), args, index))}
</Fragment> : null;
