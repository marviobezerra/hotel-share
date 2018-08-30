import React from 'react';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Route, Link } from 'react-router-dom';
import LoginPage from './LoginPage.jsx';


export default class Appbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null
    }
  }

  handleClick(event){
    console.log(this)
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose() {
    this.setState({ anchorEl: null });
  };

  render() {
    return (
      <div>
        <AppBar position="static" style={this.props.mainPage ? {height: 0, background: 'white'} : null}>
          <Toolbar style={{display: "flex"}}>
            <div style={{display: "flex", width: "100%"}}>
              <div style={{flex: 1}}>
                <img src="http://icons.iconarchive.com/icons/dtafalonso/modern-xp/512/ModernXP-73-Globe-icon.png" style={{height: 50}}/>
              </div>
                {this.props.auth ?  (<div style={{flex: 1, display: "flex", justifyContent: "flex-end"}}><Button
                  aria-owns={this.state.anchorEl ? 'simple-menu' : null}
                  aria-haspopup="true"
                  onClick={(e) => this.handleClick(e)}
                >
                  User
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={this.state.anchorEl}
                  open={Boolean(this.state.anchorEl)}
                  onClose={() => this.handleClose()}
                >
                  <MenuItem onClick={() => this.handleClose()}>My account</MenuItem>
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
