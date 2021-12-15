import React, { Component } from 'react';
import DocSnip from '../DocSnip.jsx';

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
        
          <DocSnip code={`
npm run inquire init <absolutePath>
          `}
          height={{height: '12vh'}}
          />

        <h4>Selecting Mode</h4>
          <div className="p4">
            {`Once you press enter, the next step is choosing the mode (1 or 2). Inquire works by
            scanning the directory containing your Avro schemas, and interpreting its contents to 
            infer the GraphQL types and resolvers. Choosing the right mode will
            let you specify whether there are only a few files in the folder you want interpreted, 
            or if you'd like them all to be accounted for in the GraphQL schema.`}
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
            {`Once you've chosen the appropriate mode, the last initialization step is to enter the
            location of your relevant Avro schema(s). Upon receiving the prompt, enter the absolute path
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
            {`Immediately following the command, you should see that a folder named "Inquire" has
            been generated inside the destination folder you specified in the first step. 
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