// GenerativeVisionAIController.ts
import { Request, Response } from "express";
import { GenerativeVisionAIModel } from "../models/gemini-vision.model"
import BaseController from "../util/baseController";

export class GenerativeVisionAIController extends BaseController<GenerativeVisionAIModel> {
  protected model: GenerativeVisionAIModel;

  constructor() {
    super();
    this.model = new GenerativeVisionAIModel();
  }

  async generateContent(req: Request, res: Response): Promise<void> {
    const { prompt, imagePaths } = req.body;
    const operation = () => this.model.generateContent(prompt, imagePaths);
    const successMessage = "Answer Generated successfully!";
    const errorMessage = "Error generating answer";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }
}
