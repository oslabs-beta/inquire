import React, { Component } from 'react';

class InitDocs extends Component {

  render() {
    return(
      <div className="docContentSection" id="INIT">

        <h2>Initializing Inquire</h2>
          <div className="p4">
            {`This section covers the initialization of Inquire, namely how to 
            utilize its command line interface (CLI).`}
          </div>

        <h4>Choosing Destination</h4>
          <div className="p4">
            {`Now you're all set to use the package, but before you run any commands,
            figure out where in your filesystem you want your GraphQL functionality to live.
            Copy the absolute path to this folder to your clipboard - 
            you'll need this for the next step.`}
          </div>

        <h4>Init Command</h4>
          <div className="p4">
            {`Once you have the path to the destination folder, run this
            command in your terminal:`}
          </div>
        
        {/* picture of the npm run inquire init command */}

        <h4>Selecting Mode</h4>
          <div className="p4">
            {`Once you press enter, the next step is choosing the mode (1 or 2). Assuming you
            have a separate folder containing your Avro schema(s), Inquire will eventually be scanning
            its contents to infer the GraphQL types and resolvers. While Inquire will by default
            scan each Avro schema file in your folder, choosing the right mode will
            let you specify whether there are certain files you want interpreted - or if 
            you'd like them all to be considered.`}
          </div>

        <h5>Mode 1:</h5>
          <div className="p4">
            {`Choose mode 1 if you would like all files in your schema folder to be processed.`}
          </div>

        <h5>Mode 2:</h5>
          <div className="p4">
            {`Choose mode 2 if you'd like to manually select files to be considered.`}
          </div>

        <h4>Schema Folder</h4>
          <div className="p4">
            {`Once you've chosen the appropriate mode, the last initialization step is to enter the
            location of your relevant Avro schema(s). Upon receiving the prompt, enter the absolute path
            of this folder into your terminal and press enter.`}
          </div>

          <div className="p4">
            {`Immediately following the command, you should see that a folder named "Inquire" has
            been generated inside the destination folder you specified in the first step. 
            Inside this folder, you'll see a configuration file. This will be the last thing you
            need to fill out before receiving your complete GraphQL setup.`}
          </div>

      </div>
    );
  }
}

export default InitDocs;