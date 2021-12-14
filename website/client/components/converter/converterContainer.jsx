import React, { Component } from 'react';
import ConvertingBox from './convertingBox.jsx';
import ConvertingDescription from './convertingDescription.jsx';

class ConverterContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="converterContainer">
        <ConvertingDescription/>
        <ConvertingBox/>
      </div>
    );
  }
}

export default ConverterContainer;