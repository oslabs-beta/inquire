const { defaultInputTarget } = require('concurrently/src/defaults');
const fs = require('fs');
const path = require('path');
const { rawListeners } = require('process');
const initTool = require('./tools/initTool');

//make a directory in destination folder (server) called inquire

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

const initInquire = async (absPath) => {
  await modePrompt();
  await dataPrompt();
  rl.on('close', async () => {
    const targets = await initTool.createTargets(pickedMode, dataFolder);
    const config = await initTool.createConfig(targets, pickedMode, dataFolder);
    if (!fs.existsSync(`${absPath}/inquire`)) {
      fs.mkdirSync(`${absPath}/inquire`);
    }
    fs.writeFileSync(`${absPath}/inquire/config.js`, config);
  });
  rl.close();
};

module.exports = { initInquire };
