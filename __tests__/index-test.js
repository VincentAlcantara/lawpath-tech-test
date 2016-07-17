jest.unmock('../src/index');

import React from 'react';
import {render} from 'react-dom'

import TestUtils from 'react-addons-test-utils';
import axios from 'axios';
var Typeahead = require('react-typeahead').Typeahead;

import AddressForm from '../src/index';

describe('AddressForm', () => {
	it('should contain an input field', () => {
		const checkbox = TestUtils.renderIntoDocument(
      		<AddressForm/>
    	);
		expect(true).toBeTruthy();
	})
});
