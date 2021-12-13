/**
 * ************************************
 *
 * @module  App.jsx
 *
 * ************************************
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './stylesheets/styles.scss';

import NavBar from './components/navBar/navBar.jsx';
import HomeContainer from './components/home/homeContainer.jsx';
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
  currPage: state.webSession.currPage,
});

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const displayComponents = [];
    displayComponents.push(<NavBar key="navBar"/>)
    console.log(this.props.currPage)
    switch (this.props.currPage) {
      case 'home' :
        displayComponents.push(<HomeContainer key="homeContainer"/>)
    }
    return (
      <div className="app">
        {displayComponents}
      </div>
    );
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (App);
