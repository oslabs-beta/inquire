const { pubsub } = require('./kafkaPublisher.js')

// GraphQL Resolvers
module.exports = {
  Subscription: {
    tripStatus: {
      subscribe: () => pubsub.asyncIterator('TRIPSTATUS'),
    },
  },
  Query: {
    exampleQuery: () => "Add Result Here"
  }
}
    