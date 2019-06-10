import classnames from 'classnames';
import { Components } from '@technote-space/gutenberg-utils';

const { BlockFormatControls, InspectorControls } = wp.blockEditor;
const { Toolbar, IconButton, NavigableMenu, PanelBody } = wp.components;
const { Fragment } = wp.element;

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

const createComponent = ( fills, setting ) => fills.length > 1 ? createDropdown( fills, setting ) : fills[ 0 ]; /* eslint-disable-line no-magic-numbers */

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
 * @param {{}} Slot Slot
 * @param {object} setting setting
 * @param {boolean} isInspector is inspector?
 * @returns {*} dropdown
 * @constructor
 */
const ToolbarDropdown = ( Slot, setting, isInspector = false ) => {
	return <Fragment>
		<Slot>
			{ fills => ! fills.length ? null : (
				isInspector ?
					createInspectorComponent( fills, setting ) :
					<BlockFormatControls>
						<div className="editor-format-toolbar block-editor-format-toolbar">
							<Toolbar>
								{ createComponent( fills, setting ) }
							</Toolbar>
						</div>
					</BlockFormatControls>
			) }
		</Slot>
	</Fragment>;
};

export default ToolbarDropdown;
