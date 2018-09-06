import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';

import Appbar from './AppBar.jsx';
import LandingPage from './LandingPage.jsx';
import ListingsPage from './ListingsPage.jsx';
import NewListing from './NewListing.jsx';
import Account from './Account.jsx';
import Messages from './Messages.jsx';
import Bookings from './Bookings.jsx';


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
  updateTo(val) {
    this.setState({to: val})
  }
  updateFrom(val) {
    this.setState({from: val})
  }
  updateGuests(val) {
    this.setState({guests: val})
  }
  updateAppBarStyle(newStyle){
    this.setState({style: newStyle})
  }
  renderMain() {
    return <LandingPage auth={this.state.auth} show={this.state.show}
      hide={() => this.hide()} login={() => this.login()} updateCity={(val) => this.updateCity(val)}
      updateTo={(val) => this.updateTo(val)} updateFrom={(val) => this.updateFrom(val)} city={this.state.city}
      from={this.state.from} to={this.state.to} guests={this.state.guests}
      updateGuests={(val) => this.updateGuests(val)}
      updateUser={(user) => this.updateUser(user)}
    />;
  }
  render() {
    console.log(this.state.user._id);
    return (
      <div style={{height: "100%"}}>
        <Appbar auth={this.state.auth} show={() => this.show()} logout={() => this.logout()} style={this.state.style} updateAppBarStyle={(val) => this.updateAppBarStyle(val)} app={this}/>
        <Route exact path="/listings" render={() => <ListingsPage avatarImg={this.state.user.imgUrl} city={this.state.city} from={this.state.from} to={this.state.to} guests={this.state.guests} updateAppBarStyle={(val) => this.updateAppBarStyle(val)} />}/>
        <Route exact path="/" render={() => <Redirect to='/main' />} />
        <Route path="/main" render={() => this.renderMain()} />
        <Route exact path="/newlisting" render={() => <NewListing updateAppBarStyle={(val) => this.updateAppBarStyle(val)} />} />
        {this.state.auth ? <Route exact path="/account" render={() => <Account updateAppBarStyle={(val) => this.updateAppBarStyle(val)} updateUser={(user) => this.updateUser(user)} />} /> : <Redirect to="/main" />}
        {this.state.auth ? <Route exact path="/messages" render={() => <Messages updateAppBarStyle={(val) => this.updateAppBarStyle(val)} updateUser={(user) => this.updateUser(user)} user={this.state.user} app={this}/>} /> : <Redirect to="/" />}
        {this.state.auth ? <Route exact path="/requests" render={() => <Requests updateAppBarStyle={(val) => this.updateAppBarStyle(val)} updateUser={(user) => this.updateUser(user)} />} /> : <Redirect to="/main" />}
        {this.state.auth ? <Route exact path="/bookings" render={() => <Bookings updateAppBarStyle={(val) => this.updateAppBarStyle(val)} updateUser={(user) => this.updateUser(user)} />} /> : <Redirect to="/main" />}
      </div>
    )
  }
}
