const { gql } = require('apollo-server-express');

module.exports = gql`
type Query {
  exampleQuery: String!
}
type Subscription {
  avscTopic: Trip
  han: animals
  cece: Passenger
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
type animals { 
  category: categoryType 
  noise: String 
}
enum categoryType { 
  DOG
  CAT
}
type Passenger { 
  name: nameType 
  street: emailType 
}
enum emailType { 
  CherryLane
  FifthAvenue
  FourteenthStreet
  PerlmanRoad
  BroadStreet
  SecondAvenue
  BleekerStreet
  LexingtonAvenue
}
enum nameType { 
  Carla
  Joseph
  Megan
  Roland
  Stacey
  Maria
  Henry
  Peter
}
`;