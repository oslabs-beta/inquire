/**
 * ************************************
 *
 * @module  actions.js
 * @description Action Creators
 *
 * ************************************
 */

// import actionType constants
import * as types from './actionTypes';
import axios from 'axios';

// Schema generation action generators

export const connectKafkaActionCreator = () => ({
  type: types.CONNECT_KAFKA,
});

export const makeGraphQLActionCreator = () => ({
  type: types.MAKE_GRAPHQL,
});

export const clearAvroActionCreator = () => ({
  type: types.CLEAR_AVRO,
  payload: '',
});

export const addAvroActionCreator = (avroText) => ({
  type: types.ADD_AVRO,
  payload: avroText,
});

export const updateGraphQLActionCreator = (graphQLText) => ({
  type: types.UPDATE_GRAPHQL,
  payload: graphQLText,
});

// Web session action generators
export const changePageActionCreator = (newPage) => ({
  type: types.CHANGE_PAGE,
  payload: newPage,
});

/*
export const loginSignupActionCreator =
  (username, password, needsAccount) => (dispatch) => {
    let queryObj = {};

    if (!needsAccount) {
      queryObj = {
        query: `
          query {
            login(email: "${username}", password: "${password}") {
              _id
              createdSchemas {
                _id
              }
            }
          }
        `,
      };
    } else {
      queryObj = {
        query: `
          mutation {
            createUser(userInput: {email: "${username}", password: "${password}"}) {
              _id
              email
            }
          }
        `,
      };
    }

    const request = {
      method: 'POST',
      body: JSON.stringify(queryObj),
      url: 'http://localhost:3000/graphql',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    axios
      .request(request)
      // .then((res) => {
      //   if (res.status !== 200 && res.status !== 201) {
      //     throw new Error('Failed!');
      //   }
      //   return res.json();
      // })
      .then((resData) => {
        // if (res.status !== 200 && res.status !== 201) {}
        //     throw new Error('Failed!');
        if (resData.data.login) {
          // console.log('resData login--->', resData.data.login.createdSchemas);
          dispatch({
            type: types.LOGIN_SIGNUP,
            payload: {
              userMongoId: resData.data.login._id,
              isLoggedIn: true,
              schemaIds: resData.data.login.createdSchemas,
              username: username,
            },
          });
        } else if (resData.data.createUser) {
          // console.log('resData createUser--->', resData.data.createUser._id);
          dispatch({
            type: types.LOGIN_SIGNUP,
            payload: {
              userMongoId: resData.data.createUser._id,
              isLoggedIn: true,
              schemaIds: resData.data.createUser.createdSchemas,
              username: username,
            },
          });
        } else throw new Error('No username created or found');
      })
      .catch((err) => {
        console.error('catch err--->', err);
        dispatch({
          type: types.LOGIN_SIGNUP,
          payload: {
            userMongoId: '',
            isLoggedIn: false,
            schemaIds: [],
            username: '',
          },
        });
      });
  };

export const addEmailActionCreator = (email) => ({
  type: types.ADD_EMAIL,
  payload: email,
});

export const addPasswordActionCreator = (password) => ({
  type: types.ADD_PASSWORD,
  payload: password,
});
*/