import { ChatOpenAI } from '@langchain/openai';
import { fetch as expoFetch } from 'expo/fetch';
export const model = new ChatOpenAI({
  model: 'gpt-4o-mini',
  temperature: 0.5,
  timeout: 10000,
  maxTokens: 1000,
  streaming: true,
  configuration: {
    fetch: expoFetch,
  },
});
