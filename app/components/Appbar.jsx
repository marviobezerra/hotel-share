import React from 'react';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

export default class Appbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false,
      anchorEl: null
    }
  }


  render() {
    return (
      <div>
        <AppBar position="static" style={{background: "white"}}>
          <Toolbar style={{display: "flex"}}>
            {!this.state.auth ?
              (<div style={{display: "flex", width: "100%"}}>
                <div style={{flex: 1}}>
                  <img src="http://icons.iconarchive.com/icons/dtafalonso/modern-xp/512/ModernXP-73-Globe-icon.png" style={{height: 50}}/>
                </div>
                <div style={{flex: 1, display: "flex", justifyContent: "flex-end"}}>
                  <Button color="default" onClick={() => this.setState({auth: true})}>Login</Button><Button color="default">Register</Button>
                </div>
              </div>) :
              (<div style={{display: "flex", width: "100%"}}>
                <div style={{flex: 1}}>
                  <img src="http://icons.iconarchive.com/icons/dtafalonso/modern-xp/512/ModernXP-73-Globe-icon.png" style={{height: 50}}/>
                </div>
                <div style={{flex: 1, display: "flex", justifyContent: "flex-end"}}>
                  <Button color="default" onClick={() => this.setState({auth: false})}>Logout</Button>
                </div>
              </div>)
            }
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}
