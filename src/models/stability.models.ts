import { generateAsync } from 'stability-client';
import { ENV } from '../lib/env';
import { answer } from '../types/answer';

class StabilityModel {
  private apiKey: string;

  constructor() {
    this.apiKey = ENV.stabilityKey || '';
  }

  async generateImage(prompt: string): Promise<answer> {
    const res: any = await generateAsync({
      prompt,
      apiKey: this.apiKey,
      engine: 'stable-diffusion-512-v2-1',
      width: 512,
      height: 512,
      noStore: false,
    });

    const res_img = res.images[0];
    const buffer = Buffer.from(res_img.buffer, 'hex');
    const answer = buffer.toString('base64');
    return {answer};
  }
}

export default StabilityModel;
