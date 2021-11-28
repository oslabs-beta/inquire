// TODO: THIS IS A WORKING FILE TO FIGURE OUT GRAPHQL SUBSCRIPTION INTEGRATION
// TODO: DELETE WHEN READY TO MIGRATE TO TOOL

// Installed packages: npm install --save express-graphql graphql
const express = require('express');
const bodyParser = require('body-parser');

// Below: packge exports a function that can act as a middleware function that takes incoming requests and funnels through GraphQL query parser and funnels through correct resolver
const { graphqlHTTP } = require('express-graphql');
// Below: package exports an object. We will use the following properties: buildSchema(function accepting a template literal string) and will genereate a schema object based on string.
const { buildSchema, execute, subscribe } = require('graphql');

//Node JS http module
const { createServer } = require('http');

// Specific Apollo packages to manage GraphQL Subscription. Following this tutorial: https://httptoolkit.tech/blog/simple-graphql-server-without-apollo/
const { PubSub } = require('graphql-subscriptions');
const { SubscriptionServer } = require('subscriptions-transport-ws');

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World');
})

// As example set an "events objects" in place of a DB
const statusArr = [{ "statusId": "status1", "tripId": "trip1", "vehicleId": "car1", "position": { "lat": 40.27363204956055, "lon": -70.15646362304688 }, "batteryLevel": 89, "distance": 5, "timestamp": "Sat Nov 27 2021 14:59:01 GMT-0500 (Eastern Standard Time)" }];

//const events = [];

// All requests coming into the single endpoint for graphQL queries, will want to pass through the express middleware function. It accepts two arguments: a schema, and a rootValue, pointing to JS object with all resolver functions.
// Note rootvalue will be a bundle of all the resolvers.'
// If want to filter a query, would add it as an argument to the query in the schema
// By setting graphiQL to true can access user interphase by visiting the server / graphql.
// Within the graphiQL visualizer, hit "control + space" to autocomplete and see available options
// MUST BE double quotes when writing strings in queries

// Because graphQL is typed, we can add types for the different objects, such as Event. Graph has a type of variable which signals it is a unique type of id.
// No date types in graphQL. ! signals it cant be null
// Input keyword tells graphQL that this specific data type will be used in mutations
const table = {
  "trip1": 299,
  "trip2": 403
}

const schema = buildSchema(`
  type Animal {
    category: String!
    noise: String!
  }
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
    status: [Status!]!
  }
  type Subscription {
    animals: Animal!
  }
    `);

  // There will only be one instance of PubSub in the server
  const pubsub = new PubSub();

  const rootValue = {
      status: () => {
        return statusArr;
      },
      animals: () => {
        pubsub.asyncIterator("ANIMALS")
      }
    }
  
  app.use(graphqlHTTP({
    schema,
    rootValue,
    graphiql: true,
  }));

const PORT = 3000;
// Start the server:
const server = app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// Handle incoming websocket subscriptions too:
SubscriptionServer.create({ schema, rootValue, execute, subscribe }, {
    server
})

// Enpoint to handle incoming websocket subscriptions to:
// This is necessary because this endpoint won’t be a simple HTTP handler. 
// It will instead work with a WebSocket connection, which will be kept open between the server and subscribed clients.


// Handle specific publishing
// pubsub.publish("ANIMALS", {
//   category : "CAT" , 
//   noise : "meow"
// });

setInterval(() => {
  console.log('publishing')
  pubsub.publish("ANIMALS", {
    category : "CAT" , 
    noise : "meow"
  });
}, 3000);

