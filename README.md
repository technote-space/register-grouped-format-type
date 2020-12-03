# Register Grouped Format Type

[![npm version](https://badge.fury.io/js/%40technote-space%2Fregister-grouped-format-type.svg)](https://badge.fury.io/js/%40technote-space%2Fregister-grouped-format-type)
[![CI Status](https://github.com/technote-space/register-grouped-format-type/workflows/CI/badge.svg)](https://github.com/technote-space/register-grouped-format-type/actions)
[![codecov](https://codecov.io/gh/technote-space/register-grouped-format-type/branch/master/graph/badge.svg)](https://codecov.io/gh/technote-space/register-grouped-format-type)
[![CodeFactor](https://www.codefactor.io/repository/github/technote-space/register-grouped-format-type/badge)](https://www.codefactor.io/repository/github/technote-space/register-grouped-format-type)
[![License: GPL v2+](https://img.shields.io/badge/License-GPL%20v2%2B-blue.svg)](http://www.gnu.org/licenses/gpl-2.0.html)
[![WordPress: >=5.4](https://img.shields.io/badge/WordPress-%3E%3D5.4-brightgreen.svg)](https://wordpress.org/)

![Behavior](https://raw.githubusercontent.com/technote-space/register-grouped-format-type/images/screenshot.png)

*Read this in other languages: [English](README.md), [日本語](README.ja.md).*

This is a Gutenberg's library to provides method to register grouped RichText format types,   
which will be gathered by DropDown when number of format type of same group is greater than 1.  
The controls are active only when it is able to toggle format.

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<details>
<summary>Details</summary>

- [Sample Project](#sample-project)
- [Usage](#usage)
- [Use group setting](#use-group-setting)
- [Use inspector](#use-inspector)
- [Functions](#functions)
  - [`registerGroupedFormatType`](#registergroupedformattype)
  - [`registerFormatTypeGroup`](#registerformattypegroup)
- [WP Dependencies](#wp-dependencies)
- [Dependency](#dependency)
- [Author](#author)

</details>
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Sample Project
[Gutenberg Samples](https://github.com/technote-space/gutenberg-samples)

## Usage
```bash
yarn add @technote-space/register-grouped-format-type
```

e.g. `assets/register.js`
```js
import { RichText } from '@technote-space/register-grouped-format-type';
import { Helpers } from '@technote-space/gutenberg-utils';

const { registerGroupedFormatType } = RichText;
const { getToolbarButtonProps } = Helpers;

/** register grouped format types
*
* - test1 (⇒ not dropdown)
*     |- format-test1
* 
* - test2 (⇒ dropdown)
*     |- format-test2
*     |- format-test3
*/
registerGroupedFormatType( getToolbarButtonProps( 'test1', 'format-test1', 'admin-customizer' ) );
registerGroupedFormatType( getToolbarButtonProps( 'test2', 'format-test2', 'admin-customizer' ) );
registerGroupedFormatType( getToolbarButtonProps( 'test2', 'format-test3', 'admin-customizer' ) );
```

```html
<script type="text/javascript" src="/assets/register.js"></script>
```

## Use group setting
You can customize dropdown settings such as icon, label, position, and so on.
```js
import { RichText } from '@technote-space/register-grouped-format-type';

const { registerFormatTypeGroup } = RichText;

// register format type group setting
registerFormatTypeGroup( 'test2', {
	icon: 'admin-network',
} );
```

## Use inspector
```js
import { RichText } from '@technote-space/register-grouped-format-type';
import { Helpers } from '@technote-space/gutenberg-utils';

const { registerFormatTypeGroup, registerGroupedFormatType, getRemoveFormatButton } = RichText;
const { getColorButtonProps, getFontSizesButtonProps } = Helpers;

// register format group for inspector
registerFormatTypeGroup( 'inspector', {
	inspectorSettings: {
		title: 'test inspector',
		initialOpen: true,
	},
	// set useContrastChecker = true to show ContrastChecker
	useContrastChecker: true,
	// set additional inspector (function: args => component)
	additionalInspectors: [ getRemoveFormatButton( 'remove all formats' ) ],
} );

// register format type
registerGroupedFormatType( getColorButtonProps( 'inspector', 'font-color', 'Font Color', 'admin-site', 'color' ) );
registerGroupedFormatType( getColorButtonProps( 'inspector', 'background-color', 'Background Color', 'editor-textcolor', 'background-color' ) );
registerGroupedFormatType( getFontSizesButtonProps( 'inspector', 'font-size', 'Font Size', 'edit' ) );
```

## Functions
### `registerGroupedFormatType`
Register grouped format type.
#### definition
```
/**
 * @param {string} name name
 * @param {string} title title
 * @param {string} tagName tag name
 * @param {string} className class name
 * @param {function?} create create component function
 * @param {function?} createInspector create inspector component function
 * @param {string?} group group
 * @param {string?} inspectorGroup inspector group
 * @param {object} settings settings
 * @return {object|null} registered settings
 */
registerGroupedFormatType( {
	name,
	title = name,
	tagName = 'span',
	className = name,
	create,
	createInspector,
	group = name,
	inspectorGroup,
	...settings
} )
```
#### arguments
- name (required)
  - format name
  - [detail](https://github.com/WordPress/gutenberg/blob/release/5.6/packages/rich-text/src/register-format-type.js#L17)
- title
  - format title
  - [detail](https://github.com/WordPress/gutenberg/blob/release/5.6/packages/rich-text/src/register-format-type.js#L211)
- tagName
  - tag name
  - [detail](https://github.com/WordPress/gutenberg/blob/release/5.6/packages/rich-text/src/register-format-type.js#L19)
- className
  - class name
  - [detail](https://github.com/WordPress/gutenberg/blob/release/5.6/packages/rich-text/src/register-format-type.js#L20)
  - You can use multiple classes (space separated).
- create (required)
  - function which returns the component like `ToolbarButton`
- group (required)
  - group name
  - When the number of items in the same group is more than 1, they will be gathered by DropDown.

### `registerFormatTypeGroup`
Register group settings of format type.  
#### definition
```
/**
 * @param {string} name group name
 * @param {object} setting setting
 * @returns {object} registered setting
 */
registerFormatTypeGroup( name, setting = {} )
```  
#### arguments
- name (required)
  - group name
- setting
  - group setting  
  
`default setting`
```
{
	icon: 'admin-customizer',
	position: 'top right',
	label: name,
	className: undefined,
	menuClassName: undefined,
	inspectorSettings: {},
	toolbarGroup: undefined,
	useContrastChecker: false,
	additionalInspectors: [],
}
```

## WP Dependencies
- wp-block-editor
- wp-components
- wp-data
- wp-element
- wp-i18n
- wp-hooks
- wp-rich-text
- wp-url
- lodash

## Dependency
[Gutenberg Utils](https://github.com/technote-space/gutenberg-utils)

## Author
[GitHub (Technote)](https://github.com/technote-space)  
[Blog](https://technote.space)
