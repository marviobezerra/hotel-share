import axios from 'axios';
import React from 'react';
import Button from '@material-ui/core/Button';
import { Avatar } from '@material-ui/core/';

export default class Bookings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
    this.props.updateAppBarStyle({height: 60, background: "#009090"});
    // this.getRequests();
    // setInterval(() => this.getRequests(), 5000);
  }
  // getRequests() {
  //   let requestsGuest = axios.get('/api/requestsGuest');
  //   let requestsHost = axios.get('/api/requestsHost');
  //   Promise.all([requestsGuest, requestsHost])
  //   .then(res => {
  //     if(res[0].data.success && res[1].data.success) {
  //       console.log(res[0].data, res[1].data);
  //       this.setState({requestsGuest: res[0].data.requests, requestsHost: res[1].data.requests})
  //     }
  //   });
  // }
  render() {
    console.log(this.state);
    return (
      <div className="requests-container">
        {/* {this.state.requests.length ? this.state.requests.map(req => <span>{req.XXXXXX}</span>) : null} */}
        Requests page
      </div>
    )
  }
}
