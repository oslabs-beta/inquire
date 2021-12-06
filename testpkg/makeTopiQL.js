const fs = require('fs');
const path = require('path');
//import config file
const configPath = path.resolve(__dirname, '../server/topiQL/config.js');
const config = require(configPath);

const graphqlSchemaTool = require('./tools/graphqlSchemaTool.js');

const toGraphQL = () => {
  try {
    fs.readFile(config.schemaFile, 'utf-8', function (err, data) {
      // fs.readFile('../data/testData/expAvroSample.js', 'utf-8', function (err, data) {
      // fs.readFile('../data/testData/expAvVarSample.js', 'utf-8', function (err, data) {

      // remove trails and trim the file
      const innerData = graphqlSchemaTool.getInnerKafkaSchema(data)
      //call the parsing function, format the data, write it to graphql schema file
      const parsedData = graphqlSchemaTool.parseKafkaSchema(innerData);
      const formattedData = graphqlSchemaTool.formatGQLSchema(parsedData, config)
      fs.writeFileSync(`${config.destinationFolder}/typeDefs.js`, formattedData);
    });
  } catch (err) {
    console.log(
      'there was a problem finding, reading, or parsing the file containing your avro schema'
    );
  }
};

const makeResolvers = () => {
  let subscriptions = ``;

  // Pull out name of topics from config file
  for (const topic of config.topics) {
    // Topic name version that is all caps: tripStatus --> TRIPSTATUS
    const topicAllCaps = topic.toUpperCase();
    subscriptions += `
        ${topic}: {
          subscribe: () => pubsub.asyncIterator('${topicAllCaps}'),
        },`
  }

  let result = `const { pubsub } = require('./kafkaPublisher.js')

    // GraphQL Resolvers
    module.exports = {
      Subscription: {${subscriptions}
      },
      Query: {
        exampleQuery: () => "Add Result Here"
      }
    }
    `;

  fs.writeFileSync(
    path.resolve(__dirname, '../server/topiQL/resolvers.js'),
    result
  );
};

const makePublishers = () => {
  let topicNameLine = ``;
  let publisherStatus = ``;
  for (const topic of config.topics) {
    // Topic name version that is all caps: tripStatus --> TRIPSTATUS
    const topicCapitalized = topic.charAt(0).toUpperCase() + topic.slice(1);
    const topicAllCaps = topic.toUpperCase();
    topicNameLine += `const topic${topicCapitalized} = '${topic}';
const consumer${topic} = kafka.consumer({ groupId: '${topic}-group'});
`;

    publisherStatus += `publisher${topicCapitalized}: () => {
    consumer${topic}.connect();
    consumer${topic}.subscribe({ topic: \`\${topic${topicCapitalized}}\`, fromBeginning: false });
    consumer${topic}.run({
      eachMessage: async ({ topic, partition, message }) => {
        pubsub.publish('${topicAllCaps}', {
          ${topic}: JSON.parse(message.value)
        });
      },
    });
  },
  `;
  }
  console.log(topicNameLine)

  let result = `const { Kafka } = require('kafkajs'); // NPM Package: Javascript compatible Kafka
const config = require('../../kafka/kconfig.js'); // Information about Kafka Cluster and Topics
const { PubSub } = require('graphql-subscriptions');

// This Kafka instance is hosted on the Confluent Cloud, using the credentials in kafkaConfig.js.
// Topics can be created online through confluent cloud portal
const pubsub = new PubSub();
const kafka = new Kafka(config);

// For every topic listed in config file, we can pull out a topicName and corresponding consumer
${topicNameLine}

const publishers = {
  ${publisherStatus}
}

module.exports = { publishers, pubsub };
`;


  fs.writeFileSync(
    path.resolve(__dirname, '../server/topiQL/kafkaPublisher.js'),
    result
  );
};

