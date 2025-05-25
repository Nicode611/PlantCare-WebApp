// ESM (TypeScript ou modern Node.js)
import Groq from 'groq-sdk';

export const groqClient = new Groq({
  apiKey: process.env.GROQ_API_KEY,  // pris depuis le .env
});