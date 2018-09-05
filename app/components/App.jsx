import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Appbar from './AppBar.jsx';
import LandingPage from './LandingPage.jsx';
import ListingsPage from './ListingsPage.jsx';
import NewListing from './NewListing.jsx';
import MyAccount from './MyAccount.jsx';
import MyMessages from './MyMessages.jsx';

import axios from 'axios';

const clientUrl = "http://localhost:8080";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false,
      show: false,
      style: {height: 0},
      city: '',
      to: '',
      from: '',
      guests: '',
      user: {},
      clickedConvo: false,
    }
  }
  componentDidMount() {
    axios.get('/api/account')
    .then(res => {
      if(res.data.success) this.setState({auth: true, user: res.data.user});
    });
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
    axios.post('/api/logout')
  }
  updateUser(user) {
    this.setState({user: user});
  }
  updateCity(val) {
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
      updateGuests={() => updateGuests()}
      updateUser={(user) => this.updateUser(user)}
    />;
  }
  render() {
    return (
      <div style={{height: "100%"}}>
        <Appbar auth={this.state.auth} show={() => this.show()} logout={() => this.logout()} style={this.state.style} avatarImg={this.state.user.imgUrl} updateAppBarStyle={(val) => this.updateAppBarStyle(val)} app={this}/>
        <Route exact path="/listings" render={() => <ListingsPage avatarImg={this.state.user.imgUrl} city={this.state.city} updateAppBarStyle={(val) => this.updateAppBarStyle(val)} />}/>
        <Route exact path="/" render={() => this.renderMain()} />
        <Route exact path="/login" render={() => this.renderMain()} />
        <Route exact path="/signup" render={() => this.renderMain()} />
        <Route exact path="/newlisting" render={() => <NewListing updateAppBarStyle={(val) => this.updateAppBarStyle(val)} />} />
        {this.state.auth ? <Route exact path="/myaccount" render={() => <MyAccount updateAppBarStyle={(val) => this.updateAppBarStyle(val)} updateUser={(user) => this.updateUser(user)} />} /> : <Redirect to="/" />}
        {this.state.auth ? <Route exact path="/mymessages" render={() => <MyMessages updateAppBarStyle={(val) => this.updateAppBarStyle(val)} updateUser={(user) => this.updateUser(user)} user={this.state.user} app={this}/>} /> : <Redirect to="/" />}
        {this.state.auth ? <Route exact path="/myrequests" render={() => <MyRequests updateAppBarStyle={(val) => this.updateAppBarStyle(val)} updateUser={(user) => this.updateUser(user)} />} /> : <Redirect to="/" />}

      </div>
    )
  }
}
