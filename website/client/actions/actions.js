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
