const fs = require('fs')

const parsedData = {
    "type": "record",
    "name": "Trip",
    "namespace": "com.bakdata.quick.avro",
    "fields": [
      {
        "name": "id",
        "type": "string"
      },
      {
        "name": "vehicleId",
        "type": "string"
      },
      {
        "name": "route",
        "type": [
          "null",
          {
            "type": "array",
            "items": [
              "null",
              {
                "type": "record",
                "name": "Status",
                "fields": [
                  {
                    "name": "statusId",
                    "type": "string"
                  },
                  {
                    "name": "tripId",
                    "type": "string"
                  },
                  {
                    "name": "vehicleId",
                    "type": "string"
                  },
                  {
                    "name": "position",
                    "type": {
                      "type": "record",
                      "name": "Position",
                      "fields": [
                        {
                          "name": "lat",
                          "type": "float"
                        },
                        {
                          "name": "lon",
                          "type": "float"
                        }
                      ]
                    }
                  },
                  {
                    "name": "batteryLevel",
                    "type": "int"
                  },
                  {
                    "name": "distance",
                    "type": "int"
                  },
                  {
                    "name": "timestamp",
                    "type": "int"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }

let data = [];
function testpkg() {
  // fs.readFile('../data/testData/avscSample.avsc', 'utf-8', function(err, data) {
    try {
      // let parsedData = JSON.parse(data)

      // console.log(parsedData)
      // console.log("vvvvvvvvvvvvvvvvvvvvvvv")
      // console.log(parsedData.fields[2].type)
      // console.log("-----------------------")
      // console.log(parsedData.fields[2].type[1])
      // console.log("^^^^^^^^^^^^^^^^^^^^^^^")
      // console.log(parsedData.fields[2].type[1].items[1].fields)
      // console.log("------WARZONE-----")
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
            console.log(key, typeof key)
            if (key === 'type' && newObj[key] !== 'record') {
              console.log("key isnt record")
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
      backtrack(parsedData)
      data = res;
      return res;

    } catch(err) {
      console.log(err)
    }
  // })
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
  //iterate through data array variable
  console.log("________MAKE SCHEMA________")
  let result = `const { buildSchema } = require('graphql');\n\nmodule.exports = buildSchema(\`\n`

  for (let i = data.length - 1; i >= 0; i--) {
    let toAppend = '';
    toAppend += `type ${data[i][0]} { \n`
    
    for (let j = 1; j < data[i].length; j++) {

      const currProp = data[i][j];
      const typeDef = String(currProp.type);
      let currType = `${typeDef[0].toUpperCase().concat(typeDef.slice(1))}!`;

      if (currType[0] === 'N') { //create an array with custom type inside - how to deal with arrays as a type if just regular data type wanted? like an array of Strings
        currType = `[${currProp.type[1].items[1].name}]`;
      } else if (currType[0] === '[') {
        currType = `${currProp.type.name}!`
      }
      
      toAppend += `   ${currProp.name}: ${currType} \n`
    }
    toAppend += '}\n'
    result += toAppend;
  }
  result += '\`);'
  console.log("han I miss you :(");
  fs.writeFileSync('./newNewTest.js', result);
}
makeSchema();


// let type = "person"
  // let gqlSchema = `type ${type} {
  //   name: ${typeof dataArr[0].name}
  //   status: ${typeof dataArr[0].status}
  //   xPos: ${typeof dataArr[0].location[0].x}
  // }`

// module.exports = {testpkg};