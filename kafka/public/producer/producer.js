"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const { Kafka } = require('kafkajs'); // NPM Package: Javascript compatible Kafka
const config = require('../kconfig'); // Information about Kafka Cluster and Topics
const { queueTripInfo, passengerInfo } = require('./producerFunc');
// This Kafka instance is hosted on the Confluent Cloud or locally, using the credentials in kconfig.js.
// Topics can be created online through confluent cloud portal
const kafka = new Kafka(config);
const producer = kafka.producer();
const runProducers = () => __awaiter(void 0, void 0, void 0, function* () {
    const firstTopic = config.topics[0];
    const secondTopic = config.topics[1];
    const firstMessage = queueTripInfo();
    const secondMessage = passengerInfo();
    try {
        yield producer.connect();
        yield producer.send({
            topic: firstTopic,
            messages: [
                { key: 'status', value: JSON.stringify(firstMessage), headers: '' },
            ],
        });
        yield producer.send({
            topic: secondTopic,
            messages: [
                { key: 'passengerInfo', value: JSON.stringify(secondMessage), headers: '' },
            ],
        });
        console.log(`Producer: Write success - ${firstTopic}, ${secondTopic}`);
        yield producer.disconnect();
    }
    catch (err) {
        console.log(`Producer: Failed to write - ${err}`);
    }
});
setInterval(() => {
    runProducers();
}, 4000);
