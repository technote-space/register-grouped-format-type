import React from 'react';
import classnames from 'classnames';
import {ToolbarGroup, NavigableMenu, Button} from '@wordpress/components';
import {BlockControls} from '@wordpress/block-editor';
import {Components} from '../utils';

/**
 * @param {Array} fills fills
 * @param {object} setting setting
 * @returns {*} dropdown
 */
const createDropdown = (fills, setting) => {
  const controls               = fills.map(([{props}]) => props);
  const isActive               = !!controls.filter(control => control.isActive).length;
  const isDisabled             = !controls.filter(control => !control.isDisabled).length;
  const onClick                = (props, control) => event => {
    event.stopPropagation();
    props.onClose();
    if (control.onClick) {
      control.onClick();
    }
  };
  const {label, menuClassName} = setting;
  return <Components.DropdownButton
    {...setting}
    isActive={isActive}
    isDisabled={isDisabled}
    renderContent={(props) => <NavigableMenu
      className={classnames('components-dropdown-menu__menu', menuClassName)}
      role="menu"
      aria-label={label}
    >
      {controls.map((control, index) => <Button
        key={`dropdown-${label}-${index}`}
        onClick={onClick(props, control)}
        className={classnames('components-dropdown-menu__menu-item', {
          'is-active': control.isActive,
        })}
        icon={control.icon}
        role="menuitem"
        disabled={control.isDisabled}
      >
        {control.title}
      </Button>)}
    </NavigableMenu>}
  />;
};

/**
 * @param {Array} fills fills
 * @param {object} setting setting
 * @returns {*} component
 */
const createComponent = (fills, setting) => fills.length > 1 ? createDropdown(fills, setting) : fills[0][0]; /* eslint-disable-line no-magic-numbers */

/**
 * @param {Array.<Array.<object>>} groupedSlots grouped slots
 * @returns {*} dropdown
 * @constructor
 */
const ToolbarDropdown = groupedSlots => <BlockControls>
  {groupedSlots.map((slots, groupIndex) => <div key={`toolbar-dropdown-${groupIndex}`} className="editor-format-toolbar block-editor-format-toolbar">
    <ToolbarGroup>
      {slots.map(({Slot, setting}, index) => <Slot key={`toolbar-dropdown-${groupIndex}-${index}`}>
        {fills => !fills.length ? null : createComponent(fills, setting)}
      </Slot>)}
    </ToolbarGroup>
  </div>)}
</BlockControls>;

export default ToolbarDropdown;
