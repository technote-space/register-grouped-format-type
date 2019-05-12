# Register Grouped Format Type

[![License: GPL v2+](https://img.shields.io/badge/License-GPL%20v2%2B-blue.svg)](http://www.gnu.org/licenses/gpl-2.0.html)
[![WordPress: >=5.1](https://img.shields.io/badge/WordPress-%3E%3D5.1-brightgreen.svg)](https://wordpress.org/)

This script provides method to register grouped RichText format types,   
which will be gathered by DropDown.

![動作](https://raw.githubusercontent.com/technote-space/register-grouped-format-type/master/screenshot1.png)

## How to use
### Use from npm
[https://www.npmjs.com/package/@technote-space/register-grouped-format-type](https://www.npmjs.com/package/@technote-space/register-grouped-format-type)

```
npm install --save @technote-space/register-grouped-format-type
```

`register.js`
```
require( '@technote-space/register-grouped-format-type' );

const { ToolbarButton } = wp.components;
const { toggleFormat, registerFormatTypeGroup, registerGroupedFormatType } = wp.richText;

const getProps = ( group, name ) => {
	return {
		name,
		group,
		create: ( { args, name, formatName } ) => <ToolbarButton
			icon='admin-customizer'
			title={ <div className={ name }>{ name }</div> }
			onClick={ () => args.onChange( toggleFormat( args.value, { type: formatName } ) ) }
			isActive={ args.isActive }
		/>,
	};
};

registerFormatTypeGroup( 'test1', {
	icon: 'admin-network',
} );

registerGroupedFormatType( getProps( 'test1', 'dropdown2-test1' ) );
registerGroupedFormatType( getProps( 'test2', 'dropdown2-test2' ) );
registerGroupedFormatType( getProps( 'test2', 'dropdown2-test3' ) );

```

Compile and enqueue script.

```
<script type="text/javascript" src="/assets/register.js"></script>
```

### Use from download

`register.js`
```
( function( toggleFormat, registerFormatTypeGroup, registerGroupedFormatType, el, ToolbarButton ) {
	function getProps( group, name ) {
		return {
			name: name,
			group: group,
			create: function( args ) {
				return el( ToolbarButton, {
					icon: 'admin-customizer',
					title: el( 'div', { className: name }, name ),
					onClick: function() {
						args.args.onChange( toggleFormat( args.args.value, { type: args.formatName } ) );
					},
					isActive: args.args.isActive,
				} );
			},
		};
	}

	registerFormatTypeGroup( 'test1', {
		icon: 'admin-network',
	} );

	registerGroupedFormatType( getProps( 'test1', 'dropdown2-test1' ) );
	registerGroupedFormatType( getProps( 'test2', 'dropdown2-test2' ) );
	registerGroupedFormatType( getProps( 'test2', 'dropdown2-test3' ) );
}(
	wp.richText.toggleFormat,
	wp.richText.registerFormatTypeGroup,
	wp.richText.registerGroupedFormatType,
	wp.element.createElement,
	wp.components.ToolbarButton,
) );

```

Download [Release version](https://raw.githubusercontent.com/technote-space/register-grouped-format-type/master/build/index.js) and enqueue scripts.
```
<script type="text/javascript" src="/assets/register-grouped-format-type/index.js"></script>
<script type="text/javascript" src="/assets/register.js"></script>
```


## Details
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
	position: 'bottom left',
	label: name,
	menuLabel: name,
	className: undefined,
}
```
### `registerGroupedFormatType`
#### definition
```
/**
 * @param {string} name name
 * @param {string} title title
 * @param {string} tagName tag name
 * @param {string} className class name
 * @param {function} create create component function
 * @param {string} group group
 */
registerGroupedFormatType( {
	name,
	title = name,
	tagName = 'span',
	className = name,
	create,
	group,
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
- create (required)
  - function which returns the component like `ToolbarButton`
- group (required)
  - group name

## Author
[GitHub (Technote)](https://github.com/technote-space)  
[Blog](https://technote.space)
