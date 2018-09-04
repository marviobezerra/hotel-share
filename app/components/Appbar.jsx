import React from 'react';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Route, Link } from 'react-router-dom';
import LoginPage from './LoginPage.jsx';
import { Avatar } from '@material-ui/core/';
import axios from 'axios';
import Notifications from '@material-ui/icons/Notifications';


export default class Appbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      avatarImg: '',
      notifications: [],
    }
  }

  componentDidMount() {
    axios.get('/api/notifications')
    .then(res => {
      if(res.data.success) this.setState({notifications: res.data.notifications})
    })
    setInterval(() => {
      axios.get('/api/notifications')
      .then(res => {
        if(res.data.success) this.setState({notifications: res.data.notifications})
      })
    }, 5000);
  }

  handleClick(event){
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose() {
    this.setState({ anchorEl: null });
  };

  render() {
    return (
      <div>
        <AppBar position="static" style={this.props.style}>
          <Toolbar style={{display: "flex"}}>
            <div style={{display: "flex", width: "100%"}}>
              <Link to="/" onClick={() => this.props.updateAppBarStyle({height: 0})} style={{textDecoration: "none"}}><Avatar style={{backgroundColor: "rgba(0, 0, 0, 0.08)"}}>H</Avatar></Link>
                {this.props.auth ?  (<div style={{flex: 1, display: "flex", justifyContent: "flex-end"}}>
                    <Avatar style={{background: 'rgba(0, 0, 0, 0.08)', overflow: 'initial', marginRight: 15}}>
                      <Notifications style={{position: 'relative'}} />
                      {this.state.notifications.length? <Avatar style={{background: 'red', position: 'absolute', top: -5, right: -5, height: 20, width: 20, fontSize: 12}}>{this.state.notifications.length}</Avatar> : null}
                    </Avatar>
                    {this.props.avatarImg ? <Avatar
                                              aria-owns={this.state.anchorEl ? 'simple-menu' : null}
                                              aria-haspopup="true"
                                              onClick={(e) => this.handleClick(e)}
                                              src={this.props.avatarImg} /> :
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
                    <MenuItem onClick={() => this.handleClose()}><Link to="/myaccount" style={{color: "rgba(0, 0, 0, 0.87)", textDecoration: "none"}}>My account</Link></MenuItem>
                    <MenuItem onClick={() => this.handleClose()}><Link to="/newlisting" style={{color: "rgba(0, 0, 0, 0.87)", textDecoration: "none"}}>List New</Link></MenuItem>
                    <MenuItem onClick={() => this.props.logout()}>Logout</MenuItem>
                  </Menu></div>) :
                  (<div style={{flex: 1, display: "flex", justifyContent: "flex-end"}}>
                    <Button color="default">
                      <Link onClick={this.props.show()} to="/login" style={{color: "white", textDecoration: "none"}}>Login</Link>
                    </Button>
                    <Button color="default">
                      <Link onClick={this.props.show()} to="/signup" style={{color: "white", textDecoration: "none"}}>Sign Up</Link>
                    </Button>
                </div>)}
              </div>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}
