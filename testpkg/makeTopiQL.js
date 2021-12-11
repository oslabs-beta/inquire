const fs = require('fs');
const { graphql } = require('graphql');
const path = require('path');
const configPath = path.resolve(__dirname, '../server/topiQL/config.js');
let config = require(configPath);

const graphqlSchemaTool = require('./tools/graphqlSchemaTool.js');
const kafkaSchemaFile = config.schemaFile;
const graphqlSchemaDestFolder = config.destinationFolder;
const oldGraphqlSchemaDest = `${graphqlSchemaDestFolder}/oldTypeDefs.js`;
const graphqlSchemaDest = `${graphqlSchemaDestFolder}/typeDefs.js`;
const topics = config.topics;
const resolverPath = path.resolve(__dirname, '../server/topiQL/resolvers.js');
const asyncIteratorPath = path.resolve(
  __dirname,
  '../server/topiQL/asyncIterator.js'
);
const serverPath = path.resolve(__dirname, '../server/server.js');

const schemaFolder = config.schemaFolder;

const toGraphQL = () => {
  let formattedData = ``;
  const filenames = fs.readdirSync(schemaFolder);
  const topicsTypesZip = []
  if (filenames) {

    //below iteration should perform in a order that target's order which is written in the config
    if (config.mode === 1) {
      filenames.forEach((filename, topicsIdx) => {
        if (path.extname(filename) === '.avsc') {
          try {
            const tmpRead = fs.readFileSync(schemaFolder + '/' + filename);
            const topicType = graphqlSchemaTool.zipTopicTypes(config.topics[topicsIdx], tmpRead)
            topicsTypesZip.push(topicType)
            // remove trails and trim the file
            const innerData = graphqlSchemaTool.getInnerKafkaSchema(tmpRead);
            // call the parsing function, format the data, write it to graphql schema file
            const parsedData = graphqlSchemaTool.parseKafkaSchema(innerData);
            formattedData += graphqlSchemaTool.formatGQLSchema(parsedData);
          } catch (err) {
            console.log(`ERR: while reading ${filename} - ${err}`);
          }
        }
      });

    } else if (config.mode === 2) {
      const targetZip = graphqlSchemaTool.zipTargets(config.topics, config.targets)
      filenames.forEach((filename) => {
        if (path.extname(filename) === '.avsc') {
          try {
            if (targetZip.has(path.parse(filename).name)) {
              const tmpRead = fs.readFileSync(schemaFolder + '/' + filename)
              const topicType = graphqlSchemaTool.zipTopicTypes(targetZip.get(path.parse(filename).name), tmpRead);
              topicsTypesZip.push(topicType);
              const innerData = graphqlSchemaTool.getInnerKafkaSchema(tmpRead);
              const parsedData = graphqlSchemaTool.parseKafkaSchema(innerData);
              formattedData += graphqlSchemaTool.formatGQLSchema(parsedData);
            }
          } catch (err) {
            console.log(`ERR: while reading ${filename} on SELECT mode - ${err}`)
          }
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

const writeGraphQLSchema = () => {
  const graphQLData = toGraphQL();
  fs.writeFileSync(graphqlSchemaDest, graphQLData);
};
const writeResolver = () => {
  const resolverData = makeResolver();
  fs.writeFileSync(resolverPath, resolverData);
};
const writeAsyncIterator = () => {
  const asyncIteratorData = makeAsyncIterator();
  fs.writeFileSync(asyncIteratorPath, asyncIteratorData);
};

const writeServer = () => {
  const serverData = makeServer();
  fs.writeFileSync(serverPath, serverData);
};

writeGraphQLSchema();
writeResolver();
writeAsyncIterator();
writeServer();

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
