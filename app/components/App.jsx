import React from 'react';
import { Route, Link } from 'react-router-dom';
import SearchBox from './SearchBox.jsx';
import LoginPage from './LoginPage.jsx';
import SignUpPage from './SignUpPage.jsx';

const clientUrl = "http://localhost:8080";

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
      return (
        <div id="main-content">
          <Link to="/login" style={{fontSize: 30}}>Login</Link>
          <Route exact path="/" component={SearchBox} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/signup" component={SignUpPage} />
        </div>
      )
  }
}
