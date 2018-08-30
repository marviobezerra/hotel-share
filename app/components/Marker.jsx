import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const styles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: 25,
  height: 25,
  color: '#fd5c63',
  border: '2 solid #fff',
  borderRadius: '100%',
  userSelect: 'none',
  transform: 'translate(-50%, -50%)',
}

export default class Marker extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      badgeColor : 'primary'
    }
  }

  componentDidMount() {
    let currentColor = this.state.badgeColor
    console.log('Props')
    console.log(this.props)
    if(this.props.selectedHotel){
      if(this.props.selectedHotel.text !== this.props.hotel.name){
        this.setState({
          badgeColor: 'primary'
        })
      }
    }
  }

  addAndSelect() {
    this.setState({
        badgeColor : 'secondary'
    })
    this.props.addSelectedHotel(this.props.hotel)
    
  }

  render () {
    return (
      <div>
        <IconButton style={styles} onClick={() => this.addAndSelect()}>
          <Badge style={{ color: '#fff', margin:'5'}} badgeContent={'$' + this.props.price} color={this.state.badgeColor}/>
        </IconButton>
      </div>
      )
  }
}
