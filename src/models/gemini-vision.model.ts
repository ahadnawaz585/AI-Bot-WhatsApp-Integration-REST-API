// GenerativeVisionAIModel.ts
import { GoogleGenerativeAI, InlineDataPart } from '@google/generative-ai';
import { ENV } from '../lib/env';
import fs from 'fs';
import { answer } from '../types/answer';
import { Vision } from '../types/vision';
import invariant from 'invariant';

export class GenerativeVisionAIModel {
  private genAI: GoogleGenerativeAI;
  private apiKey: string;
 public instructions: string | undefined;
  constructor() {
    this.apiKey = ENV.geminiKey || '';
    invariant(this.apiKey, 'Gemini API key is not provided');
    this.genAI = new GoogleGenerativeAI(this.apiKey);
  }

  async generateContent(prompt: string, imagePaths: Vision[]): Promise<answer> {
    const validMimeTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    
    try {
      const model = this.genAI.getGenerativeModel({
       model: 'gemini-1.5-flash',systemInstruction: this.instructions
      });
      invariant(model, 'Unable to initialize Gemini Generative model');

      // Validate mime types for all images
      for (const { mimeType } of imagePaths) {
        invariant(
          validMimeTypes.includes(mimeType),
          `Invalid image mime type: ${mimeType}. Supported types: ${validMimeTypes.join(', ')}`
        );
      }

      // Convert image paths to generative parts
      const imageParts: InlineDataPart[] = imagePaths.map(({ path, mimeType }) =>
        fileToGenerativePart(path, mimeType)
      );

      // Generate content with prompt and image parts
      const result = await model.generateContent([prompt, ...imageParts]);
      const response = await result.response;
      const text = await response.text();

      return { answer: text };
    } catch (err) {
      throw new Error(
        `[Error] Failed to generate content. Details: ${err}`
      );
    }
  }
}

function fileToGenerativePart(path: string, mimeType: string): InlineDataPart {
  return {
    inlineData: {
      data: fs.readFileSync(path, { encoding: 'base64' }),
      mimeType
    }
  };
}