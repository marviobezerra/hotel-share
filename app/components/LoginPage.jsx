import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';

export default class LoginPage extends React.Component {
  render() {
    return (
      <div className="main-search-box">
        <div className="center-vertically">
          <img className="login-icon"
            src="https://vignette.wikia.nocookie.net/joke-battles/images/4/49/UserIcon.png/revision/latest/scale-to-width-down/480?cb=20161202233401" />
          <input className="username-input" placeholder="Username"
            onChange={(e) => this.setState({username: e.target.value})}/>
        </div>
        <div className="center-vertically">
          <img className="login-icon"
            src="https://images.vexels.com/media/users/3/132074/isolated/preview/0117cb0129593faa02646a8277ca80e3-security-lock-icon-by-vexels.png" />
          <input className="username-input" placeholder="Password"
            onChange={(e) => this.setState({password: e.target.value})}/>
        </div>

      </div>
    );
  }
}
