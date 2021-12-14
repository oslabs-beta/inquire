import React, { Component } from 'react';

class DescriptionBox extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const descriptionText = `
      Topic is an NPM package that allows developers to quickly serve a GraphQL endpoint
      associated with one or more Kafka topics. The module is able to infer a complete
      set of GraphQL schemas, resolvers, and async iterators from AVRO schemas provided by 
      the end user. Package is currently developed around a GraphQL Apollo server.
    `
    return(
      <div className="descriptionBox">
        <h1>TOPIC</h1>
        <div className="p1">{ descriptionText }</div>
      </div>
    );
  }
}

export default DescriptionBox;
