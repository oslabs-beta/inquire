const { Kafka } = require('kafkajs'); // NPM Package: Javascript compatible Kafka
  const config = require('./config.js'); // Information about Kafka Cluster and Topics
  const { PubSub } = require('graphql-subscriptions');
  
  // This Kafka instance is hosted on the Confluent Cloud, using the credentials in kafkaConfig.js.
  // Topics can be created online through confluent cloud portal
  const pubsub = new PubSub();
  const kafka = new Kafka(config);
  
  // For every topic listed in config file, we can pull out a topicName and corresponding consumer
  const topicName = config.topics[0];
  const consumerTest = kafka.consumer({ groupId: `${topicName}-group` });
  
  const publishers = {
    publisherTripStatus: async () => {
      consumerTest.connect();
      consumerTest.subscribe({ topic: `${topicName}`, fromBeginning: false });
      consumerTest.run({
        eachMessage: async ({ topic, partition, message }) => {
          pubsub.publish('TRIPSTATUS', {
            tripStatus: JSON.parse(message.value)
          });
        },
      });
      consumerTest.disconnect();
    }
  }
  
  module.exports = { publishers, pubsub };
  