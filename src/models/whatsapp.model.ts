import { Client, Message } from 'whatsapp-web.js';
import qr from 'qrcode-terminal';
import { GenerativeAIModel } from './gemini.model';
import { TextHelper } from '../helper/createMessage.helper';
import config from '../config/config';
import { EventEmitter } from 'events';

export class WhatsAppModel {
  private client: Client;
  private gemini: GenerativeAIModel;
  private textHelper = new TextHelper();
  private prefixes = config.prefixes;
  private startMessage = config.startMessage;
  private endMessage = config.endMessage;
  private shouldProcessMessages = false;
  private qrEmitter: EventEmitter;

  constructor() {
    this.client = new Client({
      puppeteer: {
        args: ['--no-sandbox'],
      },
    });

    this.gemini = new GenerativeAIModel();
    this.qrEmitter = new EventEmitter();

    this.client.on('qr', (qrCode) => {
      qr.generate(qrCode, { small: true });
      this.qrEmitter.emit('qrGenerated', qrCode);
      console.log('Scan the QR code above to login to WhatsApp.');
    });

    this.client.on('message', (message: Message) => {
      console.log('this is my message: ', message.fromMe);
      if (message.fromMe) {
        console.log(`Sent message: ${message.body}`);
      } else {
        console.log(`Received message: ${message.body}`);
      }
    });

    this.client.on('message_create', async (message) => {
      console.log(message.body);

      if (!this.shouldProcessMessages) {
        if (message.body.toLowerCase().includes(this.startMessage)) {
          this.client.sendMessage(message.to, 'HI I AM MONA 🤖! YOUR AI ASSISTANT HOW CAN I HELP YOU ? FEEL FREE TO ASK! BUT REMEBER TO USE (!gemini) BEFORE EVERY QUESTION. MADE BY AHAD <3');
          this.shouldProcessMessages = true;
          return;
        }
      } else {
        if (message.body.toLowerCase().includes(this.endMessage)) {
          this.client.sendMessage(message.to, 'Bye friend🤖! ');
          this.shouldProcessMessages = false;
          return;
        }

        if (this.prefixes.some((prefix) => message.body.startsWith(prefix))) {
          const geminiMessage = this.textHelper.removeData(message.body);
          console.log(`Gemini message: ${geminiMessage}`);
          const reply = this.gemini.generateContent(geminiMessage);
          console.log('reply is: ', reply);
          this.client.sendMessage(message.to, (await reply).answer);
        }
      }
    });
  }

  public async initializeWhatsApp(): Promise<void> {
    await this.client.initialize();
  }

  public async sendMessage(number: string, message: string): Promise<void> {
    const chat = await this.client.getChatById(number + '@c.us');
    await chat.sendMessage(message);
  }

  public async getQRCode(): Promise<string> {
    return new Promise((resolve) => {
      this.qrEmitter.once('qrGenerated', (qrCode: string) => {
        resolve(qrCode);
      });
    });
  }
}
