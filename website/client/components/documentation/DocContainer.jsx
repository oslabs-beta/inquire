import React, { Component } from 'react';
import DocContent from './DocContent.jsx';
import DocSidebar from './DocSidebar.jsx';

class DocContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="docContainer">
        <DocSidebar/>

        <div className="docContent">
          <DocContent/>
        </div>
        
      </div>
    );
  }
}

export default DocContainer;