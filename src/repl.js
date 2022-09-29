import repl from 'repl';
import fs from 'fs';
import path from 'path';
import { executeHandler } from './execute_handler.js';
import { ExecuteRequest, Memory } from '@soulmachines/smskillsdk';

console.log('don')

let config = {};
try {
  const configFile = path.join(__dirname, '../config.json');
  config = JSON.parse(fs.readFileSync(configFile, 'utf-8'));
  console.log('Using config.json values:', config);
} catch (e) {
  console.log('WARNING: Could not load config.json');
  console.log(e.message);
}

let memory = [];

console.log('\n');
console.log('=== SKILL REPL ===');
console.log("Enter 'exit' to exit");

async function processInput(cmd, context, filename, callback) {
  console.log(typeof memory)
  const command = cmd.trim();
  if (command === 'exit') {
    process.exit();
  }

  const req = {
    text: command,
    projectId: 'xxx',
    sessionId: 'xxx',
    memory,
    config,
  };
  // console.log(req);

  try {
    const res = await executeHandler(req);
    console.log(res);
    console.log('-----')

    // update memory
    memory = res.memory;
    console.log(res.output)
    callback(null, res.output.text);
  } catch (err) {
    console.log(err);
    callback(null, 'Request failed');
  }
}

repl
  .start({
    prompt: '>>> ',
    input: process.stdin,
    output: process.stdout,
    eval: processInput,
  })
  .on('exit', () => {
    process.exit();
  });
