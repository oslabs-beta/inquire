import React, { Component } from 'react';
import DocSnip from '../DocSnip.jsx';

class SetupDocs extends Component {

  render() {
    return(
      <div className="docContentSection" id="SETUP">

        <h2>Setup</h2>
          <div className="p4">
            {`How to integrate Inquire into your workspace.`}
          </div>

        <h4>Installing Inquire</h4>
          <div className="p4">
            {`Install the Inquire NPM package in your project's root directory. 
            To do this, execute this command in your terminal:`}
          </div>

        <DocSnip code={`
npm install --save inquire
        `}
        height={{height: '12vh'}}
        />
        

        <div className="p4">
          {`After installing the package, you should be able to see "inquire" as a dependency 
          in your package.json file.`}
        </div>

        <DocSnip code={`
"dependencies": {\n
  "inquire": "^1.0.2"\n
}
          `}
        height={{height: '19.3vh'}}
        />

        <h4>Adding the Script</h4>
          <div className="p4">
            {`So now you have Inquire as a dependency in your package.json. The
            crucial next step is adding a script to this file so that you can
            run custom CLI commands. You can name this script anything you want,
            but be sure to set it to run "inquire". `}
          </div>
          
          <div className="p4" style={{marginTop : '2vh', marginBottom : '2vh'}}>{`Here's an example:`}</div>
          
          <DocSnip code={`
"scripts": {\n
  "inquire": "inquire"\n
}
          `}
        height={{height: '19.3vh'}}
        />

      </div>
    );
  }
}

export default SetupDocs;