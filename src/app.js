// Copyright 2022 Soul Machines Ltd
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

//     http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import yargs from 'yargs';
import express from 'express';
import bodyParser from 'body-parser';
import {
  executeHandler,
  sessionHandler,
  initHandler,
  endPointEndProjectHandler,
} from './execute_handler.js';
import {
  ExecuteRequest,
  SessionRequest,
  InitRequest,
} from '@soulmachines/smskillsdk';

const router = express.Router();
export const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.post(
  '/init',
  (request, response, next) => {
    console.log('init Request: ' + JSON.stringify(request.body));
    const initRequest = request.body;
    initHandler(initRequest);
    response.setHeader('Content-Type', 'application/json');
    response.status(202).send({});
  }
);

router.delete(
  '/project/:id',
  (request, response, next) => {
    console.log(
      'Request: delete endpoint endProject' + JSON.stringify(request.params)
    );
    const { projectId } = request.params;
    endPointEndProjectHandler(projectId);
    response.setHeader('Content-Type', 'application/json');
    response.status(202).send({});
  }
);

router.post(
  '/session',
  (request, response, next) => {
    console.log('session Request: ' + JSON.stringify(request.body));
    const sessionRequest = request.body;
    const sessionResponse = sessionHandler(sessionRequest);
    console.log('session Response ' + JSON.stringify(sessionResponse, null, 2));
    response.setHeader('Content-Type', 'application/json');
    response.send(sessionResponse);
  }
);

/**
 * ExpressJS entry point. You should not need to edit this file
 * instead, place your code in the execute_handler.ts file (or
 * one of the other *_handler.ts files corresponding to lifecycle
 * events). This is just used for local testing. You can start
 * it by running 'npm run serve'.
 */
router.post(
  '/execute',
  async (request, response, next) => {
    console.log('execute Request: ' + JSON.stringify(request.body));
    const executeRequest = request.body;
    const executeResponse = await executeHandler(executeRequest);
    console.log(
      'execute Response: ' + JSON.stringify(executeResponse, null, 2)
    );
    response.setHeader('Content-Type', 'application/json');
    response.send(executeResponse);
  }
);

app.use('/', router);

const args = yargs(process.argv.slice(2))
  .option({
    port: { type: 'number', default: 4000, describe: 'Port to serve on' },
  })
  .help()
  .parseSync();

app.listen(args.port, () => {
  console.log(`Soul Machines Skill started on port ${args.port}.`);
});
