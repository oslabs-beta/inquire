// Apollo docs describing how to swap apollo server: 
// https://www.apollographql.com/docs/apollo-server/integrations/middleware/#swapping-out-apollo-server
// Once server is swapped, Apollo docs to use subscriptions: 
// https://www.apollographql.com/docs/apollo-server/data/subscriptions/#enabling-subscriptions

const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const typeDefs = require('./typeDefs.js');
const { resolvers, pubsub } = require('./resolvers.js')
const { createServer } = require('http');
const { execute, subscribe } = require('graphql');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { makeExecutableSchema } = require('@graphql-tools/schema');

// Server start must be wrapped in async function
(async function () {
  const app = express();

  const httpServer = createServer(app);

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const subscriptionServer = SubscriptionServer.create(
    { schema, execute, subscribe },
    { server: httpServer, path: '/graphql' }
  );

  const server = new ApolloServer({
    schema,
    plugins: [{
      async serverWillStart() {
        return {
          async drainServer() {
            subscriptionServer.close();
          }
        };
      }
    }],
  });
  await server.start();
  server.applyMiddleware({ app });

  const PORT = 3000;
  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}/graphql`)
  );
})();


// TODO: Replace with actual Kafka in correct file.
// Dummy Stream to Simulate Kafka Animals
setInterval(() => {
  pubsub.publish('ANIMALS', {
    animals: {
      category : 'CAT' , 
      noise : 'meow'
    }
  });
}, 6000);

// Dummy Stream to Simulate Kafka Status
setInterval(() => {
  pubsub.publish('STATUS', {
    status: {
      "statusId":"7e2abc58-6fdd-44fc-92d3-cd6a5d3901ad",
      "tripId":"3777488f-2705-4957-9774-6ef7b93f1180",
      "vehicleId":"88b0e76a-a8c7-44e8-a58f-4e0c271e18eb",
      "position":{"lat":0.9252176083292849,"lon":0.9599738892160283},
      "batteryLevel":1510610093,
      "distance":391601775,"timestamp":2113016417
    }
  });
}, 6000);