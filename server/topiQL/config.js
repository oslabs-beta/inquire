// User Configuration File for Kafka - GraphQL connection using topiQL library
const path = require('path');
//input username and password for Confluent Cloud
const username = ''
const password = ''

const sasl = username && password ? { username, password, mechanism: 'plain' } : null
const ssl = !!sasl

module.exports = {
  //input topic(s) Kafka producers are writing to & topics expected from GQL query
  topics: [],
  topicTypes: [],
  //input Kafka client ID and brokers
  clientId: '',
  brokers: [],
  ssl,
  sasl,
  connectionTimeout: 3000,
  authenticationTimeout: 1000,
  reauthenticationThreshold: 10000,
  //input file containing your Avro schema
  schemaFile: '',  
  destinationFolder: path.resolve(__dirname)
};