import React from 'react';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Route, Link, Redirect } from 'react-router-dom';
import LoginPage from './LoginPage.jsx';
import { Avatar } from '@material-ui/core/';
import axios from 'axios';
import { Notifications, Chat, CardTravel, Gavel } from '@material-ui/icons/';


export default class Appbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      anchorEl2: null,
      avatarImg: '',
      notifications: [],
      message: [],
      request: [],
      accept: [],
      reject: [],
      cancel: [],
      other: [],
    }
  }

  componentDidMount() {
    this.getNotifications();
    setInterval(() => this.getNotifications(), 5000);
  }

  getNotifications() {
    axios.get('/api/notifications')
    .then(res => {
      if(res.data.success) {
        let allNotifications = res.data.notifications.slice();
        let unreadNotifications = allNotifications.filter(notification => !notification.read);
        this.setState({notifications: unreadNotifications}, () => {
          let notifications = this.state.notifications.slice();
          this.setState({
            message: notifications.filter(notification => notification.category === "Message"),
            request: notifications.filter(notification => notification.category === "Request"),
            accept: notifications.filter(notification => notification.category === "Accept"),
            reject: notifications.filter(notification => notification.category === "Reject"),
            cancel: notifications.filter(notification => notification.category === "Cancel"),
            other: notifications.filter(notification => notification.category === "Other")
          });
        })
      }
    })
  }

  handleClick(event){
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose() {
    this.setState({ anchorEl: null });
  };
  link(category) {
    if(category === 'Message') return '/messages';
    //write other types of notifications redirects later!!!
    if(category === 'Request') return '/requests';
  }
  readNotification(id) {
    this.setState({anchorEl2: null});
    axios.post('/api/readNotification', {notification: id})
    .then(res => {
      console.log(res.data.success);
      this.getNotifications();
    })
  }
  readMessages() {
    for(let i = 0; i < this.state.message.length; i++) {
      axios.post('/api/readNotification', {notification: this.state.message[i]._id})
      .then(res => {
        this.getNotifications();
      })
    }
  }
  notificationLink(category) {
    console.log(category);
    if (category === 'Message') return '/messages';
    if (category === 'Request' || category === 'Reject') return '/requests';
    if (category === 'Accept' || category === 'Cancel') return '/bookings';
    return '/main';
  }
  render() {
    return (
      <div>
        <AppBar position="static" style={this.props.style}>
          <Toolbar style={{display: "flex"}}>
            <div style={{display: "flex", width: "100%"}}>
              <Link to="/" onClick={() => this.props.updateAppBarStyle({height: 0})} style={{textDecoration: "none"}}><Avatar style={{backgroundColor: '#fff', color: '#3f51b5'}}>H</Avatar></Link>
                {this.props.auth ?  (<div style={{flex: 1, display: "flex", justifyContent: "flex-end"}}>
                    <Avatar style={{background: 'rgba(0, 0, 0, 0.08)', overflow: 'initial', marginRight: 15}}>
                      <Link to='/messages' onClick={() => this.readMessages()}>
                        <Chat style={{color: 'white', position: 'relative'}}/>
                        {this.state.message.length? <Avatar style={{background: 'red', position: 'absolute', top: -5, right: -5, height: 20, width: 20, fontSize: 12}}>{this.state.message.length}</Avatar> : null}
                      </Link>
                    </Avatar>
                    <Avatar style={{background: 'rgba(0, 0, 0, 0.08)', overflow: 'initial', marginRight: 15}}><Link to='/bookings'><CardTravel style={{color: 'white', position: 'relative'}}/></Link></Avatar>
                    <Avatar style={{background: 'rgba(0, 0, 0, 0.08)', overflow: 'initial', marginRight: 15}}><Link to='/requests'><Gavel style={{color: 'white', position: 'relative'}}/></Link></Avatar>
                    <Avatar style={{background: 'rgba(0, 0, 0, 0.08)', overflow: 'initial', marginRight: 15}}
                      aria-owns={this.state.anchorEl2 ? 'notification-menu' : null}
                      aria-haspopup="true"
                      onClick={(e) => this.setState({ anchorEl2: e.currentTarget })}>
                      <Notifications style={{position: 'relative'}} />
                      {this.state.notifications.length? <Avatar style={{background: 'red', position: 'absolute', top: -5, right: -5, height: 20, width: 20, fontSize: 12}}>{this.state.notifications.length}</Avatar> : null}
                    </Avatar>
                    <Menu id="notification-menu" anchorEl={this.state.anchorEl2} open={Boolean(this.state.anchorEl2)}
                      onClose={() => this.setState({anchorEl2: null})}>
                      {this.state.notifications.map(notification =>
                      <Link to={this.notificationLink(notification.category)} onClick={() => this.readNotification(notification._id)}>
                        <MenuItem style={{fontSize: 12}}>
                        <span>{notification.message}</span>
                        {/* onClick={() => this.readNotification(notification._id)} */}
                        </MenuItem>
                      </Link>)}
                    </Menu>
                    {this.props.app.state.user.imgUrl ? <Avatar
                                              aria-owns={this.state.anchorEl ? 'simple-menu' : null}
                                              aria-haspopup="true"
                                              onClick={(e) => this.handleClick(e)}
                                              src={this.props.app.state.user.imgUrl} /> :
                                            <Button
                                              aria-owns={this.state.anchorEl ? 'simple-menu' : null}
                                              aria-haspopup="true"
                                              onClick={(e) => this.handleClick(e)}
                                              style={{backgroundColor: "rgba(0, 0, 0, 0.08)", color: "#fff"}}>User</Button>}
                  <Menu
                    id="simple-menu"
                    anchorEl={this.state.anchorEl}
                    open={Boolean(this.state.anchorEl)}
                    onClose={() => this.handleClose()}
                  >
                    <MenuItem onClick={() => this.handleClose()}><Link to="/account" style={{color: "rgba(0, 0, 0, 0.87)", textDecoration: "none"}}>Account</Link></MenuItem>
                    <MenuItem onClick={() => this.handleClose()}><Link to="/newlisting" style={{color: "rgba(0, 0, 0, 0.87)", textDecoration: "none"}}>List New</Link></MenuItem>
                    <MenuItem onClick={() => {
                      this.setState({
                        anchorEl: null,
                        anchorEl2: null,
                        avatarImg: '',
                        notifications: [],
                        message: [],
                        request: [],
                        accept: [],
                        reject: [],
                        cancel: [],
                        other: [],
                      });
                      this.props.logout();
                    }}>Logout</MenuItem>
                  </Menu></div>) :
                  (<div style={{flex: 1, display: "flex", justifyContent: "flex-end"}}>
                    <Link onClick={this.props.show()} to="/main/login" style={{textDecoration: "none"}}>
                      <Button color="default" style={{color: "white"}}>Login</Button>
                    </Link>
                    <Link onClick={this.props.show()} to="/main/signup" style={{textDecoration: "none"}}>
                      <Button color="default" style={{color: "white"}}>Sign up</Button>
                    </Link>
                </div>)}
              </div>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}
