var React = require('react');
var ReactDOM = require('react-dom');
var axios = require('axios');
var Typeahead = require('react-typeahead').Typeahead;

export default class AddressForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      address: '',
      suburb: '',
      suburbs: []
    }
    this.getSuburbs = this.getSuburbs.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleSuburbChange = this.handleSuburbChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleAddressChange(e) {
    this.setState({address: e.target.value});
  }
  getSuburbs(e) {
    // check if the suburb is at least 3 characters before calling api
    // if no match set an error
    var addrQueryStr = e.target.value;
    if (addrQueryStr.length > 2) {
      axios
      .get(`http://localhost:3000/address?q=${addrQueryStr}`) // we need to do this for CORS
      .then((resp) => {
        var localities = resp.data.localities.locality;
        if (localities && localities.length > 0) {
          console.log('localities.length:', localities.length);
          var suburbs = resp.data.localities.locality.map(function(elem){
            return elem.location + ', ' + elem.postcode + ', ' + elem.state;
          });
          console.log('suburbs:', suburbs);
          this.setState({suburbs: suburbs});
        }
      })
    }
  }
  
  handleSuburbChange(e) {
    this.setState({suburb: e});
  }
  
  handleSubmit(e) {  
    // e.preventDefault();
    var address = this.state.address.trim();
    var suburb = this.state.suburb.trim();
    if (!suburb || !address) {
      return; // Exit if there's not a valid address or suburb
    }
    window.alert('You entered the following address:' + address + ', ' + suburb);
    this.setState({address: '', suburb: '', suburbs: []});
  }

  render () {
    return (
      <form className="AddressForm" onSubmit={this.handleSubmit}>
        <label>Please enter your address
        </label>
        <input
          type="text"
          placeholder="Enter street address"
          value={this.state.address}
          onChange={this.handleAddressChange}
        />
        <Typeahead
          onChange={this.getSuburbs}
          options={this.state.suburbs}
          placeholder="Enter suburb or postcode"
          value={this.state.suburb}
          onOptionSelected={this.handleSuburbChange}
        />
        <button type="submit">Send</button>
      </form>
    );
  }
}

// ReactDOM.render(<AddressForm/>, document.getElementById('app'));
