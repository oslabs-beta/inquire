import React, { Component } from 'react';
import homepageLogo from '../../assets/homepageLogo.png'

class DescriptionImage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="descriptionImage" >
        <div className="homePageImageContianer">
          <img style={{leftMargin: "2px"}} src={homepageLogo} alt="my-logo"></img>
        </div>
      </div>
    );
  }
}

export default DescriptionImage;
