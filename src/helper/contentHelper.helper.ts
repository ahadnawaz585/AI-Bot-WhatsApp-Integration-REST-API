import { GenerativeAIModel } from "../models/gemini.model";
import StabilityModel from "../models/stability.models";
import { GenerativeVisionAIModel } from "../models/gemini-vision.model";
import { Vision } from "../types/vision";
import { MessageMedia } from "whatsapp-web.js";
import config from "../config/config";

export class ContentHelper {
  private static async handleContentGeneration<T>(
    promise: Promise<T>
  ): Promise<T | string> {
    try {
      return await promise;
    } catch (error) {
      console.error(error);
      return config.serverError;
    }
  }

  public static async validateRequest(
    prompt: string,
    model?: string,
    imagePaths?: Vision[]
  ): Promise<string | undefined> {
    if (model == null || prompt === "") {
      return "Sorry, I couldn't understand your request.";
    }
    if (model === "!vision" && (!imagePaths || imagePaths.length === 0)) {
      return "Sorry, I couldn't understand your request.";
    }
  }

  public static async geminiContent(
    gemini: GenerativeAIModel,
    prompt: string
  ): Promise<string> {
    return this.handleContentGeneration(
      gemini.generateContent(prompt).then((response) => response.answer)
    );
  }

  public static async visionContent(
    vision: GenerativeVisionAIModel,
    prompt: string,
    imagePaths?: Vision[]
  ): Promise<string> {
    return this.handleContentGeneration(
      vision
        .generateContent(prompt, imagePaths || [])
        .then((response) => response.answer)
    );
  }

  public static async stabilityContent(
    stability: StabilityModel,
    prompt: string
  ): Promise<MessageMedia | string> {
    return this.handleContentGeneration(
      stability
        .generateImage(prompt)
        .then((response) => new MessageMedia("image/png", response.answer))
    );
  }
}
