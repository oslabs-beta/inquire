import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changePageActionCreator } from '../../actions/actions.js';

const mapDispatchToProps = dispatch => (
  {
    changePage: (currPage) => dispatch(changePageActionCreator(currPage)),
    // deleteCard: (id) => dispatch(deleteCardActionCreator(id))
  }
);

const mapStateToProps = state => ({
  currPage: state.webSession.currPage,
});

class NavButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let isCurrPage;
    this.props.buttonText == this.props.currPage ? isCurrPage = true : isCurrPage = false;
    const navButtonElement = [];
    if (isCurrPage) {
      navButtonElement.push(<div className="p4b"> { this.props.buttonText } </div>)
    }
    else navButtonElement.push(<div className="p4"> { this.props.buttonText } </div>)

    return(
      <div className="navButton"
      onClick={({payload = this.props.buttonText}) => this.props.changePage(payload)}>
        { navButtonElement }
        {/* <p><b>% of total: </b> { Math.round(this.props.marketInfo.cards / this.props.totalCards * 100) }</p>
        <button onClick={({payload = this.props.marketInfo.marketId}) => this.props.addCard(payload)} type='button'>Add Card</button>
        <button onClick={({payload = this.props.marketInfo.marketId}) => this.props.deleteCard(payload)} type='button'>Delete Card</button> */}
      </div>
    );
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (NavButton);
