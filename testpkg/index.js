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


function testpkg() {
  // fs.readFile('../data/testData/avscSample.avsc', 'utf-8', function(err, data) {
    try {
      // let parsedData = JSON.parse(data)
      console.log(parsedData)
      console.log("vvvvvvvvvvvvvvvvvvvvvvv")
      console.log(parsedData.fields[2].type)
      console.log("-----------------------")
      console.log(parsedData.fields[2].type[1])
      console.log("^^^^^^^^^^^^^^^^^^^^^^^")
      console.log(parsedData.fields[2].type[1].items[1].fields)
      console.log("------WARZONE-----")
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
      console.log(res)
      return res

    } catch(err) {
      console.log(err)
    }
  // })
}
//can use this function call for Quokka debugging
testpkg();

// module.exports = {testpkg};