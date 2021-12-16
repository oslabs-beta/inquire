import React, { Component } from 'react';
import ConfigDocs from './sections/ConfigDocs.jsx';
import DocsConclusion from './sections/DocsConclusion.jsx';
import GenGQLDocs from './sections/GenGQLDocs.jsx';
import InitDocs from './sections/InitDocs.jsx';
import PreReqDocs from './sections/PreReqDocs.jsx';
import QueryDocs from './sections/QueryDocs.jsx';
import SetupDocs from './sections/SetupDocs.jsx';

class DocContent extends Component {

  render() {
    return(
      <div>
        {/* <div id="doc-banner"/> */}

        <div className="docContentSection" id="OVERVIEW">
          <h2>Overview</h2>
          <div className="p4" style={{fontWeight: '900', fontSize: '1.2rem'}}>
            {`Welcome to the Inquire docs!`}
            </div>

          <br/>

          <div className="p4">
            {`Here, you can find a step-by-step, comprehensive guide on using Inquire 
            to seamlessly integrate GraphQL with Apache Kafka. After a quick setup, you can 
            start retrieving only the most relevant data from your message streams.`}
            </div>
          <div className="p4" style={{marginTop : '2vh', marginBottom : '2vh'}}>
            {`If you're just getting started with Inquire, follow the steps below from 
            start to finish. Or if you're returning, click any sidebar header to jump.`}
          </div>
        </div>
          <PreReqDocs/>
          <SetupDocs/>
          <InitDocs/>
          <ConfigDocs/>
          <GenGQLDocs/>
          <QueryDocs/>
          <DocsConclusion/>
      </div>
    );
  }
}

export default DocContent;
