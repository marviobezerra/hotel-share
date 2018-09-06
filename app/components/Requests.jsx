import axios from 'axios';
import React from 'react';
import Button from '@material-ui/core/Button';
import { Avatar } from '@material-ui/core/';
import { AccountCircle } from '@material-ui/icons/';


export default class Bookings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reqGuest: [],
      reqHost: [],
    }
  }

  componentDidMount() {
    this.props.updateAppBarStyle({height: 60, background: "#009090"});
    this.getRequests();
    // setInterval(() => this.getRequests(), 5000);
  }
  getRequests() {
    // axios.get('/api/requestsGuest')
    // .then(res => {
    //   if(res.data.success) {
    //     this.setState({requestsGuest: res.data.requests});
    //   }
    // })
    // axios.get('/api/requestsHost')
    // .then(res => {
    //   if(res.data.success) {
    //     this.setState({requestsHost: res.data.requests});
    //   }
    // })
    let requestsGuest = axios.get('/api/requestsGuest');
    let requestsHost = axios.get('/api/requestsHost');
    Promise.all([requestsGuest, requestsHost])
    .then(res => {
      if(res[0].data.success && res[1].data.success) {
        console.log("got requests", res[0].data, res[1].data);
        this.setState({reqGuest: res[0].data.requests, reqHost: res[1].data.requests}, () => {
          console.log(this.state.reqGuest[0]);
        })
      }
    });
  }
  render() {
    let { reqGuest, reqHost } = this.state;
    return (
      <div className="requests-container">
        <div className="requests-guest-box">
          <p style={{fontSize: 24, textDecoration: "underline"}}>GUEST</p>
          {reqGuest.map(reqGuest =>
          <div className="reqGuest-line">
            <div className="host-info">
              {reqGuest.host.imgUrl ? <Avatar src={reqGuest.host.imgUrl} style={{marginRight: 10, marginBottom: 10}}/> : <AccountCircle style={{height: 100, width: 100}}/>}
              <span className="host-center">{reqGuest.host.name.fname} {reqGuest.host.name.lname}</span>
            </div>
            <div className="hotel-info">
              <div className="hotel-info-city">
                <span style={{fontSize: 20, fontWeight: "bold", marginRight: 30}}>{reqGuest.listing.hotel.city}</span>
                <span style={{fontSize: 14}}>{reqGuest.from} - {reqGuest.to}</span>
              </div>
              <span className="hotel-name">{reqGuest.listing.hotel.name}</span>
            </div>
            <Button style={{background: "#009090", color: "white", marginTop: 10, dis}}>Cancel</Button>
          </div>)}
        </div>
        <div className="requests-host-box">
          <p style={{fontSize: 24, textDecoration: "underline"}}>HOST</p>
        </div>



      </div>
    )
  }
}
