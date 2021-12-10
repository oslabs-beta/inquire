const { defaultInputTarget } = require('concurrently/src/defaults');
const fs = require('fs');
const path = require('path');
const { rawListeners } = require('process');

//make a directory in destination folder (server) called topiQL

let pickedMode;
const schemaFolder = path.resolve(__dirname, '../data/testData/');

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

const initTopiQL = async () => {
  await readline.question('what MODE do you want? => 0 for \'AUTO generation' +
    'from Kafka Stream / 1 for \'ALL\' Mode to generate GQL schema from all avsc' +
    ' files in the cloud / 2 for \'SELECT\' Mode to selectively create GQL schema' +
    ' from files\n', mode => {
      console.log(`you selected ${mode} ~ !`)
      pickedMode = mode
      readline.close()
    })
  readline.on('close', () => {
    console.log(pickedMode)
    const targets = createTargets(pickedMode);
    console.log("************", targets)
    const config = createConfig(targets, pickedMode)
    fs.mkdirSync(path.resolve(__dirname, '../server/topiQL'));
    fs.writeFileSync(
      path.resolve(__dirname, '../server/topiQL/config.js'),
      config
    );
  })
};

const createTargets = (mode) => {
  let targets = ``
  console.log("this is selected MODE -> ", mode, typeof mode)
  if (mode === '1') {
    console.log('mode is 1')
    const filenames = fs.readdirSync(schemaFolder);
    targets += '['
    let i = 0
    while (i < filenames.length - 1) {
      targets += `'${filenames[i]}', `
      i += 1;
    }
    targets += `'${filenames[i]}']`
    console.log("shhhhhhhhhhhhit ", targets)
    return targets
  } else if (mode === '2') {
    targets += `[]`
    return targets
  }
}


//make a file there called config.js with boilerplate - user will just fill in the blanks.
const createConfig = (targetArr, mode) => {
  console.log(targetArr, mode)
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
  //input file containing your Avro schema
  schemaFile: '',
  schemaFolder: '',  
  destinationFolder: path.resolve(__dirname)
};`;
  return result;
}
//after this file is run, user will run their configuration file? which will run index.js in testpkg.
//index.js in testpkg will read the user-given file and output it to the topiQL folder created from this file.
initTopiQL();

module.exports = { initTopiQL, createConfig };
