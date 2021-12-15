const { defaultInputTarget } = require('concurrently/src/defaults');
const fs = require('fs');
const path = require('path');
const { rawListeners } = require('process');
const initTool = require('./tools/initTool');

//make a directory in destination folder (server) called topiQL

let pickedMode;
let dataFolder;

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const modePrompt = () => {
  return new Promise((resolve, reject) => {
    rl.question(
      '\n' +
        'Choose MODE:\n' +
        '1: Use all files in data folder to create GQL schema\n' +
        '2: Manually specify files when filling out configuration\n' +
        'Enter 1 OR 2: ',
      (mode) => {
        pickedMode = mode;
        resolve();
      }
    );
  });
};

const dataPrompt = () => {
  return new Promise((resolve, reject) => {
    rl.question(
      'Enter absolute path to folder containing schema file(s): \n',
      (folderPath) => {
        dataFolder = folderPath;
        resolve();
      }
    );
  });
};

const initTopiQL = async (absPath) => {
  await modePrompt();
  await dataPrompt();
  rl.on('close', async () => {
    const targets = await initTool.createTargets(pickedMode, dataFolder);
    const config = await initTool.createConfig(targets, pickedMode, dataFolder);
    if (!fs.existsSync(`${absPath}/topiQL`)) {
      fs.mkdirSync(`${absPath}/topiQL`);
    }
    fs.writeFileSync(`${absPath}/topiQL/config.js`, config);
  });
  rl.close();
};

//after this file is run, user will run their configuration file? which will run index.js in testpkg.
//index.js in testpkg will read the user-given file and output it to the topiQL folder created from this file.
// initTopiQL();

module.exports = { initTopiQL};
