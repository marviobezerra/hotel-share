import React from 'react';
import { Route, Link } from 'react-router-dom';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Email, Lock } from '@material-ui/icons/';
import { Button } from '@material-ui/core/';


export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
  }

  login(e) {
    e.preventDefault();
    axios.post('/api/login', this.state)
    .then(resp => {
      if(resp.data.success) this.props.login();
    })
  }

  render() {
    return (
      <div className="login-box">
        <TextField
          label="Email"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email />
              </InputAdornment>
            ),
          }}
          onChange={(e) => this.setState({username: e.target.value})}
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
        <Button variant="contained" onClick={(e) => this.login(e)} style={{margin: 20, backgroundColor: "orange", color: "white"}}>Login</Button>
      </div>
    );
  }
}
