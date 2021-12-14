import React, { Component } from 'react';
import AvroInput from './avroInput.jsx';
import GraphQLOutput from './graphQLOutput.jsx';

class ConvertingBox extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return(
      <div className="convertingBox">
        <AvroInput/>
        <GraphQLOutput/>
      </div>
    );
  }
}

export default ConvertingBox;
