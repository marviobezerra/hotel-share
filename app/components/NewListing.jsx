import React from 'react';
import axios from 'axios';
import { TextField, Button, Radio, RadioGroup, FormControl, FormControlLabel, Select, MenuItem, InputLabel, InputAdornment } from '@material-ui/core/';
import { DateRange, Group, AttachMoney } from '@material-ui/icons/';

export default class NewListing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      hotel: '',
      guests: '',
      from: '',
      to: '',
      price: '',
      hotelDoc: {},
      cityHotels: [],
    }
  }
  componentDidMount() {
    this.props.updateAppBarStyle({height: 60, background: "#009090"});
  }

  getCityHotels(e) {
    this.setState({city: e.target.value});
    axios.get(`/api/hotels/${e.target.value}`)
    .then(res => this.setState({cityHotels: res.data.hotels}));
  }

  submitListing() {
    axios.post('/api/list', this.state)
    .then(res => {
      console.log("success", res.data.success)
    })
  }

  render() {
    return (
      <div className="new-listing-container">
        <div className="new-listing-box">
          <FormControl style={{width: "100%", minWidth: 200}}>
            <InputLabel>Where are you going?</InputLabel>
            <Select value={this.state.city} onChange={(e) => this.getCityHotels(e)}>
              <MenuItem value="San Francisco">San Francisco</MenuItem>
              <MenuItem value="Chicago">Chicago</MenuItem>
              <MenuItem value="Seattle">Seattle</MenuItem>
            </Select>
          </FormControl>
          {this.state.cityHotels.length ?
            (<div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <FormControl  style={{width: "100%"}}>
              <InputLabel>Hotel</InputLabel>
              <Select value={this.state.hotelDoc} onChange={(e) => this.setState({hotelDoc: e.target.value, hotel: e.target.value._id})}>
                {this.state.cityHotels.map(hotelDoc => <MenuItem value={hotelDoc}>{hotelDoc.name}</MenuItem>)}
              </Select>
            </FormControl>
            <TextField
              label="Guests"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Group />
                  </InputAdornment>
                ),
              }}
              type="number"
              style={{width: "100%"}}
              onChange={(e) => this.setState({guests: e.target.value})}
            />
            <TextField
              label="From"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DateRange />
                  </InputAdornment>
                ),
              }}
              type="date"
              style={{width: "100%"}}
              onChange={(e) => this.setState({from: e.target.value})}
            />
            <TextField
              label="To"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DateRange />
                  </InputAdornment>
                ),
              }}
              type="date"
              style={{width: "100%"}}
              onChange={(e) => this.setState({to: e.target.value})}
            />
            <TextField
              label="Price"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachMoney />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => this.setState({price: e.target.value})}
            />
            <Button variant="contained" onClick={() => this.submitListing()}>Submit Listing</Button></div>)
            : null}
        </div>
      </div>
    );
  }
}
