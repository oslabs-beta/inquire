import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changePageActionCreator } from '../../actions/actions.js';

const mapDispatchToProps = (dispatch) => ({
  changePage: (currPage) => dispatch(changePageActionCreator(currPage)),
});

const mapStateToProps = (state) => ({
  currPage: state.webSession.currPage,
  npmLink: state.webSession.npmLink,
  githubLink: state.webSession.githubLink,
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
    this.props.buttonText == this.props.currPage
      ? (isCurrPage = true)
      : (isCurrPage = false);
    isCurrPage
      ? navButtonElement.push(
          <div className="p4b" key={this.props.buttonText}>
            {' '}
            {this.props.buttonText}{' '}
          </div>
        )
      : navButtonElement.push(
          <div
            className="p4"
            id={this.props.buttonText}
            key={this.props.buttonText}
          >
            {' '}
            {this.props.buttonText}{' '}
          </div>
        );

    return (
      <div
        className="navButton"
        // Upon button click, trigger an action to change currPage property of state to the selected page
        onClick={({ payload = this.props.buttonText }) => {
          // If clicked link is "download npm", take user to NPM page.
          if (payload == 'download') window.open(this.props.npmLink, '_blank');
          // If clicked link is "github", take user to Github page.
          if (payload == 'github') window.open(this.props.githubLink, '_blank');
          // Otherwise, load appropriate component from the product site.
          else this.props.changePage(payload);
        }}
      >
        {navButtonElement}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavButton);
