const { gql } = require('apollo-server-express');

module.exports = gql`
type Query {
  exampleQuery: String!
}
type Subscription {
  passengerInfo: Passenger
  tripStatus: Status
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
type Status { 
  statusId: String 
  tripId: tripIdType 
  vehicleId: vehicleIdType 
  position: Position 
  batteryLevel: Int 
  distance: Int 
  timestamp: String 
}
type Position { 
  lat: Float 
  lon: Float 
}
enum vehicleIdType { 
  car1
  car2
}
enum tripIdType { 
  trip1
  trip2
}
`;