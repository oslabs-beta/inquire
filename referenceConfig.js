const dotenv = require('dotenv'); // Allows us to safely store and reference credentials in a .env file that is not uploaded to github
const path = require('path');

const envFile = path.resolve(__dirname,'../../.env')
dotenv.config({ path: envFile }); 

const username = process.env.DEMO_KAFKA_CLUSTER_USER;
const password = process.env.DEMO_KAFKA_CLUSTER_PW;
const broker = process.env.DEMO_KAFKA_BROKER;

const sasl = username && password ? { username, password, mechanism: 'plain' } : null
const ssl = !!sasl

const MODE = {
  // AUTO will retrieve all schema from kafka and build gql schema -> fill topics only
  AUTO: 0,
  // ALL to make all the avsc files into graphql Schema, leave 'targets' empty
  ALL: 1,
  // SELECT to fill the 'targets' with filenames to be transform into graphql Schema
  SELECT: 2
};

module.exports = {
  mode: MODE.SELECT,
  // for Mode.All -> please fill out one topic per schema file in an ORDERED as shown in the directory
  // topics: ['avscSample', 'passengerStatus', 'testSchema', 'tripStatus'],
  topics: ['tripStatus', 'passengerInfo'],
  // topicTypes: ['Status', 'Status', 'Status'],
  // topicTypes are removed
  targets: ['tripStatus', 'passengerInfo'],
  clientId: 'kafQL',
  brokers: [broker],
  ssl,
  sasl,
  connectionTimeout: 3000,
  authenticationTimeout: 1000,
  reauthenticationThreshold: 10000,
  schemaFile: path.resolve(__dirname, '../../data/testData/avscSample.avsc'),
  schemaFolder: path.resolve(__dirname, '../../data/testData/'),
  destinationFolder: path.resolve(__dirname),
};