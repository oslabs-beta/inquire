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
  currPage: 'meet the team', // 'home' by default
  allPages: [ // Array of strings with each of the available "page" container components in our site
    'home',
    'download npm',
    'github',
    'documentation',
    'use online',
    'meet the team',
  ],
  npmLink: 'https://www.npmjs.com/', // Link to NPM package.
  githubLink: "https://github.com/oslabs-beta/topiQL", // Link to Github
};

const webSessionReducer = (state = initialState, action) => {
  let currPage;

  switch (action.type) {
    case types.CHANGE_PAGE: {
      // Note "download npm" and "github" doesn't reload the React website components, rather it simply links to the external NPM page.
      currPage = action.payload;
      if (currPage == 'download npm') return state;
      if (currPage == 'github') return state;
      return {
        ...state,
        currPage
      };
    }

    default: {
      return state;
    }
  }
};

export default webSessionReducer;
