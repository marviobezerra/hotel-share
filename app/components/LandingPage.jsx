import React from 'react';
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom';
import SearchBox from './SearchBox.jsx';
import LoginPage from './LoginPage.jsx';
import SignUpPage from './SignupPage.jsx';
import axios from 'axios';

export default class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      city: 0,
      url: 'https://static01.nyt.com/images/2012/05/06/nyregion/06BIG_SPAN/BIG-superJumbo.jpg',
      options: false,
    }
  }

  componentDidMount() {
    axios.get('/api/cities')
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

  showOptions() {
    if (!this.state.options) this.setState({options: true});
  }

  hide(e) {
    if (e.target.className === 'landing-page-container') {
      if (this.state.options) this.setState({options: false});
      if (this.props.show) this.props.hide();
    }
  }

  render() {
    return (
      <div style={{backgroundImage: `url(${this.state.url})`, height: "100%", backgroundSize: "100%"}} className="landing-page-container"
        onClick={(e) => this.hide(e)}>
        <Route exact path="/" render={() => <SearchBox options={this.state.options} showOptions={() => this.showOptions()}/>} />
        <Route exact path="/login" render={() => this.props.auth || !this.props.show ? <Redirect to="/" /> : <LoginPage login={() => this.props.login()} />} />
        <Route exact path="/signup" render={() => this.props.auth || !this.props.show ? <Redirect to="/" /> : <SignUpPage hide={() => this.props.hide()}/>} />
      </div>
    )
  }
}
