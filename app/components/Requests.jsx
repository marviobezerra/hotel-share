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
    setInterval(() => this.getRequests(), 10000);
  }
  getRequests() {
    let requestsGuest = axios.get('/api/requestsGuest');
    let requestsHost = axios.get('/api/requestsHost');
    Promise.all([requestsGuest, requestsHost])
    .then(res => {
      if(res[0].data.success && res[1].data.success) {
        this.setState({reqGuest: res[0].data.requests, reqHost: res[1].data.requests}, () => {
          console.log(this.state.reqGuest[0]);
        })
      }
    });
  }
  cancelReqGuest(id, i) {
    axios.post('/api/cancelRequest', {request: id})
    .then((res) => {
      if (res.data.success) this.setState({
        reqGuest: [...this.state.reqGuest.slice(0, i), ...this.state.reqGuest.slice(i+1, this.state.reqGuest.length)],
      });
    })
  }
  rejectReq(id, i) {
    axios.post('/api/reject', {request: id})
    .then((res) => {
      if (res.data.success) this.setState({
        reqHost: [...this.state.reqHost.slice(0, i), ...this.state.reqHost.slice(i+1, this.state.reqHost.length)],
      });
    })
  }
  acceptReq(id, i) {
    axios.post('/api/accept', {request: id})
    .then((res) => {
      if (res.data.success) this.setState({
        reqHost: [...this.state.reqHost.slice(0, i), ...this.state.reqHost.slice(i+1, this.state.reqHost.length)],
      });
    })
  }
  render() {
    let { reqGuest, reqHost } = this.state;
    console.log(this.state.reqHost);
    return (
      <div className="requests-container">
        <div className="requests-guest-box">
          <p style={{fontSize: 24, textDecoration: "underline"}}>GUEST</p>
          {reqGuest.map((reqGuest, i) =>
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
            <Button style={{background: "#009090", color: "white", marginTop: 10}} onClick={() => this.cancelReqGuest(reqGuest._id, i)}>Cancel</Button>
          </div>)}
        </div>
        <div className="requests-host-box">
          <p style={{fontSize: 24, textDecoration: "underline"}}>HOST</p>
          {reqHost.map((reqHost, i) =>
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
            <Button style={{background: "#009090", color: "white", marginTop: 10}} onClick={() => this.acceptReq(reqHost._id, i)}>Accept</Button>
            <Button style={{background: "#009090", color: "white", marginTop: 10}} onClick={() => this.rejectReq(reqHost._id, i)}>Reject</Button>
          </div>)}
        </div>



      </div>
    )
  }
}
