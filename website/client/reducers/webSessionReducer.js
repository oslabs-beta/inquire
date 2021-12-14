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
  savedAvroSchemas: [], // Array of objects, each with three keys: 'name', 'avro', 'graphQL'
  currPage: 'home',
  allPages: [
    'user portal',
    'documentation',
    'meet the team',
    'use online',
    'download npm',
    'home',
  ],
};

const webSessionReducer = (state = initialState, action) => {
  let isLoggedIn;
  let userName;
  let savedAvroSchemas;
  let currPage;

  switch (action.type) {
    // TODO: Delete below. This is an example from class
    case types.CHANGE_PAGE: {
      currPage = action.payload;
      return {
        ...state,
        currPage,
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
