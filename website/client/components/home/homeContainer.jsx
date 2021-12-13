import React, { Component } from 'react';
import { connect } from 'react-redux';

import DescriptionImage from './descriptionImage.jsx';
import DescriptionBox from './descriptionBox.jsx';
// import { addCardActionCreator } from '../actions/actions';
// import { deleteCardActionCreator } from '../actions/actions';

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

class HomeContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="homeContainer">
        <DescriptionImage/>
        <DescriptionBox/>
      </div>
    );
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (HomeContainer);