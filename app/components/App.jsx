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
  render() {
      return (
        <div style={{height: "100%"}}>
          <Appbar />
          <Route path="/" component={MediaControlCard} />
        </div>
      )
  }
}
