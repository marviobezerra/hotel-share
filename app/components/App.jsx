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
      auth: false,
      show: false,
      height: '0px',
      city: '',
      to: '',
      from: '',
      guests: ''
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
  updateCity(val) {
    console.log(val)
    this.setState({city: val})
  }
  updateTo(e) {
    this.setState({to: e.target.value})
  }
  updateFrom(e) {
    this.setState({from: e.target.value})
  }
  updateGuests(e) {
    this.setState({guests: e.target.value})
  }
  updateHeight(newHeight){
    this.setState({height: newHeight})
  }
  render() {
    return (
      <div style={{height: "100%"}}>
        <Appbar auth={this.state.auth} show={() => this.show()} logout={() => this.logout()}
          height={this.state.height}
        />

        <Route exact path="/listings" render={() => <ListingsPage city={this.state.city} updateHeight={(val) => this.updateHeight(val)}
        />}/>

        <Route path="/" render={() => <LandingPage auth={this.state.auth} show={this.state.show}
          hide={() => this.hide()} login={() => this.login()} updateCity={(val) => this.updateCity(val)}
          updateTo={() => updateTo()} updateFrom={() => updateFrom()} city={this.state.city}
          updateGuests={() => updateGuests()} updateHeight={(val) => this.updateHeight(val)}
        />} />
      </div>
    )
  }
}
