import React, { Component } from 'react';
import ButtonContainer from './buttonContainer.jsx';

class ConvertingDescription extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const descriptionText1 = `
      To demo the AVRO - GraphQL schema translator behind Topic, simplyp ic 
      is an NPM package that allows developers to quickly serve a GraphQL endpoint
      associated with one or more Kafka topics. The module is able to infer a complete
      set of GraphQL schemas, resolvers, and async iterators from AVRO schemas provided by 
      the end user. Package is currently developed around a GraphQL Apollo server.
    `
    const descriptionText2 = `
      Topic is an NPM package that allows developers to quickly serve a GraphQL endpoint
      associated with one or more Kafka topics. 
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
