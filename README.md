# Register Grouped Format Type

[![npm version](https://badge.fury.io/js/%40technote-space%2Fregister-grouped-format-type.svg)](https://badge.fury.io/js/%40technote-space%2Fregister-grouped-format-type)
[![Build Status](https://github.com/technote-space/register-grouped-format-type/workflows/Build/badge.svg)](https://github.com/technote-space/register-grouped-format-type/actions)
[![Build Status](https://travis-ci.com/technote-space/register-grouped-format-type.svg?branch=master)](https://travis-ci.com/technote-space/register-grouped-format-type)
[![codecov](https://codecov.io/gh/technote-space/register-grouped-format-type/branch/master/graph/badge.svg)](https://codecov.io/gh/technote-space/register-grouped-format-type)
[![CodeFactor](https://www.codefactor.io/repository/github/technote-space/register-grouped-format-type/badge)](https://www.codefactor.io/repository/github/technote-space/register-grouped-format-type)
[![License: GPL v2+](https://img.shields.io/badge/License-GPL%20v2%2B-blue.svg)](http://www.gnu.org/licenses/gpl-2.0.html)
[![WordPress: >=5.0](https://img.shields.io/badge/WordPress-%3E%3D5.0-brightgreen.svg)](https://wordpress.org/)

![Behavior](https://raw.githubusercontent.com/technote-space/register-grouped-format-type/images/screenshot.png)

*Read this in other languages: [English](README.md), [日本語](README.ja.md).*

This is a Gutenberg's library to provides method to register grouped RichText format types,   
which will be gathered by DropDown when number of format type of same group is greater than 1.  
The controls are active only when it is able to toggle format.

[Demonstration](https://technote-space.github.io/register-grouped-format-type)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Sample Project](#sample-project)
- [How to use](#how-to-use)
  - [Use from npm](#use-from-npm)
  - [Use from download](#use-from-download)
- [Use group setting](#use-group-setting)
- [Use inspector](#use-inspector)
- [Details](#details)
  - [`registerGroupedFormatType`](#registergroupedformattype)
    - [definition](#definition)
    - [arguments](#arguments)
  - [`registerFormatTypeGroup`](#registerformattypegroup)
    - [definition](#definition-1)
    - [arguments](#arguments-1)
- [WP Dependencies](#wp-dependencies)
- [Dependency](#dependency)
- [Author](#author)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Sample Project
[Gutenberg Samples](https://github.com/technote-space/gutenberg-samples)

## How to use
### npm
[https://www.npmjs.com/package/@technote-space/register-grouped-format-type](https://www.npmjs.com/package/@technote-space/register-grouped-format-type)

```bash
npm install --save @technote-space/register-grouped-format-type
```

`register.js`
```js
import { Common, RichText } from '@technote-space/register-grouped-format-type';

const { registerGroupedFormatType } = RichText;
const { getToolbarButtonProps } = Common.Helpers;

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

Compile and enqueue script.

```html
<script type="text/javascript" src="/assets/register.js"></script>
```


### Browser
`register.js`
```js
( function(  el, registerFormatTypeGroup, registerGroupedFormatType, getRemoveFormatButton, getToolbarButtonProps ) {

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

}(
	wp.element.createElement,
	Technote.Gutenberg.RichText.registerFormatTypeGroup,
	Technote.Gutenberg.RichText.registerGroupedFormatType,
	Technote.Gutenberg.RichText.getRemoveFormatButton,
	Technote.Gutenberg.Common.Helpers.getToolbarButtonProps,
) );
```

Download [Release version](https://github.com/technote-space/register-grouped-format-type/releases/latest/download/index.js) and enqueue scripts.
```html
<script type="text/javascript" src="/assets/register-grouped-format-type/index.js"></script>
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
import { Common, RichText } from '@technote-space/register-grouped-format-type';

const { registerFormatTypeGroup, registerGroupedFormatType, getRemoveFormatButton } = RichText;
const { getColorButtonProps, getFontSizesButtonProps } = Common.Helpers;

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

## Details
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
- wp-core-data
- wp-data
- wp-dom
- wp-editor
- wp-element
- wp-i18n
- wp-is-shallow-equal
- wp-keycodes
- wp-rich-text
- wp-url
- lodash

## Dependency
[Gutenberg Utils](https://github.com/technote-space/gutenberg-utils)

## Author
[GitHub (Technote)](https://github.com/technote-space)  
[Blog](https://technote.space)
