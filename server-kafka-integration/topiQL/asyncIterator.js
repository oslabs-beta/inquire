const { $$asyncIterator } = require ('iterall');
const { Kafka } = require('kafkajs'); // NPM Package: Javascript compatible Kafka
const config = require('./config.js'); // Information about Kafka Cluster and Topics
const client = new Kafka(config);

// Helper function to initiate consumers
const getConsumer = async (topic) => {
    const consumer = client.consumer({ groupId: `${topic}-group-${Math.random() * 100}` });
    consumer.connect();
    consumer.subscribe({ topic: `${topic}`, fromBeginning: false });
    return consumer;
}

// Function returns an async iterator tied to Kafka topic
const kafkaEventToAsyncIterator = async (topicName) => {
  let promiseResolve;
  const consumer = await getConsumer(topicName);
  await consumer.run({
    eachMessage: ({ topic, partition, message }) => {
      let parsedMessage = {[topicName]: JSON.parse(message.value)}
      if (promiseResolve && topicName == topic) {
        promiseResolve(parsedMessage);
      }
    }
  });
  return {
    next() {
      return new Promise(resolve => {
        promiseResolve = resolve;
      }).then(value => { return {done: false, value} }
      );
    },
    return() {
      return Promise.resolve({ done: true, value: undefined });
    },
    throw(e) {
      return Promise.reject(e);
    },
    [$$asyncIterator]() {
      return this;
    },
  };
};

module.exports = kafkaEventToAsyncIterator;
