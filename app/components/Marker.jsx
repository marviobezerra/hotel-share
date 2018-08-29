import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
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
  /*cursor: `${props => (props.onClick ? 'pointer' : 'default')}`;*/
   /*'&:hover': {
    zIndex: 1
  }*/
}

export default class Marker extends React.Component {
  render () {
    return (
      <IconButton style={styles}>
        <LocationOnIcon />
      </IconButton>
    )
  }
}

/* const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 18px;
  height: 18px;
  background-color: #fd5c63;
  border: 2px solid #fff;
  border-radius: 100%;
  user-select: none;
  transform: translate(-50%, -50%);
  cursor: ${props => (props.onClick ? 'pointer' : 'default')};
  &:hover {
    z-index: 1;
  }
`;

const Marker = props => (
  <Wrapper
    alt={props.text}
    {...props.onClick ? { onClick: props.onClick } : {}}
  />
);

function handleClick(e) {
  console.log(this)
}

Marker.defaultProps = {
  onClick: handleClick,
};

Marker.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
};

export default Marker; */
