const { Kafka } = require('kafkajs'); // NPM Package: Javascript compatible Kafka
const config = require('../kconfig.js'); // Information about Kafka Cluster and Topics
const queueTripInfo = require('./statusMsg');

// This Kafka instance is hosted on the Confluent Cloud, using the credentials in kafkaConfig.js.
// Topics can be created online through confluent cloud portal

const kafka = new Kafka(config);
const producer = kafka.producer();
const runProducer = async () => {
  try {
    await producer.connect();
    const topicName = config.topics[0];
    const message = queueTripInfo();
    await producer.send({
      topic: topicName,
      messages: [
        { key: 'status', value: JSON.stringify(message), headers: '' },
      ],
    });
    console.log(`Producer: Write success - ${topicName}`);
    await producer.disconnect();
  } catch (err) {
    console.log(`Producer: Failed to write - ${topicName}`);
  }
};

setInterval(() => {
  runProducer();
}, 5000);
