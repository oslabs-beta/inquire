import React, { Component } from 'react';
import DocSnip from '../DocSnip.jsx';

class InitDocs extends Component {

  render() {
    return(
      <div className="docContentSection" id="INIT">

        <h2>Initializing Inquire</h2>
          <div className="p4">
            {`This section will walk through the steps necessary to 
            interact with the CLI.`}
          </div>

        <h4>Choosing Destination</h4>
          <div className="p4">
            {`Inquire will be generating multiple custom files needed by GraphQL. But in order to 
            do so, you'll need to specify where you want these files to live.
            It's recommended to create a separate, empty folder for this to keep things organized. 
            Once you're ready, copy the folder's absolute path to your clipboard - 
            you'll need it for the next step.`}
          </div>

        <h4>Init Command</h4>
          <div className="p4">
            {`Run this command in your terminal, passing in the path:`}
          </div>
        
          <DocSnip code={`
npm run inquire init <absolutePath>
          `}
          height={{height: '12vh'}}
          />

        <h4>Selecting Mode</h4>
          <div className="p4">
            {`Once you press enter, the next step is choosing a setup mode (1 or 2). Inquire works
             by scanning the directory containing your Avro schemas, and interpreting its contents to 
            infer GraphQL type definitions and resolvers.
            Mode 1 will speed up setup by assuming you want all schema files interpreted into GraphQL, 
            pre-populating a config file with their file names. Mode 2 will let you be more selective
            and enter file names manually. More information on the config file can be found in the 
            "Configuration" section later on.`}
          </div>

          <DocSnip code={`
// CLI:\n
Choose MODE:\n
1: Use all files in data folder to create GQL schema\n
2: Manually specify files when filling out configuration\n
Enter 1 OR 2: <insert choice here>
          `}
          height={{height: '26.4vh'}}
          />

        <h4>Schema Folder</h4>
          <div className="p4">
            {`Lastly, choose the directory containing your relevant Avro schema(s). 
            Upon receiving the following prompt, enter the absolute path
            of this folder into your terminal and press enter.`}
          </div>

          <DocSnip code={`
// CLI: \n
Enter absolute path to folder containing schema file(s):\n
<insert path here>
          `}
          height={{height: '19.3vh'}}
          />

          <div className="p4">
            {`You should see that a folder named "Inquire" has
            been generated inside the destination folder you chose in the first step. 
            Inside this folder, you'll see a configuration file.`}
          </div>

          {/* filetree illustration here */}
          <DocSnip code={`
projectRoot/\n
├── destinationFolder/\n
    ├── +Inquire/\n
        ├── +config.js
          `}
          height={{height: '22.5vh'}}
          />

      </div>
    );
  }
}

export default InitDocs;