import { Client, Message } from 'whatsapp-web.js';
import qr from 'qrcode-terminal';
import { EventEmitter } from 'events';
import { MessageHandler } from '../helper/messageHandler';

export class WhatsAppModel {
    private client: Client;
    private messageHandler: MessageHandler;
    private qrEmitter: EventEmitter;

    constructor() {
        // const wwebVersion = '2.2407.3';
        const wwebVersion = '2.2409.0';
        this.client = new Client({
            puppeteer: {
                args: ['--no-sandbox'],
            },
            webVersionCache: {
                type: 'remote',
                remotePath: `https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/${wwebVersion}.html`,
            },
        });

        this.messageHandler = new MessageHandler();
        this.qrEmitter = new EventEmitter();

        this.client.on('qr', (qrCode) => {
            qr.generate(qrCode, { small: true });
            this.qrEmitter.emit('qrGenerated', qrCode);
            console.log('Scan the QR code above to login to WhatsApp.');
        });
          
        this.client.on('message_create', this.handleMessage.bind(this));
    }

    private async handleMessage(message: Message) {
        await this.messageHandler.handleMessage(message, this.client);
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
