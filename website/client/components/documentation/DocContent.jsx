import React, { Component } from 'react';

class DocContent extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const header = `
      Overview
    `
    const descriptionText1 = `
      This will be where the sections go
    `
    const descriptionText2 = `
      Here's 
    `
    return(
      <div className="convertingDescription">
        <h2>{ header }</h2>
        <div className="p4">{ descriptionText1 }</div>
        <div className="p4" style={{marginTop : '2vh', marginBottom : '2vh'}}>{ descriptionText2 }</div>
        {/* Button Container element holds three buttons with the functionality to connect to Kafka, generate GraphQL, or clear text boxes */}
      </div>
    );
  }
}

export default DocContent;
