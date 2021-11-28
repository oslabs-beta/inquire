const { Kafka } = require ('kafkajs'); // NPM Package: Javascript compatible Kafka
const eventType = require ('../eventType.js'); // Message AVRO Schema
const config = require ('../kconfig.js'); // Information about Kafka Cluster and Topics

// This Kafka instance is hosted on the Confluent Cloud, using the credentials in kafkaConfig.js.
// Topics can be created online through confluent cloud portal

const kafka = new Kafka(config);
const producer = kafka.producer();
const runProducer = async () => {
  try {
    await producer.connect()
    const topicName = 'test';
    const message = {"category" : "CAT" , "noise" : "meow"};
    const messageEncoded = eventType.toBuffer(message);
    await producer.send({
      topic: topicName,
      messages:
      [{ key: "1", value: messageEncoded , headers: ''}],
      })
    console.log(`Producer: Write success - ${topicName}`);
    await producer.disconnect();
  } catch (err) {console.log(`Producer: Failed to write - ${topicName}`);}
}

setInterval(() => {
  runProducer();
}, 3000);

