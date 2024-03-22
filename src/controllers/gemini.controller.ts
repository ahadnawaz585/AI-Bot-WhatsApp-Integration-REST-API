import { Request, Response } from "express";
import BaseController from "../util/baseController";
import { GenerativeAIModel } from "../models/gemini.model";

export class GeminiController extends BaseController<GenerativeAIModel> {
  protected model: GenerativeAIModel;

  constructor() {
    super();
    this.model = new GenerativeAIModel();
  }

  async generateContent(req: Request, res: Response): Promise<void> {
    const { prompt } = req.body;
    const operation = () => this.model.generateContent(prompt);
    const successMessage = "Answer Generated successfully!";
    const errorMessage = "Error generating answer";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

}
