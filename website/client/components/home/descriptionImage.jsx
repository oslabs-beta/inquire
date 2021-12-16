import React, { Component } from 'react';
import homepageLogoGIF from '../../assets/homepageLogoGIF.gif'

class DescriptionImage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="descriptionImage" >
        <div className="homePageImageContianer">
          <img style={{leftMargin: "2px"}} src={homepageLogoGIF} alt="my-logo"></img>
        </div>
      </div>
    );
  }
}

export default DescriptionImage;
