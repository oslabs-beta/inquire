const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Query {

}
type Subscription {

}
type Trip { 
  id: String 
  vehicleId: String 
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
`);