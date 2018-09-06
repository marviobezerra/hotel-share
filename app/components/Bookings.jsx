import axios from 'axios';
import React from 'react';
import Button from '@material-ui/core/Button';
import { Avatar } from '@material-ui/core/';

export default class Bookings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookingsHost: [],
      bookingsGuest: [],
    }
  }

  componentDidMount() {
    this.props.updateAppBarStyle({height: 60, background: "#009090"});
    this.getBookings();
    // setInterval(() => this.getBookings(), 5000);
  }
  getBookings() {
    let bookingsGuest = axios.get('/api/bookingsGuest');
    let bookingsHost = axios.get('/api/bookingsHost');
    Promise.all([bookingsGuest, bookingsHost])
    .then(res => {
      if(res[0].data.success && res[1].data.success) {
        console.log(res[0].data, res[1].data);
        this.setState({bookingsGuest: res[0].data.bookings, bookingsHost: res[1].data.bookings})
      }
    });
  }
  render() {
    console.log(this.state);
    return (
      <div className="bookings-container">
        <div className="guest-box">
          {this.state.bookingsHost.length ? this.state.bookingsHost.map(bg => <span>{bg.from} {bg.to} {bg.guests} {bg.price} {bg.paid} {bg.room} {bg.host} {bg.guest}</span>) : null}
        </div>
        <div className="host-box">
          {this.state.bookingsHost.length ? this.state.bookingsHost.map(bg => <span>{bg.from} {bg.to} {bg.guests} {bg.price} {bg.paid} {bg.room} {bg.host} {bg.guest}</span>) : null}
        </div>
      </div>
    )
  }
}
