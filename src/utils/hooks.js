const { Fragment } = wp.element;

import { PLUGIN_NAME } from '../constant';

/**
 * @param {string} name name
 * @returns {array} setting
 */
export const getHookName = name => PLUGIN_NAME + '/' + name;

/**
 * @param {function} component component
 * @returns {function(*): function(*): *} render
 */
export const getBlockEditRender = component => BlockEdit => props => <Fragment>
	<BlockEdit { ...props }/>
	{ props.isSelected && component() }
</Fragment>;