export {}; // This line of code prevents TS error 'Cannot redeclare block-scoped variable' in unrelated files

const { Kafka } = require('kafkajs'); // NPM Package: Javascript compatible Kafka
const config = require('../kconfig.js'); // Information about Kafka Cluster and Topics
const queueTripInfo = require('./statusMsg');

// This Kafka instance is hosted on the Confluent Cloud, using the credentials in kafkaConfig.js.
// Topics can be created online through confluent cloud portal

const kafka = new Kafka(config);
const producer = kafka.producer();
const runProducer = async () => {
  for (let i = 0; i < config.topics.length; i++) {
    const topicName : string = config.topics[i];
    try {
        await producer.connect();;
        const message : TripInfo = queueTripInfo();
        await producer.send({
          messages: [
            { key: 'status', value: JSON.stringify(message), headers: '' },
          ],
        });
        console.log(`Producer: Write success - ${topicName}`);
        await producer.disconnect();
    } catch (err) {
      console.log(`Producer: Failed to write - ${topicName}`);
    }
  }
};

setInterval(() => {
  runProducer();
}, 5000);
