// User Configuration File for Kafka - GraphQL connection using topiQL library
  const path = require('path');
  //input username and password for Confluent Cloud
  const username = ''
  const password = ''
  
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
    // input topic(s) Kafka producers are writing to & topics expected from GQL query
    // please fill one topic per a schema file in targets with matching sequence of order
    topics: [],
    // for SELECT mode, please fill the file name you desire to transform into GQL schema without extension of the file
    targets: [],
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
    schemaFolder: '',  
    destinationFolder: path.resolve(__dirname)
  };