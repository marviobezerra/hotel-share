import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
/* import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const styles = {
card: {
maxWidth: 345,
},
media: {
//  object-fit is not supported by IE11.
objectFit: 'cover',
},
root: {
flexGrow: 1,
},
flex: {
flexGrow: 1,
},
menuButton: {
marginLeft: -12,
marginRight: 20,
},
};

function ImgMediaCard(props) {
return (
<Card className="card">
 <CardMedia
   component="img"
   className="media"
   height="140"
   src="https://cdn.kinsights.com/cache/72/a2/72a2347cf952d45f2c1b4654657d044f.jpg"
   title="Contemplative Reptile"
 />
 <CardContent>
   <Typography gutterBottom variant="headline" component="h2">
     Lizard
   </Typography>
   <Typography component="p">
     Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
     across all continents except Antarctica
   </Typography>
 </CardContent>
 <CardActions>
   <Button size="small" color="primary">
     Share
   </Button>
   <Button size="small" color="primary">
     Learn More
   </Button>
 </CardActions>
</Card>
);
}

function ButtonAppBar(props) {
const { classes } = props;
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
);
}

class SimpleBottomNavigation extends React.Component {

render() {
const { classes } = this.props;

return (
 <BottomNavigation
   showLabels
   className="root"
 >
   <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
   <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
   <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
 </BottomNavigation>
);
}
}

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

const Slideshow = () => {
return (
<Fade style={{position:'absolute', zIndex:0}}{...fadeProperties}>
 <div className="each-fade">
   <div className="image-container">
     <img src={fadeImages[0]} />
   </div>
 </div>
 <div className="each-fade">
   <div className="image-container">
     <img src={fadeImages[1]} />
   </div>
 </div>
 <div className="each-fade">
   <div className="image-container">
     <img src={fadeImages[2]} />
   </div>
 </div>
</Fade>
)
}

class LandingPage extends React.Component {
render() {
return (
 <div>
   <label style={{position: 'absolute', zIndex:5}}>Hello</label>
   <label style={{position: 'absolute', zIndex:0}}>GoodBye</label>
   {/*<ButtonAppBar style={{position:'absolute', zIndex:100}}/>*/ /*}
   <div>
     {Slideshow()}
   </div>
   <SimpleBottomNavigation style={{position:'absolute', top:0, left:0, zIndex:5}}/>
 </div>
 //<Card className = {default}/>
)
}
} */

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>,
   document.getElementById('root'));
