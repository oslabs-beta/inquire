export {}; // This line of code prevents TS error 'Cannot redeclare block-scoped variable' in unrelated files

const { Kafka } = require('kafkajs'); // NPM Package: Javascript compatible Kafka
const config = require('../kconfig'); // Information about Kafka Cluster and Topics
const { queueTripInfo, passengerInfo } = require('./producerFunc');

// This Kafka instance is hosted on the Confluent Cloud, using the credentials in kafkaConfig.js.
// Topics can be created online through confluent cloud portal

const kafka = new Kafka(config);
const producer = kafka.producer();

const runProducers = async () => {
  const firstTopic : string = config.topics[0];
  const secondTopic : string = config.topics[1];
  const firstMessage : TripInfo = queueTripInfo();
  const secondMessage : PassengerInfo = passengerInfo();
  try {
      await producer.connect();
      
      await producer.send({
        topic: firstTopic,
        messages: [
          { key: 'status', value: JSON.stringify(firstMessage), headers: '' },
        ],
      });
      await producer.send({
        topic: secondTopic,
        messages: [
          { key: 'passengerInfo', value: JSON.stringify(secondMessage), headers: '' },
        ],
      });
      console.log(`Producer: Write success - ${firstTopic}, ${secondTopic}`);
      await producer.disconnect();
  } catch (err) {
    console.log(`Producer: Failed to write - ${err}`);
  }
  
};

setInterval(() => {
  runProducers();
}, 4000);
