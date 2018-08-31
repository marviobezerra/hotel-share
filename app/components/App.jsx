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
import NewListing from './NewListing.jsx';

const clientUrl = "http://localhost:8080";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false,
      show: false,
      style: {height: 0, backgroundColor: 'white'},
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
  updateAppBarStyle(newStyle){
    this.setState({style: newStyle})
  }
  renderMain() {
    return <LandingPage auth={this.state.auth} show={this.state.show}
      hide={() => this.hide()} login={() => this.login()} updateCity={(val) => this.updateCity(val)}
      updateTo={() => updateTo()} updateFrom={() => updateFrom()} city={this.state.city}
      updateGuests={() => updateGuests()} updateHeight={(val) => this.updateHeight(val)}
    />;
  }
  render() {
    return (
      <div style={{height: "100%"}}>
        <Appbar auth={this.state.auth} show={() => this.show()} logout={() => this.logout()} style={this.state.style}/>
        <Route exact path="/listings" render={() => <ListingsPage to={this.state.to} from={this.state.from} guests={this.state.guests}
           city={this.state.city} updateAppBarStyle={(val) => this.updateAppBarStyle(val)} />}/>
        <Route exact path="/" render={() => this.renderMain()} />
        <Route exact path="/login" render={() => this.renderMain()} />
        <Route exact path="/signup" render={() => this.renderMain()} />
        <Route exact path="/newlisting" render={() => <NewListing updateAppBarStyle={(val) => this.updateAppBarStyle(val)} />} />
        <Route exact path="/myaccount" render={() => <MyAccount updateAppBarStyle={(val) => this.updateAppBarStyle(val)} />} />
      </div>
    )
  }
}
