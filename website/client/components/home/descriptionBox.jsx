import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { changePageActionCreator } from '../../actions/actions.js';

const mapDispatchToProps = dispatch => (
  {
    // addCard: (id) => dispatch(addCardActionCreator(id)),
    // deleteCard: (id) => dispatch(deleteCardActionCreator(id))
  }
);

const mapStateToProps = state => ({
  // add pertinent state here
  // totalCards: state.markets.totalCards,
  // totalMarkets: state.markets.totalMarkets,
});

class DescriptionBox extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const descriptionText1 = `
      Topic is an NPM package that allows developers to quickly serve a GraphQL endpoint
      associated with one or more Kafka topics. The module is able to infer a complete
      set of GraphQL schemas, resolvers, and async iterators from AVRO schemas provided by 
      the end user. Package is currently developed around a GraphQL Apollo server.
    `
    return(
      <div className="descriptionBox">
        <h1>TOPIC</h1>
        <div className="p1">{ descriptionText1 }</div>
      </div>
    );
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (DescriptionBox);
