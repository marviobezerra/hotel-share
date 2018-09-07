import axios from 'axios';
import React from 'react';
import _ from 'underscore';
import GoogleMapReact from 'google-map-react';
import { Avatar, Typography, Divider, List, ListItem, Button,
   ListItemText, ListItemIcon, IconButton, Dialog, DialogContent} from '@material-ui/core/';
import { People, LocationOn} from '@material-ui/icons/';

const AnyReactComponent = ({ text }) => <div><LocationOn style={{color:'red'}}/></div>;

export default class Bookings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookingsHost: [],
      bookingsGuest: [],
      openMap: false,
      lat: null,
      long: null,
      booking: {}
    }
  }

  handleMapClose() {
    this.setState({
      openMap: false,
      lat: null,
      long: null,
      booking: {}
    })
  }

  handleOpenMap(latitude, longitude, bkg) {
    this.setState({
      openMap: true,
      lat: latitude,
      long: longitude,
      booking: bkg
    })
  }

  /* setAddress() {
    geocoder.reverseGeocode( this.state.lat, this.state.long, function ( err, data ) {
        // do something with data
        console.log(data)
    });
  }*/

  renderGuest(bg) {
    return (

      <div className="reqGuest-line">
        <div className="host-info">
          {bg.host.imgUrl ? <Avatar src={bg.host.imgUrl} style={{marginRight: 10, marginBottom: 10}}/> : <AccountCircle style={{height: 100, width: 100}}/>}
          <span className="host-center">{bg.host.name.fname} {bg.host.name.lname}</span>
        </div>
        <div className="hotel-info">
          <div className="hotel-info-city">
            <span style={{fontSize: 20, fontWeight: "bold", marginRight: 30}}>{bg.listing.hotel.city}</span>
            <span style={{fontSize: 14}}>{bg.from} - {bg.to}</span>
          </div>
          <span className="hotel-name">{bg.listing.hotel.name}</span>
        </div>
        <IconButton onClick={() => this.handleOpenMap(bg.hotel.location.lat, bg.hotel.location.long, bg)}>
          <LocationOn />
        </IconButton>
      </div>)


      {/*<List>
        <ListItem>
          <Typography variant="subheader" align='left' color='inherit'> {bg.from} - {bg.to} </Typography>
        </ListItem>
        <ListItem>
          <Avatar alt="" src={bg.hotel.images[0]} />
          <ListItemText primary={`${bg.hotel.name}`} />
          <IconButton onClick={() => this.handleOpenMap(bg.hotel.location.lat, bg.hotel.location.long, bg)}>
            <LocationOn />
          </IconButton>
        </ListItem>
        <ListItem>
          <Avatar alt="" src={bg.host.imgUrl} />
          <ListItemText primary={`${bg.host.name.fname} ${bg.host.name.lname}`} />
          <ListItemText style={{color:'green'}} primary={`${'$' + bg.price} `} />
        </ListItem>
        <Divider light />
    </List> */}
  )
  }

  renderHost(bg) {
    return (
      <div className="reqGuest-line">
        <div className="host-info">
          {reqHost.guest.imgUrl ? <Avatar src={reqHost.guest.imgUrl} style={{marginRight: 10, marginBottom: 10}}/> : <AccountCircle style={{height: 100, width: 100}}/>}
          <span className="host-center">{reqHost.guest.name.fname} {reqHost.guest.name.lname}</span>
        </div>
        <div className="hotel-info">
          <div className="hotel-info-city">
            <span style={{fontSize: 20, fontWeight: "bold", marginRight: 30}}>{reqHost.listing.hotel.city}</span>
            <span style={{fontSize: 14}}>{reqHost.from} - {reqHost.to}</span>
          </div>
          <span className="hotel-name">{reqHost.listing.hotel.name}</span>
        </div>
        <IconButton onClick={() => this.handleOpenMap(bg.hotel.location.lat, bg.hotel.location.long, bg)}>
          <LocationOn />
        </IconButton>
      </div>)
      {/*<List>
        <ListItem>
          <Typography variant="subheader" align='left' color='inherit'> {bg.from} - {bg.to} </Typography>
        </ListItem>
        <ListItem>
          <Avatar alt="" src={bg.hotel.images[0]} />
          <ListItemText primary={`${bg.hotel.name}`} />
          <IconButton onClick={() => this.handleOpenMap(bg.hotel.location.lat, bg.hotel.location.long, bg)}>
            <LocationOn />
          </IconButton>
        </ListItem>
        <ListItem>
          <Avatar alt="" src={bg.guest.imgUrl} />
          <ListItemText primary={`${bg.guest.name.fname} ${bg.guest.name.lname}`} />
          <ListItemText style={{color:'green'}} primary={`${'$' + bg.price} `} />
        </ListItem>
        <Divider light />
    </List>*/}
    )
  }

  orderBookings(bgs) {
    return _.groupBy(bgs, (booking) => (booking.hotel.city))
  }

  componentDidMount() {
    this.props.updateAppBarStyle({height: 60, background: "#009090"});
    this.getBookings();
    setInterval(() => this.getBookings(), 10000);
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
    const orderedBksGuest = this.orderBookings(this.state.bookingsGuest);
    const orderedBksHost = this.orderBookings(this.state.bookingsHost);

    return (
      <div className="bookings-container">
        <Dialog
          open={this.state.openMap}
          onClose={() => this.handleMapClose()}
          scroll={this.state.scroll}
          aria-labelledby="scroll-dialog-title"
        >
          <DialogContent style={{ height: '75vh', width: '75vh'}}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: 'Google Key'}}
              defaultCenter={{lat: this.state.lat, lng: this.state.long}}
              defaultZoom={14}
            >
              <AnyReactComponent
                lat={this.state.lat}
                lng={this.state.long}
              />
            </GoogleMapReact>
          </DialogContent>
          </Dialog>
        <div className="bookings-guest-box">
          <p style={{fontSize: 24, textDecoration: "underline"}}>GUEST</p>
          {this.state.bookingsGuest.length ? Object.keys(orderedBksGuest).map((city) =>
            <div>
              <List>
                <ListItem>
                  <Typography variant="title" align='left' color='inherit' style={{fontSize: '1.55rem'}}>{city}</Typography>
                </ListItem>
                {orderedBksGuest[city].map(bg => this.renderGuest(bg))}
              </List>
            </div>
          ): null}
        </div>
        <div className="host-box">
          <Typography variant="headline" gutterBottom='true' align='center' color='inherit' style={{weight: 'bold', textDecoration: 'underline', fontSize: '1.75rem'}}> Host </Typography>
          {this.state.bookingsHost.length ? Object.keys(orderedBksHost).map((city) =>
            <div>
              <List>
                <ListItem>
                  <Typography variant="title" align='left' color='inherit' style={{fontSize: '1.55rem'}}>{city}</Typography>
                </ListItem>
                {orderedBksHost[city].map(bg => this.renderHost(bg))}
              </List>
            </div>
          ): null}
        </div>
      </div>
    )
  }
}
