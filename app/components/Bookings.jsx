import axios from 'axios';
import React from 'react';
import _ from 'underscore';
import { Avatar, Typography, Divider, List, ListItem, Button, ListItemText } from '@material-ui/core/';
import { People } from '@material-ui/icons/';

export default class Bookings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookingsHost: [],
      bookingsGuest: [],
    }
  }

  renderGuest(bg) {
    return (
      <List>
        <ListItem>
          <Typography variant="subheader" align='left' color='inherit'> {bg.from} - {bg.to} </Typography>
        </ListItem>
        <ListItem>
          <Avatar alt="" src={bg.host.imgUrl} />
          <ListItemText primary={`${bg.guest.name.fname} ${bg.guest.name.lname}`} />
          <ListItemText style={{color:'green'}} primary={`${'$' + bg.price} `} />
        </ListItem>
        <Divider light />
    </List>
  )
  }

  renderHost(bg) {
    return (
      <List>
        <ListItem>
          <Typography variant="subheader" align='left' color='inherit'> {bg.from} - {bg.to} </Typography>
        </ListItem>
        <ListItem>
          <Avatar alt="" src={bg.hotel.images[0]} />
          <Typography variant="subheader" align='left' color='inherit'> {bg.hotel.name} </Typography>
        </ListItem>
        <Divider light />
    </List>
    )
  }

  orderBookings(bgs) {
    return _.groupBy(bgs, (booking) => (booking.hotel.city))
  }

  componentDidMount() {
    this.props.updateAppBarStyle({height: 60, background: "#009090"});
    this.getBookings();
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
    const orderedBks = this.orderBookings(this.state.bookingsGuest);
    return (
      <div className="bookings-container">
        <div className="guest-box">
          <Typography variant="title" gutterBottom='true' align='center' color='inherit' style={{weight: 'bold', textDecoration: 'underline', fontSize: '1.75rem'}}> Host </Typography>
          {this.state.bookingsGuest.length ? Object.keys(orderedBks).map((city) =>
            <div>
              <List>
                <ListItem>
                  <Typography variant="title" align='left' color='inherit' style={{fontSize: '1.55rem'}}>{city}</Typography>
                </ListItem>
                {orderedBks[city].map(bg => this.renderGuest(bg))}
              </List>
            </div>
          ): null}
        </div>
        <div className="host-box">
          <Typography variant="title" gutterBottom='true' align='center' color='inherit' style={{weight: 'bold', textDecoration: 'underline', fontSize: '1.75rem'}}> Guest </Typography>
          {this.state.bookingsGuest.length ? Object.keys(orderedBks).map((city) =>
            <div>
              <List>
                <ListItem>
                  <Typography variant="title" align='left' color='inherit' style={{fontSize: '1.55rem'}}>{city}</Typography>
                </ListItem>
                {orderedBks[city].map(bg => this.renderHost(bg))}
              </List>
              <Divider light />
            </div>
          ): null}
        </div>
      </div>
    )
  }
}
