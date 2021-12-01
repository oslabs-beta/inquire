const fs = require('fs');
const path = require('path');
//import config file
const configPath = path.resolve(__dirname, '../server/topiQL/config.js');
const config = require(configPath);


const toGraphQL = () => {
  
  try {
    fs.readFile(config.schemaFile, 'utf-8', function (err, data) {
    // fs.readFile('../data/testData/expAvroSample.js', 'utf-8', function (err, data) {
    // fs.readFile('../data/testData/expAvVarSample.js', 'utf-8', function (err, data) {
      let fileData = data;
      //checks if schema is defined within Avro's forSchema function call
      const expAvroRGX = /avro\.Type\.forSchema\(/g;
      if (expAvroRGX.test(fileData)) {
        //find schema object within forSchema call
        let innerData = fileData.match(/(?<=avro\.Type\.forSchema\()[\s\S]*?(?=\);)/)[0].trim();
        
        //check if the argument is a variable name instead of explicitly defined object
        if (innerData[0] !== '{') {
          //find variable definition
          const varDefRegex = new RegExp('(?<=' + innerData + ' =' + ')[\\s\\S]*(?=};)');
          innerData = fileData.match(varDefRegex).join("") + '}';
        }
        //reassign fileData
        fileData = innerData;
      }
      //call the parsing algorithm with extracted data
      testpkg(fileData);
    });
  } catch (err) {
    console.log('there was a problem finding, reading, or parsing the file containing your avro schema')
  }
}


const testpkg = (fileData) => {
  try {
    let res = []
    function backtrack(newObj) {
      let tmpArr = []
      //check if the curr obj is an array instance
      if (Array.isArray(newObj)) {
        //iterate and check for object type at each idx
        for (let k = 0; k < newObj.length; k++) {
          if (typeof newObj[k] === 'object') {
            //recursive call
            backtrack(newObj[k])
            return
          }
        }
      } else {
        if (newObj.type) {
          if (newObj.type === 'record' || newObj.type === 'enum') {
            if (newObj.name) {
              tmpArr.push(newObj.name);
              if (newObj.fields) {
                for (let j = 0; j < newObj.fields.length; j++) {
                  let tmpFieldEle = newObj.fields[j];
                  if (typeof tmpFieldEle.type === 'object') {
                    backtrack(tmpFieldEle.type);
                  }
                  tmpArr.push(tmpFieldEle);
                }
              } else if (newObj.symbols) {
                tmpArr.push(newObj.symbols)
              } else {
                console.log("Syntax error with kafka stream producer schema: missing both fields and symbols")
              }
            }
            else {
              console.log("Syntax error with kafka stream producer schema: missing both name and items")
            }
          } else {
            if (newObj.items) {
              backtrack(newObj.items)
              return
            }
          }
        }

        res.push(tmpArr)
      }
    }
    backtrack(JSON.parse(fileData));

    makeSchema(res);
  } catch (err) {
    console.log("Error: there was an issue finding, reading, or parsing the schema");
  }
}



const makeSchema = (newData) => {
  let result =
    `const { gql } = require('apollo-server-express');

module.exports = gql\`
type Query {
}
type Subscription {

}\n`;

  for (let i = newData.length - 1; i >= 0; i--) {
    let toAppend = '';
    let prefix = 'type';

    if (Array.isArray(newData[i][1])) {
      prefix = 'enum';
    }

    toAppend += `${prefix} ${newData[i][0]} { \n`

    for (let j = 1; j < newData[i].length; j++) {


      const currProp = newData[i][j];
      if (prefix !== 'enum') {
        const typeDef = String(currProp.type);
        let currType = `${typeDef[0].toUpperCase().concat(typeDef.slice(1))}`;

        if (currType[0] === 'N') {
          //define array of custom types if Null
          currType = `[${currProp.type[1].items[1].name}]`;
          toAppend += `  ${currProp.name}: ${currType} \n`;
        } else if (currType[0] === '[') {
          //define custom type
          currType = `${currProp.type.name}`;
          toAppend += `  ${currProp.name}: ${currType} \n`;
        } else {
          toAppend += `  ${currProp.name}: ${currType} \n`;
        }
      } else {
        //iterate through values in array and add to toAppend
        for (let k = 0; k < newData[i][j].length; k++) {
          toAppend += `  ${newData[i][j][k]}\n`
        }
      }
    }
    toAppend += '}\n';
    result += toAppend;
  }
  result += '\`;'
  console.log(result);
  console.log(config.destinationFolder);
  fs.writeFileSync(`${config.destinationFolder}/typeDefs.js`, result);
}

const makeResolvers = () => {
  
}

const makePublishers = () => {

}

const makeServer = () => {
  let result =
  `// Apollo docs describing how to swap apollo server: 
  // https://www.apollographql.com/docs/apollo-server/integrations/middleware/#swapping-out-apollo-server
  // Once server is swapped, Apollo docs to use subscriptions: 
  // https://www.apollographql.com/docs/apollo-server/data/subscriptions/#enabling-subscriptions
  
  const express = require('express');
  const { createServer } = require('http');
  const { execute, subscribe } = require('graphql');
  
  const { ApolloServer } = require('apollo-server-express');
  const { SubscriptionServer } = require('subscriptions-transport-ws');
  const { makeExecutableSchema } = require('@graphql-tools/schema');
  
  // Import schema and resolvers from files.
  const typeDefs = require('./topiQL/typeDefs.js');
  const resolvers = require('./topiQL/resolvers.js');
  
  // Import "publishers" from file. 
  // These "publishers" are consumers that read messages from a kafka topic and publish to a PubSub topic.
  const { publishers } = require('./topiQL/kafkaPublisher.js');
  publishers.publisherStatus();
  
  // Server start must be wrapped in async function
  (async function () {
    const app = express();
  
    const httpServer = createServer(app);
  
    const schema = makeExecutableSchema({
      typeDefs,
      resolvers,
    });
  
    const subscriptionServer = SubscriptionServer.create(
      { schema, execute, subscribe },
      { server: httpServer, path: '/graphql' }
    );
  
    const server = new ApolloServer({
      schema,
      plugins: [{
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            }
          };
        }
      }],
    });
    await server.start();
    server.applyMiddleware({ app });
  
    const PORT = 3000;
    httpServer.listen(PORT, () =>
      console.log(\`Server is now running on http://localhost:\${PORT}/graphql\`)
    );
  })();
  `;
  
  fs.writeFileSync(path.resolve(__dirname, '../server/server.js'), result);
}

toGraphQL();
// makeResolvers();
// makePublishers();
makeServer();