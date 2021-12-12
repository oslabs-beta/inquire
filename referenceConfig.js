const dotenv = require('dotenv'); // Allows us to safely store and reference credentials in a .env file that is not uploaded to github
const path = require('path');

const envFile = path.resolve(__dirname,'../../../.env')
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
  mode: MODE.ALL,
  // input topic(s) Kafka producers are writing to & topics expected from GQL query
  // please fill one topic per a schema file in targets with matching sequence of order
  topics: ['avscTopic', 'han', 'cece', 'testy', 'tripStatus'],
  // for SELECT mode, please fill the file name you desire to transform into GQL schema without extension of the file
  targets: ['avscSample.avsc', 'expAvroSample.js', 'passengerInfo.avsc', 'testSchema.avsc', 'tripStatus.avsc'],
  clientId: 'kafQL',
  brokers: [broker],
  ssl,
  sasl,
  connectionTimeout: 3000,
  authenticationTimeout: 1000,
  reauthenticationThreshold: 10000,
  schemaFolder: '/Users/cecilyjansen/Github/Codesmith/Projects/OSP2/topiQL/data/testDataFolder',
  destinationFolder: path.resolve(__dirname),
};