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
	const additionalInspectors = setting.additionalInspectors.map( generator => generator( args, setting ) ).filter( component => !! component );
	if ( ! activeFills.length && ! additionalInspectors.length ) {
		return null;
	}

	return <InspectorControls>
		<PanelBody
			{ ...setting.inspectorSettings }
		>
			{ activeFills }
			{ setting.useContrastChecker && getContrastChecker( activeFills, args ) }
			{ additionalInspectors.map( ( component, index ) => Object.assign( {}, component, {
				key: `additional-inspector-${ index }`,
			} ) ) }
		</PanelBody>
	</InspectorControls>;
};

/**
 * @param {object} Slot Slot
 * @param {object} setting setting
 * @param {object} args args
 * @param {number} index index
 * @returns {*} inspector
 * @constructor
 */
const InspectorComponent = ( Slot, setting, args, index ) => <Slot key={ `inspector-component-${ index }` }>
	{ fills => ! fills.length ? null : createInspectorComponent( fills, setting, args ) }
</Slot>;

export default InspectorComponent;
