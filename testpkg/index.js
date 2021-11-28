const fs = require('fs');

let newData = [];
function testpkg() {
  fs.readFile('../data/testData/avscSample.avsc', 'utf-8', function(err, data) {
    try {
      let i = 0
      let res = []
      function backtrack(newObj) {
        let tmpArr = []
        let flag = false
        if (Array.isArray(newObj)) {
          for (let k = 0; k < newObj.length; k++) {
            if (typeof newObj[k] === 'object') {
              backtrack(newObj[k])
              return
            }
          }
        } else {
          for (const key in newObj) {
            if (key === 'type' && newObj[key] !== 'record') {
            } else if (key === 'type') {
              flag = true
            } else if (key === 'name' && flag) {
              tmpArr.push(newObj[key])
            } else if (key === 'fields' && flag) {
              for (let j = 0; j < newObj[key].length; j++) {
                let tmpFieldEle = newObj[key][j]
                if (typeof tmpFieldEle.type === 'object') {
                  backtrack(tmpFieldEle.type)
                }
                tmpArr.push(tmpFieldEle)
              }
            } else if (key === 'items') {
              backtrack(newObj[key])
              return
            }
          }
          res.push(tmpArr)
        }
      }
      backtrack(JSON.parse(data))
      newData = res;

      makeSchema();

    } catch (err) {
      console.log("Error: there was an issue reading or parsing the .avsc schema");
    }
  });
}
testpkg();

//algorithm to format data into GQL schema
//iterate through data
//array of arrays
//Type _____ will be the first index in each array
//any further indices are objects containing children of the main Type along with their respective data types
//usually this is regular like int, float, etc. but can be Array. if inside the brackets it's a custom type, 
//find out based on its contents which other parent Type will go inside those brackets in the generated schema
//is it [currIdx where type array was found].type[1].items.name?
const makeSchema = () => {
  let result = 
`const { buildSchema } = require('graphql');

module.exports = buildSchema(\`
type Query {

}
type Subscription {

}\n`;

  for (let i = newData.length - 1; i >= 0; i--) {
    let toAppend = '';
    toAppend += `type ${newData[i][0]} { \n`
    
    for (let j = 1; j < newData[i].length; j++) {

      const currProp = newData[i][j];
      const typeDef = String(currProp.type);
      let currType = `${typeDef[0].toUpperCase().concat(typeDef.slice(1))}!`;

      if (currType[0] === 'N') { //create an array with custom type inside - how to deal with arrays as a type if just regular data type wanted? like an array of Strings
        currType = `[${currProp.type[1].items[1].name}]`;
      } else if (currType[0] === '[') {
        currType = `${currProp.type.name}!`
      }
      
      toAppend += `   ${currProp.name}: ${currType} \n`
    }
    toAppend += '}\n';
    result += toAppend;
  }
  result += '\`);'
  fs.writeFileSync('./graphqlSchema.js', result);
}