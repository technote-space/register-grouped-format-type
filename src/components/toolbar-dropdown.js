import classnames from 'classnames';
import { Components } from '@technote-space/gutenberg-utils';

const { BlockFormatControls } = wp.blockEditor;
const { Toolbar, IconButton, NavigableMenu } = wp.components;

/**
 * @param {Array} fills fills
 * @param {object} setting setting
 * @returns {*} dropdown
 */
const createDropdown = ( fills, setting ) => {
	const controls = fills.map( ( [ { props } ] ) => props );
	const isActive = !! controls.filter( control => control.isActive ).length;
	const isDisabled = ! controls.filter( control => ! control.isDisabled ).length;
	const onClick = ( props, control ) => event => {
		event.stopPropagation();
		props.onClose();
		if ( control.onClick ) {
			control.onClick();
		}
	};
	const { label, menuLabel, menuClassName } = setting;
	return <Components.DropdownButton
		{ ...setting }
		isActive={ isActive }
		isDisabled={ isDisabled }
		renderContent={ ( props ) => <NavigableMenu
			className={ classnames( 'components-dropdown-menu__menu', menuClassName ) }
			role="menu"
			aria-label={ menuLabel || label }
		>
			{ controls.map( ( control, index ) => <IconButton
				key={ index }
				onClick={ onClick( props, control ) }
				className={ classnames( 'components-dropdown-menu__menu-item', {
					'is-active': control.isActive,
				} ) }
				icon={ control.icon }
				role="menuitem"
				disabled={ control.isDisabled }
			>
				{ control.title }
			</IconButton> ) }
		</NavigableMenu> }
	/>;
};

/**
 * @param {Array} fills fills
 * @param {object} setting setting
 * @returns {*} component
 */
const createComponent = ( fills, setting ) => fills.length > 1 ? createDropdown( fills, setting ) : fills[ 0 ]; /* eslint-disable-line no-magic-numbers */

/**
 * @param {Array.<Array.<object>>} groupedSlots grouped slots
 * @returns {*} dropdown
 * @constructor
 */
const ToolbarDropdown = groupedSlots => <BlockFormatControls>
	{ groupedSlots.map( ( slots, groupIndex ) => <div key={ groupIndex } className="editor-format-toolbar block-editor-format-toolbar">
		<Toolbar>
			{ slots.map( ( { Slot, setting }, index ) => <Slot key={ `${ groupIndex }-${ index }` }>
				{ fills => ! fills.length ? null : createComponent( fills, setting ) }
			</Slot> ) }
		</Toolbar>
	</div> ) }
</BlockFormatControls>;

export default ToolbarDropdown;