const oldMakePublishers = () => {
  // Pull out name of topics from config file
  const topic = config.topics[0];
  // Topic name version that is capitalized: tripStatus --> TripStatus
  const topicCapitalized = topic.charAt(0).toUpperCase() + topic.slice(1);
  // Topic name version that is all caps: tripStatus --> TRIPSTATUS
  const topicAllCaps = topic.toUpperCase();

  let result = `const { Kafka } = require('kafkajs'); // NPM Package: Javascript compatible Kafka
  const config = require('../../kafka/kconfig.js'); // Information about Kafka Cluster and Topics
  const { PubSub } = require('graphql-subscriptions');

  // This Kafka instance is hosted on the Confluent Cloud, using the credentials in kafkaConfig.js.
  // Topics can be created online through confluent cloud portal
  const pubsub = new PubSub();
  const kafka = new Kafka(config);

  // For every topic listed in config file, we can pull out a topicName and corresponding consumer
  const topicName = config.topics[0];
  const consumerTest = kafka.consumer({ groupId: \`\${topicName}-group\` });

  const publishers = {
    publisher${topicCapitalized}: () => {
      consumerTest.connect();
      consumerTest.subscribe({ topic: \`\${topicName}\`, fromBeginning: false });
      consumerTest.run({
        eachMessage: async ({ topic, partition, message }) => {
          pubsub.publish('${topicAllCaps}', {
            ${topic}: JSON.parse(message.value)
          });
        },
      });
    }
  }

  module.exports = { publishers, pubsub };
  `;

  fs.writeFileSync(
    path.resolve(__dirname, '../server/topiQL/oldKafkaPublisher.js'),
    result
  );
}

const makeServer = () => {
  // Pull out name of topics from config file
  const topic = config.topics[0];
  // Topic name version that is capitalized: tripStatus --> TripStatus
  const topicCapitalized = topic.charAt(0).toUpperCase() + topic.slice(1);
  // Topic name version that is all caps: tripStatus --> TRIPSTATUS
  const topicAllCaps = topic.toUpperCase();

  let publishers = ``;
  for (const topic of config.topics) {
    const topicCapitalized = topic.charAt(0).toUpperCase() + topic.slice(1);
    publishers += `publishers.publisher${topicCapitalized}();
  `;
  }

  let result = `// Apollo docs describing how to swap apollo server: 
  // https://www.apollographql.com/docs/apollo-server/integrations/middleware/#swapping-out-apollo-server
  // Once server is swapped, Apollo docs to use subscriptions: 
  // https://www.apollographql.com/docs/apollo-server/data/subscriptions/#enabling-subscriptions
  
  const express = require('express');
  const { createServer } = require('http');
  const { execute, subscribe } = require('graphql');
  
  const { ApolloServer } = require('apollo-server-express');
  const { SubscriptionServer } = require('subscriptions-transport-ws');
  const { makeExecutableSchema } = require('@graphql-tools/schema');
  
  // Import schema and resolvers from files.
  const typeDefs = require('./topiQL/typeDefs.js');
  const resolvers = require('./topiQL/resolvers.js');
  
  // Import "publishers" from file. 
  // These "publishers" are consumers that read messages from a kafka topic and publish to a PubSub topic.
  const { publishers } = require('./topiQL/kafkaPublisher.js');
  ${publishers}
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
      console.log(\`Server is now running on http://localhost:\${PORT}/graphql\`)
    );
  })();
  `;

  fs.writeFileSync(path.resolve(__dirname, '../server/server.js'), result);
};

const oldMakeServer = () => {
  // Pull out name of topics from config file
  const topic = config.topics[0];
  // Topic name version that is capitalized: tripStatus --> TripStatus
  const topicCapitalized = topic.charAt(0).toUpperCase() + topic.slice(1);
  // Topic name version that is all caps: tripStatus --> TRIPSTATUS
  const topicAllCaps = topic.toUpperCase();
  let result = `// Apollo docs describing how to swap apollo server: 
  // https://www.apollographql.com/docs/apollo-server/integrations/middleware/#swapping-out-apollo-server
  // Once server is swapped, Apollo docs to use subscriptions: 
  // https://www.apollographql.com/docs/apollo-server/data/subscriptions/#enabling-subscriptions
  
  const express = require('express');
  const { createServer } = require('http');
  const { execute, subscribe } = require('graphql');
  
  const { ApolloServer } = require('apollo-server-express');
  const { SubscriptionServer } = require('subscriptions-transport-ws');
  const { makeExecutableSchema } = require('@graphql-tools/schema');
  
  // Import schema and resolvers from files.
  const typeDefs = require('./topiQL/typeDefs.js');
  const resolvers = require('./topiQL/resolvers.js');
  
  // Import "publishers" from file. 
  // These "publishers" are consumers that read messages from a kafka topic and publish to a PubSub topic.
  const { publishers } = require('./topiQL/kafkaPublisher.js');
  publishers.publisher${topicCapitalized}();
  
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
      console.log(\`Server is now running on http://localhost:\${PORT}/graphql\`)
    );
  })();
  `;

  fs.writeFileSync(path.resolve(__dirname, '../server/oldServer.js'), result);
};

toGraphQL();
makeResolvers();
makePublishers();
makeServer();
oldMakePublishers();
oldMakeServer();

module.exports = {
  toGraphQL,
  makeResolvers,
  makePublishers,
  makeServer,
  oldMakePublishers,
  oldMakeServer
};
