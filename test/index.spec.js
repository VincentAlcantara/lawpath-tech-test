var jsdom = require('mocha-jsdom');
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import ReactTestUtils from 'react-addons-test-utils';

const AddressForm = require('../src/components/AddressForm.js').default;


describe('Address Search Mocha Tests', function () {
  jsdom();  // This is required to create a 'document'

  it('has an AddressForm', function () {
  	var AddressFormComponent = TestUtils.renderIntoDocument(<AddressForm/>);
    expect(AddressFormComponent).to.not.be.undefined;
  })

  it('AddressForm is made up of an two input fields', function () {
  	var AddressFormComponent = TestUtils.renderIntoDocument(<AddressForm/>);
  	var inputFields = TestUtils.scryRenderedDOMComponentsWithTag(AddressFormComponent, 'input');
  	
    expect(inputFields.length).to.eql(2);
  });
 
  it('AddressForm is made up of a typeahead field', function () {
    var AddressFormComponent = TestUtils.renderIntoDocument(<AddressForm/>);
    var suburbField = TestUtils.findRenderedDOMComponentWithClass(AddressFormComponent, 'typeahead');
    
    expect(suburbField).to.not.be.undefined;
  });
  
  it('The typeahead will not appear if only two characters are entered', function () {
    var AddressFormComponent = TestUtils.renderIntoDocument(<AddressForm/>);
    var suburbField = TestUtils.findRenderedDOMComponentWithClass(AddressFormComponent, 'typeahead');
    
    suburbField.value = 'UL';
    ReactTestUtils.Simulate.change(suburbField);
    var suburbOptions = TestUtils.scryRenderedDOMComponentsWithClass(AddressFormComponent, 'typeahead-selector');
    expect(suburbOptions.length).to.eql(0);
  });

});

