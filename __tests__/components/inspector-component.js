/* eslint-disable no-magic-numbers */
import React from 'react';
import {Fragment} from '@wordpress/element';
import {InspectorControls} from '@wordpress/block-editor';
import {ToolbarButton} from '@wordpress/components';
import createTest from './common';
import {InspectorComponent} from '../../src/components';

createTest('InspectorComponent', () => <InspectorControls.Slot/>, (Fill, Slot) => [
  {
    createComponents: () => <Fragment>
      <Fill>
        <a href='http://example.com/test1'>test1</a>
      </Fill>
      <Fill>
        <a href='http://example.com/test2'>test2</a>
      </Fill>
    </Fragment>,
    createToolbarDropdown: setting => InspectorComponent(Slot, Object.assign({}, setting, {
      inspectorSettings: {className: 'inspector-test'},
      useContrastChecker: true,
      additionalInspectors: [
        () => <div className='additional-inspector-test1'>test1</div>,
        () => <div className='additional-inspector-test2'>test2</div>,
      ],
    }), {}),
    callback: (wrapper) => {
      expect(wrapper.find('.components-panel__body.inspector-test').hostNodes()).toHaveLength(1);
      expect(wrapper.find('.components-panel__body.inspector-test.is-opened').hostNodes()).toHaveLength(1);
      expect(wrapper.find('a').hostNodes()).toHaveLength(2);
      expect(wrapper.find('.additional-inspector-test1').hostNodes()).toHaveLength(1);
      expect(wrapper.find('.additional-inspector-test2').hostNodes()).toHaveLength(1);
    },
  },
  {
    createComponents: () => <Fragment>
      <Fill>
        <a href='http://example.com/test3'>test3</a>
      </Fill>
      <Fill>
        <a href='http://example.com/test4'>test4</a>
      </Fill>
    </Fragment>,
    createToolbarDropdown: setting => InspectorComponent(Slot, Object.assign({}, setting, {
      className: 'inspector-test',
      inspectorSettings: {className: 'inspector-test', initialOpen: false},
    }), {}, 0),
    callback: (wrapper) => {
      expect(wrapper.find('.components-panel__body.inspector-test').hostNodes()).toHaveLength(1);
      expect(wrapper.find('.components-panel__body.inspector-test.is-opened').hostNodes()).toHaveLength(0);
      expect(wrapper.find('a').hostNodes()).toHaveLength(0);
    },
  },
  {
    createComponents: () => <Fragment>
      <Fill>
        <ToolbarButton
          title={'ToolbarButton1'}
          className={'test1'}
          isDisabled={true}
        />
      </Fill>
    </Fragment>,
    createToolbarDropdown: setting => InspectorComponent(Slot, Object.assign({}, setting, {
      inspectorSettings: {className: 'inspector-test'},
    }), {}, 0),
    callback: (wrapper) => {
      expect(wrapper.find('.components-panel__body.inspector-test').hostNodes()).toHaveLength(0);
      expect(wrapper.find('.test1').hostNodes()).toHaveLength(0);
    },
  },
]);
