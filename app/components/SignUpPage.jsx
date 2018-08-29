import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { AccountCircle, Email, Phone, Lock, Cake, CropOriginal} from '@material-ui/icons/';
import { Button, Radio, RadioGroup, FormControl, FormControlLabel, Avatar } from '@material-ui/core/';

export default class SignUpPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: '',
      lname: '',
      email: '',
      password: '',
      phone: '',
      birthday: '',
      gender: '',
    }
  }

  signup(e) {
    e.preventDefault();
    axios.post('/api/register', this.state)
    .then(resp => {
      if(resp.data.success) this.props.hide();
    });
  }

  render() {
    return (
      <div className="login-box">
        {this.state.fname && this.state.lname ? <Avatar style={{backgroundColor: "orange"}}>{this.state.fname[0] + this.state.lname[0]}</Avatar> : null}
        <TextField
          label="First name"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
          onChange={(e) => this.setState({fname: e.target.value})}
        />
        <TextField
          label="Last name"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
          onChange={(e) => this.setState({lname: e.target.value})}
        />
        <TextField
          label="Email"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email />
              </InputAdornment>
            ),
          }}
          onChange={(e) => this.setState({email: e.target.value})}
        />
        <TextField
          label="Password"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
          }}
          type="password"
          onChange={(e) => this.setState({password: e.target.value})}
        />
        <TextField
          label="Phone"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Phone />
              </InputAdornment>
            ),
          }}
          onChange={(e) => this.setState({phone: e.target.value})}
        />
        <TextField
          label="Birthday"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Cake />
              </InputAdornment>
            ),
          }}
          type="date"
          onChange={(e) => this.setState({birthday: e.target.value})}
          style={{width: "95%"}}
        />
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="Gender"
            value={this.state.gender}
            onChange={(e) => this.setState({gender: e.target.value})}
            style={{display: "flex", flexDirection: "row"}}
          >
            <FormControlLabel value="Female" control={<Radio color="default"/>} label="Female" />
            <FormControlLabel value="Male" control={<Radio color="default"/>} label="Male" />
          </RadioGroup>
        </FormControl>
        <Button variant="contained" onClick={(e) => this.signup(e)} style={{margin: 20, backgroundColor: "orange", color: "white"}}>Sign Up</Button>
      </div>
    );
  }
}
