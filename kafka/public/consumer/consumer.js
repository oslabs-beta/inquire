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
const config = require('../kconfig.js'); // Information about Kafka Cluster and Topics
// This Kafka instance is hosted on the Confluent Cloud, using the credentials in kafkaConfig.js.
// Topics can be created online through confluent cloud portal
const kafka = new Kafka(config);
// Initiates a new consumer for every topic in config
for (let i = 0; i < config.topics.length; i++) {
    const topicName = config.topics[i];
    try {
        const topicName = config.topics[i];
        const consumer = kafka.consumer({ groupId: `${topicName}-group` });
        consumer.connect();
        consumer.subscribe({ topic: `${topicName}`, fromBeginning: false });
        consumer.run({
            eachMessage: ({ message }) => __awaiter(void 0, void 0, void 0, function* () {
                // If topic and partition are needed, expand async function arguments to include: { topic, partition, message }
                console.log(`Consumer: Message Read - ${message.value}`);
            }),
        });
    }
    catch (err) {
        console.log(`Consumer: Failed to read - ${topicName}`);
    }
}
