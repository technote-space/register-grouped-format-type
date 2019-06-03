import classnames from 'classnames';

const { BlockFormatControls } = wp.editor;
const { Toolbar, DropdownMenu, IconButton } = wp.components;

const createDropdown = ( fills, setting ) => {
	const controls = fills.map( ( [ { props } ] ) => props );
	const isDisabled = ! controls.filter( control => ! control.isDisabled ).length;
	return isDisabled ? <div className="components-dropdown-menu">
		<IconButton
			{ ...setting }
			className={ classnames( setting.className, 'components-dropdown-menu__toggle' ) }
			disabled={ true }
		>
			<span className="components-dropdown-menu__indicator"/>
		</IconButton>
	</div> : <DropdownMenu
		{ ...setting }
		controls={ controls }
	/>;
};
const createComponent = ( fills, setting ) => fills.length > 1 ? createDropdown( fills, setting ) : fills[ 0 ]; /* eslint-disable-line no-magic-numbers */

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
				{ fills => createComponent( fills, setting ) }
			</Slot>
		</Toolbar>
	</div>
</BlockFormatControls>;

export default ToolbarDropdown;
