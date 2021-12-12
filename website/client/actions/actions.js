/**
 * ************************************
 *
 * @module  actions.js
 * @description Action Creators
 *
 * ************************************
 */

// import actionType constants
import * as types from '../constants/actionTypes';

// TODO: replace below with actual action creators
export const doSomethingActionCreator = () => ({
  type: types.ADD_SCHEMA,
});

export const doAnotherThingActionCreator = schemaText => ({
  type: types.MAKE_SCHEMA,
  payload: schemaText,
})

