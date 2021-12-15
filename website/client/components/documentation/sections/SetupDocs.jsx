import React, { Component } from 'react';

class SetupDocs extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return(
      <div className="docContentSection" id="SETUP">

        <h2>Setup</h2>
          <div className="p4">
            {`In this section, we'll go over the basics of integrating Topic into your workspace.`}
          </div>

        <h4>Installing Topic</h4>
          <div className="p4">
            {`The very first step in the process is installing the Topic
            NPM package in your project's root directory. This can be done by
            running this command in your terminal:`}
          </div>

        {/* insert photo of command here */}

        <div className="p4">
          {`After installing the package, you should be able to see "topic" in your
          package.json as a dependency.`}
        </div>

        <h4>Adding the Script</h4>
          <div className="p4">
            {`So now you have Topic as a dependency in your package.json. The
            crucial next step is adding a script to this file so that you can
            run custom CLI commands. You can name this script anything you want,
            but be sure to set it to run "topic." `}
          </div>
          <div className="p4" style={{marginTop : '2vh', marginBottom : '2vh'}}>{`Here's an example:`}</div>
          
          {/* put image here of example script */}

      </div>
    );
  }
}

export default SetupDocs;