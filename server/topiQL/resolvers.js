const { pubsub } = require('./kafkaPublisher.js')

    // GraphQL Resolvers
    module.exports = {
      Subscription: {
        tripStatus: {
          subscribe: () => pubsub.asyncIterator('TRIPSTATUS'),
        },
        testing1: {
          subscribe: () => pubsub.asyncIterator('TESTING1'),
        },
        testing2: {
          subscribe: () => pubsub.asyncIterator('TESTING2'),
        },
      },
      Query: {
        exampleQuery: () => "Add Result Here"
      }
    }
    