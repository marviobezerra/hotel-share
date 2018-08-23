import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import SearchBox from './SearchBox.jsx';
import LoginPage from './LoginPage.jsx';

const clientUrl = "http://localhost:8080";

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
      return (
        <div id="main-content">
          {/* Hey there! I am the App component */}
          <Link to="/login" style={{fontSize: 30}}>Login</Link>
          <Route path="/login" component={LoginPage} />
          <Route exact path="/" component={SearchBox} />
          {/* {teamMembers.map(member => <Link to={"/" + member.name}>{member.name}</Link>)}
          <Route path="/:ta" component={P2Selection}></Route> */}
          </div>
      )
  }
}
