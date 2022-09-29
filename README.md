# skill-template-nodejs-no-ts
This is a template for creating a skill using the Soul Machines Skill REST API which can be deployed to AWS Lambda. The skill itself echoes the user's input back to the user.

The main Lambda function is contained in src/index.ts. This template skill uses a stateless approach, where only the /execute endpoint of the Skills API is called. Request and response models are provided by the Soul Machines smskillsdk package - see docs.soulmachines.com for more information. The main logic used to generate responses to requests is contained in src/execute_handler.js.

[Third party skills setup google doc](https://docs.google.com/document/d/1k-ST460sdu5NkyZXVOUaGWMmvb3-nIKB6WbAydZXJP8/edit?usp=sharing)
[Skills api developer docs](https://docs.soulmachines.com/skills-api/)

## Local development
Use Node >= v145
### Installation
`npm install`
### Local development server
`npm run serve [-- --port=[PORT]]`

The local development server is implemented using the Express framework. This is implemented in src/app.ts. The port argument is optional and defaults to 4000.

## REPL
The executeHandler function can be tested in REPL environment by running

`npm run repl`
To provide configuration to be sent with every request, create a config.json file in the root of this repository - the contents of this file will be sent with every request. The REPL is implemented in src/repl.ss.

