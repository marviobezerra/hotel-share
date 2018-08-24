import React from 'react';
import { Link } from 'react-router-dom';

export default class LoginPage extends React.Component {
  render() {
    return (
      <div className="login-box">
        <div className="center-vertically">
          <img className="login-icon"
            src="https://images.vexels.com/media/users/3/130187/isolated/lists/5e8d2205ecc8cde3235581fc5ecfa430-email-outline-icon.png" />
          <input tpe="email" className="login-input" placeholder="Email"
            onChange={(e) => this.setState({username: e.target.value})}/>
        </div>
        <div className="center-vertically">
          <img className="login-icon"
            src="https://images.vexels.com/media/users/3/132074/isolated/preview/0117cb0129593faa02646a8277ca80e3-security-lock-icon-by-vexels.png" />
          <input type="password" className="login-input" placeholder="Password"
            onChange={(e) => this.setState({password: e.target.value})}/>
        </div>
        <button className="login-btn">Login</button>
        <Link to="/signup">Don't have an account? Sign Up</Link>
      </div>
    );
  }
}
