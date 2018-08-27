import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import GoogleMapReact from 'google-map-react';
import SearchBox from './SearchBox.jsx';
import { Fade } from 'react-slideshow-image';
import Slideshow from './Slideshow.jsx'
import sanfrancisco from '../../assets/images/sanfrancisco.jpg'
import chicago from '../../assets/images/chicago.jpg'
import newyork from '../../assets/images/newyork.jpg'
import seattle from '../../assets/images/seattle.jpg'
import pink from '@material-ui/core/colors/pink';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
  card: {
    display: 'flex',
    paddingBottom: 5
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  cardContainer : {
    flex: 0,
    padding: 5
  },
  carousel: {
    maxHeight: '20vh',
    maxWidth: '20vh'
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    display:'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 10
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  divContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  hotelMap: {
    paddingBottom: 5,
    flex: 1,
  },
  hotelName: {
    color: '#fd5c63',
    fontWeight: 'bold'
  },
  largeContainer : {
    display:'flex',
  },
  leftTopBar: {
    display:'flex',
    justifyContent:'space-evenly',
    flex: 1
  },
  logo : {
    height: 75,
    width: 75
  },
  rightTopBar: {
    display: 'flex',
    justifyContent: 'flex-end',
    flex: 1,
  },
  topBar: {
    display: 'flex',
  },
  avatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: '#fd5c63',
  },
  media: {
    height: 50,
    width: 50
  }
});

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {
        lat: 59.95,
        lng: 30.33
      },
      zoom: 11
    }
  }

  render() {
    console.log(process.env)
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.API_KEY}}
          defaultCenter={this.state.center}
          defaultZoom={this.state.zoom}
        >
          <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text={'Kreyser Avrora'}
          />
        </GoogleMapReact>
      </div>
    );
  }
}

function MediaControlCard(props) {
  const { classes, theme } = props;

  const fadeImages = [
  sanfrancisco,
  chicago,
  newyork,
  seattle
  ];

  const fadeProperties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true
  }

  return (
    <div className={classes.divContainer}>
      <div className={classes.topBar}>
        <div className={classes.leftTopBar}>
          <img className={classes.logo} src='https://www.shareicon.net/download/2016/11/22/855119_circle_512x512.png'/>
          <SearchBox />
        </div>
        <div className={classes.rightTopBar}>
          <Avatar className={classes.avatar}>
            D
          </Avatar>
        </div>
      </div>
      <div className={classes.largeContainer}>
        <div className={classes.cardContainer}>
          <Card className={classes.card}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography className={classes.hotelName} variant="headline">Marriot</Typography>
                <Typography variant="subheading">
                  8.9/10
                </Typography>
                <Typography variant="subheading">
                  Great location in the center of the financial district.
                </Typography>
              </CardContent>
              <div className={classes.controls}>
                <Button size="small" color="primary">
                  from $179
                </Button>
              </div>
            </div>
            <div className={classes.cover}>
              <img className={classes.carousel} src = 'http://www.hdwallpaperspulse.com/wp-content/uploads/2017/08/12/stunning-hd-chicago-wallpaper.jpeg'/>
            </div>
          </Card>
        </div>
        <SimpleMap className={classes.hotelMap}/>
      </div>
    </div>
  );
}

MediaControlCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MediaControlCard);
