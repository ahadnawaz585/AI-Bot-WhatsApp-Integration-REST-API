// MessageHandler.ts

import { Client, Message } from "whatsapp-web.js";
import { GenerativeAIModel } from "../models/gemini.model";
import StabilityModel from "../models/stability.models";
import { TextHelper } from "../helper/createMessage.helper";
import config from "../config/config";
import { GenerativeVisionAIModel } from "../models/gemini-vision.model";

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
    console.log("this is my message: ", message.fromMe);

    if (!this.shouldProcessMessages) {
      if (message.body.toLowerCase().includes(this.startMessage)) {
        await this.startMessageProcess(message, client);
        return;
      }
    } else {
      if (message.body.toLowerCase().includes(this.endMessage)) {
        await this.endMessageProcess(message, client);
        return;
      }

      if (this.prefixes.some((prefix) => message.body.startsWith(prefix))) {
        await this.processPrefixMessage(message, client);
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

  private async processPrefixMessage(
    message: Message,
    client: Client
  ): Promise<void> {
    const text = this.textHelper.removeData(message.body);
    const prompt = text.prompt || "";
    const model = text.model || "";

    const reply = await this.reply(prompt, model);
    await client.sendMessage(message.from, reply);
  }

  private async reply(prompt: string, model?: string): Promise<string> {
    let reply: string;

    if (model == null || prompt === "") {
        return "Sorry, I couldn't understand your request.";
    }

    switch (model) {
        case "!gemini":
            const response = await this.gemini.generateContent(prompt);
            reply = response.answer;
            break;
        case "!vision":
            reply = "Vision model reply";
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
