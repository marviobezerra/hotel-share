import React from 'react';
import { Route, Link } from 'react-router-dom';
import SearchBox from './SearchBox.jsx';
import LoginPage from './LoginPage.jsx';
import Appbar from './AppBar.jsx';
import BottomNavigation from './BottomNavigation.jsx';
//import ListingsPage from './ListingsPage.jsx'
import MediaControlCard from './ListingsPage.jsx'
import LandingPage from './LandingPage.jsx';

const clientUrl = "http://localhost:8080";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false,
      show: false,
    }
  }
  show() {
    if (!this.state.show) this.setState({show: true});
  }
  hide() {
    if (this.state.show) this.setState({show: false});
  }
  login() {
    this.setState({auth: true, show: false});
  }
  logout() {
    this.setState({auth: false, show: false});
  }
  render() {
    return (
      <div style={{height: "100%"}}>
        <Appbar auth={this.state.auth} show={() => this.show()} logout={() => this.logout()}/>
        <Route path="/" render={() => <LandingPage auth={this.state.auth} show={this.state.show} hide={() => this.hide()} login={() => this.login()}/>} />
      </div>
    )
  }
}
