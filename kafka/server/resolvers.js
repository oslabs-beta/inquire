const { PubSub } = require ('graphql-subscriptions');

const pubsub = new PubSub();

const resolvers =  {
  Subscription: {
    animals: {
      subscribe: () => pubsub.asyncIterator("ANIMALS"),
    },
    status: {
      subscribe: () => pubsub.asyncIterator('STATUS'),
    },
  },
  Query: {
    exampleQuery: () => "Add Result Here"
  }
};

module.exports = {pubsub, resolvers}