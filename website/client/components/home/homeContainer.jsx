import React, { Component } from 'react';
import { connect } from 'react-redux';
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
        {/* <p><b>Location: </b> { this.props.marketInfo.location }</p>
        <p><b>Cards: </b> { this.props.marketInfo.cards }</p>
        <p><b>% of total: </b> { Math.round(this.props.marketInfo.cards / this.props.totalCards * 100) }</p>
        <button onClick={({payload = this.props.marketInfo.marketId}) => this.props.addCard(payload)} type='button'>Add Card</button>
        <button onClick={({payload = this.props.marketInfo.marketId}) => this.props.deleteCard(payload)} type='button'>Delete Card</button> */}
      </div>
    );
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (HomeContainer);