const { Kafka } = require('kafkajs'); // NPM Package: Javascript compatible Kafka
const config = require('../../kafka/kconfig.js'); // Information about Kafka Cluster and Topics
const { PubSub } = require('graphql-subscriptions');

// This Kafka instance is hosted on the Confluent Cloud, using the credentials in kafkaConfig.js.
// Topics can be created online through confluent cloud portal
const pubsub = new PubSub();
const kafka = new Kafka(config);

// For every topic listed in config file, we can pull out a topicName and corresponding consumer
const topicName = config.topics[0];
const consumerTest = kafka.consumer({ groupId: `${topicName}-group` });

const publishers = {
  publisherStatus: () => {
    consumerTest.connect();
    consumerTest.subscribe({ topic: `${topicName}`, fromBeginning: false });
    consumerTest.run({
      eachMessage: async ({ topic, partition, message }) => {
        pubsub.publish('STATUS', {
          status: JSON.parse(message.value)
        });
      },
    });
  }
}

module.exports = { publishers, pubsub };