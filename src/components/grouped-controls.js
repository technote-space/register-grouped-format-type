import { createSlotFill } from '@wordpress/components';

/**
 * @param {string} group group
 * @returns {*} slot fill
 * @constructor
 */
const GroupedControls = group => createSlotFill('GroupedControls.' + group);

export default GroupedControls;
