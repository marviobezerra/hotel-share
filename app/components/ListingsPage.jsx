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
import sanfrancisco from '../../assets/images/sanfrancisco.jpg'
import chicago from '../../assets/images/chicago.jpg'
import newyork from '../../assets/images/newyork.jpg'
import seattle from '../../assets/images/seattle.jpg'
import pink from '@material-ui/core/colors/pink';
import Avatar from '@material-ui/core/Avatar';
import Marker from './marker.jsx';
var axios = require('axios');

const styles = theme => ({
  card: {
    display: 'flex',
    paddingBottom: 5
  },
  cards: {
    flexDirection: 'column'
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
  /*topBar: {
    display: 'flex',
  },*/
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
      hotels: [],
      center: {
        lat: 37.78984,
        lng: -122.42193
      },
      zoom: 14
    }
  }

  getHotels() {
    console.log(this.props.city)
    axios.get('/api/hotels/'+this.props.city.replace(' ', '+'))
    .then(res => {
      console.log(res)
      let hotels = res.data.hotels;
      console.log(hotels)
      this.setState({
        hotels: hotels
      })
      return hotels
    })
    .catch(err => {
      console.log(err)}
    )
  }

  componentDidMount() {
    console.log(this.props)
    this.props.updateAppBarStyle({height: 60});
    this.getHotels();
  }

  render() {
    const classes = this.props.classStyle
    console.log(this.props)
    return (
      <div className={classes.largeContainer}>
        <div className={classes.cards}>
          {
            this.state.hotels.map((hotel) => (
              <div className={classes.cardContainer}>
                <Card className={classes.card}>
                  <div className={classes.details}>
                    <CardContent className={classes.content}>
                      <Typography className={classes.hotelName} variant="headline">{hotel.name}</Typography>
                      <Typography variant="subheading">
                        {hotel.rating}/10
                      </Typography>
                      <Typography variant="subheading">
                        Great location in the center of the financial district.
                      </Typography>
                    </CardContent>
                    <div className={classes.controls}>
                      <Button size="small" color="primary">
                        from {hotel.stars}
                      </Button>
                    </div>
                  </div>
                  <div className={classes.cover}>
                    <img className={classes.carousel} src = {hotel.images[0]}/>
                  </div>
                </Card>
              </div>
            ))
          }
      </div>
      <div style={{ height: '100vh', width: '100%'}}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBEnTOO3y2ArEsQiWsZBw1m9jbNNR2vCqw"}}
          defaultCenter={this.state.center}
          defaultZoom={this.state.zoom}
        >
          {
            this.state.hotels.map((hotel) => (
              <Marker
                id={hotel._id}
                text={hotel.name}
                lat={hotel.location.lat}
                lng={hotel.location.long}
              />
            ))
          }
        </GoogleMapReact>
      </div>
    </div>
    );
  }
}

function ListingsPage(props) {
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
      {/*<div className={classes.topBar}>
        <div className={classes.leftTopBar}>
          <img className={classes.logo} src='https://www.shareicon.net/download/2016/11/22/855119_circle_512x512.png'/>
          <SearchBox />
        </div>
        <div className={classes.rightTopBar}>
          <Avatar className={classes.avatar}>
            D
          </Avatar>
        </div>
      </div>*/}
        <SimpleMap updateAppBarStyle={props.updateAppBarStyle} city={props.city} classStyle = {classes} className={classes.hotelMap}/>
    </div>
  );
}

ListingsPage.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ListingsPage);
