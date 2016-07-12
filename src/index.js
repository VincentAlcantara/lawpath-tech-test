import React from 'react';
import {render} from 'react-dom';

var AddressForm = React.createClass({
  getInitialState: function() {
    return {address: '', suburb: '', postcode: ''};
  },
  handleAddressChange: function(e) {
    this.setState({address: e.target.value});
  },
  getSuburbs: function(typeahead) {
  	$.ajax({
  		type: "GET",
  		headers: "AUTH-KEY: 872608e3-4530-4c6a-a369-052accb03ca8",
  		dataType: 'jsonp',
  		url: "https://digitalapi.auspost.com.au/postcode/search.json?q=" + typeahead,
  		success: function(response) {
  			this.handleSuburbChange(response) //
  		}.bind(this),
  		error: function(xhr, status, err) {
    		console.error(this.props.url, status, err.toString());
  		}.bind(this)
  	});
  },
  handleSuburbChange: function(e) {
  	// check if the suburb is at least 3 characters before calling api
  	// if no match set an error
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
        <div>You've won a prize.  Enter your details to win</div>
        <input
          type="text"
          placeholder="Enter address"
          value={this.state.address}
          onChange={this.handleAddressChange}
        />
        <input
          type="text"
          placeholder="Enter suburb"
          value={this.state.suburb}
          onChange={this.handleSuburbChange}
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
