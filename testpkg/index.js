const fs = require('fs')


console.log('hi');

function testpkg(name) {
  console.log(`${name} was here`);
  fs.readFile('../data/testData/test.json', 'utf-8', function(err, data) {
    try {
      console.log(data)
      let dataArr = JSON.parse(data);
      console.log(dataArr[0].name)
      //after this, parse it into GQL schema and write it to file?
      let type = "person"
      console.log(typeof dataArr)
      let parsedStr = `type ${type} {
  name: ${typeof dataArr[0].name}
  status: ${typeof dataArr[0].status}
  xPos: ${typeof dataArr[0].location[0].x}
}`
      console.log("parsedStr -> ", parsedStr)
      fs.writeFile('newestTest.js', parsedStr, function (err, file) {
        if (err) throw err;
        console.log('saved')
      })
    } catch(err) {
      console.log(err)
    }
  })
}



module.exports = {testpkg};