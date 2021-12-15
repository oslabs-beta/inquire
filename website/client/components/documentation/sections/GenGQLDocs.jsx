import React, { Component } from 'react';

class GenGQLDocs extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return(
      <div className="docContentSection" id="GENGQL">
        <h2>Generating GraphQL</h2>
        <div className="p4">
          {`Preview of the current section`}
        </div>
        <h4>Build Command</h4>
        <div className="p4">
          {`Description of what's going on`}
        </div>
        <h4>How it Works</h4>
        <div className="p4">
          {`Description of what's going on`}
        </div>
        <h4>What Files are Generated?</h4>
        <div className="p4">
          {`Description of what's going on`}
        </div>
        <div className="p4" style={{marginTop : '2vh', marginBottom : '2vh'}}>Here's an example</div>
      </div>
    );
  }
}

export default GenGQLDocs;