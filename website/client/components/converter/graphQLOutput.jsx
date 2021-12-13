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

class GraphQLOutput extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return(
      <div className="inputOutputBox">
      </div>
    );
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (GraphQLOutput);
