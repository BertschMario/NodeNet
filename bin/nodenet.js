#! /usr/bin/env node
const version = require('../package.json').version;
const fs = require('fs');
const path = require("path");
const exec = require('child_process').exec;

const noArgs = process.argv.length === 2;
const firstArg = process.argv[2];
const secondArg = process.argv[3];
const isDebug = process.argv.includes('--debug') || process.argv.includes('-d');

function os_func() {
    this.execCommand = function (cmd) {
        return new Promise((resolve, reject)=> {
            const out = exec(cmd, (error, stdout, stderr) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(stdout)
            })
            out.stderr.on('data', (data) => {
                logDebug(data);
            });
        })
    }
}
const os = new os_func();


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
    
    const templatePath = `${__dirname}/set-up-project`;
    const newProjectPath = `${process.cwd()}/${projectName}`;
    
    await copyFolderRecursiveSync(templatePath, newProjectPath);
    logDebug(`Project created at: ${newProjectPath}`)
    
    await changePackageJsonName(newProjectPath, projectName);
    logDebug(`Project name changed to: ${projectName}`)
    
    os.execCommand(`cd ${newProjectPath} && npm install --verbose`).then(()=> {
        logSuccess('Project created successfully');
    }).catch((err)=> {
        logError(err);
    });
}

async function copyFolderRecursiveSync(src, dest) {
    let exists = fs.existsSync(src);
    let stats = exists && fs.statSync(src);
    let isDirectory = exists && stats.isDirectory();
    if (isDirectory) {
        if(!fs.existsSync(dest)) {
            fs.mkdirSync(dest);
            logDebug(`Created folder: ${dest}`)
        }
        fs.readdirSync(src).forEach(function(childItemName) {
            copyFolderRecursiveSync(path.join(src, childItemName),
              path.join(dest, childItemName));
        });
    } else {
        fs.copyFileSync(src, dest);
        logDebug(`Copied file: ${dest}`)
    }
}

async function changePackageJsonName(newProjectPath, projectName){
    const packageJsonPath = `${newProjectPath}/package.json`;
    const packageJson = fs.readFileSync(packageJsonPath).toString();
    const packageJsonObj = JSON.parse(packageJson);
    packageJsonObj.name = projectName;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJsonObj, null, 2));
    logDebug(`Changed package.json name to: ${projectName}`)
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
    if(!isDebug) return;
    console.log('\x1b[34m%s\x1b[0m', '[Debug] ', msg);
}
