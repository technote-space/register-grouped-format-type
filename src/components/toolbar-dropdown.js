const { BlockFormatControls } = wp.editor;
const { Toolbar, DropdownMenu } = wp.components;

/**
 * @param {*} Slot Slot
 * @param {object} setting setting
 * @returns {*} dropdown
 * @constructor
 */
const ToolbarDropdown = ( Slot, setting ) => <BlockFormatControls>
	<div className="editor-format-toolbar block-editor-format-toolbar">
		<Toolbar>
			<Slot>
				{ fills => fills.length > 1 ? <DropdownMenu /* eslint-disable-line no-magic-numbers */
					{ ...setting }
					controls={ fills.map( ( [ { props } ] ) => props ) }
				/> : fills[0] }
			</Slot>
		</Toolbar>
	</div>
</BlockFormatControls>;

export default ToolbarDropdown;
