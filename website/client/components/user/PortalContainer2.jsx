import React, { Component } from 'react';
// import Context from '../../context/context';
import { connect } from 'react-redux';
import {
  loginSignupActionCreator,
  addEmailActionCreator,
  addPasswordActionCreator,
} from '../../actions/actions.js';

const mapDispatchToProps = (dispatch) => ({
  loginSignup: (username, password, isSigningUp) =>
    dispatch(loginSignupActionCreator(username, password, isSigningUp)),
  addEmail: (username) => dispatch(addEmailActionCreator(username)),
  addPassword: (password) => dispatch(addPasswordActionCreator(password)),
});

const mapStateToProps = (state) => ({
  username: state.webSession.username,
  password: state.webSession.password,
  userId: state.webSession.userId,
  isLoggedIn: state.webSession.isLoggedIn,
});
class PortalContainer extends Component {
  // static contextType = Context;

  constructor(props) {
    super(props);
    // this.switchModeHandler = this.switchModeHandler.bind(this);
    // this.submitHandler = this.submitHandler.bind(this);
    // this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return (
      <div className="portalContainer">
        <div className="authInputs">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="email"
            onChange={(e) => {
              this.props.addEmail(e.target.value);
            }}
            value={this.props.username}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            onChange={(e) => this.props.addPassword(e.target.value)}
          />
        </div>
        <button
          button
          type="button"
          onClick={this.props.loginSignup(
            this.props.username,
            this.props.password,
            false
          )}
        >
          {'Log in'}
        </button>
        <button
          button
          type="button"
          onClick={this.props.loginSignup(
            this.props.username,
            this.props.password,
            true
          )}
        >
          {'Create an Account'}
        </button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PortalContainer);
