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
				{ fills => <DropdownMenu
					{ ...setting }
					controls={ fills.map( ( [ { props } ] ) => props ) }
				/> }
			</Slot>
		</Toolbar>
	</div>
</BlockFormatControls>;

export default ToolbarDropdown;
