import React, { Component } from 'react';
import DocSnip from '../DocSnip.jsx';

class SetupDocs extends Component {

  render() {
    return(
      <div className="docContentSection" id="SETUP">

        <h2>Setup</h2>

        <h4>Installing Inquire</h4>
          <div className="p4">
            {`Install the Inquire NPM package in your project's root directory. 
            To do this, execute this command in your terminal:`}
          </div>

        <DocSnip code={`
npm install --save @inquire/inquire-kafka
        `}
        height={{height: '12vh'}}
        />
        

        <div className="p4">
          {`After installing the package, you should be able to see "inquire" as a dependency 
          in your package.json file.`}
        </div>

        <DocSnip code={`
"dependencies": {\n
  "@inquire/inquire-kafka": "^1.0.7"\n
}
          `}
        height={{height: '19.3vh'}}
        />

        <h4>Adding the Script</h4>
          <div className="p4">
            {`While still inside your package.json file, you'll need to add a script in order to
            run Inquire's custom CLI commands. The name of the script can be anything you'd like,
            and set it to run "inquire".`}
          </div>
          
          <div className="p4" style={{marginTop : '2vh', marginBottom : '2vh'}}>{`Here's an example:`}</div>
          
          <DocSnip code={`
"scripts": {\n
  "inquire": "inquire-kafka"\n
}
          `}
        height={{height: '19.3vh'}}
        />

      </div>
    );
  }
}

export default SetupDocs;