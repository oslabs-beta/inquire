const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Query {
    trip(id: String): Trip @topic(name: "trip", keyArgument: "id")
}
type Subscription {
    statusUpdates: Status @topic(name: "status")
}
type Trip {
    id: String!,
    vehicleId: String!,
    vehicle: Vehicle @topic(name: "vehicle", keyField: "vehicleId")
    route: [Status]
}
type Status {
    statusId: String!,
    tripId: String!,
    vehicleId: String!,
    position: Position!,
    batteryLevel: Int!,
    distance: Int!,
    timestamp: Int!
}
type Vehicle {
    id: String!,
    name: String!,
    maxRange: Int!
}
type Position {
    lat: Float!,
    lon: Float!
}

`);