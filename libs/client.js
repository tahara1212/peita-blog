import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: 'peitablog',
  apiKey: process.env.API_KEY,
});