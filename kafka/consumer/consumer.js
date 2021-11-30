const { Kafka } = require('kafkajs'); // NPM Package: Javascript compatible Kafka
const config = require('../kconfig.js'); // Information about Kafka Cluster and Topics

// This Kafka instance is hosted on the Confluent Cloud, using the credentials in kafkaConfig.js.
// Topics can be created online through confluent cloud portal

const kafka = new Kafka(config);

// Initiates a new consumer for every topic in config
for (let i = 0; i < config.topics.length; i++) {
  const topicName = config.topics[i];
  const consumer = kafka.consumer({ groupId: `${topicName}-group` });
  consumer.connect();
  consumer.subscribe({ topic: `${topicName}`, fromBeginning: true });
  consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`Consumer: Message Read - ${message.value}`);
    },
  });
}
