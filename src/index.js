import React from 'react';
import {render} from 'react-dom';

var AddressForm = React.createClass({
  getInitialState: function() {
    return {author: '', suburb: ''};
  },
  handleAuthorChange: function(e) {
    this.setState({author: e.target.value});
  },
  handleSuburbChange: function(e) {
    this.setState({suburb: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var author = this.state.author.trim();
    var suburb = this.state.suburb.trim();
    if (!suburb || !author) {
      return;
    }
    this.props.onAddressSubmit({author: author, suburb: suburb});
    this.setState({author: '', suburb: ''});
  },
  render: function() {
    return (
      <form className="AddressForm" onSubmit={this.handleSubmit}>
        <input
          type="suburb"
          placeholder="Your name"
          value={this.state.author}
          onChange={this.handleAuthorChange}
        />
        <input
          type="Suburb"
          placeholder="Enter suburb"
          value={this.state.suburb}
          onChange={this.handleSuburbChange}
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
