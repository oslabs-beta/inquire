import React, { Component } from 'react';
import Context from '../../context/context';
// import { connect } from 'react-redux';
// import Login from './Login.jsx';
// import Logout from './Logout.jsx';

class PortalContainer extends Component {
  static contextType = Context;

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      needsAccount: false,
      userId: '',
      isLoggedIn: false,
    };
    this.switchModeHandler = this.switchModeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  switchModeHandler(e) {
    e.preventDefault();
    return this.setState({
      ...this.state,
      needsAccount: !this.state.needsAccount,
    });
  }

  handleChange(e) {
    const { name, value } = e.target;
    return this.setState({
      ...this.state,
      [name]: value,
    });
  }

  submitHandler(e) {
    e.preventDefault();

    let requestBody = {
      query: `
        query {
          login(email: "${this.state.email}", password: "${this.state.password}") {
            _id
            createdSchemas {
              _id
            }
          }
        }
      `,
    };

    if (this.state.needsAccount) {
      console.log(this.state.email);
      requestBody = {
        query: `
          mutation {
            createUser(userInput: {email: "${this.state.email}", password: "${this.state.password}"}) {
              _id
              email
            }
          }
        `,
      };
    }

    console.log(requestBody);

    fetch('http://localhost:3000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then((resData) => {
        if (resData.data.login) {
          console.log('resData login--->', resData.data.login.createdSche);
          this.setState({
            ...this.state,
            userId: resData.data.login._id,
            isLoggedIn: true,
          });
        } else if (resData.data.createUser) {
          console.log('resData createUser--->', resData.data.createUser._id);
          this.setState({
            ...this.state,
            userId: resData.data.createUser._id,
            isLoggedIn: true,
          });
        }
        console.log('new state id--->', this.state.userId);
      })
      .catch((err) => {
        console.error('catch err--->', err);
      });
  }

  render() {
    return (
      <div className="portalContainer">
        <button type="button" onClick={this.switchModeHandler}>
          {this.state.needsAccount ? 'Sign in' : 'Create an Account'}
        </button>
        <div className="authInputs">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="email"
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            onChange={this.handleChange}
          />
        </div>

        <button type="button" onClick={this.submitHandler}>
          {this.state.needsAccount ? 'Create' : 'Log in'}
        </button>
      </div>
    );
  }
}
export default PortalContainer;
