import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavButton from './navButton.jsx';
import logoGreen from '../../assets/logoGreen.png'
import { changePageActionCreator } from '../../actions/actions.js';


const mapDispatchToProps = dispatch => (
  {
    changePage: (currPage) => dispatch(changePageActionCreator(currPage)),
  }
);

const mapStateToProps = (state) => ({
  allPages: state.webSession.allPages,
  currPage: state.webSession.currPage,
});

class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // Create an array containing as many button elements as there are pages
    // Pass corresponding text to each button. "buttonText" has values such as "home" or "meet the team"
    const navBarButtons = [];
    navBarButtons.push(<img 
      style={{leftMargin: "2px"}} 
      src={logoGreen} 
      alt="my-logo"
      onClick={({payload = 'home'}) => {this.props.changePage(payload)}
      }
      />)

    for (let i = 1; i < this.props.allPages.length; i++) {
      navBarButtons.push(<NavButton buttonText={this.props.allPages[i]}  key={`pageButton${i}`}/>);
    }
    return <div className="navBar">{navBarButtons}</div>;
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (NavBar);
