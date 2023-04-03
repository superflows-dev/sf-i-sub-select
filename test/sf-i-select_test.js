/**
 * @license
 * Copyright 2022 Superflows.dev
 * SPDX-License-Identifier: MIT
 */
import { SfISelect } from '../sf-i-select.js';
// import { stub } from 'sinon';
// import {fixture, assert} from '@open-wc/testing';
import { assert } from '@open-wc/testing';
// import {html} from 'lit/static-html.js';
//const TIMEOUT = 2000;
suite('sf-i-select > left menu', () => {
    test('is defined', () => {
        const el = document.createElement('sf-i-select');
        assert.instanceOf(el, SfISelect);
    });
});
//# sourceMappingURL=sf-i-select_test.js.map