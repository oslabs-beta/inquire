#!/usr/bin/env node
const yargs = require('yargs');
const path = require('path');
const fs = require('fs');

const startInquire = require('./startInquire');

const builder = command => {
  command
  .positional("absPath", {
    describe: "absolute path to destination folder for inquire"
  })
}

const initHandler = ({absPath}) => {
  console.log("cli.js init command executing...");
  fs.writeFileSync(path.resolve(__dirname, 'pathStore.json'), JSON.stringify(absPath));
  startInquire.initInquire(absPath);
}

const buildHandler = () => {
  const makeInquire = require('./makeInquire');
  const storedPath = path.resolve(__dirname, 'pathStore.json');
  if (fs.existsSync(storedPath)) {
    const folderDest = JSON.parse(fs.readFileSync(storedPath));
    makeInquire.writeGraphQLSchema();
    makeInquire.writeResolver();
    makeInquire.writeAsyncIterator();
    makeInquire.writeServer();
  } else {
    console.log("no config file found");
  }
}

yargs.command("init <absPath>", false, builder, initHandler).parse();
yargs.command("build", false, builder, buildHandler).parse();