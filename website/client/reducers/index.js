/**
 * ************************************
 *
 * @module  index.js
 * @description simply a place to combine reducers
 *
 * ************************************
 */

import { combineReducers } from 'redux';

// import all reducers here
import schemaReducer from './schemaReducer';
import webSessionReducer from './webSessionReducer';

// combine reducers
const reducers = combineReducers({
  // if we had other reducers, they would go here
  schemas: schemaReducer,
  webSession: webSessionReducer,
});

// make the combined reducers available for import
export default reducers;
