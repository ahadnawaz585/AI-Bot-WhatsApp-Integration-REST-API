// GenerativeVisionAIRoutes.ts
import express, { Router } from "express";
import { GenerativeVisionAIController } from "../controllers/gemini-vision.controller";

class GenerativeVisionAIRoutes {
  private router: Router;
  private generativeVisionAIController: GenerativeVisionAIController;

  constructor() {
    this.router = express.Router();
    this.generativeVisionAIController = new GenerativeVisionAIController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/generate', this.generativeVisionAIController.generateContent.bind(this.generativeVisionAIController));
  }

  public getRouter(): Router {
    return this.router;
  }
}

export default GenerativeVisionAIRoutes;
