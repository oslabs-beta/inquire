#!/usr/bin/env node
const yargs = require('yargs');
// const double = require('./add')

//goal is to get one string argument from this, send it to initTopiQL function in testpkg/startTopiQL.js
const initTopiQL = require('./startTopiQL');



// const coarseNumber = text => {
//   const value = Number(text);
//   if (Number.isFinite(value)) {
//     return value;
//   }
//   throw new Error("please enter a number")
// }


//take one argument, relative path wherein to create topiQL folder
const builder = command => {
  command
  .positional("relativePath", {
    describe: "Relative path to destination folder for topiQL"
  })
}

const handler = ({relativePath}) => console.log(initTopiQL(relativePath));

yargs.command("* <relativePath>", false, builder, handler).parse();