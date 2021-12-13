import React, { Component } from 'react';
import { connect } from 'react-redux';
import AvroInput from './avroInput.jsx';
import GraphQLOutput from './graphQLOutput.jsx';
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

class ConvertingBox extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return(
      <div className="convertingBox">
        <AvroInput/>
        <GraphQLOutput/>
      </div>
    );
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (ConvertingBox);
