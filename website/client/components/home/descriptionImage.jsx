import React, { Component } from 'react';
import homepageGIFLogo from '../../assets/homepageGIFLogo.gif'

class DescriptionImage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="descriptionImage" >
        <div className="homePageImageContianer">
          <img style={{leftMargin: "2px"}} src={homepageGIFLogo} alt="my-logo"></img>
        </div>
      </div>
    );
  }
}

export default DescriptionImage;
