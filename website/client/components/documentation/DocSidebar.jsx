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


        <a href="#PREREQS"><div className="p3">Prerequisites</div></a>


        <a href="#SETUP"><div className="p3">Setup</div></a>
        <div>
          <ul>
            <li>Installing Inquire</li>
            <li>Adding the Script</li>
          </ul>
        </div>
          

        <a href="#INIT"><div className="p3">Initializing Inquire</div></a>
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
          </ul>
        </div>


        <a href="#GENGQL"><div className="p3">Generating GraphQL</div></a>
        <div>
          <ul>
            <li>Build Command</li>
          </ul>
        </div>


        <a href="#QUERYING"><div className="p3">Subscribing to Kafka Topics</div></a>
        <div>
          <ul>
            <li>Starting the Server</li>
            <li>Writing Queries</li>
          </ul>
        </div>


        <a href="#CONCLUSION"><div className="p3">Conclusion</div></a>


      </div>
    );
  }
}

export default DocSidebar;
