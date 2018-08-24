import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import SearchBox from './SearchBox.jsx';
import LoginPage from './LoginPage.jsx';
import { Fade } from 'react-slideshow-image';
import sanfrancisco from '../../assets/images/sanfrancisco.jpg'
import chicago from '../../assets/images/chicago.jpg'
import newyork from '../../assets/images/newyork.jpg'
import seattle from '../../assets/images/seattle.jpg'

export default class Slideshow extends React.Component {
  render() {
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
        <div id="landing-images">
          <Fade {...fadeProperties}>
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
        </div>
        <div id="main-content">
          <Link to="/login" style={{fontSize: 30}}>Login</Link>
          <Route exact path="/login" component={LoginPage} />
        </div>
      </div>
    )
  }
}
