// User Configuration File for Kafka - GraphQL connection using topiQL library
<<<<<<< HEAD:server/topiQL/config.js
const path = require('path');
const username = 'JUJA6GJGJCDSUYOP';
const password =
  '1XIN/fry4johm7kHhZ+n88jeKc11xJR3G07QXzfRmtnKA/f+s7mcbdkdvRIi/ixc';
=======
const username = 'JUJA6GJGJCDSUYOP'
const password = '1XIN/fry4johm7kHhZ+n88jeKc11xJR3G07QXzfRmtnKA/f+s7mcbdkdvRIi/ixc'
>>>>>>> dev:App/newTopiQL/config.js

const sasl =
  username && password ? { username, password, mechanism: 'plain' } : null;
const ssl = !!sasl;

module.exports = {
  topics: ['status'],
  clientId: 'kafQL',
  brokers: ['pkc-lzvrd.us-west4.gcp.confluent.cloud:9092'],
  ssl,
  sasl,
  connectionTimeout: 3000,
  authenticationTimeout: 1000,
  reauthenticationThreshold: 10000,
<<<<<<< HEAD:server/topiQL/config.js
  schemaFile: path.resolve(__dirname, '../../data/testData/avscSample.avsc'),
  destinationFolder: path.resolve(__dirname),
};
=======
  schemaFile: '../data/testData/avscSample.avsc',
  destinationFolder: '../server/topiQL'
};
>>>>>>> dev:App/newTopiQL/config.js
