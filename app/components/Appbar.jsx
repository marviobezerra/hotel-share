import React from 'react';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Route, Link } from 'react-router-dom';
import LoginPage from './LoginPage.jsx';
import { Avatar } from '@material-ui/core/';


export default class Appbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null
    }
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
              <Button>
                <Link to="/" style={{color: "white", textDecoration: "none"}}>
                  <Avatar style={{backgroundColor: '#fff', color: '#3f51b5'}}>H</Avatar>
                </Link>
              </Button>
                {this.props.auth ?  (<div style={{flex: 1, display: "flex", justifyContent: "flex-end"}}>
                  <Button
                    aria-owns={this.state.anchorEl ? 'simple-menu' : null}
                    aria-haspopup="true"
                    onClick={(e) => this.handleClick(e)}
                    style={{
                      backgroundColor: '#009090',
                      color: '#fff'
                    }}
                    >
                      User
                    </Button>
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
