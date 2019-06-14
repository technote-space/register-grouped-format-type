const { Fragment } = wp.element;
const { InspectorControls } = wp.blockEditor;
const { PanelBody } = wp.components;

/**
 * @param {Array} fills fills
 * @param {object} setting setting
 * @returns {null|*} inspector
 */
const createInspectorComponent = ( fills, setting ) => {
	const activeFills = fills.filter( ( [ { props } ] ) => ! props.isDisabled );
	if ( ! activeFills.length ) {
		return null;
	}

	return <InspectorControls>
		<PanelBody
			{ ...setting.inspectorSettings }
		>
			{ activeFills }
		</PanelBody>
	</InspectorControls>;
};

/**
 * @param {object} Slot Slot
 * @param {object} setting setting
 * @returns {*} inspector
 * @constructor
 */
const InspectorComponent = ( Slot, setting ) => {
	return <Fragment>
		<Slot>
			{ fills => ! fills.length ? null : createInspectorComponent( fills, setting ) }
		</Slot>
	</Fragment>;
};

export default InspectorComponent;
