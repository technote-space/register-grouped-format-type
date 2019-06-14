import { Helpers } from '../utils';

const { getEditor } = Helpers;
const { InspectorControls } = getEditor();
const { PanelBody } = wp.components;
const { getContrastChecker } = Helpers;

/**
 * @param {Array} fills fills
 * @param {object} setting setting
 * @param {object} args args
 * @returns {null|*} inspector
 */
const createInspectorComponent = ( fills, setting, args ) => {
	const activeFills = fills.filter( ( [ { props } ] ) => ! props.isDisabled );
	if ( ! activeFills.length ) {
		return null;
	}

	return <InspectorControls>
		<PanelBody
			{ ...setting.inspectorSettings }
		>
			{ activeFills }
			{ setting.useContrastChecker && getContrastChecker( activeFills, args ) }
		</PanelBody>
	</InspectorControls>;
};

/**
 * @param {object} Slot Slot
 * @param {object} setting setting
 * @param {object} args args
 * @returns {*} inspector
 * @constructor
 */
const InspectorComponent = ( Slot, setting, args ) => <Slot>
	{ fills => ! fills.length ? null : createInspectorComponent( fills, setting, args ) }
</Slot>;

export default InspectorComponent;
