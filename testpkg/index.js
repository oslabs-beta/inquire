const fs = require('fs');


const testpkg = () => {
  fs.readFile('../data/testData/avscSample.avsc', 'utf-8', function (err, data) {
    // fs.readFile('../data/testData/expAvroSample.js', 'utf-8', function (err, data) {
    // fs.readFile('../data/testData/avscSample.avsc', 'utf-8', function (err, data) {
    let fileData = data;
    //checks if schema is defined within Avro's forSchema function call
    const expAvroRGX = /avro\.Type\.forSchema\(/g;
    if (expAvroRGX.test(fileData)) {
      
      let innerData = fileData.match(/(?<=avro\.Type\.forSchema\()[\s\S]*?(?=\);)/)[0].trim();

      //check if the argument is a variable name instead of explicitly defined object
      if (innerData[0] !== '{') {
        //find variable definition
        const varDefRegex = new RegExp('(?<=' + innerData + ' =' + ')[\\s\\S]*(?=};)');
        innerData = fileData.match(varDefRegex).join("") + '}';
      }
      fileData = innerData;
    }

    try {
      let i = 0
      let res = []
      function backtrack(newObj) {
        let tmpArr = []
        if (Array.isArray(newObj)) {
          for (let k = 0; k < newObj.length; k++) {
            if (typeof newObj[k] === 'object') {
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
                  console.log(newObj.fields)
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
      backtrack(JSON.parse(fileData))
      makeSchema(res);
    } catch (err) {
      console.log("Error: there was an issue finding, reading, or parsing the schema");
    }
  });
}
testpkg();


const makeSchema = (newData) => {
  let result =
    `const { buildSchema } = require('graphql');

module.exports = buildSchema(\`
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
          //define array of custom types
          currType = `[${currProp.type[1].items[1].name}]`;

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
  result += '\`);'
  fs.writeFileSync('./graphqlSchema.js', result);
}