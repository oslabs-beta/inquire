import React, { Component } from 'react';

class ConfigDocs extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return(
      <div className="docContentSection" id="CONFIG">
        <h2>Configuration</h2>
        <div className="p4">
          {`Preview of the current section`}
        </div>
        <h4>Kafka Credentials</h4>
        <div className="p4">
          {`Description of what's going on`}
        </div>
        <h4>Topics & Targets</h4>
        <div className="p4">
          {`Description of what's going on`}
        </div>
        <h4>Client ID & Brokers</h4>
        <div className="p4">
          {`Description of what's going on`}
        </div>
        <h4>Default Settings</h4>
        <div className="p4">
          {`Description of what's going on`}
        </div>
      </div>
    );
  }
}

export default ConfigDocs;