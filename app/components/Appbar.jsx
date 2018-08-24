import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/DeleteForever';

export default class Appbar extends React.Component {
  render() {
    return (
      <div className="root">
       <Toolbar>
         <IconButton className="menuButton" color="primary" aria-label="Menu">
           <MenuIcon />
         </IconButton>
         <Typography variant="title" color="secondary" className="flex">
           Hotel-Share
         </Typography>
         <Button color="default">Login</Button>
         <Button color="inherit">Register</Button>
       </Toolbar>
      </div>
    )
  }
}
