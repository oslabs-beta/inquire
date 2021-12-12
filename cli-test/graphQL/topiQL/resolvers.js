const kafkaEventToAsyncIterator = require('./asyncIterator.js')

    // GraphQL Resolvers
    module.exports = {
      Subscription: {
        avscTopic: {
          subscribe: () => kafkaEventToAsyncIterator('avscTopic'),
        },
        han: {
          subscribe: () => kafkaEventToAsyncIterator('han'),
        },
        cece: {
          subscribe: () => kafkaEventToAsyncIterator('cece'),
        },
      },
      Query: {
        exampleQuery: () => "Add Result Here"
      }
    }
    