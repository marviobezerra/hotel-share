import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class SignUpPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: '',
      lname: '',
      username: '',
      password: '',
      phone: '',
      birthday: '',
      gender: '',
    }
  }

  signup(e) {
    e.preventDefault();
    console.log('STATE:', this.state);
    axios.post('/api/register', this.state)
    .then(resp => {
      if(resp.data.success) this.props.app.setState({auth: true});
    });
  }

  render() {
    return (
      <div className="login-box">
        <div className="center-vertically">
          <img className="login-icon"
            src="https://images.vexels.com/media/users/3/130187/isolated/lists/5e8d2205ecc8cde3235581fc5ecfa430-email-outline-icon.png" />
          <input type="email" className="login-input" placeholder="Email"
            onChange={(e) => this.setState({username: e.target.value})}/>
        </div>
        <div className="center-vertically">
          <img className="login-icon"
            src="https://images.vexels.com/media/users/3/132074/isolated/preview/0117cb0129593faa02646a8277ca80e3-security-lock-icon-by-vexels.png" />
          <input type="text" className="login-input" placeholder="First Name"
            onChange={(e) => this.setState({fname: e.target.value})}/>
        </div>
        <div className="center-vertically">
          <img className="login-icon"
            src="https://images.vexels.com/media/users/3/132074/isolated/preview/0117cb0129593faa02646a8277ca80e3-security-lock-icon-by-vexels.png" />
          <input type="text" className="login-input" placeholder="Last Name"
            onChange={(e) => this.setState({lname: e.target.value})}/>
        </div>
        <div className="center-vertically">
          <img className="login-icon"
            src="https://images.vexels.com/media/users/3/132074/isolated/preview/0117cb0129593faa02646a8277ca80e3-security-lock-icon-by-vexels.png" />
          <input type="password" className="login-input" placeholder="Password"
            onChange={(e) => this.setState({password: e.target.value})}/>
        </div>
        <div>
          <input type="date" placeholder="Birthdate" onChange={(e) => this.setState({birthday: e.target.value})}/>
          <input type="number" placeholder="Phone" onChange={(e) => this.setState({phone: e.target.value})}/>
          <input type="text" placeholder="Gender" onChange={(e) => this.setState({gender: e.target.value})}/>
        </div>
        <button className="login-btn" onClick={(e) => this.signup(e)}>Sign Up</button>
        <Link to="/login">Already have an account? Login</Link>
      </div>
    );
  }
}
