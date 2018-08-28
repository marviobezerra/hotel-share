import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import SearchOptions from './SearchOptions.jsx';

export default class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {city: ''};
  }
  render() {
    return (
      <div className="main-search-box" onClick={() => this.props.showOptions()}>
        <div className="center-vertically">
          <img className="main-search-icon"
            src="https://cdn1.iconfinder.com/data/icons/hawcons/32/698627-icon-111-search-512.png" />
          <input className="main-search" placeholder="San Francisco"
            onChange={(e) => this.setState({city: e.target.value})}/>
        </div>
        {this.props.options ? <SearchOptions city={this.state.city}/> : null}
      </div>
    );
  }
}
