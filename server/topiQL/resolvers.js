const kafkaEventToAsyncIterator = require('./asyncIterator.js')

    // GraphQL Resolvers
    module.exports = {
      Subscription: {
        tripStatus: {
          subscribe: () => kafkaEventToAsyncIterator('tripStatus'),
        },
        passengerInfo: {
          subscribe: () => kafkaEventToAsyncIterator('passengerInfo'),
        },
      },
      Query: {
        exampleQuery: () => "Add Result Here"
      }
    }
    