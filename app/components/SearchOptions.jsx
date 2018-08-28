import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
var axios = require('axios');

const serverUrl = "http://localhost:3000";

class SearchOptions extends React.Component {
  constructor(props) {
    super(props);
  }

  submitData() {
    let { from, to, guests } = this.state;
    axios.post(serverUrl + '/search', { city: this.props.city, from, to, guests })
    .then(res => {
      console.log(res)}
    )
    .catch(err => {
      console.log(err)}
    )
  }

  render() {
    return (
      <div className="main-search-options">
        <div className="main-search-row">
          <input type="date" className="main-search-from"
          onChange={(e) => this.setState({from: e.target.value})}/>
          <input type="date" className="main-search-to"
          onChange={(e) => this.setState({to: e.target.value})}/>
        </div>
        <div className="main-search-row">
          <input type="number" className="main-search-guests" placeholder="Guests"
          onChange={(e) => this.setState({guests: e.target.value})}/>
          <button onClick={() => this.submitData()}>Search</button>
        </div>
      </div>
    );
  }
}

export default SearchOptions;
