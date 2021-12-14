import React, { Component } from 'react';
import ButtonContainer from './buttonContainer.jsx';

class ConvertingDescription extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const descriptionText1 = `
      To demo the AVRO - GraphQL schema translator behind Topic, simply paste 
      a valid AVRO schema in the left hand text box. For best results, please 
      verify the validity of your AVRO schema beforehand. Once ready, click 
      the "generate now" button below, and the associated GraphQL types will 
      appear in the right hand side. 
    `
    const descriptionText2 = `
      For complete functionality, including generation of full GraphQL schema and resolvers tied to Kafka topics,
      you may download the NPM package by following the link in the navigation bar.
    `
    return(
      <div className="convertingDescription">
        <h2>HOW TO USE</h2>
        <div className="p4">{ descriptionText1 }</div>
        <div className="p4" style={{marginTop : '2vh', marginBottom : '2vh'}}>{ descriptionText2 }</div>
        {/* Button Container element holds three buttons with the functionality to connect to Kafka, generate GraphQL, or clear text boxes */}
        <ButtonContainer/>
      </div>
    );
  }
}

export default ConvertingDescription;
