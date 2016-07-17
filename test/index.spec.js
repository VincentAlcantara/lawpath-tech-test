var jsdom = require('mocha-jsdom');
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
var AddressForm = require('../src/index').default;

describe('mocha tests', function () {
 
  jsdom()
 
  it('has document', function () {
    var div = document.createElement('div')
    expect(div.nodeName).eql('DIV')
  })

  it('has an AddressForm', function () {
  	var AddressFormInsert = TestUtils.renderIntoDocument(
      <AddressForm/>
    );
  })

 
})