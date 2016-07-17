var jsdom = require('mocha-jsdom');
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
const AddressForm = require('../src/components/AddressForm.js').default;


describe('Address Search Mocha Tests', function () {
 
  jsdom()
 
  it('has document', function () {
    var div = document.createElement('div');
    expect(div.nodeName).eql('DIV');
    
  })

  it('has an AddressForm', function () {
    jsdom()

  	var AddressFormComponent = TestUtils.renderIntoDocument(<AddressForm/>);
    expect(AddressFormComponent).to.not.be.undefined;
  })

  it('AddressForm is made up of an two input fields', function () {
  	var AddressFormComponent = TestUtils.renderIntoDocument(<AddressForm/>);
  	var inputFields = TestUtils.scryRenderedDOMComponentsWithTag(AddressFormComponent, 'input');
  	
    expect(inputFields.length).to.eql(2);
  });
 
});

