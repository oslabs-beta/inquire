/**
 * ************************************
 *
 * @module  pageNavigationReducer
 * @description reducer for page settings and navigation data
 *
 * ************************************
 */

import * as types from '../actions/actionTypes';

const initialState = {
  username: '',
  password: '',
  userId: '',
  schemaIds: [],
  isLoggedIn: false,
  currPage: 'home', // 'home' by default
  allPages: [
    // Array of strings with each of the available "page" container components in our site
    'user portal',
    'documentation',
    'meet the team',
    'use online',
    'download npm',
    'home',
  ],
  npmLink: 'https://www.npmjs.com/', // Link to NPM package.
};

const webSessionReducer = (state = initialState, action) => {
  let username;
  let password;
  let userId;
  let schemaIds;
  let isLoggedIn;
  let currPage;
  let allPages;
  let npmLink;

  switch (action.type) {
    case types.CHANGE_PAGE: {
      // Note "download NPM" doesn't reload the React website components, rather it simply links to the external NPM page.
      currPage = action.payload;
      if (currPage === 'download npm') return state;
      return {
        ...state,
        currPage,
      };
    }
    case types.ADD_EMAIL: {
      username = action.payload;
      return {
        ...state,
        username,
      };
    }
    case types.ADD_PASSWORD: {
      password = action.payload;
      return {
        ...state,
        password,
      };
    }
    case types.LOGIN_SIGNUP: {
      userId = action.payload.userMongoID;
      // username = action.payload.username;
      isLoggedIn = action.payload.isLoggedIn;
      schemaIds = action.payload.schemaIds;
      // password = '';
      return {
        ...state,
        userId,
        // username,
        isLoggedIn,
        schemaIds,
        // password,
      };
    }

    default: {
      return state;
    }
  }
};

export default webSessionReducer;
