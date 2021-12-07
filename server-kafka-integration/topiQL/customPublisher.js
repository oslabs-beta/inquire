// Apollo subscription docs: 
// https://www.apollographql.com/docs/apollo-server/data/subscriptions/#example-authentication-with-onconnect
// GraphQL PubSub: 
// https://github.com/apollographql/graphql-subscriptions


const { PubSub } = require ('graphql-subscriptions');

export const pubsub = new PubSub();