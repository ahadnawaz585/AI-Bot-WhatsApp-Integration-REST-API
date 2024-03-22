import * as dotenv from 'dotenv';
const configEnv = () => dotenv.config();

configEnv();

export const ENV = {
    stabilityKey: process.env.STABILITY_API_KEY,
    geminiKey: process.env.GEMINI_API_KEY,
};
