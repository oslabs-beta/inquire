import React, { Component } from 'react';

class PreReqDocs extends Component {

  render() {
    return(
      <div className="docContentSection" id="PREREQS">

        <h2>Prerequisites</h2>
        <div className="p4">
          {`Inquire assumes you have the following set up before use:`}
        </div>

        <ul>
          <li>Cloud Kafka Instance</li>
        </ul>
        <div className="p4">
          {`Have a cloud instance. This can be on Confluent cloud .... etc`}
        </div>

        <ul>
          <li>Avro Schema</li>
        </ul>
        <div className="p4">
          {`Inquire needs your Avro schema. ...schema registry... to know how to ..`}
        </div>

      </div>
    );
  }
}

export default PreReqDocs;