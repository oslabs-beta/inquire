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
  isLoggedIn: false,
  userName: '',
  currPage: 'home', // 'home' by default
  allPages: [ // Array of strings with each of the available "page" container components in our site
    'user portal',
    'documentation',
    'meet the team',
    'use online',
    'download npm',
    'home'
  ],
  npmLink: 'https://www.npmjs.com/', // Link to NPM package.
};

const webSessionReducer = (state = initialState, action) => {
  let isLoggedIn;
  let userName;
  let savedAvroSchemas;
  let currPage;

  switch (action.type) {
    
  // TODO: Delete below. This is an example from class
    case types.CHANGE_PAGE: {
      // Note "download NPM" doesn't reload the React website components, rather it simply links to the external NPM page.
      currPage = action.payload;
      if (currPage == 'download npm') return state;
      return {
        ...state,
        currPage
      };
    }
  //   case types.ADD_LOCATION: {
  //     newLocation = action.payload;
  //     return {
  //       ...state,
  //       newLocation
  //     };
  //   }
    
    // TODO: Delete below. This is an example from class
    // case types.ADD_CARD: {
    //   marketList = [...state.marketList];
    //   const currIndex = action.payload - 10001;
    //   marketList[currIndex].cards = marketList[currIndex].cards + 1;

    //   newTotalCards = state.totalCards + 1;
      
    //   return {
    //     ...state, 
    //     totalCards: newTotalCards,
    //     marketList
    //   };
    // }

    // TODO: Delete below. This is an example from class
    // case types.DELETE_CARD: {
    //   marketList = JSON.parse(JSON.stringify(state.marketList));
    //   const currIndex = action.payload - 10001;
    //   if (marketList[currIndex].cards > 0) {
    //     marketList[currIndex].cards = marketList[currIndex].cards - 1;
    //     newTotalCards = state.totalCards - 1;
    //     return {
    //       ...state, 
    //       totalCards: newTotalCards,
    //       marketList
    //     };
    //   }
    //   return state;
    // }

    default: {
      return state;
    }
  }
};

export default webSessionReducer;
