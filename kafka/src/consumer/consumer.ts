export {}; // This line of code prevents TS error 'Cannot redeclare block-scoped variable' in unrelated files

const { Kafka } = require('kafkajs'); // NPM Package: Javascript compatible Kafka
const config = require('../../kconfig.js'); // Information about Kafka Cluster and Topics

// This Kafka instance is hosted on the Confluent Cloud, using the credentials in kafkaConfig.js.
// Topics can be created online through confluent cloud portal

const kafka = new Kafka(config);

// Initiates a new consumer for every topic in config
for (let i = 0; i < config.topics.length; i++) {
  const topicName : string = config.topics[i];
  try {
  const topicName = config.topics[i];
  const consumer = kafka.consumer({ groupId: `${topicName}-group` });
  consumer.connect();
  consumer.subscribe({ topic: `${topicName}`, fromBeginning: false });
  consumer.run({
    eachMessage: async ({ message } : { message: any}) => {
      // If topic and partition are needed, expand async function arguments to include: { topic, partition, message }
      console.log(`Consumer: Message Read - Partition  ${message.value}`);
    },
  });
  } catch (err) {
    console.log(`Consumer: Failed to read - ${topicName}`);
  }
}
