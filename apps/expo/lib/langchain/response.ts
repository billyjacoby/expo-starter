import * as z from 'zod';

export const responseFormat = z.object({
  punny_response: z.string(),
  weather_conditions: z.string().optional(),
});
