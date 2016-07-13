import React from 'react';
import {render} from 'react-dom';
import axios from 'axios'
var Typeahead = require('react-typeahead').Typeahead;


var AddressForm = React.createClass({
  getInitialState: function() {
    return {address: '', suburb: '', postcode: ''};
  },
  handleAddressChange: function(e) {
    this.setState({address: e.target.value});
  },
  getSuburbs: function(addrQueryStr) {
  	 axios
      .get(
        `https://digitalapi.auspost.com.au/postcode/search.json?q=${addrQueryStr}`,
        {
          headers: {
            'auth-key': '872608e3-4530-4c6a-a369-052accb03ca8',
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      )
      .then(function(res) {
        console.log(res)
      })
      .catch(function(err) {
        console.log(err)
      })
  },
  handleSuburbChange: function(e) {
  	// check if the suburb is at least 3 characters before calling api
  	// if no match set an error
    this.getSuburbs(e.target.value);
    this.setState({suburb: e.target.value});
  },
  handlePostCode: function(e) {
  	// check if the postcode is at least 3 characters before calling api
  	// if no match set an error
    this.setState({postcode: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var address = this.state.address.trim();
    var suburb = this.state.suburb.trim();
    if (!suburb || !address) {
      return;
    }
    this.props.onAddressSubmit({address: address, suburb: suburb});
    this.setState({address: '', suburb: ''});
  },
  render: function() {
    return (
      <form className="AddressForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Enter address"
          value={this.state.address}
          onChange={this.handleAddressChange}
        />
        <Typeahead
          onChange={this.handleSuburbChange}
          options={['CABRAMATTA, 2166, NSW', 'CAMPBELLTOWN, 2560, NSW', 'CAMPERDOWN, 2050, NSW','CAMBRIDGE, 4822, QLD', 'CAMBRIDGE, 7170, TAS']}
          placeholder="Enter suburb"
        />
         <input
          type="text"
          placeholder="Enter postcode"
          value={this.state.postcode}
          onChange={this.handlePostcodeChange}
        />
        <input type="submit" value="Send" />
      </form>
    );
  }
});

class App extends React.Component {
  render () {
    return <AddressForm />;
  }
}

render(<App/>, document.getElementById('app'));
