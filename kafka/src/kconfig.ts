export {}; // This line of code prevents TS error 'Cannot redeclare block-scoped variable' in unrelated files
const dotenv = require('dotenv'); // Allows us to safely store and reference credentials in a .env file that is not uploaded to github
dotenv.config({ path: './../.env' }); 

const username = process.env.DEMO_KAFKA_CLUSTER_USER;
const password = process.env.DEMO_KAFKA_CLUSTER_PW;
const broker = process.env.DEMO_KAFKA_BROKER;
// const broker = "localhost:9092"; // Uncomment for local docker instance

const sasl = username && password ? { username, password, mechanism: 'plain' } : null
const ssl = !!sasl

const kafkaSettings : KafkaSettings = {
  topics: ['passengerInfo', 'tripStatus'],
  clientId: 'kafQL',
  brokers: [broker],
  ssl, // Uncomment for Confluent Cloud. Remember to update interfaces.d.ts accordingly
  sasl, // Uncomment for Confluent Cloud.  Remember to update interfaces.d.ts accordingly
  connectionTimeout: 3000,
  authenticationTimeout: 1000,
  reauthenticationThreshold: 10000,
};

module.exports = kafkaSettings;