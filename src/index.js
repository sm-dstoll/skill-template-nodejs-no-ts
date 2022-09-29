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

import {
  executeHandler,
  sessionHandler,
  initHandler,
  endPointEndProjectHandler,
} from './execute_handler.js';
import { formatResponse, formatError } from './utils.js';
import {
  ExecuteRequest,
  SessionRequest,
  InitRequest,
} from '@soulmachines/smskillsdk';

/**
 * AWS Lambda entry point. You should not need to edit this file
 * instead, place your code in the endpoint_execute.ts file (or
 * one of the other endpoint_XXX.ts files for other lifecycle events)
 *
 * @param event
 * @param context
 */
export const handler = async (
  event = {},
  context = {}
) => {
  console.log('## CONTEXT: ' + JSON.stringify(context));
  console.log('## EVENT: ' + JSON.stringify(event));
  try {
    let response = '{}';
    let status = 200;

    if (event.path.endsWith('/execute') && event.httpMethod === 'POST') {
      const executeRequest = JSON.parse(event.body);
      const executeResponse = executeHandler(executeRequest);
      response = JSON.stringify(executeResponse);
    } else if (event.path.endsWith('/session') && event.httpMethod === 'POST') {
      const sessionRequest = JSON.parse(event.body);
      const sessionResponse = sessionHandler(sessionRequest);
      response = JSON.stringify(sessionResponse);
    } else if (event.path.endsWith('/init') && event.httpMethod === 'POST') {
      const initRequest = JSON.parse(event.body);
      initHandler(initRequest);
      status = 202;
    } else if (
      event.path.includes('/project') &&
      event.httpMethod === 'DELETE'
    ) {
      const uri = event.path.split('/');
      endPointEndProjectHandler(uri[uri.length - 1]);
      status = 202;
    } else {
      status = 404;
      response = JSON.stringify({ message: 'Not Found' });
    }

    return formatResponse(status, response);
  } catch (error) {
    return formatError(error);
  }
};
