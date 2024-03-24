import { Client, Message, MessageMedia } from "whatsapp-web.js";
import { GenerativeAIModel } from "../models/gemini.model";
import StabilityModel from "../models/stability.models";
import { TextHelper } from "../helper/createMessage.helper";
import { GenerativeVisionAIModel } from "../models/gemini-vision.model";
import { Vision } from "../types/vision";
import config from "../config/config";
import fs from "fs";

export class MessageHandler {
  private gemini: GenerativeAIModel;
  private stability: StabilityModel;
  private vision: GenerativeVisionAIModel;
  private textHelper: TextHelper;
  private prefixes: string[];
  private startMessage: string;
  private endMessage: string;
  private shouldProcessMessages: boolean;

  constructor() {
    this.gemini = new GenerativeAIModel();
    this.vision = new GenerativeVisionAIModel();
    this.stability = new StabilityModel();
    this.textHelper = new TextHelper();
    this.prefixes = config.prefixes;
    this.startMessage = config.startMessage;
    this.endMessage = config.endMessage;
    this.shouldProcessMessages = false;
  }

  public async handleMessage(message: Message, client: Client): Promise<void> {
    if (!this.shouldProcessMessages) {
      if (message.body.toLowerCase().includes(this.startMessage)) {
        await this.startMessageProcess(message, client);
        return;
      }
    } else {
      if (message.body.toLowerCase().includes(this.startMessage)) {
        await this.startMessageProcess(message, client);
        return;
      }
      if (message.body.toLowerCase().includes(this.endMessage)) {
        await this.endMessageProcess(message, client);
        return;
      }

      if (this.prefixes.some((prefix) => message.body.startsWith(prefix))) {
        await this.processMessages(message, client);
      }
    }
  }

  private async startMessageProcess(
    message: Message,
    client: Client
  ): Promise<void> {
    await client.sendMessage(message.from, config.welcomeMessage);
    this.shouldProcessMessages = true;
  }

  private async endMessageProcess(
    message: Message,
    client: Client
  ): Promise<void> {
    await client.sendMessage(message.from, config.closingMessage);
    this.shouldProcessMessages = false;
  }

  private async processMessages(
    message: Message,
    client: Client
  ): Promise<void> {
    const text = this.textHelper.removeData(message.body);
    const prompt = text.prompt || "";
    const model = text.model || "";
    const imagePaths = await this.textHelper.handleMedia(message);
    const reply = await this.reply(prompt, model, imagePaths);
    await client.sendMessage(message.from, reply);
    this.textHelper.deleteTemporaryImageFiles(imagePaths);
  }

  private async reply(
    prompt: string,
    model?: string,
    imagePaths?: Vision[]
  ): Promise<string> {
    let reply: string;
    if (model == null || prompt === "") {
      return "Sorry, I couldn't understand your request.";
    }
    switch (model) {
      case "!gemini":
        const geminiResponse = await this.gemini.generateContent(prompt);
        reply = geminiResponse.answer;
        break;
      case "!vision":
        const visionResponse = await this.vision.generateContent(
          prompt,
          imagePaths || []
        );
        reply = visionResponse.answer;
        break;
      case "!stability":
        reply = "Stability model reply";
        break;
      default:
        reply = "Sorry, I couldn't understand your request.";
    }
    return reply;
  }
}
