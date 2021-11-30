const fs = require('fs');


const testpkg = () => {
  // fs.readFile('../data/testData/expAvVarSample.js', 'utf-8', function (err, data) {
  // fs.readFile('../data/testData/expAvroSample.js', 'utf-8', function (err, data) {
  fs.readFile('../data/testData/avscSample.avsc', 'utf-8', function (err, data) {
    let fileData = data;
    //checks if schema is defined within Avro's forSchema function call
    const expAvroRGX = /avro\.Type\.forSchema\(/g;
    // console.log('FILEDATA')
    // console.log(fileData);
    if (expAvroRGX.test(fileData)) {
      /* If the words avro.Type.forSchema are found, we want to extract the schema object
         from within the function call for further processing. To do this, we're using
         regular expressions that match everything between the opening and closing parentheses.
      */
      //retrieve the argument example: forSchema({"name": "category"}) ---> {"name": "category"}
      let innerData = fileData.match(/(?<=avro\.Type\.forSchema\()[\s\S]*?(?=\);)/)[0].trim();
      // console.log('INNERDATA')
      // console.log(innerData)
      //check if the argument is a variable name instead of explicitly defined object
      if (innerData[0] !== '{') {
        //craft new RegExp since it's compatible with variable names
        const varDefRegex = new RegExp('(?<=' + innerData + ' =' + ')[\\s\\S]*(?=};)');

        innerData = fileData.match(varDefRegex).join("") + '}';
        console.log("VAR NAME INNERDATA PROCESSED")
        console.log(innerData)
      }
      fileData = innerData;
      //reformat it so that it will work with our algorithm if necessary?
    }
    console.log("-------------------------------------")



    //we could maybe change this logic to account for different naming conventions
    try {
      let i = 0
      let res = []
      function backtrack(newObj) {
        console.log("this is newObj:", newObj);
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
          // // if newobj has type
          // if (newObj.type) {
          //   // and the type is record
          //   if (newObj.type === 'record') {
          //     // look for name & fields -> iterate over fields
          //     if (newObj.name && newObj.fields) {
          //       tmpArr.push(newObj.name);
          //       for (let j = 0; j < newObj[fields].length; j++) {
          //         let tmpFieldEle = newObj[fields][j];
          //         if (typeof tmpFieldEle.type === 'object') {
          //           backtrack(tmpFieldEle.type);
          //         }
          //         tmpArr.push(tmpFieldEle);
          //       }
          //     } else {
          //       console.log("Syntax error with kafka stream producer schema: missing name or fields")
          //     }
          //   } else {
          //     // check if there is items
          //     // then recursively call that items
          //   }
          // }

          for (const key in newObj) { //fields, name, type
            if (key === 'type' && newObj[key] !== 'record' && newObj[key] !== 'enum') {
              //no logic in here
              // console.log("key isn't record nor enum")
            } else if (key === 'type') {
              console.log("key is type and its value is record or enum")
              flag = true
            } else if (key === 'name' && flag) {
              // console.log("saving name to tmpArr -> ", newObj[key])
              tmpArr.push(newObj[key])
            } else if (key === 'fields' && flag) {
              // console.log("entered field")
              for (let j = 0; j < newObj[key].length; j++) {
                let tmpFieldEle = newObj[key][j]
                console.log("in the for loop / fieldElement -> ", tmpFieldEle)
                if (typeof tmpFieldEle.type === 'object') {
                  // console.log("recursive call")
                  backtrack(tmpFieldEle.type)
                }
                tmpArr.push(tmpFieldEle)
              }
            } else if (key === 'symbols' && flag) {
              // console.log("we found symbols, we are adding -> ", newObj[key])
              tmpArr.push(newObj[key])
            } else if (key === 'items') {
              backtrack(newObj[key])
              return
            }
          }

          res.push(tmpArr)
        }
      }
      // console.log('fileData within try block', fileData);
      // console.log(JSON.parse(fileData))
      // console.log("^^^^^^^^^^^^^^^^^^^^^^^")
      backtrack(JSON.parse(fileData))
      // console.log("------------")
      // console.log(res)
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
  console.log("------------")
  console.log(newData);

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
    if (Array.isArray(newData[i][1])) prefix = 'enum';

    toAppend += `${prefix} ${newData[i][0]} { \n`
    //add enum instead of type
    for (let j = 1; j < newData[i].length; j++) {

      const currProp = newData[i][j];
      if (prefix !== 'enum') {
        const typeDef = String(currProp.type);
        let currType = `${typeDef[0].toUpperCase().concat(typeDef.slice(1))}!`;
        if (currType === 'Null') { //create an array with custom type inside - how to deal with arrays as a type if just regular data type wanted? like an array of Strings
          currType = `[${currProp.type[1].items[1].name}]`;
        } else if (currType[0] === '[') {
          currType = `${currProp.type.name}!`
          console.log(currType);
          toAppend += `  ${currProp.name}: ${currType} \n`
        }
      } else {
        console.log(newData[i][j], "becomes --->");
        console.log(newData[i][j][1])
        //iterate through values in array and add to toAppend
        for (let k = 0; k < newData[i][j].length - 1; k++) {
          console.log("111111111111111")
          toAppend += `  ${newData[i][j][k]},\n`
          console.log("3333333333")
        }
        console.log("2222222222222")
        toAppend += `  ${newData[i][j][newData.length - 1]}\n`
        console.log("enum building string ->", toAppend)
      }



    }
    toAppend += '}\n';
    result += toAppend;
  }
  result += '\`);'
  fs.writeFileSync('./graphqlSchema.js', result);
}