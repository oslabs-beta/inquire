#!/usr/bin/env node
const yargs = require('yargs');
const path = require('path');
const fs = require('fs');

//goal is to get one string argument from this, send it to initTopiQL function in testpkg/startTopiQL.js
const startTopiQL = require('./startTopiQL');
const makeTopiQL = require('./makeTopiQL');

//take one argument, relative path wherein to create topiQL folder
const builder = command => {
  command
  .positional("absPath", {
    describe: "absolute path to destination folder for topiQL"
  })
}

const initHandler = ({absPath}) => {
  fs.writeFileSync(path.resolve(__dirname, 'pathStore.json'), JSON.stringify(absPath));
  startTopiQL.initTopiQL(absPath); //will this work with Han's mode selection? Think so
}

const buildHandler = () => {
  const storedPath = path.resolve(__dirname, 'pathStore.json');
  if (fs.existsSync(storedPath)) {
    const folderDest = JSON.parse(fs.readFileSync(storedPath));
    console.log(folderDest);
    // makeTopiQL.write____(folderDest);
  } else {
    console.log("no config file found");
  }
}

yargs.command("init <absPath>", false, builder, initHandler).parse();
yargs.command("build", false, builder, buildHandler).parse();