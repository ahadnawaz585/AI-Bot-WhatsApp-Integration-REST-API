import { GoogleGenerativeAI } from "@google/generative-ai";
import { ENV } from '../lib/env';
import { answer } from "../types/answer";


export class GenerativeAIModel {
  private genAI: GoogleGenerativeAI;
  private apiKey: string;

  constructor() {
    this.apiKey = ENV.geminiKey || '';
    this.genAI = new GoogleGenerativeAI(this.apiKey);
  }

  async generateContent(prompt: string): Promise<answer> {
    const model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const answer = await result.response.text();
    return { answer };
  }
}
