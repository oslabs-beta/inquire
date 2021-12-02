const { gql } = require('apollo-server-express');

// GraphQL Schema
module.exports = gql`
  type Status { 
    statusId: String! 
    tripId: String! 
    vehicleId: String! 
    position: Position! 
    batteryLevel: Int! 
    distance: Int! 
    timestamp: String! 
  }
  type Position { 
    lat: Float! 
    lon: Float! 
  }
  type Trip { 
    id: String! 
    vehicleId: String! 
    route: [Status] 
  } 
  type Query {
    exampleQuery: String!
  }
  type Subscription {
    status: Status!
  }
`;