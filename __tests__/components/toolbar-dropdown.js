/* eslint-disable no-magic-numbers */
import React from 'react';
import { Fragment } from '@wordpress/element';
import { BlockControls } from '@wordpress/block-editor';
import { ToolbarButton } from '@wordpress/components';
import toJson from 'enzyme-to-json';
import createTest from './common';
import { ToolbarDropdown } from '../../src/components';

createTest('ToolbarDropdown', () => <Fragment>
	<BlockControls.Slot/>
</Fragment>, (Fill, Slot, getSnapshotName) => {
	const getGroupedSlots  = setting => ([[{ Slot, setting }]]);
	const openDropdownTest = (wrapper, index) => {
		expect(wrapper.find('.editor-format-toolbar').hostNodes()).toHaveLength(1);
		expect(wrapper.find('.components-dropdown-button').hostNodes()).toHaveLength(1);
		expect(wrapper.find('.components-dropdown-button__toggle').hostNodes()).toHaveLength(1);
		expect(wrapper.find('.components-dropdown-button__toggle.is-active').hostNodes()).toHaveLength(1);
		expect(wrapper.find('.components-dropdown-menu__menu-item').hostNodes()).toHaveLength(0);

		wrapper.find('.components-dropdown-button__toggle.is-active').hostNodes().simulate('click');

		expect(toJson(wrapper, { mode: 'deep' })).toMatchSnapshot(getSnapshotName('opened-dropdown', index));

		expect(wrapper.find('.components-dropdown-menu__menu-item').hostNodes()).toHaveLength(2);
		expect(wrapper.find('.components-dropdown-menu__menu-item.is-active').hostNodes()).toHaveLength(1);

		wrapper.find('.components-dropdown-menu__menu-item.is-active').hostNodes().simulate('click');
		expect(wrapper.find('.components-dropdown-menu__menu-item').hostNodes()).toHaveLength(0);
	};

	return [
		{
			createComponents: () => <Fragment>
				<Fill>
					<ToolbarButton
						title={'ToolbarButton1'}
						isActive={true}
						onClick={() => {
						}}
					/>
				</Fill>
				<Fill>
					<ToolbarButton
						title={'ToolbarButton2'}
						isActive={false}
					/>
				</Fill>
			</Fragment>,
			createToolbarDropdown: setting => ToolbarDropdown(getGroupedSlots(Object.assign({}, setting, { menuClassName: 'test-menu-class' }))),
			callback: openDropdownTest,
		},
		{
			createComponents: () => <Fragment>
				<Fill>
					<ToolbarButton
						title={'ToolbarButton3'}
						isActive={true}
					/>
				</Fill>
				<Fill>
					<ToolbarButton
						title={'ToolbarButton4'}
						isActive={false}
						isDisabled={true}
					/>
				</Fill>
			</Fragment>,
			createToolbarDropdown: setting => ToolbarDropdown(getGroupedSlots(Object.assign({}, setting, { className: 'test-class' }))),
			callback: openDropdownTest,
		},
		{
			createComponents: () => <Fragment>
				<Fill>
					<ToolbarButton
						title={'ToolbarButton5'}
						isActive={false}
						isDisabled={true}
					/>
				</Fill>
				<Fill>
					<ToolbarButton
						title={'ToolbarButton6'}
						isActive={false}
						isDisabled={true}
					/>
				</Fill>
			</Fragment>,
			createToolbarDropdown: setting => ToolbarDropdown(getGroupedSlots(setting)),
			callback: (wrapper) => {
				expect(wrapper.find('.editor-format-toolbar').hostNodes()).toHaveLength(1);
				expect(wrapper.find('.components-dropdown-button').hostNodes()).toHaveLength(1);
				expect(wrapper.find('.components-dropdown-button__toggle').hostNodes()).toHaveLength(1);
				expect(wrapper.find('.components-dropdown-button__toggle.is-active').hostNodes()).toHaveLength(0);
			},
		},
		{
			createComponents: () => <Fragment>
				<Fill>
					<ToolbarButton
						title={'ToolbarButton7'}
						isActive={true}
						className='toolbar-button-test7'
					/>
				</Fill>
			</Fragment>,
			createToolbarDropdown: setting => ToolbarDropdown(getGroupedSlots(setting)),
			callback: (wrapper) => {
				expect(wrapper.find('.editor-format-toolbar').hostNodes()).toHaveLength(1);
				expect(wrapper.find('.components-dropdown-button').hostNodes()).toHaveLength(0);
				expect(wrapper.find('.toolbar-button-test7').hostNodes()).toHaveLength(1);
			},
		},
		{
			createComponents: () => <Fragment/>,
			createToolbarDropdown: setting => ToolbarDropdown(getGroupedSlots(setting)),
			callback: (wrapper) => {
				expect(wrapper.find('.editor-format-toolbar').hostNodes()).toHaveLength(1);
				expect(wrapper.find('.components-dropdown-button').hostNodes()).toHaveLength(0);
				expect(wrapper.find('.components-dropdown-button__toggle').hostNodes()).toHaveLength(0);
			},
		},
	];
});
