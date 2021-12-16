import React, { Component } from 'react';
import DocSnip from '../DocSnip.jsx';

class GenGQLDocs extends Component {
  
  render() {
    return(
      <div className="docContentSection" id="GENGQL">

        <h2>Generating GraphQL</h2>
        <div className="p4">
          {`After one last CLI command, Inquire will create your personalized GraphQL system, 
          and then you can start writing and testing topic subscription queries.`}
        </div>

        <h4>Build Command</h4>
        <div className="p4">
          {`To generate the main files, run this command in your terminal:`}
        </div>

        {/* code snip of npm run inquire build command */}
        <DocSnip code={`
npm run inquire build
          `}
          height={{height: '12vh'}}
          />

        <div className="p4">
          {`Running the "build" command will generate four files. Inquire scans, processes, 
          and interprets your Avro schemas and Confluent information to do so. Type definitions
          and resolvers comprise the GraphQL schema used by the Apollo server. The async
          iterator file contains a function that ties Kafka topics to resolvers via KafkaJS consumers.
          These consumers have been set up to follow default KafkaJS settings. Feel free to customize
          these consumers to fulfill specific needs of your project.`}
        </div>

        {/* replace with filesystem illustration, destination folder as root */}
        <DocSnip code={`
projectRoot/\n
├── destinationFolder/\n
    ├── Inquire/\n
        ├── config.js\n
        ├── +typeDefs.js\n
        ├── +resolvers.js\n
        ├── +asyncIterator.js\n
    ├── +server.js
          `}
          height={{height: '38vh'}}
          />

        <div className="p4">
          {`The three files containing the custom GraphQL type definitions, resolvers, and async iterator
           function will appear inside the Inquire folder, and the Apollo server will generate in 
           the destination folder you specified in a previous step.`}
        </div>
      </div>
    );
  }
}

export default GenGQLDocs;