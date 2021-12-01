const fs = require('fs');
//import config file

const toGraphQL = () => {
  
  try {
    fs.readFile('../data/testData/avscSample.avsc', 'utf-8', function (err, data) {
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
  result += '\`);'

  fs.writeFileSync('./graphqlSchema.js', result);
}


toGraphQL();