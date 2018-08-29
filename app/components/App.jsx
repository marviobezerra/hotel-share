import React from 'react';
import { Route, Link } from 'react-router-dom';
import SearchBox from './SearchBox.jsx';
import LoginPage from './LoginPage.jsx';
import Appbar from './AppBar.jsx';
import BottomNavigation from './BottomNavigation.jsx';
//import ListingsPage from './ListingsPage.jsx'
import MediaControlCard from './ListingsPage.jsx'
import LandingPage from './LandingPage.jsx';
import ListingsPage from './ListingsPage.jsx';

const clientUrl = "http://localhost:8080";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false
    }
  }

  render() {
      return (
        <div style={{height: "100%"}}>
          <Appbar app={this}/>
          <Route exact path="/listings" render={() => <ListingsPage app={this} />} />
          <Route path="/" render={() => <LandingPage app={this} />} />
        </div>
      )
  }
}
