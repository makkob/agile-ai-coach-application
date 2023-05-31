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
    prompt: text,
  });
  console.log(
    "completion.data.choices[0].text",
    completion.data.choices[0].text
  );
}
