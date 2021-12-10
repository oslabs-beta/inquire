#!/usr/bin/env node
const yargs = require('yargs');
const path = require('path');
const fs = require('fs');

//goal is to get one string argument from this, send it to initTopiQL function in testpkg/startTopiQL.js
const initTopiQL = require('./startTopiQL');
const makeTopiQL = require('./makeTopiQL');


//take one argument, relative path wherein to create topiQL folder
const builder = command => {
  command
  .positional("absPath", {
    describe: "absolute path to destination folder for topiQL"
  })
}

const initHandler = ({absPath}) => {
  fs.writeFileSync(path.resolve(__dirname, 'file.json'), JSON.stringify(absPath));
  initTopiQL(absPath); //will this work with Han's mode selection? Think so
}

const configHandler = () => {
  const storedPath = path.resolve(__dirname, 'file.json');
  if (fs.existsSync(storedPath)) {
    const config = fs.readFileSync(storedPath);
    makeTopiQL.toGraphQL(config);
    //read the file - if file exists, use the contents + topiQL/config.js
    //hide file, potentially change its file properties
    //makeTopiQL.toGraphQL(config);
  } else {
    console.log("no config file found");
  }
  
}

yargs.command("init <absPath>", false, builder, initHandler).parse();
yargs.command("config", false, builder, configHandler).parse();