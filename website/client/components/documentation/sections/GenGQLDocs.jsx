import React, { Component } from 'react';

class GenGQLDocs extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return(
      <div className="docContentSection" id="GENGQL">

        <h2>Generating GraphQL</h2>
        <div className="p4">
          {`By this time, you should have entered all the necessary information for Inquire to generate 
          a complete set of GraphQL files. After one last CLI command, you can start writing and testing topic queries.`}
        </div>

        <h4>Build Command</h4>
        <div className="p4">
          {`To generate the files, run this command in your terminal:`}
        </div>

        {/* code snip of npm run inquire build command */}

        <div className="p4">
          {`Running "build" triggers the main functionality. Based on the information you entered, Inquire will
          scan, process, and interpret your Avro schema to generate 4 JavaScript files.`}
        </div>
        {/* replace with filesystem illustration, destination folder as root */}
        <ul>
          <li>typeDefs.js</li>
          <li>resolvers.js</li>
          <li>asyncIterator.js</li>
          <li>server.js</li>
        </ul>

        <div className="p4">
          {`Your Apollo test server will generate as a direct child of the destination folder you specified in the 
          initialization, and the 3 files containing the custom GraphQL type definitions, resolvers, and async iterator
           will appear inside the Inquire folder created.`}
        </div>

        <div className="p4" style={{marginTop : '2vh', marginBottom : '2vh'}}>Here's an example</div>
      </div>
    );
  }
}

export default GenGQLDocs;