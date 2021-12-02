const { gql } = require('apollo-server-express');

module.exports = gql`
type Query {
  exampleQuery: String!
}
type Subscription {
  tripStatus: Status
}
type Trip { 
  id: String 
  vehicleId: String 
  route: [Status] 
}
type Status { 
  statusId: String 
  tripId: String 
  vehicleId: String 
  position: Position 
  batteryLevel: Int 
  distance: Int 
  timestamp: String 
}
type Position { 
  lat: Float 
  lon: Float 
}
`;