import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import HotelCard from './HotelCard.jsx'
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import GoogleMapReact from 'google-map-react';
import SearchBox from './SearchBox.jsx';
import Chip from '@material-ui/core/Chip';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { Fade } from 'react-slideshow-image';
import sanfrancisco from '../../assets/images/sanfrancisco.jpg'
import chicago from '../../assets/images/chicago.jpg'
import newyork from '../../assets/images/newyork.jpg'
import seattle from '../../assets/images/seattle.jpg'
import pink from '@material-ui/core/colors/pink';
import Avatar from '@material-ui/core/Avatar';
import Marker from './marker.jsx';
import AlternateListing from './AlternateListing.jsx'
import SearchButtons from './SearchButtons.jsx'
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
  gridList: {
    width: '100%',
    height: '100%',
  },
  hotelMap: {
    paddingBottom: 5,
    flex: 1,
  },
  hotelName: {
    color: '#008081',
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
  avatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: '#008081',
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
      selectedHotel: null,
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

  addSelectedHotel(selected) {
    let selectedHotels = this.state.selectedHotels

    this.setState({
      selectedHotel: selected
    })
  }

  createCard(classes, hotel) {
    return (
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
    )
  }

  componentDidMount() {
    console.log(this.props)
    this.props.updateAppBarStyle({height: 60});
    this.getHotels();
  }

  render() {
    const classes = this.props.classStyle
    return (
      <div className={classes.largeContainer}>
        <div className={classes.cards}>
          <GridList cellHeight={'auto'} className={classes.gridList} cols={1}>

            {
              this.state.selectedHotel ?
              <div>
                <GridListTile key={2}>
                  <AlternateListing classes={classes} hotel={this.state.selectedHotel}/>
                </GridListTile>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                  <Button style={{backgroundColor: '#008081', color: '#fff'}} onClick={() => this.setState({selectedHotel: null})}>
                    Reset
                  </Button>
                </div>
              </div>
               : this.state.hotels.map((hotel) => (
                 <GridListTile key={hotel.name}>
                   <AlternateListing classes={classes} hotel={hotel}/>
                 </GridListTile>
              ))
            }
          </GridList>
          {/*
            this.state.selectedHotel ?
            <div>
              <AlternateListing classes={classes} hotel={this.state.selectedHotel}/>
              <div style={{display: 'flex', justifyContent: 'center'}}>
                <Button style={{backgroundColor: '#008081', color: '#fff'}} onClick={() => this.setState({selectedHotel: null})}>
                  Reset
                </Button>
              </div>
            </div>
             : this.state.hotels.map((hotel) => (
               <AlternateListing classes={classes} hotel={hotel}/>
            ))
          */}
      </div>
      <div style={{ height: '100vh', width: '100%'}}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBEnTOO3y2ArEsQiWsZBw1m9jbNNR2vCqw'}}
          defaultCenter={this.state.center}
          defaultZoom={this.state.zoom}
        >
          {console.log(this.state.hotels)}
          {
            this.state.hotels.map((hotel) => (
              <Marker
                id={hotel._id}
                text={hotel.name}
                lat={hotel.location.lat}
                lng={hotel.location.long}
                price={hotel.listings[0].price}
                hotel={hotel}
                addSelectedHotel={(val) => this.addSelectedHotel(val)}
                selectedHotel={this.state.selectedHotel}
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
    <div>
      <SearchButtons />
      <div className={classes.divContainer}>
          <SimpleMap updateAppBarStyle={props.updateAppBarStyle} city={props.city} classStyle = {classes} className={classes.hotelMap}/>
      </div>
    </div>
  );
}

ListingsPage.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ListingsPage);
