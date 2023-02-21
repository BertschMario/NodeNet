#! /usr/bin/env node
const version = require('../package.json').version;
const fs = require('fs');

const noArgs = process.argv.length === 2;
const firstArg = process.argv[2];
const secondArg = process.argv[3];
const isDebug = process.argv.includes('--debug') || process.argv.includes('-d');

const _ = async function(){
    if(isDebug) logDebug('Debug mode enabled');
    if(noArgs) return await nodeNet();
    if(firstArg === '--help' || firstArg === '-h') return await printHelp();
    if(firstArg === '--version' || firstArg === '-v') return await printVersion();
    if(firstArg === 'new' || firstArg === 'n') return await newNodeNetProject(secondArg);
    
    return logError('Invalid command. Use --help to see available commands');
}()

async function nodeNet() {
    console.log('\x1b[32m%s\x1b[0m', `NodeNet CLI v${version}`);
    console.log('\x1b[32m%s\x1b[0m', `Usage: nodenet <command> [options]\n`);
    await printHelp();
}

async function printHelp(){
    console.log(`\tArguments\t\tDescription\t\t\tUsage`);
    console.log('\t------------------------------------------------------------------------------------------')
    console.log(`\tnew, n\t\t\tCreate a new project \t\tnodenet new <project-name>`);
    console.log(`\t--debug, -d\t\tEnable debug mode\t\tnodenet new <project-name> --debug`);
    console.log(`\t--version, -v\t\tShow installed version\t\tnodenet --version`);
    console.log(`\t--help, -h\t\tShow help\t\t\tnodenet --help`);
}

async function printVersion(){
    console.log(`NodeNet CLI v${version}`);
}

async function newNodeNetProject(projectName){
    if(!projectName) return logError('Project name is required => nodenet new <project-name>');
    logInfo(`Creating new NodeNet project: ${projectName}`);
    fs.writeFileSync('readme.md', `# ${projectName}`);
}



function logError(err) {
    console.log('\x1b[31m%s\x1b[0m', '[Error] ', err);
}
function logSuccess(msg) {
    console.log('\x1b[32m%s\x1b[0m', '[Success] ', msg);
}
function logInfo(msg) {
    console.log('\x1b[33m%s\x1b[0m', '[Info] ', msg);
}
function logDebug(msg) {
    console.log('\x1b[34m%s\x1b[0m', '[Debug] ', msg);
}
