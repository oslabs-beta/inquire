import React, { Component } from 'react';
import DocSnip from '../DocSnip.jsx';

class QueryDocs extends Component {
  
  render() {
    return(
      <div className="docContentSection" id="QUERYING">

        <h2>Subscribing to Kafka Topics</h2>
        <div className="p4">
          {`Now you're ready to start querying your subscription topics. To begin, make sure
          your Kafka cluster is up and running.`}
        </div>
        
        <h4>Starting the Server</h4>
        <div className="p4">
          {`Next, you can run the Apollo server created in the previous step. You can do this by adding a script, 
          or by running this command in the directory containing the server.js file. Before you run the server,
          make sure you have installed all the necessary dependencies:`}
        </div>
        <DocSnip code={`
npm i kafkajs \n
npm i subscriptions-transport-ws \n
npm i apollo-server-express \n
npm i graphql \n
        `}
        height={{height: '23vh'}}
        />

        {/* code snip of the command */}
        <DocSnip code={`
node server.js
          `}
          height={{height: '12vh'}}
          />

        <h4>Writing Queries</h4>
        <div className="p4">
          {`You should see in your terminal a browser link taking you to the Apollo Playground interface. There, you can start 
          building GraphQL subscriptions and view your message data streaming through in the right-hand panel - in real-time! 
          Watch the data load change as you query only the information you intend to use.`}
        </div>

      </div>
    );
  }
}

export default QueryDocs;