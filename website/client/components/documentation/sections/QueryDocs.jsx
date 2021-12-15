import React, { Component } from 'react';
import DocSnip from '../DocSnip.jsx';

class QueryDocs extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return(
      <div className="docContentSection" id="QUERYING">

        <h2>Querying Your Kafka Topics</h2>
        <div className="p4">
          {`Now you're ready to start querying the topics you specified in your config file. This is 
          the final step in the process. To begin, start up your Kafka producer.`}
        </div>
        
        <h4>Starting Your Test Server</h4>
        <div className="p4">
          {`Next, you can run the Apollo server created in the previous step. To do this, add a script if you like, 
          or simply run this command in the directory containing Inquire's server.js file.`}
        </div>

        {/* code snip of the command */}
        <DocSnip code={`
node server.js
          `}
          height={{height: '12vh'}}
          />

        <h4>Writing Queries</h4>
        <div className="p4">
          {`You should see in your terminal a link to where the test server is running. Follow the link and click the ""
          button on the site. On the main page, you can start experimenting with GraphQL queries while viewing your message
          data streaming through in the right-hand panel. Watch as the data changes as you query only the information
          you need!`}
        </div>

        <div className="p4" style={{marginTop : '2vh', marginBottom : '2vh'}}>Here's an example</div>

      </div>
    );
  }
}

export default QueryDocs;