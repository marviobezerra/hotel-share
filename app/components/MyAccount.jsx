import React from 'react';
import axios from 'axios';
import EditProfile from './EditProfile.jsx';
import { TextField, Button, Radio, RadioGroup, FormControl, FormControlLabel, Select, MenuItem, InputLabel, InputAdornment, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core/';
import { AccountCircle, Email, Phone, Lock, Cake, InsertPhoto } from '@material-ui/icons/';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

export default class MyAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {name: {fname: '', lname: ''}, email: '', phone: '', birthday: '', gender: '', imgUrl: '', bio: '', languages: []},
      edit: false,
    }
  }

  componentDidMount() {
    this.props.updateAppBarStyle({height: 60, background: "#009090"});
    axios.get('/api/account')
    .then(res => {
      if(res.data.success) {
        this.setState({user: Object.assign({}, res.data.user)});
      }
    })
  }

  render() {
    return (
      <div style={{height: '100%'}}>
        {this.state.edit ? <EditProfile updateAppBarStyle={(val) => this.props.updateAppBarStyle(val)} updateUser={(user) => this.props.updateUser(user)} myAccount={this}/> :
        <div className="myaccount-container">
          <div className="myaccount-box">
            <img src={this.state.user.imgUrl} style={{height: 100, width: 100}}/>
            <table style={{width: "100%"}}>
              <tbody>
                <tr><td className="title">Name</td><td className="info">{this.state.user.name.fname} {this.state.user.name.lname}</td></tr>
                <tr><td className="title">Email</td><td className="info">{this.state.user.email}</td></tr>
                <tr><td className="title">Phone</td><td className="info">{this.state.user.phone}</td></tr>
                <tr><td className="title">Birthday</td><td className="info">{this.state.user.birthday}</td></tr>
                <tr><td className="title">Gender</td><td className="info">{this.state.user.gender}</td></tr>
                <tr><td className="title">Bio</td><td className="info">{this.state.user.bio}</td></tr>
                <tr><td className="title">Languages</td><td className="info"><ul>{this.state.user.languages.map(lang => <li>{lang}</li>)}</ul></td></tr>
              </tbody>
            </table>
            <Button onClick={() => this.setState({edit: true})} style={{background: "#009090", color: "white", textTransform: "capitalize"}}>Edit Profile</Button>
          </div>
        </div>
        }
      </div>
    )
  }
}
