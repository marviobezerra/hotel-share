import React from 'react';
import axios from 'axios';
import { TextField, Button, Radio, RadioGroup, FormControl, FormControlLabel, Select, MenuItem, InputLabel } from '@material-ui/core/';

export default class NewListing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      city: '',
      hotel: '',
      guests: '',
      from: '',
      to: '',
      price: '',
      booked: '',
    }
  }

  submitListing() {
    // axios.post('/api/list', this.state)
    // .then(res => {
    //   console.log(res)
    // })
    // .catch(err => {
    //   console.log(err)}
    // )
    console.log(this.state);
  }

  render() {
    console.log(this.state);
    return (
      <div className="landing-page-container">
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
          <FormControl style={{minWidth: 200}}>
            <InputLabel>Where are you going?</InputLabel>
            <Select value={this.state.city} onChange={(e) => this.setState({city: e.target.value})}>
              <MenuItem value="San Francisco">San Francisco</MenuItem>
              <MenuItem value="Chicago">Chicago</MenuItem>
              <MenuItem value="Seattle">Seattle</MenuItem>
            </Select>
          </FormControl>
          {this.state.city ?
            (<div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <TextField label="Hotel" onChange={(e) => this.setState({hotel: e.target.value})} />
            <TextField label="Guests" onChange={(e) => this.setState({guests: e.target.value})} />
            <TextField label="From" onChange={(e) => this.setState({from: e.target.value})} />
            <TextField label="To" onChange={(e) => this.setState({to: e.target.value})} />
            <TextField label="Price" onChange={(e) => this.setState({price: e.target.value})} />
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="Booked"
                value={this.state.booked}
                onChange={(e) => this.setState({booked: e.target.value})}
                style={{display: "flex", flexDirection: "row"}}>
                <FormControlLabel value="Yes" control={<Radio color="default"/>} label="Yes" />
                <FormControlLabel value="No" control={<Radio color="default"/>} label="No" />
              </RadioGroup>
            </FormControl>
            <Button variant="contained" onClick={() => this.submitListing()}>Submit Listing</Button></div>)
            : null}
        </div>
      </div>
    );
  }
}
