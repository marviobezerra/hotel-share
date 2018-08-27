import React from 'react';
import { Route, Link } from 'react-router-dom';
import SearchBox from './SearchBox.jsx';
import LoginPage from './LoginPage.jsx';
import Appbar from './AppBar.jsx';
import BottomNavigation from './BottomNavigation.jsx';
import Slideshow from './Slideshow.jsx'
//import ListingsPage from './ListingsPage.jsx'
import MediaControlCard from './ListingsPage.jsx'

const clientUrl = "http://localhost:8080";

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
      return (
        <div>
          <Route path="/" component={MediaControlCard} />
          {/*<Route path="/" component={Slideshow} />
          <div id="main-content">
            <Route exact path="/" component={Appbar} />
            <Route exact path="/" component={SearchBox} />
            <Route exact path="/" component={BottomNavigation} />
          </div>*/}
        </div>
      )
  }
}
