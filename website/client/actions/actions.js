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

export const changePageActionCreator = newPage => ({
  type: types.CHANGE_PAGE,
  payload: newPage,
})

