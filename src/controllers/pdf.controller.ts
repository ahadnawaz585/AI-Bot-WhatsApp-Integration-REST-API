import BaseController from "../util/baseController";
import { Request, Response } from "express";
import { pdfUtility } from "../pdf/pdf";

export class PDFController extends BaseController<pdfUtility> {
  protected model: pdfUtility;

  constructor() {
    super();
    this.model = new pdfUtility();
  }

//   async textPDF(req:Request,res:Response){
//     // const {text} = req.body;
//     // const operation = () => this.model.
//     const successMessage = 'Message sent successfully!';
//     const errorMessage = 'Error sending answer';
//     this.handleRequest(operation, successMessage, errorMessage, res);
//   }
}
