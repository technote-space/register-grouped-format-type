# Register Grouped Format Type

[![npm version](https://badge.fury.io/js/%40technote-space%2Fregister-grouped-format-type.svg)](https://badge.fury.io/js/%40technote-space%2Fregister-grouped-format-type)
[![Build Status](https://travis-ci.com/technote-space/register-grouped-format-type.svg?branch=master)](https://travis-ci.com/technote-space/register-grouped-format-type)
[![Coverage Status](https://coveralls.io/repos/github/technote-space/register-grouped-format-type/badge.svg?branch=master)](https://coveralls.io/github/technote-space/register-grouped-format-type?branch=master)
[![CodeFactor](https://www.codefactor.io/repository/github/technote-space/register-grouped-format-type/badge)](https://www.codefactor.io/repository/github/technote-space/register-grouped-format-type)
[![License: GPL v2+](https://img.shields.io/badge/License-GPL%20v2%2B-blue.svg)](http://www.gnu.org/licenses/gpl-2.0.html)
[![WordPress: >=5.0](https://img.shields.io/badge/WordPress-%3E%3D5.0-brightgreen.svg)](https://wordpress.org/)

![動作](https://raw.githubusercontent.com/technote-space/register-grouped-format-type/images/screenshot.png)

*Read this in other languages: [English](README.md), [日本語](README.ja.md).*

これは グループ化された RichText フォーマットタイプを登録する方法を提供する Gutenberg のライブラリです。   
同じグループのフォーマットタイプが複数ある場合に DropDown によってまとまります。  
コントロールはフォーマットを切り替えることができるときのみアクティブになります。

[デモ](https://technote-space.github.io/register-grouped-format-type)

## サンプルプロジェクト
[Gutenberg Samples](https://github.com/technote-space/gutenberg-samples)

## 使用方法
### npm から利用する場合
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

コンパイルしスクリプトを読み込ませます。

```html
<script type="text/javascript" src="/assets/register.js"></script>
```

### ダウンロードして試用する場合

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

[リリースバージョン](https://github.com/technote-space/register-grouped-format-type/releases/latest/download/index.js) をダウンロードしてスクリプトを読み込ませます。
```html
<script type="text/javascript" src="/assets/register-grouped-format-type/index.js"></script>
<script type="text/javascript" src="/assets/register.js"></script>
```

## グループ設定を使用
グループのアイコン、ラベル、ポジションなどの設定をカスタマイズできます。
```js
import { RichText } from '@technote-space/register-grouped-format-type';

const { registerFormatTypeGroup } = RichText;

// register format type group setting
registerFormatTypeGroup( 'test2', {
	icon: 'admin-network',
} );
```

## インスペクタを使用
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

## 詳細
### `registerGroupedFormatType`
グループ化されたフォーマットタイプを追加します。
#### 定義
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
#### 引数
- name (required)
  - フォーマット名
  - [詳細](https://github.com/WordPress/gutenberg/blob/release/5.6/packages/rich-text/src/register-format-type.js#L17)
- title
  - フォーマットタイトル
  - [詳細](https://github.com/WordPress/gutenberg/blob/release/5.6/packages/rich-text/src/register-format-type.js#L211)
- tagName
  - タグ名
  - [詳細](https://github.com/WordPress/gutenberg/blob/release/5.6/packages/rich-text/src/register-format-type.js#L19)
- className
  - クラス名
  - [詳細](https://github.com/WordPress/gutenberg/blob/release/5.6/packages/rich-text/src/register-format-type.js#L20)
  - 複数のクラスを指定可能です (スペース区切り)。
- create (required)
  - `ToolbarButton` のようなコンポーネントを返す関数を指定します。
- group (required)
  - グループ名
  - 同じグループ名のアイテムが複数ある場合に DropDown によってまとまります。

### `registerFormatTypeGroup`
フォーマットタイプグループの設定を行います。
#### 定義
```
/**
 * @param {string} name group name
 * @param {object} setting setting
 * @returns {object} registered setting
 */
registerFormatTypeGroup( name, setting = {} )
```  
#### 引数
- name (required)
  - グループ名
- setting
  - グループ設定  
  
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

## WPの依存
- wp-block-editor
- wp-components
- wp-core-data
- wp-data
- wp-editor
- wp-element
- wp-i18n
- wp-rich-text
- wp-url
- lodash

## 依存
[Gutenberg Utils](https://github.com/technote-space/gutenberg-utils)

## 作者
[GitHub (Technote)](https://github.com/technote-space)  
[Blog](https://technote.space)