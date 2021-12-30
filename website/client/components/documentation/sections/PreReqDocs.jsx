import React, { Component } from 'react';

class PreReqDocs extends Component {

  render() {
    return(
      <div className="docContentSection" id="PREREQS">

        <h2>Prerequisites</h2>
        <div className="p4">
          {`Before using Inquire, you'll have to have a few things set up already:`}
        </div>

        <ul>
          <li>Kafka Cluster delpoyed on Docker or Confluent Cloud </li>
        </ul>
        <div className="p4">
          {`Inquire works with any Kafka instance deployed locally on Docker or remotely on Confluent Cloud.
          Before using the tool, ensure that your cluster is live and running.`}
        </div>

        <ul>
          <li>Avro Schema</li>
        </ul>
        <div className="p4">
          {`The only other prerequisite is that you have a folder in your project
          containing one or more Avro schemas. You may have defined topic schemas within your
          project already. If so, skip to the next step! Otherwise, you can download your pre-saved 
          schemas from Confluent by visiting Schema Registry > View & Manage Schemas.
          `}
        </div>

      </div>
    );
  }
}

export default PreReqDocs;