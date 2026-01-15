import { ChatPromptTemplate } from '@langchain/core/prompts';
import { RunnableSequence } from '@langchain/core/runnables';

import { model } from './model';
import { systemPrompt } from './prompt';
import { responseFormat } from './response';
import { getUserLocation, getWeather } from './tools';

// Create a prompt template
const prompt = ChatPromptTemplate.fromMessages([
  ['system', systemPrompt],
  ['human', '{input}'],
]);

// Bind tools to the model
const modelWithTools = model.bindTools([getUserLocation, getWeather]);

// Create the agent chain
const agent = RunnableSequence.from([prompt, modelWithTools]);

export async function runAgent(userMessage = 'what is the weather outside?') {
  try {
    // First, invoke the agent with tools to handle tool calls
    await agent.invoke({ input: userMessage });

    // Then get structured output
    // Use functionCalling method which handles optional fields better than jsonSchema
    const structuredModel = model.withStructuredOutput(responseFormat, {
      method: 'functionCalling',
    });
    const structuredResponse = await structuredModel.invoke([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userMessage },
    ]);

    return {
      success: true,
      data: structuredResponse,
    };
  } catch (error) {
    console.log('🪵 | runAgent | error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}
