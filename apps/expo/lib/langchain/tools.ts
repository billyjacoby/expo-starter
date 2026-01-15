// import { DynamicStructuredTool } from '@langchain/core/tools';
// import * as z from 'zod';

// export const getWeather = new DynamicStructuredTool({
//   name: 'get_weather_for_location',
//   description: 'Get the weather for a given city',
//   schema: z.object({
//     city: z.string().describe('The city to get the weather for'),
//   }),
//   func: async ({ city }) => {
//     return `It's always sunny in ${city}!`;
//   },
// });

// export const getUserLocation = new DynamicStructuredTool({
//   name: 'get_user_location',
//   description: 'Retrieve user information based on user ID',
//   schema: z.object({
//     user_id: z.string().optional(),
//   }),
//   func: async ({ user_id = '1' }) => {
//     return user_id === '1' ? 'Florida' : 'SF';
//   },
// });

import { type ToolRuntime, tool } from 'langchain';
import * as z from 'zod';

export const getWeather = tool(
  (input) => `It's always sunny in ${input.city}!`,
  {
    name: 'get_weather_for_location',
    description: 'Get the weather for a given city',
    schema: z.object({
      city: z.string().describe('The city to get the weather for'),
    }),
  },
);

type AgentRuntime = ToolRuntime<unknown, { user_id: string }>;

export const getUserLocation = tool(
  (_, config: AgentRuntime) => {
    const { user_id } = config.context;
    return user_id === '1' ? 'Florida' : 'SF';
  },
  {
    name: 'get_user_location',
    description: 'Retrieve user information based on user ID',
  },
);
