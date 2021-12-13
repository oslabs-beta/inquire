const path = require('path')
const fs = require('fs')

/**
 * To help configuring initial setup for user specifically creating targets
 * 
 * @param {String} mode the number represent mode selected
 * @param {*} dataFolder targetted AVRO schema folder 
 * @returns array of strings of file names in the AVRO schema folder
 */
const createTargets = (mode, dataFolder) => {
    let targets = ``
    if (mode === '0') {
        const filenames = fs.readdirSync(dataFolder);
        targets += '['
        let i = 0
        while (i < filenames.length - 1) {
            targets += `'${filenames[i]}', `
            i += 1;
        }
        targets += `'${filenames[i]}']`
        return targets
    } else if (mode === '1') {
        targets += `[]`
        return targets
    }
}


/**
 * make a config.js with boilerplate to be filled by user
 * 
 * @param {*} targetArr array of strings of file names in the AVRO schema folder
 * @param {*} mode number represent mode selected
 * @param {*} dataFolder targetted AVRO schema folder
 * @returns complete contents for configuration to generate config.js
 */
const createConfig = (targetArr, mode, dataFolder) => {
    let currMode;
    switch (mode) {
        case "0":
            currMode = "ALL";
            break;
        case "1":
            currMode = "SELECT";
            break;
        default:
            throw "Please select the mode from 0 ~ 1";
    }
    const result = `// User Configuration File for Kafka - GraphQL connection using topiQL library
  const path = require('path');
  //input username and password for Confluent Cloud
  const username = ''
  const password = ''
  
  const sasl = username && password ? { username, password, mechanism: 'plain' } : null
  const ssl = !!sasl
  const MODE = {
    // ALL is to read all avsc files in the directory to be transformed into GQL schema
    ALL: 0,
    // SELECT is to read ONLY files in the 'targets' to be transformed into GQL Schema
    SELECT: 1
  };
  
  module.exports = {
    mode: MODE.${currMode},
    // please fill one topic per a AVRO schema file in targets with corresponding orders
    topics: [],
    // If SELECT mode, please fill the file name you desire to transform into GQL schema with extension of file; i.e) 'tripStatus.avsc'
    targets: ${targetArr},
    //input Kafka client ID and brokers
    clientId: '',
    // please fill out broker from your kafka stream; i.e) ['pkc-lzvrd.us-xxxxx.gcp.confluent.cloud:xxxx']
    brokers: [],
    ssl,
    sasl,
    connectionTimeout: 3000,
    authenticationTimeout: 1000,
    reauthenticationThreshold: 10000,
    schemaFolder: '${dataFolder}',  
    destinationFolder: path.resolve(__dirname)
  };`;
    return result;
}

module.exports = {
    createTargets,
    createConfig
}