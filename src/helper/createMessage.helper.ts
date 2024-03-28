import { Prefix } from "../types/models";
import { Prompt } from "../types/prompt";
import { Message } from "whatsapp-web.js";
import { Vision } from "../types/vision";
import { pdfUtility } from "../pdf/pdf";
import { MessageMedia } from "whatsapp-web.js";
import fs from "fs";
import config from "../config/config";
import { pdfData } from "../types/pdf";

export class TextHelper {
  private dataToRemove: Prefix[] = ["!gemini", "!vision", "!stability", "!makePDF","!topicPDF","!promptPDF"];

  public removeData(text: string): Prompt {
    let prompt = text;
    let model: string | null = null;

    this.dataToRemove.forEach((prefix) => {
      const regex = new RegExp(prefix, "gi");
      if (prompt.includes(prefix)) {
        prompt = prompt.replace(regex, "");
        if (!model) model = prefix;
        else model = "!multi";
      }
    });

    if (model === null) prompt = "";
    console.log(model, prompt);
    return { prompt, model };
  }

  deleteTemporaryImageFiles(imagePaths: Vision[]): void {
    for (const imagePath of imagePaths) {
      try {
        fs.unlinkSync(imagePath.path);
      } catch (error) {
        console.error("Error deleting temporary image file:", error);
      }
    }
  }

  async handleMedia(
    message: Message
  ): Promise<{ path: string; mimeType: string }[]> {
    let imagePaths: { path: string; mimeType: string }[] = [];

    try {
      const media = await message.downloadMedia();
      if (media) {
        if (Array.isArray(media)) {
          for (let i = 0; i < media.length; i++) {
            const attachment = media[i];
            if (
              attachment &&
              attachment.mimetype &&
              attachment.mimetype.startsWith("image")
            ) {
              const filename = `${i}.${attachment.mimetype.split("/")[1]}`;
              fs.writeFileSync(filename, attachment.data, "base64");
              imagePaths.push({
                path: filename,
                mimeType: attachment.mimetype,
              });
            }
          }
        } else {
          if (media.mimetype && media.mimetype.startsWith("image")) {
            const filename = `0.${media.mimetype.split("/")[1]}`;
            fs.writeFileSync(filename, media.data, "base64");
            imagePaths.push({ path: filename, mimeType: media.mimetype });
          }
        }
      }
    } catch (error) {
      console.log("Error downloading media:", error);
    }

    return imagePaths;
  }

  public outline(topic: string): string {
    let headings: string = "";
    try {
      headings = `Give me 15-20 headings for ${topic}`;
      return headings;
    } catch (error) {
      console.log("Error creating topc prompts:", error);
    }
    return headings;
  }

  public content(outline: string): string {
    let content: string = "";
    try {
      content = `give me complete comprehensive explanation in form of paragraphs for : ${outline}`;
      return content;
    } catch (error) {
      console.log("Error creating topic prompts:", error);
    }
    return content;
  }

  public async topicPDF(data: pdfData, prompt: string): Promise<string | MessageMedia> {
    const topic = prompt;
    const outline = data.headings;
    const content = data.data;
  
    try {
      const pdf = pdfUtility.makeAssignment(topic, outline, content);
      const pdfBuffer = await this.getPdfBuffer(pdf);

      const filename = `${topic.trim().replace(/\s+/g, "_").toLowerCase()}.pdf`;
  
      const response = new MessageMedia(
        "application/pdf",
        pdfBuffer.toString("base64"),
        filename 
      );
  
      return response;
    } catch (error) {
      console.log(error);
      return config.serverError;
    }
  }
  

  private async getPdfBuffer(pdf: any): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      try {
        pdf.getBuffer((buffer: Buffer) => {
          resolve(buffer);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  public async makePDF(data:string): Promise<string | MessageMedia> {
    try {
      const pdf = pdfUtility.makePDF(data);
      const pdfBuffer = await this.getPdfBuffer(pdf);

      const filename = `message.pdf`;
  
      const response = new MessageMedia(
        "application/pdf",
        pdfBuffer.toString("base64"),
        filename 
      );
  
      return response;
    } catch (error) {
      console.log(error);
      return config.serverError;
    }
  }
}
