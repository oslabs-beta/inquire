const fs = require('fs');
const path = require('path');
const buildGQLTool = require('./tools/buildGQLTool.js');

// pathStore.json is generated when user initializes destination folder for graphQL Schemas
const storedPath = JSON.parse(fs.readFileSync(path.resolve(__dirname, './pathStore.json')));
const configPath = `${storedPath}/topiQL/config.js`;
const config = require(configPath);

const topics = config.topics;
const targets = config.targets;
const mode = config.mode;
const schemaFolder = config.schemaFolder;

const typeDefsPath = `${storedPath}/topiQL/typeDefs.js`;
const resolversPath = `${storedPath}/topiQL/resolvers.js`;
const asyncIteratorPath = `${storedPath}/topiQL/asyncIterator.js`;
const serverPath = `${storedPath}/server.js`;

/**
 * Returns completed graphql schema from targeted Avro schema files
 * Using various functions from buildGQLTool.js depends on which mode user selected.
 * 
 * @returns {String} completed graphql schema to be written as typeDef.js
 */
const toGraphQL = () => {
  let formattedData = ``;
  const filenames = fs.readdirSync(schemaFolder);
  const topicsTypesZip = []
  let targetZip;
  let currTopic;

  // when SELECTED mode, targetZip is used to avoid potential inconsistency of order of files
  if (mode === 2) {
    targetZip = buildGQLTool.zipTargets(topics, targets)
  }

  filenames.forEach((filename, topicsIdx) => {
    try {
      if (mode === 2 && targetZip.has(filename)) {
        currTopic = targetZip.get(filename)
      } else if (mode === 2) {
        // skips if current checking file isn't selected schema from user when SELECTED mode
        return
      } else {
        currTopic = topics[topicsIdx]
      }
      const tmpRead = fs.readFileSync(schemaFolder + '/' + filename);
      const innerData = buildGQLTool.getInnerData(tmpRead);
      const topicType = buildGQLTool.zipTopicTypes(currTopic, innerData)
      topicsTypesZip.push(topicType)
      const parsedData = buildGQLTool.parseKafkaSchema(innerData);
      formattedData += buildGQLTool.formatGQLSchema(parsedData);
    } catch (err) {
      console.log(`ERR: while reading ${filename} - ${err}`);
    }
  });

  const completeTypedefData = buildGQLTool.completeTypeDef(
    formattedData,
    topicsTypesZip
  );

  return completeTypedefData;
};

/**
 * Build resolver file to iterate over all the topics that user specificed
 * 
 * @returns {String} completed contents for resolver file to be written as resolvers.js
 */
const makeResolver = () => {
  let subscriptions = ``;

  for (const topic of topics) {
    subscriptions += `
        ${topic}: {
          subscribe: () => kafkaEventToAsyncIterator('${topic}'),
        },`;
  }

  let result = `const kafkaEventToAsyncIterator = require('./asyncIterator.js')

// GraphQL Resolvers
module.exports = {
  Subscription: {${subscriptions}
  },
  Query: {
    exampleQuery: () => "Add Result Here"
  }
}
`;
  return result;
};

/**
 * @returns {String} complete contents to be written as asynIterator.js
 */
const makeAsyncIterator = () => {
  return `const { $$asyncIterator } = require ('iterall');
const { Kafka } = require('kafkajs'); // NPM Package: Javascript compatible Kafka
const config = require('./config.js'); // Information about Kafka Cluster and Topics
const client = new Kafka(config);

// Helper function to initiate consumers
const getConsumer = async (topic) => {
  try {
    const consumer = client.consumer({ groupId: \`\${topic}-group-\${Math.random() * 100}\` });
    consumer.connect();
    consumer.subscribe({ topic: \`\${topic}\`, fromBeginning: false });
    return consumer;
  } catch (err) {console.log(err)}
}

// Function returns an async iterator tied to Kafka topic
const kafkaEventToAsyncIterator = async (topicName) => {
  let promiseResolve;
  const consumer = await getConsumer(topicName);
  try {
    await consumer.run({
      eachMessage: ({ topic, partition, message }) => {
        let parsedMessage = {[topicName]: JSON.parse(message.value)}
        if (promiseResolve && topicName == topic) {
          promiseResolve(parsedMessage);
        }
      }
    });
  } catch (err) {console.log(err)}
  return {
    next() {
      return new Promise(resolve => {
        promiseResolve = resolve;
      }).then(value => { return {done: false, value} }
      );
    },
    return() {
      return Promise.resolve({ done: true, value: undefined });
    },
    throw(e) {
      return Promise.reject(e);
    },
    [$$asyncIterator]() {
      return this;
    },
  };
};

module.exports = kafkaEventToAsyncIterator;
`
};

/**
 * @returns complete contents to be written as server.js
 */
const makeServer = () => {
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
  return result;
};

/**
 * functions to write files and separated for testing purpose
 */
const writeGraphQLSchema = () => {
  const graphQLData = toGraphQL();
  fs.writeFileSync(typeDefsPath, graphQLData);
};

const writeResolver = () => {
  const resolverData = makeResolver();
  fs.writeFileSync(resolversPath, resolverData);
};

const writeAsyncIterator = () => {
  const asyncIteratorData = makeAsyncIterator();
  fs.writeFileSync(asyncIteratorPath, asyncIteratorData);
};

const writeServer = () => {
  const serverData = makeServer();
  fs.writeFileSync(serverPath, serverData);
};

module.exports = {
  toGraphQL,
  makeResolver,
  makeAsyncIterator,
  makeServer,
  writeGraphQLSchema,
  writeResolver,
  writeAsyncIterator,
  writeServer,
};
