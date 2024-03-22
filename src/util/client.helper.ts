import { Client } from "whatsapp-web.js";
import qr from "qrcode-terminal";

export async function startWhatsAppClient(): Promise<Client> {
  const client = new Client({
    puppeteer: {
      args: ["--no-sandbox"],
    },
  });

  client.on("qr", (qrCode) => {
    qr.generate(qrCode, { small: true });
    console.log("Scan the QR code above to login to WhatsApp.");
  });

  await client.initialize();

  return client;
}
