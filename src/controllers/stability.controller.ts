import { Request, Response } from "express";
import BaseController from "../helper/baseController";
import StabilityModel from "../models/stability.models";

class StabilityController extends BaseController<StabilityModel> {
  protected model: StabilityModel;

  constructor() {
    super();
    this.model = new StabilityModel();
  }

  async generateImage(req: Request, res: Response): Promise<void> {
    const { prompt } = req.body;
    const operation = () => this.model.generateImage(prompt);
    const successMessage = "Image Generated successfully!";
    const errorMessage = "Error generating Image";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }
}

export default StabilityController;
