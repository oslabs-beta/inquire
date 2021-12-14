import React, { Component } from 'react';
import { connect } from 'react-redux';
import buttonCopyText from '../../assets/buttonCopyText.png'
import { updateGraphQLActionCreator } from '../../actions/actions.js';

const mapDispatchToProps = dispatch => (
  {
    updateGraphQL: (text) => dispatch(updateGraphQLActionCreator(text)),
  }
);

const mapStateToProps = state => ({
  graphQLText: state.schemas.graphQLText,
});

class GraphQLOutput extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return(
      <div className="p7">
        {/* Clickable image copies contents of textarea into clipboard */}
        <img
            className="copyTextButton" 
            src={buttonCopyText} 
            alt="my-logo"
            onClick={() => {navigator.clipboard.writeText(this.props.graphQLText)}}
          />
        {/* Text areas where AVRO schema is pasted and/or GraphQL schema is generated */}
        <textarea
        className="inputOutputBox"
        onChange={(e) => { this.props.updateGraphQL(e.target.value) }}
        value={this.props.graphQLText}
        />
        </div>
    );
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (GraphQLOutput);
