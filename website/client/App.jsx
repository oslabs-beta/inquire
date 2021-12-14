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
import ConverterContainer from './components/converter/converterContainer.jsx';
import PortalContainer from './components/user/PortalContainer.jsx';
import TeamContainer from './components/team/teamContainer.jsx';

// import { addCardActionCreator } from '../actions/actions';
// import { deleteCardActionCreator } from '../actions/actions';

const mapDispatchToProps = (dispatch) => ({
  // addCard: (id) => dispatch(addCardActionCreator(id)),
  // deleteCard: (id) => dispatch(deleteCardActionCreator(id))
});

const mapStateToProps = (state) => ({
  // add pertinent state here
  currPage: state.webSession.currPage,
});

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const displayComponents = [];
    displayComponents.push(<NavBar key="navBar" />);
    switch (this.props.currPage) {
      case 'home':
        displayComponents.push(<HomeContainer key="homeContainer" />);
        break;
      case 'use online':
        displayComponents.push(<ConverterContainer key="converterContainer" />);
        break;
      case 'user portal':
        displayComponents.push(<PortalContainer key="portalContainer" />);
        break;
      case 'meet the team':
        displayComponents.push(<TeamContainer key="teamContainer" />);
        break;
    }
    return <div className="app">{displayComponents}</div>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
