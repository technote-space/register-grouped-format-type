const { createSlotFill } = wp.components;

/**
 * @param {string} group group
 * @returns {*} slot fill
 * @constructor
 */
const GroupedControls = group => createSlotFill( 'GroupedControls.' + group );

export default GroupedControls;
