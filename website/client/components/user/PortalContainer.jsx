import React, { Component } from 'react';
import Context from '../../context/context';
// import { connect } from 'react-redux';
// import Login from './Login.jsx';
// import Logout from './Logout.jsx';

class PortalContainer extends Component {
  // state = {
  //   isLogin: true,
  // };

  static contextType = Context;

  constructor(props) {
    super(props);
    // this.username = React.createRef();
    // this.password = React.createRef();
    this.state = {
      email: '',
      password: '',
      isLogin: true,
    };
    this.switchModeHandler = this.switchModeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  switchModeHandler = (e) => {
    e.preventDefault();
    console.log('in switch mode block');
    console.log(!this.state.isLogin);
    return this.setState({
      ...this.state,
      isLogin: !this.state.isLogin,
    });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    return this.setState({
      ...this.state,
      [name]: value,
    });
  };

  submitHandler = (e) => {
    // console.log('clicked!');
    // console.log(this.state.email);
    e.preventDefault();

    let requestBody = {
      query: `
        query {
          login(email: "${this.state.email}", password: "${this.state.password}") {
            userId
            token
            tokenExpiration
          }
        }
      `,
    };

    if (!this.state.isLogin) {
      requestBody = {
        query: `
          mutation {
            createUser(userInput: {email: "${this.state.username}", password: "${this.state.password}"}) {
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
        // if (res.status !== 200 && res.status !== 201) {
        //   throw new Error('Failed!');
        // }
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        if (resData.data.login.token) {
          this.context.login(
            resData.data.login.token,
            resData.data.login.userId,
            resData.data.login.tokenExpiration
          );
        }
      })
      .catch((err) => {
        console.error('catch err--->', err);
      });
  };

  render() {
    return (
      <div className="portalContainer">
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
        <div className="authBtns">
          <button type="submit" onClick={this.submitHandler}>
            Submit
          </button>
          <button type="button" onClick={this.switchModeHandler}>
            {this.state.isLogin ? 'Sign up' : 'Log in'}
          </button>
        </div>
      </div>
    );
  }
}
export default PortalContainer;
