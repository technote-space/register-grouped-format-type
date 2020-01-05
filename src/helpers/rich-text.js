import { Helpers } from '../utils';
import { PLUGIN_NAME } from '../constant';

const { dispatch, select } = wp.data;
const { Button } = wp.components;
const { isValidRemoveFormatButton, getRemoveFormatFunction } = Helpers;

/**
 * @param {object} settings settings
 * @returns {boolean} is valid?
 */
const validateName = settings => {
	if ( typeof settings.name !== 'string' ) {
		window.console.error(
			'Format names must be strings.',
		);
		return false;
	}

	if ( ! /^[a-z][a-z0-9-]*\/[a-z][a-z0-9-]*$/.test( settings.name ) ) {
		window.console.error(
			'Format names must contain a namespace prefix, include only lowercase alphanumeric characters or dashes, and start with a letter. Example: my-plugin/my-custom-format',
		);
		return false;
	}

	if ( select( 'core/rich-text' ).getFormatType( settings.name ) ) {
		window.console.error(
			'Format "' + settings.name + '" is already registered.',
		);
		return false;
	}
	return true;
};

/**
 * @param {object} settings settings
 * @returns {boolean} is valid?
 */
const validateTagName = settings => {
	if (
		typeof settings.tagName !== 'string' ||
		settings.tagName === ''
	) {
		window.console.error(
			'Format tag names must be a string.',
		);
		return false;
	}
	return true;
};

/**
 * @param {object} settings settings
 * @returns {boolean} is valid?
 */
const validateClassName = settings => {
	if (
		( typeof settings.className !== 'string' || settings.className === '' ) &&
		settings.className !== null
	) {
		window.console.error(
			'Format class names must be a string, or null to handle bare elements.',
		);
		return false;
	}

	if ( ! /^([_a-zA-Z]+[_a-zA-Z0-9-]*)(\s+[_a-zA-Z]+[_a-zA-Z0-9-]*)*$/.test( settings.className ) ) {
		window.console.error(
			'A class name must begin with a letter, followed by any number of hyphens, letters, or numbers.',
		);
		return false;
	}
	return true;
};

/**
 * @param {object} settings settings
 * @returns {boolean} is valid?
 */
const validateTitle = settings => {
	if ( ! ( 'title' in settings ) || settings.title === '' ) {
		window.console.error(
			'The format "' + settings.name + '" must have a title.',
		);
		return false;
	}
	if ( typeof settings.title !== 'string' ) {
		window.console.error(
			'Format titles must be strings.',
		);
		return false;
	}
	return true;
};

/**
 * @param {object} settings settings
 * @returns {boolean} is valid?
 */
const validateKeywords = settings => {
	if ( 'keywords' in settings && settings.keywords.length > 3 ) { // eslint-disable-line no-magic-numbers
		window.console.error(
			'The format "' + settings.name + '" can have a maximum of 3 keywords.',
		);
		return false;
	}
	return true;
};

/**
 * @param {object} settings settings
 * @returns {boolean} is valid?
 */
const checkRegistered = settings => {
	if ( settings.className === null ) {
		const formatTypeForBareElement = select( 'core/rich-text' )
			.getFormatTypeForBareElement( settings.tagName );

		if ( formatTypeForBareElement ) {
			window.console.error(
				`Format "${ formatTypeForBareElement.name }" is already registered to handle bare tag name "${ settings.tagName }".`,
			);
			return true;
		}
	} else {
		const formatTypeForClassName = select( 'core/rich-text' )
			.getFormatTypeForClassName( settings.className );

		if ( formatTypeForClassName ) {
			window.console.error(
				`Format "${ formatTypeForClassName.name }" is already registered to handle class name "${ settings.className }".`,
			);
			return true;
		}
	}
	return false;
};

/**
 * @param {string} name name
 * @param {object} settings strings
 * @returns {object|null} registered settings
 * @private
 */
export const registerMultipleClassFormatType = ( name, settings ) => {
	settings = {
		name,
		...settings,
	};

	if ( ! validateName( settings ) ) {
		return null;
	}

	if ( ! validateTagName( settings ) ) {
		return null;
	}

	if ( ! validateClassName( settings ) ) {
		return null;
	}

	if ( ! validateTitle( settings ) ) {
		return null;
	}

	if ( ! validateKeywords( settings ) ) {
		return null;
	}

	if ( checkRegistered( settings ) ) {
		return null;
	}

	dispatch( 'core/rich-text' ).addFormatTypes( settings );

	return settings;
};

/**
 * @param {string} name name
 * @returns {string} format name
 */
export const getFormatName = name => `${ PLUGIN_NAME }/${ name }`;

/**
 * @param {string} label label
 * @param {object} settings settings
 * @returns {function} remove format button
 */
export const getRemoveFormatButton = ( label, settings = { isDefault: true } ) => args => isValidRemoveFormatButton( args ) ? <Button
	{ ...settings }
	onClick={ getRemoveFormatFunction( args ) }
>
	{ label }
</Button> : null;
