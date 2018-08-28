import React from 'react';
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom';
import SearchBox from './SearchBox.jsx';
import LoginPage from './LoginPage.jsx';
import SignUpPage from './SignupPage.jsx';
import axios from 'axios';
const serverUrl = "http://localhost:3000";

export default class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      city: 0,
      url: 'https://static01.nyt.com/images/2012/05/06/nyregion/06BIG_SPAN/BIG-superJumbo.jpg'
    }
  }

  componentDidMount() {
    axios.get(serverUrl + '/cities')
    .then(resp => {
      this.setState({cities: resp.data.cities}, () => {
        setInterval(() => {
          this.setState({
            city: (this.state.city + 1)%this.state.cities.length,
            url: this.state.cities[(this.state.city + 1)%this.state.cities.length].img,
          })}, 5000);
      });
    })
  }

  render() {
    return (
      <div style={{backgroundImage: `url(${this.state.url})`, height: "100%", backgroundSize: "100%"}} className="landing-page-container">
        <Route exact path="/" component={SearchBox} />
        <Route exact path="/login" render={() => this.props.app.state.auth ? <Redirect to="/" /> : <LoginPage app={this.props.app} />} />
        <Route exact path="/signup" render={() => this.props.app.state.auth ? <Redirect to="/" /> : <SignUpPage app={this.props.app} />} />
      </div>
    )
  }
}
