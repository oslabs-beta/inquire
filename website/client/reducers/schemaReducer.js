/*
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
  avroText: 'Paste AVRO schema here',
  graphQLText: 'GraphQL types generate here',
};

const schemaReducer = (state = initialState, action) => {
  let totalSchemas;

  switch (action.type) {

    case types.CONNECT_KAFKA: {
      //
    }

    case types.MAKE_GRAPHQL: {
      const graphQLTextParse = parseKafkaSchema(state.avroText);
      let graphQLText = formatGQLSchema(graphQLTextParse);
      if (!graphQLText) graphQLText = 'Unable to generate, please verify AVRO'
      return {
        ...state,
        graphQLText
      };
    }
    
    case types.CLEAR_AVRO: {
      const avroText = 'Paste AVRO schema here';
      const graphQLText = 'GraphQL types generate here';
      return {
        ...state, 
        avroText,
        graphQLText,
      };
    }

    case types.ADD_AVRO: {
      const avroText = action.payload;
      return {
        ...state, 
        avroText,
      };
    }

    case types.UPDATE_GRAPHQL: {
      const graphQLText = action.payload;
      return {
        ...state, 
        graphQLText,
      };
    }

    default: {
      return state;
    }
  }
};

export default schemaReducer;
