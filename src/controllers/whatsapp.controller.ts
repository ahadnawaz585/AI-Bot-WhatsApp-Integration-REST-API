import BaseController from '../helper/baseController';
import { Request, Response } from 'express';
import { WhatsAppModel } from '../models/whatsapp.model';

export class WhatsAppController extends BaseController<WhatsAppModel> {
  protected model: WhatsAppModel;

  constructor() {
    super();
    this.model = new WhatsAppModel();
    this.model.initializeWhatsApp();
  }

  async sendMessage(req: Request, res: Response) {
    const { number, message } = req.body;
    const operation = () => this.model.sendMessage(number, message);
    const successMessage = 'Message sent successfully!';
    const errorMessage = 'Error sending answer';
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async getQRCode(req: Request, res: Response) {
    console.log("in controller");

    const operation = () => this.model.getQRCode();
    const successMessage = 'QR generated successfully!';
    const errorMessage = 'Error generating QR code';
    this.handleRequest(operation, successMessage, errorMessage, res);
   
  }
}
