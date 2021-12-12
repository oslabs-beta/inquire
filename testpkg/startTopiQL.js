const { defaultInputTarget } = require('concurrently/src/defaults');
const fs = require('fs');
const path = require('path');
const { rawListeners } = require('process');
const initTool = require('./tools/initTool');

//make a directory in destination folder (server) called topiQL

let pickedMode;


const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

const initTopiQL = (absPath) => {
  readline.question('what MODE do you want? => 0 for \'AUTO generation' +
    'from Kafka Stream / 1 for \'ALL\' Mode to generate GQL schema from all avsc' +
    ' files in the cloud / 2 for \'SELECT\' Mode to selectively create GQL schema' +
    ' from files\n', mode => {
      pickedMode = mode
      readline.close()
    })
  readline.on('close', async () => {
    const targets = await initTool.createTargets(pickedMode);
    const config = await initTool.createConfig(targets, pickedMode)
    if (!fs.existsSync(`${absPath}/topiQL`)) {
      fs.mkdirSync(`${absPath}/topiQL`);
    }
    fs.writeFileSync(
      `${absPath}/topiQL/config.js`,
      config
    );
  })
};


//after this file is run, user will run their configuration file? which will run index.js in testpkg.
//index.js in testpkg will read the user-given file and output it to the topiQL folder created from this file.
// initTopiQL();

module.exports = { initTopiQL };
