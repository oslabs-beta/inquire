import React, { Component } from 'react';
import DocSnip from '../DocSnip.jsx';

class ConfigDocs extends Component {
  
  render() {
    return(
      <div className="docContentSection" id="CONFIG">

        <h2>Configuration</h2>
        <div className="p4">
          {`Next, you'll enter the necessary information about your Kafka cluster
          and specify which topics you want to subscribe to with GraphQL. This section will 
          cover what information Inquire needs from you, and where it goes in the config file.`}
        </div>


        <h4>Kafka Credentials</h4>
        <div className="p4">
          If you are using a cloud instance of a Kafka cluster, you'll have to configure your credentials. Refer to
          the Confluent Cloud <a href="https://docs.confluent.io/cloud/current/access-management/authenticate/api-keys/api-keys.html" target="_blank">docs</a> to set up a Kafka API key for your cluster. Enter the API key under "username" and the
          API secret under "password." It is recommended that you use environment variables to store your credentials in order
          to avoid sensitive information accidentally being uploaded to a public repo. If you are using a local Kafka instance without credentials, you can skip the username and password section,
          and comment out the ssl and sasl keys in the module.exports object.
        </div>
        <br/>
        <div className="p4">
          NOTE: Inquire will be setting up <a href="https://kafka.js.org/docs/configuration" target="_blank">KafkaJS</a> consumers to serve as liaisons between GraphQL and your Kafka cluster.
          By default the authentication for these consumers is set up to use SASL plain. This can be modified by editing
          the configuration file.
        </div>

        {/* code snip with example user and pass */}
        <DocSnip code={`
  const username = '<yourAPIkey>'\n
  const password = '<yourAPIsecret>'
          `}
          height={{height: '16vh'}}
          />

        <h4>Targets & Topics</h4>
        <div className="p4">
          {`Depending on what mode you selected, you might see that the config file's "targets" array is either full (Mode 1)
          or empty (Mode 2). If you've chosen Mode 2, you'll need to specify here which schema files you'd like Inquire 
          to process. Add their file names as separate string values in the given array.`}
        </div>
        <br/>
        <div className="p4">
          {`If you've chosen Mode 1, or otherwise finished specifying your schema files, you can now 
          enter the names of your Kafka topics you want to subscribe to with GraphQL. For each 
          schema file in "targets", enter its corresponding topic name in "topics." It's important 
          that these are in the same order.`}
        </div>
        <br/>
        <div className="p4">
          {`NOTE: As of now, Inquire can fully interpret .avsc and .js files containing Avro schemas. In
          the future, we aim to expand its capabilities to process other schema types.`}
        </div>
        

        {/* code snip with example topics & targets filled */}
        <DocSnip code={`
topics: ['topic1', 'topic2'],\n
targets: ['schemaFile1.avsc', 'schemaFile2.js'],
          `}
          height={{height: '16vh'}}
          />


        <h4>Client ID & Brokers</h4>
        <div className="p4">
          {`Next, you'll need to enter a Kafka client ID as well as the brokers you're using. If you are
          using Confluent Cloud to deploy your cluster, navigate to Cluster Overview > Cluster Settings > Bootstrap Server
          to find the broker address. If you are instead using Docker, the broker variable may look something like this:
          "localhost:9092"`}
        </div>

        {/* code snip with example client ID and Brokers filled in */}
        <DocSnip code={`
clientId: '<yourClientID>',\n
brokers: [<yourBrokers>],
          `}
          height={{height: '16vh'}}
          />

      </div>
    );
  }
}

export default ConfigDocs;