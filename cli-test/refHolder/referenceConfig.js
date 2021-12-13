const dotenv = require('dotenv'); // Allows us to safely store and reference credentials in a .env file that is not uploaded to github
const path = require('path');

const envFile = path.resolve(__dirname,'../../../.env') // .env is for test & development; should be excluded when deployment
dotenv.config({ path: envFile }); 

const username = process.env.DEMO_KAFKA_CLUSTER_USER;
const password = process.env.DEMO_KAFKA_CLUSTER_PW;
const broker = process.env.DEMO_KAFKA_BROKER;

const sasl = username && password ? { username, password, mechanism: 'plain' } : null
const ssl = !!sasl

const MODE = {
  // ALL is to read all avsc files in the directory to be transformed into GQL schema
  ALL: 1,
  // SELECT is to read ONLY files in the 'targets' to be transformed into GQL Schema
  SELECT: 2
};

module.exports = {
  mode: MODE.ALL,
  // please fill one topic per a AVRO schema file in targets with corresponding orders
  topics: ['avscTopic', 'han', 'cece', 'testy', 'tripStatus'],
  // If SELECT mode, please fill the file name you desire to transform into GQL schema with extension of file; e.g) 'tripStatus.avsc'
  targets: ['avscSample.avsc', 'expAvroSample.js', 'passengerInfo.avsc', 'testSchema.avsc', 'tripStatus.avsc'],
  clientId: 'kafQL',
  brokers: [broker],
  ssl,
  sasl,
  connectionTimeout: 3000,
  authenticationTimeout: 1000,
  reauthenticationThreshold: 10000,
  schemaFolder: path.resolve(__dirname, '../../../data/testDataFolder/'),
};