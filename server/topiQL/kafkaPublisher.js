const { Kafka } = require('kafkajs'); // NPM Package: Javascript compatible Kafka
<<<<<<< HEAD
  const config = require('./config.js'); // Information about Kafka Cluster and Topics
  const { PubSub } = require('graphql-subscriptions');
=======
const config = require('../../kafka/kconfig.js'); // Information about Kafka Cluster and Topics
const { PubSub } = require('graphql-subscriptions');

// This Kafka instance is hosted on the Confluent Cloud, using the credentials in kafkaConfig.js.
// Topics can be created online through confluent cloud portal
const pubsub = new PubSub();
const kafka = new Kafka(config);

// For every topic listed in config file, we can pull out a topicName and corresponding consumer
const topicTripStatus = 'tripStatus';
const consumertripStatus = kafka.consumer({ groupId: 'tripStatus-group'});
const topicTesting1 = 'testing1';
const consumertesting1 = kafka.consumer({ groupId: 'testing1-group'});
const topicTesting2 = 'testing2';
const consumertesting2 = kafka.consumer({ groupId: 'testing2-group'});


const publishers = {
  publisherTripStatus: () => {
    consumertripStatus.connect();
    consumertripStatus.subscribe({ topic: `${topicTripStatus}`, fromBeginning: false });
    consumertripStatus.run({
      eachMessage: async ({ topic, partition, message }) => {
        pubsub.publish('TRIPSTATUS', {
          tripStatus: JSON.parse(message.value)
        });
      },
    });
  },
  publisherTesting1: () => {
    consumertesting1.connect();
    consumertesting1.subscribe({ topic: `${topicTesting1}`, fromBeginning: false });
    consumertesting1.run({
      eachMessage: async ({ topic, partition, message }) => {
        pubsub.publish('TESTING1', {
          testing1: JSON.parse(message.value)
        });
      },
    });
  },
  publisherTesting2: () => {
    consumertesting2.connect();
    consumertesting2.subscribe({ topic: `${topicTesting2}`, fromBeginning: false });
    consumertesting2.run({
      eachMessage: async ({ topic, partition, message }) => {
        pubsub.publish('TESTING2', {
          testing2: JSON.parse(message.value)
        });
      },
    });
  },
>>>>>>> dev
  
}

module.exports = { publishers, pubsub };
