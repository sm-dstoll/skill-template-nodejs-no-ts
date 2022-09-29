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

// Utility functions for formatting AWS Lambda responses

export function formatResponse(status, body) {
  const response = {
    statusCode: status,
    headers: {
      'Content-Type': 'application/json',
    },
    isBase64Encoded: false,
    multiValueHeaders: {
      'X-Custom-Header': ['My value', 'My other value'],
    },
    body: body,
  };
  return response;
}

export function formatError(error) {
  const response = {
    statusCode: error.statusCode,
    headers: {
      'Content-Type': 'text/plain',
      'x-amzn-ErrorType': error.code,
    },
    isBase64Encoded: false,
    body: error.code + ': ' + error.message,
  };
  return response;
}
