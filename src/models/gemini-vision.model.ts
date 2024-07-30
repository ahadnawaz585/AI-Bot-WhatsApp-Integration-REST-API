// GenerativeVisionAIModel.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ENV } from "../lib/env";
import fs from "fs";
import { answer } from "../types/answer";
import { Vision } from "../types/vision";

export class GenerativeVisionAIModel {
  private genAI: GoogleGenerativeAI;
  private apiKey: string;

  constructor() {
    this.apiKey = ENV.geminiKey || "";
    this.genAI = new GoogleGenerativeAI(this.apiKey);
  }

  async generateContent(prompt: string, imagePaths: Vision[]): Promise<answer> {
    const model = this.genAI.getGenerativeModel({
      model: "gemini-1.5-pro"
   });

    const imageParts = imagePaths.map(({ path, mimeType }) =>
      fileToGenerativePart(path, mimeType)
    );

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const answer = await response.text();
    return { answer };
  }
}

function fileToGenerativePart(path: string, mimeType: string) {
  return {
    inlineData: {
      data: fs.readFileSync(path, { encoding: "base64" }),
      mimeType,
    },
  };
}
