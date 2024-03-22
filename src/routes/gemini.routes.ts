import express, { Request, Response, Router } from 'express';
import { GeminiController } from '../controllers/gemini.controller';

class GeminiRoutes {
  private router: Router;
  private geminiController: GeminiController;

  constructor() {
    this.router = express.Router();
    this.geminiController = new GeminiController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/generate', this.geminiController.generateContent.bind(this.geminiController));
  }

  public getRouter(): Router {
    return this.router;
  }
}

export default GeminiRoutes;
