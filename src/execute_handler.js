import axios from 'axios';
import { setMemoryValue } from '@soulmachines/smskillsdk';

export function executeHandler(req) {
  console.log('EXECUTE HANDLER')
  const memory = req.memory;

  return axios.get('https://www.reddit.com/r/ProgrammerHumor/top.json?nsfw=0&sort=top&t=day')
    .then(res => {
      const randomPost = getRandomPost(res.data.data.children);
      setMemoryValue(memory, req.text, '12345', req.sessionId, 'PUBLIC')
      const variables = {
        "public-image": {
          "component": "image",
          "data": {
            "url": randomPost.data.url,
            "alt": randomPost.data.title
          }
        }
      }
      const resp = {
        output: {
          text: `@showCards(image) ${randomPost.data.title}`,
          variables: variables,
        },
        memory: memory,
        endConversation: false,
        endRouting: false,
      } 
      return resp;
    });
}

function getRandomPost(apiResponse) {
  return apiResponse[Math.floor(Math.random() * apiResponse.length)];
}


export function sessionHandler() {
  console.log('SESSION HANDLER')
}
export function initHandler() {
  console.log()
}
export function endPointEndProjectHandler() {
  console.log()
}