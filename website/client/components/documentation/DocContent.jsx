import React, { Component } from 'react';
import ConfigDocs from './sections/ConfigDocs.jsx';
import GenGQLDocs from './sections/GenGQLDocs.jsx';
import InitDocs from './sections/InitDocs.jsx';
import QueryDocs from './sections/QueryDocs.jsx';
import SetupDocs from './sections/SetupDocs.jsx';

class DocContent extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return(
      <div>
        <div className="docContentSection" id="OVERVIEW">
          <h2>Overview</h2>
          <div className="p4">Welcome to the Topic docs!</div>
          <div className="p4">
            {`If you're intending to incorporate GraphQL 
            to query your Kafka topics, you've come to the right place.`}
            </div>
            <br/>
            <div className="p4">
            {`With Topic, it's easier than ever to start retrieving only the most 
            relevant data from your message streams - and it only takes a few steps.`}
            </div>
          <div className="p4" style={{marginTop : '2vh', marginBottom : '2vh'}}>
            For a seamless setup, follow the docs below. Or, if you're returning for 
            specific information, click any sidebar section to jump.
          </div>
        </div>

        <SetupDocs/>
        <InitDocs/>
        <ConfigDocs/>
        <GenGQLDocs/>
        <QueryDocs/>
      </div>
    );
  }
}

export default DocContent;
