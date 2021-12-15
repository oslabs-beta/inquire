import React, { Component } from 'react';

class QueryDocs extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return(
      <div className="docContentSection" id="QUERYING">

        <h2>Querying Your Kafka Topics</h2>
        <div className="p4">
          {`Preview of the current section`}
        </div>
        
        <h4>Starting Your Test Server</h4>
        <div className="p4">
          {`Description of what's going on`}
        </div>

        <h4>Writing Queries</h4>
        <div className="p4">
          {`Description of what's going on`}
        </div>

        <div className="p4" style={{marginTop : '2vh', marginBottom : '2vh'}}>Here's an example</div>

      </div>
    );
  }
}

export default QueryDocs;