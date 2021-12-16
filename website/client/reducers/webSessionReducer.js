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
  currPage: 'home', // 'home' by default
  allPages: [ // Array of strings with each of the available "page" container components in our site
    'home',
    'docs',
    'download',
    'github',
    'demo',
    'team',
  ],
  npmLink: 'https://www.npmjs.com/package/@inquire/inquire-kafka', // Link to NPM package.
  githubLink: "https://github.com/oslabs-beta/inquire", // Link to Github
};

const webSessionReducer = (state = initialState, action) => {
  let currPage;

  switch (action.type) {
    case types.CHANGE_PAGE: {
      // Note "download npm" and "github" doesn't reload the React website components, rather it simply links to the external NPM page.
      currPage = action.payload;
      if (currPage == 'download') return state;
      if (currPage == 'github') return state;
      return {
        ...state,
        currPage,
      };
    }

    default: {
      return state;
    }
  }
};

export default webSessionReducer;
