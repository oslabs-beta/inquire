import React, { Component } from 'react';
import logoWhite from '../../assets/logoWhite.png'

class DescriptionBox extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const descriptionText = `
      Inquire is an NPM package that allows developers to quickly serve a GraphQL endpoint
      associated with one or more Kafka topics. The module is able to infer a complete
      set of GraphQL schemas, resolvers, and async iterators from AVRO schemas provided by 
      the end user. The package is currently developed around a GraphQL Apollo server.
    `
    return(
      <div className="descriptionBox">
        {/* <div className="titleAndLogoBox"> */}
          <h1>inquire</h1>
          {/* <img style={{leftMargin: "2px"}} src={logoWhite} alt="my-logo"></img> */}
        {/* </div> */}
        <div className="p1">{ descriptionText }</div>
      </div>
    );
  }
}

export default DescriptionBox;
