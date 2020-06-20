import {createSlotFill} from '@wordpress/components';

/**
 * @param {string} group group
 * @returns {*} slot fill
 * @constructor
 */
const GroupedInspectors = group => createSlotFill('GroupedInspectors.' + group);

export default GroupedInspectors;
