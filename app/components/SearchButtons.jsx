import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Popper from '@material-ui/core/Popper';
import InputAdornment from '@material-ui/core/InputAdornment';
import { DateRange, People, LocationCity} from '@material-ui/icons/';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  typography: {
    padding: theme.spacing.unit * 2,
  },
});

class SearchButtons extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      anchorEl : null,
      cityFill : false,
      openCity : false,
      fromFill : false,
      openFrom : false,
      toFill : false,
      openTo : false,
      guestsFill : false,
      openGuests : false,
    }
  }

  handleClick(event, btn) {
   const { currentTarget } = event;
   switch (btn) {
     case 'openGuests':
       this.setState({
         anchorEl: currentTarget,
         openGuests: !this.state.openGuests,
       });
       break;
     default:

   }
   this.setState({
     anchorEl: currentTarget,
     openCity: !this.state.openCity,
   });
 };

  render() {
    const { classes } = this.props;
    const anchorEl = this.state.anchorEl;
    const openCity = this.state.openCity
    const idCity = openCity ? 'simple-popper' : null;
    const openFrom = this.state.openFrom
    const idFrom = openFrom ? 'simple-popper' : null;
    const openTo = this.state.openTo
    const idTo = openTo ? 'simple-popper' : null;
    const openGuests = this.state.openGuests
    const idGuests = openGuests ? 'simple-popper' : null;

    return (
      <div>
        <Button color="primary" variant={this.state.cityFill ? "contained": "outlined"}
          onMouseOver={() => (this.setState({cityFill : true}))} onMouseLeave={() => (this.setState({cityFill : false}))}
          onClick={(e) => this.handleClick(e, 'openCity')}>
          City
        </Button>
        <Popper id={idCity} open={openCity} anchorEl={anchorEl} transition>
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper>
                <TextField
                  label="City"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationCity />
                      </InputAdornment>
                    ),
                  }}
                  type="text"
                  style={{width: "50%", margin: 2}}
                />
                <Button variant="contained" style={{margin: 20, backgroundColor: "orange", color: "white"}}>
                  Update
                </Button>
              </Paper>
            </Fade>
          )}
        </Popper>
        <Button color="primary" variant={this.state.fromFill ? "contained": "outlined"}
          onMouseOver={() => (this.setState({fromFill : true}))} onMouseLeave={() => (this.setState({fromFill : false}))}
          onClick={() => (this.setState({fromFill : !this.state.fromFill, cityFill: false, toFill: false, guestsFill: false}))}>
          From
        </Button>
        <Button color="primary" variant={this.state.toFill ? "contained": "outlined"}
          onMouseOver={() => (this.setState({toFill : true}))} onMouseLeave={() => (this.setState({toFill : false}))}
          onClick={() => (this.setState({toFill : !this.state.toFill, fromFill : false, cityFill : false, guestsFill : false}))}>
          To
        </Button>
        <Button color="primary" variant={this.state.guestsFill ? "contained": "outlined"}
          onMouseOver={() => (this.setState({guestsFill : true}))} onMouseLeave={() => (this.setState({guestsFill : false}))}
          onClick={(e) => this.handleClick(e, 'openGuests')}>
          Guests
        </Button>
        <Popper id={idGuests} open={openGuests} anchorEl={anchorEl} transition>
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper>
                <TextField
                  label="Guests"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <People />
                      </InputAdornment>
                    ),
                  }}
                  type="number"
                  style={{width: "50%", margin: 2}}
                />
                <Button variant="contained" style={{margin: 20, backgroundColor: "orange", color: "white"}}>
                  Update
                </Button>
              </Paper>
            </Fade>
          )}
        </Popper>
      </div>
    )
  }
}

SearchButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchButtons);
