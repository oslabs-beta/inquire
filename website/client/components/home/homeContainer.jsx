import React, { Component } from 'react';
import DescriptionImage from './descriptionImage.jsx';
import DescriptionBox from './descriptionBox.jsx';

class HomeContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="homeContainer">
        <DescriptionImage/>
        <DescriptionBox/>
      </div>
    );
  }
}

export default HomeContainer;