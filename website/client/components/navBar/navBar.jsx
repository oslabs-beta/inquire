import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavButton from './navButton.jsx';

const mapStateToProps = (state) => ({
  allPages: state.webSession.allPages,
});

class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // Create an array containing as many button elements as there are pages
    // Pass corresponding text to each button. "buttonText" has values such as "home" or "meet the team"
    const navBarButtons = [];
    for (let i = 0; i < this.props.allPages.length; i++) {
      navBarButtons.push(
        <NavButton buttonText={this.props.allPages[i]} key={`pageButton${i}`} />
      );
    }
    return <div className="navBar">{navBarButtons}</div>;
  }
}

export default connect(mapStateToProps, null)(NavBar);
