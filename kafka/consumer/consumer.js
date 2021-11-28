const { Kafka } = require ('kafkajs'); // NPM Package: Javascript compatible Kafka
const eventType = require ('../eventType.js'); // Message AVRO Schema
const config = require ('../kconfig.js'); // Information about Kafka Cluster and Topics

// This Kafka instance is hosted on the Confluent Cloud, using the credentials in kafkaConfig.js.
// Topics can be created online through confluent cloud portal

const kafka = new Kafka(config);

// Initiates a new consumer for every topic in config file
for (let i = 0; i < config.topics.length; i++) {
  const topicName = config.topics[i];
  const consumer = kafka.consumer({ groupId: `${topicName}-group` });
  consumer.connect();
  consumer.subscribe({ topic: `${topicName}`, fromBeginning: true });
  consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`Consumer: Message Read - ${topicName}`);
      // console.log({
      //     key: message.key.toString(),
      //     value: eventType.fromBuffer(message.value),
      //     headers: message.headers,
      // });
    },
  });

}
