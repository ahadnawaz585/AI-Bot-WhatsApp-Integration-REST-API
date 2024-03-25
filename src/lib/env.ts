import * as dotenv from "dotenv";
const configEnv = () => dotenv.config();

configEnv();

export const ENV = {
  openaiKey: process.env.OPEN_AI_API_KEY,
  stabilityKey: process.env.STABILITY_API_KEY,
  geminiKey: process.env.GEMINI_API_KEY,
};
