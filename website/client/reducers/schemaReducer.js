/**
 * ************************************
 *
 * @module  schemaReducer
 * @description reducer for schema data
 *
 * ************************************
 */

import * as types from '../actions/actionTypes';
// TODO: Update so this is independent from backend.
import { parseKafkaSchema, formatGQLSchema } from './conversionFuncs.js'

const initialState = {
  totalSchemas: 0,
  avroText: '',
  graphQLText: '',
};

const schemaReducer = (state = initialState, action) => {
  let totalSchemas;

  switch (action.type) {

    case types.CONNECT_KAFKA: {
      // lastMarketId = state.lastMarketId + 1;
      // totalMarkets = state.totalMarkets + 1;
      // newLocation = state.newLocation;
      // const newMarket = {
      //   marketId: lastMarketId,
      //   location: newLocation,
      //   cards: 0
      // };
      // marketList = state.marketList.slice();
      // marketList.push(newMarket);
      // return {
      //   ...state,
      //   marketList,
      //   lastMarketId,
      //   totalMarkets,
      //   newLocation: ''
      // };
    }

    case types.MAKE_GRAPHQL: {
      const graphQLTextParse = parseKafkaSchema(state.avroText);
      const graphQLText = formatGQLSchema(graphQLTextParse);
      return {
        ...state,
        graphQLText
      };
    }
    
    // TODO: Delete below. This is an example from class
    case types.CLEAR_AVRO: {
      const avroText = action.payload;
      return {
        ...state, 
        avroText,
      };
    }

    // TODO: Delete below. This is an example from class
    case types.ADD_AVRO: {
      const avroText = action.payload;
      return {
        ...state, 
        avroText,
      };
    }

    default: {
      return state;
    }
  }
};

export default schemaReducer;
