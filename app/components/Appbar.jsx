import React from 'react';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Route, Link } from 'react-router-dom';
import LoginPage from './LoginPage.jsx';


export default class Appbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }


  render() {
    return (
      <div>
        <AppBar position="static" style={{background: "white", height: "0px"}}>
          <Toolbar style={{display: "flex"}}>
            <div style={{display: "flex", width: "100%"}}>
              <div style={{flex: 1}}>
                <img src="http://icons.iconarchive.com/icons/dtafalonso/modern-xp/512/ModernXP-73-Globe-icon.png" style={{height: 50}}/>
              </div>
                {this.props.app.state.auth ?  (<div style={{flex: 1, display: "flex", justifyContent: "flex-end"}}><Button color="default" onClick={() => this.props.app.setState({auth: false})}>Logout</Button></div>) :
                (<div style={{flex: 1, display: "flex", justifyContent: "flex-end"}}>
                  <Button color="default">
                    <Link to="/login" style={{color: "white", textDecoration: "none"}}>Login</Link>
                  </Button><Button color="default"><Link to="/signup" style={{color: "white", textDecoration: "none"}}>Sign Up</Link></Button>
                </div>)}
              </div>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}
