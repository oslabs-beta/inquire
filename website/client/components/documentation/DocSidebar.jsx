import React, { Component } from 'react';

class DocSidebar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="docSidebar">
        <h3>Contents</h3>
        
        <a href="#OVERVIEW"><div className="p3">Overview</div></a>

        <a href="#SETUP"><div className="p3">Setup</div></a>
        <div>
          <ul>
            <li>Installing Topic</li>
            <li>Adding the Script</li>
          </ul>
        </div>
          

        <a href="#INIT"><div className="p3">Initializing Topic</div></a>
        <div>
          <ul>
            <li>Choosing a Destination</li>
            <li>Init Command</li>
          </ul>
        </div>


        <a href="#CONFIG"><div className="p3">Configuration</div></a>
        <div>
          <ul>
            <li>Kafka Credentials</li>
            <li>Topics & Targets</li>
            <li>Client ID & Brokers</li>
            <li>Default Settings</li>
          </ul>
        </div>


        <a href="#GENGQL"><div className="p3">Generating GraphQL</div></a>
        <div>
          <ul>
            <li>Build Command</li>
            <li>How it Works</li>
            <li>What Files are Generated?</li>
          </ul>
        </div>


        <a href="#QUERYING"><div className="p3">Querying Your Kafka Topics</div></a>
        <div>
          <ul>
            <li>Starting Your Test Server</li>
            <li>Writing Queries</li>
          </ul>
        </div>


      </div>
    );
  }
}

export default DocSidebar;
