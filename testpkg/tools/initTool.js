const path = require('path')
const fs = require('fs')
// this path should be specified pre-hand by end user somehow maybe from commandline

const createTargets = (mode, dataFolder) => {
    let targets = ``
    if (mode === '1') {
        const filenames = fs.readdirSync(dataFolder);
        targets += '['
        let i = 0
        while (i < filenames.length - 1) {
            targets += `'${filenames[i]}', `
            i += 1;
        }
        targets += `'${filenames[i]}']`
        return targets
    } else if (mode === '2') {
        targets += `[]`
        return targets
    }
}


//make a file there called config.js with boilerplate - user will just fill in the blanks.
const createConfig = (targetArr, mode, dataFolder) => {
    let currMode;
    switch (mode) {
        case "0":
            currMode = "AUTO";
            break;
        case "1":
            currMode = "ALL";
            break;
        case "2":
            currMode = "SELECT";
            break;
        default:
            throw "Please select the mode from 0 ~ 2";
    }
    const result = `// User Configuration File for Kafka - GraphQL connection using topiQL library
  const path = require('path');
  //input username and password for Confluent Cloud
  const username = ''
  const password = ''
  
  const sasl = username && password ? { username, password, mechanism: 'plain' } : null
  const ssl = !!sasl
  const MODE = {
    // AUTO will retrieve all schema from kafka and build gql schema -> fill topics only
    AUTO: 0,
    // ALL to make all the avsc files into graphql Schema, leave 'targets' empty
    ALL: 1,
    // SELECT to fill the 'targets' with filenames to be transform into graphql Schema
    SELECT: 2
  };
  
  module.exports = {
    mode: MODE.${currMode},
    // input topic(s) Kafka producers are writing to & topics expected from GQL query
    // please fill one topic per a schema file in targets with matching sequence of order
    topics: [],
    // for SELECT mode, please fill the file name you desire to transform into GQL schema without extension of the file
    targets: ${targetArr},
    //input Kafka client ID and brokers
    clientId: '',
    brokers: [],
    ssl,
    sasl,
    connectionTimeout: 3000,
    authenticationTimeout: 1000,
    reauthenticationThreshold: 10000,
    //input folder containing your Avro schema
    schemaFolder: '${dataFolder}',  
    destinationFolder: path.resolve(__dirname)
  };`;
    return result;
}

module.exports = {
    createTargets,
    createConfig
}