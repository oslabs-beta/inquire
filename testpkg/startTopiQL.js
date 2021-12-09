const fs = require('fs');
const path = require('path');

//make a directory in destination folder (server) called topiQL

const initTopiQL = async (absPath) => {
  await fs.mkdirSync(path.resolve(__dirname, `${absPath}/topiQL`), {recursive: true});
  
  fs.writeFileSync(
    `${absPath}/topiQL/config.js`,
    result
  );
};

//make a file there called config.js with boilerplate - user will just fill in the blanks.

let result = `// User Configuration File for Kafka - GraphQL connection using topiQL library
const path = require('path');
//input username and password for Confluent Cloud
const username = ''
const password = ''

const sasl = username && password ? { username, password, mechanism: 'plain' } : null
const ssl = !!sasl

module.exports = {
  //input topic(s) Kafka producers are writing to & topics expected from GQL query
  topics: [],
  topicTypes: [],
  //input Kafka client ID and brokers
  clientId: '',
  brokers: [],
  ssl,
  sasl,
  connectionTimeout: 3000,
  authenticationTimeout: 1000,
  reauthenticationThreshold: 10000,
  //input file containing your Avro schema
  schemaFile: '',  
  destinationFolder: path.resolve(__dirname)
};`;

//after this file is run, user will run their configuration file? which will run index.js in testpkg.
//index.js in testpkg will read the user-given file and output it to the topiQL folder created from this file.
initTopiQL();

module.exports = initTopiQL;
