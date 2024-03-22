import express, { Request, Response, Router } from 'express';
import { WhatsAppController } from '../controllers/whatsapp.controller';

class WhatsappRoutes {
  private router: Router;
  private controller: WhatsAppController;

  constructor() {
    this.router = express.Router();
    this.controller = new WhatsAppController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/send-message', this.controller.sendMessage.bind(this.controller));
    this.router.get('/qr-code', this.controller.getQRCode.bind(this.controller));
  }

  public getRouter(): Router {
    return this.router;
  }
}

export default WhatsappRoutes;
