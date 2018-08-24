import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import SearchBox from './SearchBox.jsx';
import LoginPage from './LoginPage.jsx';
import Appbar from './AppBar.jsx';
import BottomNavigation from './BottomNavigation.jsx';
import Slideshow from './Slideshow.jsx'

const clientUrl = "http://localhost:8080";

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
      return (
        <div>
          <Route path="/" component={Slideshow} />
          <div id="main-content">
            {/* Hey there! I am the App component */}
            <Route exact path="/" component={Appbar} />
            <Route exact path="/" component={SearchBox} />
            <Route exact path="/" component={BottomNavigation} />
            {/* {teamMembers.map(member => <Link to={"/" + member.name}>{member.name}</Link>)}
            <Route path="/:ta" component={P2Selection}></Route> */}
            </div>
        </div>
      )
  }
}
