import express, { Express, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import { Client } from "whatsapp-web.js";
import StabilityRoutes from "./src/routes/stability.routes";
import GeminiRoutes from "./src/routes/gemini.routes";
import GenerativeVisionAIRoutes from "./src/routes/gemini-vision.routes";
import qr from "qrcode-terminal";
import WhatsappRoutes from "./src/routes/whatsapp.routes";
import { WhatsAppModel } from "./src/models/whatsapp.model";

class App {
  private app: Express;
  private model: WhatsAppModel;

  constructor() {
    this.app = express();
    this.accessControl();
    this.initializeMiddleware();
    this.initializeRoutes();
    this.startServer();
    console.log('🤖 starting client...');
    this.model = new WhatsAppModel();
  }

  private accessControl() {
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE"
      );
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization,Accept,X-Requested-With,application/json"
      );
      next();
    });
  }

  private initializeMiddleware() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(this.handleErrors.bind(this));
  }

  private initializeRoutes(): void {
    const gemini = new GeminiRoutes().getRouter();
    const stability = new StabilityRoutes().getRouter();
    const vision = new GenerativeVisionAIRoutes().getRouter();
    const whatsapp = new WhatsappRoutes().getRouter();

    this.app.use("/stability", stability);
    this.app.use("/gemini", gemini);
    this.app.use("/vision", vision);
    this.app.use("/whatsapp", whatsapp);
  }

  private startServer(): void {
    let port = process.env.PORT || 3001;
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }

  private handleErrors(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
  }
}

new App();
