import React from 'react';
import axios from 'axios';
import { TextField, Button, Radio, RadioGroup, FormControl, FormControlLabel, Select, MenuItem, InputLabel, InputAdornment } from '@material-ui/core/';
import { DateRange, Group, AttachMoney } from '@material-ui/icons/';

export default class MyAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: {},
      user: {},
    }
  }
  componentDidMount() {
    this.props.updateAppBarStyle({height: 60, background: "#009090"});
    axios.get('/api/account')
    .then(res => {
      if(res.data.success) this.setState({user: res.data.user, input: res.data.user});
    })
    .catch(err => console.log("err", err));
  }
//only send what was edited and with name udpate with differences from input and user

  render() {
    return (
      <div className="new-listing-container">
        <div className="new-listing-box">
          <TextField
            label="First Name"
            style={{width: "100%"}}
            onChange={(e) => this.setState({...this.state.input, name: {...this.state.input.name, fname: e.target.value}})}
            value={this.state.input.name.fname}
          />
        </div>
      </div>
    );
  }
}
