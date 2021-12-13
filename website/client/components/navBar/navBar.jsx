import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavButton from './navButton.jsx';
// import { changePageActionCreator } from '../../actions/actions.js';

const mapDispatchToProps = dispatch => (
  {
    // addCard: (id) => dispatch(addCardActionCreator(id)),
    // deleteCard: (id) => dispatch(deleteCardActionCreator(id))
  }
);

const mapStateToProps = state => ({
  allPages: state.webSession.allPages,
});

class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const navBarButtons = [];
    for (let i = 0; i < this.props.allPages.length; i++) {
      navBarButtons.push(<NavButton buttonText={this.props.allPages[i]}  key={`pageButton${i}`}/>);
    }
    return(
      <div className="navBar">
        {/* <div className="p4">Something</div> */}
        {/* <p><b>Location: </b> { this.props.marketInfo.location }</p>
        <p><b>Cards: </b> { this.props.marketInfo.cards }</p>
        <p><b>% of total: </b> { Math.round(this.props.marketInfo.cards / this.props.totalCards * 100) }</p> */}
        {navBarButtons}
        {/* <button onClick={({payload = this.props.marketInfo.marketId}) => this.props.addCard(payload)} type='button'>Add Card</button>
        <button onClick={({payload = this.props.marketInfo.marketId}) => this.props.deleteCard(payload)} type='button'>Delete Card</button> */}
      </div>
    );
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (NavBar);
