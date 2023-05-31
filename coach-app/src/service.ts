import { Configuration, OpenAIApi } from "openai";

import * as dotenv from 'dotenv';

dotenv.config();

const { OPENAI_SECRET_KEY } = process.env;
const configuration = new Configuration({
  apiKey: OPENAI_SECRET_KEY,
});
const openai = new OpenAIApi(configuration);

export async function onOpenAI(text) {
  let completion = await openai.createCompletion({
    model: "text-davinci-003",
    // model: "gpt-3.5-turbo",
    prompt: text,
    max_tokens: 800,
    temperature: 0.6,
    top_p: 0.5,
    n: 2,
    stream: false,
    logprobs: null,
    stop: "\n"
  });
  // console.log(
  //   "completion.data.choices[0].text",
  //   completion.data.choices[0].text
  // );
//   console.log(
//     "completion",
//     completion.data
//   );
return  completion.data.choices[0].text
}
