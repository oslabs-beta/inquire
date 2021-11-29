const fs = require('fs');


const testpkg = () => {
  fs.readFile('../data/testData/expAvroSample.js', 'utf-8', function(err, data) {
    let fileData = data;
    //checks if schema is defined within Avro's forSchema function call
    const expAvroRGX = /avro\.Type\.forSchema\(/g;

    if (expAvroRGX.test(fileData)) {
      /* If the words avro.Type.forSchema are found, we want to extract the schema object
         from within the function call for further processing. To do this, we're using
         regular expressions that match everything between the opening and closing parentheses.
      */
      //retrieve the argument example: forSchema({"name": "category"}) ---> {"name": "category"}
      let innerData = fileData.match(/(?<=avro\.Type\.forSchema\()[\s\S]*?(?=\);)/)[0].trim();
      
      //check if the argument is a variable name instead of explicitly defined object
      if (innerData[0] !== '{') {
        //craft new RegExp since it's compatible with variable names
        const varDefRegex = new RegExp('(?<=' + innerData + ' =' + ')[\\s\\S]*(?=};)');
        
        innerData = fileData.match(varDefRegex).join("") + '}';
      }
      fileData = innerData;
      //reformat it so that it will work with our algorithm if necessary?
    }

    //we could maybe change this logic to account for different naming conventions
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
      backtrack(JSON.parse(fileData))
      makeSchema(res);

    } catch (err) {
      console.log("Error: there was an issue finding, reading, or parsing the schema");
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