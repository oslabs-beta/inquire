const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Query {

}
type Subscription {

}
type Trip { 
   id: String! 
   vehicleId: String! 
   route: [Status] 
}
type Status { 
   statusId: String! 
   tripId: String! 
   vehicleId: String! 
   position: Position! 
   batteryLevel: Int! 
   distance: Int! 
   timestamp: Int! 
}
type Position { 
   lat: Float! 
   lon: Float! 
}
`);