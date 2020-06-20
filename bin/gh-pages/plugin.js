const {Fragment}  = wp.element;
const {addFilter} = wp.hooks;

import {RichText} from './build';
import {Helpers} from '@technote-space/gutenberg-utils';

const {registerFormatTypeGroup, registerGroupedFormatType, getRemoveFormatButton} = RichText;
const {getToolbarButtonProps, getColorButtonProps, getFontSizesButtonProps}       = Helpers;

import './plugin.scss';

registerFormatTypeGroup('test2', {
  icon: 'admin-network',
});

registerFormatTypeGroup('inspector', {
  toolbarGroup: 'inspector',
  inspectorSettings: {
    title: 'test inspector',
    initialOpen: true,
  },
  useContrastChecker: true,
  additionalInspectors: [getRemoveFormatButton('remove all formats')],
});

registerGroupedFormatType(getToolbarButtonProps('test1', 'format-test1', 'admin-customizer'));
registerGroupedFormatType(getToolbarButtonProps('test2', 'format-test2', 'admin-customizer'));
registerGroupedFormatType(getToolbarButtonProps('test2', 'format-test3', 'admin-customizer'));

registerGroupedFormatType(getColorButtonProps('font-color', 'Font Color', 'admin-site', 'color'));
registerGroupedFormatType(getColorButtonProps('background-color', 'Background Color', 'editor-textcolor', 'background-color'));
registerGroupedFormatType(getFontSizesButtonProps('font-size', 'Font Size', 'edit'));

addFilter('gh-pages.renderContent', 'plugin/renderContent', () => <Fragment>
  <p>This page is demonstration of <a href="https://github.com/technote-space/register-grouped-format-type">Register Grouped Format Type</a></p>
  <img className='playground__content__screenshot' src='./screenshot.png'/>
</Fragment>);
