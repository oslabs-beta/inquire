import React, { Component } from 'react';
import DocSnip from '../DocSnip.jsx';

class ConfigDocs extends Component {
  
  render() {
    return(
      <div className="docContentSection" id="CONFIG">

        <h2>Configuration</h2>
        <div className="p4">
          {`Next, you'll enter the necessary information about your Kafka instance
          and specify which topics you want to query with GraphQL. This section will 
          cover what Inquire needs from you, and where that information goes in the config file.`}
        </div>


        <h4>Kafka Credentials</h4>
        <div className="p4">
          {`The first things you'll enter are the credentials to access your Kafka instance. This is not to be confused with 
          your Confluent login information, but it's the username and password accessed by _____. This will let Inquire 
          create your Apollo GraphQL test server. Don't worry, after running Inquire you can delete these entries, or add 
          this file to your .gitignore to ensure that any sensitive information cannot be viewed.`}
        </div>

        {/* code snip with example user and pass */}
        {/* <DocSnip code={`
  //input username and password for Confluent Cloud
  const username = '<yourUsername>'
  const password = '<yourPassword>'
          `}
          height={{height: '19.3vh'}}
          /> */}

        <h4>Targets & Topics</h4>
        <div className="p4">
          {`Depending on what mode you selected, you might see that the config file's "targets" section is either full (Mode 1)
          or empty (Mode 2). If you've chosen Mode 2, you'll be able to specify here which schema files you'd like Inquire 
          to process. Add their relative paths as separate values in the given array.`}
        </div>

        <div className="p4">
          {`If you've chosen Mode 1 or otherwise you're finished specifying your schema files, you can now enter your desired topics.
          For each schema file you specify, you'll enter one topic name. NOTE: It's important that you specify these topic
          names in order, corresponding with the schema file it relates to.`}
        </div>

        <div className="p4">
          {`Here's an example of correctly filled-out topic and target arrays:`}
        </div>

        {/* code snip with example topics & targets filled */}
        {/* <DocSnip code={`
topics: ['topic1', 'topic2'],\n
targets: ['schemaFile1.avsc', 'schemaFile2.js']
          `}
          height={{height: '19.3vh'}}
          /> */}


        <h4>Client ID & Brokers</h4>
        <div className="p4">
          {`Next, we'll need your Kafka client ID as well as any brokers you're using. These are accessed by ____`}
        </div>

        {/* code snip with example client ID and Brokers filled in */}
        {/* <DocSnip code={`
// CLI: \n
Enter absolute path to folder containing schema file(s):\n
<insert path here>
          `}
          height={{height: '19.3vh'}}
          /> */}


        <h4>Default Settings</h4>
        <div className="p4">
          {`Now, you've filled out the minimum information that Inquire needs to generate custom GraphQL type
          definitions, resolvers, and test server. You'll notice that some fields were pre-filled when you received
          the configuration file. `}
        </div>

        <ul>
          <li>ssl & sasl</li>
        </ul>
        <div className="p4">
          {`These sections _____`}
        </div>

        <ul>
          <li>schemaFolder</li>
        </ul>
        <div className="p4">
          {`This is the path you specified when using the CLI. This field remains in the config file
          mainly so that if the location of your schemas change, or the location of this folder has been moved
          at any given time, to reconstruct your GraphQL functionality, you can change this field and run Inquire 
          again to overwrite the outdated functionality. If you're a first-time user, you can ignore this field.`}
        </div>

        {/* code snip with example defaults */}
        {/* <DocSnip code={`
// CLI: \n
Enter absolute path to folder containing schema file(s):\n
<insert path here>
          `}
          height={{height: '19.3vh'}}
          /> */}

      </div>
    );
  }
}

export default ConfigDocs;