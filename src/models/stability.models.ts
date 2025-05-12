// StabilityModel.ts
import FormData from 'form-data';
import axios from 'axios';
import invariant from 'invariant';
import { ENV } from '../lib/env';
import { answer } from '../types/answer';

/* Interfaces */
interface AIArguments {
  prompt: string;
  sender?: string;
  metadata?: any;
}

interface AIHandle {
  (response: { image?: Buffer; text?: string }, error?: string): void;
}

/* Stability Model */
class StabilityModel {
  private apiKey: string;
  private endPointGenerate: string;
  private headers: { [key: string]: string };

  constructor() {
    this.apiKey = ENV.stabilityKey || '';
    invariant(this.apiKey, 'Stability API key is not provided');

    // Base endpoint for image generation
    this.endPointGenerate = 'https://api.stability.ai/v2beta/stable-image/generate';
    // Use model from ENV or default to 'ultra' as per sample
    const model = 'ultra';
    this.endPointGenerate += `/${model}`;

    this.headers = {
      Authorization: `Bearer ${this.apiKey}`,
      Accept: 'image/*'
    };
  }

  public async generateImage(prompt: string): Promise<answer> {
    try {
      invariant(prompt && prompt.trim(), 'Prompt is required and cannot be empty');

      const payload = {
        prompt,
        output_format: 'webp', // Match sample's output format
        width: 512,
        height: 512
      };

      const formData = new FormData();
      const response = await axios.postForm(
        this.endPointGenerate,
        axios.toFormData(payload, formData),
        {
          validateStatus: () => true, // Accept all status codes to handle errors manually
          responseType: 'arraybuffer',
          headers: this.headers
        }
      );

      if (response.status === 200) {
        const buffer = Buffer.from(response.data);
        const base64Image = buffer.toString('base64');
        return { answer: base64Image };
      } else {
        throw new Error(`${response.status}: ${Buffer.from(response.data).toString('utf-8')}`);
      }
    } catch (err) {
      throw new Error(`[Error] Failed to generate image: ${err}`);
    }
  }

  public async sendMessage({ prompt }: AIArguments, handle: AIHandle): Promise<void> {
    try {
      const { answer } = await this.generateImage(prompt);
      const imageData = Buffer.from(answer, 'base64');
      handle({ image: imageData });
    } catch (err) {
      handle({ text: '' }, `[Error] An error occurred: ${err}`);
    }
  }
}

export default StabilityModel;