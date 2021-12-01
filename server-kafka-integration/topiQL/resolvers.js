const { pubsub } = require('./kafkaPublisher.js')

// GraphQL Resolvers
module.exports = {
  Subscription: {
    status: {
      subscribe: () => pubsub.asyncIterator('STATUS'),
    },
  },
  Query: {
    exampleQuery: () => "Add Result Here"
  }
}