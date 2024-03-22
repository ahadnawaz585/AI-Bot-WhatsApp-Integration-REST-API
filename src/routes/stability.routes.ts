import express, { Router } from 'express';
import StabilityController from '../controllers/stability.controller';

class StabilityRoutes {
  private router: Router;
  private stabilityController: StabilityController;

  constructor() {
    this.router = express.Router();
    this.stabilityController = new StabilityController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/generate', this.stabilityController.generateImage.bind(this.stabilityController));
  }

  public getRouter(): Router {
    return this.router;
  }
}

export default StabilityRoutes;
