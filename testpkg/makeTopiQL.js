const fs = require('fs');
const path = require('path');
const graphqlSchemaTool = require('./tools/graphqlSchemaTool.js');

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
 * 
 */
const toGraphQL = () => {
  let formattedData = ``;
  const filenames = fs.readdirSync(schemaFolder);
  const topicsTypesZip = []
  if (filenames) {
    if (mode === 1) {
      console.log("mode 1 entered and filenames are -> ", filenames)
      filenames.forEach((filename, topicsIdx) => {
          try {
            const tmpRead = fs.readFileSync(schemaFolder + '/' + filename);
            const innerData = graphqlSchemaTool.getInnerKafkaSchema(tmpRead);
            const topicType = graphqlSchemaTool.zipTopicTypes(topics[topicsIdx], innerData)
            console.log("**********************")
            topicsTypesZip.push(topicType)
            console.log("**********************")
            const parsedData = graphqlSchemaTool.parseKafkaSchema(innerData);
            formattedData += graphqlSchemaTool.formatGQLSchema(parsedData);
          } catch (err) {
            console.log(`ERR: while reading ${filename} - ${err}`);
          }
      });

    } else if (mode === 2) {
      console.log("this is fkin topics types zip !!!! -> ,", topicsTypesZip)
      console.log("mode 2 entered and filenames are -> ", filenames)
      const targetZip = graphqlSchemaTool.zipTargets(topics, targets)
      console.log("mode 2 retriving -> ", targetZip)
      filenames.forEach((filename) => {
          try {
            console.log("this is fkin topics types zip !!!! -> ,", topicsTypesZip)
            console.log("mode 2 checking the file name -> ", filename)
            if (targetZip.has(filename)) {
              console.log("filename is in the targetZip")
              const tmpRead = fs.readFileSync(schemaFolder + '/' + filename)
              const innerData = graphqlSchemaTool.getInnerKafkaSchema(tmpRead);
              console.log("getting filename from targetZip -> ", targetZip.get(filename))
              const topicType = graphqlSchemaTool.zipTopicTypes(targetZip.get(filename), innerData);
              topicsTypesZip.push(topicType);
              console.log("this is topicsTypesZip in mode 2 after each iteration, ", topicsTypesZip)
              const parsedData = graphqlSchemaTool.parseKafkaSchema(innerData);
              formattedData += graphqlSchemaTool.formatGQLSchema(parsedData);
            }
          } catch (err) {
            console.log(`ERR: while reading ${filename} on SELECT mode - ${err}`)
          }
      })
    }
  }

  const completeTypedefData = graphqlSchemaTool.completeTypeDef(
    formattedData,
    topicsTypesZip
  );
  return completeTypedefData;
};

const makeResolver = () => {
  let subscriptions = ``;

  // Pull out name of topics from config file
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
 * 
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
 * 
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
 * 
 */
const writeGraphQLSchema = () => {
  const graphQLData = toGraphQL();
  fs.writeFileSync(typeDefsPath, graphQLData);
};

/**
 * 
 */
const writeResolver = () => {
  const resolverData = makeResolver();
  fs.writeFileSync(resolversPath, resolverData);
};

/**
 * 
 */
const writeAsyncIterator = () => {
  const asyncIteratorData = makeAsyncIterator();
  fs.writeFileSync(asyncIteratorPath, asyncIteratorData);
};

/**
 * 
 */
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
