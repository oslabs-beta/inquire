const { $$asyncIterator } = require ('iterall');
const { Kafka } = require('kafkajs'); // NPM Package: Javascript compatible Kafka
const config = require('./config.js'); // Information about Kafka Cluster and Topics
const client = new Kafka(config);

// Helper function to initiate consumers
const getConsumer = async (topic) => {
  try {
    const consumer = client.consumer({ groupId: `${topic}-group-${Math.random() * 100}` });
    consumer.connect();
    consumer.subscribe({ topic: `${topic}`, fromBeginning: false });
    return consumer;
  } catch (err) {console.log(err)}
}

// Function returns an async iterator tied to Kafka topic
const kafkaEventToAsyncIterator = async (topicName) => {
  let promiseResolve;
  const consumer = await getConsumer(topicName);
  try {
    await consumer.run({
      eachMessage: ({ topic, partition, message }) => {
        let parsedMessage = {[topicName]: JSON.parse(message.value)}
        if (promiseResolve && topicName == topic) {
          promiseResolve(parsedMessage);
        }
      }
    });
  } catch (err) {console.log(err)}
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
