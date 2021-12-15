const fs = require('fs');

/**
 * AVRO file can be written in different formats and different extensions
 * getInnerData will trim out the outter structure of the files 
 * 
 * @param {String} fileData raw file contents read from an AVRO schema file
 * @returns trimmed file contents maybe in need to create GQL schema
 */
const getInnerData = (fileData) => {
  fileData = fileData.toString('utf-8');
  try {
    //check if current file contains "Avro.type.forSchema("
    const expAvroRGX = /avro\.Type\.forSchema\(/g;
    if (expAvroRGX.test(fileData)) {
      let extractedData;
      //find schema object or variable name between parentheses
      extractedData = fileData
        .toString()
        .match(/(?<=avro\.Type\.forSchema\()[\s\S]*?(?=\);)/)[0]
        .trim();

      if (extractedData[0] !== '{') {
        //extract variable following its assignment
        const varDefRegex = new RegExp('(?<=' + extractedData + ' =' + ')[\\s\\S]*(?=};)'); // find variable definition
        extractedData = fileData.match(varDefRegex).join('') + '}';
      }
      fileData = extractedData
    }
    return fileData;
  } catch (err) {
    console.log(`Error: while getting inner data of kafka stream - ${err}`)
    return
  }
}

/**
 * Couples target-filename and topic-name to be searched while iteration of all files in the
 * AVRO schema folders. Key which is filename will be looked up during the iteration
 * and once the file is found, its topic-name will be used as topic.
 * 
 * @param {String[]} topics topic names specified in config.js
 * @param {String[]} targets name of AVSC files in config.js 
 * @returns map that consist of KEY: name of file VALUE: name of corresponding topic
 */
const zipTargets = (topics, targets) => {
  const zipMap = new Map();
  if (!Array.isArray(topics) || !topics.length) {
    console.log("ERR: Your 'topics' in configuration isn't array or is empty - please review your configuration")
    return
  } else if (!Array.isArray(targets) || !targets.length) {
    console.log("ERR: Your 'targets' in configuration isn't array or is empty - Did you mean to use 'ALL-MODE'?")
    return
  } if (topics.length !== targets.length) {
    console.log("ERR: there must be one topic for each kafak schema file - please review your configuration");
    return
  }
  for (let i = 0; i < targets.length; i++) {
    zipMap.set(targets[i], topics[i])
  }

  return zipMap
}

/**
 * Retrieves topic-type from filedata and match with corresponing name of topic
 * 
 * @param {String} topic topic name of currently found interested AVRO schema during iteration
 * @param {String} fileData trimmed filedata of currently scanned AVRO schema file
 * @returns {[String, String]} returns matched topic and topic-type 
 */
const zipTopicTypes = (topic, fileData) => {
  try {
    const data = JSON.parse(fileData)
    return [topic, data.name]
  } catch (err) {
    console.log(`Err: ZipTopicTypes in buildGQLTool on ${topic} - ${err}`)
    return
  }
}

/**
 * Recursively retrieve GQL schema data from AVRO schema, written order of properties of AVRO schema
 * can be varied, so depends on the scanning situation, the function will be called recursively
 * to collect data by backtracking algorithm.
 * 
 * @param {String} fileData trimmed file data of currently scanned AVRO schema file
 * @returns AVRO data as a deeply nested Array to be processed in formatGQLSchema
 */
const parseKafkaSchema = (fileData) => {
  try {
    let res = [];

    function backtrack(newObj) {
      let tmpArr = [];
      if (Array.isArray(newObj)) { // array check is required as basecase
        for (let k = 0; k < newObj.length; k++) {
          if (typeof newObj[k] === 'object') { // only interested in object type in the when array is found
            backtrack(newObj[k]);
            return;
          }
        }
      } else {
        if (newObj.type) {
          // only interested when the current layer's type is record or enum
          if (newObj.type === 'record' || newObj.type === 'enum') {
            if (newObj.name) {
              tmpArr.push(newObj.name); // then save the name of current layer
              if (newObj.fields) {
                for (let j = 0; j < newObj.fields.length; j++) { // retrieve each data in the field
                  let tmpFieldEle = newObj.fields[j];
                  /* if element of field has 'type' property as object type this means there are 
                   more layer of AVRO schema data to be transformed into graphql schema; therefore
                   we recursively search deeper */
                  if (typeof tmpFieldEle.type === 'object') {
                    backtrack(tmpFieldEle.type);
                  }
                  tmpArr.push(tmpFieldEle); // keep collect the current layer's data
                }
              } else if (newObj.symbols) {
                tmpArr.push(newObj.symbols);
              } else {
                console.log('Syntax error with kafka stream producer schema: missing both fields and symbols');
              }
            } else {
              console.log('Syntax error with kafka stream producer schema: missing both name and items');
            }
          } else {
            if (newObj.items) {
              backtrack(newObj.items);
              return;
            }
          }
        }
        res.push(tmpArr);
      }
    }
    backtrack(JSON.parse(fileData));
    return (res);
  } catch (err) {
    console.log(
      'Error: there was an issue finding, reading, or parsing the schema'
    );
    return
  }
};

/**
 * formats to form of graphQL schema by iterating over parsed data from inner data of AVRO file
 * 
 * @param {Array[]} newData AVRO data as a deeply nested Array from parseKafkaSchema function
 * @returns formatted data in a form of graphQL schema
 */
const formatGQLSchema = (newData) => {
  try {
    let result = ``;
    for (let i = newData.length - 1; i >= 0; i--) {
      let toAppend = '';
      let prefix = 'type';

      if (Array.isArray(newData[i][1])) {
        prefix = 'enum';
      }
      toAppend += `${prefix} ${newData[i][0]} { \n`;

      for (let j = 1; j < newData[i].length; j++) {
        const currProp = newData[i][j];
        if (prefix !== 'enum') {

          const typeDef = String(currProp.type);
          let currType = `${typeDef[0].toUpperCase().concat(typeDef.slice(1))}`; // capitalize first letter

          // if starts with Null, its type is an array filled with instances of a custom type
          if (currType.startsWith('Null')) {
            currType = `[${currProp.type[1].items[1].name}]`;
            toAppend += `  ${currProp.name}: ${currType} \n`;
            // if currType is [object, Object], the type will be a single custom type
          } else if (currType.startsWith('[object')) {
            currType = `${currProp.type.name}`;
            toAppend += `  ${currProp.name}: ${currType} \n`;
          } else {
            toAppend += `  ${currProp.name}: ${currType} \n`;
          }
        } else {
          //iterate through values in array and add to toAppend
          for (let k = 0; k < newData[i][j].length; k++) {
            toAppend += `  ${newData[i][j][k]}\n`;
          }
        }
      }
      toAppend += '}\n';
      result += toAppend;
    }
    return result

  } catch (err) {
    console.log(`Error: while formatting final data for graphQL schema - ${err}`)
    return
  }
};

/**
 * Wrap the processed GQL schema data with subscription to be written to final
 * form of graphqlSchema
 * 
 * @param {String} formattedData final graphql schema portion 
 * @param {Array of [String, String]} topicsTypesZip collected return from zipTopicTypes function
 * @returns complete form of graphql schema file
 */
const completeTypeDef = (formattedData, topicsTypesZip) => {
  let subs = ``;
  for (const topicType of topicsTypesZip) {
    subs += `  ${topicType[0]}: ${topicType[1]}
`;
  }

  let result = `const { gql } = require('apollo-server-express');

module.exports = gql\`
type Query {
  exampleQuery: String!
}
type Subscription {
${subs}}\n`;

  result += formattedData
  result += '`;';
  return result
}

module.exports = {
  parseKafkaSchema,
  formatGQLSchema,
  getInnerData,
  completeTypeDef,
  zipTargets,
  zipTopicTypes
}