import React, { Component } from 'react';
import buttonCopyText from '../../assets/buttonCopyText.png'


class DocSnip extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return(
      <div className="p7">

        <img
          className="copyTextButton" 
          src={buttonCopyText} 
          alt="my-logo"
          onClick={() => {navigator.clipboard.writeText(this.props.code)}}
        />

        <textarea
          className="docSnip"
          style={this.props.height}
          value={this.props.code}
        />

      </div>
    );
  }
}

export default DocSnip;