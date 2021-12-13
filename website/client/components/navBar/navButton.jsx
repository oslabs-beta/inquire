import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changePageActionCreator } from '../../actions/actions.js';

const mapDispatchToProps = dispatch => (
  {
    changePage: (currPage) => dispatch(changePageActionCreator(currPage)),
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
    // Create an array containing navigation bar button element
    // Set className to "paragraph 4 bold" if this button corresponds to currently active page
    const navButtonElement = [];
    let isCurrPage;
    this.props.buttonText == this.props.currPage ? isCurrPage = true : isCurrPage = false;
    isCurrPage ? 
      navButtonElement.push(<div className="p4b" key={this.props.buttonText}> { this.props.buttonText } </div>) :
      navButtonElement.push(<div className="p4" key={this.props.buttonText}> { this.props.buttonText } </div>)

    return(
      <div className="navButton"
      // Upon button click, trigger an action to change currPage property of state to the selected page
      onClick={({payload = this.props.buttonText}) => this.props.changePage(payload)}>
        { navButtonElement }
      </div>
    );
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (NavButton);
