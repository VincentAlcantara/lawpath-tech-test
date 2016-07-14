var React = require('react');
var ReactDOM = require('react-dom');
var axios = require('axios');
var Typeahead = require('react-typeahead').Typeahead;


var AddressForm = React.createClass({
  getInitialState: function() {
    return {address: '', suburb: ''};
  },
  handleAddressChange: function(e) {
    this.setState({address: e.target.value});
  },
  getSuburbs: function(addrQueryStr) {
    if (addrQueryStr.length > 2) {
      axios
      .get(`http://localhost:3000/address?q=${addrQueryStr}`)
      .then((resp) => {
        var localities = resp.data.localities.locality;
        console.log('localities', localities);
        var suburbs;
        console.log('localities.length', localities.length);
        if (localities.length > 0) {
          suburbs = resp.data.localities.locality.map(function(elem){
            return elem.location + ', ' + elem.postcode + ', ' + elem.state;
          });
        } else {
          suburbs = {};
        }
        console.log('suburbs', suburbs);
        this.setState({suburbs: suburbs});
      })
    }
  },
  handleSuburbChange: function(e) {
  	// check if the suburb is at least 3 characters before calling api
  	// if no match set an error
    this.getSuburbs(e.target.value);
    this.setState({suburb: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var address = this.state.address.trim();
    var suburb = this.state.suburb.trim();
    // if (!suburb || !address) {
    //   return;
    // }
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
          options={this.state.suburbs}
          placeholder="Enter suburb"
        />
        <button type="submit">Send</button>
      </form>
    );
  }
});

class App extends React.Component {
  render () {
    return <AddressForm />;
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
